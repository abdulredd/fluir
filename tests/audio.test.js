import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { spanishFromQuestion } from '../js/audio.js';

describe('spanishFromQuestion', () => {
  it('builds article + noun for vocab questions', () => {
    assert.equal(
      spanishFromQuestion({
        type: 'article-picker',
        vocab: { es: 'casa', article: 'la', en: 'house' },
      }),
      'la casa',
    );
  });

  it('speaks conjugation as pronoun + form', () => {
    assert.equal(
      spanishFromQuestion({
        type: 'conjugation',
        pronoun: 'yo',
        correctForm: 'soy',
      }),
      'yo soy',
    );
  });

  it('fills sentence-completion blanks for speech', () => {
    assert.equal(
      spanishFromQuestion({
        type: 'sentence-completion',
        sentence: 'Julia es ___ fuerte ___ Juan.',
        fills: ['más', 'que'],
      }),
      'Julia es más fuerte que Juan.',
    );
  });

  it('skips matching games', () => {
    assert.equal(spanishFromQuestion({ type: 'matching', pairs: [{ es: 'hola', en: 'hi' }] }), '');
  });
});
