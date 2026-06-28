import { shuffle } from '../../../js/utils.js';
import { ALL_VERBS_CH5, conjugate as conjugateCh5 } from '../../../js/data/chapter5.js';

function build_5_1(sublesson) {
  const questions = [];
  /* -ar verbs — conjugation drill */
  const pronouns = ['yo','tú','él/ella','nosotros','ellos'];
  const verbs = sublesson.verbs;
  /* Matching: infinitive → meaning */
  for (let i = 0; i < 3; i++) {
    const pairs = shuffle(verbs).slice(0, 4).map(v => ({ es: v.infinitive, en: v.en }));
    questions.push({ type: 'matching', pairs });
  }
  /* Conjugation: given pronoun + infinitive, choose correct form */
  shuffle(verbs).slice(0, 10).forEach(v => {
    const pronoun = pronouns[Math.floor(Math.random() * pronouns.length)];
    const correctForm = conjugateCh5(v.stem, v.type, pronoun);
    const allForms = pronouns.map(p => ({ pronoun: p, form: conjugateCh5(v.stem, v.type, p) }));
    const uniqueForms = [...new Map(allForms.map(f => [f.form, f])).values()];
    questions.push({ type: 'conjugation', pronoun, correctForm, verb: v.infinitive, en: `${pronoun} ${v.en.replace('to ','')}`, allForms: uniqueForms });
  });
  return questions;
}

function build_5_2(sublesson) {
  const questions = [];
  /* -er and -ir verbs — same pattern */
  const pronouns = ['yo','tú','él/ella','nosotros','ellos'];
  const verbs = sublesson.verbs;
  for (let i = 0; i < 3; i++) {
    const pairs = shuffle(verbs).slice(0, 4).map(v => ({ es: v.infinitive, en: v.en }));
    questions.push({ type: 'matching', pairs });
  }
  shuffle(verbs).slice(0, 10).forEach(v => {
    const pronoun = pronouns[Math.floor(Math.random() * pronouns.length)];
    const correctForm = conjugateCh5(v.stem, v.type, pronoun);
    const allForms = pronouns.map(p => ({ pronoun: p, form: conjugateCh5(v.stem, v.type, p) }));
    const uniqueForms = [...new Map(allForms.map(f => [f.form, f])).values()];
    questions.push({ type: 'conjugation', pronoun, correctForm, verb: v.infinitive, en: `${pronoun} ${v.en.replace('to ','')}`, allForms: uniqueForms });
  });
  return questions;
}

function build_5_3(sublesson) {
  const questions = [];
  /* Multi-meaning verbs — matching + conjugation + vocab */
  const verbs = sublesson.verbs;
  const pronouns = ['yo','tú','él/ella','nosotros','ellos'];
  for (let i = 0; i < 2; i++) {
    const pairs = shuffle(verbs).slice(0, 4).map(v => ({ es: v.infinitive, en: v.en }));
    questions.push({ type: 'matching', pairs });
  }
  verbs.forEach(v => {
    const pronoun = pronouns[Math.floor(Math.random() * pronouns.length)];
    const correctForm = conjugateCh5(v.stem, v.type, pronoun);
    const allForms = pronouns.map(p => ({ pronoun: p, form: conjugateCh5(v.stem, v.type, p) }));
    const uniqueForms = [...new Map(allForms.map(f => [f.form, f])).values()];
    questions.push({ type: 'conjugation', pronoun, correctForm, verb: v.infinitive, en: `${pronoun} ${v.en.split('/')[0].replace('to ','')}`, allForms: uniqueForms });
  });
  const vocab = sublesson.vocabulary.filter(v => v.article);
  const pairs = shuffle(vocab).slice(0, 4).map(v => ({ es: v.es, en: v.en }));
  questions.push({ type: 'matching', pairs });
  return questions;
}

function build_5_4(_sublesson) {
  const questions = [];
  /* Mixed drill — all verbs, all pronouns */
  const pronouns = ['yo','tú','él/ella','nosotros','ellos','Ud.','Uds.'];
  const allVerbs = ALL_VERBS_CH5;
  shuffle(allVerbs).slice(0, 15).forEach(v => {
    const pronoun = pronouns[Math.floor(Math.random() * pronouns.length)];
    const correctForm = conjugateCh5(v.stem, v.type, pronoun);
    const allForms = ['yo','tú','él/ella','nosotros','ellos'].map(p => ({ pronoun: p, form: conjugateCh5(v.stem, v.type, p) }));
    const uniqueForms = [...new Map(allForms.map(f => [f.form, f])).values()];
    questions.push({ type: 'conjugation', pronoun, correctForm, verb: v.infinitive, en: `${pronoun} ${v.en.split('/')[0].replace('to ','')}`, allForms: uniqueForms });
  });
  for (let i = 0; i < 2; i++) {
    const pairs = shuffle(allVerbs).slice(0, 4).map(v => ({ es: v.infinitive, en: v.en }));
    questions.push({ type: 'matching', pairs });
  }
  return questions;
}

export const builders = {
  '5-1': build_5_1,
  '5-2': build_5_2,
  '5-3': build_5_3,
  '5-4': build_5_4,
};
