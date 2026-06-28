/* ─── Fluir · Lesson question queue ──────────────────────────────────────── */

/** @import { Sublesson, LessonQuestion } from '../../js/types.js' */

import { shuffle } from '../../js/utils.js';
import {
  ensureBuilderForSublesson,
  getSublessonBuilder,
  SUBLESSON_BUILDERS,
} from './builder-registry.js';

/**
 * Ensure builders for a sublesson are loaded (no-op if cached).
 * @param {Sublesson} sublesson
 */
async function prepareQuestions(sublesson) {
  await ensureBuilderForSublesson(sublesson.id);
}

/**
 * Build the full question queue for a sublesson (pure — no DOM or Store).
 * Call prepareQuestions first when builders may not be loaded yet.
 * @param {Sublesson} sublesson
 * @returns {LessonQuestion[]}
 */
function buildQuestions(sublesson) {
  const builder = getSublessonBuilder(sublesson.id);
  const questions = builder ? builder(sublesson) : [];

  if (sublesson.readingVocab?.length >= 4) {
    for (let i = 0; i < 3; i++) {
      const pairs = shuffle(sublesson.readingVocab).slice(0, 4).map(v => ({ es: v.es, en: v.en }));
      questions.push({ type: 'matching', pairs });
    }
  }

  return questions;
}

export { buildQuestions, prepareQuestions, SUBLESSON_BUILDERS };
