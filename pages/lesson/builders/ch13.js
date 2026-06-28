import { shuffle } from '../../../js/utils.js';
import { subjunctiveFromYo } from '../../../js/data/chapter13.js';
import { addMatching, addSentenceCompletions } from '../builder-utils.js';

function build_13_1(sublesson) {
  const questions = [];
  const drills = sublesson.formationDrills;
  shuffle(drills).slice(0, 12).forEach(d => {
    const verbForms = drills
      .filter(x => x.infinitive === d.infinitive)
      .map(x => ({ pronoun: x.pronoun, form: x.subjunctive }));
    const uniqueForms = verbForms.length >= 3 ? verbForms :
      ['yo', 'tú', 'él/ella', 'nosotros', 'ellos'].map(p => ({
        pronoun: p,
        form: subjunctiveFromYo(d.indicativeYo, d.type, p),
      }));
    questions.push({
      type: 'conjugation',
      pronoun:     d.pronoun,
      correctForm: d.subjunctive,
      verb:        d.infinitive + ' (subjunctive)',
      en:          `${d.pronoun} ${d.infinitive}`,
      allForms:    uniqueForms,
    });
  });
  addMatching(questions, sublesson.irregularTables, {
    rounds: 2,
    mapPair: v => ({ es: v.infinitive, en: `subj: ${v.forms.yo}` }),
  });
  return questions;
}

function build_13_2(sublesson) {
  const questions = [];
  addMatching(questions, sublesson.impersonalExpressions, {
    rounds: 3,
    mapPair: e => ({ es: e.es, en: e.en }),
  });
  addSentenceCompletions(questions, sublesson.sentenceCompletionDrills);
  return questions;
}

function build_13_3(sublesson) {
  const questions = [];
  addMatching(questions, sublesson.emotionVerbs, {
    rounds: 2,
    mapPair: v => ({ es: v.es, en: v.en }),
  });
  addMatching(questions, sublesson.commandVerbs, {
    rounds: 2,
    mapPair: v => ({ es: v.es, en: v.en }),
  });
  addSentenceCompletions(questions, sublesson.sentenceCompletionDrills);
  return questions;
}

function build_13_4(sublesson) {
  const questions = [];
  addMatching(questions, sublesson.conjunctions, {
    rounds: 3,
    mapPair: c => ({ es: c.es, en: c.en }),
  });
  addSentenceCompletions(questions, sublesson.sentenceCompletionDrills);
  return questions;
}

export const builders = {
  '13-1': build_13_1,
  '13-2': build_13_2,
  '13-3': build_13_3,
  '13-4': build_13_4,
};
