/* ─── Fluir · Lesson rule cards ──────────────────────────────────────────── */

/** @import { Chapter, Sublesson, SessionScore, Rule, LessonApi } from '../../js/types.js' */

import { escapeHtml } from '../../js/utils.js';

/** @param {Rule} rule */
function renderRuleCard(rule) {
  return `
    <div class="card rule-card">
      <h3 class="rule-card__heading">${escapeHtml(rule.heading)}</h3>
      <p class="rule-card__body">${escapeHtml(rule.body)}</p>

      <div class="rule-card__examples">
        ${rule.examples.map(ex => `
          <div class="rule-card__example">
            <span class="rule-card__es">${escapeHtml(ex.es)}</span>
            <span class="rule-card__en">${escapeHtml(ex.en)}${ex.note ? ` · <em class="rule-card__note">${escapeHtml(ex.note)}</em>` : ''}</span>
          </div>
        `).join('')}
      </div>

      ${rule.tip ? `
        <div class="rule-card__tip">${escapeHtml(rule.tip)}</div>
      ` : ''}
    </div>
  `;
}

function ruleBadgeHTML(label) {
  return `<div class="rule-badge">${escapeHtml(label)}</div>`;
}

function mountRuleNavigator(container, {
  ruleIndex,
  ruleCount,
  badgeHTML,
  isFirst,
  isLast,
  lastLabel,
  onBack,
  onPrev,
  onNext,
}) {
  const ruleProg = Math.round(((ruleIndex + 1) / ruleCount) * 100);

  container.innerHTML = `
    <div class="page active rule-view">
      <div class="rule-view__header">
        <button class="btn btn--ghost btn--sm" id="back-btn"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg> Back</button>
        <span class="text-xs text-muted">${ruleIndex + 1} of ${ruleCount} rules</span>
      </div>

      <div class="progress-track rule-view__progress">
        <div class="progress-fill" style="width:${Math.max(ruleProg, 3)}%"></div>
      </div>

      ${badgeHTML}

      <div id="rule-card-slot"></div>

      <div class="rule-view__nav">
        ${isFirst
          ? `<div class="btn btn--full btn--lg btn--invisible"></div>`
          : `<button class="btn btn--full btn--lg" id="rule-prev">← Prev rule</button>`
        }
        <button class="btn ${isLast ? 'btn--primary' : ''} btn--full btn--lg" id="rule-next">
          ${escapeHtml(lastLabel)}
        </button>
      </div>
    </div>
  `;

  container.querySelector('#back-btn').addEventListener('click', onBack);
  container.querySelector('#rule-prev')?.addEventListener('click', onPrev);
  container.querySelector('#rule-next').addEventListener('click', onNext);
}

/**
 * Shared prev/next rule viewer used by chapter review and per-sublesson teach-first flow.
 */
function runRuleSequence(container, {
  ruleCount,
  getRule,
  getBadgeLabel,
  lastLabel = 'Begin Lesson →',
  onBack,
  onFinish,
}) {
  let ruleIndex = 0;

  function showRule() {
    if (ruleIndex >= ruleCount) {
      onFinish();
      return;
    }

    const isLast  = ruleIndex === ruleCount - 1;
    const isFirst = ruleIndex === 0;

    mountRuleNavigator(container, {
      ruleIndex,
      ruleCount,
      badgeHTML: ruleBadgeHTML(getBadgeLabel(ruleIndex)),
      isFirst,
      isLast,
      lastLabel,
      onBack,
      onPrev: () => { ruleIndex--; showRule(); },
      onNext: () => {
        ruleIndex++;
        showRule();
      },
    });

    container.querySelector('#rule-card-slot').innerHTML = renderRuleCard(getRule(ruleIndex));
  }

  showRule();
}

/** @param {Element} container @param {Chapter} chapter @param {LessonApi} api */
function reviewAllRules(container, chapter, api) {
  const entries = [];
  chapter.sublessons.forEach((sl, sIdx) => {
    (sl.rules || []).forEach(rule => {
      entries.push({ rule, sublesson: sl, sublessonNumber: sIdx + 1 });
    });
  });

  if (entries.length === 0) {
    api.renderChapterIntro(container, chapter);
    return;
  }

  runRuleSequence(container, {
    ruleCount: entries.length,
    getRule:   (i) => entries[i].rule,
    getBadgeLabel: (i) => `Lesson ${entries[i].sublessonNumber} · ${entries[i].sublesson.title}`,
    lastLabel: 'Begin Lesson →',
    onBack:    () => api.renderChapterIntro(container, chapter),
    onFinish:  () => api.startSubLesson(container, chapter, 0, { correct: 0, total: 0 }, true, true),
  });
}

/** @param {Element} container @param {Chapter} chapter @param {Sublesson} sublesson @param {number} subIndex @param {SessionScore} sessionScore @param {LessonApi} api @param {object} [options] */
function renderRuleCards(container, chapter, sublesson, subIndex, sessionScore, api, options = {}) {
  const onExit     = options.onExit     || (() => api.renderChapterIntro(container, chapter));
  const onComplete = options.onComplete || (() => api.buildQuestionQueue(container, chapter, sublesson, subIndex, sessionScore));
  const lastLabel  = options.lastLabel  || 'Begin Lesson →';
  const rules      = sublesson.rules || [];

  runRuleSequence(container, {
    ruleCount: rules.length,
    getRule:   (i) => rules[i],
    getBadgeLabel: () => sublesson.title,
    lastLabel,
    onBack:   onExit,
    onFinish: onComplete,
  });
}

export { renderRuleCard, reviewAllRules, renderRuleCards, runRuleSequence };
