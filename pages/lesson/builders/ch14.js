import {
  addMatching,
  infinitivePair,
  addConjugationFromFormsMap,
  addSentenceCompletions,
} from '../builder-utils.js';

const PRONOUNS_14 = ['yo', 'tú', 'él/ella', 'nosotros', 'ellos'];

function build_14_1(sublesson) {
  const questions = [];
  const verbs = sublesson.verbs;
  addMatching(questions, verbs, { rounds: 3, mapPair: infinitivePair });
  addConjugationFromFormsMap(questions, verbs, 12, {
    pronouns: PRONOUNS_14,
    verbSuffix: ' (preterit)',
  });
  addMatching(questions, sublesson.timeExpressions, {
    size: 4,
    mapPair: t => ({ es: t.es, en: t.en }),
  });
  return questions;
}

function build_14_2(sublesson) {
  const questions = [];
  addMatching(questions, sublesson.arSpellingChanges, {
    rounds: 2,
    mapPair: v => ({ es: v.infinitive, en: `yo: ${v.yo}` }),
  });
  addMatching(questions, sublesson.erIrSpellingChanges, {
    rounds: 2,
    mapPair: v => ({ es: v.infinitive, en: `él: ${v.forms.el}` }),
  });
  addSentenceCompletions(questions, sublesson.sentenceCompletionDrills);
  return questions;
}

function build_14_3(sublesson) {
  const questions = [];
  const allIrreg = [
    ...sublesson.verbGroups.uStem,
    ...sublesson.verbGroups.jStem,
    ...sublesson.verbGroups.iStem,
    ...sublesson.verbGroups.special,
  ];
  addMatching(questions, allIrreg, { rounds: 4, mapPair: infinitivePair });
  addConjugationFromFormsMap(questions, allIrreg, 14, {
    pronouns: PRONOUNS_14,
    verbSuffix: ' (preterit)',
  });
  return questions;
}

function build_14_4(sublesson) {
  const questions = [];
  const stemChanges = sublesson.irStemChanges;
  addMatching(questions, stemChanges, { rounds: 2, mapPair: infinitivePair });
  addConjugationFromFormsMap(questions, stemChanges, 8, {
    pronouns: PRONOUNS_14,
    verbSuffix: ' (preterit)',
    pickPronoun: () => ['él/ella', 'ellos', 'yo', 'tú'][Math.floor(Math.random() * 4)],
  });
  addMatching(questions, sublesson.compoundVerbs, {
    size: 4,
    mapPair: v => ({ es: v.infinitive, en: `${v.en} (like ${v.rootVerb})` }),
  });
  addSentenceCompletions(questions, sublesson.sentenceCompletionDrills);
  return questions;
}

export const builders = {
  '14-1': build_14_1,
  '14-2': build_14_2,
  '14-3': build_14_3,
  '14-4': build_14_4,
};
