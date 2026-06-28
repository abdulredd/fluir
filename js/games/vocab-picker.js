/* ─── Fluir · vocab-picker ──────────────────────────────────────────────────── */

/** @import { LessonQuestion } from '../types.js' */

import {
  escapeHtml,
  shuffle,
  bindNextBtn,
  showNextBtn,
} from './shared.js';

export function gameVocabPicker(container, question, onAnswer) {
  const { vocab, distractors = [] } = question;
  const correct = vocab.es;
  const opts    = shuffle([correct, ...distractors]).slice(0, 4);

  container.innerHTML = `
    <div class="game-type-tag tag-vocab">Translate</div>
    <div class="game-prompt">Which Spanish word means…</div>
    <div class="es-large es-large--cyan es-large--loose">${escapeHtml(vocab.en)}</div>
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
    btn.addEventListener('click', () => {
      const isCorrect = opt === correct;
      container.querySelectorAll('.option').forEach(b => {
        b.disabled = true;
        if (b.textContent === correct) b.classList.add('correct');
        else if (b === btn && !isCorrect) b.classList.add('wrong');
      });
      const fb = container.querySelector('#feedback');
      if (isCorrect) {
        fb.innerHTML = `✓ Correct — <em>${escapeHtml(correct)}</em> means ${escapeHtml(vocab.en)}`;
        fb.className = 'feedback show correct';
      } else {
        fb.innerHTML = `✗ The answer is <em>${escapeHtml(correct)}</em> — ${escapeHtml(vocab.en)}`;
        fb.className = 'feedback show wrong';
      }
      showNextBtn(container);
      onAnswer(isCorrect, question);
    });
    choicesEl.appendChild(btn);
  });

  bindNextBtn(container);
}

