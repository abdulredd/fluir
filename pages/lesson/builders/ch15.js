import { shuffle } from '../../../js/utils.js';

function build_15_1(sublesson) {
  const questions = [];
  /* Imperfect formation — conjugation picker */
      const pronouns = ['yo','tú','él/ella','nosotros','ellos'];
      const verbs = sublesson.verbs;
      /* Matching: infinitive → English */
      for (let i = 0; i < 3; i++) {
        const pairs = shuffle(verbs).slice(0, 4).map(v => ({ es: v.infinitive, en: v.en }));
        questions.push({ type: 'matching', pairs });
      }
      /* Conjugation picker — imperfect forms */
      shuffle(verbs).slice(0, 14).forEach(v => {
        const pronoun = pronouns[Math.floor(Math.random() * pronouns.length)];
        const key = pronoun === 'yo' ? 'yo' : pronoun === 'tú' ? 'tu' : pronoun === 'él/ella' ? 'el' : pronoun === 'nosotros' ? 'nos' : 'ellos';
        const correctForm = v.forms[key];
        const allForms = pronouns.map(p => {
          const k = p === 'yo' ? 'yo' : p === 'tú' ? 'tu' : p === 'él/ella' ? 'el' : p === 'nosotros' ? 'nos' : 'ellos';
          return { pronoun: p, form: v.forms[k] };
        });
        const uniqueForms = [...new Map(allForms.map(f => [f.form, f])).values()];
        questions.push({ type: 'conjugation', pronoun, correctForm,
          verb: v.infinitive + ' (imperfect)', en: `${pronoun} ${v.en.replace('to ','')}`, allForms: uniqueForms });
      });
  return questions;
}

function build_15_2(sublesson) {
  const questions = [];
  /* Uses of imperfect — matching + sentence completion */
      const uses = sublesson.uses;
      for (let i = 0; i < 2; i++) {
        const pairs = shuffle(uses).slice(0, 4).map(u => ({ es: u.use, en: u.signal }));
        questions.push({ type: 'matching', pairs });
      }
      /* Signal words matching — preterit vs imperfect */
      const signals = sublesson.signalWords;
      const imperfectSignals = signals.filter(s => s.tense === 'imperfect');
      const preteritSignals  = signals.filter(s => s.tense === 'preterit');
      for (let i = 0; i < 2; i++) {
        const sample = shuffle(signals).slice(0, 4);
        const pairs = sample.map(s => ({ es: s.es, en: `${s.en} → ${s.tense}` }));
        questions.push({ type: 'matching', pairs });
      }
      /* Sentence completion */
      shuffle(sublesson.sentenceCompletionDrills).forEach(d => {
        questions.push({ type: 'sentence-completion', ...d });
      });
  return questions;
}

function build_15_3(sublesson) {
  const questions = [];
  /* Preterit vs imperfect contrast pairs matching */
      const pairs15 = sublesson.contrastPairs;
      for (let i = 0; i < 3; i++) {
        const sample = shuffle(pairs15).slice(0, 4);
        const pairs = sample.map(p => ({ es: p.preterit, en: `preterit: ${p.signal.split(' vs ')[0]}` }));
        questions.push({ type: 'matching', pairs });
      }
      /* Sentence completion — the core drill */
      shuffle(sublesson.sentenceCompletionDrills).forEach(d => {
        questions.push({ type: 'sentence-completion', ...d });
      });
  return questions;
}

function build_15_4(sublesson) {
  const questions = [];
  /* Double object pronouns matching */
      const dps = sublesson.doublePronouns;
      for (let i = 0; i < 4; i++) {
        const pairs = shuffle(dps).slice(0, 4).map(d => ({ es: d.combined, en: d.en }));
        questions.push({ type: 'matching', pairs });
      }
      /* Sentence completion */
      shuffle(sublesson.sentenceCompletionDrills).forEach(d => {
        questions.push({ type: 'sentence-completion', ...d });
      });
  return questions;
}

export const builders = {
  '15-1': build_15_1,
  '15-2': build_15_2,
  '15-3': build_15_3,
  '15-4': build_15_4,
};
