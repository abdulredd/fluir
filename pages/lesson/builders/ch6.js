import { shuffle } from '../../../js/utils.js';
import { ALL_VERBS_CH6, conjugateIrr } from '../../../js/data/chapter6.js';

function build_6_1(sublesson) {
  const questions = [];
  const pronouns = ['yo','tú','él/ella','nosotros','ellos'];
      const verbs = sublesson.verbs;
  
      /* Matching: infinitive → meaning */
      for (let i = 0; i < 2; i++) {
        const pairs = shuffle(verbs).slice(0, 4).map(v => ({ es: v.infinitive, en: v.en }));
        questions.push({ type: 'matching', pairs });
      }
  
      /* Conjugation: given pronoun, pick the correct irregular form */
      shuffle(verbs).slice(0, 10).forEach(v => {
        const pronoun = pronouns[Math.floor(Math.random() * pronouns.length)];
        const correctForm = conjugateIrr(v.forms, pronoun);
        /* Build distractor pool from other verbs' same pronoun forms */
        const distractorForms = verbs
          .filter(x => x.infinitive !== v.infinitive)
          .map(x => conjugateIrr(x.forms, pronoun))
          .filter(f => f !== correctForm);
        const allForms = pronouns.map(p => ({ pronoun: p, form: conjugateIrr(v.forms, p) }));
        const uniqueForms = [...new Map(allForms.map(f => [f.form, f])).values()];
        questions.push({
          type: 'conjugation',
          pronoun,
          correctForm,
          verb: v.infinitive,
          en: `${pronoun} ${v.en.split('/')[0].replace('to ','').trim()}`,
          allForms: uniqueForms,
        });
      });
  return questions;
}

function build_6_4(sublesson) {
  const questions = [];
  /* Mixed irregular drill — all 24 verbs */
      const pronouns = ['yo','tú','él/ella','nosotros','ellos','Ud.','Uds.'];
      const allVerbs = ALL_VERBS_CH6;
  
      shuffle(allVerbs).slice(0, 18).forEach(v => {
        const pronoun = pronouns[Math.floor(Math.random() * pronouns.length)];
        const correctForm = conjugateIrr(v.forms, pronoun);
        const allForms = ['yo','tú','él/ella','nosotros','ellos'].map(p => ({ pronoun: p, form: conjugateIrr(v.forms, p) }));
        const uniqueForms = [...new Map(allForms.map(f => [f.form, f])).values()];
        questions.push({
          type: 'conjugation',
          pronoun,
          correctForm,
          verb: v.infinitive,
          en: `${pronoun} ${v.en.split('/')[0].replace('to ','').trim()}`,
          allForms: uniqueForms,
        });
      });
  
      /* Matching: infinitive → meaning, mixed across all groups */
      for (let i = 0; i < 3; i++) {
        const pairs = shuffle(allVerbs).slice(0, 4).map(v => ({ es: v.infinitive, en: v.en }));
        questions.push({ type: 'matching', pairs });
      }
  return questions;
}

export const builders = {
  '6-1': build_6_1,
  '6-2': build_6_1,
  '6-3': build_6_1,
  '6-4': build_6_4,
};
