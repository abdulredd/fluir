/* ─── Fluir · Game UI primitives ──────────────────────────────────────────── */

import { el, clearAndMount, appendChildren } from '../dom.js';
import { bindNextBtn, showNextBtn, feedbackCorrect, feedbackWrong } from './shared.js';

/**
 * @typedef {object} GameShellOptions
 * @property {string} tagLabel
 * @property {string} [tagClass]
 * @property {string} [tagStyle]
 * @property {string|Element} [prompt]
 * @property {string} [promptClass]
 * @property {Element|Element[]|string} [middle]
 * @property {string} [choicesClass]
 * @property {string} [choicesStyle]
 * @property {string} [feedbackClass]
 * @property {boolean} [withChoices]
 */

/**
 * Standard game chrome: type tag, prompt, optional body, choices slot, feedback, next.
 * @param {Element} container
 * @param {GameShellOptions} opts
 * @returns {{ feedback: Element, choicesEl: Element|null }}
 */
function renderGameShell(container, opts) {
  const typeTag = el('div', {
    className: `game-type-tag ${opts.tagClass || 'tag-vocab'}`,
    text: opts.tagLabel,
  });
  if (opts.tagStyle) typeTag.style.cssText = opts.tagStyle;

  const prompt = el('div', { className: ['game-prompt', opts.promptClass].filter(Boolean).join(' ') });
  if (opts.prompt != null && typeof opts.prompt === 'object' && 'nodeType' in opts.prompt) {
    prompt.appendChild(opts.prompt);
  } else if (opts.prompt) {
    prompt.textContent = String(opts.prompt);
  }

  const parts = [typeTag, prompt];

  if (opts.middle) {
    const body = el('div', { className: 'game-body' });
    if (typeof opts.middle === 'string') body.textContent = opts.middle;
    else appendChildren(body, opts.middle);
    parts.push(body);
  }

  let choicesEl = null;
  if (opts.withChoices !== false) {
    choicesEl = el('div', {
      id: 'choices',
      className: opts.choicesClass || '',
      ...(opts.choicesStyle ? { style: opts.choicesStyle } : {}),
    });
    parts.push(choicesEl);
  }

  const feedback = el('div', {
    id: 'feedback',
    className: ['feedback', opts.feedbackClass].filter(Boolean).join(' '),
    ariaLive: 'polite',
  });

  const nextBtn = el('button', {
    className: 'btn btn--primary game-next-btn',
    id: 'next-btn',
    text: 'Next →',
  });

  parts.push(feedback, nextBtn);
  clearAndMount(container, ...parts);
  bindNextBtn(container);

  return { feedback, choicesEl };
}

/** @param {Element} container */
function skipToNext(container) {
  container.dispatchEvent(new CustomEvent('game:next'));
}

/**
 * @param {Element} choicesEl
 * @param {Element} clickedBtn
 */
function lockChoiceButtons(choicesEl, clickedBtn) {
  choicesEl.querySelectorAll('.option').forEach(b => {
    b.disabled = true;
    if (b.dataset.isCorrect === 'yes') b.classList.add('correct');
    else if (b === clickedBtn) b.classList.add('wrong');
  });
}

/**
 * @typedef {object} ChoiceOption
 * @property {string} label
 * @property {boolean} isCorrect
 */

/**
 * @param {Element} container
 * @param {Element} choicesEl
 * @param {Element} feedback
 * @param {ChoiceOption[]} options
 * @param {object} config
 * @param {string[]} [config.optionClasses]
 * @param {string|Record<string, string>} [config.optionStyle]
 * @param {(isCorrect: boolean) => string} config.feedbackHtml
 * @param {(isCorrect: boolean) => void} config.onAnswer
 */
function bindChoiceButtons(container, choicesEl, feedback, options, config) {
  const { optionClasses = ['option--serif-lg'], optionStyle, feedbackHtml, onAnswer } = config;

  options.forEach(({ label, isCorrect }) => {
    const btn = el('button', {
      className: ['option', ...optionClasses].filter(Boolean).join(' '),
      text: label,
      dataset: { isCorrect: isCorrect ? 'yes' : 'no' },
      ...(optionStyle ? { style: optionStyle } : {}),
      onClick: () => {
        const ok = btn.dataset.isCorrect === 'yes';
        lockChoiceButtons(choicesEl, btn);
        const html = feedbackHtml(ok);
        if (ok) feedbackCorrect(feedback, html);
        else feedbackWrong(feedback, html);
        showNextBtn(container);
        onAnswer(ok);
      },
    });
    choicesEl.appendChild(btn);
  });
}

/**
 * Text input + Check button flow shared by fill-article and translation games.
 * @param {Element} container
 * @param {Element} feedback
 * @param {object} config
 * @param {HTMLInputElement} config.input
 * @param {Element|null} [config.checkBtn]
 * @param {(value: string) => string} [config.normalize]
 * @param {(value: string) => boolean} config.isCorrect
 * @param {(isCorrect: boolean) => string} config.feedbackHtml
 * @param {(isCorrect: boolean) => void} config.onAnswer
 */
function bindTextCheck(container, feedback, config) {
  const {
    input,
    checkBtn,
    normalize = v => v.trim().toLowerCase(),
    isCorrect,
    feedbackHtml,
    onAnswer,
  } = config;

  input.focus();

  function check() {
    const val = normalize(input.value);
    if (!val) return;

    const ok = isCorrect(val);
    input.disabled = true;
    input.className = `text-input ${ok ? 'correct' : 'wrong'}`;
    checkBtn?.classList.add('hidden');

    const html = feedbackHtml(ok);
    if (ok) feedbackCorrect(feedback, html);
    else feedbackWrong(feedback, html);

    showNextBtn(container);
    onAnswer(ok);
  }

  checkBtn?.addEventListener('click', check);
  input.addEventListener('keydown', e => { if (e.key === 'Enter') check(); });
}

export {
  renderGameShell,
  skipToNext,
  lockChoiceButtons,
  bindChoiceButtons,
  bindTextCheck,
};
