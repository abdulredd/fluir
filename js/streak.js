/* ─── Fluir · Streak UI helpers ──────────────────────────────────────────── */

import { el } from './dom.js';

function getWeekDays(progress) {
  const todayDate = new Date();
  const todayStr  = todayDate.toISOString().split('T')[0];

  const dow    = todayDate.getDay();
  const offset = dow === 0 ? -6 : 1 - dow;
  const monday = new Date(todayDate);
  monday.setDate(todayDate.getDate() + offset);

  const studied = new Set(progress.studyDates || []);

  return ['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((label, i) => {
    const date    = new Date(monday);
    date.setDate(monday.getDate() + i);
    const dateStr = date.toISOString().split('T')[0];
    return { label, lit: studied.has(dateStr), future: dateStr > todayStr };
  });
}

/** @param {{ label: string, lit: boolean, future: boolean }[]} weekDays */
function weekStreakEl(weekDays) {
  return el('div', { className: 'week-streak' },
    ...weekDays.map(d =>
      el('div', { className: 'week-streak__day' },
        el('div', { className: 'week-streak__label', text: d.label }),
        d.lit
          ? el('div', { className: 'week-streak__flame', text: '🔥' })
          : el('div', { className: `week-streak__dot${d.future ? ' week-streak__dot--future' : ''}` }),
      ),
    ),
  );
}

export { getWeekDays, weekStreakEl };
