import {
  addMatching,
  addVocabPickers,
  addConjugationFromTable,
  addSerVsEstar,
  addArticlePickers,
  addSentenceCompletions,
} from '../builder-utils.js';

function build_2_1(sublesson) {
  const questions = [];
  const vocab = sublesson.vocabulary;
  addMatching(questions, vocab, { rounds: 3 });
  addVocabPickers(questions, vocab, 7);
  return questions;
}

function build_2_2(sublesson) {
  const questions = [];
  addConjugationFromTable(questions, sublesson.conjugations, 10, 'estar');
  const practicePool = sublesson.vocabulary.filter(v =>
    !['estar_conj', 'interrogative', 'adverb'].includes(v.rule),
  );
  addMatching(questions, practicePool, { rounds: 2 });
  addSentenceCompletions(questions, sublesson.estarDrills, 5);
  addSentenceCompletions(questions, sublesson.estarSceneDrills, 3);
  return questions;
}

function build_2_3(sublesson) {
  const questions = [];
  addConjugationFromTable(questions, sublesson.conjugations, 10, 'ser');
  const vocab = sublesson.vocabulary.filter(v => v.article);
  addMatching(questions, vocab);
  addArticlePickers(questions, vocab.filter(v => v.article === 'el' || v.article === 'la'), 4);
  addSentenceCompletions(questions, sublesson.serDrills, 4);
  return questions;
}

function build_2_4(sublesson) {
  const questions = [];
  addSerVsEstar(questions, sublesson.serVsEstarQuestions, 10);
  addMatching(questions, sublesson.vocabulary.filter(v => v.article), { rounds: 2 });
  addSentenceCompletions(questions, sublesson.readingComprehensionDrills);
  addSentenceCompletions(questions, sublesson.letterDrills, 3);
  return questions;
}

export const builders = {
  '2-1': build_2_1,
  '2-2': build_2_2,
  '2-3': build_2_3,
  '2-4': build_2_4,
};
