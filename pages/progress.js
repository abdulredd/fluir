/* ─── Fluir · Stats page ─────────────────────────────────────────────────── */

import Store from '../js/store.js';
import { ALL_CHAPTERS } from '../js/data/registry.js';
import { scoreTierClass, scoreTierProgressClass } from '../js/utils.js';

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
  const progress   = Store.getProgress();
  const scores     = progress.lessonScores || {};
  const scoreEntries = Object.entries(scores).sort(([a], [b]) => Number(a) - Number(b));
  const total        = ALL_CHAPTERS.length;
  const completed    = progress.chaptersComplete.length;

  const inProgressIds = progress.chaptersStarted.filter(
    id => !progress.chaptersComplete.includes(id),
  );

  container.innerHTML = `
    <div class="page active" id="page-progress">

      <div class="page-head">
        <h2 class="page-title mb-2">Progress</h2>
        ${progress.lastStudyDate
          ? `<div class="text-xs text-muted">Last studied ${formatStudyDate(progress.lastStudyDate)}</div>`
          : ''
        }
      </div>

      <div class="metrics-row">
        <div class="metric">
          <div class="metric__value metric__value--green">${progress.currentStreak}</div>
          <div class="metric__label">Current streak</div>
        </div>
        <div class="metric">
          <div class="metric__value metric__value--cyan">${progress.longestStreak}</div>
          <div class="metric__label">Best streak</div>
        </div>
        <div class="metric">
          <div class="metric__value metric__value--purple">${completed}/${total}</div>
          <div class="metric__label">Chapters</div>
        </div>
      </div>

      ${inProgressIds.length > 0 ? `
        <div class="section-label">In progress</div>
        ${inProgressIds.map(id => {
          const saved = Store.getLessonState(id);
          const resumeHint = saved?.questions?.length
            ? `Question ${(saved.qIndex || 0) + 1} of ${saved.questions.length}`
            : 'Started — pick up where you left off';
          return `
            <div class="card card-row card--stack">
              <div class="card-row__main">
                <div class="text-sm text-bright">${chapterTitle(id)}</div>
                <div class="text-xs text-muted mt-2">${resumeHint}</div>
              </div>
              <button class="btn btn--sm btn--primary progress-continue" data-chapter="${id}">Continue</button>
            </div>
          `;
        }).join('')}
      ` : ''}

      <div class="section-label">Chapter breakdown</div>

      ${scoreEntries.length === 0
        ? `<div class="empty-state empty-state--padded">
             <div class="empty-state__title">No chapters completed yet</div>
             <div class="empty-state__body">Finish your first chapter to see scores here.</div>
           </div>`
        : scoreEntries.map(([id, s]) => {
            const scoreClass   = scoreTierClass(s.best);
            const progressClass = scoreTierProgressClass(s.best);
            const chMeta     = ALL_CHAPTERS.find(c => String(c.id) === String(id));
            const date       = formatStudyDate(s.date);
            return `
              <div class="card card--stack">
                <div class="score-breakdown__header">
                  <div>
                    <div class="text-sm text-bright">Chapter ${id}${chMeta ? ' · ' + chMeta.title : ''}</div>
                    <div class="text-xs text-muted mt-2">${s.attempts} attempt${s.attempts !== 1 ? 's' : ''}${date ? ` · ${date}` : ''}</div>
                  </div>
                  <div class="score-card__value score-card__value--lg ${scoreClass}">${s.best}%</div>
                </div>
                <div class="progress-track mb-3">
                  <div class="progress-fill ${progressClass}" style="width:${s.best}%"></div>
                </div>
                <div class="card-row__actions">
                  <button class="btn btn--sm progress-study" data-chapter="${id}">Study again</button>
                  <button class="btn btn--sm btn--amber progress-practice" data-chapter="${id}">Practice</button>
                </div>
              </div>
            `;
          }).join('')
      }

    </div>
  `;

  container.querySelectorAll('.progress-continue').forEach(btn => {
    btn.addEventListener('click', () => {
      location.hash = `#/chapter/${btn.dataset.chapter}`;
    });
  });

  container.querySelectorAll('.progress-study').forEach(btn => {
    btn.addEventListener('click', () => {
      location.hash = `#/chapter/${btn.dataset.chapter}`;
    });
  });

  container.querySelectorAll('.progress-practice').forEach(btn => {
    btn.addEventListener('click', () => {
      location.hash = `#/training/${btn.dataset.chapter}`;
    });
  });
}

export { renderProgress };
