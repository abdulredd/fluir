import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { normalizeItem, createSchema } from '../js/anki.js';

describe('normalizeItem', () => {
  it('normalizes vocabulary with article and gender', () => {
    const card = normalizeItem(
      { id: 'v1_1', es: 'libro', en: 'book', article: 'el', gender: 'm', plural: 'libros' },
      1,
      'vocabulary',
    );
    assert.deepEqual(card, {
      id:       'v1_1',
      es:       'libro',
      en:       'book',
      article:  'el',
      gender:   'm',
      plural:   'libros',
      ex:       '',
      exEn:     '',
      rule:     '',
      arrayKey: 'vocabulary',
      chapterId: 1,
    });
  });

  it('uses infinitive when es is absent (verbs)', () => {
    const card = normalizeItem(
      { infinitive: 'hablar', en: 'to speak' },
      5,
      'verbs',
    );
    assert.equal(card.id, '5_verbs_hablar');
    assert.equal(card.es, 'hablar');
    assert.equal(card.en, 'to speak');
    assert.equal(card.arrayKey, 'verbs');
  });

  it('maps example aliases onto ex fields', () => {
    const card = normalizeItem(
      { id: 'x1', es: 'casa', en: 'house', example: 'La casa es grande.', exEn: 'The house is big.' },
      1,
      'vocabulary',
    );
    assert.equal(card.ex, 'La casa es grande.');
    assert.equal(card.exEn, 'The house is big.');
  });

  it('returns null when no stable id can be formed', () => {
    assert.equal(normalizeItem({ en: 'orphan' }, 1, 'vocabulary'), null);
  });
});

describe('createSchema', () => {
  it('creates the core Anki collection tables', () => {
    const runs = [];
    const db = { run(sql) { runs.push(sql); } };

    createSchema(db);

    const joined = runs.join('\n');
    for (const table of ['col', 'notes', 'cards', 'revlog', 'graves']) {
      assert.match(joined, new RegExp(`CREATE TABLE IF NOT EXISTS ${table}`));
    }
    assert.match(joined, /CREATE INDEX IF NOT EXISTS ix_cards_nid/);
  });
});
