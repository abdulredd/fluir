/* ─── Fluir · Lesson flow factory ──────────────────────────────────────────── */

/** @import { Chapter, Sublesson, SessionScore, LessonQuestion, LessonApi } from '../../js/types.js' */

import Store from '../../js/store.js';
import { loadChapter } from '../../js/data/registry.js';
import { buildQuestions, prepareQuestions } from './questions.js';
import { reviewAllRules as reviewAllRulesView, renderRuleCards as renderRuleCardsView } from './rules.js';
import { runQuestions as runQuestionsView, renderLessonComplete, renderUnknownChapter } from './runner.js';
import { renderChapterIntro as renderChapterIntroView } from './intro.js';

/**
 * @returns {{ renderLesson: (container: Element, chapterId: number|string) => void }}
 */
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

    async buildQuestionQueue(container, chapter, sublesson, subIndex, sessionScore, resumeFromQ = 0, autoSkipRules = false) {
      await prepareQuestions(sublesson);
      const questions = buildQuestions(sublesson);

      if (!questions.length) {
        container.innerHTML = `
          <div class="page active">
            <div class="empty-state empty-state--padded">
              <div class="empty-state__title">No questions for this lesson</div>
              <div class="empty-state__body">${sublesson.title} has no quiz content yet.</div>
              <button class="btn btn--primary" id="empty-back" style="margin-top:var(--space-4)">Back to chapter</button>
            </div>
          </div>`;
        container.querySelector('#empty-back')?.addEventListener('click', () => {
          api.renderChapterIntro(container, chapter);
        });
        return;
      }

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

  async function renderLesson(container, chapterId) {
    const id = Number(chapterId);
    if (!Number.isFinite(id) || id < 1) {
      renderUnknownChapter(container, chapterId);
      return;
    }
    container.innerHTML = `
      <div class="page active">
        <div class="empty-state empty-state--padded">
          <div class="empty-state__title">Loading chapter…</div>
        </div>
      </div>`;
    const chapter = await loadChapter(id);
    if (!chapter) {
      renderUnknownChapter(container, id);
      return;
    }
    Store.recordChapterStart(id);
    api.renderChapterIntro(container, chapter);
  }

  return { renderLesson };
}

const { renderLesson } = createLessonFlow();

export { createLessonFlow, renderLesson };
