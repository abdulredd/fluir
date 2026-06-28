/* ─── Fluir · Chapter intro screen ─────────────────────────────────────────── */

/** @import { Chapter, LessonApi } from '../../js/types.js' */

import Store from '../../js/store.js';
import { VOCAB_KEYS } from '../../js/data/registry.js';
import { showConfirmSheet } from '../../js/app.js';
import { scoreTierClass } from '../../js/utils.js';

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

  container.innerHTML = `
    <div class="page active">
      <div class="page-header">
        <button class="btn btn--ghost btn--sm" id="back-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          Back
        </button>
        ${complete ? `<span class="status-badge status-badge--complete">Complete</span>` : ''}
      </div>

      <div class="page-kicker">Chapter ${chapter.id}</div>
      <h2 class="page-title">${chapter.title}</h2>
      <p class="text-muted text-sm page-lead">${vocabCount} vocabulary items · ${chapter.sublessons.length} lessons</p>

      ${score ? `
        <div class="card score-card">
          <div>
            <div class="text-sm text-bright">Best score</div>
            <div class="text-muted text-xs">${score.attempts} attempt${score.attempts !== 1 ? 's' : ''}</div>
          </div>
          <div class="score-card__value ${scoreTierClass(score.best)}">${score.best}%</div>
        </div>
      ` : ''}

      ${hasResume ? `
        <div class="notice-banner notice-banner--cyan">
          <div class="notice-banner__label">In progress</div>
          <div class="notice-banner__title">Lesson ${savedState.subIndex + 1} — ${resumeSubLesson?.title}</div>
          <div class="notice-banner__meta">Question ${resumeQIndex + 1} of ${resumeQTotal} · ${savedState.sessionCorrect} correct so far</div>
        </div>
      ` : ''}

      <div class="section-label">Lessons</div>
      ${chapter.sublessons.map((sl, i) => {
        const isDone    = hasResume && i < savedState.subIndex;
        const isCurrent = hasResume && i === savedState.subIndex;
        const iconClass = isDone ? 'sublesson-row__icon--done' : isCurrent ? 'sublesson-row__icon--current' : '';
        return `
          <div class="card sublesson-row" data-sub="${i}">
            <div class="sublesson-row__icon ${iconClass}">
              ${isDone ? `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>` : i + 1}
            </div>
            <div class="card-row__main">
              <div class="text-sm text-bright">${sl.title}</div>
              <div class="text-muted text-xs">${isDone ? 'Complete' : isCurrent ? 'Resume here' : sl.subtitle}</div>
            </div>
            <svg class="sublesson-row__arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
          </div>
        `;
      }).join('')}

      <div class="page-actions">
        ${hasResume ? `
          <button class="btn btn--primary btn--full btn--lg" id="resume-btn">Resume lesson →</button>
          <button class="btn btn--ghost btn--full" id="start-btn">Start over from the beginning</button>
        ` : `
          <button class="btn btn--primary btn--full btn--lg" id="start-btn">
            ${complete ? 'Study Again' : 'Begin Lesson'}
          </button>
          <button class="btn btn--ghost btn--full" id="rules-btn">Review chapter rules</button>
        `}
      </div>
    </div>
  `;

  container.querySelector('#back-btn')?.addEventListener('click', () => history.back());

  container.querySelector('#start-btn').addEventListener('click', () => {
    Store.clearLessonState(chapter.id);
    api.startSubLesson(container, chapter, 0, { correct: 0, total: 0 }, true, true);
  });

  container.querySelectorAll('[data-sub]').forEach(el => {
    el.addEventListener('click', () => {
      const targetSub = parseInt(el.dataset.sub);
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
    });
  });

  container.querySelector('#rules-btn')?.addEventListener('click', () => {
    Store.clearLessonState(chapter.id);
    api.reviewAllRules(container, chapter);
  });

  container.querySelector('#resume-btn')?.addEventListener('click', () => {
    const sublesson = chapter.sublessons[savedState.subIndex];
    if (!sublesson) return;
    const questions = savedState.questions || [];
    const qIndex    = savedState.qIndex    || 0;
    const score     = { correct: savedState.sessionCorrect, total: savedState.sessionTotal };
    if (questions.length > 0) {
      api.runQuestions(container, chapter, sublesson, savedState.subIndex, questions, qIndex, score);
    } else {
      api.buildQuestionQueue(container, chapter, sublesson, savedState.subIndex, score);
    }
  });
}

export { renderChapterIntro };
