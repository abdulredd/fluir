/* ─── Fluir · Shared sublesson question builder helpers ───────────────────── */

import { shuffle } from '../../js/utils.js';

/** @typedef {{ type: string, [key: string]: unknown }} LessonQuestion */

const vocabPair = v => ({ es: v.es, en: v.en });
const infinitivePair = v => ({ es: v.infinitive, en: v.en });

/** @param {LessonQuestion[]} questions */
function addMatching(questions, pool, { rounds = 1, size = 4, mapPair = vocabPair } = {}) {
  if (!pool?.length) return;
  for (let i = 0; i < rounds; i++) {
    questions.push({
      type: 'matching',
      pairs: shuffle([...pool]).slice(0, size).map(mapPair),
    });
  }
}

/** @param {LessonQuestion[]} questions */
function addEach(questions, pool, count, build) {
  shuffle([...pool]).slice(0, count).forEach(item => questions.push(build(item)));
}

/** @param {LessonQuestion[]} questions */
function addArticlePickers(questions, pool, count) {
  addEach(questions, pool, count, vocab => ({ type: 'article-picker', vocab }));
}

/** @param {LessonQuestion[]} questions */
function addVocabPickers(questions, pool, count, distractorCount = 3) {
  shuffle([...pool]).slice(0, count).forEach(vocab => {
    const distractors = shuffle(pool.filter(o => o.id !== vocab.id))
      .slice(0, distractorCount)
      .map(o => o.es);
    questions.push({ type: 'vocab-picker', vocab, distractors });
  });
}

/** @param {LessonQuestion[]} questions */
function addConjugationFromTable(questions, conjs, count, verb) {
  shuffle([...conjs]).slice(0, count).forEach(c => {
    questions.push({
      type: 'conjugation',
      pronoun:     c.pronoun,
      correctForm: c.form,
      verb,
      en:          c.en,
      allForms:    conjs,
    });
  });
}

/** @param {LessonQuestion[]} questions */
function addSerVsEstar(questions, pool, count) {
  shuffle([...pool]).slice(0, count).forEach(q => {
    questions.push({ type: 'ser-vs-estar', ...q });
  });
}

/** @param {LessonQuestion[]} questions */
function addSentenceCompletions(questions, drills, count = drills?.length ?? 0) {
  shuffle([...drills]).slice(0, count).forEach(d => {
    questions.push({ type: 'sentence-completion', ...d });
  });
}

function uniqueConjForms(allForms) {
  return [...new Map(allForms.map(f => [f.form, f])).values()];
}

function randomPronoun(pronouns) {
  return pronouns[Math.floor(Math.random() * pronouns.length)];
}

function verbEnShort(v) {
  return v.en.split('/')[0].replace('to ', '').trim();
}

const PRONOUN_TO_FORM_KEY = {
  yo:        'yo',
  tú:        'tu',
  'él/ella': 'el',
  nosotros:  'nos',
  ellos:     'ellos',
};

function conjugateFromFormsMap(verb, pronoun) {
  return verb.forms[PRONOUN_TO_FORM_KEY[pronoun]];
}

/**
 * @param {LessonQuestion[]} questions
 * @param {object[]} verbs — each has `forms` keyed yo/tu/el/nos/ellos
 * @param {number} count
 * @param {object} config
 * @param {string[]} config.pronouns
 * @param {string} [config.verbSuffix='']
 * @param {() => string} [config.pickPronoun]
 * @param {(verb: object, pronoun: string) => string} [config.enFor]
 */
function addConjugationFromFormsMap(questions, verbs, count, { pronouns, verbSuffix = '', pickPronoun, enFor }) {
  shuffle([...verbs]).slice(0, count).forEach(v => {
    const pronoun = pickPronoun ? pickPronoun() : randomPronoun(pronouns);
    const allForms = pronouns.map(p => ({ pronoun: p, form: conjugateFromFormsMap(v, p) }));
    questions.push({
      type: 'conjugation',
      pronoun,
      correctForm: conjugateFromFormsMap(v, pronoun),
      verb:        v.infinitive + verbSuffix,
      en:          enFor ? enFor(v, pronoun) : `${pronoun} ${v.en.replace('to ', '')}`,
      allForms:    uniqueConjForms(allForms),
    });
  });
}

/**
 * @param {LessonQuestion[]} questions
 * @param {object[]} verbs
 * @param {number} count
 * @param {object} config
 * @param {string[]} config.pronouns
 * @param {(verb: object, pronoun: string) => string} config.conjugate
 * @param {string[]} [config.formPronouns]
 * @param {(verb: object, pronoun: string) => string} [config.enFor]
 */
function addConjugationDrill(questions, verbs, count, { pronouns, conjugate, formPronouns, enFor }) {
  const formsFor = formPronouns ?? pronouns;
  shuffle([...verbs]).slice(0, count).forEach(v => {
    const pronoun = randomPronoun(pronouns);
    const correctForm = conjugate(v, pronoun);
    const allForms = formsFor.map(p => ({ pronoun: p, form: conjugate(v, p) }));
    questions.push({
      type: 'conjugation',
      pronoun,
      correctForm,
      verb:     v.infinitive,
      en:       enFor ? enFor(v, pronoun) : `${pronoun} ${verbEnShort(v)}`,
      allForms: uniqueConjForms(allForms),
    });
  });
}

export {
  vocabPair,
  infinitivePair,
  addMatching,
  addEach,
  addArticlePickers,
  addVocabPickers,
  addConjugationFromTable,
  addSerVsEstar,
  addSentenceCompletions,
  addConjugationDrill,
  addConjugationFromFormsMap,
  conjugateFromFormsMap,
  uniqueConjForms,
  randomPronoun,
  verbEnShort,
};
