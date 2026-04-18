/* ─── Fluir · Chapter list ───────────────────────────────────────────────────
   Single source of truth for all chapter titles and metadata.
   Import this anywhere you need the full 15-chapter list.
   ─────────────────────────────────────────────────────────────────────────── */

const ALL_CHAPTERS = [
  { id: 1,  title: 'Nouns, Articles, and Adjectives',  unlocked: true  },
  { id: 2,  title: 'Estar, Ser, and Subject Pronouns', unlocked: false },
  { id: 3,  title: 'Hay, Interrogatives, Days, and Months', unlocked: false },
  { id: 4,  title: 'Numbers, Dates, and Time',         unlocked: false },
  { id: 5,  title: 'Regular Verbs',                    unlocked: false },
  { id: 6,  title: 'Irregular Verbs',                  unlocked: false },
  { id: 7,  title: 'Ir and the Future',                unlocked: false },
  { id: 8,  title: 'Adjectives and Adverbs',           unlocked: false },
  { id: 9,  title: 'Negatives and Prepositions',       unlocked: false },
  { id: 10, title: 'The Indirect Object',              unlocked: false },
  { id: 11, title: 'The Direct Object',                unlocked: false },
  { id: 12, title: 'Reflexive Verbs',                  unlocked: false },
  { id: 13, title: 'The Present Subjunctive',          unlocked: false },
  { id: 14, title: 'The Preterit Tense',               unlocked: false },
  { id: 15, title: 'The Imperfect Tense',              unlocked: false },
];

export default ALL_CHAPTERS;
export { ALL_CHAPTERS };
