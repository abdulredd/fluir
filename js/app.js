/* ─── Fluir · App — boot, routing, nav ──────────────────────────────────── */

import Store from './store.js';
import { el } from './dom.js';
import { buildConfirmSheet, buildChoiceSheet } from '../pages/ui.js';
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
  const { parts } = parseHash();
  const main = document.getElementById('main-content');

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

  const cleanPath = '/' + (parts[0] || '');
  const renderer  = routes[cleanPath] || renderHome;

  renderer(main);
  setActiveNav(cleanPath);
}

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

function mountModalSheet(sheet, backdrop, onDismiss) {
  const previouslyFocused = document.activeElement;
  sheet.setAttribute('role', 'dialog');
  sheet.setAttribute('aria-modal', 'true');

  function dismiss() {
    document.removeEventListener('keydown', onKeydown);
    backdrop.remove();
    sheet.remove();
    if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus();
  }

  function onKeydown(e) {
    if (e.key === 'Escape') {
      dismiss();
      onDismiss?.();
    }
  }

  document.addEventListener('keydown', onKeydown);
  document.body.appendChild(backdrop);
  document.body.appendChild(sheet);

  const focusable = sheet.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
  if (focusable instanceof HTMLElement) focusable.focus();

  return dismiss;
}

function showConfirmSheet({ title, body, confirmLabel = 'Continue', cancelLabel = 'Cancel', onConfirm, onCancel }) {
  const backdrop = el('div', { className: 'confirm-overlay' });
  const sheet = buildConfirmSheet({ title, body, confirmLabel, cancelLabel });
  const dismiss = mountModalSheet(sheet, backdrop, onCancel);

  sheet.querySelector('#cs-confirm').addEventListener('click', () => { dismiss(); onConfirm?.(); });
  sheet.querySelector('#cs-cancel').addEventListener('click',  () => { dismiss(); onCancel?.();  });
  backdrop.addEventListener('click', () => { dismiss(); onCancel?.(); });
}

function showChoiceSheet({ title, body = '', actions = [] }) {
  const backdrop = el('div', { className: 'confirm-overlay' });
  const sheet = buildChoiceSheet({ title, body, actions });
  const dismiss = mountModalSheet(sheet, backdrop);

  sheet.querySelectorAll('[data-action]').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.dataset.action);
      dismiss();
      actions[idx].onClick?.();
    });
  });
  backdrop.addEventListener('click', dismiss);
}

function boot() {
  Store.init();

  document.querySelectorAll('.nav-item').forEach(el => {
    el.addEventListener('click', () => navigate(el.dataset.route));
  });

  const logo = document.getElementById('topbar-logo');
  if (logo) logo.addEventListener('click', () => navigate('/'));

  window.addEventListener('hashchange', () => {
    handleRoute();
  });

  handleRoute();
}

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', boot);
}

export { navigate, showToast, showConfirmSheet, showChoiceSheet };
