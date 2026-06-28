import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { getWeekDays, weekStreakHTML } from '../js/streak.js';

describe('getWeekDays', () => {
  it('marks studyDates from progress', () => {
    const progress = { studyDates: ['2026-06-25', '2026-06-27'] };
    const days = getWeekDays(progress);
    assert.equal(days.length, 7);
    assert.ok(days.some(d => d.lit));
    assert.ok(days.some(d => !d.lit));
  });

  it('renders week streak markup', () => {
    const html = weekStreakHTML([
      { label: 'M', lit: true, future: false },
      { label: 'T', lit: false, future: true },
    ]);
    assert.match(html, /week-streak/);
    assert.match(html, /🔥/);
  });
});
