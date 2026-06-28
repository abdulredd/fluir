import { shuffle } from '../../../js/utils.js';
import {
  addMatching,
  infinitivePair,
  addConjugationFromFormsMap,
  addSentenceCompletions,
} from '../builder-utils.js';

const PRONOUNS_15 = ['yo', 'tú', 'él/ella', 'nosotros', 'ellos'];

function build_15_1(sublesson) {
  const questions = [];
  const verbs = sublesson.verbs;
  addMatching(questions, verbs, { rounds: 3, mapPair: infinitivePair });
  addConjugationFromFormsMap(questions, verbs, 14, {
    pronouns: PRONOUNS_15,
    verbSuffix: ' (imperfect)',
  });
  return questions;
}

function build_15_2(sublesson) {
  const questions = [];
  addMatching(questions, sublesson.uses, {
    rounds: 2,
    mapPair: u => ({ es: u.use, en: u.signal }),
  });
  addMatching(questions, sublesson.signalWords, {
    rounds: 2,
    mapPair: s => ({ es: s.es, en: `${s.en} → ${s.tense}` }),
  });
  addSentenceCompletions(questions, sublesson.sentenceCompletionDrills);
  return questions;
}

function build_15_3(sublesson) {
  const questions = [];
  for (let i = 0; i < 3; i++) {
    const sample = shuffle(sublesson.contrastPairs).slice(0, 4);
    questions.push({
      type: 'matching',
      pairs: sample.map(p => ({ es: p.preterit, en: `preterit: ${p.signal.split(' vs ')[0]}` })),
    });
  }
  addSentenceCompletions(questions, sublesson.sentenceCompletionDrills);
  return questions;
}

function build_15_4(sublesson) {
  const questions = [];
  addMatching(questions, sublesson.doublePronouns, {
    rounds: 4,
    mapPair: d => ({ es: d.combined, en: d.en }),
  });
  addSentenceCompletions(questions, sublesson.sentenceCompletionDrills);
  return questions;
}

export const builders = {
  '15-1': build_15_1,
  '15-2': build_15_2,
  '15-3': build_15_3,
  '15-4': build_15_4,
};
