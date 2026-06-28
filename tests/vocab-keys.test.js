import { describe, it, before } from 'node:test';
import assert from 'node:assert/strict';
import {
  collectChapterVocabIds,
  collectChapterVocabByKey,
  collectChapterVocabBrowseSections,
  vocabItemId,
  CHAPTERS,
  preloadAllChapters,
} from '../js/data/registry.js';

describe('collectChapterVocabIds', () => {
  before(async () => {
    await preloadAllChapters();
  });

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

describe('collectChapterVocabByKey', () => {
  before(async () => {
    await preloadAllChapters();
  });

  it('merges vocabulary from every sublesson into one bucket', () => {
    const buckets = collectChapterVocabByKey(CHAPTERS[1]);
    assert.ok(buckets.vocabulary.length >= 75, 'chapter 1 nouns from 1-1 and 1-2');
    assert.ok(buckets.adjectives.length >= 47, 'chapter 1 adjectives');
    assert.ok(buckets.vocabulary.some(v => v.es === 'amigo'));
    assert.ok(buckets.vocabulary.some(v => v.es === 'jardín'));
  });
});

describe('collectChapterVocabBrowseSections', () => {
  before(async () => {
    await preloadAllChapters();
  });

  it('splits chapter 1 vocabulary into Nouns only', () => {
    const sections = collectChapterVocabBrowseSections(CHAPTERS[1]);
    const vocabSections = sections.filter(s => s.arrayKey === 'vocabulary');
    assert.ok(vocabSections.every(s => s.label === 'Nouns'));
    assert.ok(vocabSections.some(s => s.items.some(v => v.es === 'amigo')));
    assert.ok(sections.some(s => s.label === 'Adjectives' && s.arrayKey === 'adjectives'));
  });

  it('labels chapter 2 subject pronouns as Pronouns, not Nouns', () => {
    const sections = collectChapterVocabBrowseSections(CHAPTERS[2]);
    const pronouns = sections.find(s => s.label === 'Pronouns');
    assert.ok(pronouns, 'Pronouns section');
    assert.ok(pronouns.items.some(v => v.es === 'yo'));
    assert.ok(!sections.some(s => s.label === 'Nouns' && s.items.some(v => v.rule === 'pronoun')));
  });

  it('separates chapter 2 adjectives from nouns in the vocabulary bucket', () => {
    const sections = collectChapterVocabBrowseSections(CHAPTERS[2]);
    const adjectives = sections.find(s => s.label === 'Adjectives' && s.arrayKey === 'vocabulary');
    const nouns = sections.find(s => s.label === 'Nouns' && s.arrayKey === 'vocabulary');
    assert.ok(adjectives?.items.some(v => v.es === 'enfermo'));
    assert.ok(adjectives?.items.some(v => v.es === 'cansado'));
    assert.ok(nouns?.items.some(v => v.es === 'arquitecto'));
    assert.ok(!nouns?.items.some(v => v.es === 'enfermo'));
    assert.ok(nouns?.items.some(v => v.es === 'patio'));
    assert.ok(!nouns?.items.some(v => v.es === 'el patio'));
  });
});
