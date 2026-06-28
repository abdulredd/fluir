import { shuffle } from '../../../js/utils.js';

function build_9_1(sublesson) {
  const questions = [];
  /* Negatives — sentence completion */
  shuffle(sublesson.sentenceCompletionDrills).forEach(d => {
    questions.push({ type: 'sentence-completion', ...d });
  });
  /* Affirmative/negative matching pairs */
  const pairs1 = [
    { es:'algo', en:'something' }, { es:'nada', en:'nothing' },
    { es:'alguien', en:'someone' }, { es:'nadie', en:'no one' },
  ];
  questions.push({ type: 'matching', pairs: pairs1 });
  const pairs2 = [
    { es:'siempre', en:'always' }, { es:'nunca', en:'never' },
    { es:'también', en:'also' }, { es:'tampoco', en:'neither' },
  ];
  questions.push({ type: 'matching', pairs: pairs2 });
  /* Vocabulary matching */
  const vocab = sublesson.vocabulary;
  for (let i = 0; i < 2; i++) {
    const pairs = shuffle(vocab).slice(0, 4).map(v => ({ es: v.es, en: v.en }));
    questions.push({ type: 'matching', pairs });
  }
  return questions;
}

function build_9_2(sublesson) {
  const questions = [];
  /* Prepositions — sentence completion */
  shuffle(sublesson.sentenceCompletionDrills).forEach(d => {
    questions.push({ type: 'sentence-completion', ...d });
  });
  /* Vocabulary matching — verb-phrase prepositions */
  const vocab = sublesson.vocabulary;
  for (let i = 0; i < 3; i++) {
    const pairs = shuffle(vocab).slice(0, 4).map(v => ({ es: v.es, en: v.en }));
    questions.push({ type: 'matching', pairs });
  }
  return questions;
}

function build_9_3(sublesson) {
  const questions = [];
  /* Por vs para — sentence completion drills */
  sublesson.porVsParaDrills.forEach(d => {
    questions.push({ type: 'sentence-completion', ...d });
  });
  /* Pronoun drills — sentence completion */
  sublesson.pronounDrills.forEach(d => {
    questions.push({ type: 'sentence-completion', ...d });
  });
  /* Por vs para matching */
  const pairs = [
    { es:'para — recipient', en:'El regalo es para ella.' },
    { es:'para — purpose',   en:'Estudia para aprender.' },
    { es:'por — duration',   en:'Corro por una hora.' },
    { es:'por — cause',      en:'Triste por el mal clima.' },
  ];
  questions.push({ type: 'matching', pairs });
  return questions;
}

function build_9_4(sublesson) {
  const questions = [];
  /* Location prepositions — matching */
  const locs = sublesson.locationPrepositions;
  for (let i = 0; i < 4; i++) {
    const pairs = shuffle(locs).slice(0, 4).map(l => ({ es: l.es, en: l.en }));
    questions.push({ type: 'matching', pairs });
  }
  /* Por expressions — matching */
  const exprs = sublesson.porExpressions;
  for (let i = 0; i < 4; i++) {
    const pairs = shuffle(exprs).slice(0, 4).map(e => ({ es: e.es, en: e.en }));
    questions.push({ type: 'matching', pairs });
  }
  /* Nature vocabulary matching */
  if (sublesson.vocabulary?.length) {
    for (let i = 0; i < 4; i++) {
      const pairs = shuffle(sublesson.vocabulary).slice(0, 4).map(v => ({ es: v.es, en: v.en }));
      questions.push({ type: 'matching', pairs });
    }
  }
  return questions;
}

export const builders = {
  '9-1': build_9_1,
  '9-2': build_9_2,
  '9-3': build_9_3,
  '9-4': build_9_4,
};
