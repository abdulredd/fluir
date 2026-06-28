import { describe, it, beforeEach } from 'node:test';
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

function mockContainer() {
  const stubBtn = { addEventListener() {}, click() {} };
  return {
    innerHTML: '',
    querySelector(sel) {
      if (sel === '#start-btn' || sel === '#back-btn' || sel === '#rules-btn' || sel === '#resume-btn') {
        return stubBtn;
      }
      return null;
    },
    querySelectorAll() { return []; },
  };
}

describe('lesson routing', () => {
  let Store;
  let createLessonFlow;

  beforeEach(async () => {
    globalThis.localStorage = createMockStorage();
    ({ default: Store } = await import('../js/store.js'));
    ({ createLessonFlow } = await import('../pages/lesson/index.js'));
    Store.clearAll();
    Store.init();
  });

  it('invalid chapter id does not mutate chaptersStarted', async () => {
    const before = [...Store.getProgress().chaptersStarted];
    const { renderLesson } = createLessonFlow();
    await renderLesson(mockContainer(), 'abc');
    assert.deepEqual(Store.getProgress().chaptersStarted, before);
  });

  it('negative chapter id does not mutate chaptersStarted', async () => {
    const before = [...Store.getProgress().chaptersStarted];
    const { renderLesson } = createLessonFlow();
    await renderLesson(mockContainer(), -1);
    assert.deepEqual(Store.getProgress().chaptersStarted, before);
  });

  it('valid chapter id records chapter start after load', async () => {
    const { renderLesson } = createLessonFlow();
    await renderLesson(mockContainer(), 1);
    assert.ok(Store.getProgress().chaptersStarted.includes(1));
  });
});
