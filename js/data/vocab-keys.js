/* ─── Fluir · Vocab array keys ───────────────────────────────────────────────
   Shared list of sublesson property names that hold exportable vocabulary.
   ─────────────────────────────────────────────────────────────────────────── */

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

export default VOCAB_KEYS;
export { VOCAB_KEYS, vocabItemId, collectChapterVocabIds };
