/* ─── Fluir · matching ──────────────────────────────────────────────────── */

/** @import { LessonQuestion } from '../types.js' */

import {
  shuffle,
  bindNextBtn,
  showNextBtn,
} from './shared.js';

export function gameMatching(container, question, onAnswer) {
  const { pairs } = question;
  let selected = null;
  let matched  = 0;
  const total  = pairs.length;

  const spShuffled = shuffle(pairs);
  const enShuffled = shuffle(pairs);

  container.innerHTML = `
    <div class="game-type-tag tag-vocab">Matching</div>
    <div class="game-prompt">Match each Spanish word to its English meaning</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-3);margin-bottom:var(--space-4)">
      <div id="col-sp" style="display:flex;flex-direction:column;gap:var(--space-2)"></div>
      <div id="col-en" style="display:flex;flex-direction:column;gap:var(--space-2)"></div>
    </div>
    <div class="feedback" id="feedback" aria-live="polite"></div>
    <button class="btn btn--primary" class="game-next-btn" id="next-btn">Next →</button>
  `;

  function makeBtn(text, key, side) {
    const btn = document.createElement('button');
    btn.className = 'option';
    btn.classList.add('option--compact');
    btn.classList.add('option--sm');
    btn.dataset.key  = key;
    btn.dataset.side = side;
    btn.textContent  = text;
    btn.addEventListener('click', () => handleMatch(btn));
    return btn;
  }

  spShuffled.forEach(p => container.querySelector('#col-sp').appendChild(makeBtn(p.es, p.es, 'sp')));
  enShuffled.forEach(p => container.querySelector('#col-en').appendChild(makeBtn(p.en, p.es, 'en')));

  function handleMatch(btn) {
    if (btn.classList.contains('correct') || btn.classList.contains('matched')) return;
    if (!selected) {
      if (selected) selected.classList.remove('reveal');
      btn.classList.add('reveal');
      selected = btn;
      return;
    }
    if (selected === btn) {
      btn.classList.remove('reveal');
      selected = null;
      return;
    }
    if (selected.dataset.side === btn.dataset.side) {
      selected.classList.remove('reveal');
      btn.classList.add('reveal');
      selected = btn;
      return;
    }
    if (selected.dataset.key === btn.dataset.key) {
      selected.classList.remove('reveal');
      selected.classList.add('correct');
      btn.classList.add('correct');
      selected.disabled = true;
      btn.disabled = true;
      selected = null;
      matched++;
      if (matched === total) {
        const fb = container.querySelector('#feedback');
        fb.textContent = '✓ All matched!';
        fb.className = 'feedback show correct';
        showNextBtn(container);
        onAnswer(true, question);
      }
    } else {
      selected.classList.remove('reveal');
      selected.classList.add('wrong');
      btn.classList.add('wrong');
      const s = selected, b = btn;
      selected = null;
      setTimeout(() => { s.classList.remove('wrong'); b.classList.remove('wrong'); }, 600);
    }
  }

  bindNextBtn(container);
}

