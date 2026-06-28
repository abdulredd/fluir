import { describe, it, before } from 'node:test';
import assert from 'node:assert/strict';
import {
  SUBLESSON_2_1,
  SUBLESSON_2_2,
  SUBLESSON_2_3,
  SUBLESSON_2_4,
} from '../js/data/chapter2.js';
import { buildQuestions } from '../pages/lesson/questions.js';
import { CHAPTERS, preloadAllChapters } from '../js/data/registry.js';
import { ensureBuilderChapter } from '../pages/lesson/builder-registry.js';
import { blankTargetVerbForms, highlightTargetVerbForm } from '../js/games/ser-vs-estar.js';

/** Subject pronouns — Complete Spanish Step-by-Step Ch2 PDF p. 14. */
const PDF_CH2_PRONOUNS = [
  'yo', 'tú', 'vosotros', 'él', 'ella', 'usted', 'nosotros', 'ellos', 'ellas', 'ustedes',
];

/** Estar / ser conjugations — PDF pp. 15–16, 18–19 (incl. Spain vosotros forms). */
const PDF_CH2_ESTAR_FORMS = ['estoy', 'estás', 'está', 'estamos', 'estáis', 'están'];
const PDF_CH2_SER_FORMS = ['soy', 'eres', 'es', 'somos', 'sois', 'son'];

/** Key Vocabulary — PDF p. 17. */
const PDF_CH2_INTERROGATIVES = ['¿cómo?', '¿dónde?', '¿quién?'];
const PDF_CH2_LOCATION_ADVERBS = ['aquí', 'acá', 'allí', 'allá'];
const PDF_CH2_KEY_ADJECTIVES = [
  'alegre', 'enojado', 'bonito', 'feliz', 'bueno', 'guapo', 'cansado', 'hermoso',
  'contento', 'lindo', 'delicioso', 'sabroso', 'enfermo',
];

/** Ser section professions & materials — PDF pp. 19–21. */
const PDF_CH2_SER_PROFESSIONS = ['estudiante', 'arquitecto', 'abogado', 'ingeniero'];
const PDF_CH2_MATERIAL_NOUNS = ['madera', 'plástico', 'cuero', 'piedra', 'vidrio'];

/** La casa reading — PDF pp. 25–26. */
const PDF_CH2_READING_NOUNS = [
  'alcoba', 'alfombra', 'bolígrafo', 'cocina', 'colección', 'comedor', 'cortina',
  'cuaderno', 'espejo', 'estudio', 'estufa', 'gabinete', 'horno', 'lápiz', 'nevera',
  'pared', 'patio', 'sala', 'sillón', 'vestíbulo', 'video',
];

const PDF_CH2_READING_ADJECTIVES = [
  'amplio', 'antiguo', 'cómodo', 'fino', 'grueso', 'limpio', 'privado', 'sencillo',
];

const PDF_CH2_READING_ADVERBS = ['bastante', 'todavía'];

const PDF_CH2_READING_EXTRA = ['azul marino', 'mi', 'mis', 'todo'];

function vocabEsSet(sublesson) {
  return new Set((sublesson.vocabulary || []).map(v => v.es));
}

function conjForms(sublesson) {
  return new Set((sublesson.conjugations || []).map(c => c.form));
}

function missingFromSet(items, set) {
  return items.filter(es => !set.has(es));
}

describe('Chapter 2 textbook coverage', () => {
  before(async () => {
    await preloadAllChapters();
    await ensureBuilderChapter(2);
  });

  it('includes every Ch2 PDF subject pronoun in 2-1', () => {
    const missing = missingFromSet(PDF_CH2_PRONOUNS, vocabEsSet(SUBLESSON_2_1));
    assert.deepEqual(missing, [], `missing pronouns: ${missing.join(', ')}`);
  });

  it('includes every Ch2 PDF estar form in 2-2 conjugations', () => {
    const missing = PDF_CH2_ESTAR_FORMS.filter(f => !conjForms(SUBLESSON_2_2).has(f));
    assert.deepEqual(missing, [], `missing estar forms: ${missing.join(', ')}`);
  });

  it('includes every Ch2 PDF ser form in 2-3 conjugations', () => {
    const missing = PDF_CH2_SER_FORMS.filter(f => !conjForms(SUBLESSON_2_3).has(f));
    assert.deepEqual(missing, [], `missing ser forms: ${missing.join(', ')}`);
  });

  it('includes Ch2 PDF key interrogatives and location adverbs in 2-2', () => {
    const pool = vocabEsSet(SUBLESSON_2_2);
    const missing = [
      ...missingFromSet(PDF_CH2_INTERROGATIVES, pool),
      ...missingFromSet(PDF_CH2_LOCATION_ADVERBS, pool),
    ];
    assert.deepEqual(missing, [], `missing: ${missing.join(', ')}`);
  });

  it('includes every Ch2 PDF key adjective in 2-2', () => {
    const missing = missingFromSet(PDF_CH2_KEY_ADJECTIVES, vocabEsSet(SUBLESSON_2_2));
    assert.deepEqual(missing, [], `missing adjectives: ${missing.join(', ')}`);
  });

  it('includes Ch2 PDF ser professions and material nouns in 2-3', () => {
    const pool = vocabEsSet(SUBLESSON_2_3);
    const missing = [
      ...missingFromSet(PDF_CH2_SER_PROFESSIONS, pool),
      ...missingFromSet(PDF_CH2_MATERIAL_NOUNS, pool),
    ];
    assert.deepEqual(missing, [], `missing: ${missing.join(', ')}`);
  });

  it('includes every La casa reading noun in 2-4', () => {
    const pool = vocabEsSet(SUBLESSON_2_4);
    const missing = PDF_CH2_READING_NOUNS.filter(es => !pool.has(es));
    assert.deepEqual(missing, [], `missing reading nouns: ${missing.join(', ')}`);
  });

  it('includes La casa reading adjectives, adverbs, and mi/todo in 2-4', () => {
    const pool = vocabEsSet(SUBLESSON_2_4);
    const missing = [
      ...missingFromSet(PDF_CH2_READING_ADJECTIVES, pool),
      ...missingFromSet(PDF_CH2_READING_ADVERBS, pool),
      ...missingFromSet(PDF_CH2_READING_EXTRA, pool),
    ];
    assert.deepEqual(missing, [], `missing: ${missing.join(', ')}`);
  });

  it('2-2 drills estar conjugation, adjective matching, and Ex 2.1/2.2 sentence practice', () => {
    const questions = buildQuestions(SUBLESSON_2_2);
    const types = new Set(questions.map(q => q.type));
    assert.ok(types.has('conjugation'));
    assert.ok(types.has('matching'));
    assert.ok(types.has('sentence-completion'));
    assert.ok(SUBLESSON_2_2.estarDrills?.length >= 5, 'Ex 2.1 estar drills');
    assert.ok(SUBLESSON_2_2.estarSceneDrills?.length >= 3, 'Ex 2.2 scene drills');
  });

  it('2-3 drills ser conjugation and Ex 2.3 sentence practice', () => {
    const questions = buildQuestions(SUBLESSON_2_3);
    const types = new Set(questions.map(q => q.type));
    assert.ok(types.has('conjugation'));
    assert.ok(types.has('sentence-completion'));
    assert.ok(SUBLESSON_2_3.serDrills?.length >= 4, 'Ex 2.3 ser drills');
  });

  it('2-4 drills ser-vs-estar, reading comprehension, and Ex 2.6 letter', () => {
    const questions = buildQuestions(SUBLESSON_2_4);
    const types = new Set(questions.map(q => q.type));
    assert.ok(types.has('ser-vs-estar'));
    assert.ok(types.has('sentence-completion'));
    assert.ok(SUBLESSON_2_4.readingComprehensionDrills?.length >= 4, 'La casa reading Q1–4');
    assert.ok(SUBLESSON_2_4.letterDrills?.length >= 3, 'Ex 2.6 letter drills');
    assert.ok(SUBLESSON_2_4.serVsEstarQuestions.length >= 20, 'Ex 2.4 mixed pool');
  });

  it('keeps each Ch2 sublesson session length bounded', () => {
    for (const sublesson of CHAPTERS[2].sublessons) {
      const count = buildQuestions(sublesson).length;
      assert.ok(count <= 20, `${sublesson.id} produced ${count} questions (max 20)`);
      assert.ok(count >= 10, `${sublesson.id} produced ${count} questions (min 10)`);
    }
  });

  it('sentence drills grade one blank at a time', () => {
    const drills = [
      ...SUBLESSON_2_2.estarDrills,
      ...SUBLESSON_2_2.estarSceneDrills,
      ...SUBLESSON_2_3.serDrills,
      ...SUBLESSON_2_4.readingComprehensionDrills,
      ...SUBLESSON_2_4.letterDrills,
    ];
    for (const drill of drills) {
      const blanks = (drill.sentence.match(/___/g) || []).length;
      assert.equal(blanks, 1, drill.sentence);
      if (drill.fills) {
        assert.equal(drill.fills.length, 1, drill.sentence);
        assert.equal(drill.fills[0], drill.answer, drill.sentence);
      }
    }
  });

  it('ser-vs-estar blanks only the target verb in mixed sentences', () => {
    const sentence = 'Julia está alegre porque la fiesta es fantástica.';
    assert.equal(
      blankTargetVerbForms(sentence, 'estar'),
      'Julia ___ alegre porque la fiesta es fantástica.',
    );
    assert.equal(
      blankTargetVerbForms(sentence, 'ser'),
      'Julia está alegre porque la fiesta ___ fantástica.',
    );
  });

  it('ser-vs-estar feedback highlights the conjugated form', () => {
    const sentence = 'La fiesta es en la casa de José.';
    assert.equal(
      highlightTargetVerbForm(sentence, 'ser'),
      'La fiesta <span class="game-fill-em">es</span> en la casa de José.',
    );
  });
});
