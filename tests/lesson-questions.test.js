import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { buildQuestions, SUBLESSON_BUILDERS } from '../pages/lesson/questions.js';
import { CHAPTERS, ALL_CHAPTERS } from '../js/data/registry.js';

describe('SUBLESSON_BUILDERS registry', () => {
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
  for (const meta of ALL_CHAPTERS) {
    const chapter = CHAPTERS[meta.id];
    for (const sublesson of chapter.sublessons) {
      it(`returns typed questions for ${sublesson.id} (${sublesson.title})`, () => {
        const questions = buildQuestions(sublesson);
        assert.ok(questions.length > 0, `${sublesson.id} should produce questions`);
        assert.ok(
          questions.every(q => typeof q.type === 'string' && q.type.length > 0),
          `${sublesson.id} questions must have a type`,
        );
      });
    }
  }
});
