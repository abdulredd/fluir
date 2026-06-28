/* ─── Fluir · Chapter intro screen ─────────────────────────────────────────── */

/** @import { Chapter, LessonApi } from '../../js/types.js' */

import Store from '../../js/store.js';
import { VOCAB_KEYS } from '../../js/data/registry.js';
import { showConfirmSheet } from '../../js/app.js';
import { scoreTierClass } from '../../js/utils.js';
import { el, appendChildren } from '../../js/dom.js';
import { iconCheck, iconChevronRight } from '../../js/icons.js';
import { mountPage, backButton, sectionLabel } from '../ui.js';

/** @param {Element} container @param {Chapter} chapter @param {LessonApi} api */
function renderChapterIntro(container, chapter, api) {
  const progress    = Store.getProgress();
  const complete    = progress.chaptersComplete.includes(chapter.id);
  const score       = progress.lessonScores[chapter.id];
  const savedState  = Store.getLessonState(chapter.id);
  const hasResume   = savedState && !complete && savedState.sessionTotal > 0;
  const vocabCount = chapter.sublessons.reduce((n, s) =>
    n + VOCAB_KEYS.reduce((m, k) => m + (s[k]?.length ?? 0), 0), 0);

  const resumeSubLesson = hasResume ? chapter.sublessons[savedState.subIndex] : null;
  const resumeQIndex    = hasResume ? (savedState.qIndex   || 0) : 0;
  const resumeQTotal    = hasResume && savedState.questions ? savedState.questions.length : 0;

  function startSublesson(targetSub) {
    if (hasResume && savedState.subIndex !== targetSub) {
      const lessonName = chapter.sublessons[savedState.subIndex]?.title || `Lesson ${savedState.subIndex + 1}`;
      showConfirmSheet({
        title:        'Unsaved progress',
        body:         `You're in the middle of "${lessonName}." Starting a different lesson will lose your progress.`,
        confirmLabel: 'Start new lesson',
        cancelLabel:  'Go back',
        onConfirm:    () => {
          Store.clearLessonState(chapter.id);
          api.startSubLesson(container, chapter, targetSub, { correct: 0, total: 0 }, true);
        },
      });
      return;
    }
    Store.clearLessonState(chapter.id);
    api.startSubLesson(container, chapter, targetSub, { correct: 0, total: 0 }, true);
  }

  const sublessonRows = chapter.sublessons.map((sl, i) => {
    const isDone    = hasResume && i < savedState.subIndex;
    const isCurrent = hasResume && i === savedState.subIndex;
    const iconClass = isDone ? 'sublesson-row__icon--done' : isCurrent ? 'sublesson-row__icon--current' : '';
    const arrow = iconChevronRight();
    arrow.classList.add('sublesson-row__arrow');

    return el('button', {
      type: 'button',
      className: 'card sublesson-row',
      onClick: () => startSublesson(i),
    },
      el('div', { className: `sublesson-row__icon ${iconClass}` },
        isDone ? iconCheck(14) : String(i + 1),
      ),
      el('div', { className: 'card-row__main' },
        el('div', { className: 'text-sm text-bright', text: sl.title }),
        el('div', {
          className: 'text-muted text-xs',
          text: isDone ? 'Complete' : isCurrent ? 'Resume here' : sl.subtitle,
        }),
      ),
      arrow,
    );
  });

  const pageActions = el('div', { className: 'page-actions' });

  if (hasResume) {
    appendChildren(pageActions,
      el('button', {
        className: 'btn btn--primary btn--full btn--lg',
        id: 'resume-btn',
        text: 'Resume lesson →',
        onClick: () => {
          const sublesson = chapter.sublessons[savedState.subIndex];
          if (!sublesson) return;
          const questions = savedState.questions || [];
          const qIndex    = savedState.qIndex    || 0;
          const sc     = { correct: savedState.sessionCorrect, total: savedState.sessionTotal };
          if (questions.length > 0) {
            api.runQuestions(container, chapter, sublesson, savedState.subIndex, questions, qIndex, sc);
          } else {
            api.buildQuestionQueue(container, chapter, sublesson, savedState.subIndex, sc);
          }
        },
      }),
      el('button', {
        className: 'btn btn--ghost btn--full',
        id: 'start-btn',
        text: 'Start over from the beginning',
        onClick: () => {
          Store.clearLessonState(chapter.id);
          api.startSubLesson(container, chapter, 0, { correct: 0, total: 0 }, true, true);
        },
      }),
    );
  } else {
    appendChildren(pageActions,
      el('button', {
        className: 'btn btn--primary btn--full btn--lg',
        id: 'start-btn',
        text: complete ? 'Study Again' : 'Begin Lesson',
        onClick: () => {
          Store.clearLessonState(chapter.id);
          api.startSubLesson(container, chapter, 0, { correct: 0, total: 0 }, true, true);
        },
      }),
      el('button', {
        className: 'btn btn--ghost btn--full',
        id: 'rules-btn',
        text: 'Review chapter rules',
        onClick: () => {
          Store.clearLessonState(chapter.id);
          api.reviewAllRules(container, chapter);
        },
      }),
    );
  }

  mountPage(container, [
    el('div', { className: 'page-header' },
      backButton('back-btn', () => history.back()),
      complete ? el('span', { className: 'status-badge status-badge--complete', text: 'Complete' }) : null,
    ),
    el('div', { className: 'page-kicker', text: `Chapter ${chapter.id}` }),
    el('h2', { className: 'page-title', text: chapter.title }),
    el('p', {
      className: 'text-muted text-sm page-lead',
      text: `${vocabCount} vocabulary items · ${chapter.sublessons.length} lessons`,
    }),
    score ? el('div', { className: 'card score-card' },
      el('div', {},
        el('div', { className: 'text-sm text-bright', text: 'Best score' }),
        el('div', { className: 'text-muted text-xs', text: `${score.attempts} attempt${score.attempts !== 1 ? 's' : ''}` }),
      ),
      el('div', { className: `score-card__value ${scoreTierClass(score.best)}`, text: `${score.best}%` }),
    ) : null,
    hasResume ? el('div', { className: 'notice-banner notice-banner--cyan' },
      el('div', { className: 'notice-banner__label', text: 'In progress' }),
      el('div', { className: 'notice-banner__title', text: `Lesson ${savedState.subIndex + 1} — ${resumeSubLesson?.title || ''}` }),
      el('div', {
        className: 'notice-banner__meta',
        text: `Question ${resumeQIndex + 1} of ${resumeQTotal} · ${savedState.sessionCorrect} correct so far`,
      }),
    ) : null,
    sectionLabel('Lessons'),
    ...sublessonRows,
    pageActions,
  ]);
}

export { renderChapterIntro };
