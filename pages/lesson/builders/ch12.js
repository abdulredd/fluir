import {
  addMatching,
  infinitivePair,
  addConjugationFromFormsMap,
  addSentenceCompletions,
  verbEnShort,
} from '../builder-utils.js';

const PRONOUNS_12 = ['yo', 'tú', 'él/ella', 'nosotros', 'ellos'];

function build_12_1(sublesson) {
  const questions = [];
  addSentenceCompletions(questions, sublesson.sentenceCompletionDrills);
  addConjugationFromFormsMap(questions, sublesson.verbs, 8, {
    pronouns: PRONOUNS_12,
    enFor: (v, p) => `${p} ${verbEnShort(v)}`,
  });
  addMatching(questions, sublesson.verbs, { rounds: 2, mapPair: infinitivePair });
  return questions;
}

function build_12_2(sublesson) {
  const questions = [];
  const verbs12 = sublesson.verbs;
  addMatching(questions, verbs12, { rounds: 4, mapPair: infinitivePair });
  addMatching(questions, verbs12.filter(v => v.prep), { rounds: 2, mapPair: infinitivePair });
  return questions;
}

function build_12_3(sublesson) {
  const questions = [];
  addConjugationFromFormsMap(questions, sublesson.verbs, sublesson.verbs.length, {
    pronouns: PRONOUNS_12,
    enFor: (v, p) => `${p} ${verbEnShort(v)}`,
  });
  addSentenceCompletions(questions, sublesson.sentenceCompletionDrills);
  questions.push({
    type: 'matching',
    pairs: sublesson.becomeExpressions.map(b => ({ es: b.es, en: b.en })),
  });
  return questions;
}

function build_12_4(sublesson) {
  const questions = [];
  addMatching(questions, sublesson.movementVerbs, { rounds: 2, mapPair: infinitivePair });
  addMatching(questions, sublesson.reciprocalVerbs, {
    rounds: 2,
    mapPair: v => ({ es: v.es, en: v.en }),
  });
  addSentenceCompletions(questions, sublesson.sentenceCompletionDrills);
  return questions;
}

export const builders = {
  '12-1': build_12_1,
  '12-2': build_12_2,
  '12-3': build_12_3,
  '12-4': build_12_4,
};
