/* ─── Fluir · article-picker ──────────────────────────────────────────────────── */

/** @import { LessonQuestion } from '../types.js' */

import { el } from '../dom.js';
import { ruleText, wrongArticle, shuffle, resolveDefiniteArticle, genderHintLabel } from './shared.js';
import { renderGameShell, bindChoiceButtons, skipToNext } from './ui.js';

export function gameArticlePicker(container, question, onAnswer) {
  const { vocab, targetGender } = question;
  const correct = resolveDefiniteArticle(vocab, targetGender);
  const wrong   = correct ? wrongArticle(correct) : null;

  if (!correct) { skipToNext(container); return; }

  const options = shuffle([
    { label: `${correct} ${vocab.es}`, isCorrect: true },
    { label: `${wrong} ${vocab.es}`, isCorrect: false },
  ]);

  const { feedback, choicesEl } = renderGameShell(container, {
    tagLabel: 'Definite article',
    tagClass: 'tag-grammar',
    prompt: targetGender ? 'Choose el or la for the gender shown' : 'Choose the correct article',
    middle: [
      el('div', { className: 'es-large', text: vocab.es }),
      el('div', { className: 'lesson-translation lesson-translation--loose', text: vocab.en + genderHintLabel(targetGender) }),
    ],
  });

  bindChoiceButtons(container, choicesEl, feedback, options, {
    feedbackHtml: ok => ok
      ? `✓ Correct — <em>${correct} ${vocab.es}</em>`
      : `✗ <em>${correct} ${vocab.es}</em> — ${ruleText(vocab.rule)}`,
    onAnswer: ok => onAnswer(ok, question),
  });
}
