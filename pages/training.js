/* ─── Fluir · Training Grounds ────────────────────────────────────────────── */

import Store from '../js/store.js';
import { loadChapter, ALL_CHAPTERS, VOCAB_KEYS } from '../js/data/registry.js';
import { isPracticeUnlocked, practiceUnlockedChapterIds } from '../js/chapters/access.js';
import { renderGame, renderUnknownGame } from '../js/games/dispatch.js';
import { pickTrainingQuestion } from '../js/training-questions.js';
import { prepareQuestions } from './lesson/questions.js';
import { el, clearAndMount } from '../js/dom.js';
import {
  mountPage,
  loadingPage,
  pageWithEmptyState,
  backButton,
  sectionLabel,
  trainingChapterCard,
  listButton,
  iconGrid,
  iconChevronRight,
  emptyState,
  quizHeader,
} from './ui.js';

const VOCAB_KEY_LABELS = {
  vocabulary: 'Vocabulary', adjectives: 'Adjectives', verbs: 'Verbs', idioms: 'Phrases',
  tenerExpressions: 'Tener Expressions', hacerExpressions: 'Hacer Expressions',
  locationPrepositions: 'Prepositions', porExpressions: 'Por Expressions',
  becomeExpressions: 'Become Expressions', movementVerbs: 'Movement Verbs',
  reciprocalVerbs: 'Reciprocal Verbs', impersonalExpressions: 'Impersonal Expressions',
  emotionVerbs: 'Emotion Verbs', commandVerbs: 'Command Verbs',
  conjunctions: 'Conjunctions', readingVocab: 'Reading Vocabulary',
};

async function renderTraining(container, chapterId) {
  if (chapterId === null) {
    renderTrainingHub(container);
    return;
  }

  clearAndMount(container, loadingPage('Loading practice…'));

  const chapter  = await loadChapter(chapterId);
  const progress = Store.getProgress();
  const settings = Store.getSettings();
  const complete = isPracticeUnlocked(chapterId, progress, settings);

  if (!chapter) {
    clearAndMount(container,
      pageWithEmptyState(`Chapter ${chapterId} not available`, {
        onBack: () => history.back(),
        body:   'This chapter hasn\'t been added to Fluir yet.',
      }),
    );
    return;
  }

  if (!complete) {
    clearAndMount(container,
      el('div', { className: 'page active' },
        el('div', { className: 'page-header' }, backButton('back-btn', () => history.back())),
        el('div', { className: 'card card--centered' },
          el('div', { className: 'page-title page-title--amber page-title--sm mb-3', text: 'Complete the lesson first' }),
          el('p', { className: 'text-muted text-sm mb-5', text: `Training Grounds unlocks after you finish Chapter ${chapterId}.` }),
          el('button', {
            className: 'btn btn--primary',
            id: 'go-lesson-btn',
            text: 'Go to lesson',
            onClick: () => { location.hash = `#/chapter/${chapterId}`; },
          }),
        ),
      ),
    );
    return;
  }

  renderTrainingMenu(container, chapter);
}

function renderTrainingHub(container) {
  const progress  = Store.getProgress();
  const settings  = Store.getSettings();
  const completed = practiceUnlockedChapterIds(ALL_CHAPTERS, progress, settings);

  mountPage(container, [
    el('div', { className: 'page-head page-head--spaced' },
      el('h2', { className: 'page-title page-title--amber page-title--training', text: 'Practice' }),
      el('p', {
        className: 'text-muted text-sm',
        text: 'Free practice — no scoring. Complete a chapter lesson to unlock it here.',
      }),
    ),
    sectionLabel('Chapters'),
    el('div', { id: 'training-chapter-list' },
      ...ALL_CHAPTERS.map(ch => trainingChapterCard(ch, completed.includes(ch.id))),
    ),
  ]);
}

function renderTrainingMenu(container, chapter) {
  mountPage(container, [
    el('div', { className: 'page-header' }, backButton('back-btn', () => history.back())),
    el('div', { className: 'page-kicker', text: `Chapter ${chapter.id}` }),
    el('h2', { className: 'page-title page-title--amber mb-2', text: 'Training Grounds' }),
    el('p', {
      className: 'text-muted text-sm page-lead',
      text: 'Free practice — no scoring. Drill whatever you want, as many times as you want.',
    }),
    el('div', { className: 'mb-6' },
      listButton('Browse vocabulary', () => renderVocabBrowser(container, chapter), {
        id: 'browse-vocab-btn',
        meta: `All words from Chapter ${chapter.id}`,
        className: 'list-btn--subtle',
        trailing: iconGrid(),
      }),
    ),
    sectionLabel('Practice'),
    el('div', { id: 'sublesson-list', className: 'mb-6' },
      ...chapter.sublessons.map((sl, i) =>
        listButton(sl.title, () => renderGameTypePicker(container, chapter, [sl]), {
          id: `sl-btn-${i}`,
          meta: sl.subtitle,
          className: 'list-btn--stack',
        }),
      ),
      listButton('All lessons mixed', () => renderGameTypePicker(container, chapter, chapter.sublessons), {
        id: 'sl-btn-all',
        meta: `Everything from Chapter ${chapter.id}`,
        metaClass: 'list-btn__meta--amber',
        className: 'btn--amber',
      }),
    ),
  ]);
}

function renderVocabBrowser(container, chapter) {
  const totalCount = chapter.sublessons.reduce((n, s) =>
    n + VOCAB_KEYS.reduce((m, k) => m + (s[k]?.length ?? 0), 0), 0);

  const sections = chapter.sublessons.flatMap(sl => {
    const groups = VOCAB_KEYS
      .filter(k => sl[k]?.length)
      .map(k => el('div', { className: 'vocab-group' },
        sectionLabel(VOCAB_KEY_LABELS[k], { tight: true }),
        el('div', { className: 'vocab-grid' },
          ...sl[k].map(item => vocabCardEl(item)),
        ),
      ));
    if (!groups.length) return [];
    return [el('div', { className: 'vocab-section' },
      el('div', { className: 'vocab-section__title', text: sl.title }),
      el('div', { className: 'vocab-section__subtitle', text: sl.subtitle }),
      ...groups,
    )];
  });

  mountPage(container, [
    el('div', { className: 'page-header' },
      backButton('vocab-back', () => renderTrainingMenu(container, chapter)),
    ),
    el('div', { className: 'page-kicker page-kicker--tight', text: `Chapter ${chapter.id} · ${totalCount} items` }),
    el('h2', { className: 'page-title page-title--amber mb-2', text: 'Vocabulary' }),
    el('p', { className: 'text-muted text-sm page-lead', text: 'Tap a card to see the translation.' }),
    ...sections,
  ]);
}

function vocabCardEl(item) {
  const word = item.article
    ? `${item.article} ${item.es || item.infinitive || ''}`
    : (item.es || item.infinitive || '');
  const sub = item.plural
    ? `pl: ${item.plural}`
    : (item.rule ? item.rule.replace(/<[^>]+>/g, '').trim().slice(0, 40) : '');

  return el('div', {
    className: 'vocab-card',
    dataset: { flipped: 'false' },
    onClick: ({ currentTarget }) => {
      currentTarget.dataset.flipped = currentTarget.dataset.flipped === 'true' ? 'false' : 'true';
    },
  },
    el('div', { className: 'vocab-card__front' },
      el('span', { className: 'vocab-card__es', text: word }),
      sub ? el('span', { className: 'vocab-card__sub', text: sub }) : null,
    ),
    el('div', { className: 'vocab-card__back' },
      el('span', { className: 'vocab-card__en', text: item.en || '' }),
    ),
  );
}

const GAME_TYPES = [
  { id: 'article-picker',       label: 'Article picker',      desc: 'Choose el or la',             tag: 'tag-vocab'   },
  { id: 'fill-article',         label: 'Fill in the blank',   desc: 'Type the article',            tag: 'tag-grammar' },
  { id: 'matching',             label: 'Matching pairs',      desc: 'Match word to meaning',       tag: 'tag-vocab'   },
  { id: 'translation',          label: 'Translation',         desc: 'English → Spanish',           tag: 'tag-vocab'   },
  { id: 'plural-picker',        label: 'Plural builder',      desc: 'Choose the plural form',      tag: 'tag-grammar' },
  { id: 'adjective',            label: 'Adjective agreement', desc: 'Masculine, feminine, plural', tag: 'tag-grammar' },
  { id: 'conjugation',          label: 'Conjugation',         desc: 'Pick the correct verb form',  tag: 'tag-grammar' },
  { id: 'ser-vs-estar',         label: 'Ser vs Estar',        desc: 'Choose the right "to be"',    tag: 'tag-grammar' },
  { id: 'number-quiz',          label: 'Number quiz',         desc: 'Numeral → Spanish word',      tag: 'tag-grammar' },
  { id: 'sentence-completion',  label: 'Sentence completion', desc: 'Fill the blank in context',   tag: 'tag-grammar' },
  { id: 'random',               label: 'Random mix',          desc: 'Surprise me',                 tag: null          },
];

function renderGameTypePicker(container, chapter, sublessons) {
  const slNames = sublessons.map(s => s.title).join(' · ');

  mountPage(container, [
    el('div', { className: 'page-header' },
      backButton('back-to-menu', () => renderTrainingMenu(container, chapter)),
      el('span', { className: 'training-context', text: slNames }),
    ),
    el('h3', { className: 'page-title page-title--amber mb-2', text: 'Choose a game type' }),
    el('p', { className: 'text-muted text-sm mb-5', text: `All game types use your Chapter ${chapter.id} vocabulary.` }),
    el('div', { className: 'game-type-list', id: 'game-type-list' },
      ...GAME_TYPES.map(gt =>
        el('button', {
          className: 'btn btn--full list-btn',
          id: `gt-${gt.id}`,
          onClick: () => {
            const gameType = gt.id === 'random'
              ? GAME_TYPES[Math.floor(Math.random() * (GAME_TYPES.length - 1))].id
              : gt.id;
            startTrainingSession(container, chapter, sublessons, gameType);
          },
        },
          el('div', { className: 'game-type-row' },
            gt.tag
              ? el('span', { className: `${gt.tag} tag--inline`, text: gt.label })
              : el('span', { className: 'list-btn__title', text: gt.label }),
            el('span', { className: 'list-btn__meta', text: gt.desc }),
          ),
          iconChevronRight(),
        ),
      ),
    ),
  ]);
}

function startTrainingSession(container, chapter, sublessons, gameType) {
  let sessionCorrect = 0;
  let sessionTotal   = 0;

  async function nextQuestion() {
    await Promise.all(sublessons.map(sl => prepareQuestions(sl)));
    const q = pickTrainingQuestion(sublessons, gameType);
    if (!q) {
      clearAndMount(container,
        el('div', { className: 'page active' },
          emptyState({
            title: 'No practice content',
            body:  'These lessons have no questions for this game type yet.',
            padded: true,
            action: el('button', {
              className: 'btn btn--primary',
              id: 'no-content-back',
              style: 'margin-top:var(--space-4)',
              text: 'Back',
              onClick: () => renderTrainingMenu(container, chapter),
            }),
          }),
        ),
      );
      return;
    }
    renderTrainingQuestion(container, chapter, sublessons, gameType, q, {
      correct: sessionCorrect,
      total:   sessionTotal,
      onAnswer: (isCorrect) => {
        if (isCorrect) sessionCorrect++;
        sessionTotal++;
      },
      onNext: () => nextQuestion(),
      onQuit: () => renderTrainingMenu(container, chapter),
    });
  }

  nextQuestion();
}

function renderTrainingQuestion(container, chapter, sublessons, gameType, q, session) {
  const accuracyPct = session.total > 0
    ? Math.round((session.correct / session.total) * 100)
    : 0;

  const gameContent = el('div', { id: 'game-content' });

  mountPage(container, [
    quizHeader({
      backBtn: el('button', {
        className: 'btn btn--ghost btn--sm',
        id: 'quit-btn',
        text: 'Quit',
        onClick: session.onQuit,
      }),
      actions: [
        el('span', { className: 'text-xs quiz-score', text: `${session.correct} correct` }),
        el('span', { className: 'text-xs text-muted', text: `of ${session.total}` }),
      ],
    }),
    el('div', { className: 'training-progress' },
      el('div', { className: 'training-progress__fill', style: `width:${accuracyPct}%` }),
    ),
    gameContent,
  ]);

  gameContent.addEventListener('game:next', () => {
    session.onNext();
  }, { once: true });

  if (!renderGame(gameContent, q, session.onAnswer)) {
    renderUnknownGame(gameContent, q);
  }
}

export { renderTraining, pickTrainingQuestion };
