/* ─── Fluir · Home — chapter map ────────────────────────────────────────── */

import Store from '../js/store.js';
import { ALL_CHAPTERS } from '../js/data/registry.js';
import { isLessonUnlocked } from '../js/chapters/access.js';
import { getWeekDays, weekStreakHTML } from '../js/streak.js';

const CHAPTERS = ALL_CHAPTERS;

function renderHome(container) {
  const progress  = Store.getProgress();
  const completed = progress.chaptersComplete.length;
  const total     = CHAPTERS.length;
  const pct       = Math.round((completed / total) * 100);
  const weekDays  = getWeekDays(progress);

  container.innerHTML = `
    <div class="page active" id="page-home">

      ${weekStreakHTML(weekDays)}

      <div class="metrics-row">
        <div class="metric">
          <div class="metric__value metric__value--green">${completed}</div>
          <div class="metric__label">Done</div>
        </div>
        <div class="metric">
          <div class="metric__value metric__value--cyan">${total - completed}</div>
          <div class="metric__label">Remaining</div>
        </div>
        <div class="metric">
          <div class="metric__value metric__value--purple">${pct}%</div>
          <div class="metric__label">Complete</div>
        </div>
      </div>

      <div class="progress-track mb-6">
        <div class="progress-fill progress-fill--purple" style="width:${pct}%"></div>
      </div>

      <div class="section-label">Chapters</div>

      <div id="chapter-list">
        ${CHAPTERS.map(ch => chapterCard(ch, progress)).join('')}
      </div>

    </div>
  `;

  container.querySelectorAll('.chapter-card:not(.chapter-card--locked)').forEach(el => {
    el.addEventListener('click', () => {
      location.hash = `#/chapter/${el.dataset.id}`;
    });
  });
}

function chapterCard(ch, progress) {
  const started  = progress.chaptersStarted.includes(ch.id);
  const complete = progress.chaptersComplete.includes(ch.id);
  const score    = progress.lessonScores[ch.id];

  const settings = Store.getSettings();
  const unlocked = isLessonUnlocked(ch.id, progress, settings);
  const hasData  = ch.hasContent;

  let statusText = unlocked ? (hasData ? 'Not started' : 'Coming soon') : 'Locked';
  if (started && !complete) statusText = 'In progress';
  if (complete) statusText = score ? `Best: ${score.best}%` : 'Complete';

  let numberContent = ch.id;
  if (complete) {
    numberContent = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;
  }

  const locked     = !unlocked;
  const comingSoon = unlocked && !hasData && !started && !complete;

  return `
    <div class="chapter-card ${complete ? 'chapter-card--complete' : ''} ${locked || comingSoon ? 'chapter-card--locked' : ''}"
         data-id="${ch.id}">
      <div class="chapter-card__number">${numberContent}</div>
      <div class="chapter-card__body">
        <div class="chapter-card__title">${ch.title}</div>
        <div class="chapter-card__meta">${statusText}</div>
      </div>
      <div class="chapter-card__arrow">
        ${locked || comingSoon
          ? `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>`
          : `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>`
        }
      </div>
    </div>
  `;
}

export { renderHome, CHAPTERS };
