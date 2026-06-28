import { shuffle } from '../../../js/utils.js';
import { SUBLESSON_1 } from '../../../js/data/chapter1.js';
import { addMatching } from '../builder-utils.js';

const GENDER_HINT_TYPES = ['article-picker', 'fill-article'];

function pickTargetGender() {
  return Math.random() < 0.5 ? 'm' : 'f';
}

function build_1_1(sublesson) {
  const questions = [];
  const mf      = sublesson.vocabulary.filter(v => v.gender === 'm' || v.gender === 'f');
  const neutral = sublesson.vocabulary.filter(v => v.gender === 'n');

  shuffle(mf).slice(0, 12).forEach((v, i) => {
    if (i % 3 === 0)      questions.push({ type: 'article-picker', vocab: v });
    else if (i % 3 === 1) questions.push({ type: 'fill-article',   vocab: v });
    else                  questions.push({ type: 'translation',    vocab: v });
  });

  shuffle(neutral).slice(0, 3).forEach(v => {
    questions.push({
      type: GENDER_HINT_TYPES[Math.floor(Math.random() * GENDER_HINT_TYPES.length)],
      vocab: v,
      targetGender: pickTargetGender(),
    });
  });

  addMatching(questions, mf, { mapPair: v => ({ es: `${v.article} ${v.es}`, en: v.en }) });
  return questions;
}

function build_1_2(sublesson) {
  const questions = [];
  const vocab = sublesson.vocabulary;
  const pluralPool = SUBLESSON_1.vocabulary.filter(v =>
    v.plural && (v.gender === 'm' || v.gender === 'f'),
  );

  shuffle(vocab).slice(0, 7).forEach((v, i) => {
    const vWithIndef = { ...v, article: v.indef };
    if (i % 2 === 0) questions.push({ type: 'article-picker', vocab: vWithIndef });
    else             questions.push({ type: 'plural-picker',   vocab: vWithIndef });
  });

  shuffle(vocab.filter(v => v.plural)).slice(0, 2).forEach(v => {
    questions.push({ type: 'plural-picker', mode: 'indefinite-plural', vocab: v });
  });

  shuffle(pluralPool).slice(0, 2).forEach(v => {
    questions.push({ type: 'translation', mode: 'plural-definite', vocab: v });
  });

  addMatching(questions, vocab, { mapPair: v => ({ es: `${v.indef} ${v.es}`, en: v.en }) });
  return questions;
}

function build_1_3(sublesson) {
  const questions = [];
  const adjs     = sublesson.adjectives;
  const nounPool = SUBLESSON_1.vocabulary.filter(v =>
    v.plural && (v.gender === 'm' || v.gender === 'f'),
  );

  shuffle(adjs).slice(0, 10).forEach((adj, i) => {
    const src = nounPool[Math.floor(Math.random() * nounPool.length)];
    const number = i < 6 ? 'sg' : 'pl';
    questions.push({
      type: 'adjective',
      noun: { es: src.es, plural: src.plural, en: src.en, gender: src.gender, number },
      adjective: adj,
    });
  });

  addMatching(questions, adjs);
  return questions;
}

export const builders = {
  '1-1': build_1_1,
  '1-2': build_1_2,
  '1-3': build_1_3,
};
