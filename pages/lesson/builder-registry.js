/* ─── Fluir · Sublesson question builder registry (lazy-loaded) ───────────── */

/** @import { SublessonBuilder } from '../../js/types.js' */

/** @type {Record<string, SublessonBuilder>} */
const builderCache = {};
const loadedChapters = new Set();

/**
 * @param {string|number} chNum
 */
async function ensureBuilderChapter(chNum) {
  const key = String(chNum);
  if (loadedChapters.has(key)) return;
  const mod = await import(`./builders/ch${key}.js`);
  Object.assign(builderCache, mod.builders);
  loadedChapters.add(key);
}

/**
 * @param {string} sublessonId
 */
async function ensureBuilderForSublesson(sublessonId) {
  const chNum = sublessonId.split('-')[0];
  await ensureBuilderChapter(chNum);
}

/**
 * @param {string} sublessonId
 * @returns {SublessonBuilder|undefined}
 */
function getSublessonBuilder(sublessonId) {
  return builderCache[sublessonId];
}

export {
  builderCache as SUBLESSON_BUILDERS,
  ensureBuilderChapter,
  ensureBuilderForSublesson,
  getSublessonBuilder,
};
