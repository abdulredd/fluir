/* ─── Fluir · Game shared helpers ─────────────────────────────────────────── */

import { GENDER_RULES, PLURAL_RULES, ADJ_RULES } from '../data/grammar-rules.js';
import { escapeHtml, shuffle } from '../utils.js';
import { setHtml } from '../dom.js';

function ruleText(ruleKey, rules = GENDER_RULES) {
  return rules[ruleKey] || 'Learn this word with its article.';
}

function wrongArticle(correct) {
  if (correct === 'el')  return 'la';
  if (correct === 'la')  return 'el';
  if (correct === 'un')  return 'una';
  if (correct === 'una') return 'un';
  if (correct === 'los') return 'las';
  if (correct === 'las') return 'los';
  if (correct === 'unos') return 'unas';
  if (correct === 'unas') return 'unos';
  return correct === 'el' ? 'la' : 'el';
}

/** @param {object} vocab @param {'m'|'f'|undefined} [targetGender] */
function resolveDefiniteArticle(vocab, targetGender) {
  if (vocab.article !== 'el/la') return vocab.article;
  if (targetGender === 'm') return 'el';
  if (targetGender === 'f') return 'la';
  return null;
}

function genderHintLabel(targetGender) {
  if (targetGender === 'm') return ' (male)';
  if (targetGender === 'f') return ' (female)';
  return '';
}

function bindNextBtn(container) {
  container.querySelector('#next-btn')?.addEventListener('click', () => {
    container.dispatchEvent(new CustomEvent('game:next'));
  });
}

function showNextBtn(container) {
  const btn = container.querySelector('#next-btn');
  if (btn) btn.classList.add('game-next-btn--visible');
}

function setFeedback(fb, html, kind) {
  setHtml(fb, html);
  fb.className = `feedback show ${kind}`;
  fb.setAttribute('aria-live', 'polite');
}

function feedbackCorrect(fb, html) { setFeedback(fb, html, 'correct'); }
function feedbackWrong(fb, html) { setFeedback(fb, html, 'wrong'); }

export {
  GENDER_RULES,
  PLURAL_RULES,
  ADJ_RULES,
  ruleText,
  wrongArticle,
  resolveDefiniteArticle,
  genderHintLabel,
  escapeHtml,
  shuffle,
  bindNextBtn,
  showNextBtn,
  feedbackCorrect,
  feedbackWrong,
};
