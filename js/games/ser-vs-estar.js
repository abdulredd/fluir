/* ─── Fluir · ser-vs-estar ──────────────────────────────────────────────────── */

/** @import { LessonQuestion } from '../types.js' */

import {
  escapeHtml,
  bindNextBtn,
  showNextBtn,
} from './shared.js';

export function gameSerVsEstar(container, question, onAnswer) {
  const { sentence, verb, use, en } = question;

  /* Strip the verb out of the sentence for display — replace with blank */
  const verbForms = {
    estar: ['estoy','estás','está','estamos','estáis','están'],
    ser:   ['soy','eres','es','somos','sois','son'],
  };
  const allForms = [...verbForms.estar, ...verbForms.ser];
  let displaySentence = sentence;
  allForms.forEach(f => {
    if (sentence.includes(` ${f} `)) {
      displaySentence = sentence.replace(` ${f} `, ` ___ `);
    } else if (sentence.startsWith(`${f.charAt(0).toUpperCase()}${f.slice(1)} `)) {
      displaySentence = sentence.replace(`${f.charAt(0).toUpperCase()}${f.slice(1)} `, `___ `);
    }
  });

  const USE_LABELS = {
    location:    'Estar — location',
    health:      'Estar — health',
    mood:        'Estar — changing mood/condition',
    taste:       'Estar — taste/appearance',
    description: 'Ser — description',
    profession:  'Ser — profession',
    origin:      'Ser — origin',
    identification: 'Ser — identification',
    material:    'Ser — material',
    possession:  'Ser — possession',
    event:       'Ser — event location',
  };

  container.innerHTML = `
    <div class="game-type-tag tag-grammar" style="margin-bottom:var(--space-3);background:var(--color-purple-bg);color:var(--color-purple);border-color:var(--color-purple)">Ser vs Estar</div>
    <div class="game-prompt">Which verb completes this sentence?</div>
    <div class="card lesson-translation lesson-translation--loose">
      <div style="font-family:var(--font-serif);font-size:var(--text-lg);color:var(--color-amber);margin-bottom:var(--space-2);line-height:1.4">${escapeHtml(displaySentence)}</div>
      <div class="lesson-translation">${escapeHtml(en)}</div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-3);margin-bottom:var(--space-4)" id="choices"></div>
    <div class="feedback" id="feedback" aria-live="polite"></div>
    <button class="btn btn--primary" class="game-next-btn" id="next-btn">Next →</button>
  `;

  const choicesEl = container.querySelector('#choices');
  ['ser', 'estar'].forEach(v => {
    const btn = document.createElement('button');
    btn.className = 'option';
    btn.style.textAlign = 'center';
    btn.style.fontFamily = 'var(--font-serif)';
    btn.style.fontSize = 'var(--text-xl)';
    btn.textContent = v;
    btn.dataset.isCorrect = v === verb ? 'yes' : 'no';
    btn.addEventListener('click', () => {
      const isCorrect = btn.dataset.isCorrect === 'yes';
      container.querySelectorAll('.option').forEach(b => {
        b.disabled = true;
        if (b.dataset.isCorrect === 'yes') b.classList.add('correct');
        else if (b === btn && !isCorrect) b.classList.add('wrong');
      });
      const fb = container.querySelector('#feedback');
      const label = USE_LABELS[use] || verb;
      if (isCorrect) {
        fb.innerHTML = `✓ <em>${escapeHtml(verb)}</em> — ${escapeHtml(label)}`;
        fb.className = 'feedback show correct';
      } else {
        fb.innerHTML = `✗ <em>${escapeHtml(verb)}</em> — ${escapeHtml(label)}`;
        fb.className = 'feedback show wrong';
      }
      showNextBtn(container);
      onAnswer(isCorrect, question);
    });
    choicesEl.appendChild(btn);
  });

  bindNextBtn(container);
}

