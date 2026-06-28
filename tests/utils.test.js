import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { shuffle, escapeHtml, scoreTierClass, scoreTierProgressClass } from '../js/utils.js';

describe('shuffle', () => {
  it('returns a new array with the same elements', () => {
    const input = [1, 2, 3, 4, 5];
    const out   = shuffle(input);
    assert.notEqual(out, input);
    assert.deepEqual([...out].sort(), input);
  });

  it('does not mutate the input array', () => {
    const input = ['a', 'b', 'c'];
    shuffle(input);
    assert.deepEqual(input, ['a', 'b', 'c']);
  });
});

describe('escapeHtml', () => {
  it('escapes HTML special characters', () => {
    assert.equal(escapeHtml('<script>"x"&</script>'), '&lt;script&gt;&quot;x&quot;&amp;&lt;/script&gt;');
  });

  it('coerces nullish values to empty string', () => {
    assert.equal(escapeHtml(null), '');
    assert.equal(escapeHtml(undefined), '');
  });
});

describe('scoreTierClass', () => {
  it('maps score tiers to text color classes', () => {
    assert.equal(scoreTierClass(90), 'text-score--good');
    assert.equal(scoreTierClass(80), 'text-score--good');
    assert.equal(scoreTierClass(70), 'text-score--ok');
    assert.equal(scoreTierClass(60), 'text-score--ok');
    assert.equal(scoreTierClass(40), 'text-score--low');
  });
});

describe('scoreTierProgressClass', () => {
  it('maps score tiers to progress bar fill classes', () => {
    assert.equal(scoreTierProgressClass(90), 'progress-fill--green');
    assert.equal(scoreTierProgressClass(80), 'progress-fill--green');
    assert.equal(scoreTierProgressClass(70), 'progress-fill--amber');
    assert.equal(scoreTierProgressClass(60), 'progress-fill--amber');
    assert.equal(scoreTierProgressClass(40), 'progress-fill--red');
  });
});
