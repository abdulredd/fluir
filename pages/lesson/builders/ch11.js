import { shuffle } from '../../../js/utils.js';
import { conjugateIrr } from '../../../js/data/chapter6.js';

function build_11_1(sublesson) {
  const questions = [];
  /* Personal a — sentence completion */
      shuffle(sublesson.sentenceCompletionDrills).forEach(d => {
        questions.push({ type: 'sentence-completion', ...d });
      });
  return questions;
}

function build_11_2(sublesson) {
  const questions = [];
  /* DOP forms — matching */
      const pairs1 = sublesson.pronounTable.map(p => ({ es: p.pronoun, en: p.en }));
      for (let i = 0; i < 2; i++) {
        questions.push({ type: 'matching', pairs: shuffle(pairs1).slice(0, 4) });
      }
      /* Sentence completion — pronoun choice + placement + negation */
      shuffle(sublesson.sentenceCompletionDrills).forEach(d => {
        questions.push({ type: 'sentence-completion', ...d });
      });
  return questions;
}

function build_11_3(sublesson) {
  const questions = [];
  /* DOP replacing persons vs things — sentence completion */
      shuffle(sublesson.sentenceCompletionDrills).forEach(d => {
        questions.push({ type: 'sentence-completion', ...d });
      });
      /* Matching: pronoun → what it replaces */
      const pairs = [
        { es:'lo', en:'him / it (masculine)' },
        { es:'la', en:'her / it (feminine)' },
        { es:'los', en:'them (masculine/mixed)' },
        { es:'las', en:'them (feminine)' },
      ];
      questions.push({ type: 'matching', pairs });
  return questions;
}

function build_11_4(sublesson) {
  const questions = [];
  /* Transitive verbs — matching + conjugation */
      const verbs = sublesson.verbs;
      for (let i = 0; i < 4; i++) {
        const pairs = shuffle(verbs).slice(0, 4).map(v => ({ es: v.infinitive, en: v.en }));
        questions.push({ type: 'matching', pairs });
      }
      /* Conjugation picker */
      const pronouns = ['yo','tú','él/ella','nosotros','ellos'];
      shuffle(verbs).slice(0, 10).forEach(v => {
        const pronoun = pronouns[Math.floor(Math.random() * pronouns.length)];
        const correctForm = conjugateIrr(v.forms, pronoun);
        const allForms = pronouns.map(p => ({ pronoun: p, form: conjugateIrr(v.forms, p) }));
        const uniqueForms = [...new Map(allForms.map(f => [f.form, f])).values()];
        questions.push({ type: 'conjugation', pronoun, correctForm, verb: v.infinitive,
          en: `${pronoun} ${v.en.split('/')[0].replace('to ','').trim()}`, allForms: uniqueForms });
      });
  return questions;
}

export const builders = {
  '11-1': build_11_1,
  '11-2': build_11_2,
  '11-3': build_11_3,
  '11-4': build_11_4,
};
