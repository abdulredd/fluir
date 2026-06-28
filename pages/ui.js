/* ─── Fluir · Page UI primitives ─────────────────────────────────────────── */

import { el, clearAndMount, appendChildren, setHtml, suppressGhostTap } from '../js/dom.js';
import {
  VOCAB_DIRECTION,
  normalizeVocabDirection,
  vocabFaces,
} from '../js/vocab-display.js';
import {
  iconChevronLeft,
  iconChevronRight,
  iconCheck,
  iconLock,
  iconRules,
  iconGrid,
} from '../js/icons.js';

/**
 * @param {Element} container
 * @param {(Node|null|undefined|false)[]} children
 * @param {{ id?: string, className?: string }} [opts]
 */
function mountPage(container, children, opts = {}) {
  clearAndMount(container,
    el('div', { className: opts.className || 'page active', ...(opts.id ? { id: opts.id } : {}) }, ...children),
  );
}

/**
 * @param {{ title: string, body?: string, padded?: boolean, action?: Element }} opts
 */
function emptyState({ title, body, padded = false, action }) {
  return el('div', { className: `empty-state${padded ? ' empty-state--padded' : ''}` },
    el('div', { className: 'empty-state__title', text: title }),
    body ? el('div', { className: 'empty-state__body', text: body }) : null,
    action,
  );
}

/** @param {string} [title] */
function loadingPage(title = 'Loading…') {
  return el('div', { className: 'page active' }, emptyState({ title, padded: true }));
}

/** @param {string} [title] @param {{ id?: string, onBack?: () => void, body?: string }} [opts] */
function pageWithEmptyState(title, opts = {}) {
  const page = el('div', { className: 'page active' },
    opts.onBack
      ? el('div', { className: 'page-header' }, backButton(opts.id || 'back-btn', opts.onBack))
      : null,
    emptyState({ title, body: opts.body }),
  );
  return page;
}

/**
 * @param {string} id
 * @param {() => void} onClick
 * @param {{ label?: string, withIcon?: boolean }} [opts]
 */
function backButton(id, onClick, opts = {}) {
  const { label = 'Back', withIcon = true } = opts;
  return el('button', { className: 'btn btn--ghost btn--sm', id, onClick },
    withIcon ? iconChevronLeft() : null,
    label,
  );
}

/**
 * @param {{ value: string|number, label: string, valueClass?: string }[]} items
 */
function metricsRow(items) {
  return el('div', { className: 'metrics-row' },
    ...items.map(({ value, label, valueClass = '' }) =>
      el('div', { className: 'metric' },
        el('div', { className: `metric__value ${valueClass}`.trim(), text: String(value) }),
        el('div', { className: 'metric__label', text: label }),
      ),
    ),
  );
}

/**
 * @param {number} pct
 * @param {{ fillClass?: string, trackClass?: string, ariaLabel?: string }} [opts]
 */
function progressBar(pct, opts = {}) {
  const { fillClass = '', trackClass = '', ariaLabel } = opts;
  return el('div', {
    className: `progress-track ${trackClass}`.trim(),
    role: 'progressbar',
    ariaValuemin: '0',
    ariaValuemax: '100',
    ariaValuenow: String(pct),
    ...(ariaLabel ? { 'aria-label': ariaLabel } : {}),
  }, el('div', { className: `progress-fill ${fillClass}`.trim(), style: `width:${pct}%` }));
}

/** @param {string} text @param {{ tight?: boolean }} [opts] */
function sectionLabel(text, opts = {}) {
  return el('div', {
    className: `section-label${opts.tight ? ' section-label--tight' : ''}`,
    text,
  });
}

/**
 * @param {string} title
 * @param {() => void} onClick
 * @param {{ id?: string, meta?: string, metaClass?: string, className?: string, trailing?: Element }} [opts]
 */
function listButton(title, onClick, opts = {}) {
  return el('button', {
    className: `btn btn--full list-btn ${opts.className || ''}`.trim(),
    ...(opts.id ? { id: opts.id } : {}),
    onClick,
  },
    el('div', { className: 'list-btn__body' },
      el('div', { className: 'list-btn__title', text: title }),
      opts.meta ? el('div', { className: `list-btn__meta ${opts.metaClass || ''}`.trim(), text: opts.meta }) : null,
    ),
    opts.trailing ?? iconChevronRight(),
  );
}

/**
 * @param {object} ch
 * @param {object} progress
 * @param {object} settings
 * @param {(id: number) => boolean} isUnlocked
 */
function chapterCard(ch, progress, settings, isUnlocked) {
  const started  = progress.chaptersStarted.includes(ch.id);
  const complete = progress.chaptersComplete.includes(ch.id);
  const score    = progress.lessonScores[ch.id];
  const unlocked = isUnlocked(ch.id, progress, settings);
  const hasData  = ch.hasContent;

  let statusText = unlocked ? (hasData ? 'Not started' : 'Coming soon') : 'Locked';
  if (started && !complete) statusText = 'In progress';
  if (complete) statusText = score ? `Best: ${score.best}%` : 'Complete';

  const locked     = !unlocked;
  const comingSoon = unlocked && !hasData && !started && !complete;
  const disabled   = locked || comingSoon;

  const card = el('button', {
    type: 'button',
    className: `chapter-card ${complete ? 'chapter-card--complete' : ''} ${disabled ? 'chapter-card--locked' : 'chapter-card--clickable'}`,
    dataset: { id: String(ch.id) },
    ...(disabled ? { disabled: true, 'aria-disabled': 'true' } : {}),
  },
    el('div', { className: 'chapter-card__number' }, complete ? iconCheck() : String(ch.id)),
    el('div', { className: 'chapter-card__body' },
      el('div', { className: 'chapter-card__title', text: ch.title }),
      el('div', { className: 'chapter-card__meta', text: statusText }),
    ),
    el('div', { className: 'chapter-card__arrow' }, disabled ? iconLock() : iconChevronRight()),
  );

  if (!disabled) {
    const activate = () => {
      suppressGhostTap();
      location.hash = `#/chapter/${ch.id}`;
    };
    card.addEventListener('click', activate);
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activate(); }
    });
  }

  return card;
}

/** @param {object} ch @param {boolean} isComplete */
function trainingChapterCard(ch, isComplete) {
  const card = el('button', {
    type: 'button',
    className: `chapter-card ${!isComplete ? 'chapter-card--locked' : 'chapter-card--clickable'}`,
    dataset: { id: String(ch.id), unlocked: isComplete ? '1' : '0' },
    ...(isComplete ? {} : { disabled: true, 'aria-disabled': 'true' }),
  },
    el('div', { className: `chapter-card__number ${isComplete ? 'chapter-card__number--practice' : ''}`, text: String(ch.id) }),
    el('div', { className: 'chapter-card__body' },
      el('div', { className: 'chapter-card__title', text: ch.title }),
      el('div', { className: 'chapter-card__meta', text: isComplete ? 'Practice unlocked' : 'Complete the lesson to unlock' }),
    ),
    el('div', { className: 'chapter-card__arrow' }, isComplete ? iconChevronRight() : iconLock()),
  );

  if (isComplete) {
    card.addEventListener('click', () => {
      suppressGhostTap();
      location.hash = `#/training/${ch.id}`;
    });
  }

  return card;
}

/**
 * @param {Element} container
 * @param {object} opts
 */
function mountQuizPage(container, opts) {
  const page = el('div', { className: 'page active' },
    opts.header,
    opts.progress,
    opts.meta,
    el('div', { id: opts.gameContentId || 'game-content' }),
  );
  clearAndMount(container, page);
  return page.querySelector(`#${opts.gameContentId || 'game-content'}`);
}

/**
 * @param {object} opts
 */
function quizHeader(opts) {
  return el('div', { className: 'quiz-header' },
    opts.backBtn,
    el('div', { className: 'page-header__actions' }, ...opts.actions),
  );
}

/** @param {object} opts */
function lessonQuizHeader(opts) {
  const actions = [el('span', { className: 'text-xs text-muted', text: opts.sublessonTitle })];
  if (opts.onViewRules) {
    actions.push(el('button', {
      className: 'btn btn--ghost btn--sm',
      id: 'view-rules-btn',
      title: 'View lesson rules',
      onClick: opts.onViewRules,
    }, iconRules(), ' Rules'));
  }
  return quizHeader({ backBtn: backButton('back-btn', opts.onBack), actions });
}

function toggleVocabCard(card) {
  const flipped = card.dataset.flipped === 'true';
  card.dataset.flipped = flipped ? 'false' : 'true';
  card.setAttribute('aria-expanded', flipped ? 'false' : 'true');
}

/** @param {'front'|'back'} side @param {{ text: string, sub: string, lang: string }} face */
function vocabCardFace(side, face) {
  const textClass = side === 'front' ? 'vocab-card__prompt' : 'vocab-card__answer';
  return el('div', { className: `vocab-card__${side}` },
    el('span', { className: textClass, text: face.text }),
    face.sub ? el('span', { className: 'vocab-card__sub', text: face.sub }) : null,
  );
}

/**
 * @param {object} item
 * @param {{ direction?: string }} [opts]
 */
function vocabCard(item, opts = {}) {
  const { front, back } = vocabFaces(item, opts.direction, opts.arrayKey);

  return el('div', {
    className: 'vocab-card',
    dataset: { flipped: 'false' },
    tabindex: '0',
    role: 'button',
    'aria-expanded': 'false',
    'aria-label': `${front.text}. Tap to reveal translation.`,
    onClick: ({ currentTarget }) => toggleVocabCard(currentTarget),
    onKeydown: (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleVocabCard(e.currentTarget);
      }
    },
  },
    vocabCardFace('front', front),
    vocabCardFace('back', back),
  );
}

/**
 * Two-option segmented control (radiogroup).
 * @param {{ id?: string, value: string, options: { value: string, label: string }[], ariaLabel: string, onChange: (value: string) => void }} opts
 */
function segmentedControl(opts) {
  const { options, value, onChange, ariaLabel, id } = opts;

  function handleKeydown(e, idx) {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    e.preventDefault();
    const next = e.key === 'ArrowLeft'
      ? Math.max(0, idx - 1)
      : Math.min(options.length - 1, idx + 1);
    if (next === idx) return;
    onChange(options[next].value);
  }

  return el('div', {
    ...(id ? { id } : {}),
    className: 'segmented-control',
    role: 'radiogroup',
    'aria-label': ariaLabel,
  },
    ...options.map((opt, idx) => {
      const selected = opt.value === value;
      return el('button', {
        type: 'button',
        className: `segmented-control__option${selected ? ' segmented-control__option--active' : ''}`,
        role: 'radio',
        'aria-checked': selected ? 'true' : 'false',
        tabIndex: selected ? 0 : -1,
        text: opt.label,
        onClick: () => {
          if (opt.value !== value) onChange(opt.value);
        },
        onKeydown: (e) => handleKeydown(e, idx),
      });
    }),
  );
}

/** @param {{ value: string, onChange: (value: string) => void }} opts */
function vocabDirectionControl(opts) {
  return segmentedControl({
    id: 'vocab-direction',
    value: normalizeVocabDirection(opts.value),
    ariaLabel: 'Which language to show first on vocabulary cards',
    options: [
      { value: VOCAB_DIRECTION.ES_EN, label: 'Spanish' },
      { value: VOCAB_DIRECTION.EN_ES, label: 'English' },
    ],
    onChange: opts.onChange,
  });
}

/** @param {{ title: string, body: string, confirmLabel?: string, cancelLabel?: string, onConfirm?: Function, onCancel?: Function }} opts */
function buildConfirmSheet(opts) {
  const sheet = el('div', { className: 'confirm-sheet' },
    el('div', { className: 'confirm-sheet__title', id: 'cs-title', text: opts.title }),
    el('div', { className: 'confirm-sheet__body', text: opts.body }),
    el('div', { className: 'confirm-sheet__actions' },
      el('button', { className: 'btn btn--danger btn--full', id: 'cs-confirm', text: opts.confirmLabel || 'Continue' }),
      el('button', { className: 'btn btn--ghost btn--full', id: 'cs-cancel', text: opts.cancelLabel || 'Cancel' }),
    ),
  );
  return sheet;
}

/** @param {{ title: string, body?: string, actions: { label: string, className?: string, onClick?: Function }[] }} opts */
function buildChoiceSheet(opts) {
  return el('div', { className: 'confirm-sheet' },
    el('div', { className: 'confirm-sheet__title', id: 'cs-title', text: opts.title }),
    opts.body ? el('div', { className: 'confirm-sheet__body', text: opts.body }) : null,
    el('div', { className: 'confirm-sheet__actions' },
      ...opts.actions.map((a, i) =>
        el('button', {
          className: `btn ${a.className || ''} btn--full`.trim(),
          dataset: { action: String(i) },
          text: a.label,
        }),
      ),
    ),
  );
}

export {
  mountPage,
  emptyState,
  loadingPage,
  pageWithEmptyState,
  backButton,
  metricsRow,
  progressBar,
  sectionLabel,
  listButton,
  chapterCard,
  trainingChapterCard,
  mountQuizPage,
  quizHeader,
  lessonQuizHeader,
  vocabCard,
  vocabDirectionControl,
  segmentedControl,
  buildConfirmSheet,
  buildChoiceSheet,
  iconChevronRight,
  iconGrid,
  setHtml,
  el,
  appendChildren,
};
