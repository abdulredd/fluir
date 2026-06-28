import { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { gameArticlePicker } from '../js/games/article-picker.js';
import { gameVocabPicker } from '../js/games/vocab-picker.js';

function createDomStub() {
  function createElement(tag) {
    const node = {
      tagName: tag.toUpperCase(),
      className: '',
      classList: {
        _c: new Set(),
        add(...cls) { cls.forEach(c => this._c.add(c)); node.className = [...this._c].join(' '); },
      },
      style: { cssText: '' },
      textContent: '',
      dataset: {},
      childNodes: [],
      children: [],
      disabled: false,
      id: '',
      setAttribute(k, v) {
        if (k === 'id') this.id = v;
        if (k === 'class') this.className = v;
      },
      appendChild(child) {
        this.childNodes.push(child);
        this.children.push(child);
        return child;
      },
      replaceChildren(...nodes) {
        this.childNodes = [];
        this.children = [];
        nodes.forEach(n => this.appendChild(n));
      },
      querySelector(sel) {
        return query(this, sel);
      },
      querySelectorAll(sel) {
        const found = [];
        walk(this, n => { if (match(n, sel)) found.push(n); });
        return found;
      },
      addEventListener() {},
      dispatchEvent() {},
      focus() {},
    };
    return node;
  }

  function walk(node, fn) {
    fn(node);
    for (const child of node.childNodes || []) walk(child, fn);
  }

  function match(node, sel) {
    if (sel.startsWith('#')) return node.id === sel.slice(1);
    if (sel === '.option') return node.classList?.contains('option');
    if (sel === '.es-large') return node.className?.includes('es-large');
    return false;
  }

  function query(node, sel) {
    if (match(node, sel)) return node;
    for (const child of node.childNodes || []) {
      const hit = query(child, sel);
      if (hit) return hit;
    }
    return null;
  }

  return {
    createElement,
    createElementNS: (_ns, tag) => createElement(tag),
    createTextNode: text => ({ nodeType: 3, textContent: text }),
  };
}


function mockContainer() {
  return createDomStub().createElement('div');
}

describe('game HTML escaping', () => {
  let restoreDom;

  before(() => {
    const prev = globalThis.document;
    globalThis.document = createDomStub();
    restoreDom = () => { globalThis.document = prev; };
  });

  after(() => {
    restoreDom?.();
  });

  it('escapes XSS in article-picker vocab display via textContent', () => {
    const container = mockContainer();
    gameArticlePicker(container, {
      type: 'article-picker',
      vocab: { es: '<img onerror=alert(1)>', en: '<script>x</script>', article: 'el', rule: 'ends_o' },
    }, () => {});

    const esNode = container.querySelector('.es-large');
    assert.ok(esNode, 'expected es-large node');
    assert.equal(esNode.textContent, '<img onerror=alert(1)>');
    assert.equal(container.querySelectorAll('.es-large').length, 1);
  });

  it('escapes XSS in vocab-picker prompt via textContent', () => {
    const container = mockContainer();
    gameVocabPicker(container, {
      type: 'vocab-picker',
      vocab: { es: 'hola', en: '<b>hi</b>' },
      distractors: ['adiós', 'gracias', 'por favor'],
    }, () => {});

    const prompt = container.querySelector('.es-large');
    assert.equal(prompt.textContent, '<b>hi</b>');
  });
});
