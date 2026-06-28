/* ─── Fluir · vocab-picker ──────────────────────────────────────────────────── */

/** @import { LessonQuestion } from '../types.js' */

import { el } from '../dom.js';
import { shuffle } from './shared.js';
import { renderGameShell, bindChoiceButtons } from './ui.js';

export function gameVocabPicker(container, question, onAnswer) {
  const { vocab, distractors = [] } = question;
  const correct = vocab.es;
  const labels  = shuffle([correct, ...distractors]).slice(0, 4);

  const { feedback, choicesEl } = renderGameShell(container, {
    tagLabel: 'Translate',
    tagClass: 'tag-grammar',
    prompt: 'Which Spanish word means…',
    middle: el('div', { className: 'es-large es-large--cyan es-large--loose', text: vocab.en }),
  });

  bindChoiceButtons(container, choicesEl, feedback,
    labels.map(label => ({ label, isCorrect: label === correct })),
    {
      feedbackHtml: ok => ok
        ? `✓ Correct — <em>${correct}</em> means ${vocab.en}`
        : `✗ The answer is <em>${correct}</em> — ${vocab.en}`,
      onAnswer: ok => onAnswer(ok, question),
    },
  );
}
