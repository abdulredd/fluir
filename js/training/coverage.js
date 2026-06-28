/* ─── Fluir · Practice coverage picker ─────────────────────────────────────
   Weighted selection that prioritizes items the learner has not seen yet.
   ─────────────────────────────────────────────────────────────────────────── */

import { shuffle } from '../utils.js';

/** @typedef {{ seenCounts: Map<string, number> }} TrainingSession */

/** @returns {TrainingSession} */
function createTrainingSession() {
  return { seenCounts: new Map() };
}

/** @param {TrainingSession} session @param {string} key */
function getSeenCount(session, key) {
  return session.seenCounts.get(key) ?? 0;
}

/** @param {TrainingSession} session @param {string[]} keys */
function recordSeen(session, keys) {
  for (const key of keys) {
    session.seenCounts.set(key, getSeenCount(session, key) + 1);
  }
}

/**
 * Sort key for coverage weighting — lower = higher priority.
 * Unseen items sort first; among equals, shuffle breaks ties.
 * @param {TrainingSession} session
 * @param {string} key
 * @param {number} tieBreak
 */
function coverageRank(session, key, tieBreak) {
  return getSeenCount(session, key) * 1_000_000 + tieBreak;
}

/**
 * Pick up to `count` items from `pool`, favoring least-seen keys.
 * @template T
 * @param {T[]} pool
 * @param {TrainingSession} session
 * @param {number} count
 * @param {(item: T) => string} getKey
 * @returns {T[]}
 */
function pickWithCoverage(pool, session, count, getKey) {
  if (!pool.length) return [];
  const take = Math.min(count, pool.length);
  const ranked = pool.map((item, i) => ({
    item,
    rank: coverageRank(session, getKey(item), i),
  }));
  ranked.sort((a, b) => a.rank - b.rank || Math.random() - 0.5);
  return ranked.slice(0, take).map(r => r.item);
}

/**
 * Pick one item with coverage bias.
 * @template T
 * @param {T[]} pool
 * @param {TrainingSession} session
 * @param {(item: T) => string} getKey
 * @returns {T|undefined}
 */
function pickOneWithCoverage(pool, session, getKey) {
  const [item] = pickWithCoverage(pool, session, 1, getKey);
  return item;
}

export {
  createTrainingSession,
  getSeenCount,
  recordSeen,
  pickWithCoverage,
  pickOneWithCoverage,
};
