import { shuffle } from '../../../js/utils.js';

function build_8_1(sublesson) {
  const questions = [];
  /* Possessive drills — sentence completion */
  shuffle(sublesson.possessiveDrills).slice(0, 6).forEach(d => {
    questions.push({ type: 'sentence-completion', ...d });
  });
  /* Demonstrative drills — sentence completion */
  shuffle(sublesson.demonstrativeDrills).slice(0, 6).forEach(d => {
    questions.push({ type: 'sentence-completion', ...d });
  });
  /* Matching: demonstrative → English */
  const demoItems = [
    { es:'este/esta', en:'this (near speaker)' },
    { es:'ese/esa',   en:'that (near listener)' },
    { es:'aquel/aquella', en:'that (far from both)' },
    { es:'esto/eso/aquello', en:'neuter (unknown object)' },
  ];
  questions.push({ type: 'matching', pairs: demoItems });
  return questions;
}

function build_8_2(sublesson) {
  const questions = [];
  /* Special adjective sentence completion */
  shuffle(sublesson.sentenceCompletionDrills).slice(0, 8).forEach(d => {
    questions.push({ type: 'sentence-completion', ...d });
  });
  /* Vocabulary matching */
  const vocab = sublesson.vocabulary;
  for (let i = 0; i < 2; i++) {
    const pairs = shuffle(vocab).slice(0, 4).map(v => ({ es: v.es, en: v.en }));
    questions.push({ type: 'matching', pairs });
  }
  return questions;
}

function build_8_3(sublesson) {
  const questions = [];
  /* Comparative sentence completion */
  shuffle(sublesson.sentenceCompletionDrills).forEach(d => {
    questions.push({ type: 'sentence-completion', ...d });
  });
  /* Matching: structure → meaning */
  const structures = [
    { es:'más...que',      en:'more...than' },
    { es:'menos...que',    en:'less...than' },
    { es:'tan...como',     en:'as...as' },
    { es:'el/la más...de', en:'the most...in/of' },
    { es:'mejor',          en:'better (irregular)' },
    { es:'peor',           en:'worse (irregular)' },
    { es:'mayor',          en:'older (irregular, people)' },
    { es:'menor',          en:'younger (irregular, people)' },
  ];
  for (let i = 0; i < 2; i++) {
    const pairs = shuffle(structures).slice(0, 4).map(s => ({ es: s.es, en: s.en }));
    questions.push({ type: 'matching', pairs });
  }
  return questions;
}

function build_8_4(sublesson) {
  const questions = [];
  /* Adverb formation — number quiz style: adjective → adverb */
  const drills = sublesson.adverbDrills;
  shuffle(drills).slice(0, 10).forEach(d => {
    const distractors = shuffle(drills.filter(x => x.adverb !== d.adverb)).slice(0, 3).map(x => x.adverb);
    questions.push({ type: 'number-quiz', mode: 'numeral-to-word', numeral: d.adjective, spanish: d.adverb, distractors });
  });
  /* Sentence completion — series adverbs */
  sublesson.sentenceCompletionDrills.forEach(d => {
    questions.push({ type: 'sentence-completion', ...d });
  });
  /* Vocabulary matching */
  const vocab = sublesson.vocabulary;
  for (let i = 0; i < 2; i++) {
    const pairs = shuffle(vocab).slice(0, 4).map(v => ({ es: v.es, en: v.en }));
    questions.push({ type: 'matching', pairs });
  }
  return questions;
}

export const builders = {
  '8-1': build_8_1,
  '8-2': build_8_2,
  '8-3': build_8_3,
  '8-4': build_8_4,
};
