/* ─── Fluir · sentence-completion ──────────────────────────────────────────────────── */

/** @import { LessonQuestion } from '../types.js' */

import {
  escapeHtml,
  bindNextBtn,
  showNextBtn,
} from './shared.js';

export function gameSentenceCompletion(container, question, onAnswer) {
  const { sentence, answer, choices, fills, en, rule } = question;

  /* Build display sentence with styled blanks */
  let displaySentence = sentence;
  (fills || [answer]).forEach(() => {
    displaySentence = displaySentence.replace('___',
      `<span style="display:inline-block;min-width:60px;border-bottom:2px solid var(--color-amber);color:var(--color-amber);text-align:center;font-family:var(--font-serif);padding:0 4px">___</span>`);
  });

  container.innerHTML = `
    <div class="game-type-tag tag-grammar" style="margin-bottom:var(--space-3);background:var(--color-cyan-bg);color:var(--color-cyan);border-color:var(--color-cyan)">Complete the sentence</div>
    <div class="game-prompt">Choose the correct option to complete the sentence</div>
    <div class="card lesson-translation lesson-translation--loose">
      <div style="font-family:var(--font-serif);font-size:var(--text-lg);color:var(--color-amber);margin-bottom:var(--space-2);line-height:1.6">${escapeHtml(sentence).replace(/___/g, '<span style="display:inline-block;min-width:50px;border-bottom:2px solid var(--color-cyan);color:var(--color-cyan);text-align:center;padding:0 4px">___</span>')}</div>
      <div class="lesson-translation">${escapeHtml(en)}</div>
    </div>
    <div id="choices" style="display:flex;flex-direction:column;gap:var(--space-2)"></div>
    <div class="feedback" id="feedback" aria-live="polite"></div>
    <button class="btn btn--primary" class="game-next-btn" id="next-btn">Next →</button>
  `;

  const choicesEl = container.querySelector('#choices');
  choices.forEach(choice => {
    const btn = document.createElement('button');
    btn.className = 'option';
    btn.classList.add('option--serif-md');
    btn.style.textAlign = 'left';
    btn.textContent = choice;
    btn.dataset.isCorrect = choice === answer ? 'yes' : 'no';
    btn.addEventListener('click', () => {
      const isCorrect = btn.dataset.isCorrect === 'yes';
      container.querySelectorAll('.option').forEach(b => {
        b.disabled = true;
        if (b.dataset.isCorrect === 'yes') b.classList.add('correct');
        else if (b === btn && !isCorrect) b.classList.add('wrong');
      });

      /* Show completed sentence */
      const completed = fills
        ? fills.reduce((s, f) => s.replace('___', `<em class="game-fill-em">${escapeHtml(f)}</em>`), sentence)
        : sentence.replace(/___/g, `<em class="game-fill-em">${escapeHtml(answer)}</em>`);

      const fb = container.querySelector('#feedback');
      if (isCorrect) {
        fb.innerHTML = `✓ ${completed}${rule ? `<div style="font-size:var(--text-xs);color:var(--color-cyan);margin-top:6px;font-style:italic">${escapeHtml(rule)}</div>` : ''}`;
        fb.className = 'feedback show correct';
      } else {
        fb.innerHTML = `✗ ${completed}${rule ? `<div style="font-size:var(--text-xs);color:var(--color-cyan);margin-top:6px;font-style:italic">${escapeHtml(rule)}</div>` : ''}`;
        fb.className = 'feedback show wrong';
      }
      showNextBtn(container);
      onAnswer(isCorrect, question);
    });
    choicesEl.appendChild(btn);
  });

  bindNextBtn(container);
}

