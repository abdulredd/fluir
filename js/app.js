/* ─── Fluir · App — boot, routing, nav ──────────────────────────────────── */

import Store from './store.js';
import { renderHome }     from '../pages/home.js';
import { renderProgress } from '../pages/progress.js';
import { renderSettings } from '../pages/settings.js';
import { renderLesson }   from '../pages/lesson.js';
import { renderTraining } from '../pages/training.js';

/* ── Router ── */

const routes = {
  '/':            renderHome,
  '/progress':    renderProgress,
  '/settings':    renderSettings,
  '/training':    (container) => renderTraining(container, null),
};

function parseHash() {
  const hash  = location.hash.replace('#', '') || '/';
  const parts = hash.split('/').filter(Boolean);
  return { path: hash, parts };
}

function navigate(hash) {
  location.hash = hash;
}

function handleRoute() {
  const { path, parts } = parseHash();
  const main = document.getElementById('main-content');

  /* parametric routes */
  if (parts[0] === 'chapter' && parts[1]) {
    renderLesson(main, parseInt(parts[1]));
    setActiveNav(null);
    return;
  }

  if (parts[0] === 'training' && parts[1]) {
    renderTraining(main, parseInt(parts[1]));
    setActiveNav(null);
    return;
  }

  /* static routes */
  const cleanPath = '/' + (parts[0] || '');
  const renderer  = routes[cleanPath] || renderHome;

  renderer(main);
  setActiveNav(cleanPath);
}

/* ── Nav ── */

function setActiveNav(path) {
  document.querySelectorAll('.nav-item').forEach(el => {
    el.classList.toggle('active', el.dataset.route === path);
  });
}



/* ── Toast ── */

let toastTimer = null;

function showToast(message, duration = 2500) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), duration);
}

/* ── Confirm sheet ── */

function showConfirmSheet({ title, body, confirmLabel = 'Continue', cancelLabel = 'Cancel', onConfirm, onCancel }) {
  const overlay = document.createElement('div');
  overlay.className = 'confirm-overlay';
  overlay.innerHTML = `
    <div class="confirm-sheet">
      <div class="confirm-sheet__title">${title}</div>
      <div class="confirm-sheet__body">${body}</div>
      <div class="confirm-sheet__actions">
        <button class="btn btn--danger btn--full" id="cs-confirm">${confirmLabel}</button>
        <button class="btn btn--ghost btn--full" id="cs-cancel">${cancelLabel}</button>
      </div>
    </div>
  `;

  function dismiss() { overlay.remove(); }

  overlay.querySelector('#cs-confirm').addEventListener('click', () => { dismiss(); onConfirm?.(); });
  overlay.querySelector('#cs-cancel').addEventListener('click',  () => { dismiss(); onCancel?.();  });
  overlay.addEventListener('click', e => { if (e.target === overlay) { dismiss(); onCancel?.(); } });

  document.body.appendChild(overlay);
}

/* ── Boot ── */

function boot() {
  /* nav click handlers */
  document.querySelectorAll('.nav-item').forEach(el => {
    el.addEventListener('click', () => navigate(el.dataset.route));
  });

  /* logo click */
  const logo = document.getElementById('topbar-logo');
  if (logo) logo.addEventListener('click', () => navigate('/'));

  /* route changes */
  window.addEventListener('hashchange', () => {
    handleRoute();
    });

  /* initial route */
  handleRoute();
}

document.addEventListener('DOMContentLoaded', boot);

export { navigate, showToast, showConfirmSheet };
