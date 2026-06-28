import { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { renderRuleCard, runRuleSequence } from '../pages/lesson/rules.js';
import { installDom, mockContainer } from './helpers/dom-stub.js';

function textTree(node) {
  if (!node) return '';
  if (node.nodeType === 3) return node.textContent || '';
  return (node.textContent || '') + (node.childNodes || []).map(textTree).join('');
}

function ruleSample(i) {
  return {
    heading: `Rule ${i}`,
    body:    `Body ${i}`,
    examples: [{ es: 'el libro', en: 'the book' }],
  };
}

describe('runRuleSequence', () => {
  let restore;

  before(() => { restore = installDom(); });
  after(() => { restore?.(); });

  it('shows Next rule on intermediate rules and Begin Lesson on the last', () => {
    const container = mockContainer();
    const rules = [ruleSample(1), ruleSample(2), ruleSample(3)];

    runRuleSequence(container, {
      ruleCount: rules.length,
      getRule:       (i) => rules[i],
      getBadgeLabel: () => 'Badge',
      onBack:        () => {},
      onFinish:      () => {},
    });

    const next = () => container.querySelector('#rule-next');

    assert.equal(next().textContent, 'Next rule →');
    assert.ok(!next().className.includes('btn--primary'));

    next().click();
    assert.equal(next().textContent, 'Next rule →');

    next().click();
    assert.equal(next().textContent, 'Begin Lesson →');
    assert.ok(next().className.includes('btn--primary'));
  });

  it('calls onFinish when advancing past the last rule', () => {
    const container = mockContainer();
    const rules = [ruleSample(1), ruleSample(2)];
    let finished = false;

    runRuleSequence(container, {
      ruleCount: rules.length,
      getRule:       (i) => rules[i],
      getBadgeLabel: () => 'Badge',
      onBack:        () => {},
      onFinish:      () => { finished = true; },
    });

    const next = () => container.querySelector('#rule-next');
    next().click();
    assert.equal(next().textContent, 'Begin Lesson →');
    next().click();
    assert.equal(finished, true);
  });

  it('accepts custom next and last labels', () => {
    const container = mockContainer();
    const rules = [ruleSample(1), ruleSample(2)];

    runRuleSequence(container, {
      ruleCount: rules.length,
      getRule:       (i) => rules[i],
      getBadgeLabel: () => 'Badge',
      nextLabel:     'Continue →',
      lastLabel:     'Back to questions →',
      onBack:        () => {},
      onFinish:      () => {},
    });

    const next = () => container.querySelector('#rule-next');
    assert.equal(next().textContent, 'Continue →');
    next().click();
    assert.equal(next().textContent, 'Back to questions →');
  });
});

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
