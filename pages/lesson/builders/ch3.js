import { addMatching, addArticlePickers, addEach } from '../builder-utils.js';

function build_3_1(sublesson) {
  const questions = [];
  const vocab = sublesson.vocabulary.filter(v => v.article);
  addMatching(questions, vocab, { rounds: 3 });
  addArticlePickers(questions, vocab, 6);
  return questions;
}

function build_3_2(sublesson) {
  const questions = [];
  const vocab = sublesson.vocabulary;
  addMatching(questions, vocab, { rounds: 4 });
  addEach(questions, vocab, 6, v => ({ type: 'translation', vocab: { ...v, article: '' } }));
  return questions;
}

function build_3_3(sublesson) {
  const questions = [];
  const days   = sublesson.vocabulary.filter(v => ['lunes','martes','miércoles','jueves','viernes','sábado','domingo'].includes(v.es));
  const months = sublesson.vocabulary.filter(v => v.id.startsWith('d3_') && parseInt(v.id.split('_')[1]) >= 8 && parseInt(v.id.split('_')[1]) <= 19);
  const other  = sublesson.vocabulary.filter(v => !days.includes(v) && !months.includes(v));
  addMatching(questions, days,   { rounds: 2 });
  addMatching(questions, months, { rounds: 3 });
  addMatching(questions, other);
  return questions;
}

function build_3_4(sublesson) {
  const questions = [];
  const nouns = sublesson.vocabulary.filter(v => v.article === 'el' || v.article === 'la');
  const adjs  = sublesson.vocabulary.filter(v => !v.article || v.article === '');
  addMatching(questions, nouns, { rounds: 4 });
  addArticlePickers(questions, nouns, 8);
  addMatching(questions, adjs, { rounds: 2 });
  return questions;
}

export const builders = {
  '3-1': build_3_1,
  '3-2': build_3_2,
  '3-3': build_3_3,
  '3-4': build_3_4,
};
