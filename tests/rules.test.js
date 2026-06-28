import { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { renderRuleCard } from '../pages/lesson/rules.js';

function installDom() {
  const prev = globalThis.document;
  globalThis.document = {
    createElement(tag) {
      const node = {
        tagName: tag.toUpperCase(),
        className: '',
        classList: { _c: new Set(), add(...c) { c.forEach(x => this._c.add(x)); node.className = [...this._c].join(' '); } },
        textContent: '',
        childNodes: [],
        children: [],
        setAttribute(k, v) { if (k === 'class') node.className = v; },
        appendChild(c) { node.childNodes.push(c); node.children.push(c); return c; },
      };
      return node;
    },
    createElementNS(_ns, tag) { return this.createElement(tag); },
    createTextNode: t => ({ nodeType: 3, textContent: t }),
  };
  return () => { globalThis.document = prev; };
}

function textTree(node) {
  if (!node) return '';
  if (node.nodeType === 3) return node.textContent || '';
  return (node.textContent || '') + (node.childNodes || []).map(textTree).join('');
}

describe('renderRuleCard', () => {
  let restore;

  before(() => { restore = installDom(); });
  after(() => { restore?.(); });

  it('renders heading, body, examples, and tip', () => {
    const card = renderRuleCard({
      heading: 'Masculine nouns',
      body:    'Use el with most consonant endings.',
      examples: [
        { es: 'el libro', en: 'the book', note: 'm' },
        { es: 'la casa', en: 'the house' },
      ],
      tip: 'Memorize article + noun together.',
    });

    const text = textTree(card);
    assert.match(text, /Masculine nouns/);
    assert.match(text, /el libro/);
    assert.match(text, /Memorize article/);
  });

  it('escapes HTML in rule content via text nodes', () => {
    const card = renderRuleCard({
      heading: '<script>',
      body:    'Use & carefully',
      examples: [{ es: '<b>x</b>', en: 'y' }],
    });

    const text = textTree(card);
    assert.match(text, /<script>/);
    assert.match(text, /<b>x<\/b>/);
  });
});
