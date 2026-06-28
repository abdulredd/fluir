/* ─── Fluir · Training question generator ───────────────────────────────────
   Builds fresh practice questions from full source pools with coverage bias.
   ─────────────────────────────────────────────────────────────────────────── */

/** @import { Sublesson, LessonQuestion } from '../types.js' */

import { shuffle } from '../utils.js';
import {
  createTrainingSession,
  pickWithCoverage,
  pickOneWithCoverage,
  recordSeen,
} from './coverage.js';
import {
  getMatchingPairPool,
  collectVocabulary,
  collectSentenceDrills,
  collectSerVsEstar,
  collectNumberQuizDrills,
  collectAdjectiveItems,
  collectConjugationItems,
  vocabKey,
} from './practice-sources.js';
import { availablePracticeTypes } from './lesson-types.js';

const MATCHING_ROUND_SIZE = 4;

/**
 * @param {import('./coverage.js').TrainingSession} session
 * @param {Sublesson[]} sublessons
 * @returns {LessonQuestion|null}
 */
function generateMatchingQuestion(sublessons, session) {
  const pool = getMatchingPairPool(sublessons);
  if (pool.length < 2) return null;

  const picked = pickWithCoverage(pool, session, MATCHING_ROUND_SIZE, p => p.key);
  recordSeen(session, picked.map(p => p.key));

  return {
    type: 'matching',
    pairs: picked.map(p => ({ es: p.es, en: p.en })),
  };
}

/**
 * @param {object} vocab
 * @param {object[]} allVocab
 * @param {number} distractorCount
 */
function freshDistractors(vocab, allVocab, distractorCount = 3) {
  return shuffle(allVocab.filter(o => vocabKey(o) !== vocabKey(vocab)))
    .slice(0, distractorCount)
    .map(o => o.es);
}

/**
 * @param {import('./coverage.js').TrainingSession} session
 * @param {Sublesson[]} sublessons
 * @returns {LessonQuestion|null}
 */
function generateVocabPickerQuestion(sublessons, session) {
  const pool = collectVocabulary(sublessons);
  const vocab = pickOneWithCoverage(pool, session, vocabKey);
  if (!vocab) return null;

  const key = `${vocabKey(vocab)}:vocab-picker`;
  recordSeen(session, [key]);

  return {
    type: 'vocab-picker',
    vocab,
    distractors: freshDistractors(vocab, pool),
  };
}

/**
 * @param {import('./coverage.js').TrainingSession} session
 * @param {Sublesson[]} sublessons
 * @returns {LessonQuestion|null}
 */
function generateArticlePickerQuestion(sublessons, session) {
  const pool = collectVocabulary(sublessons).filter(v => v.article);
  const vocab = pickOneWithCoverage(pool, session, vocabKey);
  if (!vocab) return null;

  const key = `${vocabKey(vocab)}:article-picker`;
  recordSeen(session, [key]);

  return { type: 'article-picker', vocab };
}

/**
 * @param {import('./coverage.js').TrainingSession} session
 * @param {Sublesson[]} sublessons
 * @returns {LessonQuestion|null}
 */
function generateFillArticleQuestion(sublessons, session) {
  const pool = collectVocabulary(sublessons).filter(v => v.article);
  const vocab = pickOneWithCoverage(pool, session, vocabKey);
  if (!vocab) return null;

  const key = `${vocabKey(vocab)}:fill-article`;
  recordSeen(session, [key]);

  return { type: 'fill-article', vocab };
}

/**
 * @param {import('./coverage.js').TrainingSession} session
 * @param {Sublesson[]} sublessons
 * @returns {LessonQuestion|null}
 */
function generateTranslationQuestion(sublessons, session) {
  const pool = collectVocabulary(sublessons).filter(v =>
    v.article && v.article !== 'el/la' && !v.indef,
  );
  const vocab = pickOneWithCoverage(pool, session, vocabKey);
  if (!vocab) return null;

  const key = `${vocabKey(vocab)}:translation`;
  recordSeen(session, [key]);

  return { type: 'translation', vocab };
}

/**
 * @param {import('./coverage.js').TrainingSession} session
 * @param {Sublesson[]} sublessons
 * @returns {LessonQuestion|null}
 */
function generatePluralPickerQuestion(sublessons, session) {
  const pool = collectVocabulary(sublessons).filter(v => v.plural && v.indef);
  const vocab = pickOneWithCoverage(pool, session, v => `${vocabKey(v)}:plural`);
  if (!vocab) return null;

  const key = `${vocabKey(vocab)}:plural-picker`;
  recordSeen(session, [key]);

  return { type: 'plural-picker', vocab: { ...vocab, article: vocab.indef } };
}

/**
 * @param {import('./coverage.js').TrainingSession} session
 * @param {Sublesson[]} sublessons
 * @returns {LessonQuestion|null}
 */
function generateAdjectiveQuestion(sublessons, session) {
  const pool = collectAdjectiveItems(sublessons);
  const item = pickOneWithCoverage(pool, session, i => i.key);
  if (!item) return null;

  recordSeen(session, [item.key]);

  return {
    type: 'adjective',
    noun: item.noun,
    adjective: item.adjective,
  };
}

/**
 * @param {import('./coverage.js').TrainingSession} session
 * @param {Sublesson[]} sublessons
 * @returns {LessonQuestion|null}
 */
function generateConjugationQuestion(sublessons, session) {
  const pool = collectConjugationItems(sublessons);
  const item = pickOneWithCoverage(pool, session, i => i.key);
  if (!item) return null;

  recordSeen(session, [item.key]);
  return item.question;
}

/**
 * @param {import('./coverage.js').TrainingSession} session
 * @param {Sublesson[]} sublessons
 * @returns {LessonQuestion|null}
 */
function generateSerVsEstarQuestion(sublessons, session) {
  const pool = collectSerVsEstar(sublessons);
  const item = pickOneWithCoverage(pool, session, i => `${i.sublessonId}:${i.question.sentence}`);
  if (!item) return null;

  const key = `${item.sublessonId}:${item.question.sentence}`;
  recordSeen(session, [key]);

  return { type: 'ser-vs-estar', ...item.question };
}

/**
 * @param {import('./coverage.js').TrainingSession} session
 * @param {Sublesson[]} sublessons
 * @returns {LessonQuestion|null}
 */
function generateSentenceCompletionQuestion(sublessons, session) {
  const pool = collectSentenceDrills(sublessons);
  const item = pickOneWithCoverage(pool, session, i => `${i.sublessonId}:${i.drill.sentence}`);
  if (!item) return null;

  const key = `${item.sublessonId}:${item.drill.sentence}`;
  recordSeen(session, [key]);

  return { type: 'sentence-completion', ...item.drill };
}

/**
 * @param {import('./coverage.js').TrainingSession} session
 * @param {Sublesson[]} sublessons
 * @returns {LessonQuestion|null}
 */
function generateNumberQuizQuestion(sublessons, session) {
  const pool = collectNumberQuizDrills(sublessons);
  const item = pickOneWithCoverage(
    pool,
    session,
    i => `${i.sublessonId}:${i.mode}:${i.drill.numeral}:${i.drill.spanish}`,
  );
  if (!item) return null;

  const key = `${item.sublessonId}:${item.mode}:${item.drill.numeral}:${item.drill.spanish}`;
  recordSeen(session, [key]);

  const { drill, mode, pool: drillPool } = item;
  const distractors = shuffle(drillPool.filter(x =>
    mode === 'word-to-numeral' ? x.numeral !== drill.numeral : x.spanish !== drill.spanish,
  )).slice(0, 3).map(x => (mode === 'word-to-numeral' ? x.numeral : x.spanish));

  return {
    type: 'number-quiz',
    mode,
    numeral: drill.numeral,
    spanish: drill.spanish,
    distractors,
  };
}

const GENERATORS = {
  'matching':            generateMatchingQuestion,
  'vocab-picker':        generateVocabPickerQuestion,
  'article-picker':      generateArticlePickerQuestion,
  'fill-article':        generateFillArticleQuestion,
  'translation':         generateTranslationQuestion,
  'plural-picker':       generatePluralPickerQuestion,
  'adjective':           generateAdjectiveQuestion,
  'conjugation':         generateConjugationQuestion,
  'ser-vs-estar':        generateSerVsEstarQuestion,
  'sentence-completion': generateSentenceCompletionQuestion,
  'number-quiz':         generateNumberQuizQuestion,
};

/**
 * @param {Sublesson[]} sublessons
 * @param {string} gameType
 * @param {import('./coverage.js').TrainingSession} session
 * @returns {LessonQuestion|null}
 */
function generateTrainingQuestion(sublessons, gameType, session) {
  if (gameType === 'random') {
    const types = availablePracticeTypes(sublessons);
    if (!types.length) return null;
    const picked = pickOneWithCoverage(
      types.map(t => ({ type: t })),
      session,
      x => `random-type:${x.type}`,
    );
    if (!picked) return null;
    return generateTrainingQuestion(sublessons, picked.type, session);
  }

  const allowed = new Set(availablePracticeTypes(sublessons));
  if (!allowed.has(gameType)) return null;

  const generate = GENERATORS[gameType];
  if (!generate) return null;
  return generate(sublessons, session);
}

export {
  createTrainingSession,
  generateTrainingQuestion,
  MATCHING_ROUND_SIZE,
};

export { availablePracticeTypes } from './lesson-types.js';
