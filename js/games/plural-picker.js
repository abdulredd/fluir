/* ─── Fluir · plural-picker ──────────────────────────────────────────────────── */

/** @import { LessonQuestion } from '../types.js' */

import { el } from '../dom.js';
import { ruleText, shuffle, PLURAL_RULES } from './shared.js';
import { renderGameShell, bindChoiceButtons, skipToNext } from './ui.js';

export function gamePluralPicker(container, question, onAnswer) {
  const { vocab } = question;
  const correct = vocab.plural;

  if (!correct) { skipToNext(container); return; }

  const endsVowel = /[aeiouáéíóú]$/i.test(vocab.es);
  const wrong = endsVowel ? vocab.es + 'es' : vocab.es + 's';

  if (wrong === correct) { skipToNext(container); return; }

  let pluralArticle = 'los';
  if (vocab.gender === 'f') pluralArticle = 'las';
  else if (vocab.article === 'una' || vocab.indef === 'una') pluralArticle = 'las';

  const singularArticle = vocab.indef || vocab.article || '';
  const correctLabel = `${pluralArticle} ${correct}`;

  const options = shuffle([correct, wrong]).map(opt => ({
    label: `${pluralArticle} ${opt}`,
    isCorrect: opt === correct,
  }));

  const { feedback, choicesEl } = renderGameShell(container, {
    tagLabel: 'Plural form',
    tagClass: 'tag-grammar',
    prompt: 'What is the plural of…',
    middle: [
      el('div', { style: 'display:flex;align-items:baseline;gap:var(--space-2);margin-bottom:var(--space-2)' },
        el('span', { style: 'font-size:var(--text-sm);color:var(--text-muted)', text: singularArticle }),
        el('span', { className: 'es-large', text: vocab.es }),
      ),
      el('div', { className: 'lesson-translation lesson-translation--loose', text: vocab.en }),
    ],
  });

  bindChoiceButtons(container, choicesEl, feedback, options, {
    feedbackHtml: ok => {
      if (ok) return `✓ Correct — <em>${correctLabel}</em>`;
      const ruleKey = vocab.rule?.includes('cion') ? 'cion_plural'
        : pluralArticle === 'las' ? (endsVowel ? 'vowel_fem' : 'cons_fem')
        : (endsVowel ? 'vowel_masc' : 'cons_masc');
      return `✗ <em>${correctLabel}</em> — ${ruleText(ruleKey, PLURAL_RULES)}`;
    },
    onAnswer: ok => onAnswer(ok, question),
  });
}
