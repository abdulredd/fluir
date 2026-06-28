import { shuffle } from '../../../js/utils.js';
import { conjugate as conjugateCh5 } from '../../../js/data/chapter5.js';
import {
  addMatching,
  infinitivePair,
  addConjugationFromTable,
  addConjugationDrill,
  verbEnShort,
} from '../builder-utils.js';

const PRONOUNS_7 = ['yo', 'tú', 'él/ella', 'nosotros', 'ellos'];
const conjugateCh5Verb = (v, p) => conjugateCh5(v.stem, v.type, p);

function build_7_1(sublesson) {
  const questions = [];
  addConjugationFromTable(questions, sublesson.conjugations, 8, 'ir');
  addMatching(questions, sublesson.futureDrills, {
    rounds: 3,
    mapPair: d => ({ es: d.sentence, en: d.en }),
  });
  addMatching(questions, sublesson.vocabulary.filter(v => v.article));
  return questions;
}

function build_7_2(sublesson) {
  const questions = [];
  addMatching(questions, sublesson.hacerExpressions, { rounds: 2, mapPair: h => ({ es: h.es, en: h.en }) });
  addMatching(questions, sublesson.tenerExpressions, { rounds: 4, mapPair: t => ({ es: t.es, en: t.en }) });
  return questions;
}

function build_7_3(sublesson) {
  const questions = [];
  const idioms = sublesson.idioms;
  addMatching(questions, idioms, {
    rounds: 3,
    mapPair: id => ({ es: id.construction, en: id.en }),
  });
  idioms.forEach(idiom => {
    const conj = shuffle(idiom.conjugations)[0];
    const allForms = idiom.conjugations.map(c => ({ pronoun: c.pronoun, form: c.form }));
    questions.push({
      type: 'conjugation',
      pronoun:     conj.pronoun,
      correctForm: conj.form,
      verb:        idiom.construction,
      en:          `${conj.pronoun} ${idiom.en}`,
      allForms,
    });
  });
  return questions;
}

function build_7_4(sublesson) {
  const questions = [];
  const verbs = sublesson.verbs;
  addMatching(questions, verbs, { rounds: 4, mapPair: infinitivePair });
  addConjugationDrill(questions, verbs, 8, {
    pronouns: PRONOUNS_7,
    conjugate: conjugateCh5Verb,
    enFor: (v, p) => `${p} ${verbEnShort(v)}`,
  });
  return questions;
}

export const builders = {
  '7-1': build_7_1,
  '7-2': build_7_2,
  '7-3': build_7_3,
  '7-4': build_7_4,
};
