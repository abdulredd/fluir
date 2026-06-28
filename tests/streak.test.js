import { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { getWeekDays, weekStreakEl } from '../js/streak.js';

function installDom() {
  const prev = globalThis.document;
  globalThis.document = {
    createElement(tag) {
      return {
        tagName: tag.toUpperCase(),
        className: '',
        textContent: '',
        childNodes: [],
        children: [],
        appendChild(c) { this.childNodes.push(c); this.children.push(c); return c; },
        setAttribute(k, v) { if (k === 'class') this.className = v; },
      };
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

describe('getWeekDays', () => {
  let restore;

  before(() => { restore = installDom(); });
  after(() => { restore?.(); });

  it('marks studyDates from progress', () => {
    const progress = { studyDates: ['2026-06-25', '2026-06-27'] };
    const days = getWeekDays(progress);
    assert.equal(days.length, 7);
    assert.ok(days.some(d => d.lit));
    assert.ok(days.some(d => !d.lit));
  });

  it('renders week streak element', () => {
    const el = weekStreakEl([
      { label: 'M', lit: true, future: false },
      { label: 'T', lit: false, future: true },
    ]);
    const text = textTree(el);
    assert.match(el.className, /week-streak/);
    assert.match(text, /🔥/);
  });
});
