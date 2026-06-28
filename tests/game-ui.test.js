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
      childNodes: [],
      children: [],
      id: '',
      setAttribute(k, v) { if (k === 'id') el.id = v; if (k === 'class') el.className = v; },
      appendChild(c) { el.childNodes.push(c); el.children.push(c); return c; },
      replaceChildren(...nodes) { el.childNodes = []; el.children = []; nodes.forEach(n => el.appendChild(n)); },
      querySelector() { return null; },
      addEventListener() {},
    };
    return el;
  }

  globalThis.document = {
    createElement,
    createElementNS: (_ns, tag) => createElement(tag),
    createTextNode: t => ({ nodeType: 3, textContent: t }),
  };
  return () => { globalThis.document = prev; };
}

describe('game ui shell', () => {
  let restore;

  before(async () => {
    restore = installDom();
  });

  after(() => {
    restore?.();
  });

  it('renderGameShell mounts tag, prompt, choices, feedback, and next', async () => {
    const { renderGameShell } = await import('../js/games/ui.js');
    const container = globalThis.document.createElement('div');

    const { feedback, choicesEl } = renderGameShell(container, {
      tagLabel: 'Test',
      prompt: 'Pick one',
      middle: globalThis.document.createElement('div'),
    });

    assert.equal(container.children.length, 6);
    assert.ok(feedback);
    assert.ok(choicesEl);
    assert.equal(container.children[0].textContent, 'Test');
    assert.equal(container.children[1].textContent, 'Pick one');
  });
});
