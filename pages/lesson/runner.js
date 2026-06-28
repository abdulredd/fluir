/* ─── Fluir · Lesson question runner ─────────────────────────────────────── */

import Store from '../../js/store.js';
import { collectChapterVocabIds } from '../../js/data/registry.js';
import { setupQuestionAudio } from '../../js/audio.js';
import { scoreTierClass } from '../../js/utils.js';
import {
  gameArticlePicker,
  gameFillArticle,
  gameMatching,
  gamePluralPicker,
  gameAdjectiveAgreement,
  gameTranslation,
  gameConjugationPicker,
  gameSerVsEstar,
  gameNumberQuiz,
  gameSentenceCompletion,
  gameVocabPicker,
} from '../../js/games.js';

function runQuestions(container, chapter, sublesson, subIndex, questions, qIndex, score, autoSkipRules, api) {
  if (qIndex >= questions.length) {
    api.startSubLesson(container, chapter, subIndex + 1, score, false, autoSkipRules);
    return;
  }

  Store.saveLessonState(chapter.id, {
    subIndex,
    qIndex,
    questions,
    sessionCorrect: score.correct,
    sessionTotal:   score.total,
    savedAt:        Date.now(),
  });

  const q    = questions[qIndex];
  const prog = Math.round(
    ((subIndex / chapter.sublessons.length) +
     (qIndex / (questions.length * chapter.sublessons.length))) * 100
  );

  const hasRules = (sublesson.rules || []).length > 0;

  container.innerHTML = `
    <div class="page active">
      <div class="quiz-header">
        <button class="btn btn--ghost btn--sm" id="back-btn"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg> Back</button>
        <div class="page-header__actions">
          <span class="text-xs text-muted">${sublesson.title}</span>
          ${hasRules ? `
            <button class="btn btn--ghost btn--sm" id="view-rules-btn" title="View lesson rules">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
              Rules
            </button>
          ` : ''}
        </div>
      </div>
      <div class="progress-track quiz-progress">
        <div class="progress-fill" style="width:${Math.max(prog, 5)}%"></div>
      </div>
      <div class="quiz-meta">
        <span class="text-xs text-muted">${qIndex + 1} of ${questions.length}</span>
        <span class="text-xs quiz-score">${score.correct} correct</span>
      </div>
      <div id="game-content"></div>
    </div>
  `;

  const gameContent = container.querySelector('#game-content');

  container.querySelector('#back-btn').addEventListener('click', () => {
    api.renderChapterIntro(container, chapter);
  });

  container.querySelector('#view-rules-btn')?.addEventListener('click', () => {
    const returnToQuiz = () => runQuestions(container, chapter, sublesson, subIndex, questions, qIndex, score, autoSkipRules, api);
    api.renderRuleCards(container, chapter, sublesson, subIndex, score, {
      onExit:     returnToQuiz,
      onComplete: returnToQuiz,
      lastLabel:  'Back to questions →',
    });
  });

  function onAnswer(isCorrect) {
    if (score.total === 0) Store.recordStudySession();
    if (isCorrect) score.correct++;
    score.total++;
  }

  gameContent.addEventListener('game:next', () => {
    runQuestions(container, chapter, sublesson, subIndex, questions, qIndex + 1, score, autoSkipRules, api);
  }, { once: true });

  switch (q.type) {
    case 'article-picker':  gameArticlePicker(gameContent, q, onAnswer);       break;
    case 'fill-article':    gameFillArticle(gameContent, q, onAnswer);         break;
    case 'matching':        gameMatching(gameContent, q, onAnswer);             break;
    case 'plural-picker':   gamePluralPicker(gameContent, q, onAnswer);        break;
    case 'adjective':       gameAdjectiveAgreement(gameContent, q, onAnswer);  break;
    case 'translation':     gameTranslation(gameContent, q, onAnswer);         break;
    case 'conjugation':     gameConjugationPicker(gameContent, q, onAnswer);   break;
    case 'ser-vs-estar':    gameSerVsEstar(gameContent, q, onAnswer);          break;
    case 'number-quiz':          gameNumberQuiz(gameContent, q, onAnswer);          break;
    case 'sentence-completion':  gameSentenceCompletion(gameContent, q, onAnswer);  break;
    case 'vocab-picker':         gameVocabPicker(gameContent, q, onAnswer);         break;
    default:                     gameContent.dispatchEvent(new CustomEvent('game:next'));
  }

  setupQuestionAudio(gameContent, q);
}

function renderLessonComplete(container, chapter, score) {
  const pct = score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0;
  Store.recordChapterComplete(chapter.id, pct);
  Store.recordStudySession();
  Store.clearLessonState(chapter.id);

  const allVocabIds = collectChapterVocabIds(chapter);
  Store.addToAnkiQueue(allVocabIds);

  const grade      = pct >= 90 ? '¡Excelente!' : pct >= 70 ? '¡Bien hecho!' : pct >= 50 ? '¡Buen esfuerzo!' : '¡Sigue practicando!';
  const scoreClass = scoreTierClass(pct);

  container.innerHTML = `
    <div class="page active lesson-complete">
      <div class="lesson-complete__pct ${scoreClass}">${pct}%</div>
      <div class="lesson-complete__grade">${grade}</div>
      <div class="text-muted text-sm lesson-complete__summary">${score.correct} correct out of ${score.total} · Chapter ${chapter.id}</div>

      <div class="metrics-row mb-6">
        <div class="metric">
          <div class="metric__value metric__value--green">${score.correct}</div>
          <div class="metric__label">Correct</div>
        </div>
        <div class="metric">
          <div class="metric__value metric__value--red">${score.total - score.correct}</div>
          <div class="metric__label">Missed</div>
        </div>
        <div class="metric">
          <div class="metric__value metric__value--amber">${allVocabIds.length}</div>
          <div class="metric__label">Anki cards</div>
        </div>
      </div>

      <div class="notice-banner notice-banner--amber mb-6">
        <div class="notice-banner__label">Anki export ready</div>
        <div class="notice-banner__body">${allVocabIds.length} vocabulary cards queued. Go to Settings to download your deck.</div>
      </div>

      <div class="page-actions">
        <button class="btn btn--primary btn--full btn--lg" id="complete-home-btn">Back to chapters</button>
        <button class="btn btn--full" id="complete-training-btn">Training Grounds →</button>
        <button class="btn btn--ghost btn--full" id="complete-retry-btn">Study again</button>
      </div>
    </div>
  `;

  container.querySelector('#complete-home-btn').addEventListener('click', () => {
    location.hash = '#/';
  });
  container.querySelector('#complete-training-btn').addEventListener('click', () => {
    location.hash = `#/training/${chapter.id}`;
  });
  container.querySelector('#complete-retry-btn').addEventListener('click', () => {
    location.hash = `#/chapter/${chapter.id}`;
  });
}

function renderUnknownChapter(container, chapterId) {
  container.innerHTML = `
    <div class="page active">
      <div class="page-header">
        <button class="btn btn--ghost btn--sm" id="back-btn">← Back</button>
      </div>
      <div class="empty-state">
        <div class="empty-state__title">Chapter ${chapterId} not yet available</div>
        <div class="empty-state__body">This chapter hasn't been added to Fluir yet. Start with Chapter 1.</div>
      </div>
    </div>
  `;

  container.querySelector('#back-btn')?.addEventListener('click', () => history.back());
}

export { runQuestions, renderLessonComplete, renderUnknownChapter };
