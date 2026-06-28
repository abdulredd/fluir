/* ─── Fluir · conjugation ──────────────────────────────────────────────────── */

/** @import { LessonQuestion } from '../types.js' */

import {
  escapeHtml,
  shuffle,
  bindNextBtn,
  showNextBtn,
} from './shared.js';

export function gameConjugationPicker(container, question, onAnswer) {
  const { pronoun, correctForm, verb, en } = question;

  /* Build 3 plausible wrong answers from same verb's conjugation table */
  const others = shuffle(
    question.allForms.filter(f => f.form !== correctForm),
  )
    .slice(0, 3)
    .map(f => f.form);

  /* Deduplicate (estar: está appears for él/ella/Ud.) */
  const uniqueWrong = [...new Set(others)].slice(0, 3);
  const opts = shuffle([correctForm, ...uniqueWrong]);

  container.innerHTML = `
    <div class="game-type-tag tag-grammar">Conjugation</div>
    <div class="game-prompt">Choose the correct form of <em style="color:var(--color-purple)">${verb}</em></div>
    <div class="lesson-translation lesson-translation--loose">
      <div style="font-family:var(--font-serif);font-size:var(--text-2xl);color:var(--color-amber);margin-bottom:var(--space-1)">${escapeHtml(pronoun)}</div>
      <div class="lesson-translation">${escapeHtml(en)}</div>
    </div>
    <div id="choices"></div>
    <div class="feedback" id="feedback" aria-live="polite"></div>
    <button class="btn btn--primary" class="game-next-btn" id="next-btn">Next →</button>
  `;

  const choicesEl = container.querySelector('#choices');
  opts.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'option';
    btn.classList.add('option--serif-lg');
    btn.textContent = opt;
    btn.dataset.isCorrect = opt === correctForm ? 'yes' : 'no';
    btn.addEventListener('click', () => {
      const isCorrect = btn.dataset.isCorrect === 'yes';
      container.querySelectorAll('.option').forEach(b => {
        b.disabled = true;
        if (b.dataset.isCorrect === 'yes') b.classList.add('correct');
        else if (b === btn && !isCorrect) b.classList.add('wrong');
      });
      const fb = container.querySelector('#feedback');
      if (isCorrect) {
        fb.innerHTML = `✓ <em>${escapeHtml(pronoun)} ${escapeHtml(correctForm)}</em> — ${escapeHtml(en)}`;
        fb.className = 'feedback show correct';
      } else {
        fb.innerHTML = `✗ <em>${escapeHtml(pronoun)} ${escapeHtml(correctForm)}</em> — ${escapeHtml(en)}`;
        fb.className = 'feedback show wrong';
      }
      showNextBtn(container);
      onAnswer(isCorrect, question);
    });
    choicesEl.appendChild(btn);
  });

  bindNextBtn(container);
}

