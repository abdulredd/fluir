/* ─── Fluir · Lesson question runner ─────────────────────────────────────── */

/** @import { Chapter, Sublesson, SessionScore, LessonQuestion, LessonApi } from '../../js/types.js' */

import Store from '../../js/store.js';
import { collectChapterVocabIds } from '../../js/data/registry.js';
import { scoreTierClass } from '../../js/utils.js';
import { renderGame, renderUnknownGame } from '../../js/games/dispatch.js';
import { el, clearAndMount } from '../../js/dom.js';
import {
  mountPage,
  lessonQuizHeader,
  progressBar,
  metricsRow,
  pageWithEmptyState,
} from '../ui.js';

/**
 * @param {Element} container
 * @param {Chapter} chapter
 * @param {Sublesson} sublesson
 * @param {number} subIndex
 * @param {LessonQuestion[]} questions
 * @param {number} qIndex
 * @param {SessionScore} score
 * @param {boolean} autoSkipRules
 * @param {LessonApi} api
 */
function runQuestions(container, chapter, sublesson, subIndex, questions, qIndex, score, autoSkipRules, api) {
  if (qIndex >= questions.length) {
    api.startSubLesson(container, chapter, subIndex + 1, score, false, autoSkipRules);
    return;
  }

  Store.saveLessonState(chapter.id, {
    subIndex,
    qIndex,
    questions,
    sessionCorrect: score.correct,
    sessionTotal:   score.total,
    savedAt:        Date.now(),
  });

  const q    = questions[qIndex];
  const prog = Math.round(
    ((subIndex / chapter.sublessons.length) +
     (qIndex / (questions.length * chapter.sublessons.length))) * 100
  );

  const hasRules = (sublesson.rules || []).length > 0;
  const gameContent = el('div', { id: 'game-content' });

  mountPage(container, [
    lessonQuizHeader({
      sublessonTitle: sublesson.title,
      onBack:         () => api.renderChapterIntro(container, chapter),
      onViewRules:    hasRules
        ? () => {
          const returnToQuiz = () => runQuestions(container, chapter, sublesson, subIndex, questions, qIndex, score, autoSkipRules, api);
          api.renderRuleCards(container, chapter, sublesson, subIndex, score, {
            onExit:     returnToQuiz,
            onComplete: returnToQuiz,
            lastLabel:  'Back to questions →',
          });
        }
        : null,
    }),
    progressBar(Math.max(prog, 5), { trackClass: 'quiz-progress' }),
    el('div', { className: 'quiz-meta' },
      el('span', { className: 'text-xs text-muted', text: `${qIndex + 1} of ${questions.length}` }),
      el('span', { className: 'text-xs quiz-score', text: `${score.correct} correct` }),
    ),
    gameContent,
  ]);

  function onAnswer(isCorrect) {
    if (score.total === 0) Store.recordStudySession();
    if (isCorrect) score.correct++;
    score.total++;
  }

  gameContent.addEventListener('game:next', () => {
    runQuestions(container, chapter, sublesson, subIndex, questions, qIndex + 1, score, autoSkipRules, api);
  }, { once: true });

  if (!renderGame(gameContent, q, onAnswer)) {
    renderUnknownGame(gameContent, q);
  }
}

/** @param {Element} container @param {Chapter} chapter @param {SessionScore} score */
function renderLessonComplete(container, chapter, score) {
  const pct = score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0;
  Store.recordChapterComplete(chapter.id, pct);
  Store.recordStudySession();
  Store.clearLessonState(chapter.id);

  const allVocabIds = collectChapterVocabIds(chapter);
  Store.addToAnkiQueue(allVocabIds);

  const grade      = pct >= 90 ? '¡Excelente!' : pct >= 70 ? '¡Bien hecho!' : pct >= 50 ? '¡Buen esfuerzo!' : '¡Sigue practicando!';
  const scoreClass = scoreTierClass(pct);

  const metrics = metricsRow([
      { value: score.correct,              label: 'Correct',    valueClass: 'metric__value--green' },
      { value: score.total - score.correct, label: 'Missed',     valueClass: 'metric__value--red' },
      { value: allVocabIds.length,         label: 'Anki cards', valueClass: 'metric__value--amber' },
    ]);
  metrics.classList.add('mb-6');

  mountPage(container, [
    el('div', { className: `lesson-complete__pct ${scoreClass}`, text: `${pct}%` }),
    el('div', { className: 'lesson-complete__grade', text: grade }),
    el('div', {
      className: 'text-muted text-sm lesson-complete__summary',
      text: `${score.correct} correct out of ${score.total} · Chapter ${chapter.id}`,
    }),
    metrics,
    el('div', { className: 'notice-banner notice-banner--amber mb-6' },
      el('div', { className: 'notice-banner__label', text: 'Anki export ready' }),
      el('div', {
        className: 'notice-banner__body',
        text: `${allVocabIds.length} vocabulary cards queued. Go to Settings to download your deck.`,
      }),
    ),
    el('div', { className: 'page-actions' },
      el('button', {
        className: 'btn btn--primary btn--full btn--lg',
        id: 'complete-home-btn',
        text: 'Back to chapters',
        onClick: () => { location.hash = '#/'; },
      }),
      el('button', {
        className: 'btn btn--full',
        id: 'complete-training-btn',
        text: 'Training Grounds →',
        onClick: () => { location.hash = `#/training/${chapter.id}`; },
      }),
      el('button', {
        className: 'btn btn--ghost btn--full',
        id: 'complete-retry-btn',
        text: 'Study again',
        onClick: () => { location.hash = `#/chapter/${chapter.id}`; },
      }),
    ),
  ], { className: 'page active lesson-complete' });
}

function renderUnknownChapter(container, chapterId) {
  clearAndMount(container,
    pageWithEmptyState(`Chapter ${chapterId} not yet available`, {
      onBack: () => history.back(),
      body:   'This chapter hasn\'t been added to Fluir yet. Start with Chapter 1.',
    }),
  );
}

export { runQuestions, renderLessonComplete, renderUnknownChapter };
