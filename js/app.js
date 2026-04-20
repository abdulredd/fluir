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
  const backdrop = document.createElement('div');
  backdrop.className = 'confirm-overlay';
  backdrop.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(0,0,0,0.6);z-index:400;';

  const sheet = document.createElement('div');
  sheet.className = 'confirm-sheet';
  sheet.style.zIndex = '401';
  sheet.innerHTML = `
    <div class="confirm-sheet__title">${title}</div>
    <div class="confirm-sheet__body">${body}</div>
    <div class="confirm-sheet__actions">
      <button class="btn btn--danger btn--full" id="cs-confirm">${confirmLabel}</button>
      <button class="btn btn--ghost btn--full" id="cs-cancel">${cancelLabel}</button>
    </div>
  `;

  function dismiss() { backdrop.remove(); sheet.remove(); }

  sheet.querySelector('#cs-confirm').addEventListener('click', () => { dismiss(); onConfirm?.(); });
  sheet.querySelector('#cs-cancel').addEventListener('click',  () => { dismiss(); onCancel?.();  });
  backdrop.addEventListener('click', () => { dismiss(); onCancel?.(); });

  document.body.appendChild(backdrop);
  document.body.appendChild(sheet);
}

/* ── Choice sheet (N actions) ── */

function showChoiceSheet({ title, body = '', actions = [] }) {
  const backdrop = document.createElement('div');
  backdrop.className = 'confirm-overlay';
  backdrop.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(0,0,0,0.6);z-index:400;';

  const sheet = document.createElement('div');
  sheet.className = 'confirm-sheet';
  sheet.style.zIndex = '401';
  sheet.innerHTML = `
    <div class="confirm-sheet__title">${title}</div>
    ${body ? `<div class="confirm-sheet__body">${body}</div>` : ''}
    <div class="confirm-sheet__actions">
      ${actions.map((a, i) => `
        <button class="btn ${a.className || ''} btn--full" data-action="${i}">${a.label}</button>
      `).join('')}
    </div>
  `;

  function dismiss() { backdrop.remove(); sheet.remove(); }

  sheet.querySelectorAll('[data-action]').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.dataset.action);
      dismiss();
      actions[idx].onClick?.();
    });
  });
  backdrop.addEventListener('click', dismiss);

  document.body.appendChild(backdrop);
  document.body.appendChild(sheet);
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

export { navigate, showToast, showConfirmSheet, showChoiceSheet };
