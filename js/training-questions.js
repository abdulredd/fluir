/* ─── Fluir · Training question picker ─────────────────────────────────────
   Practice generates fresh questions from full source pools (see js/training/).
   ─────────────────────────────────────────────────────────────────────────── */

/** @import { Sublesson, LessonQuestion } from './types.js' */

import { shuffle } from './utils.js';
import { prepareQuestions } from '../pages/lesson/questions.js';
import { availablePracticeTypes } from './training/lesson-types.js';
import {
  createTrainingSession,
  generateTrainingQuestion,
} from './training/generate-question.js';

/** Every drill type Practice can offer (subset shown per chapter). */
const TRAINING_GAME_TYPES = [
  { id: 'article-picker',       label: 'Article picker',      desc: 'Choose el or la',             tag: 'tag-grammar' },
  { id: 'fill-article',         label: 'Fill in the blank',   desc: 'Type the article',            tag: 'tag-grammar' },
  { id: 'matching',             label: 'Matching pairs',      desc: 'Match word to meaning',       tag: 'tag-grammar' },
  { id: 'translation',          label: 'Translation',         desc: 'English → Spanish',           tag: 'tag-grammar' },
  { id: 'vocab-picker',         label: 'Vocab picker',        desc: 'Pick the Spanish word',       tag: 'tag-grammar' },
  { id: 'plural-picker',        label: 'Plural builder',      desc: 'Choose the plural form',      tag: 'tag-grammar' },
  { id: 'adjective',            label: 'Adjective agreement', desc: 'Masculine, feminine, plural', tag: 'tag-grammar' },
  { id: 'conjugation',          label: 'Conjugation',         desc: 'Pick the correct verb form',  tag: 'tag-grammar' },
  { id: 'ser-vs-estar',         label: 'Ser vs Estar',        desc: 'Choose the right "to be"',    tag: 'tag-grammar' },
  { id: 'number-quiz',          label: 'Number quiz',         desc: 'Numeral → Spanish word',      tag: 'tag-grammar' },
  { id: 'sentence-completion',  label: 'Sentence completion', desc: 'Fill the blank in context',   tag: 'tag-grammar' },
  { id: 'random',               label: 'Random mix',          desc: 'Surprise me',                 tag: null          },
];

/**
 * Ensure sublesson builders are loaded (for picker / legacy callers).
 * @param {Sublesson[]} sublessons
 */
async function prepareTrainingPool(sublessons) {
  await Promise.all(sublessons.map(sl => prepareQuestions(sl)));
}

/**
 * Picker options available for these sublessons — only types each lesson builder wires.
 * @param {Sublesson[]} sublessons
 */
function gameTypesForPickerFromPool(sublessons) {
  const types = new Set(availablePracticeTypes(sublessons));
  if (!types.size) return [];
  return TRAINING_GAME_TYPES.filter(gt => gt.id === 'random' || types.has(gt.id));
}

/**
 * Pick a random playable type from filtered picker options.
 * @param {typeof TRAINING_GAME_TYPES} options
 */
function pickRandomGameType(options) {
  const ids = options.filter(gt => gt.id !== 'random').map(gt => gt.id);
  if (!ids.length) return 'random';
  return shuffle(ids)[0];
}

/**
 * @deprecated Lesson-style replay — use generateTrainingQuestion for practice.
 * @param {Sublesson[]} sublessons
 * @param {string} gameType
 * @returns {LessonQuestion|null}
 */
function pickTrainingQuestion(sublessons, gameType) {
  const session = createTrainingSession();
  return generateTrainingQuestion(sublessons, gameType, session);
}

export {
  TRAINING_GAME_TYPES,
  prepareTrainingPool,
  gameTypesForPickerFromPool,
  pickRandomGameType,
  pickTrainingQuestion,
  createTrainingSession,
  generateTrainingQuestion,
  availablePracticeTypes,
};
