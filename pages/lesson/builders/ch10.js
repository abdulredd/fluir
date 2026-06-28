import { shuffle } from '../../../js/utils.js';
import { conjugate as conjugateCh5 } from '../../../js/data/chapter5.js';
import { conjugateIrr } from '../../../js/data/chapter6.js';

function build_10_1(sublesson) {
  const questions = [];
  /* Gustar sentence completion drills */
      shuffle(sublesson.sentenceCompletionDrills).forEach(d => {
        questions.push({ type: 'sentence-completion', ...d });
      });
      /* Pronoun table matching */
      const pairs1 = sublesson.pronounTable.slice(0, 4).map(p => ({ es: p.pronoun, en: p.en }));
      questions.push({ type: 'matching', pairs: pairs1 });
      const pairs2 = sublesson.pronounTable.map(p => ({ es: p.clarifier, en: p.en }));
      questions.push({ type: 'matching', pairs: shuffle(pairs2).slice(0, 4) });
  return questions;
}

function build_10_2(sublesson) {
  const questions = [];
  /* Verbs like gustar — matching meaning */
      const verbs = sublesson.verbs;
      for (let i = 0; i < 4; i++) {
        const pairs = shuffle(verbs).slice(0, 4).map(v => ({ es: v.es, en: v.en }));
        questions.push({ type: 'matching', pairs });
      }
      /* Sentence completion — gusta vs gustan agreement */
      shuffle(sublesson.sentenceCompletionDrills).forEach(d => {
        questions.push({ type: 'sentence-completion', ...d });
      });
  return questions;
}

function build_10_3(sublesson) {
  const questions = [];
  /* Action verbs — matching */
      const verbs = sublesson.verbs;
      for (let i = 0; i < 3; i++) {
        const pairs = shuffle(verbs).slice(0, 4).map(v => ({ es: v.infinitive, en: v.en }));
        questions.push({ type: 'matching', pairs });
      }
      /* Conjugation drill using conjugateIrr for irregular verbs, conjugateCh5 for regular */
      const pronouns = ['yo','tú','él/ella','nosotros','ellos'];
      shuffle(verbs).slice(0, 8).forEach(v => {
        const pronoun = pronouns[Math.floor(Math.random() * pronouns.length)];
        const correctForm = conjugateIrr(v.forms, pronoun);
        const allForms = pronouns.map(p => ({ pronoun: p, form: conjugateIrr(v.forms, p) }));
        const uniqueForms = [...new Map(allForms.map(f => [f.form, f])).values()];
        questions.push({ type: 'conjugation', pronoun, correctForm, verb: v.infinitive,
          en: `${pronoun} ${v.en.split('/')[0].replace('to ','').trim()}`, allForms: uniqueForms });
      });
      /* Sentence completion — indirect object pronoun choice */
      shuffle(sublesson.sentenceCompletionDrills).forEach(d => {
        questions.push({ type: 'sentence-completion', ...d });
      });
  return questions;
}

function build_10_4(sublesson) {
  const questions = [];
  /* Placement drills — sentence completion */
      shuffle(sublesson.sentenceCompletionDrills).forEach(d => {
        questions.push({ type: 'sentence-completion', ...d });
      });
      /* Placement pairs matching — before verb vs attached */
      const drills = sublesson.placementDrills;
      for (let i = 0; i < 3; i++) {
        const sample = shuffle(drills).slice(0, 4);
        const pairs = sample.map(d => ({ es: d.beforeVerb, en: d.en }));
        questions.push({ type: 'matching', pairs });
      }
  return questions;
}

export const builders = {
  '10-1': build_10_1,
  '10-2': build_10_2,
  '10-3': build_10_3,
  '10-4': build_10_4,
};
