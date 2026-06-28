/* ─── Fluir · translation ──────────────────────────────────────────────────── */

/** @import { LessonQuestion } from '../types.js' */

import { el } from '../dom.js';
import { ruleText } from './shared.js';
import { renderGameShell, bindTextCheck, skipToNext } from './ui.js';

export function gameTranslation(container, question, onAnswer) {
  const { vocab, mode } = question;

  if (mode === 'plural-definite') {
    if (!vocab.plural) { skipToNext(container); return; }
    const art = vocab.gender === 'f' ? 'las' : 'los';
    const correct = `${art} ${vocab.plural}`;
    const displayEn = `the ${vocab.en} (plural)`;

    const { feedback } = renderGameShell(container, {
      tagLabel: 'Translate',
      tagClass: 'tag-vocab',
      prompt: 'Translate to Spanish (plural article + noun)',
      withChoices: false,
      feedbackClass: 'feedback--spaced',
      middle: [
        el('div', { className: 'es-large es-large--cyan es-large--loose', text: displayEn }),
        el('input', {
          className: 'text-input', id: 'trans-inp', placeholder: 'los/las + word…',
          autocomplete: 'off', autocorrect: 'off', spellcheck: 'false',
        }),
        el('button', { className: 'btn btn--primary', id: 'check-btn', text: 'Check' }),
      ],
    });

    bindTextCheck(container, feedback, {
      input:    container.querySelector('#trans-inp'),
      checkBtn: container.querySelector('#check-btn'),
      isCorrect: val => val === correct,
      feedbackHtml: ok => ok
        ? `✓ <em>${correct}</em> — ${displayEn}`
        : `✗ The answer is <em>${correct}</em> — ${ruleText(vocab.rule)}`,
      onAnswer: ok => onAnswer(ok, question),
    });
    return;
  }

  if (vocab.article === 'el/la') { skipToNext(container); return; }

  const AMBIGUOUS_PAIRS = new Set([
    'amigo','amiga','hermano','hermana','doctor','doctora',
    'presidente','presidenta','gerente','cantante','estudiante',
  ]);
  const needsHint = AMBIGUOUS_PAIRS.has(vocab.es);
  const genderHint = needsHint
    ? (vocab.gender === 'm' ? ' (m)' : vocab.gender === 'f' ? ' (f)' : '')
    : '';
  const displayEn = vocab.en.includes('(m)') || vocab.en.includes('(f)')
    ? vocab.en
    : vocab.en + genderHint;

  const correct = `${vocab.article} ${vocab.es}`;

  const { feedback } = renderGameShell(container, {
    tagLabel: 'Translate',
    tagClass: 'tag-vocab',
    prompt: 'Translate to Spanish (article + noun)',
    withChoices: false,
    feedbackClass: 'feedback--spaced',
    middle: [
      el('div', { className: 'es-large es-large--cyan es-large--loose', text: `the ${displayEn}` }),
      el('input', {
        className: 'text-input', id: 'trans-inp', placeholder: 'el/la + word…',
        autocomplete: 'off', autocorrect: 'off', spellcheck: 'false',
      }),
      el('button', { className: 'btn btn--primary', id: 'check-btn', text: 'Check' }),
    ],
  });

  bindTextCheck(container, feedback, {
    input:    container.querySelector('#trans-inp'),
    checkBtn: container.querySelector('#check-btn'),
    isCorrect: val => val === correct,
    feedbackHtml: ok => ok
      ? `✓ <em>${correct}</em> — ${vocab.en}`
      : `✗ The answer is <em>${correct}</em> — ${ruleText(vocab.rule)}`,
    onAnswer: ok => onAnswer(ok, question),
  });
}
