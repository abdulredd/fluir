import { describe, it, beforeEach, mock } from 'node:test';
import assert from 'node:assert/strict';

function createMockStorage() {
  const map = new Map();
  return {
    getItem:    (k) => (map.has(k) ? map.get(k) : null),
    setItem:    (k, v) => { map.set(k, String(v)); },
    removeItem: (k) => { map.delete(k); },
    clear:      () => { map.clear(); },
  };
}

let Store;
let KEYS;
let SCHEMA_KEY;
let runMigrations;
let resetStoreForTests;
let LESSON_STATE_TTL_MS;

beforeEach(async () => {
  globalThis.localStorage = createMockStorage();
  mock.reset();

  const mod = await import('../js/store.js');
  Store = mod.default;
  KEYS = mod.KEYS;
  SCHEMA_KEY = mod.SCHEMA_KEY;
  runMigrations = mod.runMigrations;
  resetStoreForTests = mod.resetStoreForTests;
  LESSON_STATE_TTL_MS = mod.LESSON_STATE_TTL_MS;

  resetStoreForTests();
});

describe('schema migrations', () => {
  it('migrates v0 progress to include studyDates from streak', () => {
    localStorage.setItem(KEYS.PROGRESS, JSON.stringify({
      currentStreak:    2,
      longestStreak:    2,
      lastStudyDate:    '2026-06-27',
      chaptersStarted:  [],
      chaptersComplete: [],
      lessonScores:     {},
    }));
    localStorage.setItem(SCHEMA_KEY, '0');

    runMigrations();

    const progress = Store.getProgress();
    assert.ok(Array.isArray(progress.studyDates));
    assert.deepEqual(progress.studyDates, ['2026-06-26', '2026-06-27']);
    assert.equal(localStorage.getItem(SCHEMA_KEY), '1');
  });

  it('sets schema version on fresh init', () => {
    Store.init();
    assert.equal(localStorage.getItem(SCHEMA_KEY), '1');
  });
});

describe('recordStudySession', () => {
  it('records today in studyDates and starts streak at 1', () => {
    mock.timers.enable({ apis: ['Date'], now: new Date('2026-06-27T12:00:00Z') });

    const result = Store.recordStudySession();

    assert.equal(result.currentStreak, 1);
    assert.equal(result.lastStudyDate, '2026-06-27');
    assert.deepEqual(result.studyDates, ['2026-06-27']);

    mock.timers.reset();
  });

  it('extends streak on consecutive days', () => {
    mock.timers.enable({ apis: ['Date'], now: new Date('2026-06-26T12:00:00Z') });
    Store.recordStudySession();
    mock.timers.reset();

    mock.timers.enable({ apis: ['Date'], now: new Date('2026-06-27T12:00:00Z') });
    const result = Store.recordStudySession();

    assert.equal(result.currentStreak, 2);
    assert.deepEqual(result.studyDates, ['2026-06-26', '2026-06-27']);

    mock.timers.reset();
  });

  it('resets streak after a gap and keeps non-consecutive studyDates', () => {
    Store.saveProgress({
      lastStudyDate: '2026-06-20',
      currentStreak: 3,
      studyDates:    ['2026-06-18', '2026-06-19', '2026-06-20'],
    });

    mock.timers.enable({ apis: ['Date'], now: new Date('2026-06-27T12:00:00Z') });
    const result = Store.recordStudySession();

    assert.equal(result.currentStreak, 1);
    assert.deepEqual(result.studyDates, ['2026-06-18', '2026-06-19', '2026-06-20', '2026-06-27']);

    mock.timers.reset();
  });

  it('is idempotent for the same calendar day', () => {
    mock.timers.enable({ apis: ['Date'], now: new Date('2026-06-27T12:00:00Z') });
    Store.recordStudySession();
    const second = Store.recordStudySession();

    assert.equal(second.currentStreak, 1);
    assert.deepEqual(second.studyDates, ['2026-06-27']);

    mock.timers.reset();
  });
});

describe('recordChapterComplete', () => {
  it('tracks best score and attempt count', () => {
    Store.recordChapterComplete(1, 70);
    Store.recordChapterComplete(1, 90);
    Store.recordChapterComplete(1, 80);

    const progress = Store.getProgress();
    assert.equal(progress.chaptersComplete.length, 1);
    assert.equal(progress.lessonScores[1].best, 90);
    assert.equal(progress.lessonScores[1].attempts, 3);
  });
});

describe('lesson state TTL', () => {
  it('returns null and clears expired state', () => {
    Store.saveLessonState(1, {
      subIndex: 0, qIndex: 2, questions: [],
      sessionCorrect: 1, sessionTotal: 3,
    });

    const savedAt = Date.now() - LESSON_STATE_TTL_MS - 1000;
    const all = JSON.parse(localStorage.getItem(KEYS.LESSON_STATE));
    all[1].savedAt = savedAt;
    localStorage.setItem(KEYS.LESSON_STATE, JSON.stringify(all));

    assert.equal(Store.getLessonState(1), null);
    assert.equal(Store.get(KEYS.LESSON_STATE)[1], undefined);
  });
});

describe('saveLessonState', () => {
  it('persists activeSubIndex alongside subIndex', () => {
    Store.saveLessonState(1, {
      subIndex:       2,
      activeSubIndex: 0,
      qIndex:         3,
      questions:      [{ type: 'article-picker' }],
      sessionCorrect: 4,
      sessionTotal:   7,
    });

    const state = Store.getLessonState(1);
    assert.equal(state.subIndex, 2);
    assert.equal(state.activeSubIndex, 0);
    assert.equal(state.qIndex, 3);
    assert.equal(state.sessionCorrect, 4);
    assert.equal(state.sessionTotal, 7);
    assert.ok(state.savedAt);
  });

  it('round-trips through localStorage', () => {
    Store.saveLessonState(99, {
      subIndex: 1, activeSubIndex: 1, qIndex: 0, questions: [],
      sessionCorrect: 0, sessionTotal: 0,
    });

    const raw = JSON.parse(localStorage.getItem(KEYS.LESSON_STATE));
    assert.equal(raw[99].subIndex, 1);
    assert.equal(raw[99].activeSubIndex, 1);
  });

  it('marks a sublesson complete without duplicates', () => {
    Store.saveLessonState(1, {
      subIndex: 1, activeSubIndex: 1, qIndex: 0, questions: [],
      sessionCorrect: 0, sessionTotal: 0, completedSubs: [0],
    });
    Store.saveLessonState(1, {
      subIndex: 2, activeSubIndex: 2, qIndex: 0, questions: [],
      sessionCorrect: 0, sessionTotal: 0,
    }, { markComplete: 1 });

    assert.deepEqual(Store.getLessonState(1).completedSubs, [0, 1]);
  });

  it('preserves completedSubs across saves', () => {
    Store.saveLessonState(1, {
      subIndex: 2, activeSubIndex: 0, qIndex: 1, questions: [{ type: 'x' }],
      sessionCorrect: 1, sessionTotal: 2, completedSubs: [0, 1],
    });
    Store.saveLessonState(1, {
      subIndex: 2, activeSubIndex: 0, qIndex: 2, questions: [{ type: 'x' }],
      sessionCorrect: 2, sessionTotal: 3,
    });

    assert.deepEqual(Store.getLessonState(1).completedSubs, [0, 1]);
  });
});

describe('recordSublessonScore', () => {
  it('keeps the best run for a sublesson', () => {
    Store.recordSublessonScore(1, 0, { correct: 7, total: 10 });
    Store.recordSublessonScore(1, 0, { correct: 9, total: 10 });

    assert.deepEqual(Store.getSublessonBest(1, 0), {
      best: 90, correct: 9, total: 10, attempts: 2,
    });
  });

  it('builds a weighted chapter aggregate when every sublesson has a best', () => {
    Store.recordSublessonScore(1, 0, { correct: 8, total: 10 });
    Store.recordSublessonScore(1, 1, { correct: 9, total: 12 });

    assert.deepEqual(Store.getChapterAggregateScore(1, 2), { correct: 17, total: 22 });
    assert.equal(Store.getChapterAggregateScore(1, 3), null);
  });
});

describe('getProgress', () => {
  it('does not mutate DEFAULT_PROGRESS when recording chapter complete on empty storage', () => {
    Store.recordChapterComplete(1, 80);
    globalThis.localStorage = createMockStorage();
    resetStoreForTests();
    Store.init();

    assert.deepEqual(Store.getProgress().chaptersComplete, []);
  });
});

describe('getCompletedSubs', () => {
  it('returns every index when the chapter is complete', () => {
    const set = Store.getCompletedSubs(null, true, 3);
    assert.deepEqual([...set], [0, 1, 2]);
  });

  it('reads completedSubs from saved state', () => {
    const set = Store.getCompletedSubs({ completedSubs: [0, 2], subIndex: 3 }, false, 3);
    assert.deepEqual([...set], [0, 2]);
  });

  it('infers completion from subIndex when completedSubs is absent', () => {
    const set = Store.getCompletedSubs({ subIndex: 2 }, false, 3);
    assert.deepEqual([...set], [0, 1]);
  });
});

describe('anki queue', () => {
  it('deduplicates pending and exported ids', () => {
    Store.addToAnkiQueue(['a', 'b']);
    Store.addToAnkiQueue(['b', 'c']);
    Store.markAnkiExported(['a']);

    const queue = Store.getAnkiQueue();
    assert.deepEqual(queue.pending, ['b', 'c']);
    assert.deepEqual(queue.exported, ['a']);

    Store.addToAnkiQueue(['a', 'c']);
    assert.deepEqual(Store.getAnkiQueue().pending, ['b', 'c']);
  });
});

describe('clearAll', () => {
  it('removes all store keys including schema version', () => {
    Store.recordStudySession();
    Store.saveSetting('unlockAll', true);
    Store.clearAll();

    assert.equal(localStorage.getItem(KEYS.PROGRESS), null);
    assert.equal(localStorage.getItem(KEYS.SETTINGS), null);
    assert.equal(localStorage.getItem(SCHEMA_KEY), null);
  });
});
