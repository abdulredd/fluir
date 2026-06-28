import { describe, it, before } from 'node:test';
import assert from 'node:assert/strict';
import { SUBLESSON_1, SUBLESSON_3 } from '../js/data/chapter1.js';
import { buildQuestions } from '../pages/lesson/questions.js';
import { CHAPTERS, preloadAllChapters } from '../js/data/registry.js';
import { ensureBuilderChapter } from '../pages/lesson/builder-registry.js';

/** Nouns from Complete Spanish Step-by-Step Ch1 PDF (Key lists + irregular). */
const PDF_CH1_NOUNS = [
  'amigo', 'banco', 'baño', 'carro', 'gato', 'hermano', 'libro', 'muchacho', 'niño', 'perro', 'teléfono', 'vino',
  'animal', 'café', 'doctor', 'hombre', 'hospital', 'hotel', 'tomate', 'tren',
  'clima', 'día', 'drama', 'idioma', 'mapa', 'planeta', 'poema', 'problema', 'programa', 'sistema',
  'amiga', 'blusa', 'bolsa', 'cama', 'casa', 'cerveza', 'comida', 'hermana', 'iglesia', 'lámpara', 'mesa',
  'muchacha', 'niña', 'persona', 'planta', 'silla', 'tienda', 'ventana',
  'canción', 'conversación', 'invitación', 'lección', 'ilusión', 'televisión', 'ciudad', 'verdad', 'amistad', 'actitud',
  'foto', 'mano', 'radio', 'clase', 'flor', 'luz', 'mujer', 'piel', 'suerte',
  'artista', 'dentista', 'pianista', 'taxista', 'cantante', 'estudiante', 'gerente', 'presidente',
];

/** Adjectives from Ch1 PDF Key Vocabulary (colors + other). */
const PDF_CH1_ADJECTIVES = [
  'amarillo', 'anaranjado', 'azul', 'blanco', 'gris', 'marrón', 'moreno', 'pardo', 'morado', 'negro', 'rojo', 'rosado', 'verde',
  'agradable', 'alegre', 'barato', 'caro', 'débil', 'delgado', 'difícil', 'estupendo', 'excelente', 'fácil',
  'fantástico', 'feliz', 'feo', 'flaco', 'frágil', 'fuerte', 'gordo', 'grande', 'guapo', 'hermoso', 'horrible',
  'inteligente', 'interesante', 'joven', 'maravilloso', 'pequeño', 'pobre', 'rico', 'sincero', 'simpático',
  'tacaño', 'típico', 'triste', 'viejo',
];

describe('Chapter 1 textbook coverage', () => {
  before(async () => {
    await preloadAllChapters();
    await ensureBuilderChapter(1);
  });

  it('includes every Ch1 PDF noun in sublesson 1-1 vocabulary', () => {
    const esSet = new Set(SUBLESSON_1.vocabulary.map(v => v.es));
    const missing = PDF_CH1_NOUNS.filter(es => !esSet.has(es));
    assert.deepEqual(missing, [], `missing nouns: ${missing.join(', ')}`);
  });

  it('includes every Ch1 PDF adjective in sublesson 1-3', () => {
    const esSet = new Set(SUBLESSON_3.adjectives.map(a => a.es));
    const missing = PDF_CH1_ADJECTIVES.filter(es => !esSet.has(es));
    assert.deepEqual(missing, [], `missing adjectives: ${missing.join(', ')}`);
  });

  it('meets minimum pool sizes', () => {
    assert.ok(SUBLESSON_1.vocabulary.length >= 75);
    assert.ok(SUBLESSON_3.adjectives.length >= 47);
  });

  it('keeps each sublesson session length bounded', () => {
    for (const sublesson of CHAPTERS[1].sublessons) {
      const count = buildQuestions(sublesson).length;
      assert.ok(count <= 20, `${sublesson.id} produced ${count} questions (max 20)`);
      assert.ok(count >= 10, `${sublesson.id} produced ${count} questions (min 10)`);
    }
  });

  it('1-1 includes gender-hint article questions for -ista/-nte nouns', () => {
    const sublesson = CHAPTERS[1].sublessons.find(sl => sl.id === '1-1');
    const questions = buildQuestions(sublesson);
    const genderHints = questions.filter(q => q.targetGender);
    assert.ok(genderHints.length >= 1);
    assert.ok(genderHints.every(q => q.vocab.gender === 'n'));
  });

  it('1-2 includes indefinite-plural and plural-definite drills', () => {
    const sublesson = CHAPTERS[1].sublessons.find(sl => sl.id === '1-2');
    const questions = buildQuestions(sublesson);
    assert.ok(questions.some(q => q.type === 'plural-picker' && q.mode === 'indefinite-plural'));
    assert.ok(questions.some(q => q.type === 'translation' && q.mode === 'plural-definite'));
  });

  it('1-3 includes plural adjective agreement questions', () => {
    const sublesson = CHAPTERS[1].sublessons.find(sl => sl.id === '1-3');
    const questions = buildQuestions(sublesson);
    const adjQs = questions.filter(q => q.type === 'adjective');
    assert.ok(adjQs.some(q => q.noun?.number === 'pl'));
    assert.ok(adjQs.every(q => q.noun?.plural));
  });

  it('suerte has no plural form (uncountable in Ch1)', () => {
    const suerte = SUBLESSON_1.vocabulary.find(v => v.es === 'suerte');
    assert.ok(suerte);
    assert.equal(suerte.plural, undefined);
  });

  it('lección uses the -ión gender rule key', () => {
    const leccion = SUBLESSON_1.vocabulary.find(v => v.es === 'lección');
    assert.equal(leccion.rule, 'ends_ion');
  });
});
