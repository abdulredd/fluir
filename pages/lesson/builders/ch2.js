import {
  addMatching,
  addVocabPickers,
  addConjugationFromTable,
  addSerVsEstar,
  addArticlePickers,
} from '../builder-utils.js';

function build_2_1(sublesson) {
  const questions = [];
  const vocab = sublesson.vocabulary;
  addMatching(questions, vocab, { rounds: 3 });
  addVocabPickers(questions, vocab, 6);
  return questions;
}

function build_2_2(sublesson) {
  const questions = [];
  const conjs = sublesson.conjugations;
  addConjugationFromTable(questions, conjs, 9, 'estar');
  const vocab = sublesson.vocabulary.filter(v => v.article);
  addMatching(questions, vocab, { rounds: 2 });
  return questions;
}

function build_2_3(sublesson) {
  const questions = [];
  const conjs = sublesson.conjugations;
  addConjugationFromTable(questions, conjs, 9, 'ser');
  const vocab = sublesson.vocabulary.filter(v => v.article);
  addMatching(questions, vocab);
  addArticlePickers(questions, vocab.filter(v => v.article === 'el' || v.article === 'la'), 4);
  return questions;
}

function build_2_4(sublesson) {
  const questions = [];
  addSerVsEstar(questions, sublesson.serVsEstarQuestions, 15);
  addMatching(questions, sublesson.vocabulary, { rounds: 2 });
  return questions;
}

export const builders = {
  '2-1': build_2_1,
  '2-2': build_2_2,
  '2-3': build_2_3,
  '2-4': build_2_4,
};
