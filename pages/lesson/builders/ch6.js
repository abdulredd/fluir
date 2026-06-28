import { ALL_VERBS_CH6, conjugateIrr } from '../../../js/data/chapter6.js';
import {
  addMatching,
  infinitivePair,
  addConjugationDrill,
  verbEnShort,
} from '../builder-utils.js';

const PRONOUNS_6 = ['yo', 'tú', 'él/ella', 'nosotros', 'ellos'];
const PRONOUNS_6_EXTENDED = ['yo', 'tú', 'él/ella', 'nosotros', 'ellos', 'Ud.', 'Uds.'];
const conjugateIrrVerb = (v, p) => conjugateIrr(v.forms, p);

function build_6_1(sublesson) {
  const questions = [];
  const verbs = sublesson.verbs;
  addMatching(questions, verbs, { rounds: 2, mapPair: infinitivePair });
  addConjugationDrill(questions, verbs, 10, {
    pronouns: PRONOUNS_6,
    conjugate: conjugateIrrVerb,
    enFor: (v, p) => `${p} ${verbEnShort(v)}`,
  });
  return questions;
}

function build_6_4(_sublesson) {
  const questions = [];
  addConjugationDrill(questions, ALL_VERBS_CH6, 18, {
    pronouns: PRONOUNS_6_EXTENDED,
    formPronouns: PRONOUNS_6,
    conjugate: conjugateIrrVerb,
    enFor: (v, p) => `${p} ${verbEnShort(v)}`,
  });
  addMatching(questions, ALL_VERBS_CH6, { rounds: 3, mapPair: infinitivePair });
  return questions;
}

export const builders = {
  '6-1': build_6_1,
  '6-2': build_6_1,
  '6-3': build_6_1,
  '6-4': build_6_4,
};
