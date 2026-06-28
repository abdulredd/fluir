/* ─── Fluir · translation ──────────────────────────────────────────────────── */

/** @import { LessonQuestion } from '../types.js' */

import {
  ruleText,
  escapeHtml,
  bindNextBtn,
  showNextBtn,
} from './shared.js';

export function gameTranslation(container, question, onAnswer) {
  const { vocab } = question;
  if (vocab.article === 'el/la') { container.dispatchEvent(new CustomEvent('game:next')); return; }

  /* Only show gender hint when the word is genuinely ambiguous —
     i.e. both a masculine and feminine form exist for the same concept.
     -ista and -nte words already skip this function (article === 'el/la').
     The remaining cases where a hint is useful: paired nouns like
     amigo/amiga, hermano/hermana, doctor/doctora, niño/niña, muchacho/muchacha.
     Everything else (luz, ciudad, libro, casa) has intrinsic gender — no hint needed. */
  const AMBIGUOUS_PAIRS = new Set([
    'amigo','amiga','hermano','hermana','doctor','doctora',
    'presidente','presidenta','gerente','cantante','estudiante',
  ]);
  const needsHint = AMBIGUOUS_PAIRS.has(vocab.es);
  const genderHint = needsHint
    ? (vocab.gender === 'm' ? ' (m)' : vocab.gender === 'f' ? ' (f)' : '')
    : '';
  const displayEn = vocab.en.includes('(m)') || vocab.en.includes('(f)')
    ? vocab.en
    : vocab.en + genderHint;

  container.innerHTML = `
    <div class="game-type-tag tag-vocab">Translate</div>
    <div class="game-prompt">Translate to Spanish (article + noun)</div>
    <div class="es-large es-large--cyan es-large--loose">the ${displayEn}</div>
    <input class="text-input" id="trans-inp" placeholder="el/la + word…"
           autocomplete="off" autocorrect="off" spellcheck="false"
            />
    <button class="btn btn--primary" id="check-btn">Check</button>
    <div class="feedback" id="feedback" aria-live="polite" class="feedback feedback--spaced"></div>
    <button class="btn btn--primary" class="game-next-btn" id="next-btn">Next →</button>
  `;

  const inp     = container.querySelector('#trans-inp');
  const correct = `${vocab.article} ${vocab.es}`;
  inp.focus();

  function check() {
    const val = inp.value.trim().toLowerCase();
    if (!val) return;
    const isCorrect = val === correct;
    inp.disabled = true;
    inp.className = `text-input ${isCorrect ? 'correct' : 'wrong'}`;
    container.querySelector('#check-btn')?.classList.add('hidden');
    const fb = container.querySelector('#feedback');
    if (isCorrect) {
      fb.innerHTML = `✓ <em>${escapeHtml(correct)}</em> — ${escapeHtml(vocab.en)}`;
      fb.className = 'feedback show correct';
    } else {
      fb.innerHTML = `✗ The answer is <em>${escapeHtml(correct)}</em> — ${escapeHtml(ruleText(vocab.rule))}`;
      fb.className = 'feedback show wrong';
    }
    showNextBtn(container);
    onAnswer(isCorrect, question);
  }

  container.querySelector('#check-btn').addEventListener('click', check);
  inp.addEventListener('keydown', e => { if (e.key === 'Enter') check(); });
  bindNextBtn(container);
}

