/* ─── Fluir · plural-picker ──────────────────────────────────────────────────── */

/** @import { LessonQuestion } from '../types.js' */

import {
  ruleText,
  escapeHtml,
  shuffle,
  bindNextBtn,
  showNextBtn,
  PLURAL_RULES,
} from './shared.js';

export function gamePluralPicker(container, question, onAnswer) {
  const { vocab } = question;
  const correct = vocab.plural;

  /* Guard — if plural is missing, skip this question */
  if (!correct) { container.dispatchEvent(new CustomEvent('game:next')); return; }

  /* generate a plausible wrong answer — inverted rule */
  const endsVowel = /[aeiouáéíóú]$/i.test(vocab.es);
  const wrong = endsVowel ? vocab.es + 'es' : vocab.es + 's';

  /* Avoid showing wrong === correct */
  if (wrong === correct) { container.dispatchEvent(new CustomEvent('game:next')); return; }

  const opts = shuffle([correct, wrong]);

  /* Determine plural article — fall back to gender from definite article */
  let pluralArticle = 'los';
  if (vocab.gender === 'f') pluralArticle = 'las';
  else if (vocab.article === 'una' || vocab.indef === 'una') pluralArticle = 'las';

  const singularArticle = vocab.indef || vocab.article || '';

  container.innerHTML = `
    <div class="game-type-tag tag-grammar">Plural form</div>
    <div class="game-prompt">What is the plural of…</div>
    <div style="display:flex;align-items:baseline;gap:var(--space-2);margin-bottom:var(--space-2)">
      <span style="font-size:var(--text-sm);color:var(--text-muted)">${singularArticle}</span>
      <span class="es-large">${escapeHtml(vocab.es)}</span>
    </div>
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
    btn.textContent = `${pluralArticle} ${opt}`;
    btn.addEventListener('click', () => {
      const isCorrect = opt === correct;
      container.querySelectorAll('.option').forEach(b => {
        b.disabled = true;
        if (b.textContent === `${pluralArticle} ${correct}`) b.classList.add('correct');
        else if (b === btn && !isCorrect) b.classList.add('wrong');
      });
      const fb = container.querySelector('#feedback');
      if (isCorrect) {
        fb.innerHTML = `✓ Correct — <em>${escapeHtml(pluralArticle)} ${escapeHtml(correct)}</em>`;
        fb.className = 'feedback show correct';
      } else {
        const ruleKey = vocab.rule?.includes('cion') ? 'cion_plural'
          : pluralArticle === 'las' ? (endsVowel ? 'vowel_fem' : 'cons_fem')
          : (endsVowel ? 'vowel_masc' : 'cons_masc');
        fb.innerHTML = `✗ <em>${escapeHtml(pluralArticle)} ${escapeHtml(correct)}</em> — ${escapeHtml(ruleText(ruleKey, PLURAL_RULES))}`;
        fb.className = 'feedback show wrong';
      }
      showNextBtn(container);
      onAnswer(isCorrect, question);
    });
    choicesEl.appendChild(btn);
  });

  bindNextBtn(container);
}

