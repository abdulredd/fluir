import {
  addMatching,
  addArticlePickers,
  addVocabPickers,
  addSentenceCompletions,
} from '../builder-utils.js';
import { shuffle } from '../../../js/utils.js';

/** PDF Ex 3.4 noun–adjective pairs (ids into SUBLESSON_3_4 vocabulary). */
const CH3_ADJ_DRILL_PAIRS = [
  ['n3_7', 'a3_5'],   // el edificio bajo
  ['n3_21', 'a3_23'], // el sueño raro
  ['n3_35', 'a3_16'], // la guerra larga
  ['n3_23', 'a3_4'],  // la avenida ancha
  ['n3_50', 'a3_19'], // el día nuevo
  ['n3_40', 'a3_12'], // la obra emocionante
  ['n3_42', 'a3_6'],  // la playa bella
  ['n3_52', 'a3_2'],  // el niño amable
  ['n3_36', 'a3_6'],  // la habitación bella (PDF: el cuarto bello)
];

function toAdjGame(v) {
  return { es: v.es, en: v.en.split('/')[0].trim(), endsO: v.rule === 'ends_o' };
}

function toNounGame(v, number = 'sg') {
  return {
    es: v.es,
    plural: v.plural,
    en: v.en.split('/')[0].trim(),
    gender: v.gender,
    number,
  };
}

function addCh3AdjectiveDrills(questions, sublesson, count) {
  const byId = Object.fromEntries(sublesson.vocabulary.map(v => [v.id, v]));
  shuffle([...CH3_ADJ_DRILL_PAIRS]).slice(0, count).forEach(([nounId, adjId], i) => {
    const nounV = byId[nounId];
    const adjV = byId[adjId];
    if (!nounV || !adjV) return;
    questions.push({
      type: 'adjective',
      noun: toNounGame(nounV, i % 3 === 0 ? 'pl' : 'sg'),
      adjective: toAdjGame(adjV),
    });
  });
}

function build_3_1(sublesson) {
  const questions = [];
  const vocab = sublesson.vocabulary.filter(v => v.article);
  const hayExprs = sublesson.vocabulary.filter(v => !v.article);
  addMatching(questions, hayExprs, { rounds: 1 });
  addMatching(questions, sublesson.hayDrills, { rounds: 2, mapPair: d => ({ es: d.es, en: d.en }) });
  addMatching(questions, vocab, { rounds: 2 });
  addArticlePickers(questions, vocab, 5);
  return questions;
}

function build_3_2(sublesson) {
  const questions = [];
  const vocab = sublesson.vocabulary;
  addMatching(questions, sublesson.interrogativeQuestions, {
    rounds: 2,
    mapPair: q => ({ es: q.word, en: q.en }),
  });
  addMatching(questions, vocab, { rounds: 2 });
  addVocabPickers(questions, vocab, 6);
  return questions;
}

function build_3_3(sublesson) {
  const questions = [];
  const days   = sublesson.vocabulary.filter(v => ['lunes','martes','miércoles','jueves','viernes','sábado','domingo'].includes(v.es));
  const months = sublesson.vocabulary.filter(v => v.id.startsWith('d3_') && parseInt(v.id.split('_')[1]) >= 8 && parseInt(v.id.split('_')[1]) <= 19);
  const other  = sublesson.vocabulary.filter(v => !days.includes(v) && !months.includes(v));
  addMatching(questions, days,   { rounds: 4 });
  addMatching(questions, months, { rounds: 3 });
  addMatching(questions, other,   { rounds: 3 });
  return questions;
}

function build_3_4(sublesson) {
  const questions = [];
  const nouns = sublesson.vocabulary.filter(v => v.article === 'el' || v.article === 'la');
  const adjs  = sublesson.vocabulary.filter(v => !v.article || v.article === '');
  addMatching(questions, nouns, { rounds: 2 });
  addArticlePickers(questions, nouns, 5);
  addMatching(questions, adjs, { rounds: 2 });
  addSentenceCompletions(questions, sublesson.readingComprehensionDrills, 4);
  addCh3AdjectiveDrills(questions, sublesson, 3);
  addSentenceCompletions(questions, sublesson.mixedVerbDrills, 3);
  return questions;
}

export const builders = {
  '3-1': build_3_1,
  '3-2': build_3_2,
  '3-3': build_3_3,
  '3-4': build_3_4,
};

export { CH3_ADJ_DRILL_PAIRS };
