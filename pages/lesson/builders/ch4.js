import { shuffle } from '../../../js/utils.js';
import { addMatching } from '../builder-utils.js';

function build_4_1(sublesson) {
  const questions = [];
  const drills = sublesson.numberDrills;
  shuffle(drills).slice(0, 10).forEach(d => {
    const distractors = shuffle(drills.filter(x => x.spanish !== d.spanish)).slice(0, 3).map(x => x.spanish);
    questions.push({ type: 'number-quiz', mode: 'numeral-to-word', numeral: d.numeral, spanish: d.spanish, distractors });
  });
  shuffle(drills).slice(0, 6).forEach(d => {
    const distractors = shuffle(drills.filter(x => x.numeral !== d.numeral)).slice(0, 3).map(x => x.numeral);
    questions.push({ type: 'number-quiz', mode: 'word-to-numeral', numeral: d.numeral, spanish: d.spanish, distractors });
  });
  return questions;
}

function build_4_2(sublesson) {
  const questions = [];
  const drills = sublesson.ordinalDrills;
  shuffle(drills).slice(0, 8).forEach(d => {
    const distractors = shuffle(drills.filter(x => x.numeral !== d.numeral)).slice(0, 3).map(x => x.masculine);
    questions.push({ type: 'number-quiz', mode: 'numeral-to-word', numeral: d.numeral, spanish: d.masculine, distractors });
  });
  addMatching(questions, sublesson.vocabulary, { rounds: 2 });
  return questions;
}

function build_4_3(sublesson) {
  const questions = [];
  const drills = sublesson.dateDrills;
  shuffle(drills).slice(0, 8).forEach(d => {
    const distractors = shuffle(drills.filter(x => x.spanish !== d.spanish)).slice(0, 3).map(x => x.spanish);
    questions.push({ type: 'number-quiz', mode: 'numeral-to-word', numeral: d.numeral, spanish: d.spanish, distractors });
  });
  addMatching(questions, sublesson.vocabulary.filter(v => v.article));
  return questions;
}

function build_4_4(sublesson) {
  const questions = [];
  const drills = sublesson.timeDrills;
  shuffle(drills).slice(0, 12).forEach(d => {
    const distractors = shuffle(drills.filter(x => x.spanish !== d.spanish)).slice(0, 3).map(x => x.spanish);
    questions.push({ type: 'number-quiz', mode: 'time-to-spanish', numeral: d.numeral, spanish: d.spanish, distractors });
  });
  addMatching(questions, sublesson.vocabulary.filter(v => v.article === 'el' || v.article === 'la'), { rounds: 2 });
  return questions;
}

export const builders = {
  '4-1': build_4_1,
  '4-2': build_4_2,
  '4-3': build_4_3,
  '4-4': build_4_4,
};
