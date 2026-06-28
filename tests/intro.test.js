import { describe, it, before, after, beforeEach, mock } from 'node:test';
import assert from 'node:assert/strict';
import { installDom, mockContainer } from './helpers/dom-stub.js';

function createMockStorage() {
  const map = new Map();
  return {
    getItem:    (k) => (map.has(k) ? map.get(k) : null),
    setItem:    (k, v) => { map.set(k, String(v)); },
    removeItem: (k) => { map.delete(k); },
    clear:      () => { map.clear(); },
  };
}

let lastChoiceSheet  = null;
let lastConfirmSheet = null;

mock.module('../js/app.js', {
  namedExports: {
    navigate:          () => {},
    showToast:         () => {},
    showConfirmSheet:  (opts) => { lastConfirmSheet = opts; },
    showChoiceSheet:   (opts) => { lastChoiceSheet = opts; },
  },
});

function mockChapter() {
  return {
    id: 1,
    title: 'Chapter One',
    sublessons: [
      { id: '1-1', title: 'Nouns',     subtitle: 'Articles', vocabulary: [{ es: 'casa', en: 'house' }] },
      { id: '1-2', title: 'Plurals',   subtitle: 'More nouns', vocabulary: [] },
      { id: '1-3', title: 'Adjectives', subtitle: 'Agreement', vocabulary: [] },
    ],
  };
}

function mockApi(overrides = {}) {
  return {
    startSubLesson:     mock.fn(),
    runQuestions:       mock.fn(),
    buildQuestionQueue: mock.fn(),
    reviewAllRules:     mock.fn(),
    ...overrides,
  };
}

describe('renderChapterIntro', () => {
  let restoreDom;
  let Store;
  let renderChapterIntro;
  let resetStoreForTests;

  before(async () => {
    restoreDom = installDom();
    ({ default: Store, resetStoreForTests } = await import('../js/store.js'));
    ({ renderChapterIntro } = await import('../pages/lesson/intro.js'));
  });

  after(() => {
    restoreDom?.();
  });

  beforeEach(() => {
    globalThis.localStorage = createMockStorage();
    resetStoreForTests();
    Store.init();
    Store.clearAll();
    Store.init();
    lastChoiceSheet  = null;
    lastConfirmSheet = null;
  });

  function sublessonRows(container) {
    return container.querySelectorAll('.sublesson-row');
  }

  function rowSubtitle(row) {
    return row.querySelector('.card-row__main')?.children[1]?.textContent;
  }

  it('always shows Review chapter rules and no legacy resume buttons', () => {
    const container = mockContainer();
    Store.saveLessonState(1, {
      subIndex: 1, activeSubIndex: 0, qIndex: 2,
      questions: [{ type: 'article-picker', vocab: { es: 'casa' } }],
      sessionCorrect: 2, sessionTotal: 4,
    });

    renderChapterIntro(container, mockChapter(), mockApi());

    assert.ok(container.querySelector('#rules-btn'));
    assert.equal(container.querySelector('#resume-btn'), null);
    assert.equal(container.querySelector('#start-btn'), null);
  });

  function rowIcon(row) {
    return row.querySelector('.sublesson-row__icon');
  }

  it('marks completed sublessons and shows in-progress on the active quiz', () => {
    const container = mockContainer();
    Store.recordSublessonScore(1, 0, { correct: 14, total: 16 });
    Store.recordSublessonScore(1, 1, { correct: 10, total: 12 });
    Store.saveLessonState(1, {
      subIndex: 2, activeSubIndex: 0, completedSubs: [0, 1], qIndex: 1,
      questions: [{ type: 'x' }, { type: 'x' }],
      sessionCorrect: 1, sessionTotal: 2,
    });

    renderChapterIntro(container, mockChapter(), mockApi());
    const rows = sublessonRows(container);

    assert.match(rowIcon(rows[0]).className, /sublesson-row__icon--done/);
    assert.match(rowIcon(rows[0]).className, /sublesson-row__icon--current/);
    assert.equal(rowSubtitle(rows[0]), 'Complete · 88% · reviewing again');
    assert.match(rowIcon(rows[1]).className, /sublesson-row__icon--done/);
    assert.equal(rowSubtitle(rows[1]), 'Complete · 83%');
    assert.match(container.textContent, /In progress/);
    assert.match(container.textContent, /Question 2 of 2 · 1 correct so far/);
  });

  it('shows best percentage on completed lesson rows', () => {
    const container = mockContainer();
    Store.recordSublessonScore(1, 0, { correct: 9, total: 10 });

    Store.saveLessonState(1, {
      subIndex: 1, activeSubIndex: 0, completedSubs: [0], qIndex: 0,
      questions: [], sessionCorrect: 0, sessionTotal: 0,
    });

    renderChapterIntro(container, mockChapter(), mockApi());
    assert.equal(rowSubtitle(sublessonRows(container)[0]), 'Complete · 90%');
  });

  it('shows all lessons complete after the chapter is finished', () => {
    const container = mockContainer();
    Store.recordSublessonScore(1, 0, { correct: 9, total: 10 });
    Store.recordSublessonScore(1, 1, { correct: 10, total: 12 });
    Store.recordSublessonScore(1, 2, { correct: 8, total: 10 });
    Store.recordChapterComplete(1, 90);

    renderChapterIntro(container, mockChapter(), mockApi());
    const rows = sublessonRows(container);

    rows.forEach((row, i) => {
      assert.match(rowIcon(row).className, /sublesson-row__icon--done/);
      assert.match(rowSubtitle(row), /^Complete · \d+%$/);
    });
    assert.equal(rowSubtitle(rows[0]), 'Complete · 90%');
    assert.equal(rowSubtitle(rows[1]), 'Complete · 83%');
    assert.equal(rowSubtitle(rows[2]), 'Complete · 80%');
  });

  it('shows a discard control on the in-progress banner', () => {
    const container = mockContainer();
    Store.saveLessonState(1, {
      subIndex: 1, activeSubIndex: 0, qIndex: 2,
      questions: [{ type: 'x' }, { type: 'x' }, { type: 'x' }],
      sessionCorrect: 1, sessionTotal: 3,
    });

    renderChapterIntro(container, mockChapter(), mockApi());

    assert.ok(container.querySelector('#discard-progress-btn'));
  });

  it('discards quiz progress from the banner and keeps completed lessons', () => {
    const container = mockContainer();
    Store.recordSublessonScore(1, 0, { correct: 14, total: 16 });
    Store.recordSublessonScore(1, 1, { correct: 10, total: 12 });
    Store.saveLessonState(1, {
      subIndex: 2, activeSubIndex: 0, completedSubs: [0, 1], qIndex: 1,
      questions: [{ type: 'x' }, { type: 'x' }],
      sessionCorrect: 1, sessionTotal: 2,
    });

    let api = mockApi();
    api.renderChapterIntro = mock.fn((c, ch) => renderChapterIntro(c, ch, api));

    renderChapterIntro(container, mockChapter(), api);
    container.querySelector('#discard-progress-btn').click();

    assert.ok(lastConfirmSheet);
    assert.equal(lastConfirmSheet.confirmLabel, 'Discard progress');
    lastConfirmSheet.onConfirm();

    assert.equal(api.renderChapterIntro.mock.calls.length, 1);
    const state = Store.getLessonState(1);
    assert.deepEqual(state.questions, []);
    assert.equal(state.sessionCorrect, 0);
    assert.equal(state.sessionTotal, 0);
    assert.deepEqual(state.completedSubs, [0, 1]);
    assert.equal(state.subIndex, 2);

    renderChapterIntro(container, mockChapter(), api);
    assert.equal(container.querySelector('#discard-progress-btn'), null);
    assert.equal(rowSubtitle(sublessonRows(container)[0]), 'Complete · 88%');
  });

  it('opens a choice sheet when tapping the in-progress lesson row', () => {
    const container = mockContainer();
    Store.saveLessonState(1, {
      subIndex: 1, activeSubIndex: 0, qIndex: 0,
      questions: [{ type: 'article-picker', vocab: { es: 'casa' } }],
      sessionCorrect: 0, sessionTotal: 0,
    });

    renderChapterIntro(container, mockChapter(), mockApi());
    sublessonRows(container)[0].click();

    assert.ok(lastChoiceSheet);
    assert.equal(lastChoiceSheet.title, 'Nouns');
    assert.match(lastChoiceSheet.body, /Question 1 of 1 · 0 correct so far/);
    assert.deepEqual(lastChoiceSheet.actions.map(a => a.label), [
      'Resume lesson →',
      'Start over',
      'Go back',
    ]);
  });

  it('resume action continues the saved quiz via runQuestions', () => {
    const container = mockContainer();
    const questions = [{ type: 'article-picker', vocab: { es: 'casa' } }];
    const api = mockApi();

    Store.saveLessonState(1, {
      subIndex: 1, activeSubIndex: 0, qIndex: 0, questions,
      sessionCorrect: 3, sessionTotal: 5,
    });

    renderChapterIntro(container, mockChapter(), api);
    sublessonRows(container)[0].click();
    lastChoiceSheet.actions[0].onClick();

    assert.equal(api.runQuestions.mock.calls.length, 1);
    const [, , sublesson, subIndex, savedQuestions, qIndex, score] = api.runQuestions.mock.calls[0].arguments;
    assert.equal(sublesson.title, 'Nouns');
    assert.equal(subIndex, 0);
    assert.deepEqual(savedQuestions, questions);
    assert.equal(qIndex, 0);
    assert.deepEqual(score, { correct: 3, total: 5 });
  });

  it('start over preserves subIndex progress in the store', () => {
    const container = mockContainer();
    const api = mockApi();

    Store.saveLessonState(1, {
      subIndex: 2, activeSubIndex: 0, completedSubs: [0, 1], qIndex: 1,
      questions: [{ type: 'x' }, { type: 'x' }],
      sessionCorrect: 1, sessionTotal: 2,
    });

    renderChapterIntro(container, mockChapter(), api);
    sublessonRows(container)[0].click();
    lastChoiceSheet.actions[1].onClick();

    const state = Store.getLessonState(1);
    assert.equal(state.subIndex, 2);
    assert.equal(state.activeSubIndex, 0);
    assert.deepEqual(state.completedSubs, [0, 1]);
    assert.deepEqual(state.questions, []);
    assert.equal(state.sessionCorrect, 0);
    assert.equal(state.sessionTotal, 0);
    assert.equal(api.startSubLesson.mock.calls.length, 1);
    assert.deepEqual(api.startSubLesson.mock.calls[0].arguments[3], { correct: 0, total: 0 });
  });

  it('shows a confirm sheet when switching to a different lesson mid-quiz', () => {
    const container = mockContainer();
    const api = mockApi();

    Store.saveLessonState(1, {
      subIndex: 1, activeSubIndex: 0, qIndex: 0,
      questions: [{ type: 'x' }],
      sessionCorrect: 0, sessionTotal: 1,
    });

    renderChapterIntro(container, mockChapter(), api);
    sublessonRows(container)[1].click();

    assert.ok(lastConfirmSheet);
    assert.match(lastConfirmSheet.body, /Nouns/);
    assert.equal(lastConfirmSheet.confirmLabel, 'Start new lesson');
  });

  it('starts a fresh lesson when no quiz is in progress', () => {
    const container = mockContainer();
    const api = mockApi();

    renderChapterIntro(container, mockChapter(), api);
    sublessonRows(container)[1].click();

    assert.equal(lastChoiceSheet, null);
    assert.equal(lastConfirmSheet, null);
    assert.equal(api.startSubLesson.mock.calls.length, 1);
    assert.equal(api.startSubLesson.mock.calls[0].arguments[2], 1);

    const state = Store.getLessonState(1);
    assert.equal(state.subIndex, 0);
    assert.equal(state.activeSubIndex, 1);
  });
});
