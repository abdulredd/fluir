/* ─── Fluir · Settings page ─────────────────────────────────────────────── */

import Store from '../js/store.js';
import { showToast, showConfirmSheet } from '../js/app.js';
import { exportToAnki } from '../js/anki.js';
import { ALL_CHAPTERS } from '../js/data/registry.js';
import { el } from '../js/dom.js';
import { mountPage, sectionLabel } from './ui.js';

function renderSettings(container) {
  const settings    = Store.getSettings();
  const queue       = Store.getAnkiQueue();
  const allUnlocked         = settings.unlockAll         || false;
  const allPracticeUnlocked = settings.unlockAllPractice || false;

  mountPage(container, [
    el('div', { className: 'page-head page-head--spaced' },
      el('h2', { className: 'page-title mb-2', text: 'Settings' }),
    ),
    sectionLabel('Anki export'),
    el('div', { className: 'card card--spaced' },
      el('div', { className: 'mb-3' },
        el('div', { className: 'list-btn__title mb-2', text: 'Export vocabulary to Anki' }),
        el('div', {
          className: 'text-xs text-muted mb-2',
          text: `${queue.pending.length} card${queue.pending.length !== 1 ? 's' : ''} pending · ${queue.exported.length} already exported`,
        }),
        queue.exported.length > 0
          ? el('div', { className: 'text-xs text-cyan', text: 'Previously exported cards will not be duplicated.' })
          : null,
      ),
      el('button', {
        className: 'btn btn--amber btn--full',
        id: 'export-btn',
        disabled: queue.pending.length === 0,
        text: queue.pending.length === 0
          ? 'No cards pending export'
          : `Export ${queue.pending.length} card${queue.pending.length !== 1 ? 's' : ''} → Anki`,
        onClick: handleExport,
      }),
      queue.pending.length > 0
        ? el('div', { className: 'notice-banner__hint', text: 'Downloads a .apkg file — open it in Anki to import.' })
        : null,
    ),
    sectionLabel('Power user'),
    el('div', { className: 'card card--spaced' },
      el('div', { className: 'settings-row' },
        el('div', {},
          el('div', { className: 'list-btn__title', text: 'Unlock all chapters' }),
          el('div', { className: 'text-xs text-muted', text: 'Skip linear progression — access any chapter directly' }),
        ),
        el('label', { className: 'toggle' },
          el('input', { type: 'checkbox', id: 'unlock-all-toggle', ...(allUnlocked ? { checked: true } : {}) }),
          el('span', { className: 'toggle__track' }),
        ),
      ),
      allUnlocked
        ? el('div', {
          className: 'notice-banner--amber-inline',
          text: `All ${ALL_CHAPTERS.length} chapters unlocked. Chapters without lesson data yet show as "Coming soon."`,
        })
        : null,
      el('div', { className: 'settings-divider' }),
      el('div', { className: 'settings-row' },
        el('div', {},
          el('div', { className: 'list-btn__title', text: 'Unlock all practice' }),
          el('div', { className: 'text-xs text-muted', text: 'Access Practice for any chapter without completing the lesson' }),
        ),
        el('label', { className: 'toggle' },
          el('input', { type: 'checkbox', id: 'unlock-practice-toggle', ...(allPracticeUnlocked ? { checked: true } : {}) }),
          el('span', { className: 'toggle__track' }),
        ),
      ),
      allPracticeUnlocked
        ? el('div', {
          className: 'notice-banner--amber-inline',
          text: `All ${ALL_CHAPTERS.length} practice chapters unlocked.`,
        })
        : null,
    ),
    sectionLabel('Data'),
    el('div', { className: 'card card--spaced' },
      el('div', { className: 'list-btn__title mb-2', text: 'Reset all data' }),
      el('div', { className: 'text-xs text-muted mb-3', text: 'Clears all chapters, progress, and settings. This cannot be undone.' }),
      el('button', { className: 'btn btn--danger btn--full', id: 'reset-btn', text: 'Reset Fluir', onClick: handleReset }),
    ),
    el('div', { className: 'settings-footer' },
      el('span', { className: 'settings-footer__brand' }, 'fluir', el('span', { className: 'settings-footer__dot', text: '.' })),
      ' · Companion App to Easy Spanish Step-by-Step',
    ),
  ], { id: 'page-settings' });

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

  async function handleExport() {
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
  }

  function handleReset() {
    showConfirmSheet({
      title:        'Reset all data',
      body:         'This will erase all your progress, scores, and settings. This cannot be undone.',
      confirmLabel: 'Reset Fluir',
      cancelLabel:  'Cancel',
      onConfirm:    () => {
        Store.clearAll();
        showToast('Data cleared');
        setTimeout(() => { location.hash = '#/'; }, 800);
      },
    });
  }
}

export { renderSettings };
