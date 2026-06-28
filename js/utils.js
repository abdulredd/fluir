/* ─── Fluir · Shared utilities ─────────────────────────────────────────────── */

/** Fisher-Yates shuffle — returns a new array; does not mutate the input. */
function shuffle(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/** Lowercase and strip accents/ñ for lenient Spanish answer matching. */
function foldAccents(str) {
  return String(str ?? '')
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .toLowerCase();
}

/** True when two Spanish strings match ignoring case, accents, and ñ/n. */
function spanishTextEquals(a, b) {
  return foldAccents(a) === foldAccents(b);
}

/**
 * HTML note when the learner's answer is right but missing accents/ñ.
 * @param {string} submitted — normalized learner input
 * @param {string} canonical — canonical answer (preserves accents)
 */
function accentSpellingNote(submitted, canonical) {
  const sub = String(submitted ?? '').trim().toLowerCase();
  const can = String(canonical ?? '').trim().toLowerCase();
  if (sub === can || !spanishTextEquals(sub, can)) return '';
  return `<div class="text-xs text-muted" style="margin-top:6px">Standard spelling: <em>${canonical.trim()}</em></div>`;
}

function escapeHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** CSS class for score percentage tiers (80+ / 60+ / below). */
function scoreTierClass(pct) {
  if (pct >= 80) return 'text-score--good';
  if (pct >= 60) return 'text-score--ok';
  return 'text-score--low';
}

/** Progress bar fill color tier matching scoreTierClass. */
function scoreTierProgressClass(pct) {
  if (pct >= 80) return 'progress-fill--green';
  if (pct >= 60) return 'progress-fill--amber';
  return 'progress-fill--red';
}

export { shuffle, foldAccents, spanishTextEquals, accentSpellingNote, escapeHtml, scoreTierClass, scoreTierProgressClass };
