import { describe, it, before } from 'node:test';
import assert from 'node:assert/strict';
import { buildQuestions, SUBLESSON_BUILDERS } from '../pages/lesson/questions.js';
import { CHAPTERS, ALL_CHAPTERS, preloadAllChapters } from '../js/data/registry.js';
import { ensureBuilderChapter } from '../pages/lesson/builder-registry.js';

describe('SUBLESSON_BUILDERS registry', () => {
  before(async () => {
    await preloadAllChapters();
    await Promise.all(ALL_CHAPTERS.map(meta => ensureBuilderChapter(meta.id)));
  });

  it('has a builder for every sublesson in the catalog', () => {
    const expectedIds = ALL_CHAPTERS.flatMap(meta =>
      CHAPTERS[meta.id].sublessons.map(sl => sl.id),
    );
    const missing = expectedIds.filter(id => !SUBLESSON_BUILDERS[id]);
    assert.deepEqual(missing, [], `missing builders for: ${missing.join(', ')}`);
  });

  it('has no orphan builder keys', () => {
    const catalogIds = new Set(
      ALL_CHAPTERS.flatMap(meta => CHAPTERS[meta.id].sublessons.map(sl => sl.id)),
    );
    const orphanKeys = Object.keys(SUBLESSON_BUILDERS).filter(id => !catalogIds.has(id));
    assert.deepEqual(orphanKeys, []);
  });
});

describe('buildQuestions', () => {
  before(async () => {
    await preloadAllChapters();
    await Promise.all(ALL_CHAPTERS.map(meta => ensureBuilderChapter(meta.id)));
  });

  it('1-1 mixes article, fill, translation, and matching games', () => {
    const sublesson = CHAPTERS[1].sublessons.find(sl => sl.id === '1-1');
    const types = new Set(buildQuestions(sublesson).map(q => q.type));
    assert.ok(types.has('article-picker'));
    assert.ok(types.has('fill-article'));
    assert.ok(types.has('translation'));
    assert.ok(types.has('matching'));
  });

  it('1-3 includes adjective agreement and matching', () => {
    const sublesson = CHAPTERS[1].sublessons.find(sl => sl.id === '1-3');
    const types = new Set(buildQuestions(sublesson).map(q => q.type));
    assert.ok(types.has('adjective'));
    assert.ok(types.has('matching'));
  });

  it('2-4 includes ser-vs-estar questions', () => {
    const sublesson = CHAPTERS[2].sublessons.find(sl => sl.id === '2-4');
    const types = new Set(buildQuestions(sublesson).map(q => q.type));
    assert.ok(types.has('ser-vs-estar'));
  });

  it('returns typed questions for every sublesson', () => {
    for (const meta of ALL_CHAPTERS) {
      const chapter = CHAPTERS[meta.id];
      for (const sublesson of chapter.sublessons) {
        const questions = buildQuestions(sublesson);
        assert.ok(questions.length > 0, `${sublesson.id} should produce questions`);
        assert.ok(
          questions.every(q => typeof q.type === 'string' && q.type.length > 0),
          `${sublesson.id} questions must have a type`,
        );
      }
    }
  });
});
