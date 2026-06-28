/* ─── Fluir · Chapter registry ───────────────────────────────────────────────
   Lazy-load full chapter objects; catalog metadata stays in chapters-list.js.
   Adding chapter 16: one new chapter file + one entry in chapters-list.js.
   ─────────────────────────────────────────────────────────────────────────── */

/** @import { Chapter } from './types.js' */

import { ALL_CHAPTERS } from './chapters-list.js';
import {
  VOCAB_KEYS,
  vocabItemId,
  collectChapterVocabIds,
} from './vocab-keys.js';

/** @type {Record<number, Chapter>} */
const chapterCache = {};

/**
 * Load a chapter module on demand (cached after first fetch).
 * @param {number|string} id
 * @returns {Promise<Chapter|null>}
 */
async function loadChapter(id) {
  const n = Number(id);
  if (!Number.isFinite(n) || n < 1) return null;
  if (chapterCache[n]) return chapterCache[n];
  try {
    const mod = await import(`./chapter${n}.js`);
    chapterCache[n] = mod.default;
    return chapterCache[n];
  } catch (err) {
    console.error('[Fluir] Failed to load chapter', n, err);
    return null;
  }
}

/** Preload every chapter that has content (tests, Anki export). */
async function preloadAllChapters() {
  await Promise.all(ALL_CHAPTERS.map(meta => loadChapter(meta.id)));
  return chapterCache;
}

/** Sync view of loaded chapters — populated after loadChapter / preloadAllChapters. */
const CHAPTERS = new Proxy(
  /** @type {Record<number, Chapter>} */ ({}),
  {
    get(_target, prop) {
      const n = Number(prop);
      return Number.isFinite(n) ? chapterCache[n] : undefined;
    },
    ownKeys() {
      return Object.keys(chapterCache);
    },
    getOwnPropertyDescriptor(_target, prop) {
      const n = Number(prop);
      if (Number.isFinite(n) && chapterCache[n] !== undefined) {
        return { enumerable: true, configurable: true };
      }
      return undefined;
    },
  },
);

export default CHAPTERS;
export {
  CHAPTERS,
  ALL_CHAPTERS,
  VOCAB_KEYS,
  vocabItemId,
  collectChapterVocabIds,
  loadChapter,
  preloadAllChapters,
};
