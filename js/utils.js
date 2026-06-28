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

export { shuffle, escapeHtml, scoreTierClass, scoreTierProgressClass };
