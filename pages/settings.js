/* ─── Fluir · Settings page ─────────────────────────────────────────────── */

import Store from '../js/store.js';
import { showToast, showConfirmSheet } from '../js/app.js';
import { exportToAnki } from '../js/anki.js';
import { ALL_CHAPTERS } from '../js/data/chapters-list.js';

function renderSettings(container) {
  const settings    = Store.getSettings();
  const queue       = Store.getAnkiQueue();
  const progress    = Store.getProgress();
  const allUnlocked         = settings.unlockAll         || false;
  const allPracticeUnlocked = settings.unlockAllPractice || false;

  container.innerHTML = `
    <div class="page active" id="page-settings">

      <div style="margin-bottom:var(--space-6)">
        <h2 style="font-family:var(--font-serif);color:var(--color-purple);font-weight:normal;margin-bottom:var(--space-2)">Settings</h2>
      </div>

      <div class="section-label">Audio</div>
      <div class="card" style="margin-bottom:var(--space-5)">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:var(--space-3)">
          <div>
            <div style="font-size:var(--text-sm);color:var(--text-bright)">Audio pronunciation</div>
            <div style="font-size:var(--text-xs);color:var(--text-muted)">Play audio for vocabulary items</div>
          </div>
          <label class="toggle">
            <input type="checkbox" id="audio-toggle" ${settings.audioEnabled ? 'checked' : ''}>
            <span class="toggle__track"></span>
          </label>
        </div>
        <div style="font-size:var(--text-xs);color:var(--text-muted);padding:var(--space-3);background:var(--bg-panel);border-radius:var(--radius-sm)">
          Audio source: <span style="color:var(--color-cyan)">To be configured</span> — options include Web Speech API, Google TTS, or pre-generated MP3s.
        </div>
      </div>

      <div class="section-label">Anki export</div>
      <div class="card" style="margin-bottom:var(--space-5)">
        <div style="margin-bottom:var(--space-3)">
          <div style="font-size:var(--text-sm);color:var(--text-bright);margin-bottom:4px">Export vocabulary to Anki</div>
          <div style="font-size:var(--text-xs);color:var(--text-muted);margin-bottom:var(--space-2)">${queue.pending.length} card${queue.pending.length !== 1 ? 's' : ''} pending · ${queue.exported.length} already exported</div>
          ${queue.exported.length > 0 ? `<div style="font-size:var(--text-xs);color:var(--color-cyan)">Previously exported cards will not be duplicated.</div>` : ''}
        </div>
        <button class="btn btn--amber btn--full" id="export-btn" ${queue.pending.length === 0 ? 'disabled' : ''}>
          ${queue.pending.length === 0 ? 'No cards pending export' : `Export ${queue.pending.length} card${queue.pending.length !== 1 ? 's' : ''} → Anki`}
        </button>
        ${queue.pending.length > 0 ? `<div style="font-size:var(--text-xs);color:var(--text-muted);margin-top:var(--space-2)">Downloads a .apkg file — open it in Anki to import.</div>` : ''}
      </div>

      <div class="section-label">Power user</div>
      <div class="card" style="margin-bottom:var(--space-5)">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:var(--space-2)">
          <div>
            <div style="font-size:var(--text-sm);color:var(--text-bright)">Unlock all chapters</div>
            <div style="font-size:var(--text-xs);color:var(--text-muted)">Skip linear progression — access any chapter directly</div>
          </div>
          <label class="toggle">
            <input type="checkbox" id="unlock-all-toggle" ${allUnlocked ? 'checked' : ''}>
            <span class="toggle__track"></span>
          </label>
        </div>
        ${allUnlocked ? `
          <div style="font-size:var(--text-xs);color:var(--color-amber);padding:var(--space-2) var(--space-3);background:var(--color-amber-bg);border-radius:var(--radius-sm);margin-top:var(--space-2)">
            All ${ALL_CHAPTERS.length} chapters unlocked. Chapters without lesson data yet show as "Coming soon."
          </div>` : ''}
        <div style="border-top:0.5px solid var(--border-subtle);margin:var(--space-3) 0"></div>
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:var(--space-2)">
          <div>
            <div style="font-size:var(--text-sm);color:var(--text-bright)">Unlock all practice</div>
            <div style="font-size:var(--text-xs);color:var(--text-muted)">Access Practice for any chapter without completing the lesson</div>
          </div>
          <label class="toggle">
            <input type="checkbox" id="unlock-practice-toggle" ${allPracticeUnlocked ? 'checked' : ''}>
            <span class="toggle__track"></span>
          </label>
        </div>
        ${allPracticeUnlocked ? `
          <div style="font-size:var(--text-xs);color:var(--color-amber);padding:var(--space-2) var(--space-3);background:var(--color-amber-bg);border-radius:var(--radius-sm);margin-top:var(--space-2)">
            All ${ALL_CHAPTERS.length} practice chapters unlocked.
          </div>` : ''}
      </div>

      <div class="section-label">Data</div>
      <div class="card" style="margin-bottom:var(--space-5)">
        <div style="font-size:var(--text-sm);color:var(--text-bright);margin-bottom:var(--space-2)">Reset all data</div>
        <div style="font-size:var(--text-xs);color:var(--text-muted);margin-bottom:var(--space-3)">Clears all chapters, progress, and settings. This cannot be undone.</div>
        <button class="btn btn--danger" id="reset-btn">Reset Fluir.</button>
      </div>

      <div style="text-align:center;padding:var(--space-6) 0;font-size:var(--text-xs);color:var(--text-muted)">
        <span style="font-family:var(--font-serif);color:var(--color-purple)">Fluir</span> · companion to Complete Spanish Step-by-Step
      </div>

    </div>
  `;

  document.getElementById('audio-toggle')?.addEventListener('change', e => {
    Store.saveSetting('audioEnabled', e.target.checked);
    showToast(e.target.checked ? 'Audio enabled' : 'Audio disabled');
  });

  document.getElementById('unlock-all-toggle')?.addEventListener('change', e => {
    Store.saveSetting('unlockAll', e.target.checked);
    showToast(e.target.checked ? 'All chapters unlocked' : 'Linear progression restored');
    renderSettings(container);
  });

  document.getElementById('unlock-practice-toggle')?.addEventListener('change', e => {
    Store.saveSetting('unlockAllPractice', e.target.checked);
    showToast(e.target.checked ? 'All practice unlocked' : 'Practice lock restored');
    renderSettings(container);
  });

  document.getElementById('export-btn')?.addEventListener('click', async () => {
    const btn = document.getElementById('export-btn');
    btn.disabled = true;
    btn.textContent = 'Building deck…';
    try {
      const result = await exportToAnki({ chapterIds: 'all' });
      if (result.success) {
        showToast(`Exported ${result.count} cards to Anki`);
        renderSettings(container);
      } else if (result.reason === 'no_cards') {
        showToast('No cards pending export — complete a lesson first');
        btn.disabled = false;
        btn.textContent = 'Export to Anki';
      } else {
        showToast('Export failed — check console for details');
        btn.disabled = false;
        btn.textContent = 'Export to Anki';
      }
    } catch (err) {
      console.error('[Anki] Export error:', err);
      showToast('Export failed — check console for details');
      btn.disabled = false;
      btn.textContent = 'Export to Anki';
    }
  });

  document.getElementById('reset-btn')?.addEventListener('click', () => {
    showConfirmSheet({
      title:        'Reset all data',
      body:         'This will erase all your progress, scores, and settings. This cannot be undone.',
      confirmLabel: 'Reset Fluir',
      cancelLabel:  'Cancel',
      onConfirm:    () => {
        Store.clearAll();
        showToast('Data cleared');
        setTimeout(() => location.hash = '#/', 800);
      },
    });
  });
}

export { renderSettings };
