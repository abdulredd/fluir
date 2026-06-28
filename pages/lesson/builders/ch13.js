import { shuffle } from '../../../js/utils.js';
import { subjunctiveFromYo } from '../../../js/data/chapter13.js';

function build_13_1(sublesson) {
  const questions = [];
  /* Formation drills — conjugation picker using subjunctive forms */
      const drills = sublesson.formationDrills;
      /* Build allForms for each drill from the full drill set */
      shuffle(drills).slice(0, 12).forEach(d => {
        /* Get all 5 forms for this verb by filtering drills of same infinitive */
        const verbForms = drills
          .filter(x => x.infinitive === d.infinitive)
          .map(x => ({ pronoun: x.pronoun, form: x.subjunctive }));
        const uniqueForms = verbForms.length >= 3 ? verbForms :
          ['yo','tú','él/ella','nosotros','ellos'].map(p => ({
            pronoun: p,
            form: subjunctiveFromYo(d.indicativeYo, d.type, p),
          }));
        questions.push({
          type: 'conjugation',
          pronoun: d.pronoun,
          correctForm: d.subjunctive,
          verb: d.infinitive + ' (subjunctive)',
          en: `${d.pronoun} ${d.infinitive}`,
          allForms: uniqueForms,
        });
      });
      /* Six irregular matching */
      const irregs = sublesson.irregularTables;
      for (let i = 0; i < 2; i++) {
        const pairs = shuffle(irregs).slice(0, 4).map(v => ({ es: v.infinitive, en: `subj: ${v.forms.yo}` }));
        questions.push({ type: 'matching', pairs });
      }
  return questions;
}

function build_13_2(sublesson) {
  const questions = [];
  /* Impersonal expressions matching */
      const exprs = sublesson.impersonalExpressions;
      for (let i = 0; i < 3; i++) {
        const pairs = shuffle(exprs).slice(0, 4).map(e => ({ es: e.es, en: e.en }));
        questions.push({ type: 'matching', pairs });
      }
      /* Sentence completion drills */
      shuffle(sublesson.sentenceCompletionDrills).forEach(d => {
        questions.push({ type: 'sentence-completion', ...d });
      });
  return questions;
}

function build_13_3(sublesson) {
  const questions = [];
  /* Emotion verbs matching */
      const emot = sublesson.emotionVerbs;
      const cmd  = sublesson.commandVerbs;
      for (let i = 0; i < 2; i++) {
        const pairs = shuffle(emot).slice(0, 4).map(v => ({ es: v.es, en: v.en }));
        questions.push({ type: 'matching', pairs });
      }
      for (let i = 0; i < 2; i++) {
        const pairs = shuffle(cmd).slice(0, 4).map(v => ({ es: v.es, en: v.en }));
        questions.push({ type: 'matching', pairs });
      }
      /* Sentence completion */
      shuffle(sublesson.sentenceCompletionDrills).forEach(d => {
        questions.push({ type: 'sentence-completion', ...d });
      });
  return questions;
}

function build_13_4(sublesson) {
  const questions = [];
  /* Conjunctions matching */
      const conj = sublesson.conjunctions;
      for (let i = 0; i < 3; i++) {
        const pairs = shuffle(conj).slice(0, 4).map(c => ({ es: c.es, en: c.en }));
        questions.push({ type: 'matching', pairs });
      }
      /* Sentence completion — the hardest lesson */
      shuffle(sublesson.sentenceCompletionDrills).forEach(d => {
        questions.push({ type: 'sentence-completion', ...d });
      });
  return questions;
}

export const builders = {
  '13-1': build_13_1,
  '13-2': build_13_2,
  '13-3': build_13_3,
  '13-4': build_13_4,
};
