/* ─── Fluir · fill-article ──────────────────────────────────────────────────── */

/** @import { LessonQuestion } from '../types.js' */

import { el } from '../dom.js';
import { ruleText } from './shared.js';
import { renderGameShell, bindTextCheck, skipToNext } from './ui.js';

export function gameFillArticle(container, question, onAnswer) {
  const { vocab } = question;
  const correct   = vocab.article === 'el/la' ? null : vocab.article;
  if (!correct) { skipToNext(container); return; }

  const { feedback } = renderGameShell(container, {
    tagLabel: 'Fill in the blank',
    tagClass: 'tag-grammar',
    prompt: 'Type the correct definite article',
    withChoices: false,
    feedbackClass: 'feedback--spaced',
    middle: [
      el('div', { style: 'display:flex;align-items:center;gap:var(--space-3);margin-bottom:var(--space-5)' },
        el('input', {
          className: 'text-input', id: 'fill-inp', style: 'width:90px;text-align:center',
          maxlength: '3', placeholder: '?', autocomplete: 'off', autocorrect: 'off', spellcheck: 'false',
        }),
        el('span', { className: 'es-large', text: vocab.es }),
      ),
      el('div', { className: 'lesson-translation', text: vocab.en }),
      el('button', { className: 'btn btn--primary', id: 'check-btn', text: 'Check' }),
    ],
  });

  bindTextCheck(container, feedback, {
    input:    container.querySelector('#fill-inp'),
    checkBtn: container.querySelector('#check-btn'),
    isCorrect: val => val === correct,
    feedbackHtml: ok => ok
      ? `✓ Correct — <em>${correct} ${vocab.es}</em>`
      : `✗ The answer is <em>${correct}</em> — ${ruleText(vocab.rule)}`,
    onAnswer: ok => onAnswer(ok, question),
  });
}
