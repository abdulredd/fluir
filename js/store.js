/* ─── Fluir · Store — localStorage abstraction ──────────────────────────── */

/** @import { LessonState } from './types.js' */

const SCHEMA_VERSION = 1;
const SCHEMA_KEY     = 'fluir_schema_version';
const MAX_STUDY_DATES = 120;

const KEYS = {
  PROGRESS:     'fluir_progress',
  ANKI_QUEUE:   'fluir_anki_queue',
  SETTINGS:     'fluir_settings',
  LESSON_STATE: 'fluir_lesson_state',
};

const DEFAULT_PROGRESS = {
  currentStreak:    0,
  longestStreak:    0,
  lastStudyDate:    null,
  studyDates:       [],
  chaptersStarted:  [],
  chaptersComplete: [],
  lessonScores:     {},
};

const LESSON_STATE_TTL_MS = 7 * 24 * 60 * 60 * 1000;

let _ready = false;

function backfillStudyDatesFromStreak(progress) {
  const dates = new Set(Array.isArray(progress.studyDates) ? progress.studyDates : []);
  if (progress.lastStudyDate && progress.currentStreak > 0) {
    const last = new Date(progress.lastStudyDate + 'T12:00:00');
    for (let i = 0; i < progress.currentStreak; i++) {
      const d = new Date(last);
      d.setDate(last.getDate() - i);
      dates.add(d.toISOString().split('T')[0]);
    }
  }
  return [...dates].sort().slice(-MAX_STUDY_DATES);
}

function appendStudyDate(dates, dateStr) {
  if (dates.includes(dateStr)) return dates;
  return [...dates, dateStr].sort().slice(-MAX_STUDY_DATES);
}

function normalizeProgress(raw) {
  if (!raw) {
    return {
      ...DEFAULT_PROGRESS,
      studyDates:       [],
      chaptersStarted:  [],
      chaptersComplete: [],
      lessonScores:     {},
    };
  }
  return {
    ...DEFAULT_PROGRESS,
    ...raw,
    studyDates:       Array.isArray(raw.studyDates) ? [...raw.studyDates] : [],
    chaptersStarted:  [...(raw.chaptersStarted || [])],
    chaptersComplete: [...(raw.chaptersComplete || [])],
    lessonScores:     { ...(raw.lessonScores || {}) },
  };
}

const MIGRATIONS = {
  /* v0 → v1: add studyDates; backfill from streak + lastStudyDate */
  1() {
    const raw = localStorage.getItem(KEYS.PROGRESS);
    if (!raw) return;
    let progress;
    try {
      progress = JSON.parse(raw);
    } catch {
      return;
    }
    if (Array.isArray(progress.studyDates)) return;
    progress.studyDates = backfillStudyDatesFromStreak(progress);
    localStorage.setItem(KEYS.PROGRESS, JSON.stringify(progress));
  },
};

function runMigrations() {
  if (typeof localStorage === 'undefined') return;

  let version = parseInt(localStorage.getItem(SCHEMA_KEY) || '0', 10);
  while (version < SCHEMA_VERSION) {
    const next = version + 1;
    MIGRATIONS[next]?.();
    version = next;
    localStorage.setItem(SCHEMA_KEY, String(version));
  }
}

function ensureReady() {
  if (_ready) return;
  runMigrations();
  _ready = true;
}

/** Reset init flag — for tests only. */
function resetStoreForTests() {
  _ready = false;
}

const Store = {

  init() {
    ensureReady();
  },

  get(key) {
    ensureReady();
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      console.error(`[Store] get error for key "${key}":`, e);
      return null;
    }
  },

  set(key, value) {
    ensureReady();
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.error(`[Store] set error for key "${key}":`, e);
      return false;
    }
  },

  remove(key) {
    ensureReady();
    localStorage.removeItem(key);
  },

  getProgress() {
    ensureReady();
    return normalizeProgress(this.get(KEYS.PROGRESS));
  },

  saveProgress(data) {
    const current = this.getProgress();
    return this.set(KEYS.PROGRESS, { ...current, ...data });
  },

  recordStudySession() {
    const progress = this.getProgress();
    const today    = new Date().toISOString().split('T')[0];
    const last     = progress.lastStudyDate;

    if (last === today) {
      const studyDates = appendStudyDate(progress.studyDates, today);
      if (studyDates.length !== progress.studyDates.length) {
        const updated = { ...progress, studyDates };
        this.set(KEYS.PROGRESS, updated);
        return updated;
      }
      return progress;
    }

    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    const streak    = last === yesterday ? progress.currentStreak + 1 : 1;

    const updated = {
      ...progress,
      lastStudyDate: today,
      currentStreak: streak,
      longestStreak: Math.max(streak, progress.longestStreak),
      studyDates:    appendStudyDate(progress.studyDates, today),
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
    const prev     = progress.lessonScores[id] || {};

    if (!progress.chaptersComplete.includes(id)) {
      progress.chaptersComplete.push(id);
    }

    const attempts = (prev.attempts || 0) + 1;
    let best = prev.best ?? 0;
    let date = prev.date;

    if (!prev.best || score > prev.best) {
      best = score;
      date = new Date().toISOString().split('T')[0];
    }

    progress.lessonScores[id] = {
      ...prev,
      best,
      attempts,
      date,
      sublessons: prev.sublessons || {},
    };

    this.set(KEYS.PROGRESS, progress);
  },

  /**
   * @param {number|string} chapterId
   * @param {number} subIndex
   * @param {{ correct: number, total: number }} run
   */
  recordSublessonScore(chapterId, subIndex, run) {
    const progress = this.getProgress();
    const pct      = run.total > 0 ? Math.round((run.correct / run.total) * 100) : 0;
    const prevEntry  = progress.lessonScores[chapterId] || {};
    const prevSubs   = prevEntry.sublessons || {};
    const key        = String(subIndex);
    const prev       = prevSubs[key];

    let nextSub;
    if (!prev || pct > prev.best || (pct === prev.best && run.correct > prev.correct)) {
      nextSub = { best: pct, correct: run.correct, total: run.total, attempts: (prev?.attempts || 0) + 1 };
    } else {
      nextSub = { ...prev, attempts: prev.attempts + 1 };
    }

    progress.lessonScores[chapterId] = {
      ...prevEntry,
      sublessons: { ...prevSubs, [key]: nextSub },
    };

    this.set(KEYS.PROGRESS, progress);
    return nextSub;
  },

  /**
   * @param {number|string} chapterId
   * @param {number} subIndex
   * @returns {{ best: number, correct: number, total: number, attempts: number }|null}
   */
  getSublessonBest(chapterId, subIndex) {
    return this.getProgress().lessonScores[chapterId]?.sublessons?.[String(subIndex)] ?? null;
  },

  /**
   * Weighted chapter score from each sublesson's best run.
   * @param {number|string} chapterId
   * @param {number} sublessonCount
   * @returns {{ correct: number, total: number }|null}
   */
  getChapterAggregateScore(chapterId, sublessonCount) {
    const subs = this.getProgress().lessonScores[chapterId]?.sublessons;
    if (!subs) return null;

    let correct = 0;
    let total   = 0;
    for (let i = 0; i < sublessonCount; i++) {
      const s = subs[String(i)];
      if (!s) return null;
      correct += s.correct;
      total   += s.total;
    }
    return { correct, total };
  },

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

  /** @param {number|string} chapterId @param {Partial<LessonState>} state @param {{ markComplete?: number }} [opts] */
  saveLessonState(chapterId, state, opts = {}) {
    const all   = this.get(KEYS.LESSON_STATE) || {};
    const prior = all[chapterId];

    let completedSubs = state.completedSubs ?? prior?.completedSubs ?? [];
    if (!completedSubs.length && (prior?.subIndex ?? 0) > 0) {
      completedSubs = [...Array(prior.subIndex).keys()];
    }
    if (opts.markComplete != null) {
      completedSubs = [...new Set([...completedSubs, opts.markComplete])].sort((a, b) => a - b);
    }

    all[chapterId] = {
      subIndex:       state.subIndex,
      activeSubIndex: state.activeSubIndex,
      qIndex:         state.qIndex,
      questions:      state.questions,
      sessionCorrect: state.sessionCorrect,
      sessionTotal:   state.sessionTotal,
      completedSubs,
      savedAt:        Date.now(),
    };
    return this.set(KEYS.LESSON_STATE, all);
  },

  /**
   * Sublesson indices the user has finished at least once.
   * @param {LessonState|null} savedState
   * @param {boolean} chapterComplete
   * @param {number} sublessonCount
   * @returns {Set<number>}
   */
  getCompletedSubs(savedState, chapterComplete, sublessonCount) {
    if (chapterComplete) {
      return new Set([...Array(sublessonCount).keys()]);
    }
    if (!savedState) return new Set();
    if (Array.isArray(savedState.completedSubs) && savedState.completedSubs.length) {
      return new Set(savedState.completedSubs);
    }
    const inferred = new Set();
    for (let i = 0; i < (savedState.subIndex ?? 0); i++) inferred.add(i);
    return inferred;
  },

  /** @param {number|string} chapterId @returns {LessonState|null} */
  getLessonState(chapterId) {
    const all   = this.get(KEYS.LESSON_STATE) || {};
    const state = all[chapterId];
    if (!state) return null;
    if (Date.now() - state.savedAt > LESSON_STATE_TTL_MS) {
      this.clearLessonState(chapterId);
      return null;
    }
    return state;
  },

  clearLessonState(chapterId) {
    if (chapterId === undefined) {
      this.remove(KEYS.LESSON_STATE);
    } else {
      const all = this.get(KEYS.LESSON_STATE) || {};
      delete all[chapterId];
      this.set(KEYS.LESSON_STATE, all);
    }
  },

  clearAll() {
    ensureReady();
    Object.values(KEYS).forEach(k => localStorage.removeItem(k));
    localStorage.removeItem('fluir_chapters');
    localStorage.removeItem(SCHEMA_KEY);
    console.log('[Store] All Fluir data cleared.');
  },
};

export default Store;
export {
  KEYS,
  SCHEMA_VERSION,
  SCHEMA_KEY,
  runMigrations,
  resetStoreForTests,
  DEFAULT_PROGRESS,
  LESSON_STATE_TTL_MS,
};
