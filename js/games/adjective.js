/* ─── Fluir · adjective ──────────────────────────────────────────────────── */

/** @import { LessonQuestion } from '../types.js' */

import { el } from '../dom.js';
import { shuffle, ADJ_RULES } from './shared.js';
import { renderGameShell, bindChoiceButtons } from './ui.js';

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

  const article = noun.gender === 'm' ? 'el' : 'la';
  const labels  = shuffle([correctForm, wrongForm]);

  const { feedback, choicesEl } = renderGameShell(container, {
    tagLabel: 'Adjective agreement',
    tagClass: 'tag-grammar',
    prompt: 'Choose the correct adjective form',
    middle: [
      el('div', { className: 'es-large', text: `${article} ${noun.es} ___` }),
      el('div', { className: 'lesson-translation lesson-translation--loose', text: `the ${noun.en} · ${adjective.en}` }),
    ],
  });

  bindChoiceButtons(container, choicesEl, feedback,
    labels.map(label => ({ label, isCorrect: label === correctForm })),
    {
      feedbackHtml: ok => {
        const phrase = `<em>${article} ${noun.es} ${correctForm}</em>`;
        if (ok) return `✓ Correct — ${phrase}`;
        const rule = adjective.endsO ? ADJ_RULES.a_fem : ADJ_RULES.invariable;
        return `✗ ${phrase} — ${rule}`;
      },
      onAnswer: ok => onAnswer(ok, question),
    },
  );
}
