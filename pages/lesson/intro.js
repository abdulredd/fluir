/* ─── Fluir · Chapter intro screen ─────────────────────────────────────────── */

/** @import { Chapter, LessonApi } from '../../js/types.js' */

import Store from '../../js/store.js';
import { VOCAB_KEYS } from '../../js/data/registry.js';
import { showConfirmSheet, showChoiceSheet } from '../../js/app.js';
import { scoreTierClass } from '../../js/utils.js';
import { el, appendChildren } from '../../js/dom.js';
import { iconCheck, iconChevronRight } from '../../js/icons.js';
import { mountPage, backButton, sectionLabel } from '../ui.js';

/** @param {Element} container @param {Chapter} chapter @param {LessonApi} api */
function renderChapterIntro(container, chapter, api) {
  const progress    = Store.getProgress();
  const savedState  = Store.getLessonState(chapter.id);
  const complete    = progress.chaptersComplete.includes(chapter.id);
  const score       = progress.lessonScores[chapter.id];
  const chapterInProgress = savedState && !complete
    && (savedState.subIndex > 0 || savedState.sessionTotal > 0);
  const quizInProgress    = chapterInProgress && (savedState.questions?.length ?? 0) > 0;
  const hasResume         = quizInProgress;
  const activeSubIndex    = hasResume
    ? (savedState.activeSubIndex ?? savedState.subIndex)
    : savedState?.subIndex ?? 0;
  const nextSublesson     = chapterInProgress && !quizInProgress
    ? chapter.sublessons[savedState.subIndex]
    : null;
  const vocabCount = chapter.sublessons.reduce((n, s) =>
    n + VOCAB_KEYS.reduce((m, k) => m + (s[k]?.length ?? 0), 0), 0);

  const resumeSubLesson = hasResume ? chapter.sublessons[activeSubIndex] : null;
  const resumeQIndex    = hasResume ? (savedState.qIndex   || 0) : 0;
  const resumeQTotal    = hasResume && savedState.questions ? savedState.questions.length : 0;

  function resumeLesson() {
    const sublesson = chapter.sublessons[activeSubIndex];
    if (!sublesson) return;
    const questions = savedState.questions || [];
    const qIndex    = savedState.qIndex    || 0;
    const sc        = { correct: savedState.sessionCorrect, total: savedState.sessionTotal };
    if (questions.length > 0) {
      api.runQuestions(container, chapter, sublesson, activeSubIndex, questions, qIndex, sc);
    } else {
      api.buildQuestionQueue(container, chapter, sublesson, activeSubIndex, sc);
    }
  }

  function startSublessonFresh(targetSub) {
    const prior = Store.getLessonState(chapter.id);
    Store.saveLessonState(chapter.id, {
      subIndex:       prior?.subIndex ?? 0,
      activeSubIndex: targetSub,
      qIndex:         0,
      questions:      [],
      sessionCorrect: 0,
      sessionTotal:   0,
    });
    api.startSubLesson(container, chapter, targetSub, { correct: 0, total: 0 }, true);
  }

  function discardQuizProgress() {
    const prior = Store.getLessonState(chapter.id);
    if (!prior) return;
    Store.saveLessonState(chapter.id, {
      subIndex:       prior.subIndex ?? 0,
      activeSubIndex: prior.subIndex ?? 0,
      qIndex:         0,
      questions:      [],
      sessionCorrect: 0,
      sessionTotal:   0,
    });
    api.renderChapterIntro(container, chapter);
  }

  function confirmDiscardProgress() {
    const lessonName = resumeSubLesson?.title || `Lesson ${activeSubIndex + 1}`;
    showConfirmSheet({
      title:        'Discard progress?',
      body:         `Your saved spot in "${lessonName}" will be cleared. Completed lessons stay marked.`,
      confirmLabel: 'Discard progress',
      cancelLabel:  'Go back',
      onConfirm:    discardQuizProgress,
    });
  }

  function startSublesson(targetSub) {
    if (quizInProgress && activeSubIndex === targetSub) {
      const lessonName = resumeSubLesson?.title || `Lesson ${targetSub + 1}`;
      showChoiceSheet({
        title: lessonName,
        body:  `Question ${resumeQIndex + 1} of ${resumeQTotal} · ${savedState.sessionCorrect} correct so far`,
        actions: [
          { label: 'Resume lesson →', className: 'btn--primary btn--lg', onClick: resumeLesson },
          { label: 'Start over',        className: 'btn--ghost',           onClick: () => startSublessonFresh(targetSub) },
          { label: 'Go back',           className: 'btn--ghost',           onClick: () => {} },
        ],
      });
      return;
    }
    if (quizInProgress && activeSubIndex !== targetSub) {
      const lessonName = chapter.sublessons[activeSubIndex]?.title || `Lesson ${activeSubIndex + 1}`;
      showConfirmSheet({
        title:        'Unsaved progress',
        body:         `You're in the middle of "${lessonName}." Starting a different lesson will lose your progress.`,
        confirmLabel: 'Start new lesson',
        cancelLabel:  'Go back',
        onConfirm:    () => startSublessonFresh(targetSub),
      });
      return;
    }
    startSublessonFresh(targetSub);
  }

  const completedSubs = Store.getCompletedSubs(savedState, complete, chapter.sublessons.length);

  function completeLabel(subIndex) {
    const best = Store.getSublessonBest(chapter.id, subIndex);
    return best ? `Complete · Best score: ${best.best}%` : 'Complete';
  }

  function rowSubtitle(sl, i) {
    const isEverDone = completedSubs.has(i);
    const isCurrent  = quizInProgress && i === activeSubIndex;
    if (isCurrent && isEverDone) return `${completeLabel(i)} · reviewing again`;
    if (isCurrent) return 'In progress — tap to continue';
    if (isEverDone) return completeLabel(i);
    return sl.subtitle;
  }

  const sublessonRows = chapter.sublessons.map((sl, i) => {
    const isCurrent  = quizInProgress && i === activeSubIndex;
    const isEverDone = completedSubs.has(i);
    const iconClass  = [
      'sublesson-row__icon',
      isEverDone ? 'sublesson-row__icon--done' : '',
      isCurrent ? 'sublesson-row__icon--current' : '',
    ].filter(Boolean).join(' ');
    const arrow = iconChevronRight();
    arrow.classList.add('sublesson-row__arrow');

    return el('button', {
      type: 'button',
      className: 'card sublesson-row',
      onClick: () => startSublesson(i),
    },
      el('div', { className: iconClass },
        isEverDone ? iconCheck(14) : String(i + 1),
      ),
      el('div', { className: 'card-row__main' },
        el('div', { className: 'text-sm text-bright', text: sl.title }),
        el('div', {
          className: 'text-muted text-xs',
          text: rowSubtitle(sl, i),
        }),
      ),
      arrow,
    );
  });

  const pageActions = el('div', { className: 'page-actions' });
  appendChildren(pageActions,
    el('button', {
      className: 'btn btn--ghost btn--full',
      id: 'rules-btn',
      text: 'Review chapter grammar rules',
      onClick: () => api.reviewAllRules(container, chapter),
    }),
  );

  mountPage(container, [
    el('div', { className: 'page-header' },
      backButton('back-btn', () => history.back()),
    ),
    el('div', { className: 'page-kicker', text: `Chapter ${chapter.id}` }),
    el('h2', { className: 'page-title', text: chapter.title }),
    el('p', {
      className: 'text-muted text-sm page-lead',
      text: `${vocabCount} vocabulary items · ${chapter.sublessons.length} lessons`,
    }),
    score?.best != null ? el('div', { className: 'card score-card score-card--chapter' },
      el('div', { className: 'score-card__label', text: 'Chapter complete' }),
      el('div', { className: 'score-card__row' },
        el('div', { className: 'text-sm text-bright', text: 'Best chapter score' }),
        el('div', { className: `score-card__value ${scoreTierClass(score.best)}`, text: `${score.best}%` }),
      ),
      el('div', {
        className: 'text-muted text-xs score-card__meta',
        text: `${score.attempts} attempt${score.attempts !== 1 ? 's' : ''}`,
      }),
    ) : null,
    hasResume ? el('div', { className: 'notice-banner notice-banner--cyan' },
      el('div', { className: 'notice-banner__label', text: 'In progress' }),
      el('div', { className: 'notice-banner__title', text: `Lesson ${activeSubIndex + 1} — ${resumeSubLesson?.title || ''}` }),
      el('div', {
        className: 'notice-banner__meta',
        text: `Question ${resumeQIndex + 1} of ${resumeQTotal} · ${savedState.sessionCorrect} correct so far`,
      }),
      el('button', {
        type:      'button',
        className: 'notice-banner__discard',
        id:        'discard-progress-btn',
        text:      'Discard progress',
        onClick:   confirmDiscardProgress,
      }),
    ) : null,
    nextSublesson ? el('div', { className: 'notice-banner notice-banner--cyan' },
      el('div', { className: 'notice-banner__label', text: 'Lesson complete' }),
      el('div', { className: 'notice-banner__title', text: `Up next — ${nextSublesson.title}` }),
      el('div', {
        className: 'notice-banner__meta',
        text: 'Pick the next lesson below, or review chapter grammar rules first.',
      }),
    ) : null,
    sectionLabel('Lessons'),
    ...sublessonRows,
    pageActions,
  ]);
}

export { renderChapterIntro };
