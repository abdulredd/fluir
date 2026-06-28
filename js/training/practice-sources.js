/* ─── Fluir · Practice source pools ────────────────────────────────────────
   Full item lists for Training Grounds — not the sliced lesson queue.
   ─────────────────────────────────────────────────────────────────────────── */

import { SUBLESSON_1 } from '../data/chapter1.js';
import { ALL_VERBS_CH5, conjugate as conjugateCh5 } from '../data/chapter5.js';
import { ALL_VERBS_CH6, conjugateIrr } from '../data/chapter6.js';
import { subjunctiveFromYo } from '../data/chapter13.js';
import {
  conjugateFromFormsMap,
  infinitivePair,
  uniqueConjForms,
  verbEnShort,
} from '../../pages/lesson/builder-utils.js';
import { CH3_ADJ_DRILL_PAIRS } from '../../pages/lesson/builders/ch3.js';

/** @typedef {{ key: string, es: string, en: string }} MatchingPair */

const PRONOUNS_5      = ['yo', 'tú', 'él/ella', 'nosotros', 'ellos'];
const PRONOUNS_5_EXT  = ['yo', 'tú', 'él/ella', 'nosotros', 'ellos', 'Ud.', 'Uds.'];
const PRONOUNS_6      = ['yo', 'tú', 'él/ella', 'nosotros', 'ellos'];
const PRONOUNS_6_EXT  = ['yo', 'tú', 'él/ella', 'nosotros', 'ellos', 'Ud.', 'Uds.'];
const PRONOUNS_STD    = ['yo', 'tú', 'él/ella', 'nosotros', 'ellos'];

const conjugateCh5Verb = (v, p) => conjugateCh5(v.stem, v.type, p);
const conjugateIrrVerb = (v, p) => conjugateIrr(v.forms, p);

const SENTENCE_DRILL_FIELDS = [
  'sentenceCompletionDrills',
  'estarDrills',
  'estarSceneDrills',
  'serDrills',
  'readingComprehensionDrills',
  'letterDrills',
  'mixedVerbDrills',
  'possessiveDrills',
  'demonstrativeDrills',
  'porVsParaDrills',
  'pronounDrills',
];

const CONJ_TABLE_VERB = {
  '2-2': 'estar',
  '2-3': 'ser',
  '7-1': 'ir',
};

/** @param {string} key @param {string} es @param {string} en @returns {MatchingPair} */
function pair(key, es, en) {
  return { key, es, en };
}

/** @param {object[]} items @param {(item: object) => { es: string, en: string }} mapPair */
function pairsFrom(items, mapPair, keyFn = (item, mapped) => item.id || item.es || mapped.es) {
  return (items || []).map(item => {
    const mapped = mapPair(item);
    return pair(String(keyFn(item, mapped)), mapped.es, mapped.en);
  });
}

function pairsFromVocab(items) {
  return pairsFrom(items, v => ({ es: v.es, en: v.en }));
}

function pairsFromInfinitives(items) {
  return pairsFrom(items, infinitivePair, v => v.infinitive || v.id);
}

function dedupePairs(pairs) {
  const seen = new Set();
  return pairs.filter(p => {
    if (seen.has(p.key)) return false;
    seen.add(p.key);
    return true;
  });
}

/** @param {import('../types.js').Sublesson} sl @returns {MatchingPair[]} */
function matchingPairsDefault(sl) {
  return pairsFromVocab(sl.vocabulary);
}

/** @type {Record<string, (sl: import('../types.js').Sublesson) => MatchingPair[]>} */
const MATCHING_EXTRACTORS = {
  '1-1': sl => pairsFrom(
    sl.vocabulary.filter(v => v.gender === 'm' || v.gender === 'f'),
    v => ({ es: `${v.article} ${v.es}`, en: v.en }),
  ),
  '1-2': sl => pairsFrom(sl.vocabulary, v => ({ es: `${v.indef} ${v.es}`, en: v.en })),
  '1-3': sl => pairsFromVocab(sl.adjectives),

  '2-2': sl => pairsFromVocab(sl.vocabulary.filter(v =>
    !['estar_conj', 'interrogative', 'adverb'].includes(v.rule),
  )),
  '2-3': sl => pairsFromVocab(sl.vocabulary.filter(v => v.article)),
  '2-4': sl => pairsFromVocab(sl.vocabulary.filter(v => v.article)),

  '3-1': sl => dedupePairs([
    ...pairsFromVocab(sl.vocabulary.filter(v => !v.article)),
    ...pairsFrom(sl.hayDrills, d => ({ es: d.es, en: d.en }), d => d.es),
    ...pairsFromVocab(sl.vocabulary.filter(v => v.article)),
  ]),
  '3-2': sl => dedupePairs([
    ...pairsFrom(sl.interrogativeQuestions, q => ({ es: q.word, en: q.en }), q => q.word),
    ...pairsFromVocab(sl.vocabulary),
  ]),
  '3-3': sl => pairsFromVocab(sl.vocabulary),
  '3-4': sl => dedupePairs([
    ...pairsFromVocab(sl.vocabulary.filter(v => v.article === 'el' || v.article === 'la')),
    ...pairsFromVocab(sl.vocabulary.filter(v => !v.article || v.article === '')),
  ]),

  '5-3': sl => dedupePairs([
    ...pairsFromInfinitives(sl.verbs),
    ...pairsFromVocab(sl.vocabulary.filter(v => v.article)),
  ]),
  '5-4': () => pairsFromInfinitives(ALL_VERBS_CH5),

  '6-4': () => pairsFromInfinitives(ALL_VERBS_CH6),

  '7-1': sl => dedupePairs([
    ...pairsFrom(sl.futureDrills, d => ({ es: d.sentence, en: d.en }), d => d.sentence),
    ...pairsFromVocab(sl.vocabulary.filter(v => v.article)),
  ]),
  '7-2': sl => dedupePairs([
    ...pairsFrom(sl.hacerExpressions, h => ({ es: h.es, en: h.en })),
    ...pairsFrom(sl.tenerExpressions, t => ({ es: t.es, en: t.en })),
  ]),
  '7-3': sl => pairsFrom(sl.idioms, id => ({ es: id.construction, en: id.en }), id => id.construction),

  '8-1': () => [
    pair('8-1:este', 'este/esta', 'this (near speaker)'),
    pair('8-1:ese', 'ese/esa', 'that (near listener)'),
    pair('8-1:aquel', 'aquel/aquella', 'that (far from both)'),
    pair('8-1:neuter', 'esto/eso/aquello', 'neuter (unknown object)'),
  ],
  '8-3': () => [
    pair('8-3:mas', 'más...que', 'more...than'),
    pair('8-3:menos', 'menos...que', 'less...than'),
    pair('8-3:tan', 'tan...como', 'as...as'),
    pair('8-3:el-mas', 'el/la más...de', 'the most...in/of'),
    pair('8-3:mejor', 'mejor', 'better (irregular)'),
    pair('8-3:peor', 'peor', 'worse (irregular)'),
    pair('8-3:mayor', 'mayor', 'older (irregular, people)'),
    pair('8-3:menor', 'menor', 'younger (irregular, people)'),
  ],

  '9-1': sl => dedupePairs([
    pair('9-1:algo', 'algo', 'something'),
    pair('9-1:nada', 'nada', 'nothing'),
    pair('9-1:alguien', 'alguien', 'someone'),
    pair('9-1:nadie', 'nadie', 'no one'),
    pair('9-1:siempre', 'siempre', 'always'),
    pair('9-1:nunca', 'nunca', 'never'),
    pair('9-1:tambien', 'también', 'also'),
    pair('9-1:tampoco', 'tampoco', 'neither'),
    ...pairsFromVocab(sl.vocabulary),
  ]),
  '9-3': () => [
    pair('9-3:para-recipient', 'para — recipient', 'El regalo es para ella.'),
    pair('9-3:para-purpose', 'para — purpose', 'Estudia para aprender.'),
    pair('9-3:por-duration', 'por — duration', 'Corro por una hora.'),
    pair('9-3:por-cause', 'por — cause', 'Triste por el mal clima.'),
  ],
  '9-4': sl => dedupePairs([
    ...pairsFrom(sl.locationPrepositions, l => ({ es: l.es, en: l.en })),
    ...pairsFrom(sl.porExpressions, e => ({ es: e.es, en: e.en })),
    ...pairsFromVocab(sl.vocabulary),
  ]),

  '10-1': sl => dedupePairs([
    ...pairsFrom(sl.pronounTable, p => ({ es: p.pronoun, en: p.en }), p => `pron:${p.pronoun}`),
    ...pairsFrom(sl.pronounTable, p => ({ es: p.clarifier, en: p.en }), p => `clar:${p.clarifier}`),
  ]),
  '10-2': sl => pairsFrom(sl.verbs, v => ({ es: v.es, en: v.en }), v => v.es),
  '10-4': sl => pairsFrom(sl.placementDrills, d => ({ es: d.beforeVerb, en: d.en }), d => d.beforeVerb),

  '11-2': sl => pairsFrom(sl.pronounTable, p => ({ es: p.pronoun, en: p.en }), p => p.pronoun),
  '11-3': () => [
    pair('11-3:lo', 'lo', 'him / it (masculine)'),
    pair('11-3:la', 'la', 'her / it (feminine)'),
    pair('11-3:los', 'los', 'them (masculine/mixed)'),
    pair('11-3:las', 'las', 'them (feminine)'),
  ],

  '12-3': sl => pairsFrom(sl.becomeExpressions, b => ({ es: b.es, en: b.en })),
  '12-4': sl => dedupePairs([
    ...pairsFromInfinitives(sl.movementVerbs),
    ...pairsFrom(sl.reciprocalVerbs, v => ({ es: v.es, en: v.en })),
  ]),

  '13-1': sl => pairsFrom(sl.irregularTables, v => ({
    es: v.infinitive,
    en: `subj: ${v.forms.yo}`,
  }), v => v.infinitive),
  '13-2': sl => pairsFrom(sl.impersonalExpressions, e => ({ es: e.es, en: e.en })),
  '13-3': sl => dedupePairs([
    ...pairsFrom(sl.emotionVerbs, v => ({ es: v.es, en: v.en })),
    ...pairsFrom(sl.commandVerbs, v => ({ es: v.es, en: v.en })),
  ]),
  '13-4': sl => pairsFrom(sl.conjunctions, c => ({ es: c.es, en: c.en })),

  '14-1': sl => dedupePairs([
    ...pairsFromInfinitives(sl.verbs),
    ...pairsFrom(sl.timeExpressions, t => ({ es: t.es, en: t.en })),
  ]),
  '14-2': sl => dedupePairs([
    ...pairsFrom(sl.arSpellingChanges, v => ({ es: v.infinitive, en: `yo: ${v.yo}` }), v => v.infinitive),
    ...pairsFrom(sl.erIrSpellingChanges, v => ({ es: v.infinitive, en: `él: ${v.forms.el}` }), v => v.infinitive),
  ]),
  '14-3': sl => pairsFromInfinitives([
    ...sl.verbGroups.uStem,
    ...sl.verbGroups.jStem,
    ...sl.verbGroups.iStem,
    ...sl.verbGroups.special,
  ]),
  '14-4': sl => dedupePairs([
    ...pairsFromInfinitives(sl.irStemChanges),
    ...pairsFrom(sl.compoundVerbs, v => ({
      es: v.infinitive,
      en: `${v.en} (like ${v.rootVerb})`,
    }), v => v.infinitive),
  ]),

  '15-2': sl => dedupePairs([
    ...pairsFrom(sl.uses, u => ({ es: u.use, en: u.signal }), u => u.use),
    ...pairsFrom(sl.signalWords, s => ({ es: s.es, en: `${s.en} → ${s.tense}` }), s => s.es),
  ]),
  '15-3': sl => pairsFrom(sl.contrastPairs, p => ({
    es: p.preterit,
    en: `preterit: ${p.signal.split(' vs ')[0]}`,
  }), p => p.preterit),
  '15-4': sl => pairsFrom(sl.doublePronouns, d => ({ es: d.combined, en: d.en }), d => d.combined),
};

/** @param {import('../types.js').Sublesson} sl @returns {MatchingPair[]} */
function matchingPairsForSublesson(sl) {
  const extract = MATCHING_EXTRACTORS[sl.id] || matchingPairsDefault;
  const pairs = extract(sl);
  if (pairs.length) return dedupePairs(pairs);
  if (sl.verbs?.length) return pairsFromInfinitives(sl.verbs);
  if (sl.adjectives?.length) return pairsFromVocab(sl.adjectives);
  return [];
}

/** @param {import('../types.js').Sublesson[]} sublessons @returns {MatchingPair[]} */
function getMatchingPairPool(sublessons) {
  return dedupePairs(sublessons.flatMap(sl => matchingPairsForSublesson(sl).map(p => ({
    ...p,
    key: `${sl.id}:${p.key}`,
  }))));
}

/** @param {import('../types.js').Sublesson[]} sublessons */
function collectVocabulary(sublessons) {
  return sublessons.flatMap(sl => sl.vocabulary || []);
}

/** @param {import('../types.js').Sublesson[]} sublessons */
function collectAdjectives(sublessons) {
  return sublessons.flatMap(sl => sl.adjectives || []);
}

/** @param {import('../types.js').Sublesson[]} sublessons */
function collectSentenceDrills(sublessons) {
  return sublessons.flatMap(sl =>
    SENTENCE_DRILL_FIELDS.flatMap(field =>
      (sl[field] || []).map(drill => ({ sublessonId: sl.id, drill })),
    ),
  );
}

/** @param {import('../types.js').Sublesson[]} sublessons */
function collectSerVsEstar(sublessons) {
  return sublessons.flatMap(sl =>
    (sl.serVsEstarQuestions || []).map(q => ({ sublessonId: sl.id, question: q })),
  );
}

/** @param {import('../types.js').Sublesson[]} sublessons */
function collectNumberQuizDrills(sublessons) {
  const out = [];
  for (const sl of sublessons) {
    for (const d of sl.numberDrills || []) {
      out.push({ sublessonId: sl.id, mode: 'numeral-to-word', drill: d, pool: sl.numberDrills });
    }
    for (const d of sl.numberDrills || []) {
      out.push({ sublessonId: sl.id, mode: 'word-to-numeral', drill: d, pool: sl.numberDrills });
    }
    for (const d of sl.ordinalDrills || []) {
      out.push({
        sublessonId: sl.id,
        mode: 'numeral-to-word',
        drill: { numeral: d.numeral, spanish: d.masculine },
        pool: sl.ordinalDrills.map(x => ({ numeral: x.numeral, spanish: x.masculine })),
      });
    }
    for (const d of sl.dateDrills || []) {
      out.push({ sublessonId: sl.id, mode: 'numeral-to-word', drill: d, pool: sl.dateDrills });
    }
    for (const d of sl.timeDrills || []) {
      out.push({ sublessonId: sl.id, mode: 'time-to-spanish', drill: d, pool: sl.timeDrills });
    }
    for (const d of sl.adverbDrills || []) {
      out.push({
        sublessonId: sl.id,
        mode: 'numeral-to-word',
        drill: { numeral: d.adjective, spanish: d.adverb },
        pool: sl.adverbDrills.map(x => ({ numeral: x.adjective, spanish: x.adverb })),
      });
    }
  }
  return out;
}

/** @param {object} v @returns {string} */
function vocabKey(v) {
  return v.id || v.es || v.infinitive || '';
}

function toAdjGame(v) {
  return { es: v.es, en: v.en.split('/')[0].trim(), endsO: v.rule === 'ends_o' || v.endsO === true };
}

function toNounGame(v, number = 'sg') {
  return {
    es: v.es,
    plural: v.plural,
    en: v.en.split('/')[0].trim(),
    gender: v.gender,
    number,
  };
}

/** @param {import('../types.js').Sublesson[]} sublessons */
function collectAdjectiveItems(sublessons) {
  const out = [];
  for (const sl of sublessons) {
    if (sl.id === '1-3') {
      const nounPool = SUBLESSON_1.vocabulary.filter(v =>
        v.plural && (v.gender === 'm' || v.gender === 'f'),
      );
      for (const adj of sl.adjectives || []) {
        for (const noun of nounPool) {
          out.push({
            key: `${sl.id}:${adj.id}:${noun.id}`,
            noun: toNounGame(noun, 'sg'),
            adjective: adj,
          });
        }
      }
    } else if (sl.id === '3-4') {
      const byId = Object.fromEntries((sl.vocabulary || []).map(v => [v.id, v]));
      for (const [nounId, adjId] of CH3_ADJ_DRILL_PAIRS) {
        const nounV = byId[nounId];
        const adjV = byId[adjId];
        if (!nounV || !adjV) continue;
        out.push({
          key: `${sl.id}:${nounId}:${adjId}`,
          noun: toNounGame(nounV),
          adjective: toAdjGame(adjV),
        });
      }
    }
  }
  return out;
}

/**
 * @param {object} config
 * @param {import('../types.js').Sublesson} sl
 */
function expandVerbConjugation(config, sl) {
  const verbs = config.verbs(sl);
  const pronouns = config.pronouns;
  const formPronouns = config.formPronouns || pronouns;
  const items = [];
  for (const v of verbs) {
    const allForms = formPronouns.map(p => ({ pronoun: p, form: config.conjugate(v, p) }));
    const uniqueForms = uniqueConjForms(allForms);
    for (const pronoun of pronouns) {
      items.push({
        key: `${sl.id}:${v.infinitive}:${pronoun}`,
        question: {
          type: 'conjugation',
          pronoun,
          correctForm: config.conjugate(v, pronoun),
          verb: v.infinitive + (config.verbSuffix || ''),
          en: config.enFor ? config.enFor(v, pronoun) : `${pronoun} ${verbEnShort(v)}`,
          allForms: uniqueForms,
        },
      });
    }
  }
  return items;
}

/**
 * @param {import('../types.js').Sublesson} sl
 */
function expandFormsMapConjugation(sl, { pronouns = PRONOUNS_STD, verbSuffix = '', enFor } = {}) {
  const items = [];
  for (const v of sl.verbs || []) {
    const allForms = pronouns.map(p => ({ pronoun: p, form: conjugateFromFormsMap(v, p) }));
    const uniqueForms = uniqueConjForms(allForms);
    for (const pronoun of pronouns) {
      items.push({
        key: `${sl.id}:${v.infinitive}:${pronoun}`,
        question: {
          type: 'conjugation',
          pronoun,
          correctForm: conjugateFromFormsMap(v, pronoun),
          verb: v.infinitive + verbSuffix,
          en: enFor ? enFor(v, pronoun) : `${pronoun} ${verbEnShort(v)}`,
          allForms: uniqueForms,
        },
      });
    }
  }
  return items;
}

/** @param {import('../types.js').Sublesson[]} sublessons */
function collectConjugationItems(sublessons) {
  const items = [];
  for (const sl of sublessons) {
    const tableVerb = CONJ_TABLE_VERB[sl.id];
    if (tableVerb && sl.conjugations?.length) {
      const allForms = sl.conjugations.map(c => ({ pronoun: c.pronoun, form: c.form }));
      for (const c of sl.conjugations) {
        items.push({
          key: `${sl.id}:${tableVerb}:${c.pronoun}`,
          question: {
            type: 'conjugation',
            pronoun: c.pronoun,
            correctForm: c.form,
            verb: tableVerb,
            en: c.en,
            allForms,
          },
        });
      }
    }

    if (sl.formationDrills?.length) {
      for (const d of sl.formationDrills) {
        const verbForms = sl.formationDrills
          .filter(x => x.infinitive === d.infinitive)
          .map(x => ({ pronoun: x.pronoun, form: x.subjunctive }));
        const allForms = verbForms.length >= 3 ? verbForms :
          PRONOUNS_STD.map(p => ({
            pronoun: p,
            form: subjunctiveFromYo(d.indicativeYo, d.type, p),
          }));
        items.push({
          key: `${sl.id}:${d.infinitive}:${d.pronoun}`,
          question: {
            type: 'conjugation',
            pronoun: d.pronoun,
            correctForm: d.subjunctive,
            verb: `${d.infinitive} (subjunctive)`,
            en: `${d.pronoun} ${d.infinitive}`,
            allForms,
          },
        });
      }
    }

    if (sl.idioms?.length) {
      for (const idiom of sl.idioms) {
        const allForms = idiom.conjugations.map(c => ({ pronoun: c.pronoun, form: c.form }));
        for (const conj of idiom.conjugations) {
          items.push({
            key: `${sl.id}:${idiom.construction}:${conj.pronoun}`,
            question: {
              type: 'conjugation',
              pronoun: conj.pronoun,
              correctForm: conj.form,
              verb: idiom.construction,
              en: `${conj.pronoun} ${idiom.en}`,
              allForms,
            },
          });
        }
      }
    }

    const ch5Like = ['5-1', '5-2', '5-3', '7-4'].includes(sl.id);
    if (ch5Like && sl.verbs?.length) {
      items.push(...expandVerbConjugation({
        verbs: s => s.verbs,
        pronouns: PRONOUNS_5,
        conjugate: conjugateCh5Verb,
        enFor: (v, p) => `${p} ${v.en.replace('to ', '')}`,
      }, sl));
    }
    if (sl.id === '5-4') {
      items.push(...expandVerbConjugation({
        verbs: () => ALL_VERBS_CH5,
        pronouns: PRONOUNS_5_EXT,
        formPronouns: PRONOUNS_5,
        conjugate: conjugateCh5Verb,
        enFor: (v, p) => `${p} ${verbEnShort(v)}`,
      }, sl));
    }

    const ch6Like = ['6-1', '6-2', '6-3'].includes(sl.id);
    if (ch6Like && sl.verbs?.length) {
      items.push(...expandVerbConjugation({
        verbs: s => s.verbs,
        pronouns: PRONOUNS_6,
        conjugate: conjugateIrrVerb,
        enFor: (v, p) => `${p} ${verbEnShort(v)}`,
      }, sl));
    }
    if (sl.id === '6-4') {
      items.push(...expandVerbConjugation({
        verbs: () => ALL_VERBS_CH6,
        pronouns: PRONOUNS_6_EXT,
        formPronouns: PRONOUNS_6,
        conjugate: conjugateIrrVerb,
        enFor: (v, p) => `${p} ${verbEnShort(v)}`,
      }, sl));
    }

    const ch10Like = ['10-3', '11-4'].includes(sl.id);
    if (ch10Like && sl.verbs?.length) {
      items.push(...expandVerbConjugation({
        verbs: s => s.verbs,
        pronouns: PRONOUNS_STD,
        conjugate: conjugateIrrVerb,
        enFor: (v, p) => `${p} ${verbEnShort(v)}`,
      }, sl));
    }

    const formsMapPreterit = ['12-1', '12-3', '14-1', '14-3'].includes(sl.id);
    if (formsMapPreterit && sl.verbs?.length) {
      items.push(...expandFormsMapConjugation(sl, {
        verbSuffix: sl.id.startsWith('14') ? ' (preterit)' : '',
        enFor: (v, p) => `${p} ${verbEnShort(v)}`,
      }));
    }

    if (sl.id === '14-4' && sl.irStemChanges?.length) {
      items.push(...expandFormsMapConjugation({ ...sl, verbs: sl.irStemChanges }, {
        verbSuffix: ' (preterit)',
        enFor: (v, p) => `${p} ${verbEnShort(v)}`,
      }));
    }

    if (sl.id === '15-1' && sl.verbs?.length) {
      items.push(...expandFormsMapConjugation(sl, {
        verbSuffix: ' (imperfect)',
      }));
    }
  }
  return items;
}

/** @param {import('../types.js').Sublesson[]} sublessons @param {string} gameType @returns {boolean} */
function hasPracticePool(sublessons, gameType) {
  switch (gameType) {
    case 'matching':             return getMatchingPairPool(sublessons).length > 0;
    case 'vocab-picker':
    case 'article-picker':
    case 'fill-article':
    case 'translation':          return collectVocabulary(sublessons).length > 0;
    case 'plural-picker':        return collectVocabulary(sublessons).some(v => v.plural);
    case 'adjective':            return collectAdjectiveItems(sublessons).length > 0;
    case 'conjugation':          return collectConjugationItems(sublessons).length > 0;
    case 'ser-vs-estar':         return collectSerVsEstar(sublessons).length > 0;
    case 'sentence-completion':  return collectSentenceDrills(sublessons).length > 0;
    case 'number-quiz':          return collectNumberQuizDrills(sublessons).length > 0;
    default:                     return false;
  }
}

export {
  getMatchingPairPool,
  collectVocabulary,
  collectAdjectives,
  collectSentenceDrills,
  collectSerVsEstar,
  collectNumberQuizDrills,
  collectAdjectiveItems,
  collectConjugationItems,
  hasPracticePool,
  vocabKey,
  toAdjGame,
  toNounGame,
};
