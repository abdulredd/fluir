import { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { gameArticlePicker } from '../js/games/article-picker.js';
import { gameVocabPicker } from '../js/games/vocab-picker.js';

function installDomStub() {
  const prev = globalThis.document;
  globalThis.document = {
    createElement() {
      return {
        className: '',
        classList: { add() {} },
        style: {},
        textContent: '',
        dataset: {},
        disabled: false,
        addEventListener() {},
      };
    },
  };
  return () => { globalThis.document = prev; };
}

function mockContainer() {
  return {
    innerHTML: '',
    listeners: {},
    querySelector(sel) {
      if (sel === '#choices') return { appendChild() {} };
      if (sel === '#feedback') return { innerHTML: '', className: '', setAttribute() {} };
      if (sel === '#next-btn') return { classList: { add() {} }, addEventListener() {} };
      return null;
    },
    querySelectorAll() { return []; },
    dispatchEvent() {},
  };
}

describe('game HTML escaping', () => {
  let restoreDom;

  before(() => {
    restoreDom = installDomStub();
  });

  after(() => {
    restoreDom?.();
  });

  it('escapes XSS in article-picker vocab display', () => {
    const container = mockContainer();
    gameArticlePicker(container, {
      type: 'article-picker',
      vocab: { es: '<img onerror=alert(1)>', en: '<script>x</script>', article: 'el', rule: 'ends_o' },
    }, () => {});
    assert.doesNotMatch(container.innerHTML, /<script>/);
    assert.doesNotMatch(container.innerHTML, /<img/);
    assert.match(container.innerHTML, /&lt;img/);
    assert.match(container.innerHTML, /&lt;script&gt;/);
  });

  it('escapes XSS in vocab-picker prompt', () => {
    const container = mockContainer();
    gameVocabPicker(container, {
      type: 'vocab-picker',
      vocab: { es: 'hola', en: '<b>hi</b>' },
      distractors: ['adiós', 'gracias', 'por favor'],
    }, () => {});

    assert.doesNotMatch(container.innerHTML, /<b>hi<\/b>/);
    assert.match(container.innerHTML, /&lt;b&gt;hi&lt;\/b&gt;/);
  });
});
