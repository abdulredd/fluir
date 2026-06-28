import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { collectChapterVocabIds, vocabItemId, CHAPTERS } from '../js/data/registry.js';

describe('collectChapterVocabIds', () => {
  it('collects ids from all vocab arrays on a chapter', () => {
    const ch1Ids = collectChapterVocabIds(CHAPTERS[1]);
    assert.ok(ch1Ids.includes('v1_1'), 'chapter 1 vocabulary id');
    assert.ok(ch1Ids.length >= 50, 'chapter 1 has full vocab surface');

    const ch5Ids = collectChapterVocabIds(CHAPTERS[5]);
    assert.ok(ch5Ids.some(id => id.startsWith('5_verbs_')), 'chapter 5 verb ids');
  });

  it('generates stable ids for items without raw.id', () => {
    const id = vocabItemId({ infinitive: 'hablar', en: 'to speak' }, 5, 'verbs');
    assert.equal(id, '5_verbs_hablar');
  });
});
