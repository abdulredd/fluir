/* ─── Fluir · Home — chapter map ────────────────────────────────────────── */

import Store from '../js/store.js';
import { ALL_CHAPTERS } from '../js/data/registry.js';
import { isLessonUnlocked } from '../js/chapters/access.js';
import { getWeekDays, weekStreakEl } from '../js/streak.js';
import { mountPage, metricsRow, progressBar, sectionLabel, chapterCard, el } from './ui.js';

const CHAPTERS = ALL_CHAPTERS;

function renderHome(container) {
  const progress  = Store.getProgress();
  const settings  = Store.getSettings();
  const completed = progress.chaptersComplete.length;
  const total     = CHAPTERS.length;
  const pct       = Math.round((completed / total) * 100);
  const weekDays  = getWeekDays(progress);

  mountPage(container, [
    weekStreakEl(weekDays),
    metricsRow([
      { value: completed,           label: 'Done',      valueClass: 'metric__value--green' },
      { value: total - completed,   label: 'Remaining', valueClass: 'metric__value--cyan' },
      { value: `${pct}%`,           label: 'Complete',  valueClass: 'metric__value--purple' },
    ]),
    progressBar(pct, {
      fillClass: 'progress-fill--purple',
      trackClass: 'mb-6',
      ariaLabel: 'Overall progress',
    }),
    sectionLabel('Chapters'),
    el('div', { id: 'chapter-list' },
      ...CHAPTERS.map(ch => chapterCard(ch, progress, settings, isLessonUnlocked)),
    ),
  ], { id: 'page-home' });
}

export { renderHome, CHAPTERS };
