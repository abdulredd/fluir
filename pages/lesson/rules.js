/* ─── Fluir · Lesson rule cards ──────────────────────────────────────────── */

/** @import { Chapter, Sublesson, SessionScore, Rule, LessonApi } from '../../js/types.js' */

import { el, clearAndMount } from '../../js/dom.js';
import { backButton } from '../ui.js';

/** @param {Rule} rule @returns {Element} */
function renderRuleCard(rule) {
  return el('div', { className: 'card rule-card' },
    el('h3', { className: 'rule-card__heading', text: rule.heading }),
    el('p', { className: 'rule-card__body', text: rule.body }),
    el('div', { className: 'rule-card__examples' },
      ...rule.examples.map(ex =>
        el('div', { className: 'rule-card__example' },
          el('span', { className: 'rule-card__es', text: ex.es }),
          el('span', { className: 'rule-card__en' },
            ex.en,
            ex.note ? el('span', {}, ' · ', el('em', { className: 'rule-card__note', text: ex.note })) : null,
          ),
        ),
      ),
    ),
    rule.tip ? el('div', { className: 'rule-card__tip', text: rule.tip }) : null,
  );
}

/** @param {string} label */
function ruleBadge(label) {
  return el('div', { className: 'rule-badge', text: label });
}

function mountRuleNavigator(container, {
  ruleIndex,
  ruleCount,
  badgeEl,
  isFirst,
  isLast,
  nextLabel,
  lastLabel,
  onBack,
  onPrev,
  onNext,
  ruleCard,
}) {
  const ruleProg = Math.round(((ruleIndex + 1) / ruleCount) * 100);

  const nav = el('div', { className: 'rule-view__nav' },
    isFirst
      ? el('div', { className: 'btn btn--full btn--lg btn--invisible' })
      : el('button', { className: 'btn btn--full btn--lg', id: 'rule-prev', text: '← Prev rule', onClick: onPrev }),
    el('button', {
      className: `btn ${isLast ? 'btn--primary' : ''} btn--full btn--lg`.trim(),
      id: 'rule-next',
      text: isLast ? lastLabel : nextLabel,
      onClick: onNext,
    }),
  );

  clearAndMount(container,
    el('div', { className: 'page active rule-view' },
      el('div', { className: 'rule-view__header' },
        backButton('back-btn', onBack),
        el('span', { className: 'text-xs text-muted', text: `${ruleIndex + 1} of ${ruleCount} rules` }),
      ),
      el('div', { className: 'progress-track rule-view__progress' },
        el('div', { className: 'progress-fill', style: `width:${Math.max(ruleProg, 3)}%` }),
      ),
      badgeEl,
      el('div', { id: 'rule-card-slot' }, ruleCard),
      nav,
    ),
  );
}

function runRuleSequence(container, {
  ruleCount,
  getRule,
  getBadgeLabel,
  nextLabel = 'Next rule →',
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

    mountRuleNavigator(container, {
      ruleIndex,
      ruleCount,
      badgeEl:      ruleBadge(getBadgeLabel(ruleIndex)),
      isFirst:      ruleIndex === 0,
      isLast:       ruleIndex === ruleCount - 1,
      nextLabel,
      lastLabel,
      ruleCard:     renderRuleCard(getRule(ruleIndex)),
      onBack,
      onPrev:       () => { ruleIndex--; showRule(); },
      onNext:       () => { ruleIndex++; showRule(); },
    });
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
