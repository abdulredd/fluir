/* ─── Fluir · conjugation ──────────────────────────────────────────────────── */

/** @import { LessonQuestion } from '../types.js' */

import { el } from '../dom.js';
import { shuffle } from './shared.js';
import { renderGameShell, bindChoiceButtons } from './ui.js';

export function gameConjugationPicker(container, question, onAnswer) {
  const { pronoun, correctForm, verb, en } = question;

  const others = shuffle(
    question.allForms.filter(f => f.form !== correctForm),
  )
    .slice(0, 3)
    .map(f => f.form);

  const uniqueWrong = [...new Set(others)].slice(0, 3);
  const labels = shuffle([correctForm, ...uniqueWrong]);

  const { feedback, choicesEl } = renderGameShell(container, {
    tagLabel: 'Conjugation',
    tagClass: 'tag-grammar',
    prompt: el('span', {},
      'Choose the correct form of ',
      el('em', { style: 'color:var(--color-purple)', text: verb }),
    ),
    middle: el('div', { className: 'lesson-translation lesson-translation--loose' },
      el('div', {
        style: 'font-family:var(--font-serif);font-size:var(--text-2xl);color:var(--color-amber);margin-bottom:var(--space-1)',
        text: pronoun,
      }),
      el('div', { className: 'lesson-translation', text: en }),
    ),
  });

  bindChoiceButtons(container, choicesEl, feedback,
    labels.map(label => ({ label, isCorrect: label === correctForm })),
    {
      feedbackHtml: ok => `${ok ? '✓' : '✗'} <em>${pronoun} ${correctForm}</em> — ${en}`,
      onAnswer: ok => onAnswer(ok, question),
    },
  );
}
