import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const typesSource = fs.readFileSync(path.join(ROOT, 'js/types.js'), 'utf8');

describe('JSDoc types module', () => {
  it('defines core lesson engine typedefs', () => {
    for (const name of [
      'Chapter',
      'Sublesson',
      'LessonQuestion',
      'SessionScore',
      'LessonState',
      'LessonApi',
      'SublessonBuilder',
    ]) {
      assert.match(typesSource, new RegExp(`@typedef \\{[^}]+\\} ${name}`));
    }
  });

  it('documents all game question variants', () => {
    for (const name of [
      'VocabQuestion',
      'MatchingQuestion',
      'ConjugationQuestion',
      'SerVsEstarQuestion',
      'SentenceCompletionQuestion',
    ]) {
      assert.match(typesSource, new RegExp(`@typedef \\{[^}]+\\} ${name}`));
    }
  });
});
