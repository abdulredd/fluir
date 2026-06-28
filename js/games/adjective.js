/* ─── Fluir · adjective ──────────────────────────────────────────────────── */

/** @import { LessonQuestion } from '../types.js' */

import {
  escapeHtml,
  shuffle,
  bindNextBtn,
  showNextBtn,
  ADJ_RULES,
} from './shared.js';

export function gameAdjectiveAgreement(container, question, onAnswer) {
  const { noun, adjective } = question;

  function getForm(adj, gender, number) {
    const base = adj.endsO ? adj.es.slice(0,-1) : adj.es;
    let form;
    if (adj.endsO) {
      form = gender === 'f' ? base + 'a' : base + 'o';
    } else {
      form = base;
    }
    if (number === 'pl') {
      const endsVowel = /[aeiouáéíóú]$/i.test(form);
      form = endsVowel ? form + 's' : form + 'es';
    }
    return form;
  }

  const correctForm = getForm(adjective, noun.gender, noun.number || 'sg');
  const wrongForm   = adjective.endsO
    ? getForm(adjective, noun.gender === 'f' ? 'm' : 'f', noun.number || 'sg')
    : correctForm + (correctForm.endsWith('s') ? '' : 's');

  const article   = noun.gender === 'm' ? 'el' : 'la';
  const opts      = shuffle([correctForm, wrongForm]);

  container.innerHTML = `
    <div class="game-type-tag tag-grammar">Adjective agreement</div>
    <div class="game-prompt">Choose the correct adjective form</div>
    <div class="es-large">${article} ${noun.es} ___</div>
    <div class="lesson-translation lesson-translation lesson-translation--loose">the ${noun.en} · ${adjective.en}</div>
    <div id="choices"></div>
    <div class="feedback" id="feedback" aria-live="polite"></div>
    <button class="btn btn--primary" class="game-next-btn" id="next-btn">Next →</button>
  `;

  const choicesEl = container.querySelector('#choices');
  opts.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'option';
    btn.classList.add('option--serif-lg');
    btn.textContent      = opt;
    btn.addEventListener('click', () => {
      const isCorrect = opt === correctForm;
      container.querySelectorAll('.option').forEach(b => {
        b.disabled = true;
        if (b.textContent === correctForm) b.classList.add('correct');
        else if (b === btn && !isCorrect) b.classList.add('wrong');
      });
      const fb = container.querySelector('#feedback');
      if (isCorrect) {
        fb.innerHTML = `✓ Correct — <em>${escapeHtml(article)} ${escapeHtml(noun.es)} ${escapeHtml(correctForm)}</em>`;
        fb.className = 'feedback show correct';
      } else {
        const rule = adjective.endsO ? ADJ_RULES.a_fem : ADJ_RULES.invariable;
        fb.innerHTML = `✗ <em>${escapeHtml(article)} ${escapeHtml(noun.es)} ${escapeHtml(correctForm)}</em> — ${escapeHtml(rule)}`;
        fb.className = 'feedback show wrong';
      }
      showNextBtn(container);
      onAnswer(isCorrect, question);
    });
    choicesEl.appendChild(btn);
  });

  bindNextBtn(container);
}

