import { shuffle } from '../../../js/utils.js';

function build_12_1(sublesson) {
  const questions = [];
  /* Daily routine — sentence completion + conjugation */
  shuffle(sublesson.sentenceCompletionDrills).forEach(d => {
    questions.push({ type: 'sentence-completion', ...d });
  });
  const pronouns12 = ['yo','tú','él/ella','nosotros','ellos'];
  shuffle(sublesson.verbs).slice(0, 8).forEach(v => {
    const pronoun = pronouns12[Math.floor(Math.random() * pronouns12.length)];
    const correctForm = v.forms[pronoun === 'yo' ? 'yo' : pronoun === 'tú' ? 'tu' : pronoun === 'él/ella' ? 'el' : pronoun === 'nosotros' ? 'nos' : 'ellos'];
    const allForms = pronouns12.map(p => {
      const key = p === 'yo' ? 'yo' : p === 'tú' ? 'tu' : p === 'él/ella' ? 'el' : p === 'nosotros' ? 'nos' : 'ellos';
      return { pronoun: p, form: v.forms[key] };
    });
    const uniqueForms = [...new Map(allForms.map(f => [f.form, f])).values()];
    questions.push({ type: 'conjugation', pronoun, correctForm, verb: v.infinitive,
      en: `${pronoun} ${v.en.split('/')[0].replace('to ','').trim()}`, allForms: uniqueForms });
  });
  /* Matching: infinitive → meaning */
  for (let i = 0; i < 2; i++) {
    const pairs = shuffle(sublesson.verbs).slice(0, 4).map(v => ({ es: v.infinitive, en: v.en }));
    questions.push({ type: 'matching', pairs });
  }
  return questions;
}

function build_12_2(sublesson) {
  const questions = [];
  /* Regular reflexives — matching + conjugation */
  const verbs12 = sublesson.verbs;
  for (let i = 0; i < 4; i++) {
    const pairs = shuffle(verbs12).slice(0, 4).map(v => ({ es: v.infinitive, en: v.en }));
    questions.push({ type: 'matching', pairs });
  }
  /* Preposition matching */
  const withPrep = verbs12.filter(v => v.prep);
  for (let i = 0; i < 2; i++) {
    const pairs = shuffle(withPrep).slice(0, 4).map(v => ({ es: v.infinitive, en: v.en }));
    questions.push({ type: 'matching', pairs });
  }
  return questions;
}

function build_12_3(sublesson) {
  const questions = [];
  /* Irregular reflexives — conjugation + sentence completion */
  const pronouns12 = ['yo','tú','él/ella','nosotros','ellos'];
  shuffle(sublesson.verbs).forEach(v => {
    const pronoun = pronouns12[Math.floor(Math.random() * pronouns12.length)];
    const key = pronoun === 'yo' ? 'yo' : pronoun === 'tú' ? 'tu' : pronoun === 'él/ella' ? 'el' : pronoun === 'nosotros' ? 'nos' : 'ellos';
    const correctForm = v.forms[key];
    const allForms = pronouns12.map(p => {
      const k = p === 'yo' ? 'yo' : p === 'tú' ? 'tu' : p === 'él/ella' ? 'el' : p === 'nosotros' ? 'nos' : 'ellos';
      return { pronoun: p, form: v.forms[k] };
    });
    const uniqueForms = [...new Map(allForms.map(f => [f.form, f])).values()];
    questions.push({ type: 'conjugation', pronoun, correctForm, verb: v.infinitive,
      en: `${pronoun} ${v.en.split('/')[0].replace('to ','').trim()}`, allForms: uniqueForms });
  });
  /* "To become" sentence completion */
  shuffle(sublesson.sentenceCompletionDrills).forEach(d => {
    questions.push({ type: 'sentence-completion', ...d });
  });
  /* Become expressions matching */
  const pairs = sublesson.becomeExpressions.map(b => ({ es: b.es, en: b.en }));
  questions.push({ type: 'matching', pairs });
  return questions;
}

function build_12_4(sublesson) {
  const questions = [];
  /* Movement verbs — matching + conjugation */
  const mvVerbs = sublesson.movementVerbs;
  for (let i = 0; i < 2; i++) {
    const pairs = shuffle(mvVerbs).slice(0, 4).map(v => ({ es: v.infinitive, en: v.en }));
    questions.push({ type: 'matching', pairs });
  }
  /* Reciprocal verbs matching */
  const recip = sublesson.reciprocalVerbs;
  for (let i = 0; i < 2; i++) {
    const pairs = shuffle(recip).slice(0, 4).map(v => ({ es: v.es, en: v.en }));
    questions.push({ type: 'matching', pairs });
  }
  /* Placement sentence completion */
  shuffle(sublesson.sentenceCompletionDrills).forEach(d => {
    questions.push({ type: 'sentence-completion', ...d });
  });
  return questions;
}

export const builders = {
  '12-1': build_12_1,
  '12-2': build_12_2,
  '12-3': build_12_3,
  '12-4': build_12_4,
};
