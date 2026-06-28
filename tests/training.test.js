import { describe, it, before } from 'node:test';
import assert from 'node:assert/strict';
import { pickTrainingQuestion } from '../js/training-questions.js';
import { CHAPTERS, preloadAllChapters } from '../js/data/registry.js';
import { ensureBuilderChapter } from '../pages/lesson/builder-registry.js';
import { prepareQuestions } from '../pages/lesson/questions.js';

const GAME_TYPES = [
  'article-picker', 'fill-article', 'matching', 'translation',
  'plural-picker', 'adjective', 'conjugation', 'ser-vs-estar',
  'number-quiz', 'sentence-completion', 'random',
];

describe('pickTrainingQuestion', () => {
  before(async () => {
    await preloadAllChapters();
    await ensureBuilderChapter(1);
    await ensureBuilderChapter(2);
    await ensureBuilderChapter(4);
    const sublessons = [
      ...CHAPTERS[1].sublessons,
      ...CHAPTERS[2].sublessons.slice(0, 2),
      ...CHAPTERS[4].sublessons.slice(0, 1),
    ];
    await Promise.all(sublessons.map(sl => prepareQuestions(sl)));
  });

  for (const gameType of GAME_TYPES) {
    it(`returns a question for game type "${gameType}"`, () => {
      const sublessons = CHAPTERS[1].sublessons;
      const q = pickTrainingQuestion(sublessons, gameType);
      assert.ok(q, `expected a question for ${gameType}`);
      assert.ok(typeof q.type === 'string');
      if (gameType !== 'random') {
        assert.ok(
          q.type === gameType || ['article-picker', 'fill-article', 'translation', 'matching', 'plural-picker', 'adjective', 'conjugation', 'ser-vs-estar', 'number-quiz', 'sentence-completion', 'vocab-picker'].includes(q.type),
          `fallback type ${q.type} for ${gameType}`,
        );
      }
    });
  }

  it('number-quiz is available from chapter 4 content', () => {
    const sublessons = CHAPTERS[4].sublessons;
    const q = pickTrainingQuestion(sublessons, 'number-quiz');
    assert.equal(q?.type, 'number-quiz');
  });
});
