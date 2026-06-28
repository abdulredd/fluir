/* ─── Fluir · Vocab array keys ───────────────────────────────────────────────
   Shared list of sublesson property names that hold exportable vocabulary.
   ─────────────────────────────────────────────────────────────────────────── */

import {
  BROWSE_SECTION_ORDER,
  vocabBrowseCategory,
  vocabBrowseSectionLabel,
  vocabSectionLabel,
} from '../vocab-display.js';

const VOCAB_KEYS = [
  'vocabulary', 'adjectives', 'verbs', 'idioms', 'tenerExpressions', 'hacerExpressions',
  'locationPrepositions', 'porExpressions', 'becomeExpressions', 'movementVerbs',
  'reciprocalVerbs', 'impersonalExpressions', 'emotionVerbs', 'commandVerbs', 'conjunctions',
  'readingVocab',
];

/** Stable id for queue/export — matches logic in anki.js normalizeItem. */
function vocabItemId(raw, chapterId, arrayKey) {
  if (raw.id) return raw.id;
  const es = raw.es || raw.infinitive || '';
  if (!es) return null;
  return `${chapterId}_${arrayKey}_${es.replace(/\s+/g, '_')}`;
}

/** All vocab ids from a chapter (every VOCAB_KEYS array on every sublesson). */
function collectChapterVocabIds(chapter) {
  const ids = [];
  chapter.sublessons.forEach(sl => {
    VOCAB_KEYS.forEach(key => {
      const arr = sl[key];
      if (!arr?.length) return;
      arr.forEach(raw => {
        const id = vocabItemId(raw, chapter.id, key);
        if (id) ids.push(id);
      });
    });
  });
  return ids;
}

/** Merge vocab arrays by key across all sublessons (stable VOCAB_KEYS order). */
function collectChapterVocabByKey(chapter) {
  /** @type {Record<string, object[]>} */
  const buckets = {};
  chapter.sublessons.forEach(sl => {
    VOCAB_KEYS.forEach(key => {
      const arr = sl[key];
      if (!arr?.length) return;
      if (!buckets[key]) buckets[key] = [];
      buckets[key].push(...arr);
    });
  });
  return buckets;
}

/**
 * Browse sections for one chapter — splits the mixed `vocabulary` bucket by word type.
 * @param {import('./types.js').Chapter} chapter
 * @returns {{ label: string, category: string, arrayKey: string, items: object[] }[]}
 */
function collectChapterVocabBrowseSections(chapter) {
  const buckets = collectChapterVocabByKey(chapter);
  /** @type {{ label: string, category: string, arrayKey: string, items: object[] }[]} */
  const sections = [];

  const vocabItems = buckets.vocabulary || [];
  if (vocabItems.length) {
    /** @type {Record<string, object[]>} */
    const byCategory = {};
    vocabItems.forEach(item => {
      const category = vocabBrowseCategory(item);
      if (!byCategory[category]) byCategory[category] = [];
      byCategory[category].push(item);
    });
    BROWSE_SECTION_ORDER.forEach(category => {
      const items = byCategory[category];
      if (!items?.length) return;
      sections.push({
        category,
        label: vocabBrowseSectionLabel(category),
        arrayKey: 'vocabulary',
        items,
      });
    });
  }

  VOCAB_KEYS.forEach(key => {
    if (key === 'vocabulary') return;
    const items = buckets[key];
    if (!items?.length) return;
    sections.push({
      category: key,
      label: vocabSectionLabel(key),
      arrayKey: key,
      items,
    });
  });

  return sections;
}

export default VOCAB_KEYS;
export {
  VOCAB_KEYS,
  vocabItemId,
  collectChapterVocabIds,
  collectChapterVocabByKey,
  collectChapterVocabBrowseSections,
};
