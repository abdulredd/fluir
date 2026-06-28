import { shuffle } from '../../../js/utils.js';

function build_14_1(sublesson) {
  const questions = [];
  /* Regular preterit — conjugation picker */
      const pronouns = ['yo','tú','él/ella','nosotros','ellos'];
      const verbs = sublesson.verbs;
      /* Matching: infinitive → English */
      for (let i = 0; i < 3; i++) {
        const pairs = shuffle(verbs).slice(0, 4).map(v => ({ es: v.infinitive, en: v.en }));
        questions.push({ type: 'matching', pairs });
      }
      /* Conjugation picker — preterit forms */
      shuffle(verbs).slice(0, 12).forEach(v => {
        const pronoun = pronouns[Math.floor(Math.random() * pronouns.length)];
        const key = pronoun === 'yo' ? 'yo' : pronoun === 'tú' ? 'tu' : pronoun === 'él/ella' ? 'el' : pronoun === 'nosotros' ? 'nos' : 'ellos';
        const correctForm = v.forms[key];
        const allForms = pronouns.map(p => {
          const k = p === 'yo' ? 'yo' : p === 'tú' ? 'tu' : p === 'él/ella' ? 'el' : p === 'nosotros' ? 'nos' : 'ellos';
          return { pronoun: p, form: v.forms[k] };
        });
        const uniqueForms = [...new Map(allForms.map(f => [f.form, f])).values()];
        questions.push({ type: 'conjugation', pronoun, correctForm,
          verb: v.infinitive + ' (preterit)', en: `${pronoun} ${v.en.replace('to ','')}`, allForms: uniqueForms });
      });
      /* Time expressions matching */
      const timeExprs = sublesson.timeExpressions;
      const tPairs = shuffle(timeExprs).slice(0, 4).map(t => ({ es: t.es, en: t.en }));
      questions.push({ type: 'matching', pairs: tPairs });
  return questions;
}

function build_14_2(sublesson) {
  const questions = [];
  /* Spelling changes — sentence completion + conjugation */
      /* -ar spelling changes */
      const arChanges = sublesson.arSpellingChanges;
      for (let i = 0; i < 2; i++) {
        const pairs = shuffle(arChanges).slice(0, 4).map(v => ({ es: v.infinitive, en: `yo: ${v.yo}` }));
        questions.push({ type: 'matching', pairs });
      }
      /* -er/-ir spelling changes */
      const erChanges = sublesson.erIrSpellingChanges;
      for (let i = 0; i < 2; i++) {
        const pairs = shuffle(erChanges).slice(0, 4).map(v => ({ es: v.infinitive, en: `él: ${v.forms.el}` }));
        questions.push({ type: 'matching', pairs });
      }
      /* Sentence completion drills */
      shuffle(sublesson.sentenceCompletionDrills).forEach(d => {
        questions.push({ type: 'sentence-completion', ...d });
      });
  return questions;
}

function build_14_3(sublesson) {
  const questions = [];
  /* Irregular preterit — conjugation picker by group */
      const pronouns = ['yo','tú','él/ella','nosotros','ellos'];
      const allIrreg = [
        ...sublesson.verbGroups.uStem,
        ...sublesson.verbGroups.jStem,
        ...sublesson.verbGroups.iStem,
        ...sublesson.verbGroups.special,
      ];
      /* Matching across groups */
      for (let i = 0; i < 4; i++) {
        const pairs = shuffle(allIrreg).slice(0, 4).map(v => ({ es: v.infinitive, en: v.en }));
        questions.push({ type: 'matching', pairs });
      }
      /* Conjugation picker */
      shuffle(allIrreg).slice(0, 14).forEach(v => {
        const pronoun = pronouns[Math.floor(Math.random() * pronouns.length)];
        const key = pronoun === 'yo' ? 'yo' : pronoun === 'tú' ? 'tu' : pronoun === 'él/ella' ? 'el' : pronoun === 'nosotros' ? 'nos' : 'ellos';
        const correctForm = v.forms[key];
        const allForms = pronouns.map(p => {
          const k = p === 'yo' ? 'yo' : p === 'tú' ? 'tu' : p === 'él/ella' ? 'el' : p === 'nosotros' ? 'nos' : 'ellos';
          return { pronoun: p, form: v.forms[k] };
        });
        const uniqueForms = [...new Map(allForms.map(f => [f.form, f])).values()];
        questions.push({ type: 'conjugation', pronoun, correctForm,
          verb: v.infinitive + ' (preterit)', en: `${pronoun} ${v.en.replace('to ','')}`, allForms: uniqueForms });
      });
  return questions;
}

function build_14_4(sublesson) {
  const questions = [];
  /* -ir stem changes + compound verbs + sentence completion */
      const stemChanges = sublesson.irStemChanges;
      const pronouns = ['yo','tú','él/ella','nosotros','ellos'];
      /* Matching */
      for (let i = 0; i < 2; i++) {
        const pairs = shuffle(stemChanges).slice(0, 4).map(v => ({ es: v.infinitive, en: v.en }));
        questions.push({ type: 'matching', pairs });
      }
      /* Conjugation picker — focus on 3rd person where change occurs */
      shuffle(stemChanges).slice(0, 8).forEach(v => {
        const pronoun = ['él/ella','ellos','yo','tú'][Math.floor(Math.random() * 4)];
        const key = pronoun === 'yo' ? 'yo' : pronoun === 'tú' ? 'tu' : pronoun === 'él/ella' ? 'el' : 'ellos';
        const correctForm = v.forms[key];
        const allForms = pronouns.map(p => {
          const k = p === 'yo' ? 'yo' : p === 'tú' ? 'tu' : p === 'él/ella' ? 'el' : p === 'nosotros' ? 'nos' : 'ellos';
          return { pronoun: p, form: v.forms[k] };
        });
        const uniqueForms = [...new Map(allForms.map(f => [f.form, f])).values()];
        questions.push({ type: 'conjugation', pronoun, correctForm,
          verb: v.infinitive + ' (preterit)', en: `${pronoun} ${v.en.replace('to ','')}`, allForms: uniqueForms });
      });
      /* Compound verbs matching */
      const compounds = sublesson.compoundVerbs;
      const cPairs = shuffle(compounds).slice(0, 4).map(v => ({ es: v.infinitive, en: `${v.en} (like ${v.rootVerb})` }));
      questions.push({ type: 'matching', pairs: cPairs });
      /* Sentence completion */
      shuffle(sublesson.sentenceCompletionDrills).forEach(d => {
        questions.push({ type: 'sentence-completion', ...d });
      });
  return questions;
}

export const builders = {
  '14-1': build_14_1,
  '14-2': build_14_2,
  '14-3': build_14_3,
  '14-4': build_14_4,
};
