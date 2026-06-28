import { conjugate as conjugateCh5, ALL_VERBS_CH5 } from '../../../js/data/chapter5.js';
import {
  addMatching,
  infinitivePair,
  addConjugationDrill,
  verbEnShort,
} from '../builder-utils.js';

const PRONOUNS_5 = ['yo', 'tú', 'él/ella', 'nosotros', 'ellos'];
const PRONOUNS_5_EXTENDED = ['yo', 'tú', 'él/ella', 'nosotros', 'ellos', 'Ud.', 'Uds.'];
const FORM_PRONOUNS_5 = ['yo', 'tú', 'él/ella', 'nosotros', 'ellos'];
const conjugateCh5Verb = (v, p) => conjugateCh5(v.stem, v.type, p);

function build_5_1(sublesson) {
  const questions = [];
  const verbs = sublesson.verbs;
  addMatching(questions, verbs, { rounds: 3, mapPair: infinitivePair });
  addConjugationDrill(questions, verbs, 10, {
    pronouns: PRONOUNS_5,
    conjugate: conjugateCh5Verb,
    enFor: (v, p) => `${p} ${v.en.replace('to ', '')}`,
  });
  return questions;
}

function build_5_2(sublesson) {
  const questions = [];
  const verbs = sublesson.verbs;
  addMatching(questions, verbs, { rounds: 3, mapPair: infinitivePair });
  addConjugationDrill(questions, verbs, 10, {
    pronouns: PRONOUNS_5,
    conjugate: conjugateCh5Verb,
    enFor: (v, p) => `${p} ${v.en.replace('to ', '')}`,
  });
  return questions;
}

function build_5_3(sublesson) {
  const questions = [];
  const verbs = sublesson.verbs;
  addMatching(questions, verbs, { rounds: 2, mapPair: infinitivePair });
  addConjugationDrill(questions, verbs, verbs.length, {
    pronouns: PRONOUNS_5,
    conjugate: conjugateCh5Verb,
    enFor: (v, p) => `${p} ${verbEnShort(v)}`,
  });
  addMatching(questions, sublesson.vocabulary.filter(v => v.article));
  return questions;
}

function build_5_4(_sublesson) {
  const questions = [];
  addConjugationDrill(questions, ALL_VERBS_CH5, 15, {
    pronouns: PRONOUNS_5_EXTENDED,
    formPronouns: FORM_PRONOUNS_5,
    conjugate: conjugateCh5Verb,
    enFor: (v, p) => `${p} ${verbEnShort(v)}`,
  });
  addMatching(questions, ALL_VERBS_CH5, { rounds: 2, mapPair: infinitivePair });
  return questions;
}

export const builders = {
  '5-1': build_5_1,
  '5-2': build_5_2,
  '5-3': build_5_3,
  '5-4': build_5_4,
};
