import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  isLessonUnlocked,
  isPracticeUnlocked,
  practiceUnlockedChapterIds,
} from '../js/chapters/access.js';

const emptyProgress = {
  chaptersStarted:  [],
  chaptersComplete: [],
};

const catalog = [{ id: 1 }, { id: 2 }, { id: 3 }];

describe('isLessonUnlocked', () => {
  it('chapter 1 is always unlocked', () => {
    assert.equal(isLessonUnlocked(1, emptyProgress, {}), true);
  });

  it('chapter 2 locked until chapter 1 complete', () => {
    assert.equal(isLessonUnlocked(2, emptyProgress, {}), false);
    const afterCh1 = { ...emptyProgress, chaptersComplete: [1] };
    assert.equal(isLessonUnlocked(2, afterCh1, {}), true);
  });

  it('started chapter unlocks without prior complete', () => {
    const started = { ...emptyProgress, chaptersStarted: [3] };
    assert.equal(isLessonUnlocked(3, started, {}), true);
  });

  it('settings.unlockAll unlocks everything', () => {
    assert.equal(isLessonUnlocked(15, emptyProgress, { unlockAll: true }), true);
  });
});

describe('isPracticeUnlocked', () => {
  it('requires chapter completion by default', () => {
    assert.equal(isPracticeUnlocked(2, emptyProgress, {}), false);
    const done = { ...emptyProgress, chaptersComplete: [2] };
    assert.equal(isPracticeUnlocked(2, done, {}), true);
  });

  it('settings.unlockAllPractice bypasses completion', () => {
    assert.equal(isPracticeUnlocked(5, emptyProgress, { unlockAllPractice: true }), true);
  });
});

describe('practiceUnlockedChapterIds', () => {
  it('returns completed ids from progress', () => {
    const progress = { chaptersComplete: [1, 3] };
    assert.deepEqual(practiceUnlockedChapterIds(catalog, progress, {}), [1, 3]);
  });

  it('returns all catalog ids when unlockAllPractice', () => {
    assert.deepEqual(
      practiceUnlockedChapterIds(catalog, emptyProgress, { unlockAllPractice: true }),
      [1, 2, 3],
    );
  });
});
