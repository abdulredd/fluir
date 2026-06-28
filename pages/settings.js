/* ─── Fluir · Settings page ─────────────────────────────────────────────── */

import Store from '../js/store.js';
import { showToast, showConfirmSheet } from '../js/app.js';
import { exportToAnki } from '../js/anki.js';
import { ALL_CHAPTERS } from '../js/data/registry.js';
import { isAudioFeatureEnabled } from '../js/audio.js';

function renderSettings(container) {
  const settings    = Store.getSettings();
  const queue       = Store.getAnkiQueue();
  const allUnlocked         = settings.unlockAll         || false;
  const allPracticeUnlocked = settings.unlockAllPractice || false;

  container.innerHTML = `
    <div class="page active" id="page-settings">

      <div class="page-head page-head--spaced">
        <h2 class="page-title mb-2">Settings</h2>
      </div>

      ${isAudioFeatureEnabled() ? `
      <div class="section-label">Audio</div>
      <div class="card card--spaced">
        <div class="list-btn__title mb-2">Audio pronunciation</div>
        <div class="text-xs text-muted">Play audio for vocabulary items</div>
      </div>
      ` : ''}

      <div class="section-label">Anki export</div>
      <div class="card card--spaced">
        <div class="mb-3">
          <div class="list-btn__title mb-2">Export vocabulary to Anki</div>
          <div class="text-xs text-muted mb-2">${queue.pending.length} card${queue.pending.length !== 1 ? 's' : ''} pending · ${queue.exported.length} already exported</div>
          ${queue.exported.length > 0 ? `<div class="text-xs text-cyan">Previously exported cards will not be duplicated.</div>` : ''}
        </div>
        <button class="btn btn--amber btn--full" id="export-btn" ${queue.pending.length === 0 ? 'disabled' : ''}>
          ${queue.pending.length === 0 ? 'No cards pending export' : `Export ${queue.pending.length} card${queue.pending.length !== 1 ? 's' : ''} → Anki`}
        </button>
        ${queue.pending.length > 0 ? `<div class="notice-banner__hint">Downloads a .apkg file — open it in Anki to import.</div>` : ''}
      </div>

      <div class="section-label">Power user</div>
      <div class="card card--spaced">
        <div class="settings-row">
          <div>
            <div class="list-btn__title">Unlock all chapters</div>
            <div class="text-xs text-muted">Skip linear progression — access any chapter directly</div>
          </div>
          <label class="toggle">
            <input type="checkbox" id="unlock-all-toggle" ${allUnlocked ? 'checked' : ''}>
            <span class="toggle__track"></span>
          </label>
        </div>
        ${allUnlocked ? `
          <div class="notice-banner--amber-inline">
            All ${ALL_CHAPTERS.length} chapters unlocked. Chapters without lesson data yet show as "Coming soon."
          </div>` : ''}
        <div class="settings-divider"></div>
        <div class="settings-row">
          <div>
            <div class="list-btn__title">Unlock all practice</div>
            <div class="text-xs text-muted">Access Practice for any chapter without completing the lesson</div>
          </div>
          <label class="toggle">
            <input type="checkbox" id="unlock-practice-toggle" ${allPracticeUnlocked ? 'checked' : ''}>
            <span class="toggle__track"></span>
          </label>
        </div>
        ${allPracticeUnlocked ? `
          <div class="notice-banner--amber-inline">
            All ${ALL_CHAPTERS.length} practice chapters unlocked.
          </div>` : ''}
      </div>

      <div class="section-label">Data</div>
      <div class="card card--spaced">
        <div class="list-btn__title mb-2">Reset all data</div>
        <div class="text-xs text-muted mb-3">Clears all chapters, progress, and settings. This cannot be undone.</div>
        <button class="btn btn--danger btn--full" id="reset-btn">Reset Fluir</button>
      </div>

      <div class="settings-footer">
        <span class="settings-footer__brand">fluir<span class="settings-footer__dot">.</span></span> · Companion App to Easy Spanish Step-by-Step
      </div>

    </div>
  `;

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
