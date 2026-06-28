import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import VOCAB_KEYS from '../js/data/vocab-keys.js';
import { englishDisplay } from '../js/vocab-display.js';

describe('vocabulary English browse labels', () => {
  it('drops "the" only for days, months, and seasons', async () => {
    const failures = [];
    const skipLemmas = new Set([
      'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo',
      'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto',
      'septiembre', 'octubre', 'noviembre', 'diciembre',
      'verano', 'otoño', 'invierno', 'primavera',
    ]);

    for (let n = 1; n <= 15; n++) {
      const ch = (await import(`../js/data/chapter${n}.js`)).default;
      for (const sl of ch.sublessons) {
        for (const key of VOCAB_KEYS) {
          for (const item of sl[key] || []) {
            const lemma = (item.es || '').replace(/^(el|la|los|las|un|una)\s+/i, '').trim();
            if (!skipLemmas.has(lemma)) continue;
            const text = englishDisplay(item).text;
            if (/^the\b/i.test(text)) {
              failures.push(`Ch${n} ${item.id || item.es}: "${text}" should omit "the"`);
            }
          }
        }
      }
    }

    assert.deepEqual(failures, []);
  });

  it('keeps "the" for ordinary and abstract nouns', () => {
    const samples = [
      { es: 'perro', en: 'the dog' },
      { es: 'menú', en: 'the menu' },
      { es: 'conversación', en: 'the conversation' },
      { es: 'dinero', en: 'the money' },
      { es: 'salud', en: 'the health' },
      { es: 'tarea', en: 'the homework' },
    ];
    for (const item of samples) {
      assert.equal(englishDisplay(item).text, item.en);
    }
  });

  it('disambiguates regional synonyms in English only', () => {
    const boligrafo = { es: 'bolígrafo', en: 'the ballpoint pen (Spain)' };
    const lapicero = { es: 'lapicero', en: 'the ballpoint pen (Latin America)' };
    assert.notEqual(englishDisplay(boligrafo).text, englishDisplay(lapicero).text);
    assert.match(englishDisplay(boligrafo).text, /Spain/);
    assert.match(englishDisplay(lapicero).text, /Latin America/);
  });

  it('does not put Spanish words in English disambiguation labels', async () => {
    const bad = [];

    for (let n = 1; n <= 15; n++) {
      const ch = (await import(`../js/data/chapter${n}.js`)).default;
      for (const sl of ch.sublessons) {
        for (const key of VOCAB_KEYS) {
          for (const item of sl[key] || []) {
            const en = item.en || '';
            const parens = en.match(/\(([^)]+)\)/g);
            if (!parens) continue;
            for (const group of parens) {
              const inner = group.slice(1, -1);
              if (/[áéíóúñ¿¡]/i.test(inner)) bad.push(`Ch${n} ${item.id}: "${en}"`);
            }
          }
        }
      }
    }

    assert.deepEqual(bad, [], `Spanish leaked into English labels:\n${bad.join('\n')}`);
  });
});
