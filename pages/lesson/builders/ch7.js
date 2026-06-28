import { shuffle } from '../../../js/utils.js';
import { conjugate as conjugateCh5 } from '../../../js/data/chapter5.js';

function build_7_1(sublesson) {
  const questions = [];
  /* ir conjugation drill */
      const conjs = sublesson.conjugations;
      shuffle(conjs).slice(0, 8).forEach(c => {
        questions.push({ type: 'conjugation', pronoun: c.pronoun, correctForm: c.form,
          verb: 'ir', en: c.en, allForms: conjs });
      });
      /* near future drills — matching construction → English */
      const drills = sublesson.futureDrills;
      for (let i = 0; i < 3; i++) {
        const pairs = shuffle(drills).slice(0, 4).map(d => ({ es: d.sentence, en: d.en }));
        questions.push({ type: 'matching', pairs });
      }
      /* vocabulary matching */
      const vocab = sublesson.vocabulary.filter(v => v.article);
      const pairs = shuffle(vocab).slice(0, 4).map(v => ({ es: v.es, en: v.en }));
      questions.push({ type: 'matching', pairs });
  return questions;
}

function build_7_2(sublesson) {
  const questions = [];
  /* hacer expressions — matching */
      const hacer = sublesson.hacerExpressions;
      for (let i = 0; i < 2; i++) {
        const pairs = shuffle(hacer).slice(0, 4).map(h => ({ es: h.es, en: h.en }));
        questions.push({ type: 'matching', pairs });
      }
      /* tener expressions — matching, multiple rounds */
      const tener = sublesson.tenerExpressions;
      for (let i = 0; i < 4; i++) {
        const pairs = shuffle(tener).slice(0, 4).map(t => ({ es: t.es, en: t.en }));
        questions.push({ type: 'matching', pairs });
      }
  return questions;
}

function build_7_3(sublesson) {
  const questions = [];
  /* Verbal idioms — matching construction → meaning */
      const idioms = sublesson.idioms;
      for (let i = 0; i < 3; i++) {
        const pairs = shuffle(idioms).slice(0, 4).map(id => ({ es: id.construction, en: id.en }));
        questions.push({ type: 'matching', pairs });
      }
      /* Conjugation drill — pick the right form for each idiom */
      idioms.forEach(idiom => {
        const conj = shuffle(idiom.conjugations)[0];
        const distractorForms = idioms
          .filter(x => x.construction !== idiom.construction)
          .map(x => shuffle(x.conjugations)[0].form);
        const allForms = idiom.conjugations.map(c => ({ pronoun: c.pronoun, form: c.form }));
        questions.push({
          type: 'conjugation',
          pronoun: conj.pronoun,
          correctForm: conj.form,
          verb: idiom.construction,
          en: `${conj.pronoun} ${idiom.en}`,
          allForms,
        });
      });
  return questions;
}

function build_7_4(sublesson) {
  const questions = [];
  /* New -ar verbs — matching + conjugation */
      const verbs = sublesson.verbs;
      for (let i = 0; i < 4; i++) {
        const pairs = shuffle(verbs).slice(0, 4).map(v => ({ es: v.infinitive, en: v.en }));
        questions.push({ type: 'matching', pairs });
      }
      /* Conjugation using ch5 conjugate function (all regular -ar) */
      const pronouns = ['yo','tú','él/ella','nosotros','ellos'];
      shuffle(verbs).slice(0, 8).forEach(v => {
        const pronoun = pronouns[Math.floor(Math.random() * pronouns.length)];
        const correctForm = conjugateCh5(v.stem, v.type, pronoun);
        const allForms = pronouns.map(p => ({ pronoun: p, form: conjugateCh5(v.stem, v.type, p) }));
        const uniqueForms = [...new Map(allForms.map(f => [f.form, f])).values()];
        questions.push({ type: 'conjugation', pronoun, correctForm, verb: v.infinitive,
          en: `${pronoun} ${v.en.split('/')[0].replace('to ','').trim()}`, allForms: uniqueForms });
      });
  return questions;
}

export const builders = {
  '7-1': build_7_1,
  '7-2': build_7_2,
  '7-3': build_7_3,
  '7-4': build_7_4,
};
