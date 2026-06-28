import { shuffle } from '../../../js/utils.js';
import { conjugateIrr } from '../../../js/data/chapter6.js';
import {
  addMatching,
  infinitivePair,
  addConjugationDrill,
  addSentenceCompletions,
  verbEnShort,
} from '../builder-utils.js';

const PRONOUNS_11 = ['yo', 'tú', 'él/ella', 'nosotros', 'ellos'];
const conjugateIrrVerb = (v, p) => conjugateIrr(v.forms, p);

function build_11_1(sublesson) {
  const questions = [];
  addSentenceCompletions(questions, sublesson.sentenceCompletionDrills);
  return questions;
}

function build_11_2(sublesson) {
  const questions = [];
  const pairs1 = sublesson.pronounTable.map(p => ({ es: p.pronoun, en: p.en }));
  for (let i = 0; i < 2; i++) {
    questions.push({ type: 'matching', pairs: shuffle(pairs1).slice(0, 4) });
  }
  addSentenceCompletions(questions, sublesson.sentenceCompletionDrills);
  return questions;
}

function build_11_3(sublesson) {
  const questions = [];
  addSentenceCompletions(questions, sublesson.sentenceCompletionDrills);
  questions.push({
    type: 'matching',
    pairs: [
      { es: 'lo', en: 'him / it (masculine)' },
      { es: 'la', en: 'her / it (feminine)' },
      { es: 'los', en: 'them (masculine/mixed)' },
      { es: 'las', en: 'them (feminine)' },
    ],
  });
  return questions;
}

function build_11_4(sublesson) {
  const questions = [];
  const verbs = sublesson.verbs;
  addMatching(questions, verbs, { rounds: 4, mapPair: infinitivePair });
  addConjugationDrill(questions, verbs, 10, {
    pronouns: PRONOUNS_11,
    conjugate: conjugateIrrVerb,
    enFor: (v, p) => `${p} ${verbEnShort(v)}`,
  });
  return questions;
}

export const builders = {
  '11-1': build_11_1,
  '11-2': build_11_2,
  '11-3': build_11_3,
  '11-4': build_11_4,
};
