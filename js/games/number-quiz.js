/* ─── Fluir · number-quiz ──────────────────────────────────────────────────── */

/** @import { LessonQuestion } from '../types.js' */

import {
  escapeHtml,
  shuffle,
  bindNextBtn,
  showNextBtn,
} from './shared.js';

export function gameNumberQuiz(container, question, onAnswer) {
  const { mode, numeral, spanish, distractors } = question;

  const opts = shuffle([spanish, ...distractors.slice(0, 3)]);

  let promptLabel, promptValue, optionStyle;

  if (mode === 'numeral-to-word') {
    const isAdverb = !String(numeral).match(/^\d/);
    promptLabel = isAdverb ? 'What is the adverb form of this adjective?' : 'How do you say this number in Spanish?';
    promptValue = `<div style="font-family:var(--font-serif);font-size:clamp(1.8rem,8vw,3rem);color:var(--color-amber);line-height:1">${numeral}</div>`;
    optionStyle = 'font-family:var(--font-serif);font-size:var(--text-md)';
  } else if (mode === 'word-to-numeral') {
    promptLabel = 'Which numeral matches this Spanish number?';
    promptValue = `<div style="font-family:var(--font-serif);font-size:var(--text-2xl);color:var(--color-amber)">${escapeHtml(spanish)}</div>`;
    optionStyle = 'font-family:var(--font-serif);font-size:var(--text-xl)';
  } else {
    /* time-to-spanish */
    promptLabel = 'How do you say this time in Spanish?';
    promptValue = `<div style="font-family:var(--font-serif);font-size:clamp(2rem,8vw,3.5rem);color:var(--color-amber);line-height:1">${numeral}</div>`;
    optionStyle = 'font-family:var(--font-serif);font-size:var(--text-sm)';
  }

  container.innerHTML = `
    <div class="game-type-tag tag-grammar" style="margin-bottom:var(--space-3);background:var(--color-cyan-bg);color:var(--color-cyan);border-color:var(--color-cyan)">Numbers</div>
    <div class="game-prompt lesson-translation lesson-translation--loose">${promptLabel}</div>
    <div style="text-align:center;margin-bottom:var(--space-6);padding:var(--space-5);background:var(--bg-panel);border-radius:var(--radius-md)">
      ${promptValue}
    </div>
    <div id="choices"></div>
    <div class="feedback" id="feedback" aria-live="polite"></div>
    <button class="btn btn--primary" class="game-next-btn" id="next-btn">Next →</button>
  `;

  const choicesEl = container.querySelector('#choices');
  opts.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'option';
    btn.style.cssText = optionStyle;
    btn.textContent = opt;
    btn.dataset.isCorrect = opt === spanish ? 'yes' : 'no';
    btn.addEventListener('click', () => {
      const isCorrect = btn.dataset.isCorrect === 'yes';
      container.querySelectorAll('.option').forEach(b => {
        b.disabled = true;
        if (b.dataset.isCorrect === 'yes') b.classList.add('correct');
        else if (b === btn && !isCorrect) b.classList.add('wrong');
      });
      const fb = container.querySelector('#feedback');
      if (isCorrect) {
        fb.innerHTML = `✓ <em>${mode === 'word-to-numeral' ? numeral : spanish}</em>`;
        fb.className = 'feedback show correct';
      } else {
        fb.innerHTML = `✗ ${escapeHtml(numeral)} → <em>${escapeHtml(spanish)}</em>`;
        fb.className = 'feedback show wrong';
      }
      showNextBtn(container);
      onAnswer(isCorrect, question);
    });
    choicesEl.appendChild(btn);
  });

  bindNextBtn(container);
}

