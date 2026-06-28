/* ─── Fluir · Stats page ─────────────────────────────────────────────────── */

import Store from '../js/store.js';
import { ALL_CHAPTERS } from '../js/data/registry.js';
import { scoreTierClass, scoreTierProgressClass } from '../js/utils.js';
import { el } from '../js/dom.js';
import { mountPage, metricsRow, progressBar, sectionLabel, emptyState } from './ui.js';

function formatStudyDate(dateStr) {
  if (!dateStr) return null;
  return new Date(dateStr + 'T12:00:00').toLocaleDateString('en-US', {
    month: 'short',
    day:   'numeric',
  });
}

function chapterTitle(id) {
  const ch = ALL_CHAPTERS.find(c => String(c.id) === String(id));
  return ch ? `Chapter ${id} · ${ch.title}` : `Chapter ${id}`;
}

function renderProgress(container) {
  const progress     = Store.getProgress();
  const scores       = progress.lessonScores || {};
  const scoreEntries = Object.entries(scores).sort(([a], [b]) => Number(a) - Number(b));
  const total        = ALL_CHAPTERS.length;
  const completed    = progress.chaptersComplete.length;

  const inProgressIds = progress.chaptersStarted.filter(
    id => !progress.chaptersComplete.includes(id),
  );

  const inProgressSection = inProgressIds.length > 0
    ? [
      sectionLabel('In progress'),
      ...inProgressIds.map(id => {
        const saved = Store.getLessonState(id);
        const resumeHint = saved?.questions?.length
          ? `Question ${(saved.qIndex || 0) + 1} of ${saved.questions.length}`
          : 'Started — pick up where you left off';
        return el('div', { className: 'card card-row card--stack' },
          el('div', { className: 'card-row__main' },
            el('div', { className: 'text-sm text-bright', text: chapterTitle(id) }),
            el('div', { className: 'text-xs text-muted mt-2', text: resumeHint }),
          ),
          el('button', {
            className: 'btn btn--sm btn--primary progress-continue',
            dataset: { chapter: String(id) },
            text: 'Continue',
            onClick: () => { location.hash = `#/chapter/${id}`; },
          }),
        );
      }),
    ]
    : [];

  const breakdownSection = scoreEntries.length === 0
    ? emptyState({
      title: 'No chapters completed yet',
      body:  'Finish your first chapter to see scores here.',
      padded: true,
    })
    : scoreEntries.map(([id, s]) => {
      const scoreClass    = scoreTierClass(s.best);
      const progressClass = scoreTierProgressClass(s.best);
      const chMeta        = ALL_CHAPTERS.find(c => String(c.id) === String(id));
      const date          = formatStudyDate(s.date);
      return el('div', { className: 'card card--stack' },
        el('div', { className: 'score-breakdown__header' },
          el('div', {},
            el('div', {
              className: 'text-sm text-bright',
              text: `Chapter ${id}${chMeta ? ' · ' + chMeta.title : ''}`,
            }),
            el('div', {
              className: 'text-xs text-muted mt-2',
              text: `${s.attempts} attempt${s.attempts !== 1 ? 's' : ''}${date ? ` · ${date}` : ''}`,
            }),
          ),
          el('div', { className: `score-card__value score-card__value--lg ${scoreClass}`, text: `${s.best}%` }),
        ),
        progressBar(s.best, { fillClass: progressClass, trackClass: 'mb-3', ariaLabel: `Chapter ${id} score` }),
        el('div', { className: 'card-row__actions' },
          el('button', {
            className: 'btn btn--sm progress-study',
            dataset: { chapter: String(id) },
            text: 'Study again',
            onClick: () => { location.hash = `#/chapter/${id}`; },
          }),
          el('button', {
            className: 'btn btn--sm btn--amber progress-practice',
            dataset: { chapter: String(id) },
            text: 'Practice',
            onClick: () => { location.hash = `#/training/${id}`; },
          }),
        ),
      );
    });

  mountPage(container, [
    el('div', { className: 'page-head' },
      el('h2', { className: 'page-title mb-2', text: 'Progress' }),
      progress.lastStudyDate
        ? el('div', { className: 'text-xs text-muted', text: `Last studied ${formatStudyDate(progress.lastStudyDate)}` })
        : null,
    ),
    metricsRow([
      { value: progress.currentStreak, label: 'Current streak', valueClass: 'metric__value--green' },
      { value: progress.longestStreak, label: 'Best streak',    valueClass: 'metric__value--cyan' },
      { value: `${completed}/${total}`, label: 'Chapters',      valueClass: 'metric__value--purple' },
    ]),
    ...inProgressSection,
    sectionLabel('Chapter breakdown'),
    ...(Array.isArray(breakdownSection) ? breakdownSection : [breakdownSection]),
  ], { id: 'page-progress' });
}

export { renderProgress };
