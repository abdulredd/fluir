/* ─── Fluir · Stats page ─────────────────────────────────────────────────── */

import Store from '../js/store.js';
import { ALL_CHAPTERS } from '../js/data/chapters-list.js';

function renderProgress(container) {
  const progress     = Store.getProgress();
  const scores       = progress.lessonScores || {};
  const scoreEntries = Object.entries(scores).sort(([a], [b]) => Number(a) - Number(b));

  container.innerHTML = `
    <div class="page active" id="page-progress">

      <div style="margin-bottom:var(--space-6)">
        <h2 style="font-family:var(--font-serif);color:var(--color-purple);font-weight:normal;margin-bottom:var(--space-1)">Progress</h2>
      </div>

      <div class="section-label">Chapter breakdown</div>

      ${scoreEntries.length === 0
        ? `<div class="empty-state" style="padding:var(--space-8) var(--space-4)">
             <div class="empty-state__title">No chapters completed yet</div>
             <div class="empty-state__body">Finish your first chapter to see your scores here.</div>
           </div>`
        : scoreEntries.map(([id, s]) => {
            const pct        = s.best;
            const barColor   = pct >= 80 ? 'var(--color-green)' : pct >= 60 ? 'var(--color-amber)' : 'var(--color-red)';
            const scoreColor = barColor;
            const chMeta     = ALL_CHAPTERS.find(c => String(c.id) === String(id));
            const date       = new Date(s.date + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            return `
              <div class="card" style="margin-bottom:var(--space-3)">
                <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:var(--space-3)">
                  <div>
                    <div class="text-sm text-bright">Chapter ${id}${chMeta ? ' · ' + chMeta.title : ''}</div>
                    <div class="text-xs text-muted" style="margin-top:2px">${s.attempts} attempt${s.attempts !== 1 ? 's' : ''} · ${date}</div>
                  </div>
                  <div style="font-family:var(--font-serif);font-size:var(--text-xl);color:${scoreColor};margin-left:var(--space-4);flex-shrink:0">${pct}%</div>
                </div>
                <div class="progress-track" style="margin-bottom:var(--space-3)">
                  <div class="progress-fill" style="width:${pct}%;background:${barColor}"></div>
                </div>
                <div style="display:flex;gap:var(--space-2)">
                  <button class="btn btn--sm" onclick="location.hash='#/chapter/${id}'">Study again</button>
                  <button class="btn btn--sm btn--amber" onclick="location.hash='#/training/${id}'">Practice</button>
                </div>
              </div>
            `;
          }).join('')
      }

    </div>
  `;
}

export { renderProgress };
