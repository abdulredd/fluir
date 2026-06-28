import { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';

function installDom() {
  const prev = globalThis.document;

  function createElement(tag) {
    const el = {
      tagName: tag.toUpperCase(),
      className: '',
      classList: {
        _c: new Set(),
        add(...cls) { cls.forEach(c => this._c.add(c)); el.className = [...this._c].join(' '); },
      },
      style: { cssText: '' },
      textContent: '',
      innerHTML: '',
      dataset: {},
      childNodes: [],
      children: [],
      setAttribute(k, v) {
        if (k === 'id') el.id = v;
        if (k === 'class') el.className = v;
      },
      appendChild(c) { el.childNodes.push(c); el.children.push(c); return c; },
      replaceChildren(...nodes) { el.childNodes = []; el.children = []; nodes.forEach(n => el.appendChild(n)); },
      querySelector() { return null; },
      addEventListener() {},
    };
    return el;
  }

  globalThis.document = { createElement, createTextNode: t => ({ textContent: t }) };
  return () => { globalThis.document = prev; };
}

describe('dom helpers', () => {
  let restore;

  before(async () => {
    restore = installDom();
  });

  after(() => {
    restore?.();
  });

  it('el() sets class, text, and children', async () => {
    const { el } = await import('../js/dom.js');
    const node = el('div', { className: 'foo', text: 'hello' });
    assert.equal(node.tagName, 'DIV');
    assert.equal(node.className, 'foo');
    assert.equal(node.textContent, 'hello');
  });

  it('clearAndMount() replaces container children', async () => {
    const { el, clearAndMount } = await import('../js/dom.js');
    const container = globalThis.document.createElement('div');
    container.appendChild(globalThis.document.createElement('span'));
    clearAndMount(container, el('p', { text: 'mounted' }));
    assert.equal(container.children.length, 1);
    assert.equal(container.children[0].textContent, 'mounted');
  });
});
