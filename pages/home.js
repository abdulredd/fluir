/* ─── Fluir · Home — chapter map ────────────────────────────────────────── */

import Store from '../js/store.js';
import { ALL_CHAPTERS } from '../js/data/chapters-list.js';
import { isLessonUnlocked } from '../js/chapters/access.js';

const CHAPTERS = ALL_CHAPTERS;

function getWeekDays(progress) {
  const todayDate = new Date();
  const todayStr  = todayDate.toISOString().split('T')[0];

  const dow    = todayDate.getDay();
  const offset = dow === 0 ? -6 : 1 - dow;
  const monday = new Date(todayDate);
  monday.setDate(todayDate.getDate() + offset);

  const studied = new Set(progress.studyDates || []);

  return ['M','T','W','T','F','S','S'].map((label, i) => {
    const date    = new Date(monday);
    date.setDate(monday.getDate() + i);
    const dateStr = date.toISOString().split('T')[0];
    return { label, lit: studied.has(dateStr), future: dateStr > todayStr };
  });
}

function renderHome(container) {
  const progress  = Store.getProgress();
  const completed = progress.chaptersComplete.length;
  const total     = CHAPTERS.length;
  const pct       = Math.round((completed / total) * 100);
  const weekDays  = getWeekDays(progress);

  container.innerHTML = `
    <div class="page active" id="page-home">

      <div class="week-streak">
        ${weekDays.map(d => `
          <div class="week-streak__day">
            <div class="week-streak__label">${d.label}</div>
            ${d.lit
              ? `<div class="week-streak__flame">🔥</div>`
              : `<div class="week-streak__dot ${d.future ? 'week-streak__dot--future' : ''}"></div>`
            }
          </div>
        `).join('')}
      </div>

      <div class="metrics-row">
        <div class="metric">
          <div class="metric__value" style="color:var(--color-green)">${completed}</div>
          <div class="metric__label">Done</div>
        </div>
        <div class="metric">
          <div class="metric__value" style="color:var(--color-cyan)">${total - completed}</div>
          <div class="metric__label">Remaining</div>
        </div>
        <div class="metric">
          <div class="metric__value" style="color:var(--color-purple)">${pct}%</div>
          <div class="metric__label">Complete</div>
        </div>
      </div>

      <div class="progress-track" style="margin-bottom:var(--space-6)">
        <div class="progress-fill" style="width:${pct}%"></div>
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
