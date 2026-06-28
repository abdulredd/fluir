/* ─── Fluir · Chapter access policy ────────────────────────────────────────
   Single source of truth for lesson and practice unlock rules.
   Catalog fields (title, hasContent) live in chapters-list.js; user state
   in Store progress/settings. Access is always derived — never stored on data.
   ─────────────────────────────────────────────────────────────────────────── */

/**
 * Lesson access: user can open #/chapter/:id
 *
 * - settings.unlockAll bypasses progression
 * - Chapter 1 is always available
 * - Otherwise: previous chapter complete, or this chapter started/complete
 */
function isLessonUnlocked(chapterId, progress, settings = {}) {
  if (settings.unlockAll) return true;
  if (chapterId === 1) return true;
  if (progress.chaptersComplete?.includes(chapterId - 1)) return true;
  if (progress.chaptersStarted?.includes(chapterId)) return true;
  if (progress.chaptersComplete?.includes(chapterId)) return true;
  return false;
}

/**
 * Practice access: user can open #/training/:id
 *
 * - settings.unlockAllPractice bypasses completion requirement
 * - Otherwise: chapter lesson must be complete
 */
function isPracticeUnlocked(chapterId, progress, settings = {}) {
  if (settings.unlockAllPractice) return true;
  return progress.chaptersComplete?.includes(chapterId) ?? false;
}

/** Chapter ids eligible for the practice hub list. */
function practiceUnlockedChapterIds(catalog, progress, settings = {}) {
  if (settings.unlockAllPractice) return catalog.map(ch => ch.id);
  return progress.chaptersComplete ?? [];
}

export { isLessonUnlocked, isPracticeUnlocked, practiceUnlockedChapterIds };
