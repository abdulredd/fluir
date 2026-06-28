/* ─── Fluir · ser-vs-estar ──────────────────────────────────────────────────── */

/** @import { LessonQuestion } from '../types.js' */

import { el } from '../dom.js';
import { renderGameShell, bindChoiceButtons } from './ui.js';

const VERB_FORMS = {
  estar: ['estoy', 'estás', 'está', 'estamos', 'estáis', 'están'],
  ser: ['soy', 'eres', 'es', 'somos', 'sois', 'son'],
};

/** Blank only conjugated forms of the target verb (keeps ser/estar in mixed sentences). */
export function blankTargetVerbForms(sentence, verb) {
  let display = sentence;
  for (const form of VERB_FORMS[verb]) {
    const re = new RegExp(`(^|\\s)(${form})(?=\\s|[.,?!;:]|$)`, 'gi');
    display = display.replace(re, '$1___');
  }
  return display;
}

/** Highlight the conjugated target-verb form in the full sentence (for feedback). */
export function highlightTargetVerbForm(sentence, verb) {
  for (const form of VERB_FORMS[verb]) {
    const re = new RegExp(`(^|\\s)(${form})(?=\\s|[.,?!;:]|$)`, 'i');
    if (re.test(sentence)) {
      return sentence.replace(re, '$1<span class="game-fill-em">$2</span>');
    }
  }
  return sentence;
}

export function gameSerVsEstar(container, question, onAnswer) {
  const { sentence, verb, use, en } = question;
  const displaySentence = blankTargetVerbForms(sentence, verb);

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
    prompt: 'Ser or estar? Choose the verb — not the conjugated form.',
    withChoices: false,
    middle: [
      el('div', { className: 'card lesson-translation--loose' },
        el('div', { className: 'game-sentence-display', text: displaySentence }),
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
      feedbackHtml: ok => {
        const completed = highlightTargetVerbForm(sentence, verb);
        const ruleHtml = `<div style="font-size:var(--text-xs);color:var(--color-purple);margin-top:6px;font-style:italic">${verb} — ${label}</div>`;
        return `${ok ? '✓' : '✗'} ${completed}${ruleHtml}`;
      },
      onAnswer: ok => onAnswer(ok, question),
    },
  );
}
