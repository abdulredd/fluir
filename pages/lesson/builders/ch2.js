import { shuffle } from '../../../js/utils.js';

function build_2_1(sublesson) {
  const questions = [];
  const vocab = sublesson.vocabulary;
  for (let i = 0; i < 3; i++) {
    const pairs = shuffle(vocab).slice(0, 4).map(v => ({ es: v.es, en: v.en }));
    questions.push({ type: 'matching', pairs });
  }
  shuffle(vocab).slice(0, 6).forEach(v => {
    const distractors = shuffle(vocab.filter(o => o.id !== v.id)).slice(0, 3).map(o => o.es);
    questions.push({ type: 'vocab-picker', vocab: v, distractors });
  });
  return questions;
}

function build_2_2(sublesson) {
  const questions = [];
  const conjs = sublesson.conjugations;
  shuffle(conjs).slice(0, 9).forEach(c => {
    questions.push({ type: 'conjugation', pronoun: c.pronoun, correctForm: c.form, verb: 'estar', en: c.en, allForms: conjs });
  });
  const vocab = sublesson.vocabulary.filter(v => v.article);
  const pairs  = shuffle(vocab).slice(0, 4).map(v => ({ es: v.es, en: v.en }));
  questions.push({ type: 'matching', pairs });
  const pairs2 = shuffle(vocab).slice(0, 4).map(v => ({ es: v.es, en: v.en }));
  questions.push({ type: 'matching', pairs: pairs2 });
  return questions;
}

function build_2_3(sublesson) {
  const questions = [];
  const conjs = sublesson.conjugations;
  shuffle(conjs).slice(0, 9).forEach(c => {
    questions.push({ type: 'conjugation', pronoun: c.pronoun, correctForm: c.form, verb: 'ser', en: c.en, allForms: conjs });
  });
  const vocab = sublesson.vocabulary.filter(v => v.article);
  const pairs  = shuffle(vocab).slice(0, 4).map(v => ({ es: v.es, en: v.en }));
  questions.push({ type: 'matching', pairs });
  shuffle(vocab).filter(v => v.article === 'el' || v.article === 'la').slice(0, 4).forEach(v => {
    questions.push({ type: 'article-picker', vocab: v });
  });
  return questions;
}

function build_2_4(sublesson) {
  const questions = [];
  const svse = sublesson.serVsEstarQuestions;
  shuffle(svse).slice(0, 15).forEach(q => {
    questions.push({ type: 'ser-vs-estar', ...q });
  });
  const vocab  = sublesson.vocabulary;
  const pairs  = shuffle(vocab).slice(0, 4).map(v => ({ es: v.es, en: v.en }));
  questions.push({ type: 'matching', pairs });
  const pairs2 = shuffle(vocab).slice(0, 4).map(v => ({ es: v.es, en: v.en }));
  questions.push({ type: 'matching', pairs: pairs2 });
  return questions;
}

export const builders = {
  '2-1': build_2_1,
  '2-2': build_2_2,
  '2-3': build_2_3,
  '2-4': build_2_4,
};
