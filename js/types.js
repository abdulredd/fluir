/* ─── Fluir · Shared JSDoc types ───────────────────────────────────────────
   Documentation-only module — not imported at runtime.
   Reference in other files via: @import { … } from '../js/types.js'
   ─────────────────────────────────────────────────────────────────────────── */

/**
 * @typedef {object} ChapterMeta
 * @property {number} id
 * @property {string} title
 * @property {boolean} hasContent
 */

/**
 * @typedef {object} VocabItem
 * @property {string} [id]
 * @property {string} [es]
 * @property {string} [infinitive]
 * @property {string} [en]
 * @property {string} [article]
 * @property {string} [indef]
 * @property {'m'|'f'|'n'} [gender]
 * @property {string} [plural]
 * @property {string} [rule]
 * @property {string} [ex]
 * @property {string} [exEn]
 * @property {string} [example]
 */

/**
 * @typedef {object} RuleExample
 * @property {string} es
 * @property {string} en
 * @property {string} [note]
 */

/**
 * @typedef {object} Rule
 * @property {string} [id]
 * @property {string} heading
 * @property {string} body
 * @property {RuleExample[]} examples
 * @property {string} [tip]
 */

/**
 * Sublesson data — only the vocab arrays present in chapter data are set.
 * @typedef {object} Sublesson
 * @property {string} id
 * @property {number} chapterId
 * @property {string} title
 * @property {string} subtitle
 * @property {Rule[]} [rules]
 * @property {VocabItem[]} [vocabulary]
 * @property {VocabItem[]} [adjectives]
 * @property {VocabItem[]} [verbs]
 * @property {VocabItem[]} [readingVocab]
 * @property {object[]} [conjugations]
 * @property {object[]} [serVsEstarQuestions]
 * @property {object[]} [sentenceCompletionDrills]
 */

/**
 * @typedef {object} Chapter
 * @property {number} id
 * @property {string} title
 * @property {Sublesson[]} sublessons
 */

/**
 * Running score for the current chapter session.
 * @typedef {object} SessionScore
 * @property {number} correct
 * @property {number} total
 */

/**
 * Persisted mid-lesson resume state (see Store.saveLessonState).
 * @typedef {object} LessonState
 * @property {number} subIndex
 * @property {number} qIndex
 * @property {LessonQuestion[]} questions
 * @property {number} sessionCorrect
 * @property {number} sessionTotal
 * @property {number} savedAt
 */

/**
 * @typedef {object} VocabQuestion
 * @property {'article-picker'|'fill-article'|'translation'|'plural-picker'} type
 * @property {VocabItem} vocab
 */

/**
 * @typedef {object} MatchingQuestion
 * @property {'matching'} type
 * @property {{ es: string, en: string }[]} pairs
 */

/**
 * @typedef {object} AdjectiveQuestion
 * @property {'adjective'} type
 * @property {{ es: string, en: string, gender: string }} noun
 * @property {object} adjective
 */

/**
 * @typedef {object} ConjugationQuestion
 * @property {'conjugation'} type
 * @property {string} pronoun
 * @property {string} correctForm
 * @property {string} verb
 * @property {string} en
 * @property {{ pronoun: string, form: string }[]} allForms
 */

/**
 * @typedef {object} SerVsEstarQuestion
 * @property {'ser-vs-estar'} type
 * @property {string} sentence
 * @property {'ser'|'estar'} verb
 * @property {string} use
 * @property {string} en
 */

/**
 * @typedef {object} NumberQuizQuestion
 * @property {'number-quiz'} type
 * @property {'numeral-to-word'|'word-to-numeral'|'time-to-spanish'} mode
 * @property {string|number} numeral
 * @property {string} spanish
 * @property {string[]} distractors
 */

/**
 * @typedef {object} SentenceCompletionQuestion
 * @property {'sentence-completion'} type
 * @property {string} sentence
 * @property {string} answer
 * @property {string[]} choices
 * @property {string[]} [fills]
 * @property {string} en
 * @property {string} [rule]
 */

/**
 * @typedef {object} VocabPickerQuestion
 * @property {'vocab-picker'} type
 * @property {VocabItem} vocab
 * @property {string[]} [distractors]
 */

/**
 * @typedef {VocabQuestion|MatchingQuestion|AdjectiveQuestion|ConjugationQuestion|SerVsEstarQuestion|NumberQuizQuestion|SentenceCompletionQuestion|VocabPickerQuestion} LessonQuestion
 */

/** @typedef {(sublesson: Sublesson) => LessonQuestion[]} SublessonBuilder */

/**
 * @typedef {object} LessonApi
 * @property {(container: Element, chapter: Chapter) => void} renderChapterIntro
 * @property {(container: Element, chapter: Chapter) => void} reviewAllRules
 * @property {(container: Element, chapter: Chapter, sublesson: Sublesson, subIndex: number, sessionScore: SessionScore, options?: object) => void} renderRuleCards
 * @property {(container: Element, chapter: Chapter, sublesson: Sublesson, subIndex: number, sessionScore: SessionScore, resumeFromQ?: number, autoSkipRules?: boolean) => void} buildQuestionQueue
 * @property {(container: Element, chapter: Chapter, subIndex: number, sessionScore: SessionScore, skipRules?: boolean, autoSkipRules?: boolean) => void} startSubLesson
 * @property {(container: Element, chapter: Chapter, sublesson: Sublesson, subIndex: number, questions: LessonQuestion[], qIndex: number, score: SessionScore, autoSkipRules?: boolean) => void} runQuestions
 */

export {};
