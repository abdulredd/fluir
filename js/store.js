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
  if (!raw) return { ...DEFAULT_PROGRESS };
  return {
    ...DEFAULT_PROGRESS,
    ...raw,
    studyDates:       Array.isArray(raw.studyDates) ? raw.studyDates : [],
    chaptersStarted:  raw.chaptersStarted  || [],
    chaptersComplete: raw.chaptersComplete || [],
    lessonScores:     raw.lessonScores     || {},
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

  /** @param {number|string} chapterId @param {Partial<LessonState>} state */
  saveLessonState(chapterId, state) {
    const all = this.get(KEYS.LESSON_STATE) || {};
    all[chapterId] = {
      subIndex:       state.subIndex,
      qIndex:         state.qIndex,
      questions:      state.questions,
      sessionCorrect: state.sessionCorrect,
      sessionTotal:   state.sessionTotal,
      savedAt:        Date.now(),
    };
    return this.set(KEYS.LESSON_STATE, all);
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
