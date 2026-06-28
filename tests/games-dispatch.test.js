import { describe, it, before } from 'node:test';
import assert from 'node:assert/strict';
import { KNOWN_GAME_TYPES } from '../js/games/dispatch.js';
import { buildQuestions } from '../pages/lesson/questions.js';
import { CHAPTERS, ALL_CHAPTERS, preloadAllChapters } from '../js/data/registry.js';
import { ensureBuilderChapter } from '../pages/lesson/builder-registry.js';

describe('games dispatch registry', () => {
  before(async () => {
    await preloadAllChapters();
    await Promise.all(ALL_CHAPTERS.map(meta => ensureBuilderChapter(meta.id)));
  });

  it('covers every question type produced by lesson builders', () => {
    const producedTypes = new Set();
    for (const meta of ALL_CHAPTERS) {
      for (const sublesson of CHAPTERS[meta.id].sublessons) {
        for (const q of buildQuestions(sublesson)) {
          producedTypes.add(q.type);
        }
      }
    }
    const missing = [...producedTypes].filter(t => !KNOWN_GAME_TYPES.includes(t));
    assert.deepEqual(missing, [], `missing renderers for: ${missing.join(', ')}`);
  });
});
