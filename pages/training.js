/* ─── Fluir · Training Grounds ──────────────────────────────────────────────
   Free-practice mode. Unlocks after chapter lesson is complete.
   User picks game type and sub-lesson. No scoring — just drill.
   ─────────────────────────────────────────────────────────────────────────── */

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
import { ALL_CHAPTERS } from '../js/data/chapters-list.js';
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
} from '../js/games.js';

const CHAPTERS = { 1: CHAPTER_1, 2: CHAPTER_2, 3: CHAPTER_3, 4: CHAPTER_4, 5: CHAPTER_5, 6: CHAPTER_6, 7: CHAPTER_7, 8: CHAPTER_8, 9: CHAPTER_9, 10: CHAPTER_10, 11: CHAPTER_11, 12: CHAPTER_12, 13: CHAPTER_13, 14: CHAPTER_14, 15: CHAPTER_15 };

function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5); }

/* ════════════════════════════════════════════════════════════════════════════
   Entry point
   ════════════════════════════════════════════════════════════════════════════ */

function renderTraining(container, chapterId) {
  /* No chapterId = top-level hub — show all completed chapters */
  if (chapterId === null) {
    renderTrainingHub(container);
    return;
  }

  const chapter  = CHAPTERS[chapterId];
  const progress = Store.getProgress();
  const complete = progress.chaptersComplete.includes(chapterId);

  if (!chapter) {
    container.innerHTML = `
      <div class="page active">
        <div style="display:flex;align-items:center;gap:var(--space-3);margin-bottom:var(--space-5)">
          <button class="btn btn--ghost btn--sm" onclick="history.back()">← Back</button>
        </div>
        <div class="empty-state">
          <div class="empty-state__title">Chapter ${chapterId} not available</div>
          <div class="empty-state__body">This chapter hasn't been added to Fluir yet.</div>
        </div>
      </div>`;
    return;
  }

  if (!complete) {
    container.innerHTML = `
      <div class="page active">
        <div style="display:flex;align-items:center;gap:var(--space-3);margin-bottom:var(--space-5)">
          <button class="btn btn--ghost btn--sm" onclick="history.back()">← Back</button>
          <span class="tag-chapter">Chapter ${chapterId}</span>
        </div>
        <div class="card" style="text-align:center;padding:var(--space-8)">
          <div style="font-family:var(--font-serif);font-size:var(--text-lg);color:var(--color-amber);margin-bottom:var(--space-3)">Complete the lesson first</div>
          <p class="text-muted text-sm" style="margin-bottom:var(--space-5)">Training Grounds unlocks after you finish Chapter ${chapterId}.</p>
          <button class="btn btn--primary" onclick="location.hash='#/chapter/${chapterId}'">Go to lesson</button>
        </div>
      </div>`;
    return;
  }

  renderTrainingMenu(container, chapter);
}

/* ════════════════════════════════════════════════════════════════════════════
   Top-level Training Grounds hub — lists all completed chapters
   ════════════════════════════════════════════════════════════════════════════ */

function renderTrainingHub(container) {
  const progress  = Store.getProgress();
  const completed = progress.chaptersComplete || [];

  container.innerHTML = `
    <div class="page active">

      <div style="margin-bottom:var(--space-6)">
        <h2 style="font-family:var(--font-serif);color:var(--color-amber);font-weight:normal;margin-bottom:var(--space-1)">Practice</h2>
        <p class="text-muted text-sm">Free practice — no scoring. Complete a chapter lesson to unlock it here.</p>
      </div>

      <div class="section-label">Chapters</div>

      ${ALL_CHAPTERS.map(ch => {
        const isComplete = completed.includes(ch.id);
        const CHAPTER_DATA = CHAPTERS[ch.id];
        const vocabCount = CHAPTER_DATA
          ? CHAPTER_DATA.sublessons.reduce((n, s) =>
              n + (s.vocabulary?.length || 0) + (s.adjectives?.length || 0), 0)
          : 0;

        return `
          <div class="chapter-card ${!isComplete ? 'chapter-card--locked' : ''}"
               ${isComplete ? `onclick="location.hash='#/training/${ch.id}'"` : ''}
               style="${isComplete ? 'cursor:pointer' : ''}">
            <div class="chapter-card__number" style="${isComplete ? 'color:var(--color-amber);background:var(--color-amber-bg);border-color:var(--color-amber)' : ''}">${ch.id}</div>
            <div class="chapter-card__body">
              <div class="chapter-card__title">${ch.title}</div>
              <div class="chapter-card__meta">
                ${isComplete
                  ? `${vocabCount} words · ${CHAPTER_DATA?.sublessons?.length || 0} sub-lessons`
                  : 'Complete the lesson to unlock'}
              </div>
            </div>
            <div class="chapter-card__arrow">
              ${isComplete
                ? `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>`
                : `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>`
              }
            </div>
          </div>
        `;
      }).join('')}

    </div>
  `;
}

/* ════════════════════════════════════════════════════════════════════════════
   Chapter-specific Training Grounds menu
   ════════════════════════════════════════════════════════════════════════════ */

function renderTrainingMenu(container, chapter) {
  container.innerHTML = `
    <div class="page active">

      <div style="display:flex;align-items:center;gap:var(--space-3);margin-bottom:var(--space-5)">
        <button class="btn btn--ghost btn--sm" onclick="history.back()">← Back</button>
        <span class="tag-chapter">Chapter ${chapter.id}</span>
        <span style="font-size:var(--text-xs);color:var(--color-amber);background:var(--color-amber-bg);padding:2px 8px;border-radius:var(--radius-sm);border:0.5px solid var(--color-amber);">Training Grounds</span>
      </div>

      <h2 style="font-family:var(--font-serif);color:var(--color-amber);font-weight:normal;margin-bottom:var(--space-2)">Training Grounds</h2>
      <p class="text-muted text-sm" style="margin-bottom:var(--space-6)">Free practice — no scoring. Drill whatever you want, as many times as you want.</p>

      <div class="section-label">Choose a sub-lesson</div>
      <div id="sublesson-list" style="margin-bottom:var(--space-6)">
        ${chapter.sublessons.map((sl, i) => `
          <button class="btn btn--full" id="sl-btn-${i}"
            style="justify-content:space-between;margin-bottom:var(--space-2);text-align:left;padding:var(--space-3) var(--space-4)">
            <div>
              <div style="font-size:var(--text-sm);color:var(--text-bright)">${sl.title}</div>
              <div style="font-size:var(--text-xs);color:var(--text-muted)">${sl.subtitle}</div>
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        `).join('')}
        <button class="btn btn--full btn--amber" id="sl-btn-all"
          style="justify-content:space-between;text-align:left;padding:var(--space-3) var(--space-4)">
          <div>
            <div style="font-size:var(--text-sm)">All sub-lessons mixed</div>
            <div style="font-size:var(--text-xs);color:var(--color-amber-bg);opacity:0.8">Everything from Chapter ${chapter.id}</div>
          </div>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
      </div>

    </div>
  `;

  chapter.sublessons.forEach((sl, i) => {
    container.querySelector(`#sl-btn-${i}`).addEventListener('click', () => {
      renderGameTypePicker(container, chapter, [sl]);
    });
  });

  container.querySelector('#sl-btn-all').addEventListener('click', () => {
    renderGameTypePicker(container, chapter, chapter.sublessons);
  });
}

/* ════════════════════════════════════════════════════════════════════════════
   Game type picker
   ════════════════════════════════════════════════════════════════════════════ */

const GAME_TYPES = [
  { id: 'article-picker',  label: 'Article picker',      desc: 'Choose el or la',              tag: 'tag-vocab'    },
  { id: 'fill-article',    label: 'Fill in the blank',   desc: 'Type the article',             tag: 'tag-grammar'  },
  { id: 'matching',        label: 'Matching pairs',      desc: 'Match word to meaning',        tag: 'tag-vocab'    },
  { id: 'translation',     label: 'Translation',         desc: 'English → Spanish',            tag: 'tag-vocab'    },
  { id: 'plural-picker',   label: 'Plural builder',      desc: 'Choose the plural form',       tag: 'tag-grammar'  },
  { id: 'adjective',       label: 'Adjective agreement', desc: 'Masculine, feminine, plural',  tag: 'tag-grammar'  },
  { id: 'conjugation',     label: 'Conjugation',         desc: 'Pick the correct verb form',   tag: 'tag-grammar'  },
  { id: 'ser-vs-estar',    label: 'Ser vs Estar',        desc: 'Choose the right "to be"',     tag: 'tag-grammar'  },
  { id: 'number-quiz',        label: 'Number quiz',         desc: 'Numeral → Spanish word',           tag: 'tag-grammar'  },
  { id: 'sentence-completion',label: 'Sentence completion', desc: 'Fill the blank in context',         tag: 'tag-grammar'  },
  { id: 'random',             label: 'Random mix',          desc: 'Surprise me',                       tag: null           },
];

function renderGameTypePicker(container, chapter, sublessons) {
  const slNames = sublessons.map(s => s.title).join(' · ');

  container.innerHTML = `
    <div class="page active">

      <div style="display:flex;align-items:center;gap:var(--space-3);margin-bottom:var(--space-5)">
        <button class="btn btn--ghost btn--sm" id="back-to-menu">← Back</button>
        <span style="font-size:var(--text-xs);color:var(--color-amber)">${slNames}</span>
      </div>

      <h3 style="font-family:var(--font-serif);color:var(--color-amber);font-weight:normal;margin-bottom:var(--space-2)">Choose a game type</h3>
      <p class="text-muted text-sm" style="margin-bottom:var(--space-5)">All game types use your Chapter ${chapter.id} vocabulary.</p>

      <div style="display:flex;flex-direction:column;gap:var(--space-2)" id="game-type-list">
        ${GAME_TYPES.map(gt => `
          <button class="btn btn--full" id="gt-${gt.id}"
            style="justify-content:space-between;text-align:left;padding:var(--space-3) var(--space-4)">
            <div style="display:flex;align-items:center;gap:var(--space-3)">
              ${gt.tag ? `<span class="${gt.tag}" style="margin-bottom:0;white-space:nowrap">${gt.label}</span>` : `<span style="font-size:var(--text-sm);color:var(--text-bright)">${gt.label}</span>`}
              <span style="font-size:var(--text-xs);color:var(--text-muted)">${gt.desc}</span>
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        `).join('')}
      </div>

    </div>
  `;

  container.querySelector('#back-to-menu').addEventListener('click', () => {
    renderTrainingMenu(container, chapter);
  });

  GAME_TYPES.forEach(gt => {
    container.querySelector(`#gt-${gt.id}`).addEventListener('click', () => {
      const gameType = gt.id === 'random'
        ? GAME_TYPES[Math.floor(Math.random() * (GAME_TYPES.length - 1))].id
        : gt.id;
      startTrainingSession(container, chapter, sublessons, gameType);
    });
  });
}

/* ════════════════════════════════════════════════════════════════════════════
   Training session runner — infinite loop until user quits
   ════════════════════════════════════════════════════════════════════════════ */

function startTrainingSession(container, chapter, sublessons, gameType) {
  let sessionCorrect = 0;
  let sessionTotal   = 0;
  let roundCount     = 0;

  function nextQuestion() {
    roundCount++;
    const q = buildTrainingQuestion(sublessons, gameType, roundCount);
    renderTrainingQuestion(container, chapter, sublessons, gameType, q, {
      correct: sessionCorrect,
      total:   sessionTotal,
      round:   roundCount,
      onAnswer: (isCorrect) => {
        if (isCorrect) sessionCorrect++;
        sessionTotal++;
      },
      onNext:   nextQuestion,
      onQuit:   () => renderTrainingMenu(container, chapter),
    });
  }

  nextQuestion();
}

/* ── Build a single training question ── */

function buildTrainingQuestion(sublessons, gameType, round) {
  const allVocab = sublessons.flatMap(sl => sl.vocabulary || []).filter(v => v.gender !== 'n');
  const allAdjs  = sublessons.flatMap(sl => sl.adjectives  || []);

  const nouns = [
    { es: 'libro',    en: 'book',   gender: 'm' },
    { es: 'casa',     en: 'house',  gender: 'f' },
    { es: 'perro',    en: 'dog',    gender: 'm' },
    { es: 'muchacha', en: 'girl',   gender: 'f' },
    { es: 'hotel',    en: 'hotel',  gender: 'm' },
    { es: 'lámpara',  en: 'lamp',   gender: 'f' },
    { es: 'hombre',   en: 'man',    gender: 'm' },
    { es: 'mujer',    en: 'woman',  gender: 'f' },
  ];

  switch (gameType) {
    case 'article-picker':
    case 'fill-article':
    case 'translation': {
      const vocab = shuffle(allVocab.filter(v => v.article))[0];
      if (!vocab) return { type: 'matching', pairs: shuffle(allVocab).slice(0,4).map(v=>({es:v.es,en:v.en})) };
      return { type: gameType, vocab };
    }
    case 'plural-picker': {
      const vocab = shuffle(allVocab.filter(v => v.plural))[0];
      if (!vocab) return { type: 'matching', pairs: shuffle(allVocab).slice(0,4).map(v=>({es:v.es,en:v.en})) };
      return { type: 'plural-picker', vocab };
    }
    case 'adjective': {
      const adj  = shuffle(allAdjs)[0];
      if (!adj) return { type: 'matching', pairs: shuffle(allVocab).slice(0,4).map(v=>({es:v.es,en:v.en})) };
      const noun = nouns[round % nouns.length];
      return { type: 'adjective', noun, adjective: adj };
    }
    case 'conjugation': {
      const allConjs = sublessons.flatMap(sl => sl.conjugations || []);
      if (!allConjs.length) return { type: 'matching', pairs: shuffle(allVocab).slice(0,4).map(v=>({es:v.es,en:v.en})) };
      const c = shuffle(allConjs)[0];
      const verb = sublessons.find(sl => sl.conjugations?.length)?.id?.startsWith('2-2') ? 'estar' : 'ser';
      return { type: 'conjugation', pronoun: c.pronoun, correctForm: c.form, verb, en: c.en, allForms: allConjs };
    }
    case 'ser-vs-estar': {
      const allQ = sublessons.flatMap(sl => sl.serVsEstarQuestions || []);
      if (!allQ.length) return { type: 'matching', pairs: shuffle(allVocab).slice(0,4).map(v=>({es:v.es,en:v.en})) };
      const q = shuffle(allQ)[0];
      return { type: 'ser-vs-estar', ...q };
    }
    case 'matching': {
      const pairs = shuffle(allVocab).slice(0, 4).map(v => ({
        es: v.article ? `${v.article} ${v.es}` : v.es, en: v.en,
      }));
      return { type: 'matching', pairs };
    }
    default: {
      const vocab = shuffle(allVocab.filter(v => v.article))[0] || allVocab[0];
      return { type: 'article-picker', vocab };
    }
  }
}

/* ── Render a training question with quit button ── */

function renderTrainingQuestion(container, chapter, sublessons, gameType, q, session) {
  container.innerHTML = `
    <div class="page active">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:var(--space-3)">
        <button class="btn btn--ghost btn--sm" id="quit-btn">Quit</button>
        <div style="display:flex;align-items:center;gap:var(--space-3)">
          <span class="text-xs" style="color:var(--color-green)">${session.correct} correct</span>
          <span class="text-xs text-muted">of ${session.total}</span>
        </div>
      </div>

      <div style="background:var(--color-amber-bg);border-radius:var(--radius-sm);height:3px;margin-bottom:var(--space-5)">
        <div style="height:100%;background:var(--color-amber);border-radius:var(--radius-sm);width:${session.total > 0 ? Math.round((session.correct/session.total)*100) : 0}%;transition:width 0.3s ease"></div>
      </div>

      <div id="game-content"></div>
    </div>
  `;

  container.querySelector('#quit-btn').addEventListener('click', session.onQuit);

  const gameContent = container.querySelector('#game-content');

  gameContent.addEventListener('game:next', () => {
    session.onNext();
  }, { once: true });

  switch (q.type) {
    case 'article-picker':  gameArticlePicker(gameContent, q, session.onAnswer);      break;
    case 'fill-article':    gameFillArticle(gameContent, q, session.onAnswer);        break;
    case 'matching':        gameMatching(gameContent, q, session.onAnswer);            break;
    case 'plural-picker':   gamePluralPicker(gameContent, q, session.onAnswer);       break;
    case 'adjective':       gameAdjectiveAgreement(gameContent, q, session.onAnswer); break;
    case 'translation':     gameTranslation(gameContent, q, session.onAnswer);        break;
    case 'conjugation':     gameConjugationPicker(gameContent, q, session.onAnswer);  break;
    case 'ser-vs-estar':    gameSerVsEstar(gameContent, q, session.onAnswer);         break;
    case 'number-quiz':         gameNumberQuiz(gameContent, q, session.onAnswer);         break;
    case 'sentence-completion': gameSentenceCompletion(gameContent, q, session.onAnswer); break;
    default:                    gameArticlePicker(gameContent, q, session.onAnswer);
  }
}

export { renderTraining };
