/* ─── Fluir · matching ──────────────────────────────────────────────────── */

/** @import { LessonQuestion } from '../types.js' */

import { el } from '../dom.js';
import {
  shuffle,
  showNextBtn,
  feedbackCorrect,
} from './shared.js';
import { renderGameShell } from './ui.js';

export function gameMatching(container, question, onAnswer) {
  const { pairs } = question;
  let selected = null;
  let matched  = 0;
  const total  = pairs.length;

  const spShuffled = shuffle(pairs);
  const enShuffled = shuffle(pairs);

  const grid = el('div', { className: 'game-matching-grid' });

  renderGameShell(container, {
    tagLabel: 'Matching',
    tagClass: 'tag-grammar',
    prompt: 'Match each Spanish word to its English meaning',
    withChoices: false,
    middle: grid,
  });

  const feedback = container.querySelector('#feedback');

  function handleMatch(btn) {
    if (btn.classList.contains('correct') || btn.classList.contains('matched')) return;
    if (!selected) {
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
        feedbackCorrect(feedback, '✓ All matched!');
        showNextBtn(container);
        onAnswer(true, question);
      }
    } else {
      selected.classList.remove('reveal');
      selected.classList.add('wrong');
      btn.classList.add('wrong');
      const s = selected;
      const b = btn;
      selected = null;
      setTimeout(() => { s.classList.remove('wrong'); b.classList.remove('wrong'); }, 600);
    }
  }

  function makeBtn(text, key, side) {
    return el('button', {
      className: 'option option--compact option--sm',
      text,
      dataset: { key, side },
      onClick: ({ currentTarget }) => handleMatch(currentTarget),
    });
  }

  for (let i = 0; i < total; i++) {
    grid.appendChild(makeBtn(spShuffled[i].es, spShuffled[i].es, 'sp'));
    grid.appendChild(makeBtn(enShuffled[i].en, enShuffled[i].es, 'en'));
  }
}
