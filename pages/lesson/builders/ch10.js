import { shuffle } from '../../../js/utils.js';
import { conjugateIrr } from '../../../js/data/chapter6.js';
import {
  addMatching,
  infinitivePair,
  addConjugationDrill,
  addSentenceCompletions,
  verbEnShort,
} from '../builder-utils.js';

const PRONOUNS_10 = ['yo', 'tú', 'él/ella', 'nosotros', 'ellos'];
const conjugateIrrVerb = (v, p) => conjugateIrr(v.forms, p);

function build_10_1(sublesson) {
  const questions = [];
  addSentenceCompletions(questions, sublesson.sentenceCompletionDrills);
  questions.push({
    type: 'matching',
    pairs: sublesson.pronounTable.slice(0, 4).map(p => ({ es: p.pronoun, en: p.en })),
  });
  questions.push({
    type: 'matching',
    pairs: shuffle(sublesson.pronounTable.map(p => ({ es: p.clarifier, en: p.en }))).slice(0, 4),
  });
  return questions;
}

function build_10_2(sublesson) {
  const questions = [];
  addMatching(questions, sublesson.verbs, {
    rounds: 4,
    mapPair: v => ({ es: v.es, en: v.en }),
  });
  addSentenceCompletions(questions, sublesson.sentenceCompletionDrills);
  return questions;
}

function build_10_3(sublesson) {
  const questions = [];
  const verbs = sublesson.verbs;
  addMatching(questions, verbs, { rounds: 3, mapPair: infinitivePair });
  addConjugationDrill(questions, verbs, 8, {
    pronouns: PRONOUNS_10,
    conjugate: conjugateIrrVerb,
    enFor: (v, p) => `${p} ${verbEnShort(v)}`,
  });
  addSentenceCompletions(questions, sublesson.sentenceCompletionDrills);
  return questions;
}

function build_10_4(sublesson) {
  const questions = [];
  addSentenceCompletions(questions, sublesson.sentenceCompletionDrills);
  addMatching(questions, sublesson.placementDrills, {
    rounds: 3,
    mapPair: d => ({ es: d.beforeVerb, en: d.en }),
  });
  return questions;
}

export const builders = {
  '10-1': build_10_1,
  '10-2': build_10_2,
  '10-3': build_10_3,
  '10-4': build_10_4,
};
