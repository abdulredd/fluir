import { describe, it, before } from 'node:test';
import assert from 'node:assert/strict';
import {
  CHAPTERS,
  ALL_CHAPTERS,
  VOCAB_KEYS,
  collectChapterVocabIds,
  preloadAllChapters,
} from '../js/data/registry.js';

describe('registry', () => {
  before(async () => {
    await preloadAllChapters();
  });

  it('maps 15 full chapter objects aligned with catalog', () => {
    assert.equal(Object.keys(CHAPTERS).length, 15);
    assert.equal(ALL_CHAPTERS.length, 15);
    ALL_CHAPTERS.forEach(meta => {
      const ch = CHAPTERS[meta.id];
      assert.ok(ch, `missing chapter data for id ${meta.id}`);
      assert.equal(ch.id, meta.id);
      assert.ok(Array.isArray(ch.sublessons) && ch.sublessons.length > 0);
    });
  });

  it('re-exports vocab helpers', () => {
    assert.ok(VOCAB_KEYS.includes('vocabulary'));
    const ids = collectChapterVocabIds(CHAPTERS[1]);
    assert.ok(ids.length > 0);
  });
});
