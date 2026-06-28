import { shuffle } from '../../../js/utils.js';

function build_3_1(sublesson) {
  const questions = [];
  /* Hay drills — translation + matching */
  const vocab = sublesson.vocabulary.filter(v => v.article);
  for (let i = 0; i < 3; i++) {
    const pairs = shuffle(vocab).slice(0, 4).map(v => ({ es: v.es, en: v.en }));
    questions.push({ type: 'matching', pairs });
  }
  shuffle(vocab).slice(0, 6).forEach(v => {
    questions.push({ type: 'article-picker', vocab: v });
  });
  return questions;
}

function build_3_2(sublesson) {
  const questions = [];
  /* Interrogatives — matching question word to meaning */
  const vocab = sublesson.vocabulary;
  for (let i = 0; i < 4; i++) {
    const pairs = shuffle(vocab).slice(0, 4).map(v => ({ es: v.es, en: v.en }));
    questions.push({ type: 'matching', pairs });
  }
  shuffle(vocab).slice(0, 6).forEach(v => {
    questions.push({ type: 'translation', vocab: { ...v, article: '' } });
  });
  return questions;
}

function build_3_3(sublesson) {
  const questions = [];
  /* Days, months, seasons — matching + translation */
  const days   = sublesson.vocabulary.filter(v => ['lunes','martes','miércoles','jueves','viernes','sábado','domingo'].includes(v.es));
  const months = sublesson.vocabulary.filter(v => v.id.startsWith('d3_') && parseInt(v.id.split('_')[1]) >= 8 && parseInt(v.id.split('_')[1]) <= 19);
  const other  = sublesson.vocabulary.filter(v => !days.includes(v) && !months.includes(v));
  
  /* Days matching */
  for (let i = 0; i < 2; i++) {
    const pairs = shuffle(days).slice(0, 4).map(v => ({ es: v.es, en: v.en }));
    questions.push({ type: 'matching', pairs });
  }
  /* Months matching */
  for (let i = 0; i < 3; i++) {
    const pairs = shuffle(months).slice(0, 4).map(v => ({ es: v.es, en: v.en }));
    questions.push({ type: 'matching', pairs });
  }
  /* Seasons + parts of day */
  const pairs = shuffle(other).slice(0, 4).map(v => ({ es: v.es, en: v.en }));
  questions.push({ type: 'matching', pairs });
  return questions;
}

function build_3_4(sublesson) {
  const questions = [];
  /* Big vocab — multiple matching rounds + article picker */
  const nouns = sublesson.vocabulary.filter(v => v.article === 'el' || v.article === 'la');
  const adjs  = sublesson.vocabulary.filter(v => !v.article || v.article === '');
  for (let i = 0; i < 4; i++) {
    const pairs = shuffle(nouns).slice(0, 4).map(v => ({ es: v.es, en: v.en }));
    questions.push({ type: 'matching', pairs });
  }
  shuffle(nouns).slice(0, 8).forEach(v => {
    questions.push({ type: 'article-picker', vocab: v });
  });
  for (let i = 0; i < 2; i++) {
    const pairs = shuffle(adjs).slice(0, 4).map(v => ({ es: v.es, en: v.en }));
    questions.push({ type: 'matching', pairs });
  }
  return questions;
}

export const builders = {
  '3-1': build_3_1,
  '3-2': build_3_2,
  '3-3': build_3_3,
  '3-4': build_3_4,
};
