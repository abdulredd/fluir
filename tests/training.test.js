import { describe, it, before, after, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import {
  pickTrainingQuestion,
  prepareTrainingPool,
  gameTypesForPickerFromPool,
  pickRandomGameType,
} from '../js/training-questions.js';
import { CHAPTERS, preloadAllChapters } from '../js/data/registry.js';
import { ensureBuilderChapter } from '../pages/lesson/builder-registry.js';
import { prepareQuestions } from '../pages/lesson/questions.js';
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

/** Poll the stub DOM until a selector appears. */
async function waitFor(container, selector, timeoutMs = 500) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    const node = container.querySelector(selector);
    if (node) return node;
    await new Promise(resolve => setTimeout(resolve, 10));
  }
  throw new Error(`Timed out waiting for ${selector}`);
}

const GAME_TYPES = [
  'article-picker', 'fill-article', 'matching', 'translation', 'vocab-picker',
  'plural-picker', 'adjective', 'conjugation', 'ser-vs-estar',
  'number-quiz', 'sentence-completion', 'random',
];

describe('gameTypesForPickerFromPool', () => {
  before(async () => {
    await preloadAllChapters();
    await ensureBuilderChapter(1);
    await ensureBuilderChapter(2);
  });

  it('lists only types present in the chapter pool plus Random', async () => {
    await prepareTrainingPool(CHAPTERS[1].sublessons);
    const options = gameTypesForPickerFromPool(CHAPTERS[1].sublessons);
    const ids = options.map(o => o.id);

    assert.ok(ids.includes('random'));
    assert.ok(ids.includes('article-picker'));
    assert.equal(ids.includes('conjugation'), false);
    assert.equal(ids.includes('vocab-picker'), false);
  });

  it('includes vocab-picker when the pool has those questions', async () => {
    await prepareTrainingPool([CHAPTERS[2].sublessons[0]]);
    const ids = gameTypesForPickerFromPool([CHAPTERS[2].sublessons[0]]).map(o => o.id);
    assert.ok(ids.includes('vocab-picker'));
  });

  it('pickRandomGameType chooses only from available non-random options', async () => {
    await prepareTrainingPool(CHAPTERS[1].sublessons);
    const options = gameTypesForPickerFromPool(CHAPTERS[1].sublessons);
    const picked = pickRandomGameType(options);
    assert.notEqual(picked, 'random');
    assert.ok(options.some(o => o.id === picked));
  });
});

describe('pickTrainingQuestion', () => {
  before(async () => {
    await preloadAllChapters();
    await ensureBuilderChapter(1);
    await ensureBuilderChapter(2);
    await ensureBuilderChapter(4);
    await ensureBuilderChapter(8);
    const sublessons = [
      ...CHAPTERS[1].sublessons,
      ...CHAPTERS[2].sublessons.slice(0, 2),
      ...CHAPTERS[4].sublessons.slice(0, 1),
    ];
    await Promise.all(sublessons.map(sl => prepareQuestions(sl)));
  });

  for (const gameType of GAME_TYPES) {
    it(`returns a question for game type "${gameType}"`, () => {
      const chapterId = gameType === 'number-quiz' ? 4
        : gameType === 'sentence-completion' ? 8
        : ['vocab-picker', 'conjugation', 'ser-vs-estar'].includes(gameType) ? 2
        : 1;
      const sublessons = CHAPTERS[chapterId].sublessons;
      const q = pickTrainingQuestion(sublessons, gameType);
      assert.ok(q, `expected a question for ${gameType}`);
      assert.ok(typeof q.type === 'string');
      if (gameType !== 'random') {
        assert.equal(q.type, gameType);
      }
    });
  }

  it('returns null when the type is not in the pool', () => {
    const q = pickTrainingQuestion(CHAPTERS[1].sublessons, 'conjugation');
    assert.equal(q, null);
  });

  it('number-quiz is available from chapter 4 content', () => {
    const sublessons = CHAPTERS[4].sublessons;
    const q = pickTrainingQuestion(sublessons, 'number-quiz');
    assert.equal(q?.type, 'number-quiz');
  });
});

describe('training UI flow', () => {
  let restoreDom;
  let Store;
  let renderTraining;
  let resetStoreForTests;

  before(async () => {
    restoreDom = installDom();
    ({ default: Store, resetStoreForTests } = await import('../js/store.js'));
    ({ renderTraining } = await import('../pages/training.js'));
    await preloadAllChapters();
    await ensureBuilderChapter(1);
    await ensureBuilderChapter(2);
  });

  after(() => {
    restoreDom?.();
  });

  beforeEach(() => {
    globalThis.localStorage = createMockStorage();
    resetStoreForTests();
    Store.init();
    Store.saveSetting('unlockAllPractice', true);
  });

  it('shows the training menu when practice is unlocked', async () => {
    const container = mockContainer();
    await renderTraining(container, 1);

    assert.match(container.textContent, /Training Grounds/);
    assert.match(container.textContent, /Browse vocabulary/);
    assert.ok(container.querySelector('#sublesson-list'));
    assert.ok(container.querySelector('#sl-btn-0'));
  });

  it('browse vocabulary uses Nouns and Adjectives section labels', async () => {
    const container = mockContainer();
    await renderTraining(container, 1);
    container.querySelector('#browse-vocab-btn').click();

    assert.match(container.textContent, /Nouns/);
    assert.match(container.textContent, /Adjectives/);
    assert.doesNotMatch(container.textContent, /Gender & Definite Articles/);
    assert.ok(container.querySelector('.vocab-grid'));
  });

  it('Exit returns to the game type picker, not the training menu', async () => {
    const container = mockContainer();
    await renderTraining(container, 1);

    container.querySelector('#sl-btn-0').click();
    await waitFor(container, '#gt-article-picker');
    assert.ok(container.querySelector('#game-type-list'));
    assert.match(container.textContent, /Choose a game type/);
    assert.equal(container.querySelector('#gt-conjugation'), null);

    container.querySelector('#gt-article-picker').click();
    const exitBtn = await waitFor(container, '#exit-btn');
    assert.equal(exitBtn.textContent.trim(), 'Exit');

    exitBtn.click();
    await waitFor(container, '#gt-article-picker');

    assert.ok(container.querySelector('#game-type-list'));
    assert.match(container.textContent, /Choose a game type/);
    assert.equal(container.querySelector('#exit-btn'), null);
    assert.doesNotMatch(container.textContent, /Training Grounds/);
  });

  it('chapter 2 first lesson shows vocab-picker in the drill list', async () => {
    const container = mockContainer();
    await renderTraining(container, 2);
    container.querySelector('#sl-btn-0').click();
    await waitFor(container, '#gt-vocab-picker');
    assert.ok(container.querySelector('#gt-vocab-picker'));
  });
});
