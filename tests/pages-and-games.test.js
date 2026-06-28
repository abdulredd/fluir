import { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { installDom, mockContainer } from './helpers/dom-stub.js';

describe('builder utils', () => {
  it('addMatching adds the requested number of rounds', async () => {
    const { addMatching } = await import('../pages/lesson/builder-utils.js');
    const questions = [];
    const pool = [
      { es: 'perro', en: 'dog' },
      { es: 'gato', en: 'cat' },
      { es: 'pájaro', en: 'bird' },
      { es: 'pez', en: 'fish' },
    ];
    addMatching(questions, pool, { rounds: 2 });
    assert.equal(questions.length, 2);
    assert.equal(questions[0].type, 'matching');
    assert.equal(questions[0].pairs.length, 4);
  });

  it('addMatching no-ops on an empty pool', async () => {
    const { addMatching } = await import('../pages/lesson/builder-utils.js');
    const questions = [];
    addMatching(questions, [], { rounds: 3 });
    assert.deepEqual(questions, []);
  });

  it('addMatching respects a custom mapPair', async () => {
    const { addMatching } = await import('../pages/lesson/builder-utils.js');
    const questions = [];
    addMatching(questions, [{ es: 'libro', en: 'book', article: 'el' }], {
      mapPair: v => ({ es: `${v.article} ${v.es}`, en: v.en }),
    });
    assert.equal(questions[0].pairs[0].es, 'el libro');
  });

  it('addArticlePickers builds article-picker questions', async () => {
    const { addArticlePickers } = await import('../pages/lesson/builder-utils.js');
    const questions = [];
    const pool = [{ id: 'a', es: 'casa' }, { id: 'b', es: 'perro' }];
    addArticlePickers(questions, pool, 2);
    assert.equal(questions.length, 2);
    assert.equal(questions.every(q => q.type === 'article-picker'), true);
  });

  it('uniqueConjForms deduplicates identical forms', async () => {
    const { uniqueConjForms } = await import('../pages/lesson/builder-utils.js');
    const forms = [
      { pronoun: 'yo', form: 'hablo' },
      { pronoun: 'tú', form: 'hablas' },
      { pronoun: 'él/ella', form: 'habla' },
      { pronoun: 'nosotros', form: 'hablamos' },
      { pronoun: 'ellos', form: 'hablan' },
    ];
    assert.equal(uniqueConjForms(forms).length, 5);
    const duped = [...forms, { pronoun: 'Ud.', form: 'habla' }];
    assert.equal(uniqueConjForms(duped).length, 5);
  });

  it('verbEnShort strips the leading "to "', async () => {
    const { verbEnShort } = await import('../pages/lesson/builder-utils.js');
    assert.equal(verbEnShort({ en: 'to speak / to talk' }), 'speak');
  });

  it('conjugateFromFormsMap maps display pronouns to form keys', async () => {
    const { conjugateFromFormsMap } = await import('../pages/lesson/builder-utils.js');
    const verb = { forms: { yo: 'fui', tu: 'fuiste', el: 'fue', nos: 'fuimos', ellos: 'fueron' } };
    assert.equal(conjugateFromFormsMap(verb, 'tú'), 'fuiste');
    assert.equal(conjugateFromFormsMap(verb, 'nosotros'), 'fuimos');
  });
});

describe('grammar rules module', () => {
  it('exports the three rule maps used by game feedback', async () => {
    const { GENDER_RULES, PLURAL_RULES, ADJ_RULES } = await import('../js/data/grammar-rules.js');
    assert.ok(GENDER_RULES.ends_o);
    assert.ok(PLURAL_RULES.vowel_masc);
    assert.ok(ADJ_RULES.o_masc);
  });
});

describe('page UI primitives', () => {
  let restore;

  before(async () => {
    restore = installDom();
  });

  after(() => {
    restore?.();
  });

  it('mountPage wraps children in an active page shell', async () => {
    const { mountPage, el } = await import('../pages/ui.js');
    const container = mockContainer();
    mountPage(container, [el('p', { text: 'Hello' })], { id: 'home-page' });
    const page = container.children[0];
    assert.equal(page.id, 'home-page');
    assert.match(page.className, /page active/);
    assert.equal(page.children[0].textContent, 'Hello');
  });

  it('progressBar sets aria-valuenow and fill width', async () => {
    const { progressBar } = await import('../pages/ui.js');
    const bar = progressBar(72, { ariaLabel: 'Lesson progress' });
    assert.equal(bar.getAttribute('ariaValuenow'), '72');
    assert.equal(bar.getAttribute('aria-label'), 'Lesson progress');
    assert.match(bar.children[0].style.cssText, /width:72%/);
  });

  it('metricsRow renders value and label pairs', async () => {
    const { metricsRow } = await import('../pages/ui.js');
    const row = metricsRow([
      { value: 3, label: 'Streak' },
      { value: '85%', label: 'Best', valueClass: 'text-success' },
    ]);
    assert.equal(row.children.length, 2);
    assert.equal(row.children[0].children[0].textContent, '3');
    assert.match(row.children[1].children[0].className, /text-success/);
  });

  it('chapterCard shows locked state for a gated chapter', async () => {
    const { chapterCard } = await import('../pages/ui.js');
    const ch = { id: 2, title: 'Ser and Estar', hasContent: true };
    const card = chapterCard(ch, { chaptersStarted: [], chaptersComplete: [], lessonScores: {} }, {}, () => false);
    assert.equal(card.disabled, true);
    assert.match(card.className, /chapter-card--locked/);
    assert.match(card.textContent, /Locked/);
  });

  it('chapterCard shows best score when complete', async () => {
    const { chapterCard } = await import('../pages/ui.js');
    const ch = { id: 1, title: 'Chapter 1', hasContent: true };
    const progress = {
      chaptersStarted: [1],
      chaptersComplete: [1],
      lessonScores: { 1: { best: 92 } },
    };
    const card = chapterCard(ch, progress, {}, () => true);
    assert.match(card.textContent, /Best: 92%/);
    assert.match(card.className, /chapter-card--complete/);
  });

  it('chapterCard navigates via hash when clickable', async () => {
    const { chapterCard } = await import('../pages/ui.js');
    const prev = globalThis.location;
    globalThis.location = { hash: '' };
    try {
      const ch = { id: 1, title: 'Chapter 1', hasContent: true };
      const card = chapterCard(ch, { chaptersStarted: [], chaptersComplete: [], lessonScores: {} }, {}, () => true);
      card.click();
      assert.equal(globalThis.location.hash, '#/chapter/1');
    } finally {
      globalThis.location = prev;
    }
  });

  it('trainingChapterCard stays disabled until the lesson is complete', async () => {
    const { trainingChapterCard } = await import('../pages/ui.js');
    const ch = { id: 2, title: 'Chapter 2', hasContent: true };
    const locked = trainingChapterCard(ch, false);
    const unlocked = trainingChapterCard(ch, true);
    assert.equal(locked.disabled, true);
    assert.equal(unlocked.disabled, false);
    assert.match(unlocked.textContent, /Practice unlocked/);
  });

  it('vocabCard toggles flip state on click', async () => {
    const { vocabCard } = await import('../pages/ui.js');
    const card = vocabCard(
      { article: 'el', es: 'perro', en: 'dog', plural: 'perros', gender: 'm' },
      { arrayKey: 'vocabulary' },
    );
    assert.equal(card.dataset.flipped, 'false');
    assert.match(card.querySelector('.vocab-card__prompt').textContent, /el perro/);
    card.dispatchEvent({ type: 'click', currentTarget: card });
    assert.equal(card.dataset.flipped, 'true');
    assert.equal(card.getAttribute('aria-expanded'), 'true');
    card.dispatchEvent({ type: 'click', currentTarget: card });
    assert.equal(card.dataset.flipped, 'false');
  });

  it('vocabCard English-first shows English on the front in prompt color', async () => {
    const { vocabCard } = await import('../pages/ui.js');
    const card = vocabCard(
      { article: 'el', es: 'perro', en: 'dog', plural: 'perros', gender: 'm' },
      { direction: 'en-es', arrayKey: 'vocabulary' },
    );
    const front = card.querySelector('.vocab-card__prompt');
    assert.ok(front);
    assert.match(front.textContent, /dog/);
    card.dispatchEvent({ type: 'click', currentTarget: card });
    const back = card.querySelector('.vocab-card__answer');
    assert.ok(back);
    assert.match(back.textContent, /perro/);
  });

  it('vocabCard shows adjective gender forms on the Spanish side', async () => {
    const { vocabCard } = await import('../pages/ui.js');
    const card = vocabCard(
      { es: 'amarillo', en: 'yellow', endsO: true },
      { arrayKey: 'adjectives' },
    );
    assert.match(card.querySelector('.vocab-card__prompt').textContent, /amarillo/);
    assert.match(card.querySelector('.vocab-card__sub').textContent, /amarilla/);
  });

  it('vocabDirectionControl marks the active option', async () => {
    const { vocabDirectionControl } = await import('../pages/ui.js');
    let chosen = 'es-en';
    const control = vocabDirectionControl({
      value: 'en-es',
      onChange: (v) => { chosen = v; },
    });
    const active = control.querySelector('.segmented-control__option--active');
    assert.match(active.textContent, /English/);
    control.querySelectorAll('.segmented-control__option')[0].click();
    assert.equal(chosen, 'es-en');
  });

  it('mountQuizPage exposes the game content slot', async () => {
    const { mountQuizPage, el } = await import('../pages/ui.js');
    const container = mockContainer();
    const gameSlot = mountQuizPage(container, {
      header: el('div', { text: 'Header' }),
      progress: el('div', { text: 'Progress' }),
      meta: el('div', { text: 'Meta' }),
      gameContentId: 'lesson-game',
    });
    assert.equal(gameSlot.id, 'lesson-game');
    assert.equal(container.querySelector('#lesson-game'), gameSlot);
  });
});

describe('game UI interactions', () => {
  let restore;

  before(async () => {
    restore = installDom();
  });

  after(() => {
    restore?.();
  });

  it('bindChoiceButtons marks correct and wrong answers', async () => {
    const { renderGameShell, bindChoiceButtons } = await import('../js/games/ui.js');
    const container = mockContainer();
    const { feedback, choicesEl } = renderGameShell(container, { tagLabel: 'Test', prompt: 'Pick' });
    let answered = null;

    bindChoiceButtons(container, choicesEl, feedback, [
      { label: 'Right', isCorrect: true },
      { label: 'Wrong', isCorrect: false },
    ], {
      feedbackHtml: ok => (ok ? 'Nice' : 'Nope'),
      onAnswer: ok => { answered = ok; },
    });

    const buttons = choicesEl.querySelectorAll('.option');
    assert.equal(buttons.length, 2);
    buttons[1].click();
    assert.equal(answered, false);
    assert.match(feedback.className, /wrong/);
    assert.equal(buttons[0].disabled, true);
    assert.match(buttons[0].className, /correct/);
    assert.match(buttons[1].className, /wrong/);
  });

  it('bindTextCheck accepts correct input on Enter', async () => {
    const { renderGameShell, bindTextCheck } = await import('../js/games/ui.js');
    const { el } = await import('../js/dom.js');
    const container = mockContainer();
    const { feedback } = renderGameShell(container, { tagLabel: 'Fill', prompt: 'Type it', withChoices: false });
    const input = el('input', { className: 'text-input' });
    input.value = 'el';
    let answered = null;

    bindTextCheck(container, feedback, {
      input,
      isCorrect: v => v === 'el',
      feedbackHtml: ok => (ok ? 'Yes' : 'No'),
      onAnswer: ok => { answered = ok; },
    });

    input.dispatchEvent({ type: 'keydown', key: 'Enter' });
    assert.equal(answered, true);
    assert.equal(input.disabled, true);
    assert.match(input.className, /correct/);
    assert.match(feedback.className, /correct/);
  });

  it('bindTextCheck ignores empty submissions', async () => {
    const { renderGameShell, bindTextCheck } = await import('../js/games/ui.js');
    const { el } = await import('../js/dom.js');
    const container = mockContainer();
    const { feedback } = renderGameShell(container, { tagLabel: 'Fill', prompt: 'Type it', withChoices: false });
    const input = el('input', { className: 'text-input' });
    input.value = '   ';
    let answered = null;

    bindTextCheck(container, feedback, {
      input,
      isCorrect: () => true,
      feedbackHtml: () => 'Yes',
      onAnswer: ok => { answered = ok; },
    });

    input.dispatchEvent({ type: 'keydown', key: 'Enter' });
    assert.equal(answered, null);
    assert.equal(input.disabled, false);
  });

  it('skipToNext dispatches game:next on the container', async () => {
    const { skipToNext } = await import('../js/games/ui.js');
    const container = mockContainer();
    let fired = false;
    container.addEventListener('game:next', () => { fired = true; });
    skipToNext(container);
    assert.equal(fired, true);
  });
});

describe('game answer flows', () => {
  let restore;

  before(async () => {
    restore = installDom();
  });

  after(() => {
    restore?.();
  });

  it('article-picker calls onAnswer(true) for the correct article', async () => {
    const { gameArticlePicker } = await import('../js/games/article-picker.js');
    const container = mockContainer();
    let result = null;

    gameArticlePicker(container, {
      type: 'article-picker',
      vocab: { es: 'libro', en: 'book', article: 'el', rule: 'ends_o' },
    }, (ok) => { result = ok; });

    const correct = container.querySelectorAll('.option').find(b => b.dataset.isCorrect === 'yes');
    correct.click();
    assert.equal(result, true);
  });

  it('article-picker with targetGender calls onAnswer for el/la nouns', async () => {
    const { gameArticlePicker } = await import('../js/games/article-picker.js');
    const container = mockContainer();
    let result = null;

    gameArticlePicker(container, {
      type: 'article-picker',
      vocab: { es: 'artista', en: 'artist', article: 'el/la', rule: 'ista_gender' },
      targetGender: 'm',
    }, (ok) => { result = ok; });

    const correct = container.querySelectorAll('.option').find(b => b.dataset.isCorrect === 'yes');
    correct.click();
    assert.equal(result, true);
  });

  it('article-picker skips el/la vocab without targetGender', async () => {
    const { gameArticlePicker } = await import('../js/games/article-picker.js');
    const container = mockContainer();
    let skipped = false;
    container.addEventListener('game:next', () => { skipped = true; });

    gameArticlePicker(container, {
      type: 'article-picker',
      vocab: { es: 'estudiante', en: 'student', article: 'el/la', rule: 'ista_gender' },
    }, () => {});

    assert.equal(container.querySelectorAll('.option').length, 0);
    assert.equal(skipped, true);
  });

  it('translation accepts answers without accents and notes standard spelling', async () => {
    const { gameTranslation } = await import('../js/games/translation.js');
    const container = mockContainer();
    let result = null;

    gameTranslation(container, {
      type: 'translation',
      vocab: { es: 'teléfono', en: 'telephone', article: 'el', rule: 'ends_o' },
    }, (ok) => { result = ok; });

    const input = container.querySelector('#trans-inp');
    input.value = 'el telefono';
    input.dispatchEvent({ type: 'keydown', key: 'Enter' });

    assert.equal(result, true);
    const feedback = container.querySelector('#feedback');
    assert.match(feedback.innerHTML, /teléfono/);
  });
});
