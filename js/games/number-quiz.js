/* ─── Fluir · number-quiz ──────────────────────────────────────────────────── */

/** @import { LessonQuestion } from '../types.js' */

import { el } from '../dom.js';
import { shuffle } from './shared.js';
import { renderGameShell, bindChoiceButtons } from './ui.js';

export function gameNumberQuiz(container, question, onAnswer) {
  const { mode, numeral, spanish, distractors } = question;

  const labels = shuffle([spanish, ...distractors.slice(0, 3)]);

  let promptLabel;
  let promptValue;
  let optionStyle;

  if (mode === 'numeral-to-word') {
    const isAdverb = !String(numeral).match(/^\d/);
    promptLabel = isAdverb ? 'What is the adverb form of this adjective?' : 'How do you say this number in Spanish?';
    promptValue = el('div', {
      style: 'font-family:var(--font-serif);font-size:clamp(1.8rem,8vw,3rem);color:var(--color-amber);line-height:1',
      text: String(numeral),
    });
    optionStyle = 'font-family:var(--font-serif);font-size:var(--text-md)';
  } else if (mode === 'word-to-numeral') {
    promptLabel = 'Which numeral matches this Spanish number?';
    promptValue = el('div', {
      style: 'font-family:var(--font-serif);font-size:var(--text-2xl);color:var(--color-amber)',
      text: spanish,
    });
    optionStyle = 'font-family:var(--font-serif);font-size:var(--text-xl)';
  } else {
    promptLabel = 'How do you say this time in Spanish?';
    promptValue = el('div', {
      style: 'font-family:var(--font-serif);font-size:clamp(2rem,8vw,3.5rem);color:var(--color-amber);line-height:1',
      text: String(numeral),
    });
    optionStyle = 'font-family:var(--font-serif);font-size:var(--text-sm)';
  }

  const { feedback, choicesEl } = renderGameShell(container, {
    tagLabel: 'Numbers',
    tagClass: 'tag-grammar',
    tagStyle: 'margin-bottom:var(--space-3);background:var(--color-cyan-bg);color:var(--color-cyan);border-color:var(--color-cyan)',
    prompt: promptLabel,
    promptClass: 'lesson-translation lesson-translation--loose',
    middle: el('div', {
      style: 'text-align:center;margin-bottom:var(--space-6);padding:var(--space-5);background:var(--bg-panel);border-radius:var(--radius-md)',
    }, promptValue),
  });

  bindChoiceButtons(container, choicesEl, feedback,
    labels.map(label => ({ label, isCorrect: label === spanish })),
    {
      optionClasses: [],
      optionStyle,
      feedbackHtml: ok => ok
        ? `✓ <em>${mode === 'word-to-numeral' ? numeral : spanish}</em>`
        : `✗ ${numeral} → <em>${spanish}</em>`,
      onAnswer: ok => onAnswer(ok, question),
    },
  );
}
