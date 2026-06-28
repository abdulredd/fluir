import { describe, it, before } from 'node:test';
import assert from 'node:assert/strict';
import {
  SUBLESSON_3_1,
  SUBLESSON_3_2,
  SUBLESSON_3_3,
  SUBLESSON_3_4,
} from '../js/data/chapter3.js';
import { buildQuestions } from '../pages/lesson/questions.js';
import { CHAPTERS, preloadAllChapters } from '../js/data/registry.js';
import { ensureBuilderChapter } from '../pages/lesson/builder-registry.js';

/** Hay example nouns — PDF pp. 27–28. */
const PDF_CH3_HAY_NOUNS = [
  'árbol', 'vaso', 'piso', 'cuarto', 'zoológico', 'cielo', 'mercado', 'periódico', 'revista', 'luz', 'balcón',
];

/** Interrogatives — PDF pp. 29–31. */
const PDF_CH3_INTERROGATIVES = [
  '¿cómo?', '¿dónde?', '¿quién?', '¿quiénes?', '¿qué?', '¿cuál?', '¿cuáles?', '¿por qué?',
  '¿cuánto?', '¿cuántos?', '¿cuántas?', '¿cuándo?', '¿de dónde?', '¿de qué color?', '¿de quién?', '¿con quién?',
  '¿en qué?', '¿en cuál?', '¿de qué material?',
];

/** Days, months, seasons, parts of day — PDF pp. 32–33. */
const PDF_CH3_DAYS = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo'];
const PDF_CH3_MONTHS = [
  'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto',
  'septiembre', 'octubre', 'noviembre', 'diciembre',
];
const PDF_CH3_SEASONS = ['verano', 'otoño', 'invierno', 'primavera'];
const PDF_CH3_TIME_NOUNS = ['mañana', 'tarde', 'noche', 'semana', 'mes', 'año'];

/** Masculine nouns — PDF p. 34. */
const PDF_CH3_MASC_NOUNS = [
  'año', 'árbol', 'ascensor', 'avión', 'bolígrafo', 'bus', 'campo', 'coche', 'cuarto', 'cumpleaños',
  'día', 'dinero', 'edificio', 'equipaje', 'hogar', 'jardín', 'lapicero', 'lápiz', 'mensaje', 'mes',
  'niño', 'país', 'papel', 'parque', 'periódico', 'piso', 'precio', 'ruido', 'salón', 'sitio', 'sueño',
  'teatro', 'tema', 'viaje',
];

/** Feminine nouns — PDF p. 34. */
const PDF_CH3_FEM_NOUNS = [
  'avenida', 'biblioteca', 'calle', 'camisa', 'carta', 'ciudad', 'cocina', 'cuenta', 'ducha', 'entrada',
  'escalera', 'escuela', 'fiesta', 'frase', 'gente', 'guerra', 'habitación', 'hoja', 'librería', 'llave',
  'medicina', 'música', 'obra', 'página', 'palabra', 'pared', 'playa', 'pregunta', 'puerta', 'salida',
  'salud', 'semana', 'tarea', 'tarjeta',
];

/** Adjectives — PDF p. 35. */
const PDF_CH3_ADJECTIVES = [
  'alto', 'amable', 'amistoso', 'ancho', 'bajo', 'bello', 'cariñoso', 'ciego', 'corto', 'dulce', 'duro',
  'elegante', 'emocionante', 'especial', 'estrecho', 'fiel', 'flojo', 'gracioso', 'hondo', 'largo', 'lento',
  'libre', 'nuevo', 'orgulloso', 'peligroso', 'pesado', 'rápido', 'raro', 'sencillo', 'sordo', 'suave', 'tranquilo',
];

/** Conjunctions — PDF p. 35. */
const PDF_CH3_CONJUNCTIONS = ['y', 'o', 'pero', 'porque', 'si', 'mientras'];

/** Reading footnotes — PDF pp. 33, 39. */
const PDF_CH3_READING = [
  'pueblo', 'serio', 'antiguo', 'arqueóloga', 'político', 'relajante', 'durante',
  'cine', 'película', 'cómico', 'pobreza', 'jurado', 'emocionado', 'premio',
];

function ch3VocabEsSet() {
  const set = new Set();
  for (const sublesson of CHAPTERS[3].sublessons) {
    for (const item of sublesson.vocabulary || []) set.add(item.es);
  }
  return set;
}

function missingFromSet(items, set) {
  return items.filter(es => !set.has(es));
}

describe('Chapter 3 textbook coverage', () => {
  before(async () => {
    await preloadAllChapters();
    await ensureBuilderChapter(3);
  });

  it('includes hay and no hay in 3-1', () => {
    const pool = ch3VocabEsSet();
    assert.ok(pool.has('hay'));
    assert.ok(pool.has('no hay'));
  });

  it('includes every Ch3 PDF hay-example noun in 3-1', () => {
    const missing = missingFromSet(PDF_CH3_HAY_NOUNS, vocabEsSet(SUBLESSON_3_1));
    assert.deepEqual(missing, [], `missing: ${missing.join(', ')}`);
  });

  it('includes every Ch3 PDF interrogative in 3-2', () => {
    const missing = missingFromSet(PDF_CH3_INTERROGATIVES, vocabEsSet(SUBLESSON_3_2));
    assert.deepEqual(missing, [], `missing: ${missing.join(', ')}`);
  });

  it('includes every Ch3 PDF day, month, season, and time noun in 3-3', () => {
    const pool = vocabEsSet(SUBLESSON_3_3);
    const missing = [
      ...missingFromSet(PDF_CH3_DAYS, pool),
      ...missingFromSet(PDF_CH3_MONTHS, pool),
      ...missingFromSet(PDF_CH3_SEASONS, pool),
      ...missingFromSet(PDF_CH3_TIME_NOUNS, pool),
    ];
    assert.deepEqual(missing, [], `missing: ${missing.join(', ')}`);
  });

  it('includes every Ch3 PDF masculine and feminine noun', () => {
    const pool = ch3VocabEsSet();
    const missing = [
      ...missingFromSet(PDF_CH3_MASC_NOUNS, pool),
      ...missingFromSet(PDF_CH3_FEM_NOUNS, pool),
    ];
    assert.deepEqual(missing, [], `missing: ${missing.join(', ')}`);
  });

  it('includes every Ch3 PDF adjective and conjunction in 3-4', () => {
    const pool = vocabEsSet(SUBLESSON_3_4);
    const missing = [
      ...missingFromSet(PDF_CH3_ADJECTIVES, pool),
      ...missingFromSet(PDF_CH3_CONJUNCTIONS, pool),
    ];
    assert.deepEqual(missing, [], `missing: ${missing.join(', ')}`);
  });

  it('includes Ch3 reading vocabulary from Un pueblo colonial and El cine', () => {
    const missing = missingFromSet(PDF_CH3_READING, vocabEsSet(SUBLESSON_3_4));
    assert.deepEqual(missing, [], `missing: ${missing.join(', ')}`);
  });

  it('3-1 drills hay sentences and article practice', () => {
    const questions = buildQuestions(SUBLESSON_3_1);
    const types = new Set(questions.map(q => q.type));
    assert.ok(types.has('matching'));
    assert.ok(types.has('article-picker'));
    assert.ok(SUBLESSON_3_1.hayDrills?.length >= 10, 'Ex 3.1 hay drills');
  });

  it('3-2 drills interrogatives with matching and vocab pickers', () => {
    const questions = buildQuestions(SUBLESSON_3_2);
    const types = new Set(questions.map(q => q.type));
    assert.ok(types.has('matching'));
    assert.ok(types.has('vocab-picker'));
    assert.ok(!types.has('translation'), 'interrogatives must not use article+translation game');
    assert.ok(SUBLESSON_3_2.interrogativeQuestions.length >= 19, 'interrogative pool');
  });

  it('3-4 drills reading comprehension, adjective agreement, and Ex 3.6 mixed verbs', () => {
    const questions = buildQuestions(SUBLESSON_3_4);
    const types = new Set(questions.map(q => q.type));
    assert.ok(types.has('sentence-completion'));
    assert.ok(types.has('adjective'), 'Ex 3.4 adjective agreement');
    assert.ok(SUBLESSON_3_4.readingComprehensionDrills?.length >= 4, 'El cine reading');
    assert.ok(SUBLESSON_3_4.mixedVerbDrills?.length >= 4, 'Ex 3.6 mixed pool');
  });

  it('keeps each Ch3 sublesson session length bounded', () => {
    for (const sublesson of CHAPTERS[3].sublessons) {
      const count = buildQuestions(sublesson).length;
      assert.ok(count <= 20, `${sublesson.id} produced ${count} questions (max 20)`);
      assert.ok(count >= 10, `${sublesson.id} produced ${count} questions (min 10)`);
    }
  });

  it('sentence drills grade one blank at a time', () => {
    const drills = [
      ...(SUBLESSON_3_4.readingComprehensionDrills || []),
      ...(SUBLESSON_3_4.mixedVerbDrills || []),
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
});

function vocabEsSet(sublesson) {
  return new Set((sublesson.vocabulary || []).map(v => v.es));
}
