import { shuffle } from '../../../js/utils.js';
import { addMatching, addSentenceCompletions } from '../builder-utils.js';

function build_8_1(sublesson) {
  const questions = [];
  addSentenceCompletions(questions, sublesson.possessiveDrills, 6);
  addSentenceCompletions(questions, sublesson.demonstrativeDrills, 6);
  questions.push({
    type: 'matching',
    pairs: [
      { es: 'este/esta', en: 'this (near speaker)' },
      { es: 'ese/esa', en: 'that (near listener)' },
      { es: 'aquel/aquella', en: 'that (far from both)' },
      { es: 'esto/eso/aquello', en: 'neuter (unknown object)' },
    ],
  });
  return questions;
}

function build_8_2(sublesson) {
  const questions = [];
  addSentenceCompletions(questions, sublesson.sentenceCompletionDrills, 8);
  addMatching(questions, sublesson.vocabulary, { rounds: 2 });
  return questions;
}

function build_8_3(sublesson) {
  const questions = [];
  addSentenceCompletions(questions, sublesson.sentenceCompletionDrills);
  const structures = [
    { es: 'más...que', en: 'more...than' },
    { es: 'menos...que', en: 'less...than' },
    { es: 'tan...como', en: 'as...as' },
    { es: 'el/la más...de', en: 'the most...in/of' },
    { es: 'mejor', en: 'better (irregular)' },
    { es: 'peor', en: 'worse (irregular)' },
    { es: 'mayor', en: 'older (irregular, people)' },
    { es: 'menor', en: 'younger (irregular, people)' },
  ];
  addMatching(questions, structures, { rounds: 2, mapPair: s => ({ es: s.es, en: s.en }) });
  return questions;
}

function build_8_4(sublesson) {
  const questions = [];
  const drills = sublesson.adverbDrills;
  shuffle(drills).slice(0, 10).forEach(d => {
    const distractors = shuffle(drills.filter(x => x.adverb !== d.adverb)).slice(0, 3).map(x => x.adverb);
    questions.push({ type: 'number-quiz', mode: 'numeral-to-word', numeral: d.adjective, spanish: d.adverb, distractors });
  });
  addSentenceCompletions(questions, sublesson.sentenceCompletionDrills);
  addMatching(questions, sublesson.vocabulary, { rounds: 2 });
  return questions;
}

export const builders = {
  '8-1': build_8_1,
  '8-2': build_8_2,
  '8-3': build_8_3,
  '8-4': build_8_4,
};
