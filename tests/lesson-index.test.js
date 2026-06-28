import { describe, it, beforeEach, before, after } from 'node:test';
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

function installDom() {
  const prev = globalThis.document;

  function createElement(tag) {
    const node = {
      tagName: tag.toUpperCase(),
      nodeType: 1,
      className: '',
      classList: { _c: new Set(), add(...c) { c.forEach(x => this._c.add(x)); node.className = [...this._c].join(' '); } },
      textContent: '',
      childNodes: [],
      children: [],
      style: { cssText: '' },
      dataset: {},
      setAttribute() {},
      appendChild(c) { node.childNodes.push(c); node.children.push(c); return c; },
      replaceChildren(...nodes) { node.childNodes = []; node.children = []; nodes.forEach(n => node.appendChild(n)); },
      querySelector() { return null; },
      querySelectorAll() { return []; },
      addEventListener() {},
    };
    return node;
  }

  globalThis.document = {
    createElement,
    createElementNS: (_ns, tag) => createElement(tag),
    createTextNode: t => ({ nodeType: 3, textContent: t }),
    addEventListener() {},
    getElementById: () => null,
  };
  return () => { globalThis.document = prev; };
}

function mockContainer() {
  return globalThis.document.createElement('div');
}

describe('lesson routing', () => {
  let Store;
  let createLessonFlow;
  let restoreDom;

  before(() => {
    restoreDom = installDom();
  });

  after(() => {
    restoreDom?.();
  });

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
