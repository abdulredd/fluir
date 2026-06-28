import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { renderRuleCard } from '../pages/lesson/rules.js';

describe('renderRuleCard', () => {
  it('renders heading, body, examples, and tip', () => {
    const html = renderRuleCard({
      heading: 'Masculine nouns',
      body:    'Use el with most consonant endings.',
      examples: [
        { es: 'el libro', en: 'the book', note: 'm' },
        { es: 'la casa', en: 'the house' },
      ],
      tip: 'Memorize article + noun together.',
    });

    assert.match(html, /rule-card/);
    assert.match(html, /Masculine nouns/);
    assert.match(html, /el libro/);
    assert.match(html, /Memorize article/);
  });

  it('escapes HTML in rule content', () => {
    const html = renderRuleCard({
      heading: '<script>',
      body:    'Use &amp; carefully',
      examples: [{ es: '<b>x</b>', en: 'y' }],
    });

    assert.doesNotMatch(html, /<script>/);
    assert.match(html, /&lt;script&gt;/);
    assert.match(html, /&lt;b&gt;x&lt;\/b&gt;/);
  });
});
