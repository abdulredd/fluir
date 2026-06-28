/* ─── Fluir · Audio — Web Speech pronunciation ─────────────────────────────
   Uses the browser Speech Synthesis API (no server, works on static Netlify).
   Spanish voice when available; gated by settings.audioEnabled in lessons.
   ─────────────────────────────────────────────────────────────────────────── */

import Store from './store.js';

/** Flip to true once audio source + scope are decided. UI stays hidden while false. */
const AUDIO_FEATURE_ENABLED = false;

const SPEAKER_ICON = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 010 7.07"/><path d="M19.07 4.93a10 10 0 010 14.14"/></svg>`;

let spanishVoice = null;

function pickSpanishVoice() {
  if (typeof speechSynthesis === 'undefined') return;
  const voices = speechSynthesis.getVoices();
  spanishVoice =
    voices.find(v => v.lang === 'es-ES') ||
    voices.find(v => v.lang.startsWith('es-')) ||
    voices.find(v => v.lang.startsWith('es')) ||
    null;
}

if (typeof speechSynthesis !== 'undefined') {
  pickSpanishVoice();
  speechSynthesis.addEventListener('voiceschanged', pickSpanishVoice);
}

function isAudioFeatureEnabled() {
  return AUDIO_FEATURE_ENABLED;
}

function isSpeechSupported() {
  return typeof speechSynthesis !== 'undefined' && typeof SpeechSynthesisUtterance !== 'undefined';
}

function isAudioEnabled() {
  if (!AUDIO_FEATURE_ENABLED) return false;
  return Store.getSettings().audioEnabled !== false;
}

/**
 * Speak Spanish text. Respects audioEnabled unless force is true (settings preview).
 */
function speakSpanish(text, { force = false } = {}) {
  if (!AUDIO_FEATURE_ENABLED) return false;
  const phrase = (text || '').trim();
  if (!phrase || !isSpeechSupported()) return false;
  if (!force && !isAudioEnabled()) return false;

  speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(phrase);
  utterance.lang  = spanishVoice?.lang || 'es-ES';
  utterance.rate  = 0.92;
  if (spanishVoice) utterance.voice = spanishVoice;
  speechSynthesis.speak(utterance);
  return true;
}

function vocabPhrase(vocab) {
  if (!vocab) return '';
  const es = vocab.es || vocab.infinitive || '';
  if (!es) return '';
  const art = vocab.article && vocab.article !== 'el/la' ? `${vocab.article} ` : '';
  return `${art}${es}`.trim();
}

/** Best Spanish phrase to read aloud for a quiz question. */
function spanishFromQuestion(q) {
  if (!q?.type) return '';

  switch (q.type) {
    case 'article-picker':
    case 'fill-article':
    case 'plural-picker':
    case 'vocab-picker':
    case 'translation':
      return vocabPhrase(q.vocab);
    case 'conjugation':
      return q.correctForm ? `${q.pronoun} ${q.correctForm}`.replace(/\s+/g, ' ').trim() : '';
    case 'ser-vs-estar':
      return q.sentence || '';
    case 'number-quiz':
      return q.spanish || '';
    case 'sentence-completion':
      if (q.sentence && q.fills?.length) {
        return q.fills.reduce((s, fill) => s.replace('___', fill), q.sentence);
      }
      return (q.sentence || '').replace(/___/g, '').replace(/\s+/g, ' ').trim();
    case 'adjective': {
      const { noun, adjective } = q;
      if (!noun?.es || !adjective?.es) return noun?.es || '';
      const art = noun.gender === 'm' ? 'el' : 'la';
      return `${art} ${noun.es}`;
    }
    case 'matching':
      return '';
    default:
      return '';
  }
}

/** Listen control + optional auto-play after each question renders. */
function setupQuestionAudio(container, question) {
  if (!AUDIO_FEATURE_ENABLED || !isSpeechSupported() || !isAudioEnabled()) return;

  const text = spanishFromQuestion(question);
  if (!text) return;

  const row = document.createElement('div');
  row.className = 'speak-row';

  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'btn btn--ghost btn--sm speak-btn';
  btn.setAttribute('aria-label', `Listen: ${text}`);
  btn.innerHTML = `${SPEAKER_ICON}<span>Listen</span>`;
  btn.addEventListener('click', () => speakSpanish(text, { force: true }));

  row.appendChild(btn);

  const anchor = container.querySelector('.game-prompt');
  if (anchor?.parentNode) {
    anchor.parentNode.insertBefore(row, anchor.nextSibling);
  } else {
    container.prepend(row);
  }

  requestAnimationFrame(() => speakSpanish(text));
}

export {
  speakSpanish,
  setupQuestionAudio,
  spanishFromQuestion,
  isSpeechSupported,
  isAudioEnabled,
  isAudioFeatureEnabled,
  AUDIO_FEATURE_ENABLED,
};
