/* ─── Fluir · Progress dashboard ────────────────────────────────────────────*/

import Store from '../js/store.js';
import CHAPTER_1 from '../js/data/chapter1.js';
import CHAPTER_2 from '../js/data/chapter2.js';
import CHAPTER_3 from '../js/data/chapter3.js';
import CHAPTER_4 from '../js/data/chapter4.js';
import CHAPTER_5, { ALL_VERBS_CH5, conjugate as conjugateCh5 } from '../js/data/chapter5.js';
import CHAPTER_6, { ALL_VERBS_CH6, conjugateIrr } from '../js/data/chapter6.js';
import CHAPTER_7 from '../js/data/chapter7.js';
import CHAPTER_8 from '../js/data/chapter8.js';
import CHAPTER_9 from '../js/data/chapter9.js';
import CHAPTER_10 from '../js/data/chapter10.js';
import CHAPTER_11 from '../js/data/chapter11.js';
import CHAPTER_12 from '../js/data/chapter12.js';
import CHAPTER_13, { subjunctiveFromYo } from '../js/data/chapter13.js';
import CHAPTER_14, { conjugatePreterit } from '../js/data/chapter14.js';
import CHAPTER_15, { conjugateImperfect } from '../js/data/chapter15.js';
import { ALL_CHAPTERS } from '../js/data/chapters-list.js';

const CHAPTERS    = { 1: CHAPTER_1, 2: CHAPTER_2, 3: CHAPTER_3, 4: CHAPTER_4, 5: CHAPTER_5, 6: CHAPTER_6, 7: CHAPTER_7, 8: CHAPTER_8, 9: CHAPTER_9, 10: CHAPTER_10, 11: CHAPTER_11, 12: CHAPTER_12, 13: CHAPTER_13, 14: CHAPTER_14, 15: CHAPTER_15 };
const TOTAL_CHAPS = ALL_CHAPTERS.length;

function renderProgress(container) {
  const progress = Store.getProgress();
  const queue    = Store.getAnkiQueue();
  const scores   = progress.lessonScores || {};
  const entries  = Object.entries(scores);

  const totalVocab = Object.values(CHAPTERS).reduce((n, ch) =>
    n + ch.sublessons.reduce((m, sl) =>
      m + (sl.vocabulary?.length || 0) + (sl.adjectives?.length || 0), 0), 0);

  const streakMsg = progress.currentStreak >= 7
    ? '🔥 On a roll!'
    : progress.currentStreak >= 3
    ? 'Building momentum'
    : progress.currentStreak >= 1
    ? 'Keep it up'
    : 'Start your streak today';

  container.innerHTML = `
    <div class="page active" id="page-progress">

      <div style="margin-bottom:var(--space-6)">
        <h2 style="font-family:var(--font-serif);color:var(--color-purple);font-weight:normal;margin-bottom:var(--space-1)">Your progress</h2>
        <p class="text-muted text-sm">${streakMsg}</p>
      </div>

      <!-- Streak & study stats -->
      <div class="metrics-row" style="margin-bottom:var(--space-6)">
        <div class="metric">
          <div class="metric__value" style="color:var(--color-amber)">${progress.currentStreak}</div>
          <div class="metric__label">Day streak</div>
        </div>
        <div class="metric">
          <div class="metric__value" style="color:var(--color-cyan)">${progress.longestStreak}</div>
          <div class="metric__label">Best streak</div>
        </div>
        <div class="metric">
          <div class="metric__value" style="color:var(--color-green)">${progress.chaptersComplete.length}</div>
          <div class="metric__label">Complete</div>
        </div>
        <div class="metric">
          <div class="metric__value" style="color:var(--color-purple)">${queue.exported.length}</div>
          <div class="metric__label">Anki cards</div>
        </div>
      </div>

      <!-- Overall progress bar -->
      <div style="margin-bottom:var(--space-6)">
        <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:var(--space-2)">
          <span class="section-label" style="margin-bottom:0">Book progress</span>
          <span class="text-xs text-muted">${progress.chaptersComplete.length} of ${TOTAL_CHAPS} chapters</span>
        </div>
        <div class="progress-track">
          <div class="progress-fill progress-fill--purple" style="width:${Math.round((progress.chaptersComplete.length / TOTAL_CHAPS) * 100)}%"></div>
        </div>
        <div style="display:flex;justify-content:space-between;margin-top:var(--space-1)">
          <span class="text-xs text-muted">Chapter 1</span>
          <span class="text-xs text-muted">Chapter 15</span>
        </div>
      </div>

      <!-- Vocab progress -->
      <div class="card" style="margin-bottom:var(--space-5)">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:var(--space-3)">
          <div class="text-sm text-bright">Vocabulary learned</div>
          <div style="font-family:var(--font-serif);font-size:var(--text-lg);color:var(--color-green)">${totalVocab}</div>
        </div>
        <div class="progress-track">
          <div class="progress-fill progress-fill--green" style="width:100%"></div>
        </div>
        <div style="display:flex;justify-content:space-between;margin-top:var(--space-2)">
          <span class="text-xs text-muted">${queue.pending.length} pending Anki export</span>
          <span class="text-xs" style="color:var(--color-green)">${queue.exported.length} exported</span>
        </div>
      </div>

      <!-- Chapter scores -->
      <div class="section-label">Chapter scores</div>

      ${entries.length === 0
        ? `<div class="empty-state" style="padding:var(--space-8) var(--space-4)">
             <div class="empty-state__title">No lessons yet</div>
             <div class="empty-state__body">Complete your first chapter lesson to see scores here.</div>
           </div>`
        : entries.map(([id, s]) => {
            const pct       = s.best;
            const barColor  = pct >= 80 ? 'var(--color-green)' : pct >= 60 ? 'var(--color-amber)' : 'var(--color-red)';
            const scoreColor = pct >= 80 ? 'var(--color-green)' : pct >= 60 ? 'var(--color-amber)' : 'var(--color-red)';
            const ch = CHAPTERS[id];
            return `
              <div class="card" style="margin-bottom:var(--space-3)">
                <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:var(--space-3)">
                  <div>
                    <div class="text-sm text-bright">Chapter ${id}${ch ? ' · ' + ch.title : ''}</div>
                    <div class="text-xs text-muted">${s.attempts} attempt${s.attempts !== 1 ? 's' : ''} · last studied ${s.date}</div>
                  </div>
                  <div style="font-family:var(--font-serif);font-size:var(--text-xl);color:${scoreColor};margin-left:var(--space-4)">${pct}%</div>
                </div>
                <div class="progress-track">
                  <div class="progress-fill" style="width:${pct}%;background:${barColor}"></div>
                </div>
                <div style="display:flex;gap:var(--space-3);margin-top:var(--space-3)">
                  <button class="btn btn--sm" onclick="location.hash='#/chapter/${id}'">Study again</button>
                  <button class="btn btn--sm btn--amber" onclick="location.hash='#/training/${id}'">Training Grounds</button>
                </div>
              </div>
            `;
          }).join('')
      }

      ${progress.lastStudyDate ? `
        <div style="text-align:center;margin-top:var(--space-6);font-size:var(--text-xs);color:var(--text-muted)">
          Last studied: ${progress.lastStudyDate}
        </div>
      ` : ''}

    </div>
  `;
}

export { renderProgress };
