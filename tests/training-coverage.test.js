import { describe, it, before } from 'node:test';
import assert from 'node:assert/strict';
import {
  createTrainingSession,
  getSeenCount,
  pickWithCoverage,
  recordSeen,
} from '../js/training/coverage.js';
import {
  getMatchingPairPool,
} from '../js/training/practice-sources.js';
import { availablePracticeTypes } from '../js/training/lesson-types.js';
import {
  generateTrainingQuestion,
  MATCHING_ROUND_SIZE,
} from '../js/training/generate-question.js';
import { SUBLESSON_3_3 } from '../js/data/chapter3.js';
import { CHAPTERS, preloadAllChapters } from '../js/data/registry.js';
import { ensureBuilderChapter } from '../pages/lesson/builder-registry.js';
import { prepareQuestions } from '../pages/lesson/questions.js';

describe('training coverage picker', () => {
  it('prioritizes unseen items over seen ones', () => {
    const session = createTrainingSession();
    const pool = [
      { key: 'a', value: 1 },
      { key: 'b', value: 2 },
      { key: 'c', value: 3 },
    ];
    recordSeen(session, ['a', 'a', 'a']);

    const picked = pickWithCoverage(pool, session, 2, x => x.key);
    const keys = picked.map(x => x.key);

    assert.ok(keys.includes('b'));
    assert.ok(keys.includes('c'));
    assert.equal(keys.includes('a'), false);
  });

  it('tracks seen counts per key', () => {
    const session = createTrainingSession();
    recordSeen(session, ['invierno']);
    recordSeen(session, ['invierno']);
    assert.equal(getSeenCount(session, 'invierno'), 2);
    assert.equal(getSeenCount(session, 'verano'), 0);
  });

  it('eventually picks every item when pool is smaller than round size', () => {
    const session = createTrainingSession();
    const pool = [{ key: 'x' }, { key: 'y' }];
    const seen = new Set();
    for (let i = 0; i < 20; i++) {
      pickWithCoverage(pool, session, 1, x => x.key).forEach(x => {
        recordSeen(session, [x.key]);
        seen.add(x.key);
      });
    }
    assert.deepEqual([...seen].sort(), ['x', 'y']);
  });
});

describe('training practice pools', () => {
  before(async () => {
    await ensureBuilderChapter(3);
  });

  it('3-3 matching pool includes every vocabulary item including invierno', () => {
    const pairs = getMatchingPairPool([SUBLESSON_3_3]);
    const esSet = new Set(pairs.map(p => p.es));
    for (const item of SUBLESSON_3_3.vocabulary) {
      assert.ok(esSet.has(item.es), `missing matching pair for ${item.es}`);
    }
    assert.ok(esSet.has('invierno'));
    assert.equal(pairs.length, SUBLESSON_3_3.vocabulary.length);
  });

  it('3-3 exposes matching in available practice types', async () => {
    await prepareQuestions(SUBLESSON_3_3);
    const types = availablePracticeTypes([SUBLESSON_3_3]);
    assert.ok(types.includes('matching'));
    assert.equal(types.length, 1);
  });

  it('2-4 Ser vs Estar only exposes ser-vs-estar and sentence-completion', async () => {
    await preloadAllChapters();
    await ensureBuilderChapter(2);
    const sl = CHAPTERS[2].sublessons[3];
    const types = availablePracticeTypes([sl]).sort();
    assert.deepEqual(types, ['sentence-completion', 'ser-vs-estar']);
  });

  it('2-2 Estar drops filler matching but keeps conjugation', async () => {
    await preloadAllChapters();
    await ensureBuilderChapter(2);
    const sl = CHAPTERS[2].sublessons[1];
    const types = availablePracticeTypes([sl]).sort();
    assert.deepEqual(types, ['conjugation', 'sentence-completion']);
  });
});

describe('training question generator', () => {
  before(async () => {
    await ensureBuilderChapter(3);
  });

  it('builds matching rounds of four from the full 3-3 pool', () => {
    const session = createTrainingSession();
    const q = generateTrainingQuestion([SUBLESSON_3_3], 'matching', session);
    assert.equal(q?.type, 'matching');
    assert.equal(q.pairs.length, MATCHING_ROUND_SIZE);
  });

  it('covers all 3-3 vocabulary across repeated matching rounds', () => {
    const session = createTrainingSession();
    const seen = new Set();
    const rounds = Math.ceil(SUBLESSON_3_3.vocabulary.length / MATCHING_ROUND_SIZE) * 4;

    for (let i = 0; i < rounds; i++) {
      const q = generateTrainingQuestion([SUBLESSON_3_3], 'matching', session);
      assert.equal(q?.type, 'matching');
      for (const p of q.pairs) seen.add(p.es);
    }

    for (const item of SUBLESSON_3_3.vocabulary) {
      assert.ok(seen.has(item.es), `never generated matching pair for ${item.es}`);
    }
    assert.ok(seen.has('invierno'));
  });

  it('returns null when the game type has no practice pool', () => {
    const session = createTrainingSession();
    const q = generateTrainingQuestion([SUBLESSON_3_3], 'conjugation', session);
    assert.equal(q, null);
  });
});
