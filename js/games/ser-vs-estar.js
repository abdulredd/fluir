/* ─── Fluir · ser-vs-estar ──────────────────────────────────────────────────── */

/** @import { LessonQuestion } from '../types.js' */

import { el } from '../dom.js';
import { renderGameShell, bindChoiceButtons } from './ui.js';

export function gameSerVsEstar(container, question, onAnswer) {
  const { sentence, verb, use, en } = question;

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
    location: 'Estar — location', health: 'Estar — health', mood: 'Estar — changing mood/condition',
    taste: 'Estar — taste/appearance', description: 'Ser — description', profession: 'Ser — profession',
    origin: 'Ser — origin', identification: 'Ser — identification', material: 'Ser — material',
    possession: 'Ser — possession', event: 'Ser — event location',
  };

  const label = USE_LABELS[use] || verb;
  const choicesGrid = el('div', {
    id: 'choices',
    style: 'display:grid;grid-template-columns:1fr 1fr;gap:var(--space-3);margin-bottom:var(--space-4)',
  });

  const { feedback } = renderGameShell(container, {
    tagLabel: 'Ser vs Estar',
    tagClass: 'tag-grammar',
    tagStyle: 'margin-bottom:var(--space-3);background:var(--color-purple-bg);color:var(--color-purple);border-color:var(--color-purple)',
    prompt: 'Which verb completes this sentence?',
    withChoices: false,
    middle: [
      el('div', { className: 'card lesson-translation lesson-translation--loose' },
        el('div', {
          style: 'font-family:var(--font-serif);font-size:var(--text-lg);color:var(--color-amber);margin-bottom:var(--space-2);line-height:1.4',
          text: displaySentence,
        }),
        el('div', { className: 'lesson-translation', text: en }),
      ),
      choicesGrid,
    ],
  });

  bindChoiceButtons(container, choicesGrid, feedback,
    ['ser', 'estar'].map(v => ({ label: v, isCorrect: v === verb })),
    {
      optionClasses: [],
      optionStyle: 'text-align:center;font-family:var(--font-serif);font-size:var(--text-xl)',
      feedbackHtml: ok => `${ok ? '✓' : '✗'} <em>${verb}</em> — ${label}`,
      onAnswer: ok => onAnswer(ok, question),
    },
  );
}
