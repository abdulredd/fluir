/* ─── Fluir · sentence-completion ──────────────────────────────────────────────────── */

/** @import { LessonQuestion } from '../types.js' */

import { el } from '../dom.js';
import { renderGameShell, bindChoiceButtons } from './ui.js';

function sentenceWithBlanks(sentence) {
  const parts = sentence.split('___');
  const nodes = [];
  parts.forEach((part, i) => {
    if (part) nodes.push(part);
    if (i < parts.length - 1) {
      nodes.push(el('span', {
        style: 'display:inline-block;min-width:50px;border-bottom:2px solid var(--color-cyan);color:var(--color-cyan);text-align:center;padding:0 4px',
        text: '___',
      }));
    }
  });
  return el('div', { className: 'game-sentence-display' }, ...nodes);
}

export function gameSentenceCompletion(container, question, onAnswer) {
  const { sentence, answer, choices, fills, en, rule } = question;

  const { feedback, choicesEl } = renderGameShell(container, {
    tagLabel: 'Complete the sentence',
    tagClass: 'tag-grammar',
    tagStyle: 'margin-bottom:var(--space-3);background:var(--color-cyan-bg);color:var(--color-cyan);border-color:var(--color-cyan)',
    prompt: 'Choose the correct option to complete the sentence',
    choicesStyle: 'display:flex;flex-direction:column;gap:var(--space-2)',
    middle: el('div', { className: 'card lesson-translation--loose' },
      sentenceWithBlanks(sentence),
      el('div', { className: 'lesson-translation', text: en }),
    ),
  });

  bindChoiceButtons(container, choicesEl, feedback,
    choices.map(choice => ({ label: choice, isCorrect: choice === answer })),
    {
      optionClasses: ['option--serif-md'],
      optionStyle: 'text-align:left',
      feedbackHtml: ok => {
        const completed = fills
          ? fills.reduce((s, f) => s.replace('___', `<span class="game-fill-em">${f}</span>`), sentence)
          : sentence.replace(/___/g, `<span class="game-fill-em">${answer}</span>`);
        const ruleHtml = rule
          ? `<div style="font-size:var(--text-xs);color:var(--color-cyan);margin-top:6px;font-style:italic">${rule}</div>`
          : '';
        return `${ok ? '✓' : '✗'} ${completed}${ruleHtml}`;
      },
      onAnswer: ok => onAnswer(ok, question),
    },
  );
}
