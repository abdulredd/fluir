/* ─── Fluir · Chapter registry ───────────────────────────────────────────────
   Single import point for full chapter objects, catalog metadata, and vocab keys.
   Adding chapter 16: one new chapter file + one import line here.
   ─────────────────────────────────────────────────────────────────────────── */

/** @import { Chapter, ChapterMeta } from './types.js' */

import CHAPTER_1 from './chapter1.js';
import CHAPTER_2 from './chapter2.js';
import CHAPTER_3 from './chapter3.js';
import CHAPTER_4 from './chapter4.js';
import CHAPTER_5 from './chapter5.js';
import CHAPTER_6 from './chapter6.js';
import CHAPTER_7 from './chapter7.js';
import CHAPTER_8 from './chapter8.js';
import CHAPTER_9 from './chapter9.js';
import CHAPTER_10 from './chapter10.js';
import CHAPTER_11 from './chapter11.js';
import CHAPTER_12 from './chapter12.js';
import CHAPTER_13 from './chapter13.js';
import CHAPTER_14 from './chapter14.js';
import CHAPTER_15 from './chapter15.js';
import { ALL_CHAPTERS } from './chapters-list.js';
import {
  VOCAB_KEYS,
  vocabItemId,
  collectChapterVocabIds,
} from './vocab-keys.js';

/** @type {Record<number, Chapter>} */
const CHAPTERS = {
  1: CHAPTER_1,
  2: CHAPTER_2,
  3: CHAPTER_3,
  4: CHAPTER_4,
  5: CHAPTER_5,
  6: CHAPTER_6,
  7: CHAPTER_7,
  8: CHAPTER_8,
  9: CHAPTER_9,
  10: CHAPTER_10,
  11: CHAPTER_11,
  12: CHAPTER_12,
  13: CHAPTER_13,
  14: CHAPTER_14,
  15: CHAPTER_15,
};

export default CHAPTERS;
export {
  CHAPTERS,
  ALL_CHAPTERS,
  VOCAB_KEYS,
  vocabItemId,
  collectChapterVocabIds,
};
