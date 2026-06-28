import { shuffle } from '../../../js/utils.js';

function build_1_1(sublesson) {
  const questions = [];
  const vocab  = sublesson.vocabulary.filter(v => v.gender !== 'n');
      const sample = shuffle(vocab).slice(0, 15);
      sample.forEach((v, i) => {
        if (i % 3 === 0)      questions.push({ type: 'article-picker', vocab: v });
        else if (i % 3 === 1) questions.push({ type: 'fill-article',   vocab: v });
        else                  questions.push({ type: 'translation',    vocab: v });
      });
      const pairs = shuffle(vocab).slice(0, 4).map(v => ({ es: `${v.article} ${v.es}`, en: v.en }));
      questions.push({ type: 'matching', pairs });
  return questions;
}

function build_1_2(sublesson) {
  const questions = [];
  const vocab = sublesson.vocabulary;
      shuffle(vocab).slice(0, 10).forEach((v, i) => {
        const vWithIndef = { ...v, article: v.indef };
        if (i % 2 === 0) questions.push({ type: 'article-picker',  vocab: vWithIndef });
        else             questions.push({ type: 'plural-picker',   vocab: vWithIndef });
      });
      const pairs = shuffle(vocab).slice(0, 4).map(v => ({ es: `${v.indef} ${v.es}`, en: v.en }));
      questions.push({ type: 'matching', pairs });
  return questions;
}

function build_1_3(sublesson) {
  const questions = [];
  const adjs  = sublesson.adjectives;
      const nouns = [
        { es: 'libro',    en: 'book',   gender: 'm' },
        { es: 'casa',     en: 'house',  gender: 'f' },
        { es: 'perro',    en: 'dog',    gender: 'm' },
        { es: 'muchacha', en: 'girl',   gender: 'f' },
        { es: 'hotel',    en: 'hotel',  gender: 'm' },
        { es: 'lámpara',  en: 'lamp',   gender: 'f' },
      ];
      shuffle(adjs).slice(0, 10).forEach((adj, i) => {
        questions.push({ type: 'adjective', noun: nouns[i % nouns.length], adjective: adj });
      });
      const pairs = shuffle(adjs).slice(0, 4).map(a => ({ es: a.es, en: a.en }));
      questions.push({ type: 'matching', pairs });
  return questions;
}

export const builders = {
  '1-1': build_1_1,
  '1-2': build_1_2,
  '1-3': build_1_3,
};
