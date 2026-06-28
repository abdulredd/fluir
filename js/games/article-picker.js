/* ─── Fluir · article-picker ──────────────────────────────────────────────────── */

/** @import { LessonQuestion } from '../types.js' */

import {
  ruleText,
  wrongArticle,
  escapeHtml,
  shuffle,
  bindNextBtn,
  showNextBtn,
} from './shared.js';

export function gameArticlePicker(container, question, onAnswer) {
  const { vocab } = question;
  const correct   = vocab.article === 'el/la' ? null : vocab.article;
  const wrong     = correct ? wrongArticle(correct) : null;

  /* skip -ista/-nte words in this game type — use a different game */
  if (!correct) { container.dispatchEvent(new CustomEvent('game:next')); return; }

  const opts = shuffle([
    `${correct} ${vocab.es}`,
    `${wrong} ${vocab.es}`,
  ]);

  container.innerHTML = `
    <div class="game-type-tag tag-vocab">Definite article</div>
    <div class="game-prompt">Choose the correct article</div>
    <div class="es-large">${escapeHtml(vocab.es)}</div>
    <div class="lesson-translation lesson-translation lesson-translation--loose">${escapeHtml(vocab.en)}</div>
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
    btn.dataset.isCorrect = (opt === `${correct} ${vocab.es}`) ? 'yes' : 'no';
    btn.addEventListener('click', () => {
      const isCorrect = btn.dataset.isCorrect === 'yes';
      container.querySelectorAll('.option').forEach(b => {
        b.disabled = true;
        if (b.dataset.isCorrect === 'yes') b.classList.add('correct');
        else if (b === btn && !isCorrect) b.classList.add('wrong');
      });
      const fb = container.querySelector('#feedback');
      if (isCorrect) {
        fb.innerHTML = `✓ Correct — <em>${escapeHtml(correct)} ${escapeHtml(vocab.es)}</em>`;
        fb.className = 'feedback show correct';
      } else {
        const rule = ruleText(vocab.rule);
        fb.innerHTML = `✗ <em>${escapeHtml(correct)} ${escapeHtml(vocab.es)}</em> — ${escapeHtml(rule)}`;
        fb.className = 'feedback show wrong';
      }
      showNextBtn(container);
      onAnswer(isCorrect, question);
    });
    choicesEl.appendChild(btn);
  });

  bindNextBtn(container);
}

