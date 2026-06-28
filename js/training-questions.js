/* ─── Fluir · Training question picker ─────────────────────────────────────
   Reuses lesson question builders — one random question per round.
   ─────────────────────────────────────────────────────────────────────────── */

/** @import { Sublesson, LessonQuestion } from './types.js' */

import { shuffle } from './utils.js';
import { buildQuestions } from '../pages/lesson/questions.js';

const TYPE_ALIASES = {
  'random': null,
};

/**
 * Pick one training question of the requested game type from sublessons.
 * @param {Sublesson[]} sublessons
 * @param {string} gameType
 * @returns {LessonQuestion|null}
 */
function pickTrainingQuestion(sublessons, gameType) {
  const pool = sublessons.flatMap(sl => buildQuestions(sl));
  if (!pool.length) return null;

  if (gameType === 'random') {
    return shuffle(pool)[0];
  }

  const matching = pool.filter(q => q.type === gameType);
  if (matching.length) return shuffle(matching)[0];

  /* Fallback: closest types for sparse chapters */
  const fallbacks = {
    'article-picker':  ['fill-article', 'translation', 'plural-picker'],
    'fill-article':    ['article-picker', 'translation'],
    'translation':     ['article-picker', 'vocab-picker', 'fill-article'],
    'plural-picker':   ['article-picker', 'adjective'],
    'adjective':       ['translation', 'matching'],
    'conjugation':     ['ser-vs-estar', 'sentence-completion'],
    'ser-vs-estar':    ['conjugation', 'sentence-completion'],
    'number-quiz':     ['matching', 'translation'],
    'sentence-completion': ['conjugation', 'ser-vs-estar', 'matching'],
    'vocab-picker':    ['translation', 'matching'],
    'matching':        ['translation', 'vocab-picker'],
  };

  for (const alt of fallbacks[gameType] || []) {
    const altPool = pool.filter(q => q.type === alt);
    if (altPool.length) return shuffle(altPool)[0];
  }

  return shuffle(pool)[0];
}

export { pickTrainingQuestion, TYPE_ALIASES };
