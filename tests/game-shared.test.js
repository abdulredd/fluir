import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { ruleText, wrongArticle, PLURAL_RULES } from '../js/games/shared.js';

describe('game shared helpers', () => {
  describe('wrongArticle', () => {
    it('swaps definite articles', () => {
      assert.equal(wrongArticle('el'), 'la');
      assert.equal(wrongArticle('la'), 'el');
    });

    it('swaps indefinite articles', () => {
      assert.equal(wrongArticle('un'), 'una');
      assert.equal(wrongArticle('una'), 'un');
    });

    it('swaps plural articles', () => {
      assert.equal(wrongArticle('los'), 'las');
      assert.equal(wrongArticle('las'), 'los');
    });
  });

  describe('ruleText', () => {
    it('returns the rule copy for a known key', () => {
      assert.match(ruleText('ends_o'), /masculine/);
    });

    it('falls back when the key is missing', () => {
      assert.equal(ruleText('not_a_real_rule'), 'Learn this word with its article.');
    });

    it('accepts an alternate rules map', () => {
      assert.match(ruleText('vowel_masc', PLURAL_RULES), /add -s/);
    });
  });
});

describe('getAdjectiveForm', () => {
  it('pluralizes -z adjectives with z → c + es', async () => {
    const { getAdjectiveForm } = await import('../js/games/adjective.js');
    const adj = { es: 'feliz', endsO: false };
    assert.equal(getAdjectiveForm(adj, 'f', 'pl'), 'felices');
    assert.equal(getAdjectiveForm(adj, 'm', 'pl'), 'felices');
  });

  it('keeps the joven → jóvenes exception', async () => {
    const { getAdjectiveForm } = await import('../js/games/adjective.js');
    const adj = { es: 'joven', endsO: false };
    assert.equal(getAdjectiveForm(adj, 'm', 'pl'), 'jóvenes');
  });
});
