/* ─── Fluir · Store — localStorage abstraction ──────────────────────────── */

const KEYS = {
  CHAPTERS:     'fluir_chapters',
  PROGRESS:     'fluir_progress',
  ANKI_QUEUE:   'fluir_anki_queue',
  SETTINGS:     'fluir_settings',
  LESSON_STATE: 'fluir_lesson_state',
};

const Store = {

  /* ── Generic ── */

  get(key) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : null;
    } catch(e) {
      console.error(`[Store] get error for key "${key}":`, e);
      return null;
    }
  },

  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch(e) {
      console.error(`[Store] set error for key "${key}":`, e);
      return false;
    }
  },

  remove(key) {
    localStorage.removeItem(key);
  },

  /* ── Chapters ── */

  getChapters() {
    return this.get(KEYS.CHAPTERS) || {};
  },

  getChapter(id) {
    const chapters = this.getChapters();
    return chapters[id] || null;
  },

  saveChapter(id, data) {
    const chapters = this.getChapters();
    chapters[id] = { ...chapters[id], ...data, id, updatedAt: Date.now() };
    return this.set(KEYS.CHAPTERS, chapters);
  },

  /* ── Progress ── */

  getProgress() {
    return this.get(KEYS.PROGRESS) || {
      currentStreak:    0,
      longestStreak:    0,
      lastStudyDate:    null,
      chaptersStarted:  [],
      chaptersComplete: [],
      lessonScores:     {},
    };
  },

  saveProgress(data) {
    const current = this.getProgress();
    return this.set(KEYS.PROGRESS, { ...current, ...data });
  },

  recordStudySession() {
    const progress = this.getProgress();
    const today    = new Date().toISOString().split('T')[0];
    const last     = progress.lastStudyDate;

    if (last === today) return progress;

    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    const streak    = last === yesterday ? progress.currentStreak + 1 : 1;

    const updated = {
      ...progress,
      lastStudyDate: today,
      currentStreak: streak,
      longestStreak: Math.max(streak, progress.longestStreak),
    };

    this.set(KEYS.PROGRESS, updated);
    return updated;
  },

  recordChapterStart(id) {
    const progress = this.getProgress();
    if (!progress.chaptersStarted.includes(id)) {
      progress.chaptersStarted.push(id);
      this.set(KEYS.PROGRESS, progress);
    }
  },

  recordChapterComplete(id, score) {
    const progress = this.getProgress();

    if (!progress.chaptersComplete.includes(id)) {
      progress.chaptersComplete.push(id);
    }

    if (!progress.lessonScores[id] || score > progress.lessonScores[id].best) {
      progress.lessonScores[id] = {
        best:     score,
        attempts: (progress.lessonScores[id]?.attempts || 0) + 1,
        date:     new Date().toISOString().split('T')[0],
      };
    } else {
      progress.lessonScores[id].attempts++;
    }

    this.set(KEYS.PROGRESS, progress);
  },

  /* ── Anki queue ── */

  getAnkiQueue() {
    return this.get(KEYS.ANKI_QUEUE) || { exported: [], pending: [] };
  },

  addToAnkiQueue(vocabIds) {
    const queue = this.getAnkiQueue();
    vocabIds.forEach(id => {
      if (!queue.exported.includes(id) && !queue.pending.includes(id)) {
        queue.pending.push(id);
      }
    });
    return this.set(KEYS.ANKI_QUEUE, queue);
  },

  markAnkiExported(vocabIds) {
    const queue = this.getAnkiQueue();
    vocabIds.forEach(id => {
      queue.pending  = queue.pending.filter(v => v !== id);
      if (!queue.exported.includes(id)) queue.exported.push(id);
    });
    return this.set(KEYS.ANKI_QUEUE, queue);
  },

  /* ── Settings ── */

  getSettings() {
    return this.get(KEYS.SETTINGS) || {
      audioEnabled:   true,
      audioSource:    'webspeech',
      newCardsPerDay: 10,
    };
  },

  saveSetting(key, value) {
    const settings = this.getSettings();
    settings[key]  = value;
    return this.set(KEYS.SETTINGS, settings);
  },

  /* ── Lesson session state ── */

  /* Save mid-lesson state so user can resume at the right sub-lesson */
  saveLessonState(chapterId, state) {
    return this.set(KEYS.LESSON_STATE, {
      chapterId,
      subIndex:          state.subIndex,
      completedSubLessons: state.completedSubLessons,
      sessionCorrect:    state.sessionCorrect,
      sessionTotal:      state.sessionTotal,
      savedAt:           Date.now(),
    });
  },

  getLessonState(chapterId) {
    const state = this.get(KEYS.LESSON_STATE);
    if (!state || state.chapterId !== chapterId) return null;
    /* Expire state older than 7 days */
    if (Date.now() - state.savedAt > 7 * 24 * 60 * 60 * 1000) {
      this.clearLessonState();
      return null;
    }
    return state;
  },

  clearLessonState() {
    this.remove(KEYS.LESSON_STATE);
  },

  /* ── Dev utility ── */

  clearAll() {
    Object.values(KEYS).forEach(k => localStorage.removeItem(k));
    console.log('[Store] All Fluir data cleared.');
  },
};

export default Store;
export { KEYS };
