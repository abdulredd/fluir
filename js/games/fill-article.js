/* ─── Fluir · fill-article ──────────────────────────────────────────────────── */

/** @import { LessonQuestion } from '../types.js' */

import {
  ruleText,
  escapeHtml,
  bindNextBtn,
  showNextBtn,
} from './shared.js';

export function gameFillArticle(container, question, onAnswer) {
  const { vocab } = question;
  const correct   = vocab.article === 'el/la' ? null : vocab.article;
  if (!correct) { container.dispatchEvent(new CustomEvent('game:next')); return; }

  container.innerHTML = `
    <div class="game-type-tag tag-grammar">Fill in the blank</div>
    <div class="game-prompt">Type the correct definite article</div>
    <div style="display:flex;align-items:center;gap:var(--space-3);margin-bottom:var(--space-5)">
      <input class="text-input" id="fill-inp" style="width:90px;text-align:center"
             maxlength="3" placeholder="?" autocomplete="off" autocorrect="off" spellcheck="false"/>
      <span class="es-large">${escapeHtml(vocab.es)}</span>
    </div>
    <div class="lesson-translation">${escapeHtml(vocab.en)}</div>
    <button class="btn btn--primary" id="check-btn">Check</button>
    <div class="feedback" id="feedback" aria-live="polite" class="feedback feedback--spaced"></div>
    <button class="btn btn--primary" class="game-next-btn" id="next-btn">Next →</button>
  `;

  const inp = container.querySelector('#fill-inp');
  inp.focus();

  function check() {
    const val = inp.value.trim().toLowerCase();
    if (!val) return;
    const isCorrect = val === correct;
    inp.className = `text-input ${isCorrect ? 'correct' : 'wrong'}`;
    inp.disabled = true;
    container.querySelector('#check-btn')?.classList.add('hidden');
    const fb = container.querySelector('#feedback');
    if (isCorrect) {
      fb.innerHTML = `✓ Correct — <em>${escapeHtml(correct)} ${escapeHtml(vocab.es)}</em>`;
      fb.className = 'feedback show correct';
    } else {
      const rule = ruleText(vocab.rule);
      fb.innerHTML = `✗ The answer is <em>${escapeHtml(correct)}</em> — ${escapeHtml(rule)}`;
      fb.className = 'feedback show wrong';
    }
    showNextBtn(container);
    onAnswer(isCorrect, question);
  }

  container.querySelector('#check-btn').addEventListener('click', check);
  inp.addEventListener('keydown', e => { if (e.key === 'Enter') check(); });
  bindNextBtn(container);
}

