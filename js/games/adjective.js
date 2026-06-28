/* ─── Fluir · adjective ──────────────────────────────────────────────────── */

/** @import { LessonQuestion } from '../types.js' */

import { el } from '../dom.js';
import { shuffle, ADJ_RULES } from './shared.js';
import { renderGameShell, bindChoiceButtons } from './ui.js';

function getForm(adj, gender, number) {
  const base = adj.endsO ? adj.es.slice(0, -1) : adj.es;
  let form;
  if (adj.endsO) {
    form = gender === 'f' ? base + 'a' : base + 'o';
  } else {
    form = base;
  }
  if (number === 'pl') {
    if (adj.es === 'joven') return 'jóvenes';
    if (/z$/i.test(form)) return form.slice(0, -1) + 'ces';
    const endsVowel = /[aeiouáéíóú]$/i.test(form);
    form = endsVowel ? form + 's' : form + 'es';
  }
  return form;
}

function nounArticle(noun) {
  const plural = noun.number === 'pl';
  if (plural) return noun.gender === 'f' ? 'las' : 'los';
  return noun.gender === 'f' ? 'la' : 'el';
}

function nounDisplay(noun) {
  return noun.number === 'pl' ? (noun.plural || noun.es) : noun.es;
}

function wrongAdjForm(adjective, noun) {
  const number = noun.number || 'sg';
  if (adjective.endsO) {
    return getForm(adjective, noun.gender === 'f' ? 'm' : 'f', number);
  }
  const correct = getForm(adjective, noun.gender, number);
  if (number === 'pl') {
    return getForm(adjective, noun.gender, 'sg');
  }
  return correct.endsWith('s') ? correct.slice(0, -1) : correct + 's';
}

export function gameAdjectiveAgreement(container, question, onAnswer) {
  const { noun, adjective } = question;
  const number = noun.number || 'sg';

  const correctForm = getForm(adjective, noun.gender, number);
  const wrongForm   = wrongAdjForm(adjective, noun);

  const article = nounArticle(noun);
  const nounWord = nounDisplay(noun);
  const labels  = shuffle([correctForm, wrongForm].filter((v, i, a) => a.indexOf(v) === i));

  const { feedback, choicesEl } = renderGameShell(container, {
    tagLabel: 'Adjective agreement',
    tagClass: 'tag-grammar',
    prompt: number === 'pl' ? 'Choose the correct plural adjective form' : 'Choose the correct adjective form',
    middle: [
      el('div', { className: 'es-large', text: `${article} ${nounWord} ___` }),
      el('div', { className: 'lesson-translation lesson-translation--loose', text: `the ${noun.en} · ${adjective.en}` }),
    ],
  });

  bindChoiceButtons(container, choicesEl, feedback,
    labels.map(label => ({ label, isCorrect: label === correctForm })),
    {
      feedbackHtml: ok => {
        const phrase = `<em>${article} ${nounWord} ${correctForm}</em>`;
        if (ok) return `✓ Correct — ${phrase}`;
        const rule = number === 'pl'
          ? (/z$/i.test(adjective.es) ? ADJ_RULES.plural_z
            : adjective.endsO ? ADJ_RULES.plural_vowel : ADJ_RULES.plural_cons)
          : (adjective.endsO ? ADJ_RULES.a_fem : ADJ_RULES.invariable);
        return `✗ ${phrase} — ${rule}`;
      },
      onAnswer: ok => onAnswer(ok, question),
    },
  );
}

export { getForm as getAdjectiveForm };
