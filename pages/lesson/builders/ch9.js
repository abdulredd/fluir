import { addMatching, addSentenceCompletions } from '../builder-utils.js';

function build_9_1(sublesson) {
  const questions = [];
  addSentenceCompletions(questions, sublesson.sentenceCompletionDrills);
  questions.push({
    type: 'matching',
    pairs: [
      { es: 'algo', en: 'something' }, { es: 'nada', en: 'nothing' },
      { es: 'alguien', en: 'someone' }, { es: 'nadie', en: 'no one' },
    ],
  });
  questions.push({
    type: 'matching',
    pairs: [
      { es: 'siempre', en: 'always' }, { es: 'nunca', en: 'never' },
      { es: 'también', en: 'also' }, { es: 'tampoco', en: 'neither' },
    ],
  });
  addMatching(questions, sublesson.vocabulary, { rounds: 2 });
  return questions;
}

function build_9_2(sublesson) {
  const questions = [];
  addSentenceCompletions(questions, sublesson.sentenceCompletionDrills);
  addMatching(questions, sublesson.vocabulary, { rounds: 3 });
  return questions;
}

function build_9_3(sublesson) {
  const questions = [];
  addSentenceCompletions(questions, sublesson.porVsParaDrills);
  addSentenceCompletions(questions, sublesson.pronounDrills);
  questions.push({
    type: 'matching',
    pairs: [
      { es: 'para — recipient', en: 'El regalo es para ella.' },
      { es: 'para — purpose', en: 'Estudia para aprender.' },
      { es: 'por — duration', en: 'Corro por una hora.' },
      { es: 'por — cause', en: 'Triste por el mal clima.' },
    ],
  });
  return questions;
}

function build_9_4(sublesson) {
  const questions = [];
  addMatching(questions, sublesson.locationPrepositions, {
    rounds: 4,
    mapPair: l => ({ es: l.es, en: l.en }),
  });
  addMatching(questions, sublesson.porExpressions, {
    rounds: 4,
    mapPair: e => ({ es: e.es, en: e.en }),
  });
  if (sublesson.vocabulary?.length) {
    addMatching(questions, sublesson.vocabulary, { rounds: 4 });
  }
  return questions;
}

export const builders = {
  '9-1': build_9_1,
  '9-2': build_9_2,
  '9-3': build_9_3,
  '9-4': build_9_4,
};
