/* ─── Fluir · Vocabulary card display ───────────────────────────────────────
   Pure formatters for browse-vocabulary flip cards.
   ─────────────────────────────────────────────────────────────────────────── */

const VOCAB_DIRECTION = {
  ES_EN: 'es-en',
  EN_ES: 'en-es',
};

const DEFAULT_VOCAB_DIRECTION = VOCAB_DIRECTION.ES_EN;

/** Noun-classification rules on items in the mixed `vocabulary` array. */
const NOUN_VOCAB_RULES = new Set([
  'ends_o', 'ends_a', 'ends_e', 'masc_irreg', 'fem_irreg',
  'masc_a_excep', 'fem_o_excep', 'ista_gender', 'nte_gender',
  'ends_cion', 'ends_sion', 'ends_ion', 'ends_dad', 'ends_tad', 'ends_tud',
]);

/** Single-word prepositions stored as invariable vocabulary. */
const INVARIABLE_PREPOSITIONS = new Set([
  'contra', 'durante', 'entre', 'hasta', 'según', 'sobre', 'desde', 'hacia', 'sin',
]);

/** Adverbs / indefinite words tagged invariable in later chapters. */
const INVARIABLE_ADVERBS = new Set([
  'nada', 'nadie', 'nunca', 'jamás', 'algo', 'alguien', 'siempre', 'también', 'tampoco',
  'a veces', 'cada', 'bastante',
]);

/** Adjectives that live in the vocabulary array (chapter 3). */
const VOCAB_ARRAY_ADJECTIVES = new Set([
  'amable', 'dulce', 'elegante', 'emocionante', 'especial', 'fiel', 'libre', 'suave',
]);

/** Month names stored without an article in chapter data. */
const MONTH_NAMES = new Set([
  'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre',
]);

/** Stable section order when splitting the mixed `vocabulary` bucket. */
const BROWSE_SECTION_ORDER = [
  'pronouns', 'question-words', 'verb-forms', 'nouns', 'adjectives',
  'adverbs', 'conjunctions', 'prepositions', 'phrases', 'expressions', 'other',
];

/** Labels for browse sections derived from word type (within `vocabulary`). */
const VOCAB_BROWSE_LABELS = {
  pronouns:       'Pronouns',
  'question-words': 'Question words',
  'verb-forms':   'Verb forms',
  nouns:          'Nouns',
  adjectives:     'Adjectives',
  adverbs:        'Adverbs',
  conjunctions:   'Conjunctions',
  prepositions:   'Prepositions',
  phrases:        'Phrases',
  expressions:    'Expressions',
  other:          'Other',
};

/** Labels for browse-vocabulary sections (by data array key). */
const VOCAB_SECTION_LABELS = {
  vocabulary:           'Nouns',
  adjectives:           'Adjectives',
  verbs:                'Verbs',
  idioms:               'Phrases',
  tenerExpressions:     'Tener Expressions',
  hacerExpressions:     'Hacer Expressions',
  locationPrepositions: 'Prepositions',
  porExpressions:       'Por Expressions',
  becomeExpressions:    'Become Expressions',
  movementVerbs:        'Movement Verbs',
  reciprocalVerbs:      'Reciprocal Verbs',
  impersonalExpressions:'Impersonal Expressions',
  emotionVerbs:         'Emotion Verbs',
  commandVerbs:         'Command Verbs',
  conjunctions:         'Conjunctions',
  readingVocab:         'Reading Vocabulary',
};

/** @param {unknown} value */
function normalizeVocabDirection(value) {
  return value === VOCAB_DIRECTION.EN_ES ? VOCAB_DIRECTION.EN_ES : VOCAB_DIRECTION.ES_EN;
}

/** @param {string} arrayKey */
function vocabSectionLabel(arrayKey) {
  return VOCAB_SECTION_LABELS[arrayKey] || 'Words';
}

/** @param {string} category */
function vocabBrowseSectionLabel(category) {
  return VOCAB_BROWSE_LABELS[category] || 'Words';
}

/**
 * Browse section for one item in the mixed `vocabulary` array.
 * @param {object} item
 */
function hasVocabArticle(item) {
  const art = item.article;
  return art === 'el' || art === 'la' || art === 'un' || art === 'una' || art === 'el/la';
}

/** True when a vocabulary-array item is a noun (not an adjective sharing ends_o rules). */
function isVocabArrayNoun(item) {
  if (hasVocabArticle(item)) return true;
  if (MONTH_NAMES.has(item.es)) return true;
  return false;
}

function vocabBrowseCategory(item) {
  const rule = item.rule || '';

  if (rule === 'pronoun') return 'pronouns';
  if (rule === 'interrogative') return 'question-words';
  if (rule === 'estar_conj' || rule === 'ser_conj') return 'verb-forms';
  if (rule === 'adverb') return 'adverbs';
  if (rule === 'conjunction') return 'conjunctions';
  if (rule === 'phrase') return 'phrases';
  if (NOUN_VOCAB_RULES.has(rule)) {
    return isVocabArrayNoun(item) ? 'nouns' : 'adjectives';
  }
  if (!rule && hasVocabArticle(item)) return 'nouns';

  if (rule === 'invariable') {
    const es = item.es || '';
    if (es.includes(' ') && es.endsWith(' de')) return 'prepositions';
    if (INVARIABLE_PREPOSITIONS.has(es)) return 'prepositions';
    if (es === 'hay' || es === 'no hay') return 'expressions';
    if (INVARIABLE_ADVERBS.has(es)) return 'adverbs';
    if (VOCAB_ARRAY_ADJECTIVES.has(es)) return 'adjectives';
    return 'other';
  }

  return 'other';
}

/**
 * Singular definite article for browse cards (never un/una).
 * @param {object} item
 */
function definiteSingularArticle(item) {
  const art = item.article;
  if (art === 'el' || art === 'la' || art === 'el/la') return art;
  if (art === 'un') return 'el';
  if (art === 'una') return 'la';
  if (item.gender === 'm') return 'el';
  if (item.gender === 'f') return 'la';
  if (item.gender === 'n') return 'el/la';
  return '';
}

/**
 * Plural definite article for browse cards.
 * @param {object} item
 */
function definitePluralArticle(item) {
  if (item.gender === 'f') return 'las';
  if (item.gender === 'm') return 'los';
  if (item.gender === 'n') return 'los/las';
  return 'los';
}

/** @param {object} adj */
function adjectiveMasculineForm(adj) {
  return adj.es || '';
}

/** @param {object} adj */
function adjectiveEndsO(adj) {
  return adj.endsO === true || adj.rule === 'ends_o';
}

/** @param {object} adj */
function adjectiveFeminineForm(adj) {
  if (!adjectiveEndsO(adj)) return adj.es || '';
  const base = (adj.es || '').slice(0, -1);
  return base + 'a';
}

/**
 * Remove a leading Spanish article so we don't double up when formatting browse cards.
 * @param {string} text
 */
function stripLeadingArticle(text) {
  if (!text) return '';
  return text.replace(/^(el|la|los|las|un|una|unos|unas)\s+/i, '').trim();
}

/**
 * @param {object} item
 * @returns {{ text: string, sub: string, lang: 'es'|'en' }}
 */
function nounSpanishDisplay(item) {
  const word = stripLeadingArticle(item.es || '');
  const art = definiteSingularArticle(item);
  const text = art ? `${art} ${word}` : (item.es || '');

  let sub = '';
  if (item.plural) {
    const plArt = definitePluralArticle(item);
    const plWord = stripLeadingArticle(item.plural);
    sub = `${plArt} ${plWord}`;
  }

  return { text, sub, lang: 'es' };
}

/**
 * @param {object} item
 * @returns {{ text: string, sub: string, lang: 'es'|'en' }}
 */
function adjectiveSpanishDisplay(item) {
  const masc = adjectiveMasculineForm(item);
  const fem = adjectiveFeminineForm(item);
  return {
    text: masc,
    sub: fem !== masc ? fem : '',
    lang: 'es',
  };
}

/**
 * @param {object} item
 * @returns {{ text: string, sub: string, lang: 'es'|'en' }}
 */
function verbSpanishDisplay(item) {
  return { text: item.infinitive || item.es || '', sub: '', lang: 'es' };
}

/**
 * @param {object} item
 * @returns {{ text: string, sub: string, lang: 'es'|'en' }}
 */
function plainSpanishDisplay(item) {
  return { text: item.es || item.infinitive || '', sub: '', lang: 'es' };
}

/**
 * @param {object} item
 * @param {string} [arrayKey]
 * @returns {{ text: string, sub: string, lang: 'es'|'en' }}
 */
function spanishDisplay(item, arrayKey) {
  if (arrayKey === 'adjectives') return adjectiveSpanishDisplay(item);
  if (arrayKey === 'verbs' || arrayKey === 'movementVerbs' || arrayKey === 'reciprocalVerbs'
      || arrayKey === 'emotionVerbs' || arrayKey === 'commandVerbs') {
    return verbSpanishDisplay(item);
  }
  if (arrayKey === 'vocabulary') {
    const category = vocabBrowseCategory(item);
    if (category === 'nouns') return nounSpanishDisplay(item);
    if (category === 'adjectives') return adjectiveSpanishDisplay(item);
    return plainSpanishDisplay(item);
  }
  if (item.gender || item.article) return nounSpanishDisplay(item);
  return plainSpanishDisplay(item);
}

/**
 * @param {object} item
 * @returns {{ text: string, sub: string, lang: 'es'|'en' }}
 */
function englishDisplay(item) {
  return { text: item.en || '', sub: '', lang: 'en' };
}

/**
 * Front/back faces for a flip card.
 * @param {object} item
 * @param {string} [direction]
 * @param {string} [arrayKey]
 */
function vocabFaces(item, direction, arrayKey) {
  const es = spanishDisplay(item, arrayKey);
  const en = englishDisplay(item);
  if (normalizeVocabDirection(direction) === VOCAB_DIRECTION.EN_ES) {
    return { front: en, back: es };
  }
  return { front: es, back: en };
}

/** @param {string} [direction] */
function vocabBrowseHint(direction) {
  return normalizeVocabDirection(direction) === VOCAB_DIRECTION.EN_ES
    ? 'Tap a card to see the Spanish.'
    : 'Tap a card to see the English.';
}

export {
  VOCAB_DIRECTION,
  DEFAULT_VOCAB_DIRECTION,
  VOCAB_SECTION_LABELS,
  BROWSE_SECTION_ORDER,
  normalizeVocabDirection,
  vocabSectionLabel,
  vocabBrowseSectionLabel,
  vocabBrowseCategory,
  definiteSingularArticle,
  definitePluralArticle,
  adjectiveMasculineForm,
  adjectiveFeminineForm,
  nounSpanishDisplay,
  adjectiveSpanishDisplay,
  spanishDisplay,
  englishDisplay,
  vocabFaces,
  vocabBrowseHint,
};
