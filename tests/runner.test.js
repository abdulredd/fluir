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

const casaVocab = { es: 'casa', en: 'house', article: 'la', gender: 'f', rule: 'ends_a' };

function mockChapter(subCount = 2) {
  return {
    id: 1,
    title: 'Test Chapter',
    sublessons: Array.from({ length: subCount }, (_, i) => ({
      id:       `1-${i + 1}`,
      title:    `Lesson ${i + 1}`,
      subtitle: `Subtitle ${i + 1}`,
      vocabulary: i === 0 ? [casaVocab] : [],
    })),
  };
}

function articleQuestion() {
  return { type: 'article-picker', vocab: casaVocab };
}

describe('runQuestions', () => {
  let restoreDom;
  let Store;
  let runQuestions;
  let resetStoreForTests;

  before(async () => {
    restoreDom = installDom();
    ({ default: Store, resetStoreForTests } = await import('../js/store.js'));
    ({ runQuestions } = await import('../pages/lesson/runner.js'));
  });

  after(() => {
    restoreDom?.();
  });

  beforeEach(() => {
    globalThis.localStorage = createMockStorage();
    resetStoreForTests();
    Store.init();
  });

  function quizMeta(container) {
    return container.querySelector('.quiz-meta');
  }

  function progressFill(container) {
    const track = container.querySelector('.quiz-progress');
    return track?.children[0];
  }

  it('uses per-sublesson progress: (qIndex + 1) / length', () => {
    const container = mockContainer();
    const chapter   = mockChapter();
    const questions = Array.from({ length: 16 }, () => articleQuestion());
    const api       = { renderChapterIntro: () => {}, renderRuleCards: () => {} };

    runQuestions(container, chapter, chapter.sublessons[0], 0, questions, 3, { correct: 0, total: 0 }, false, api);

    assert.match(quizMeta(container).textContent, /4 of 16/);
    assert.match(progressFill(container).style.cssText, /width:25%/);
  });

  it('updates the score label immediately when onAnswer is called', () => {
    const container = mockContainer();
    const chapter   = mockChapter();
    const questions = [articleQuestion()];
    const api       = { renderChapterIntro: () => {}, renderRuleCards: () => {} };

    runQuestions(container, chapter, chapter.sublessons[0], 0, questions, 0, { correct: 2, total: 4 }, false, api);

    const scoreEl = container.querySelector('.quiz-score');
    assert.equal(scoreEl.textContent, '2 correct');

    const correct = container.querySelectorAll('.option').find(b => b.dataset.isCorrect === 'yes');
    correct.click();

    assert.equal(scoreEl.textContent, '3 correct');
  });

  it('does not increment correct count on a wrong answer', () => {
    const container = mockContainer();
    const chapter   = mockChapter();
    const questions = [articleQuestion()];
    const api       = { renderChapterIntro: () => {}, renderRuleCards: () => {} };

    runQuestions(container, chapter, chapter.sublessons[0], 0, questions, 0, { correct: 2, total: 4 }, false, api);

    const scoreEl = container.querySelector('.quiz-score');
    const wrong   = container.querySelectorAll('.option').find(b => b.dataset.isCorrect === 'no');
    wrong.click();

    assert.equal(scoreEl.textContent, '2 correct');
  });

  it('perserves subIndex when saving mid-quiz state', () => {
    const container = mockContainer();
    const chapter   = mockChapter();
    const questions = [articleQuestion(), articleQuestion()];
    const api       = { renderChapterIntro: () => {}, renderRuleCards: () => {} };

    Store.saveLessonState(1, {
      subIndex: 2, activeSubIndex: 0, qIndex: 0, questions: [],
      sessionCorrect: 0, sessionTotal: 0,
    });

    runQuestions(container, chapter, chapter.sublessons[0], 0, questions, 1, { correct: 1, total: 2 }, false, api);

    const state = Store.getLessonState(1);
    assert.equal(state.subIndex, 2);
    assert.equal(state.activeSubIndex, 0);
    assert.equal(state.qIndex, 1);
  });

  it('returns to chapter intro after finishing a non-final sublesson', () => {
    const container = mockContainer();
    const chapter   = mockChapter(2);
    const questions = [articleQuestion()];
    const renderChapterIntro = mock.fn();
    const api = { renderChapterIntro, renderRuleCards: () => {} };

    runQuestions(container, chapter, chapter.sublessons[0], 0, questions, 1, { correct: 8, total: 10 }, false, api);

    assert.equal(renderChapterIntro.mock.calls.length, 1);
    assert.equal(container.querySelector('.lesson-complete'), null);
    const state = Store.getLessonState(1);
    assert.equal(state.subIndex, 1);
    assert.deepEqual(state.completedSubs, [0]);
    assert.deepEqual(Store.getSublessonBest(1, 0), { best: 80, correct: 8, total: 10, attempts: 1 });
  });

  it('shows chapter wrap-up when the last missing sublesson is finished out of order', () => {
    const container = mockContainer();
    const chapter   = mockChapter(3);
    const questions = [articleQuestion()];
    const api       = { renderChapterIntro: mock.fn(), renderRuleCards: () => {} };

    Store.recordSublessonScore(1, 1, { correct: 6, total: 6 });
    Store.recordSublessonScore(1, 2, { correct: 10, total: 10 });
    Store.saveLessonState(1, {
      subIndex: 3, activeSubIndex: 0, completedSubs: [1, 2], qIndex: 0, questions: [],
      sessionCorrect: 0, sessionTotal: 0,
    });

    runQuestions(container, chapter, chapter.sublessons[0], 0, questions, 1, { correct: 4, total: 5 }, false, api);

    assert.equal(api.renderChapterIntro.mock.calls.length, 0);
    assert.ok(container.querySelector('.lesson-complete'));
    assert.match(container.textContent, /95%/);
    assert.equal(Store.getProgress().lessonScores[1].best, 95);
  });

  it('uses aggregate bests on chapter wrap-up, not only the last sublesson run', () => {
    const container = mockContainer();
    const chapter   = mockChapter(2);
    const questions = [articleQuestion()];
    const api       = { renderChapterIntro: mock.fn(), renderRuleCards: () => {} };

    Store.recordSublessonScore(1, 0, { correct: 10, total: 10 });

    runQuestions(container, chapter, chapter.sublessons[1], 1, questions, 1, { correct: 8, total: 10 }, false, api);

    assert.ok(container.querySelector('.lesson-complete'));
    assert.match(container.textContent, /90%/);
    assert.match(container.textContent, /18 correct out of 20/);
  });

  it('renders lesson complete when a single-sublesson chapter is finished', () => {
    const container = mockContainer();
    const chapter   = mockChapter(1);
    const questions = [articleQuestion()];
    const api       = { renderChapterIntro: () => {}, renderRuleCards: () => {} };

    runQuestions(container, chapter, chapter.sublessons[0], 0, questions, 1, { correct: 9, total: 10 }, false, api);

    assert.ok(container.querySelector('.lesson-complete'));
    assert.match(container.textContent, /90%/);
    assert.equal(Store.getLessonState(1), null);
  });

  it('does not roll back subIndex when redoing an earlier sublesson', () => {
    const container = mockContainer();
    const chapter   = mockChapter(3);
    const questions = [articleQuestion()];
    const api       = { renderChapterIntro: mock.fn(), renderRuleCards: () => {} };

    Store.saveLessonState(1, {
      subIndex: 2, activeSubIndex: 0, qIndex: 0, questions: [],
      sessionCorrect: 0, sessionTotal: 0,
    });

    runQuestions(container, chapter, chapter.sublessons[0], 0, questions, 1, { correct: 5, total: 5 }, false, api);

    const state = Store.getLessonState(1);
    assert.equal(state.subIndex, 2);
    assert.equal(state.activeSubIndex, 1);
  });
});
