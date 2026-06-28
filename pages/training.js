/* ─── Fluir · Training Grounds ────────────────────────────────────────────── */

import Store from '../js/store.js';
import { loadChapter, ALL_CHAPTERS, collectChapterVocabBrowseSections } from '../js/data/registry.js';
import { isPracticeUnlocked, practiceUnlockedChapterIds } from '../js/chapters/access.js';
import { renderGame, renderUnknownGame } from '../js/games/dispatch.js';
import {
  pickTrainingQuestion,
  prepareTrainingPool,
  gameTypesForPickerFromPool,
  pickRandomGameType,
} from '../js/training-questions.js';
import { prepareQuestions } from './lesson/questions.js';
import { vocabBrowseHint } from '../js/vocab-display.js';
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
  vocabCard,
  vocabDirectionControl,
} from './ui.js';

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
    el('div', { className: 'list-btn-group training-menu__browse' },
      listButton('Browse vocabulary', () => renderVocabBrowser(container, chapter), {
        id: 'browse-vocab-btn',
        meta: `All words from Chapter ${chapter.id}`,
        className: 'list-btn--subtle',
        trailing: iconGrid(),
      }),
    ),
    sectionLabel('Practice'),
    el('div', { id: 'sublesson-list', className: 'list-btn-group training-menu__practice' },
      ...chapter.sublessons.map((sl, i) =>
        listButton(sl.title, () => { void renderGameTypePicker(container, chapter, [sl]); }, {
          id: `sl-btn-${i}`,
          meta: sl.subtitle,
          className: 'list-btn--stack',
        }),
      ),
      listButton('All lessons mixed', () => { void renderGameTypePicker(container, chapter, chapter.sublessons); }, {
        id: 'sl-btn-all',
        meta: `Everything from Chapter ${chapter.id}`,
        className: 'list-btn--stack',
      }),
    ),
  ]);
}

function renderVocabBrowser(container, chapter) {
  const direction = Store.getSettings().vocabCardDirection;
  const sections = collectChapterVocabBrowseSections(chapter);
  const totalCount = sections.reduce((n, s) => n + s.items.length, 0);

  const sectionEls = sections.map(section => el('div', { className: 'vocab-section' },
    sectionLabel(section.label),
    el('div', { className: 'vocab-grid' },
      ...section.items.map(item => vocabCard(item, { direction, arrayKey: section.arrayKey })),
    ),
  ));

  mountPage(container, [
    el('div', { className: 'page-header' },
      backButton('vocab-back', () => renderTrainingMenu(container, chapter)),
    ),
    el('div', { className: 'page-kicker page-kicker--tight', text: `Chapter ${chapter.id} · ${totalCount} items` }),
    el('h2', { className: 'page-title page-title--amber', text: 'Vocabulary' }),
    el('div', { className: 'vocab-browser__intro' },
      el('p', { className: 'text-muted text-sm', text: vocabBrowseHint(direction) }),
      el('div', { className: 'vocab-direction-bar' },
        sectionLabel('Show first', { tight: true }),
        vocabDirectionControl({
          value: direction,
          onChange: (next) => {
            Store.saveSetting('vocabCardDirection', next);
            renderVocabBrowser(container, chapter);
          },
        }),
      ),
    ),
    ...sectionEls,
  ]);
}

async function renderGameTypePicker(container, chapter, sublessons) {
  clearAndMount(container, loadingPage('Loading drills…'));

  const pool    = await prepareTrainingPool(sublessons);
  const options = gameTypesForPickerFromPool(pool);
  const slNames = sublessons.map(s => s.title).join(' · ');

  if (!options.length) {
    clearAndMount(container,
      pageWithEmptyState('No practice drills', {
        onBack: () => renderTrainingMenu(container, chapter),
        body:   'This selection has no questions yet.',
      }),
    );
    return;
  }

  const drillCount = options.filter(gt => gt.id !== 'random').length;
  const lead = drillCount === 1
    ? '1 drill type is available for this selection.'
    : `${drillCount} drill types are available for this selection.`;

  mountPage(container, [
    el('div', { className: 'page-header' },
      backButton('back-to-menu', () => renderTrainingMenu(container, chapter)),
      el('span', { className: 'training-context', text: slNames }),
    ),
    el('h3', { className: 'page-title page-title--amber mb-2', text: 'Choose a game type' }),
    el('p', { className: 'text-muted text-sm mb-5', text: lead }),
    el('div', { className: 'game-type-list', id: 'game-type-list' },
      ...options.map(gt =>
        el('button', {
          className: 'btn btn--full list-btn',
          id: `gt-${gt.id}`,
          onClick: () => {
            const gameType = gt.id === 'random' ? pickRandomGameType(options) : gt.id;
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
              onClick: () => { void renderGameTypePicker(container, chapter, sublessons); },
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
      onExit: () => { void renderGameTypePicker(container, chapter, sublessons); },
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
        id: 'exit-btn',
        text: 'Exit',
        onClick: session.onExit,
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
