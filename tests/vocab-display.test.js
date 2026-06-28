import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  VOCAB_DIRECTION,
  normalizeVocabDirection,
  vocabSectionLabel,
  vocabBrowseCategory,
  vocabBrowseSectionLabel,
  nounSpanishDisplay,
  adjectiveSpanishDisplay,
  spanishDisplay,
  englishDisplay,
  vocabFaces,
  vocabBrowseHint,
} from '../js/vocab-display.js';

const yo = { es: 'yo', en: 'I', gender: 'n', rule: 'pronoun', article: '' };
const perro = { article: 'el', es: 'perro', en: 'dog', plural: 'perros', gender: 'm' };
const jardin = { article: 'un', indef: 'un', es: 'jardín', en: 'garden', plural: 'jardines', gender: 'm' };
const amarillo = { es: 'amarillo', en: 'yellow', endsO: true };
const azul = { es: 'azul', en: 'blue', endsO: false };

describe('vocab display', () => {
  it('normalizes unknown direction to Spanish first', () => {
    assert.equal(normalizeVocabDirection(undefined), VOCAB_DIRECTION.ES_EN);
    assert.equal(normalizeVocabDirection('bogus'), VOCAB_DIRECTION.ES_EN);
    assert.equal(normalizeVocabDirection(VOCAB_DIRECTION.EN_ES), VOCAB_DIRECTION.EN_ES);
  });

  it('maps array keys to section labels', () => {
    assert.equal(vocabSectionLabel('adjectives'), 'Adjectives');
    assert.equal(vocabSectionLabel('verbs'), 'Verbs');
  });

  it('classifies vocabulary items by word type', () => {
    assert.equal(vocabBrowseCategory(yo), 'pronouns');
    assert.equal(vocabBrowseCategory({ rule: 'interrogative', es: '¿cómo?' }), 'question-words');
    assert.equal(vocabBrowseCategory({ rule: 'estar_conj', es: 'estoy' }), 'verb-forms');
    assert.equal(vocabBrowseCategory(perro), 'nouns');
    assert.equal(vocabBrowseCategory({ rule: 'ends_o', es: 'enfermo', en: 'sick', article: '' }), 'adjectives');
    assert.equal(vocabBrowseCategory({ rule: 'ends_o', es: 'arquitecto', article: 'el' }), 'nouns');
    assert.equal(vocabBrowseSectionLabel('pronouns'), 'Pronouns');
  });

  it('shows pronouns without articles', () => {
    const face = spanishDisplay(yo, 'vocabulary');
    assert.equal(face.text, 'yo');
    assert.equal(face.sub, '');
  });

  it('shows nouns with el/la and plural los/las', () => {
    const face = nounSpanishDisplay(perro);
    assert.equal(face.text, 'el perro');
    assert.equal(face.sub, 'los perros');
  });

  it('converts un/una data to el/la on browse cards', () => {
    const face = nounSpanishDisplay(jardin);
    assert.equal(face.text, 'el jardín');
    assert.equal(face.sub, 'los jardines');
  });

  it('formats canonical noun data with el/la and plural los/las', () => {
    const patio = {
      es: 'patio', en: 'yard', gender: 'm', rule: 'ends_o', article: 'el', plural: 'patios',
    };
    const face = nounSpanishDisplay(patio);
    assert.equal(face.text, 'el patio');
    assert.equal(face.sub, 'los patios');
  });

  it('still strips legacy article prefixes without doubling', () => {
    const legacy = {
      es: 'el patio', en: 'yard', gender: 'm', rule: 'ends_o', article: 'el', plural: 'los patios',
    };
    const face = nounSpanishDisplay(legacy);
    assert.equal(face.text, 'el patio');
    assert.equal(face.sub, 'los patios');
  });

  it('shows masculine and feminine adjective forms', () => {
    const face = adjectiveSpanishDisplay(amarillo);
    assert.equal(face.text, 'amarillo');
    assert.equal(face.sub, 'amarilla');
  });

  it('omits feminine subline when adjective is invariable', () => {
    const face = adjectiveSpanishDisplay(azul);
    assert.equal(face.text, 'azul');
    assert.equal(face.sub, '');
  });

  it('Spanish-first puts Spanish on the front', () => {
    const { front, back } = vocabFaces(perro, VOCAB_DIRECTION.ES_EN, 'vocabulary');
    assert.equal(front.text, 'el perro');
    assert.equal(back.text, 'dog');
  });

  it('English-first puts English on the front and Spanish on the back', () => {
    const { front, back } = vocabFaces(perro, VOCAB_DIRECTION.EN_ES, 'vocabulary');
    assert.equal(front.text, 'dog');
    assert.equal(back.text, 'el perro');
    assert.equal(back.sub, 'los perros');
  });

  it('browse hint matches direction', () => {
    assert.match(vocabBrowseHint(VOCAB_DIRECTION.ES_EN), /English/);
    assert.match(vocabBrowseHint(VOCAB_DIRECTION.EN_ES), /Spanish/);
  });
});
