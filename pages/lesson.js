/* ─── Fluir · Lesson engine ──────────────────────────────────────────────── */

import Store from '../js/store.js';
import CHAPTER_1 from '../js/data/chapter1.js';
import CHAPTER_2 from '../js/data/chapter2.js';
import CHAPTER_3 from '../js/data/chapter3.js';
import CHAPTER_4 from '../js/data/chapter4.js';
import CHAPTER_5, { ALL_VERBS_CH5, conjugate as conjugateCh5 } from '../js/data/chapter5.js';
import CHAPTER_6, { ALL_VERBS_CH6, conjugateIrr } from '../js/data/chapter6.js';
import CHAPTER_7 from '../js/data/chapter7.js';
import CHAPTER_8 from '../js/data/chapter8.js';
import CHAPTER_9 from '../js/data/chapter9.js';
import CHAPTER_10 from '../js/data/chapter10.js';
import CHAPTER_11 from '../js/data/chapter11.js';
import CHAPTER_12 from '../js/data/chapter12.js';
import CHAPTER_13, { subjunctiveFromYo } from '../js/data/chapter13.js';
import CHAPTER_14, { conjugatePreterit } from '../js/data/chapter14.js';
import CHAPTER_15, { conjugateImperfect } from '../js/data/chapter15.js';
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
} from '../js/games.js';
import { showToast, showConfirmSheet } from '../js/app.js';

const CHAPTERS = { 1: CHAPTER_1, 2: CHAPTER_2, 3: CHAPTER_3, 4: CHAPTER_4, 5: CHAPTER_5, 6: CHAPTER_6, 7: CHAPTER_7, 8: CHAPTER_8, 9: CHAPTER_9, 10: CHAPTER_10, 11: CHAPTER_11, 12: CHAPTER_12, 13: CHAPTER_13, 14: CHAPTER_14, 15: CHAPTER_15 };

function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5); }

/* ════════════════════════════════════════════════════════════════════════════
   Entry point
   ════════════════════════════════════════════════════════════════════════════ */

function renderLesson(container, chapterId) {
  const chapter = CHAPTERS[chapterId];
  Store.recordChapterStart(chapterId);
  if (!chapter) { renderUnknownChapter(container, chapterId); return; }
  renderChapterIntro(container, chapter);
}

/* ── Chapter intro ── */

function renderChapterIntro(container, chapter) {
  const progress    = Store.getProgress();
  const complete    = progress.chaptersComplete.includes(chapter.id);
  const score       = progress.lessonScores[chapter.id];
  const savedState  = Store.getLessonState(chapter.id);
  const hasResume   = savedState && !complete && savedState.sessionTotal > 0;
  const VOCAB_KEYS = [
    'vocabulary', 'adjectives', 'verbs', 'idioms', 'tenerExpressions', 'hacerExpressions',
    'locationPrepositions', 'porExpressions', 'becomeExpressions', 'movementVerbs',
    'reciprocalVerbs', 'impersonalExpressions', 'emotionVerbs', 'commandVerbs', 'conjunctions',
    'readingVocab',
  ];
  const vocabCount = chapter.sublessons.reduce((n, s) =>
    n + VOCAB_KEYS.reduce((m, k) => m + (s[k]?.length ?? 0), 0), 0);

  const resumeSubLesson = hasResume ? chapter.sublessons[savedState.subIndex] : null;
  const resumeQIndex    = hasResume ? (savedState.qIndex   || 0) : 0;
  const resumeQTotal    = hasResume && savedState.questions ? savedState.questions.length : 0;

  container.innerHTML = `
    <div class="page active">
      <div style="display:flex;align-items:center;gap:var(--space-3);margin-bottom:var(--space-5)">
        <button class="btn btn--ghost btn--sm" onclick="history.back()">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          Back
        </button>
        ${complete ? `<span style="font-size:var(--text-xs);color:var(--color-green);background:var(--color-green-bg);padding:2px 8px;border-radius:var(--radius-sm);border:0.5px solid var(--color-green);">Complete</span>` : ''}
      </div>

      <div style="font-size:var(--text-xs);color:var(--text-muted);text-transform:uppercase;letter-spacing:0.08em;font-weight:700;margin-bottom:var(--space-3)">Chapter ${chapter.id}</div>
      <h2 style="font-family:var(--font-serif);color:var(--color-purple);font-weight:normal;margin-bottom:var(--space-2)">${chapter.title}</h2>
      <p class="text-muted text-sm" style="margin-bottom:var(--space-6)">${vocabCount} vocabulary items · ${chapter.sublessons.length} lessons</p>

      ${score ? `
        <div class="card" style="margin-bottom:var(--space-5);display:flex;align-items:center;justify-content:space-between">
          <div>
            <div class="text-sm text-bright">Best score</div>
            <div class="text-muted" style="font-size:var(--text-xs)">${score.attempts} attempt${score.attempts !== 1 ? 's' : ''}</div>
          </div>
          <div style="font-family:var(--font-serif);font-size:var(--text-2xl);color:${score.best >= 80 ? 'var(--color-green)' : score.best >= 60 ? 'var(--color-amber)' : 'var(--color-red)'}">${score.best}%</div>
        </div>
      ` : ''}

      ${hasResume ? `
        <div style="background:var(--color-cyan-bg);border:0.5px solid var(--color-cyan);border-radius:var(--radius-md);padding:var(--space-3) var(--space-4);margin-bottom:var(--space-5)">
          <div style="font-size:var(--text-xs);color:var(--color-cyan);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px">In progress</div>
          <div style="font-size:var(--text-sm);color:var(--text-bright)">Lesson ${savedState.subIndex + 1} — ${resumeSubLesson?.title}</div>
          <div style="font-size:var(--text-xs);color:var(--text-muted);margin-top:2px">Question ${resumeQIndex + 1} of ${resumeQTotal} · ${savedState.sessionCorrect} correct so far</div>
        </div>
      ` : ''}

      <div class="section-label">Lessons</div>
      ${chapter.sublessons.map((sl, i) => {
        const isDone    = hasResume && i < savedState.subIndex;
        const isCurrent = hasResume && i === savedState.subIndex;
        return `
          <div class="card chapter-card" data-sub="${i}" style="margin-bottom:var(--space-3);display:flex;align-items:center;gap:var(--space-3);cursor:pointer;">
            <div style="width:32px;height:32px;border-radius:var(--radius-md);background:${isDone ? 'var(--color-green-bg)' : isCurrent ? 'var(--color-cyan-bg)' : 'var(--bg-panel)'};border:0.5px solid ${isDone ? 'var(--color-green)' : isCurrent ? 'var(--color-cyan)' : 'var(--border-subtle)'};display:flex;align-items:center;justify-content:center;font-family:var(--font-serif);font-size:var(--text-md);color:${isDone ? 'var(--color-green)' : isCurrent ? 'var(--color-cyan)' : 'var(--color-purple)'};flex-shrink:0">
              ${isDone ? `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>` : i + 1}
            </div>
            <div style="flex:1">
              <div class="text-sm text-bright">${sl.title}</div>
              <div class="text-muted" style="font-size:var(--text-xs)">${isDone ? 'Complete' : isCurrent ? 'Resume here' : sl.subtitle}</div>
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="color:var(--text-muted);flex-shrink:0"><polyline points="9 18 15 12 9 6"/></svg>
          </div>
        `;
      }).join('')}

      <div style="display:flex;flex-direction:column;gap:var(--space-3);margin-top:var(--space-6)">
        ${hasResume ? `
          <button class="btn btn--primary btn--full btn--lg" id="resume-btn">Resume lesson →</button>
          <button class="btn btn--ghost btn--full" id="start-btn">Start over from the beginning</button>
        ` : `
          <button class="btn btn--primary btn--full btn--lg" id="start-btn">
            ${complete ? 'Study Again' : 'Begin Lesson'}
          </button>
          <button class="btn btn--ghost btn--full" id="rules-btn">Review chapter rules</button>
        `}
      </div>
    </div>
  `;

  container.querySelector('#start-btn').addEventListener('click', () => {
    Store.clearLessonState(chapter.id);
    startSubLesson(container, chapter, 0, { correct: 0, total: 0 }, true, true);
  });

  container.querySelectorAll('[data-sub]').forEach(el => {
    el.addEventListener('click', () => {
      const targetSub = parseInt(el.dataset.sub);
      if (hasResume && savedState.subIndex !== targetSub) {
        const lessonName = chapter.sublessons[savedState.subIndex]?.title || `Lesson ${savedState.subIndex + 1}`;
        showConfirmSheet({
          title:        'Unsaved progress',
          body:         `You're in the middle of "${lessonName}." Starting a different lesson will lose your progress.`,
          confirmLabel: 'Start new lesson',
          cancelLabel:  'Go back',
          onConfirm:    () => {
            Store.clearLessonState(chapter.id);
            startSubLesson(container, chapter, targetSub, { correct: 0, total: 0 }, true);
          },
        });
        return;
      }
      Store.clearLessonState(chapter.id);
      startSubLesson(container, chapter, targetSub, { correct: 0, total: 0 }, true);
    });
  });

  container.querySelector('#rules-btn')?.addEventListener('click', () => {
    Store.clearLessonState(chapter.id);
    reviewAllRules(container, chapter);
  });

  container.querySelector('#resume-btn')?.addEventListener('click', () => {
    const sublesson = chapter.sublessons[savedState.subIndex];
    if (!sublesson) return;
    const questions = savedState.questions || [];
    const qIndex    = savedState.qIndex    || 0;
    const score     = { correct: savedState.sessionCorrect, total: savedState.sessionTotal };
    if (questions.length > 0) {
      runQuestions(container, chapter, sublesson, savedState.subIndex, questions, qIndex, score);
    } else {
      buildQuestionQueue(container, chapter, sublesson, savedState.subIndex, score);
    }
  });
}

/* ════════════════════════════════════════════════════════════════════════════
   Lesson flow
   ════════════════════════════════════════════════════════════════════════════ */

function startSubLesson(container, chapter, subIndex, sessionScore, skipRules = false, autoSkipRules = false) {
  const sublesson = chapter.sublessons[subIndex];
  if (!sublesson) { renderLessonComplete(container, chapter, sessionScore); return; }
  if (skipRules || autoSkipRules) {
    buildQuestionQueue(container, chapter, sublesson, subIndex, sessionScore, 0, autoSkipRules);
  } else {
    renderRuleCards(container, chapter, sublesson, subIndex, sessionScore);
  }
}

/* ── Chapter-wide rules review (no quizzes) ── */

function reviewAllRules(container, chapter) {
  const allRules = [];
  chapter.sublessons.forEach((sl, sIdx) => {
    (sl.rules || []).forEach(rule => {
      allRules.push({ rule, sublesson: sl, sublessonNumber: sIdx + 1 });
    });
  });

  if (allRules.length === 0) {
    renderChapterIntro(container, chapter);
    return;
  }

  let ruleIndex = 0;

  function showRule() {
    const { rule, sublesson, sublessonNumber } = allRules[ruleIndex];
    const isLast   = ruleIndex === allRules.length - 1;
    const isFirst  = ruleIndex === 0;
    const ruleProg = Math.round(((ruleIndex + 1) / allRules.length) * 100);

    container.innerHTML = `
      <div class="page active">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:var(--space-4)">
          <button class="btn btn--ghost btn--sm" id="back-btn"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg> Back</button>
          <span class="text-xs text-muted">${ruleIndex + 1} of ${allRules.length} rules</span>
        </div>

        <div class="progress-track" style="margin-bottom:var(--space-5)">
          <div class="progress-fill" style="width:${Math.max(ruleProg, 3)}%"></div>
        </div>

        <div style="display:inline-block;font-size:var(--text-xs);background:var(--color-purple-bg);color:var(--color-purple);border:0.5px solid var(--color-purple);border-radius:var(--radius-sm);padding:2px 8px;margin-bottom:var(--space-4);letter-spacing:0.05em;text-transform:uppercase">Lesson ${sublessonNumber} · ${sublesson.title}</div>

        <div class="card" style="margin-bottom:var(--space-5)">
          <h3 style="font-family:var(--font-serif);color:var(--color-purple);font-weight:normal;margin-bottom:var(--space-3)">${rule.heading}</h3>
          <p style="font-size:var(--text-sm);color:var(--text-primary);margin-bottom:var(--space-4);line-height:1.7">${rule.body}</p>

          <div style="background:var(--bg-panel);border-radius:var(--radius-md);padding:var(--space-3) var(--space-4);margin-bottom:${rule.tip ? 'var(--space-3)' : '0'}">
            ${rule.examples.map(ex => `
              <div style="display:flex;align-items:baseline;justify-content:space-between;padding:5px 0;border-bottom:0.5px solid var(--border-muted)">
                <span style="font-family:var(--font-serif);font-size:var(--text-md);color:var(--color-amber)">${ex.es}</span>
                <span style="font-size:var(--text-xs);color:var(--text-muted)">${ex.en}${ex.note ? ` · <em style="color:var(--color-cyan)">${ex.note}</em>` : ''}</span>
              </div>
            `).join('')}
          </div>

          ${rule.tip ? `
            <div style="margin-top:var(--space-3);padding:var(--space-2) var(--space-3);border-left:2px solid var(--color-amber);border-radius:0;font-size:var(--text-xs);color:var(--color-amber);line-height:1.5">${rule.tip}</div>
          ` : ''}
        </div>

        <div style="display:flex;align-items:center;gap:var(--space-3)">
          ${isFirst
            ? `<div class="btn btn--full btn--lg" style="visibility:hidden"></div>`
            : `<button class="btn btn--full btn--lg" id="rule-prev">← Prev rule</button>`
          }
          <button class="btn ${isLast ? 'btn--primary' : ''} btn--full btn--lg" id="rule-next">
            ${isLast ? 'Begin Lesson →' : 'Next rule →'}
          </button>
        </div>
      </div>
    `;

    container.querySelector('#rule-next').addEventListener('click', () => {
      if (isLast) {
        startSubLesson(container, chapter, 0, { correct: 0, total: 0 }, true, true);
      } else {
        ruleIndex++;
        showRule();
      }
    });
    container.querySelector('#rule-prev')?.addEventListener('click', () => {
      ruleIndex--;
      showRule();
    });
    container.querySelector('#back-btn').addEventListener('click', () => {
      renderChapterIntro(container, chapter);
    });
  }

  showRule();
}

/* ── Teach-first rule cards ── */

function renderRuleCards(container, chapter, sublesson, subIndex, sessionScore, options = {}) {
  const onExit     = options.onExit     || (() => renderChapterIntro(container, chapter));
  const onComplete = options.onComplete || (() => buildQuestionQueue(container, chapter, sublesson, subIndex, sessionScore));
  const lastLabel  = options.lastLabel  || 'Begin Lesson →';

  let ruleIndex = 0;
  const rules   = sublesson.rules || [];

  function showRule() {
    if (ruleIndex >= rules.length) {
      onComplete();
      return;
    }

    const rule      = rules[ruleIndex];
    const isLast    = ruleIndex === rules.length - 1;
    const ruleProg  = Math.round(((ruleIndex + 1) / rules.length) * 100);

    container.innerHTML = `
      <div class="page active">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:var(--space-4)">
          <button class="btn btn--ghost btn--sm" id="back-btn"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg> Back</button>
          <span class="text-xs text-muted">${ruleIndex + 1} of ${rules.length} rules</span>
        </div>

        <div class="progress-track" style="margin-bottom:var(--space-5)">
          <div class="progress-fill" style="width:${Math.max(ruleProg, 3)}%"></div>
        </div>

        <div style="display:inline-block;font-size:var(--text-xs);background:var(--color-purple-bg);color:var(--color-purple);border:0.5px solid var(--color-purple);border-radius:var(--radius-sm);padding:2px 8px;margin-bottom:var(--space-4);letter-spacing:0.05em;text-transform:uppercase">${sublesson.title}</div>

        <div class="card" style="margin-bottom:var(--space-5)">
          <h3 style="font-family:var(--font-serif);color:var(--color-purple);font-weight:normal;margin-bottom:var(--space-3)">${rule.heading}</h3>
          <p style="font-size:var(--text-sm);color:var(--text-primary);margin-bottom:var(--space-4);line-height:1.7">${rule.body}</p>

          <div style="background:var(--bg-panel);border-radius:var(--radius-md);padding:var(--space-3) var(--space-4);margin-bottom:${rule.tip ? 'var(--space-3)' : '0'}">
            ${rule.examples.map(ex => `
              <div style="display:flex;align-items:baseline;justify-content:space-between;padding:5px 0;border-bottom:0.5px solid var(--border-muted)">
                <span style="font-family:var(--font-serif);font-size:var(--text-md);color:var(--color-amber)">${ex.es}</span>
                <span style="font-size:var(--text-xs);color:var(--text-muted)">${ex.en}${ex.note ? ` · <em style="color:var(--color-cyan)">${ex.note}</em>` : ''}</span>
              </div>
            `).join('')}
          </div>

          ${rule.tip ? `
            <div style="margin-top:var(--space-3);padding:var(--space-2) var(--space-3);border-left:2px solid var(--color-amber);border-radius:0;font-size:var(--text-xs);color:var(--color-amber);line-height:1.5">${rule.tip}</div>
          ` : ''}
        </div>

        <div style="display:flex;align-items:center;gap:var(--space-3)">
          ${ruleIndex > 0
            ? `<button class="btn btn--full btn--lg" id="rule-prev">← Prev rule</button>`
            : `<div class="btn btn--full btn--lg" style="visibility:hidden"></div>`
          }
          <button class="btn ${isLast ? 'btn--primary' : ''} btn--full btn--lg" id="rule-next">
            ${isLast ? lastLabel : 'Next rule →'}
          </button>
        </div>
      </div>
    `;

    container.querySelector('#rule-next').addEventListener('click', () => {
      ruleIndex++;
      showRule();
    });
    container.querySelector('#rule-prev')?.addEventListener('click', () => {
      ruleIndex--;
      showRule();
    });
    container.querySelector('#back-btn').addEventListener('click', onExit);
  }

  showRule();
}

/* ════════════════════════════════════════════════════════════════════════════
   Question queue builder
   ════════════════════════════════════════════════════════════════════════════ */

function buildQuestionQueue(container, chapter, sublesson, subIndex, sessionScore, resumeFromQ = 0, autoSkipRules = false) {
  const questions = [];

  /* ── Chapter 1 ── */
  if (sublesson.id === '1-1') {
    const vocab  = sublesson.vocabulary.filter(v => v.gender !== 'n');
    const sample = shuffle(vocab).slice(0, 15);
    sample.forEach((v, i) => {
      if (i % 3 === 0)      questions.push({ type: 'article-picker', vocab: v });
      else if (i % 3 === 1) questions.push({ type: 'fill-article',   vocab: v });
      else                  questions.push({ type: 'translation',    vocab: v });
    });
    const pairs = shuffle(vocab).slice(0, 4).map(v => ({ es: `${v.article} ${v.es}`, en: v.en }));
    questions.push({ type: 'matching', pairs });

  } else if (sublesson.id === '1-2') {
    const vocab = sublesson.vocabulary;
    shuffle(vocab).slice(0, 10).forEach((v, i) => {
      const vWithIndef = { ...v, article: v.indef };
      if (i % 2 === 0) questions.push({ type: 'article-picker',  vocab: vWithIndef });
      else             questions.push({ type: 'plural-picker',   vocab: vWithIndef });
    });
    const pairs = shuffle(vocab).slice(0, 4).map(v => ({ es: `${v.indef} ${v.es}`, en: v.en }));
    questions.push({ type: 'matching', pairs });

  } else if (sublesson.id === '1-3') {
    const adjs  = sublesson.adjectives;
    const nouns = [
      { es: 'libro',    en: 'book',   gender: 'm' },
      { es: 'casa',     en: 'house',  gender: 'f' },
      { es: 'perro',    en: 'dog',    gender: 'm' },
      { es: 'muchacha', en: 'girl',   gender: 'f' },
      { es: 'hotel',    en: 'hotel',  gender: 'm' },
      { es: 'lámpara',  en: 'lamp',   gender: 'f' },
    ];
    shuffle(adjs).slice(0, 10).forEach((adj, i) => {
      questions.push({ type: 'adjective', noun: nouns[i % nouns.length], adjective: adj });
    });
    const pairs = shuffle(adjs).slice(0, 4).map(a => ({ es: a.es, en: a.en }));
    questions.push({ type: 'matching', pairs });

  /* ── Chapter 2 ── */
  } else if (sublesson.id === '2-1') {
    const vocab = sublesson.vocabulary;
    for (let i = 0; i < 3; i++) {
      const pairs = shuffle(vocab).slice(0, 4).map(v => ({ es: v.es, en: v.en }));
      questions.push({ type: 'matching', pairs });
    }
    shuffle(vocab).slice(0, 6).forEach(v => {
      const distractors = shuffle(vocab.filter(o => o.id !== v.id)).slice(0, 3).map(o => o.es);
      questions.push({ type: 'vocab-picker', vocab: v, distractors });
    });

  } else if (sublesson.id === '2-2') {
    const conjs = sublesson.conjugations;
    shuffle(conjs).slice(0, 9).forEach(c => {
      questions.push({ type: 'conjugation', pronoun: c.pronoun, correctForm: c.form, verb: 'estar', en: c.en, allForms: conjs });
    });
    const vocab = sublesson.vocabulary.filter(v => v.article);
    const pairs  = shuffle(vocab).slice(0, 4).map(v => ({ es: v.es, en: v.en }));
    questions.push({ type: 'matching', pairs });
    const pairs2 = shuffle(vocab).slice(0, 4).map(v => ({ es: v.es, en: v.en }));
    questions.push({ type: 'matching', pairs: pairs2 });

  } else if (sublesson.id === '2-3') {
    const conjs = sublesson.conjugations;
    shuffle(conjs).slice(0, 9).forEach(c => {
      questions.push({ type: 'conjugation', pronoun: c.pronoun, correctForm: c.form, verb: 'ser', en: c.en, allForms: conjs });
    });
    const vocab = sublesson.vocabulary.filter(v => v.article);
    const pairs  = shuffle(vocab).slice(0, 4).map(v => ({ es: v.es, en: v.en }));
    questions.push({ type: 'matching', pairs });
    shuffle(vocab).filter(v => v.article === 'el' || v.article === 'la').slice(0, 4).forEach(v => {
      questions.push({ type: 'article-picker', vocab: v });
    });

  } else if (sublesson.id === '2-4') {
    const svse = sublesson.serVsEstarQuestions;
    shuffle(svse).slice(0, 15).forEach(q => {
      questions.push({ type: 'ser-vs-estar', ...q });
    });
    const vocab  = sublesson.vocabulary;
    const pairs  = shuffle(vocab).slice(0, 4).map(v => ({ es: v.es, en: v.en }));
    questions.push({ type: 'matching', pairs });
    const pairs2 = shuffle(vocab).slice(0, 4).map(v => ({ es: v.es, en: v.en }));
    questions.push({ type: 'matching', pairs: pairs2 });

  /* ── Chapter 3 ── */
  } else if (sublesson.id === '3-1') {
    /* Hay drills — translation + matching */
    const vocab = sublesson.vocabulary.filter(v => v.article);
    for (let i = 0; i < 3; i++) {
      const pairs = shuffle(vocab).slice(0, 4).map(v => ({ es: v.es, en: v.en }));
      questions.push({ type: 'matching', pairs });
    }
    shuffle(vocab).slice(0, 6).forEach(v => {
      questions.push({ type: 'article-picker', vocab: v });
    });

  } else if (sublesson.id === '3-2') {
    /* Interrogatives — matching question word to meaning */
    const vocab = sublesson.vocabulary;
    for (let i = 0; i < 4; i++) {
      const pairs = shuffle(vocab).slice(0, 4).map(v => ({ es: v.es, en: v.en }));
      questions.push({ type: 'matching', pairs });
    }
    shuffle(vocab).slice(0, 6).forEach(v => {
      questions.push({ type: 'translation', vocab: { ...v, article: '' } });
    });

  } else if (sublesson.id === '3-3') {
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

  } else if (sublesson.id === '3-4') {
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

  /* ── Chapter 4 ── */
  } else if (sublesson.id === '4-1') {
    const drills = sublesson.numberDrills;
    shuffle(drills).slice(0, 10).forEach(d => {
      const distractors = shuffle(drills.filter(x => x.spanish !== d.spanish)).slice(0, 3).map(x => x.spanish);
      questions.push({ type: 'number-quiz', mode: 'numeral-to-word', numeral: d.numeral, spanish: d.spanish, distractors });
    });
    shuffle(drills).slice(0, 6).forEach(d => {
      const distractors = shuffle(drills.filter(x => x.numeral !== d.numeral)).slice(0, 3).map(x => x.numeral);
      questions.push({ type: 'number-quiz', mode: 'word-to-numeral', numeral: d.numeral, spanish: d.spanish, distractors });
    });

  } else if (sublesson.id === '4-2') {
    const drills = sublesson.ordinalDrills;
    shuffle(drills).slice(0, 8).forEach(d => {
      const distractors = shuffle(drills.filter(x => x.numeral !== d.numeral)).slice(0, 3).map(x => x.masculine);
      questions.push({ type: 'number-quiz', mode: 'numeral-to-word', numeral: d.numeral, spanish: d.masculine, distractors });
    });
    const vocab = sublesson.vocabulary;
    for (let i = 0; i < 2; i++) {
      const pairs = shuffle(vocab).slice(0, 4).map(v => ({ es: v.es, en: v.en }));
      questions.push({ type: 'matching', pairs });
    }

  } else if (sublesson.id === '4-3') {
    const drills = sublesson.dateDrills;
    shuffle(drills).slice(0, 8).forEach(d => {
      const distractors = shuffle(drills.filter(x => x.spanish !== d.spanish)).slice(0, 3).map(x => x.spanish);
      questions.push({ type: 'number-quiz', mode: 'numeral-to-word', numeral: d.numeral, spanish: d.spanish, distractors });
    });
    const vocab = sublesson.vocabulary.filter(v => v.article);
    const pairs = shuffle(vocab).slice(0, 4).map(v => ({ es: v.es, en: v.en }));
    questions.push({ type: 'matching', pairs });

  } else if (sublesson.id === '4-4') {
    const drills = sublesson.timeDrills;
    shuffle(drills).slice(0, 12).forEach(d => {
      const distractors = shuffle(drills.filter(x => x.spanish !== d.spanish)).slice(0, 3).map(x => x.spanish);
      questions.push({ type: 'number-quiz', mode: 'time-to-spanish', numeral: d.numeral, spanish: d.spanish, distractors });
    });
    const vocab = sublesson.vocabulary.filter(v => v.article === 'el' || v.article === 'la');
    for (let i = 0; i < 2; i++) {
      const pairs = shuffle(vocab).slice(0, 4).map(v => ({ es: v.es, en: v.en }));
      questions.push({ type: 'matching', pairs });
    }

  /* ── Chapter 5 ── */
  } else if (sublesson.id === '5-1') {
    /* -ar verbs — conjugation drill */
    const pronouns = ['yo','tú','él/ella','nosotros','ellos'];
    const verbs = sublesson.verbs;
    /* Matching: infinitive → meaning */
    for (let i = 0; i < 3; i++) {
      const pairs = shuffle(verbs).slice(0, 4).map(v => ({ es: v.infinitive, en: v.en }));
      questions.push({ type: 'matching', pairs });
    }
    /* Conjugation: given pronoun + infinitive, choose correct form */
    shuffle(verbs).slice(0, 10).forEach(v => {
      const pronoun = pronouns[Math.floor(Math.random() * pronouns.length)];
      const correctForm = conjugateCh5(v.stem, v.type, pronoun);
      const allForms = pronouns.map(p => ({ pronoun: p, form: conjugateCh5(v.stem, v.type, p) }));
      const uniqueForms = [...new Map(allForms.map(f => [f.form, f])).values()];
      questions.push({ type: 'conjugation', pronoun, correctForm, verb: v.infinitive, en: `${pronoun} ${v.en.replace('to ','')}`, allForms: uniqueForms });
    });

  } else if (sublesson.id === '5-2') {
    /* -er and -ir verbs — same pattern */
    const pronouns = ['yo','tú','él/ella','nosotros','ellos'];
    const verbs = sublesson.verbs;
    for (let i = 0; i < 3; i++) {
      const pairs = shuffle(verbs).slice(0, 4).map(v => ({ es: v.infinitive, en: v.en }));
      questions.push({ type: 'matching', pairs });
    }
    shuffle(verbs).slice(0, 10).forEach(v => {
      const pronoun = pronouns[Math.floor(Math.random() * pronouns.length)];
      const correctForm = conjugateCh5(v.stem, v.type, pronoun);
      const allForms = pronouns.map(p => ({ pronoun: p, form: conjugateCh5(v.stem, v.type, p) }));
      const uniqueForms = [...new Map(allForms.map(f => [f.form, f])).values()];
      questions.push({ type: 'conjugation', pronoun, correctForm, verb: v.infinitive, en: `${pronoun} ${v.en.replace('to ','')}`, allForms: uniqueForms });
    });

  } else if (sublesson.id === '5-3') {
    /* Multi-meaning verbs — matching + conjugation + vocab */
    const verbs = sublesson.verbs;
    const pronouns = ['yo','tú','él/ella','nosotros','ellos'];
    for (let i = 0; i < 2; i++) {
      const pairs = shuffle(verbs).slice(0, 4).map(v => ({ es: v.infinitive, en: v.en }));
      questions.push({ type: 'matching', pairs });
    }
    verbs.forEach(v => {
      const pronoun = pronouns[Math.floor(Math.random() * pronouns.length)];
      const correctForm = conjugateCh5(v.stem, v.type, pronoun);
      const allForms = pronouns.map(p => ({ pronoun: p, form: conjugateCh5(v.stem, v.type, p) }));
      const uniqueForms = [...new Map(allForms.map(f => [f.form, f])).values()];
      questions.push({ type: 'conjugation', pronoun, correctForm, verb: v.infinitive, en: `${pronoun} ${v.en.split('/')[0].replace('to ','')}`, allForms: uniqueForms });
    });
    const vocab = sublesson.vocabulary.filter(v => v.article);
    const pairs = shuffle(vocab).slice(0, 4).map(v => ({ es: v.es, en: v.en }));
    questions.push({ type: 'matching', pairs });

  } else if (sublesson.id === '5-4') {
    /* Mixed drill — all verbs, all pronouns */
    const pronouns = ['yo','tú','él/ella','nosotros','ellos','Ud.','Uds.'];
    const allVerbs = ALL_VERBS_CH5;
    shuffle(allVerbs).slice(0, 15).forEach(v => {
      const pronoun = pronouns[Math.floor(Math.random() * pronouns.length)];
      const correctForm = conjugateCh5(v.stem, v.type, pronoun);
      const allForms = ['yo','tú','él/ella','nosotros','ellos'].map(p => ({ pronoun: p, form: conjugateCh5(v.stem, v.type, p) }));
      const uniqueForms = [...new Map(allForms.map(f => [f.form, f])).values()];
      questions.push({ type: 'conjugation', pronoun, correctForm, verb: v.infinitive, en: `${pronoun} ${v.en.split('/')[0].replace('to ','')}`, allForms: uniqueForms });
    });
    for (let i = 0; i < 2; i++) {
      const pairs = shuffle(allVerbs).slice(0, 4).map(v => ({ es: v.infinitive, en: v.en }));
      questions.push({ type: 'matching', pairs });
    }

  /* ── Chapter 6 ── */
  } else if (sublesson.id === '6-1' || sublesson.id === '6-2' || sublesson.id === '6-3') {
    const pronouns = ['yo','tú','él/ella','nosotros','ellos'];
    const verbs = sublesson.verbs;

    /* Matching: infinitive → meaning */
    for (let i = 0; i < 2; i++) {
      const pairs = shuffle(verbs).slice(0, 4).map(v => ({ es: v.infinitive, en: v.en }));
      questions.push({ type: 'matching', pairs });
    }

    /* Conjugation: given pronoun, pick the correct irregular form */
    shuffle(verbs).slice(0, 10).forEach(v => {
      const pronoun = pronouns[Math.floor(Math.random() * pronouns.length)];
      const correctForm = conjugateIrr(v.forms, pronoun);
      /* Build distractor pool from other verbs' same pronoun forms */
      const distractorForms = verbs
        .filter(x => x.infinitive !== v.infinitive)
        .map(x => conjugateIrr(x.forms, pronoun))
        .filter(f => f !== correctForm);
      const allForms = pronouns.map(p => ({ pronoun: p, form: conjugateIrr(v.forms, p) }));
      const uniqueForms = [...new Map(allForms.map(f => [f.form, f])).values()];
      questions.push({
        type: 'conjugation',
        pronoun,
        correctForm,
        verb: v.infinitive,
        en: `${pronoun} ${v.en.split('/')[0].replace('to ','').trim()}`,
        allForms: uniqueForms,
      });
    });

  } else if (sublesson.id === '6-4') {
    /* Mixed irregular drill — all 24 verbs */
    const pronouns = ['yo','tú','él/ella','nosotros','ellos','Ud.','Uds.'];
    const allVerbs = ALL_VERBS_CH6;

    shuffle(allVerbs).slice(0, 18).forEach(v => {
      const pronoun = pronouns[Math.floor(Math.random() * pronouns.length)];
      const correctForm = conjugateIrr(v.forms, pronoun);
      const allForms = ['yo','tú','él/ella','nosotros','ellos'].map(p => ({ pronoun: p, form: conjugateIrr(v.forms, p) }));
      const uniqueForms = [...new Map(allForms.map(f => [f.form, f])).values()];
      questions.push({
        type: 'conjugation',
        pronoun,
        correctForm,
        verb: v.infinitive,
        en: `${pronoun} ${v.en.split('/')[0].replace('to ','').trim()}`,
        allForms: uniqueForms,
      });
    });

    /* Matching: infinitive → meaning, mixed across all groups */
    for (let i = 0; i < 3; i++) {
      const pairs = shuffle(allVerbs).slice(0, 4).map(v => ({ es: v.infinitive, en: v.en }));
      questions.push({ type: 'matching', pairs });
    }

  /* ── Chapter 7 ── */
  } else if (sublesson.id === '7-1') {
    /* ir conjugation drill */
    const conjs = sublesson.conjugations;
    shuffle(conjs).slice(0, 8).forEach(c => {
      questions.push({ type: 'conjugation', pronoun: c.pronoun, correctForm: c.form,
        verb: 'ir', en: c.en, allForms: conjs });
    });
    /* near future drills — matching construction → English */
    const drills = sublesson.futureDrills;
    for (let i = 0; i < 3; i++) {
      const pairs = shuffle(drills).slice(0, 4).map(d => ({ es: d.sentence, en: d.en }));
      questions.push({ type: 'matching', pairs });
    }
    /* vocabulary matching */
    const vocab = sublesson.vocabulary.filter(v => v.article);
    const pairs = shuffle(vocab).slice(0, 4).map(v => ({ es: v.es, en: v.en }));
    questions.push({ type: 'matching', pairs });

  } else if (sublesson.id === '7-2') {
    /* hacer expressions — matching */
    const hacer = sublesson.hacerExpressions;
    for (let i = 0; i < 2; i++) {
      const pairs = shuffle(hacer).slice(0, 4).map(h => ({ es: h.es, en: h.en }));
      questions.push({ type: 'matching', pairs });
    }
    /* tener expressions — matching, multiple rounds */
    const tener = sublesson.tenerExpressions;
    for (let i = 0; i < 4; i++) {
      const pairs = shuffle(tener).slice(0, 4).map(t => ({ es: t.es, en: t.en }));
      questions.push({ type: 'matching', pairs });
    }

  } else if (sublesson.id === '7-3') {
    /* Verbal idioms — matching construction → meaning */
    const idioms = sublesson.idioms;
    for (let i = 0; i < 3; i++) {
      const pairs = shuffle(idioms).slice(0, 4).map(id => ({ es: id.construction, en: id.en }));
      questions.push({ type: 'matching', pairs });
    }
    /* Conjugation drill — pick the right form for each idiom */
    idioms.forEach(idiom => {
      const conj = shuffle(idiom.conjugations)[0];
      const distractorForms = idioms
        .filter(x => x.construction !== idiom.construction)
        .map(x => shuffle(x.conjugations)[0].form);
      const allForms = idiom.conjugations.map(c => ({ pronoun: c.pronoun, form: c.form }));
      questions.push({
        type: 'conjugation',
        pronoun: conj.pronoun,
        correctForm: conj.form,
        verb: idiom.construction,
        en: `${conj.pronoun} ${idiom.en}`,
        allForms,
      });
    });

  } else if (sublesson.id === '7-4') {
    /* New -ar verbs — matching + conjugation */
    const verbs = sublesson.verbs;
    for (let i = 0; i < 4; i++) {
      const pairs = shuffle(verbs).slice(0, 4).map(v => ({ es: v.infinitive, en: v.en }));
      questions.push({ type: 'matching', pairs });
    }
    /* Conjugation using ch5 conjugate function (all regular -ar) */
    const pronouns = ['yo','tú','él/ella','nosotros','ellos'];
    shuffle(verbs).slice(0, 8).forEach(v => {
      const pronoun = pronouns[Math.floor(Math.random() * pronouns.length)];
      const correctForm = conjugateCh5(v.stem, v.type, pronoun);
      const allForms = pronouns.map(p => ({ pronoun: p, form: conjugateCh5(v.stem, v.type, p) }));
      const uniqueForms = [...new Map(allForms.map(f => [f.form, f])).values()];
      questions.push({ type: 'conjugation', pronoun, correctForm, verb: v.infinitive,
        en: `${pronoun} ${v.en.split('/')[0].replace('to ','').trim()}`, allForms: uniqueForms });
    });

  /* ── Chapter 8 ── */
  } else if (sublesson.id === '8-1') {
    /* Possessive drills — sentence completion */
    shuffle(sublesson.possessiveDrills).slice(0, 6).forEach(d => {
      questions.push({ type: 'sentence-completion', ...d });
    });
    /* Demonstrative drills — sentence completion */
    shuffle(sublesson.demonstrativeDrills).slice(0, 6).forEach(d => {
      questions.push({ type: 'sentence-completion', ...d });
    });
    /* Matching: demonstrative → English */
    const demoItems = [
      { es:'este/esta', en:'this (near speaker)' },
      { es:'ese/esa',   en:'that (near listener)' },
      { es:'aquel/aquella', en:'that (far from both)' },
      { es:'esto/eso/aquello', en:'neuter (unknown object)' },
    ];
    questions.push({ type: 'matching', pairs: demoItems });

  } else if (sublesson.id === '8-2') {
    /* Special adjective sentence completion */
    shuffle(sublesson.sentenceCompletionDrills).slice(0, 8).forEach(d => {
      questions.push({ type: 'sentence-completion', ...d });
    });
    /* Vocabulary matching */
    const vocab = sublesson.vocabulary;
    for (let i = 0; i < 2; i++) {
      const pairs = shuffle(vocab).slice(0, 4).map(v => ({ es: v.es, en: v.en }));
      questions.push({ type: 'matching', pairs });
    }

  } else if (sublesson.id === '8-3') {
    /* Comparative sentence completion */
    shuffle(sublesson.sentenceCompletionDrills).forEach(d => {
      questions.push({ type: 'sentence-completion', ...d });
    });
    /* Matching: structure → meaning */
    const structures = [
      { es:'más...que',      en:'more...than' },
      { es:'menos...que',    en:'less...than' },
      { es:'tan...como',     en:'as...as' },
      { es:'el/la más...de', en:'the most...in/of' },
      { es:'mejor',          en:'better (irregular)' },
      { es:'peor',           en:'worse (irregular)' },
      { es:'mayor',          en:'older (irregular, people)' },
      { es:'menor',          en:'younger (irregular, people)' },
    ];
    for (let i = 0; i < 2; i++) {
      const pairs = shuffle(structures).slice(0, 4).map(s => ({ es: s.es, en: s.en }));
      questions.push({ type: 'matching', pairs });
    }

  } else if (sublesson.id === '8-4') {
    /* Adverb formation — number quiz style: adjective → adverb */
    const drills = sublesson.adverbDrills;
    shuffle(drills).slice(0, 10).forEach(d => {
      const distractors = shuffle(drills.filter(x => x.adverb !== d.adverb)).slice(0, 3).map(x => x.adverb);
      questions.push({ type: 'number-quiz', mode: 'numeral-to-word', numeral: d.adjective, spanish: d.adverb, distractors });
    });
    /* Sentence completion — series adverbs */
    sublesson.sentenceCompletionDrills.forEach(d => {
      questions.push({ type: 'sentence-completion', ...d });
    });
    /* Vocabulary matching */
    const vocab = sublesson.vocabulary;
    for (let i = 0; i < 2; i++) {
      const pairs = shuffle(vocab).slice(0, 4).map(v => ({ es: v.es, en: v.en }));
      questions.push({ type: 'matching', pairs });
    }

  /* ── Chapter 9 ── */
  } else if (sublesson.id === '9-1') {
    /* Negatives — sentence completion */
    shuffle(sublesson.sentenceCompletionDrills).forEach(d => {
      questions.push({ type: 'sentence-completion', ...d });
    });
    /* Affirmative/negative matching pairs */
    const pairs1 = [
      { es:'algo', en:'something' }, { es:'nada', en:'nothing' },
      { es:'alguien', en:'someone' }, { es:'nadie', en:'no one' },
    ];
    questions.push({ type: 'matching', pairs: pairs1 });
    const pairs2 = [
      { es:'siempre', en:'always' }, { es:'nunca', en:'never' },
      { es:'también', en:'also' }, { es:'tampoco', en:'neither' },
    ];
    questions.push({ type: 'matching', pairs: pairs2 });
    /* Vocabulary matching */
    const vocab = sublesson.vocabulary;
    for (let i = 0; i < 2; i++) {
      const pairs = shuffle(vocab).slice(0, 4).map(v => ({ es: v.es, en: v.en }));
      questions.push({ type: 'matching', pairs });
    }

  } else if (sublesson.id === '9-2') {
    /* Prepositions — sentence completion */
    shuffle(sublesson.sentenceCompletionDrills).forEach(d => {
      questions.push({ type: 'sentence-completion', ...d });
    });
    /* Vocabulary matching — verb-phrase prepositions */
    const vocab = sublesson.vocabulary;
    for (let i = 0; i < 3; i++) {
      const pairs = shuffle(vocab).slice(0, 4).map(v => ({ es: v.es, en: v.en }));
      questions.push({ type: 'matching', pairs });
    }

  } else if (sublesson.id === '9-3') {
    /* Por vs para — sentence completion drills */
    sublesson.porVsParaDrills.forEach(d => {
      questions.push({ type: 'sentence-completion', ...d });
    });
    /* Pronoun drills — sentence completion */
    sublesson.pronounDrills.forEach(d => {
      questions.push({ type: 'sentence-completion', ...d });
    });
    /* Por vs para matching */
    const pairs = [
      { es:'para — recipient', en:'El regalo es para ella.' },
      { es:'para — purpose',   en:'Estudia para aprender.' },
      { es:'por — duration',   en:'Corro por una hora.' },
      { es:'por — cause',      en:'Triste por el mal clima.' },
    ];
    questions.push({ type: 'matching', pairs });

  } else if (sublesson.id === '9-4') {
    /* Location prepositions — matching */
    const locs = sublesson.locationPrepositions;
    for (let i = 0; i < 4; i++) {
      const pairs = shuffle(locs).slice(0, 4).map(l => ({ es: l.es, en: l.en }));
      questions.push({ type: 'matching', pairs });
    }
    /* Por expressions — matching */
    const exprs = sublesson.porExpressions;
    for (let i = 0; i < 4; i++) {
      const pairs = shuffle(exprs).slice(0, 4).map(e => ({ es: e.es, en: e.en }));
      questions.push({ type: 'matching', pairs });
    }
    /* Nature vocabulary matching */
    if (sublesson.vocabulary?.length) {
      for (let i = 0; i < 4; i++) {
        const pairs = shuffle(sublesson.vocabulary).slice(0, 4).map(v => ({ es: v.es, en: v.en }));
        questions.push({ type: 'matching', pairs });
      }
    }

  /* ── Chapter 10 ── */
  } else if (sublesson.id === '10-1') {
    /* Gustar sentence completion drills */
    shuffle(sublesson.sentenceCompletionDrills).forEach(d => {
      questions.push({ type: 'sentence-completion', ...d });
    });
    /* Pronoun table matching */
    const pairs1 = sublesson.pronounTable.slice(0, 4).map(p => ({ es: p.pronoun, en: p.en }));
    questions.push({ type: 'matching', pairs: pairs1 });
    const pairs2 = sublesson.pronounTable.map(p => ({ es: p.clarifier, en: p.en }));
    questions.push({ type: 'matching', pairs: shuffle(pairs2).slice(0, 4) });

  } else if (sublesson.id === '10-2') {
    /* Verbs like gustar — matching meaning */
    const verbs = sublesson.verbs;
    for (let i = 0; i < 4; i++) {
      const pairs = shuffle(verbs).slice(0, 4).map(v => ({ es: v.es, en: v.en }));
      questions.push({ type: 'matching', pairs });
    }
    /* Sentence completion — gusta vs gustan agreement */
    shuffle(sublesson.sentenceCompletionDrills).forEach(d => {
      questions.push({ type: 'sentence-completion', ...d });
    });

  } else if (sublesson.id === '10-3') {
    /* Action verbs — matching */
    const verbs = sublesson.verbs;
    for (let i = 0; i < 3; i++) {
      const pairs = shuffle(verbs).slice(0, 4).map(v => ({ es: v.infinitive, en: v.en }));
      questions.push({ type: 'matching', pairs });
    }
    /* Conjugation drill using conjugateIrr for irregular verbs, conjugateCh5 for regular */
    const pronouns = ['yo','tú','él/ella','nosotros','ellos'];
    shuffle(verbs).slice(0, 8).forEach(v => {
      const pronoun = pronouns[Math.floor(Math.random() * pronouns.length)];
      const correctForm = conjugateIrr(v.forms, pronoun);
      const allForms = pronouns.map(p => ({ pronoun: p, form: conjugateIrr(v.forms, p) }));
      const uniqueForms = [...new Map(allForms.map(f => [f.form, f])).values()];
      questions.push({ type: 'conjugation', pronoun, correctForm, verb: v.infinitive,
        en: `${pronoun} ${v.en.split('/')[0].replace('to ','').trim()}`, allForms: uniqueForms });
    });
    /* Sentence completion — indirect object pronoun choice */
    shuffle(sublesson.sentenceCompletionDrills).forEach(d => {
      questions.push({ type: 'sentence-completion', ...d });
    });

  } else if (sublesson.id === '10-4') {
    /* Placement drills — sentence completion */
    shuffle(sublesson.sentenceCompletionDrills).forEach(d => {
      questions.push({ type: 'sentence-completion', ...d });
    });
    /* Placement pairs matching — before verb vs attached */
    const drills = sublesson.placementDrills;
    for (let i = 0; i < 3; i++) {
      const sample = shuffle(drills).slice(0, 4);
      const pairs = sample.map(d => ({ es: d.beforeVerb, en: d.en }));
      questions.push({ type: 'matching', pairs });
    }

  /* ── Chapter 11 ── */
  } else if (sublesson.id === '11-1') {
    /* Personal a — sentence completion */
    shuffle(sublesson.sentenceCompletionDrills).forEach(d => {
      questions.push({ type: 'sentence-completion', ...d });
    });

  } else if (sublesson.id === '11-2') {
    /* DOP forms — matching */
    const pairs1 = sublesson.pronounTable.map(p => ({ es: p.pronoun, en: p.en }));
    for (let i = 0; i < 2; i++) {
      questions.push({ type: 'matching', pairs: shuffle(pairs1).slice(0, 4) });
    }
    /* Sentence completion — pronoun choice + placement + negation */
    shuffle(sublesson.sentenceCompletionDrills).forEach(d => {
      questions.push({ type: 'sentence-completion', ...d });
    });

  } else if (sublesson.id === '11-3') {
    /* DOP replacing persons vs things — sentence completion */
    shuffle(sublesson.sentenceCompletionDrills).forEach(d => {
      questions.push({ type: 'sentence-completion', ...d });
    });
    /* Matching: pronoun → what it replaces */
    const pairs = [
      { es:'lo', en:'him / it (masculine)' },
      { es:'la', en:'her / it (feminine)' },
      { es:'los', en:'them (masculine/mixed)' },
      { es:'las', en:'them (feminine)' },
    ];
    questions.push({ type: 'matching', pairs });

  } else if (sublesson.id === '11-4') {
    /* Transitive verbs — matching + conjugation */
    const verbs = sublesson.verbs;
    for (let i = 0; i < 4; i++) {
      const pairs = shuffle(verbs).slice(0, 4).map(v => ({ es: v.infinitive, en: v.en }));
      questions.push({ type: 'matching', pairs });
    }
    /* Conjugation picker */
    const pronouns = ['yo','tú','él/ella','nosotros','ellos'];
    shuffle(verbs).slice(0, 10).forEach(v => {
      const pronoun = pronouns[Math.floor(Math.random() * pronouns.length)];
      const correctForm = conjugateIrr(v.forms, pronoun);
      const allForms = pronouns.map(p => ({ pronoun: p, form: conjugateIrr(v.forms, p) }));
      const uniqueForms = [...new Map(allForms.map(f => [f.form, f])).values()];
      questions.push({ type: 'conjugation', pronoun, correctForm, verb: v.infinitive,
        en: `${pronoun} ${v.en.split('/')[0].replace('to ','').trim()}`, allForms: uniqueForms });
    });

  /* ── Chapter 12 ── */
  } else if (sublesson.id === '12-1') {
    /* Daily routine — sentence completion + conjugation */
    shuffle(sublesson.sentenceCompletionDrills).forEach(d => {
      questions.push({ type: 'sentence-completion', ...d });
    });
    const pronouns12 = ['yo','tú','él/ella','nosotros','ellos'];
    shuffle(sublesson.verbs).slice(0, 8).forEach(v => {
      const pronoun = pronouns12[Math.floor(Math.random() * pronouns12.length)];
      const correctForm = v.forms[pronoun === 'yo' ? 'yo' : pronoun === 'tú' ? 'tu' : pronoun === 'él/ella' ? 'el' : pronoun === 'nosotros' ? 'nos' : 'ellos'];
      const allForms = pronouns12.map(p => {
        const key = p === 'yo' ? 'yo' : p === 'tú' ? 'tu' : p === 'él/ella' ? 'el' : p === 'nosotros' ? 'nos' : 'ellos';
        return { pronoun: p, form: v.forms[key] };
      });
      const uniqueForms = [...new Map(allForms.map(f => [f.form, f])).values()];
      questions.push({ type: 'conjugation', pronoun, correctForm, verb: v.infinitive,
        en: `${pronoun} ${v.en.split('/')[0].replace('to ','').trim()}`, allForms: uniqueForms });
    });
    /* Matching: infinitive → meaning */
    for (let i = 0; i < 2; i++) {
      const pairs = shuffle(sublesson.verbs).slice(0, 4).map(v => ({ es: v.infinitive, en: v.en }));
      questions.push({ type: 'matching', pairs });
    }

  } else if (sublesson.id === '12-2') {
    /* Regular reflexives — matching + conjugation */
    const verbs12 = sublesson.verbs;
    for (let i = 0; i < 4; i++) {
      const pairs = shuffle(verbs12).slice(0, 4).map(v => ({ es: v.infinitive, en: v.en }));
      questions.push({ type: 'matching', pairs });
    }
    /* Preposition matching */
    const withPrep = verbs12.filter(v => v.prep);
    for (let i = 0; i < 2; i++) {
      const pairs = shuffle(withPrep).slice(0, 4).map(v => ({ es: v.infinitive, en: v.en }));
      questions.push({ type: 'matching', pairs });
    }

  } else if (sublesson.id === '12-3') {
    /* Irregular reflexives — conjugation + sentence completion */
    const pronouns12 = ['yo','tú','él/ella','nosotros','ellos'];
    shuffle(sublesson.verbs).forEach(v => {
      const pronoun = pronouns12[Math.floor(Math.random() * pronouns12.length)];
      const key = pronoun === 'yo' ? 'yo' : pronoun === 'tú' ? 'tu' : pronoun === 'él/ella' ? 'el' : pronoun === 'nosotros' ? 'nos' : 'ellos';
      const correctForm = v.forms[key];
      const allForms = pronouns12.map(p => {
        const k = p === 'yo' ? 'yo' : p === 'tú' ? 'tu' : p === 'él/ella' ? 'el' : p === 'nosotros' ? 'nos' : 'ellos';
        return { pronoun: p, form: v.forms[k] };
      });
      const uniqueForms = [...new Map(allForms.map(f => [f.form, f])).values()];
      questions.push({ type: 'conjugation', pronoun, correctForm, verb: v.infinitive,
        en: `${pronoun} ${v.en.split('/')[0].replace('to ','').trim()}`, allForms: uniqueForms });
    });
    /* "To become" sentence completion */
    shuffle(sublesson.sentenceCompletionDrills).forEach(d => {
      questions.push({ type: 'sentence-completion', ...d });
    });
    /* Become expressions matching */
    const pairs = sublesson.becomeExpressions.map(b => ({ es: b.es, en: b.en }));
    questions.push({ type: 'matching', pairs });

  } else if (sublesson.id === '12-4') {
    /* Movement verbs — matching + conjugation */
    const mvVerbs = sublesson.movementVerbs;
    for (let i = 0; i < 2; i++) {
      const pairs = shuffle(mvVerbs).slice(0, 4).map(v => ({ es: v.infinitive, en: v.en }));
      questions.push({ type: 'matching', pairs });
    }
    /* Reciprocal verbs matching */
    const recip = sublesson.reciprocalVerbs;
    for (let i = 0; i < 2; i++) {
      const pairs = shuffle(recip).slice(0, 4).map(v => ({ es: v.es, en: v.en }));
      questions.push({ type: 'matching', pairs });
    }
    /* Placement sentence completion */
    shuffle(sublesson.sentenceCompletionDrills).forEach(d => {
      questions.push({ type: 'sentence-completion', ...d });
    });

  /* ── Chapter 13 ── */
  } else if (sublesson.id === '13-1') {
    /* Formation drills — conjugation picker using subjunctive forms */
    const drills = sublesson.formationDrills;
    /* Build allForms for each drill from the full drill set */
    shuffle(drills).slice(0, 12).forEach(d => {
      /* Get all 5 forms for this verb by filtering drills of same infinitive */
      const verbForms = drills
        .filter(x => x.infinitive === d.infinitive)
        .map(x => ({ pronoun: x.pronoun, form: x.subjunctive }));
      const uniqueForms = verbForms.length >= 3 ? verbForms :
        ['yo','tú','él/ella','nosotros','ellos'].map(p => ({
          pronoun: p,
          form: subjunctiveFromYo(d.indicativeYo, d.type, p),
        }));
      questions.push({
        type: 'conjugation',
        pronoun: d.pronoun,
        correctForm: d.subjunctive,
        verb: d.infinitive + ' (subjunctive)',
        en: `${d.pronoun} ${d.infinitive}`,
        allForms: uniqueForms,
      });
    });
    /* Six irregular matching */
    const irregs = sublesson.irregularTables;
    for (let i = 0; i < 2; i++) {
      const pairs = shuffle(irregs).slice(0, 4).map(v => ({ es: v.infinitive, en: `subj: ${v.forms.yo}` }));
      questions.push({ type: 'matching', pairs });
    }

  } else if (sublesson.id === '13-2') {
    /* Impersonal expressions matching */
    const exprs = sublesson.impersonalExpressions;
    for (let i = 0; i < 3; i++) {
      const pairs = shuffle(exprs).slice(0, 4).map(e => ({ es: e.es, en: e.en }));
      questions.push({ type: 'matching', pairs });
    }
    /* Sentence completion drills */
    shuffle(sublesson.sentenceCompletionDrills).forEach(d => {
      questions.push({ type: 'sentence-completion', ...d });
    });

  } else if (sublesson.id === '13-3') {
    /* Emotion verbs matching */
    const emot = sublesson.emotionVerbs;
    const cmd  = sublesson.commandVerbs;
    for (let i = 0; i < 2; i++) {
      const pairs = shuffle(emot).slice(0, 4).map(v => ({ es: v.es, en: v.en }));
      questions.push({ type: 'matching', pairs });
    }
    for (let i = 0; i < 2; i++) {
      const pairs = shuffle(cmd).slice(0, 4).map(v => ({ es: v.es, en: v.en }));
      questions.push({ type: 'matching', pairs });
    }
    /* Sentence completion */
    shuffle(sublesson.sentenceCompletionDrills).forEach(d => {
      questions.push({ type: 'sentence-completion', ...d });
    });

  } else if (sublesson.id === '13-4') {
    /* Conjunctions matching */
    const conj = sublesson.conjunctions;
    for (let i = 0; i < 3; i++) {
      const pairs = shuffle(conj).slice(0, 4).map(c => ({ es: c.es, en: c.en }));
      questions.push({ type: 'matching', pairs });
    }
    /* Sentence completion — the hardest lesson */
    shuffle(sublesson.sentenceCompletionDrills).forEach(d => {
      questions.push({ type: 'sentence-completion', ...d });
    });

  /* ── Chapter 14 ── */
  } else if (sublesson.id === '14-1') {
    /* Regular preterit — conjugation picker */
    const pronouns = ['yo','tú','él/ella','nosotros','ellos'];
    const verbs = sublesson.verbs;
    /* Matching: infinitive → English */
    for (let i = 0; i < 3; i++) {
      const pairs = shuffle(verbs).slice(0, 4).map(v => ({ es: v.infinitive, en: v.en }));
      questions.push({ type: 'matching', pairs });
    }
    /* Conjugation picker — preterit forms */
    shuffle(verbs).slice(0, 12).forEach(v => {
      const pronoun = pronouns[Math.floor(Math.random() * pronouns.length)];
      const key = pronoun === 'yo' ? 'yo' : pronoun === 'tú' ? 'tu' : pronoun === 'él/ella' ? 'el' : pronoun === 'nosotros' ? 'nos' : 'ellos';
      const correctForm = v.forms[key];
      const allForms = pronouns.map(p => {
        const k = p === 'yo' ? 'yo' : p === 'tú' ? 'tu' : p === 'él/ella' ? 'el' : p === 'nosotros' ? 'nos' : 'ellos';
        return { pronoun: p, form: v.forms[k] };
      });
      const uniqueForms = [...new Map(allForms.map(f => [f.form, f])).values()];
      questions.push({ type: 'conjugation', pronoun, correctForm,
        verb: v.infinitive + ' (preterit)', en: `${pronoun} ${v.en.replace('to ','')}`, allForms: uniqueForms });
    });
    /* Time expressions matching */
    const timeExprs = sublesson.timeExpressions;
    const tPairs = shuffle(timeExprs).slice(0, 4).map(t => ({ es: t.es, en: t.en }));
    questions.push({ type: 'matching', pairs: tPairs });

  } else if (sublesson.id === '14-2') {
    /* Spelling changes — sentence completion + conjugation */
    /* -ar spelling changes */
    const arChanges = sublesson.arSpellingChanges;
    for (let i = 0; i < 2; i++) {
      const pairs = shuffle(arChanges).slice(0, 4).map(v => ({ es: v.infinitive, en: `yo: ${v.yo}` }));
      questions.push({ type: 'matching', pairs });
    }
    /* -er/-ir spelling changes */
    const erChanges = sublesson.erIrSpellingChanges;
    for (let i = 0; i < 2; i++) {
      const pairs = shuffle(erChanges).slice(0, 4).map(v => ({ es: v.infinitive, en: `él: ${v.forms.el}` }));
      questions.push({ type: 'matching', pairs });
    }
    /* Sentence completion drills */
    shuffle(sublesson.sentenceCompletionDrills).forEach(d => {
      questions.push({ type: 'sentence-completion', ...d });
    });

  } else if (sublesson.id === '14-3') {
    /* Irregular preterit — conjugation picker by group */
    const pronouns = ['yo','tú','él/ella','nosotros','ellos'];
    const allIrreg = [
      ...sublesson.verbGroups.uStem,
      ...sublesson.verbGroups.jStem,
      ...sublesson.verbGroups.iStem,
      ...sublesson.verbGroups.special,
    ];
    /* Matching across groups */
    for (let i = 0; i < 4; i++) {
      const pairs = shuffle(allIrreg).slice(0, 4).map(v => ({ es: v.infinitive, en: v.en }));
      questions.push({ type: 'matching', pairs });
    }
    /* Conjugation picker */
    shuffle(allIrreg).slice(0, 14).forEach(v => {
      const pronoun = pronouns[Math.floor(Math.random() * pronouns.length)];
      const key = pronoun === 'yo' ? 'yo' : pronoun === 'tú' ? 'tu' : pronoun === 'él/ella' ? 'el' : pronoun === 'nosotros' ? 'nos' : 'ellos';
      const correctForm = v.forms[key];
      const allForms = pronouns.map(p => {
        const k = p === 'yo' ? 'yo' : p === 'tú' ? 'tu' : p === 'él/ella' ? 'el' : p === 'nosotros' ? 'nos' : 'ellos';
        return { pronoun: p, form: v.forms[k] };
      });
      const uniqueForms = [...new Map(allForms.map(f => [f.form, f])).values()];
      questions.push({ type: 'conjugation', pronoun, correctForm,
        verb: v.infinitive + ' (preterit)', en: `${pronoun} ${v.en.replace('to ','')}`, allForms: uniqueForms });
    });

  } else if (sublesson.id === '14-4') {
    /* -ir stem changes + compound verbs + sentence completion */
    const stemChanges = sublesson.irStemChanges;
    const pronouns = ['yo','tú','él/ella','nosotros','ellos'];
    /* Matching */
    for (let i = 0; i < 2; i++) {
      const pairs = shuffle(stemChanges).slice(0, 4).map(v => ({ es: v.infinitive, en: v.en }));
      questions.push({ type: 'matching', pairs });
    }
    /* Conjugation picker — focus on 3rd person where change occurs */
    shuffle(stemChanges).slice(0, 8).forEach(v => {
      const pronoun = ['él/ella','ellos','yo','tú'][Math.floor(Math.random() * 4)];
      const key = pronoun === 'yo' ? 'yo' : pronoun === 'tú' ? 'tu' : pronoun === 'él/ella' ? 'el' : 'ellos';
      const correctForm = v.forms[key];
      const allForms = pronouns.map(p => {
        const k = p === 'yo' ? 'yo' : p === 'tú' ? 'tu' : p === 'él/ella' ? 'el' : p === 'nosotros' ? 'nos' : 'ellos';
        return { pronoun: p, form: v.forms[k] };
      });
      const uniqueForms = [...new Map(allForms.map(f => [f.form, f])).values()];
      questions.push({ type: 'conjugation', pronoun, correctForm,
        verb: v.infinitive + ' (preterit)', en: `${pronoun} ${v.en.replace('to ','')}`, allForms: uniqueForms });
    });
    /* Compound verbs matching */
    const compounds = sublesson.compoundVerbs;
    const cPairs = shuffle(compounds).slice(0, 4).map(v => ({ es: v.infinitive, en: `${v.en} (like ${v.rootVerb})` }));
    questions.push({ type: 'matching', pairs: cPairs });
    /* Sentence completion */
    shuffle(sublesson.sentenceCompletionDrills).forEach(d => {
      questions.push({ type: 'sentence-completion', ...d });
    });

  /* ── Chapter 15 ── */
  } else if (sublesson.id === '15-1') {
    /* Imperfect formation — conjugation picker */
    const pronouns = ['yo','tú','él/ella','nosotros','ellos'];
    const verbs = sublesson.verbs;
    /* Matching: infinitive → English */
    for (let i = 0; i < 3; i++) {
      const pairs = shuffle(verbs).slice(0, 4).map(v => ({ es: v.infinitive, en: v.en }));
      questions.push({ type: 'matching', pairs });
    }
    /* Conjugation picker — imperfect forms */
    shuffle(verbs).slice(0, 14).forEach(v => {
      const pronoun = pronouns[Math.floor(Math.random() * pronouns.length)];
      const key = pronoun === 'yo' ? 'yo' : pronoun === 'tú' ? 'tu' : pronoun === 'él/ella' ? 'el' : pronoun === 'nosotros' ? 'nos' : 'ellos';
      const correctForm = v.forms[key];
      const allForms = pronouns.map(p => {
        const k = p === 'yo' ? 'yo' : p === 'tú' ? 'tu' : p === 'él/ella' ? 'el' : p === 'nosotros' ? 'nos' : 'ellos';
        return { pronoun: p, form: v.forms[k] };
      });
      const uniqueForms = [...new Map(allForms.map(f => [f.form, f])).values()];
      questions.push({ type: 'conjugation', pronoun, correctForm,
        verb: v.infinitive + ' (imperfect)', en: `${pronoun} ${v.en.replace('to ','')}`, allForms: uniqueForms });
    });

  } else if (sublesson.id === '15-2') {
    /* Uses of imperfect — matching + sentence completion */
    const uses = sublesson.uses;
    for (let i = 0; i < 2; i++) {
      const pairs = shuffle(uses).slice(0, 4).map(u => ({ es: u.use, en: u.signal }));
      questions.push({ type: 'matching', pairs });
    }
    /* Signal words matching — preterit vs imperfect */
    const signals = sublesson.signalWords;
    const imperfectSignals = signals.filter(s => s.tense === 'imperfect');
    const preteritSignals  = signals.filter(s => s.tense === 'preterit');
    for (let i = 0; i < 2; i++) {
      const sample = shuffle(signals).slice(0, 4);
      const pairs = sample.map(s => ({ es: s.es, en: `${s.en} → ${s.tense}` }));
      questions.push({ type: 'matching', pairs });
    }
    /* Sentence completion */
    shuffle(sublesson.sentenceCompletionDrills).forEach(d => {
      questions.push({ type: 'sentence-completion', ...d });
    });

  } else if (sublesson.id === '15-3') {
    /* Preterit vs imperfect contrast pairs matching */
    const pairs15 = sublesson.contrastPairs;
    for (let i = 0; i < 3; i++) {
      const sample = shuffle(pairs15).slice(0, 4);
      const pairs = sample.map(p => ({ es: p.preterit, en: `preterit: ${p.signal.split(' vs ')[0]}` }));
      questions.push({ type: 'matching', pairs });
    }
    /* Sentence completion — the core drill */
    shuffle(sublesson.sentenceCompletionDrills).forEach(d => {
      questions.push({ type: 'sentence-completion', ...d });
    });

  } else if (sublesson.id === '15-4') {
    /* Double object pronouns matching */
    const dps = sublesson.doublePronouns;
    for (let i = 0; i < 4; i++) {
      const pairs = shuffle(dps).slice(0, 4).map(d => ({ es: d.combined, en: d.en }));
      questions.push({ type: 'matching', pairs });
    }
    /* Sentence completion */
    shuffle(sublesson.sentenceCompletionDrills).forEach(d => {
      questions.push({ type: 'sentence-completion', ...d });
    });
  }

  /* Reading vocabulary matching — appended to last sublesson of each chapter */
  if (sublesson.readingVocab?.length >= 4) {
    for (let i = 0; i < 3; i++) {
      const pairs = shuffle(sublesson.readingVocab).slice(0, 4).map(v => ({ es: v.es, en: v.en }));
      questions.push({ type: 'matching', pairs });
    }
  }

  /* Save the full question queue so resume can reconstruct exact position */
  Store.saveLessonState(chapter.id, {
    subIndex,
    qIndex:         resumeFromQ,
    questions,
    sessionCorrect: sessionScore.correct,
    sessionTotal:   sessionScore.total,
    savedAt:        Date.now(),
  });

  runQuestions(container, chapter, sublesson, subIndex, questions, resumeFromQ, { ...sessionScore }, autoSkipRules);
}

/* ════════════════════════════════════════════════════════════════════════════
   Question runner
   ════════════════════════════════════════════════════════════════════════════ */

function runQuestions(container, chapter, sublesson, subIndex, questions, qIndex, score, autoSkipRules = false) {
  if (qIndex >= questions.length) {
    startSubLesson(container, chapter, subIndex + 1, score, false, autoSkipRules);
    return;
  }

  /* Save exact position on every question advance */
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
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:var(--space-3)">
        <button class="btn btn--ghost btn--sm" id="back-btn"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg> Back</button>
        <div style="display:flex;align-items:center;gap:var(--space-3)">
          <span class="text-xs text-muted">${sublesson.title}</span>
          ${hasRules ? `
            <button class="btn btn--ghost btn--sm" id="view-rules-btn" title="View lesson rules">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
              Rules
            </button>
          ` : ''}
        </div>
      </div>
      <div class="progress-track" style="margin-bottom:var(--space-2)">
        <div class="progress-fill" style="width:${Math.max(prog, 5)}%"></div>
      </div>
      <div style="display:flex;justify-content:space-between;margin-bottom:var(--space-5)">
        <span class="text-xs text-muted">${qIndex + 1} of ${questions.length}</span>
        <span class="text-xs" style="color:var(--color-green)">${score.correct} correct</span>
      </div>
      <div id="game-content"></div>
    </div>
  `;

  const gameContent = container.querySelector('#game-content');

  container.querySelector('#back-btn').addEventListener('click', () => {
    renderChapterIntro(container, chapter);
  });

  container.querySelector('#view-rules-btn')?.addEventListener('click', () => {
    const returnToQuiz = () => runQuestions(container, chapter, sublesson, subIndex, questions, qIndex, score, autoSkipRules);
    renderRuleCards(container, chapter, sublesson, subIndex, score, {
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
    runQuestions(container, chapter, sublesson, subIndex, questions, qIndex + 1, score, autoSkipRules);
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
}

/* ════════════════════════════════════════════════════════════════════════════
   Lesson complete
   ════════════════════════════════════════════════════════════════════════════ */

function renderLessonComplete(container, chapter, score) {
  const pct = score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0;
  Store.recordChapterComplete(chapter.id, pct);
  Store.recordStudySession();
  Store.clearLessonState(chapter.id);

  const allVocabIds = chapter.sublessons.flatMap(sl =>
    [...(sl.vocabulary || []), ...(sl.adjectives || [])].map(v => v.id)
  );
  Store.addToAnkiQueue(allVocabIds);

  const grade      = pct >= 90 ? '¡Excelente!' : pct >= 70 ? '¡Bien hecho!' : pct >= 50 ? '¡Buen esfuerzo!' : '¡Sigue practicando!';
  const scoreColor = pct >= 80 ? 'var(--color-green)' : pct >= 60 ? 'var(--color-amber)' : 'var(--color-red)';

  container.innerHTML = `
    <div class="page active" style="text-align:center;padding-top:var(--space-10)">
      <div style="font-family:var(--font-serif);font-size:var(--text-3xl);color:${scoreColor};margin-bottom:var(--space-2)">${pct}%</div>
      <div style="font-family:var(--font-serif);font-size:var(--text-lg);color:var(--color-purple);margin-bottom:var(--space-2)">${grade}</div>
      <div class="text-muted text-sm" style="margin-bottom:var(--space-8)">${score.correct} correct out of ${score.total} · Chapter ${chapter.id}</div>

      <div class="metrics-row" style="margin-bottom:var(--space-6)">
        <div class="metric">
          <div class="metric__value" style="color:var(--color-green)">${score.correct}</div>
          <div class="metric__label">Correct</div>
        </div>
        <div class="metric">
          <div class="metric__value" style="color:var(--color-red)">${score.total - score.correct}</div>
          <div class="metric__label">Missed</div>
        </div>
        <div class="metric">
          <div class="metric__value" style="color:var(--color-amber)">${allVocabIds.length}</div>
          <div class="metric__label">Anki cards</div>
        </div>
      </div>

      <div style="background:var(--color-amber-bg);border:0.5px solid var(--color-amber);border-radius:var(--radius-md);padding:var(--space-3) var(--space-4);margin-bottom:var(--space-6);text-align:left">
        <div style="font-size:var(--text-xs);color:var(--color-amber);margin-bottom:4px;text-transform:uppercase;letter-spacing:0.06em">Anki export ready</div>
        <div style="font-size:var(--text-sm);color:var(--text-primary)">${allVocabIds.length} vocabulary cards queued. Go to Settings to download your deck.</div>
      </div>

      <div style="display:flex;flex-direction:column;gap:var(--space-3)">
        <button class="btn btn--primary btn--full btn--lg" onclick="location.hash='#/'">Back to chapters</button>
        <button class="btn btn--full" onclick="location.hash='#/training/${chapter.id}'">Training Grounds →</button>
        <button class="btn btn--ghost btn--full" onclick="location.hash='#/chapter/${chapter.id}'">Study again</button>
      </div>
    </div>
  `;
}

function renderUnknownChapter(container, chapterId) {
  container.innerHTML = `
    <div class="page active">
      <div style="display:flex;align-items:center;gap:var(--space-3);margin-bottom:var(--space-5)">
        <button class="btn btn--ghost btn--sm" onclick="history.back()">← Back</button>
      </div>
      <div class="empty-state">
        <div class="empty-state__title">Chapter ${chapterId} not yet available</div>
        <div class="empty-state__body">This chapter hasn't been added to Fluir yet. Start with Chapter 1.</div>
      </div>
    </div>
  `;
}

export { renderLesson };
