/* ─── Fluir · Game dispatch ───────────────────────────────────────────────── */

/** @import { LessonQuestion } from '../types.js' */

import { el, clearAndMount } from '../dom.js';
import { escapeHtml } from '../utils.js';
import {
  gameArticlePicker,
  gameFillArticle,
  gameMatching,
  gamePluralPicker,
  gameAdjectiveAgreement,
  gameTranslation,
  gameConjugationPicker,
  gameSerVsEstar,
  gameNumberQuiz,
  gameSentenceCompletion,
  gameVocabPicker,
} from './index.js';

/** @type {Record<string, (container: Element, question: LessonQuestion, onAnswer: Function) => void>} */
const GAME_RENDERERS = {
  'article-picker':      gameArticlePicker,
  'fill-article':        gameFillArticle,
  'matching':            gameMatching,
  'plural-picker':       gamePluralPicker,
  'adjective':           gameAdjectiveAgreement,
  'translation':         gameTranslation,
  'conjugation':         gameConjugationPicker,
  'ser-vs-estar':        gameSerVsEstar,
  'number-quiz':         gameNumberQuiz,
  'sentence-completion': gameSentenceCompletion,
  'vocab-picker':        gameVocabPicker,
};

const KNOWN_GAME_TYPES = Object.keys(GAME_RENDERERS);

/**
 * Render a question into container. Returns false if type is unknown.
 * @param {Element} container
 * @param {LessonQuestion} question
 * @param {(isCorrect: boolean, question?: LessonQuestion) => void} onAnswer
 * @returns {boolean}
 */
function renderGame(container, question, onAnswer) {
  const renderer = GAME_RENDERERS[question.type];
  if (!renderer) return false;
  renderer(container, question, onAnswer);
  return true;
}

function renderUnknownGame(container, question) {
  console.error('[Fluir] Unknown question type:', question?.type, question);

  const nextBtn = el('button', {
    className: 'btn btn--primary',
    id: 'unknown-next',
    style: 'margin-top:var(--space-4)',
    text: 'Next →',
    onClick: () => container.dispatchEvent(new CustomEvent('game:next')),
  });

  clearAndMount(container,
    el('div', { className: 'empty-state empty-state--padded' },
      el('div', { className: 'empty-state__title', text: 'Question unavailable' }),
      el('div', {
        className: 'empty-state__body',
        html: `This question type (${escapeHtml(question?.type || 'unknown')}) is not supported. Tap Next to continue.`,
      }),
      nextBtn,
    ),
  );
}

export { renderGame, renderUnknownGame, GAME_RENDERERS, KNOWN_GAME_TYPES };
