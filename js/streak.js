/* ─── Fluir · Streak UI helpers ──────────────────────────────────────────── */

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

function weekStreakHTML(weekDays) {
  return `
    <div class="week-streak">
      ${weekDays.map(d => `
        <div class="week-streak__day">
          <div class="week-streak__label">${d.label}</div>
          ${d.lit
            ? `<div class="week-streak__flame">🔥</div>`
            : `<div class="week-streak__dot ${d.future ? 'week-streak__dot--future' : ''}"></div>`
          }
        </div>
      `).join('')}
    </div>
  `;
}

export { getWeekDays, weekStreakHTML };
