/* ─── Fluir · Lesson-aligned practice types ─────────────────────────────────
   Practice game types ≠ every game type peppered into a scored lesson session.
   Lessons mix drill types for variety; practice should target the sublesson topic.
   ─────────────────────────────────────────────────────────────────────────── */

import { buildQuestions } from '../../pages/lesson/questions.js';

/**
 * Sublessons where vocabulary matching is session filler — not the practice focus.
 * Lesson builders still use matching in the quiz; practice omits it here.
 * @type {Set<string>}
 */
const PRACTICE_DROP_MATCHING = new Set([
  '2-2', // Estar — practice conjugation + context, not random vocab matching
  '2-3', // Ser — practice conjugation + articles + context
  '2-4', // Ser vs Estar — practice the distinction + reading, not vocab matching
]);

/**
 * @param {import('../types.js').Sublesson} sl
 * @returns {string[]}
 */
function practiceTypesForSublesson(sl) {
  let types = [...new Set(buildQuestions(sl).map(q => q.type))];

  if (PRACTICE_DROP_MATCHING.has(sl.id) || types.includes('ser-vs-estar')) {
    types = types.filter(t => t !== 'matching');
  }

  return types;
}

/**
 * Game types offered in Training Grounds for the selected sublesson(s).
 * Requires builders loaded — call prepareQuestions first.
 * @param {import('../types.js').Sublesson[]} sublessons
 * @returns {string[]}
 */
function availablePracticeTypes(sublessons) {
  const types = new Set();
  for (const sl of sublessons) {
    for (const t of practiceTypesForSublesson(sl)) {
      types.add(t);
    }
  }
  return [...types];
}

export { availablePracticeTypes, practiceTypesForSublesson, PRACTICE_DROP_MATCHING };
