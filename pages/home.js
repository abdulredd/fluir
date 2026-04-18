/* ─── Fluir · Home — chapter map ────────────────────────────────────────── */

import Store from '../js/store.js';
import { ALL_CHAPTERS } from '../js/data/chapters-list.js';

const CHAPTERS = ALL_CHAPTERS;

function renderHome(container) {
  const progress  = Store.getProgress();
  const today     = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  const completed = progress.chaptersComplete.length;
  const total     = CHAPTERS.length;
  const pct       = Math.round((completed / total) * 100);

  container.innerHTML = `
    <div class="page active" id="page-home">

      <div class="streak-bar">
        <div class="streak-bar__flame">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="${progress.currentStreak > 0 ? 'var(--color-amber)' : 'var(--text-muted)'}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 2c0 0-5 5-5 10a5 5 0 0010 0c0-2-1-4-2-5 0 2-1 3-3 3s-2-2-2-4c0 0 1 2 2 1z"/>
          </svg>
          <div>
            <div class="streak-bar__count">${progress.currentStreak}</div>
            <div class="streak-bar__label">day streak</div>
          </div>
        </div>
        <div class="streak-bar__date">${today}</div>
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
  const settings  = Store.getSettings();
  const saved     = Store.getChapter(ch.id);
  const started   = progress.chaptersStarted.includes(ch.id);
  const complete  = progress.chaptersComplete.includes(ch.id);
  const score     = progress.lessonScores[ch.id];

  const prevComplete = ch.id === 1 || progress.chaptersComplete.includes(ch.id - 1);
  const unlocked = settings.unlockAll || prevComplete || started || complete;

  const CHAPTER_DATA = { 1: true, 2: true, 3: true, 4: true, 5: true, 6: true, 7: true, 8: true, 9: true, 10: true, 11: true, 12: true, 13: true, 14: true, 15: true };
  const hasData    = !!CHAPTER_DATA[ch.id];
  const vocabCount = saved?.vocabulary?.length || 0;

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
        <div class="chapter-card__meta">${statusText}${vocabCount > 0 ? ` · ${vocabCount} words` : ''}</div>
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
