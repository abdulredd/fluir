/* ─── Fluir · Lesson flow factory ──────────────────────────────────────────── */

import Store from '../../js/store.js';
import { CHAPTERS } from '../../js/data/registry.js';
import { buildQuestions } from './questions.js';
import { reviewAllRules as reviewAllRulesView, renderRuleCards as renderRuleCardsView } from './rules.js';
import { runQuestions as runQuestionsView, renderLessonComplete, renderUnknownChapter } from './runner.js';
import { renderChapterIntro as renderChapterIntroView } from './intro.js';

/**
 * @typedef {object} LessonApi
 * @property {(container: Element, chapter: object) => void} renderChapterIntro
 * @property {(container: Element, chapter: object) => void} reviewAllRules
 * @property {(container: Element, chapter: object, sublesson: object, subIndex: number, sessionScore: object, options?: object) => void} renderRuleCards
 * @property {(container: Element, chapter: object, sublesson: object, subIndex: number, sessionScore: object, resumeFromQ?: number, autoSkipRules?: boolean) => void} buildQuestionQueue
 * @property {(container: Element, chapter: object, subIndex: number, sessionScore: object, skipRules?: boolean, autoSkipRules?: boolean) => void} startSubLesson
 * @property {(container: Element, chapter: object, sublesson: object, subIndex: number, questions: object[], qIndex: number, score: object, autoSkipRules?: boolean) => void} runQuestions
 */

/** @returns {{ renderLesson: (container: Element, chapterId: number|string) => void }} */
function createLessonFlow() {
  /** @type {LessonApi} */
  const api = {
    renderChapterIntro(container, chapter) {
      renderChapterIntroView(container, chapter, api);
    },

    reviewAllRules(container, chapter) {
      reviewAllRulesView(container, chapter, api);
    },

    renderRuleCards(container, chapter, sublesson, subIndex, sessionScore, options = {}) {
      renderRuleCardsView(container, chapter, sublesson, subIndex, sessionScore, api, options);
    },

    buildQuestionQueue(container, chapter, sublesson, subIndex, sessionScore, resumeFromQ = 0, autoSkipRules = false) {
      const questions = buildQuestions(sublesson);

      Store.saveLessonState(chapter.id, {
        subIndex,
        qIndex:         resumeFromQ,
        questions,
        sessionCorrect: sessionScore.correct,
        sessionTotal:   sessionScore.total,
        savedAt:        Date.now(),
      });

      api.runQuestions(container, chapter, sublesson, subIndex, questions, resumeFromQ, { ...sessionScore }, autoSkipRules);
    },

    startSubLesson(container, chapter, subIndex, sessionScore, skipRules = false, autoSkipRules = false) {
      const sublesson = chapter.sublessons[subIndex];
      if (!sublesson) {
        renderLessonComplete(container, chapter, sessionScore);
        return;
      }
      if (skipRules || autoSkipRules) {
        api.buildQuestionQueue(container, chapter, sublesson, subIndex, sessionScore, 0, autoSkipRules);
      } else {
        api.renderRuleCards(container, chapter, sublesson, subIndex, sessionScore);
      }
    },

    runQuestions(container, chapter, sublesson, subIndex, questions, qIndex, score, autoSkipRules = false) {
      runQuestionsView(container, chapter, sublesson, subIndex, questions, qIndex, score, autoSkipRules, api);
    },
  };

  function renderLesson(container, chapterId) {
    const chapter = CHAPTERS[chapterId];
    Store.recordChapterStart(chapterId);
    if (!chapter) {
      renderUnknownChapter(container, chapterId);
      return;
    }
    api.renderChapterIntro(container, chapter);
  }

  return { renderLesson };
}

const { renderLesson } = createLessonFlow();

export { createLessonFlow, renderLesson };
