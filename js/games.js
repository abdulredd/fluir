/* ─── Fluir · Games engine ──────────────────────────────────────────────────
   Each game function receives:
     container — DOM element to render into
     question  — question object
     onAnswer  — callback(isCorrect, question)
   ─────────────────────────────────────────────────────────────────────────── */

import { GENDER_RULES, PLURAL_RULES, ADJ_RULES } from './data/chapter1.js';

/* ── Helpers ── */

function ruleText(ruleKey, rules = GENDER_RULES) {
  return rules[ruleKey] || 'Learn this word with its article.';
}

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function wrongArticle(correct) {
  if (correct === 'el')  return 'la';
  if (correct === 'la')  return 'el';
  if (correct === 'un')  return 'una';
  if (correct === 'una') return 'un';
  if (correct === 'los') return 'las';
  if (correct === 'las') return 'los';
  return correct === 'el' ? 'la' : 'el';
}

function feedbackHTML(isCorrect, message) {
  const cls = isCorrect ? 'correct' : 'wrong';
  const icon = isCorrect ? '✓' : '✗';
  return `<div class="feedback show ${cls}">${icon} ${message}</div>`;
}

/* ════════════════════════════════════════════════════════════════════════════
   GAME 1: Article Picker — multiple choice (el vs la)
   Question: vocab item, choose correct definite article form
   ════════════════════════════════════════════════════════════════════════════ */

function gameArticlePicker(container, question, onAnswer) {
  const { vocab } = question;
  const correct   = vocab.article === 'el/la' ? null : vocab.article;
  const wrong     = correct ? wrongArticle(correct) : null;

  /* skip -ista/-nte words in this game type — use a different game */
  if (!correct) { onAnswer(true, question); return; }

  const opts = shuffle([
    `${correct} ${vocab.es}`,
    `${wrong} ${vocab.es}`,
  ]);

  container.innerHTML = `
    <div class="game-type-tag tag-vocab" style="margin-bottom:var(--space-3)">Definite article</div>
    <div class="game-prompt" style="margin-bottom:var(--space-4)">Choose the correct article</div>
    <div class="es-large" style="margin-bottom:var(--space-2)">${vocab.es}</div>
    <div class="lesson-translation" style="margin-bottom:var(--space-5)">${vocab.en}</div>
    <div id="choices"></div>
    <div class="feedback" id="feedback"></div>
    <button class="btn btn--primary" id="next-btn" style="display:none;margin-top:var(--space-3)">Next →</button>
  `;

  const choicesEl = container.querySelector('#choices');
  opts.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'option';
    btn.style.fontFamily = 'var(--font-serif)';
    btn.style.fontSize   = 'var(--text-lg)';
    btn.textContent = opt;
    btn.dataset.isCorrect = (opt === `${correct} ${vocab.es}`) ? 'yes' : 'no';
    btn.addEventListener('click', () => {
      const isCorrect = btn.dataset.isCorrect === 'yes';
      container.querySelectorAll('.option').forEach(b => {
        b.disabled = true;
        if (b.dataset.isCorrect === 'yes') b.classList.add('correct');
        else if (b === btn && !isCorrect) b.classList.add('wrong');
      });
      const fb = container.querySelector('#feedback');
      if (isCorrect) {
        fb.innerHTML = `✓ Correct — <em>${correct} ${vocab.es}</em>`;
        fb.className = 'feedback show correct';
      } else {
        const rule = ruleText(vocab.rule);
        fb.innerHTML = `✗ <em>${correct} ${vocab.es}</em> — ${rule}`;
        fb.className = 'feedback show wrong';
      }
      container.querySelector('#next-btn').style.display = 'inline-flex';
      onAnswer(isCorrect, question);
    });
    choicesEl.appendChild(btn);
  });

  container.querySelector('#next-btn').addEventListener('click', () => {
    container.dispatchEvent(new CustomEvent('game:next'));
  });
}

/* ════════════════════════════════════════════════════════════════════════════
   GAME 2: Fill in the Article — type el or la
   ════════════════════════════════════════════════════════════════════════════ */

function gameFillArticle(container, question, onAnswer) {
  const { vocab } = question;
  const correct   = vocab.article === 'el/la' ? null : vocab.article;
  if (!correct) { onAnswer(true, question); return; }

  container.innerHTML = `
    <div class="game-type-tag tag-grammar" style="margin-bottom:var(--space-3)">Fill in the blank</div>
    <div class="game-prompt" style="margin-bottom:var(--space-4)">Type the correct definite article</div>
    <div style="display:flex;align-items:center;gap:var(--space-3);margin-bottom:var(--space-5)">
      <input class="text-input" id="fill-inp" style="width:90px;text-align:center"
             maxlength="3" placeholder="?" autocomplete="off" autocorrect="off" spellcheck="false"/>
      <span class="es-large">${vocab.es}</span>
    </div>
    <div class="lesson-translation" style="margin-bottom:var(--space-4)">${vocab.en}</div>
    <button class="btn btn--primary" id="check-btn">Check</button>
    <div class="feedback" id="feedback" style="margin-top:var(--space-3)"></div>
    <button class="btn btn--primary" id="next-btn" style="display:none;margin-top:var(--space-3)">Next →</button>
  `;

  const inp = container.querySelector('#fill-inp');
  inp.focus();

  function check() {
    const val = inp.value.trim().toLowerCase();
    if (!val) return;
    const isCorrect = val === correct;
    inp.className = `text-input ${isCorrect ? 'correct' : 'wrong'}`;
    inp.disabled = true;
    container.querySelector('#check-btn').style.display = 'none';
    const fb = container.querySelector('#feedback');
    if (isCorrect) {
      fb.innerHTML = `✓ Correct — <em>${correct} ${vocab.es}</em>`;
      fb.className = 'feedback show correct';
    } else {
      const rule = ruleText(vocab.rule);
      fb.innerHTML = `✗ The answer is <em>${correct}</em> — ${rule}`;
      fb.className = 'feedback show wrong';
    }
    container.querySelector('#next-btn').style.display = 'inline-flex';
    onAnswer(isCorrect, question);
  }

  container.querySelector('#check-btn').addEventListener('click', check);
  inp.addEventListener('keydown', e => { if (e.key === 'Enter') check(); });
  container.querySelector('#next-btn').addEventListener('click', () => {
    container.dispatchEvent(new CustomEvent('game:next'));
  });
}

/* ════════════════════════════════════════════════════════════════════════════
   GAME 3: Matching Pairs — match Spanish word to English meaning
   ════════════════════════════════════════════════════════════════════════════ */

function gameMatching(container, question, onAnswer) {
  const { pairs } = question;
  let selected = null;
  let matched  = 0;
  const total  = pairs.length;

  const spShuffled = shuffle(pairs);
  const enShuffled = shuffle(pairs);

  container.innerHTML = `
    <div class="game-type-tag tag-vocab" style="margin-bottom:var(--space-3)">Matching</div>
    <div class="game-prompt" style="margin-bottom:var(--space-4)">Match each Spanish word to its English meaning</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-3);margin-bottom:var(--space-4)">
      <div id="col-sp" style="display:flex;flex-direction:column;gap:var(--space-2)"></div>
      <div id="col-en" style="display:flex;flex-direction:column;gap:var(--space-2)"></div>
    </div>
    <div class="feedback" id="feedback"></div>
    <button class="btn btn--primary" id="next-btn" style="display:none;margin-top:var(--space-3)">Next →</button>
  `;

  function makeBtn(text, key, side) {
    const btn = document.createElement('button');
    btn.className = 'option';
    btn.style.marginBottom = '0';
    btn.style.fontSize = 'var(--text-sm)';
    btn.dataset.key  = key;
    btn.dataset.side = side;
    btn.textContent  = text;
    btn.addEventListener('click', () => handleMatch(btn));
    return btn;
  }

  spShuffled.forEach(p => container.querySelector('#col-sp').appendChild(makeBtn(p.es, p.es, 'sp')));
  enShuffled.forEach(p => container.querySelector('#col-en').appendChild(makeBtn(p.en, p.es, 'en')));

  function handleMatch(btn) {
    if (btn.classList.contains('correct') || btn.classList.contains('matched')) return;
    if (!selected) {
      if (selected) selected.classList.remove('reveal');
      btn.classList.add('reveal');
      selected = btn;
      return;
    }
    if (selected === btn) {
      btn.classList.remove('reveal');
      selected = null;
      return;
    }
    if (selected.dataset.side === btn.dataset.side) {
      selected.classList.remove('reveal');
      btn.classList.add('reveal');
      selected = btn;
      return;
    }
    if (selected.dataset.key === btn.dataset.key) {
      selected.classList.remove('reveal');
      selected.classList.add('correct');
      btn.classList.add('correct');
      selected.disabled = true;
      btn.disabled = true;
      selected = null;
      matched++;
      if (matched === total) {
        const fb = container.querySelector('#feedback');
        fb.textContent = '✓ All matched!';
        fb.className = 'feedback show correct';
        container.querySelector('#next-btn').style.display = 'inline-flex';
        onAnswer(true, question);
      }
    } else {
      selected.classList.remove('reveal');
      selected.classList.add('wrong');
      btn.classList.add('wrong');
      const s = selected, b = btn;
      selected = null;
      setTimeout(() => { s.classList.remove('wrong'); b.classList.remove('wrong'); }, 600);
    }
  }

  container.querySelector('#next-btn').addEventListener('click', () => {
    container.dispatchEvent(new CustomEvent('game:next'));
  });
}

/* ════════════════════════════════════════════════════════════════════════════
   GAME 4: Plural Builder — given singular, choose correct plural
   ════════════════════════════════════════════════════════════════════════════ */

function gamePluralPicker(container, question, onAnswer) {
  const { vocab } = question;
  const correct = vocab.plural;

  /* Guard — if plural is missing, skip this question */
  if (!correct) { onAnswer(true, question); return; }

  /* generate a plausible wrong answer — inverted rule */
  const endsVowel = /[aeiouáéíóú]$/i.test(vocab.es);
  const wrong = endsVowel ? vocab.es + 'es' : vocab.es + 's';

  /* Avoid showing wrong === correct */
  if (wrong === correct) { onAnswer(true, question); return; }

  const opts = shuffle([correct, wrong]);

  /* Determine plural article — fall back to gender from definite article */
  let pluralArticle = 'los';
  if (vocab.gender === 'f') pluralArticle = 'las';
  else if (vocab.article === 'una' || vocab.indef === 'una') pluralArticle = 'las';

  const singularArticle = vocab.indef || vocab.article || '';

  container.innerHTML = `
    <div class="game-type-tag tag-grammar" style="margin-bottom:var(--space-3)">Plural form</div>
    <div class="game-prompt" style="margin-bottom:var(--space-4)">What is the plural of…</div>
    <div style="display:flex;align-items:baseline;gap:var(--space-2);margin-bottom:var(--space-2)">
      <span style="font-size:var(--text-sm);color:var(--text-muted)">${singularArticle}</span>
      <span class="es-large">${vocab.es}</span>
    </div>
    <div class="lesson-translation" style="margin-bottom:var(--space-5)">${vocab.en}</div>
    <div id="choices"></div>
    <div class="feedback" id="feedback"></div>
    <button class="btn btn--primary" id="next-btn" style="display:none;margin-top:var(--space-3)">Next →</button>
  `;

  const choicesEl = container.querySelector('#choices');

  opts.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'option';
    btn.style.fontFamily = 'var(--font-serif)';
    btn.style.fontSize   = 'var(--text-lg)';
    btn.textContent = `${pluralArticle} ${opt}`;
    btn.addEventListener('click', () => {
      const isCorrect = opt === correct;
      container.querySelectorAll('.option').forEach(b => {
        b.disabled = true;
        if (b.textContent === `${pluralArticle} ${correct}`) b.classList.add('correct');
        else if (b === btn && !isCorrect) b.classList.add('wrong');
      });
      const fb = container.querySelector('#feedback');
      if (isCorrect) {
        fb.innerHTML = `✓ Correct — <em>${pluralArticle} ${correct}</em>`;
        fb.className = 'feedback show correct';
      } else {
        const ruleKey = vocab.rule?.includes('cion') ? 'cion_plural'
          : pluralArticle === 'las' ? (endsVowel ? 'vowel_fem' : 'cons_fem')
          : (endsVowel ? 'vowel_masc' : 'cons_masc');
        fb.innerHTML = `✗ <em>${pluralArticle} ${correct}</em> — ${ruleText(ruleKey, PLURAL_RULES)}`;
        fb.className = 'feedback show wrong';
      }
      container.querySelector('#next-btn').style.display = 'inline-flex';
      onAnswer(isCorrect, question);
    });
    choicesEl.appendChild(btn);
  });

  container.querySelector('#next-btn').addEventListener('click', () => {
    container.dispatchEvent(new CustomEvent('game:next'));
  });
}

/* ════════════════════════════════════════════════════════════════════════════
   GAME 5: Adjective Agreement — choose correct adjective form
   ════════════════════════════════════════════════════════════════════════════ */

function gameAdjectiveAgreement(container, question, onAnswer) {
  const { noun, adjective } = question;

  function getForm(adj, gender, number) {
    let base = adj.endsO ? adj.es.slice(0,-1) : adj.es;
    let form;
    if (adj.endsO) {
      form = gender === 'f' ? base + 'a' : base + 'o';
    } else {
      form = base;
    }
    if (number === 'pl') {
      const endsVowel = /[aeiouáéíóú]$/i.test(form);
      form = endsVowel ? form + 's' : form + 'es';
    }
    return form;
  }

  const correctForm = getForm(adjective, noun.gender, noun.number || 'sg');
  const wrongForm   = adjective.endsO
    ? getForm(adjective, noun.gender === 'f' ? 'm' : 'f', noun.number || 'sg')
    : correctForm + (correctForm.endsWith('s') ? '' : 's');

  const article   = noun.gender === 'm' ? 'el' : 'la';
  const opts      = shuffle([correctForm, wrongForm]);

  container.innerHTML = `
    <div class="game-type-tag tag-grammar" style="margin-bottom:var(--space-3)">Adjective agreement</div>
    <div class="game-prompt" style="margin-bottom:var(--space-4)">Choose the correct adjective form</div>
    <div class="es-large" style="margin-bottom:var(--space-2)">${article} ${noun.es} ___</div>
    <div class="lesson-translation" style="margin-bottom:var(--space-5)">the ${noun.en} · ${adjective.en}</div>
    <div id="choices"></div>
    <div class="feedback" id="feedback"></div>
    <button class="btn btn--primary" id="next-btn" style="display:none;margin-top:var(--space-3)">Next →</button>
  `;

  const choicesEl = container.querySelector('#choices');
  opts.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'option';
    btn.style.fontFamily = 'var(--font-serif)';
    btn.style.fontSize   = 'var(--text-lg)';
    btn.textContent      = opt;
    btn.addEventListener('click', () => {
      const isCorrect = opt === correctForm;
      container.querySelectorAll('.option').forEach(b => {
        b.disabled = true;
        if (b.textContent === correctForm) b.classList.add('correct');
        else if (b === btn && !isCorrect) b.classList.add('wrong');
      });
      const fb = container.querySelector('#feedback');
      if (isCorrect) {
        fb.innerHTML = `✓ Correct — <em>${article} ${noun.es} ${correctForm}</em>`;
        fb.className = 'feedback show correct';
      } else {
        const rule = adjective.endsO ? ADJ_RULES.a_fem : ADJ_RULES.invariable;
        fb.innerHTML = `✗ <em>${article} ${noun.es} ${correctForm}</em> — ${rule}`;
        fb.className = 'feedback show wrong';
      }
      container.querySelector('#next-btn').style.display = 'inline-flex';
      onAnswer(isCorrect, question);
    });
    choicesEl.appendChild(btn);
  });

  container.querySelector('#next-btn').addEventListener('click', () => {
    container.dispatchEvent(new CustomEvent('game:next'));
  });
}

/* ════════════════════════════════════════════════════════════════════════════
   GAME 6: Translation Prompt — English → Spanish (article + noun)
   ════════════════════════════════════════════════════════════════════════════ */

function gameTranslation(container, question, onAnswer) {
  const { vocab } = question;
  if (vocab.article === 'el/la') { onAnswer(true, question); return; }

  /* Only show gender hint when the word is genuinely ambiguous —
     i.e. both a masculine and feminine form exist for the same concept.
     -ista and -nte words already skip this function (article === 'el/la').
     The remaining cases where a hint is useful: paired nouns like
     amigo/amiga, hermano/hermana, doctor/doctora, niño/niña, muchacho/muchacha.
     Everything else (luz, ciudad, libro, casa) has intrinsic gender — no hint needed. */
  const AMBIGUOUS_PAIRS = new Set([
    'amigo','amiga','hermano','hermana','doctor','doctora',
    'presidente','presidenta','gerente','cantante','estudiante',
  ]);
  const needsHint = AMBIGUOUS_PAIRS.has(vocab.es);
  const genderHint = needsHint
    ? (vocab.gender === 'm' ? ' (m)' : vocab.gender === 'f' ? ' (f)' : '')
    : '';
  const displayEn = vocab.en.includes('(m)') || vocab.en.includes('(f)')
    ? vocab.en
    : vocab.en + genderHint;

  container.innerHTML = `
    <div class="game-type-tag tag-vocab" style="margin-bottom:var(--space-3)">Translate</div>
    <div class="game-prompt" style="margin-bottom:var(--space-4)">Translate to Spanish (article + noun)</div>
    <div class="es-large" style="color:var(--color-cyan);margin-bottom:var(--space-5)">the ${displayEn}</div>
    <input class="text-input" id="trans-inp" placeholder="el/la + word…"
           autocomplete="off" autocorrect="off" spellcheck="false"
           style="margin-bottom:var(--space-3)" />
    <button class="btn btn--primary" id="check-btn">Check</button>
    <div class="feedback" id="feedback" style="margin-top:var(--space-3)"></div>
    <button class="btn btn--primary" id="next-btn" style="display:none;margin-top:var(--space-3)">Next →</button>
  `;

  const inp     = container.querySelector('#trans-inp');
  const correct = `${vocab.article} ${vocab.es}`;
  inp.focus();

  function check() {
    const val = inp.value.trim().toLowerCase();
    if (!val) return;
    const isCorrect = val === correct;
    inp.disabled = true;
    inp.className = `text-input ${isCorrect ? 'correct' : 'wrong'}`;
    container.querySelector('#check-btn').style.display = 'none';
    const fb = container.querySelector('#feedback');
    if (isCorrect) {
      fb.innerHTML = `✓ <em>${correct}</em> — ${vocab.en}`;
      fb.className = 'feedback show correct';
    } else {
      fb.innerHTML = `✗ The answer is <em>${correct}</em> — ${ruleText(vocab.rule)}`;
      fb.className = 'feedback show wrong';
    }
    container.querySelector('#next-btn').style.display = 'inline-flex';
    onAnswer(isCorrect, question);
  }

  container.querySelector('#check-btn').addEventListener('click', check);
  inp.addEventListener('keydown', e => { if (e.key === 'Enter') check(); });
  container.querySelector('#next-btn').addEventListener('click', () => {
    container.dispatchEvent(new CustomEvent('game:next'));
  });
}

/* ════════════════════════════════════════════════════════════════════════════
   GAME 7: Conjugation Picker — given pronoun, choose correct verb form
   Used for: estar, ser, and future verb chapters
   question: { pronoun, correctForm, verb, allForms: [{pronoun, form}] }
   ════════════════════════════════════════════════════════════════════════════ */

function gameConjugationPicker(container, question, onAnswer) {
  const { pronoun, correctForm, verb, en } = question;

  /* Build 3 plausible wrong answers from same verb's conjugation table */
  const others = question.allForms
    .filter(f => f.form !== correctForm)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3)
    .map(f => f.form);

  /* Deduplicate (estar: está appears for él/ella/Ud.) */
  const uniqueWrong = [...new Set(others)].slice(0, 3);
  const opts = shuffle([correctForm, ...uniqueWrong]);

  container.innerHTML = `
    <div class="game-type-tag tag-grammar" style="margin-bottom:var(--space-3)">Conjugation</div>
    <div class="game-prompt" style="margin-bottom:var(--space-4)">Choose the correct form of <em style="color:var(--color-purple)">${verb}</em></div>
    <div style="margin-bottom:var(--space-5)">
      <div style="font-family:var(--font-serif);font-size:var(--text-2xl);color:var(--color-amber);margin-bottom:var(--space-1)">${pronoun}</div>
      <div class="lesson-translation">${en}</div>
    </div>
    <div id="choices"></div>
    <div class="feedback" id="feedback"></div>
    <button class="btn btn--primary" id="next-btn" style="display:none;margin-top:var(--space-3)">Next →</button>
  `;

  const choicesEl = container.querySelector('#choices');
  opts.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'option';
    btn.style.fontFamily = 'var(--font-serif)';
    btn.style.fontSize   = 'var(--text-lg)';
    btn.textContent = opt;
    btn.dataset.isCorrect = opt === correctForm ? 'yes' : 'no';
    btn.addEventListener('click', () => {
      const isCorrect = btn.dataset.isCorrect === 'yes';
      container.querySelectorAll('.option').forEach(b => {
        b.disabled = true;
        if (b.dataset.isCorrect === 'yes') b.classList.add('correct');
        else if (b === btn && !isCorrect) b.classList.add('wrong');
      });
      const fb = container.querySelector('#feedback');
      if (isCorrect) {
        fb.innerHTML = `✓ <em>${pronoun} ${correctForm}</em> — ${en}`;
        fb.className = 'feedback show correct';
      } else {
        fb.innerHTML = `✗ <em>${pronoun} ${correctForm}</em> — ${en}`;
        fb.className = 'feedback show wrong';
      }
      container.querySelector('#next-btn').style.display = 'inline-flex';
      onAnswer(isCorrect, question);
    });
    choicesEl.appendChild(btn);
  });

  container.querySelector('#next-btn').addEventListener('click', () => {
    container.dispatchEvent(new CustomEvent('game:next'));
  });
}

/* ════════════════════════════════════════════════════════════════════════════
   GAME 8: Ser vs Estar — given a sentence context, choose ser or estar
   question: { sentence, verb ('ser'|'estar'), use, en }
   ════════════════════════════════════════════════════════════════════════════ */

function gameSerVsEstar(container, question, onAnswer) {
  const { sentence, verb, use, en } = question;

  /* Strip the verb out of the sentence for display — replace with blank */
  const verbForms = {
    estar: ['estoy','estás','está','estamos','estáis','están'],
    ser:   ['soy','eres','es','somos','sois','son'],
  };
  const allForms = [...verbForms.estar, ...verbForms.ser];
  let displaySentence = sentence;
  let foundForm = '';
  allForms.forEach(f => {
    if (sentence.includes(` ${f} `)) {
      displaySentence = sentence.replace(` ${f} `, ` ___ `);
      foundForm = f;
    } else if (sentence.startsWith(`${f.charAt(0).toUpperCase()}${f.slice(1)} `)) {
      displaySentence = sentence.replace(`${f.charAt(0).toUpperCase()}${f.slice(1)} `, `___ `);
      foundForm = f;
    }
  });

  const USE_LABELS = {
    location:    'Estar — location',
    health:      'Estar — health',
    mood:        'Estar — changing mood/condition',
    taste:       'Estar — taste/appearance',
    description: 'Ser — description',
    profession:  'Ser — profession',
    origin:      'Ser — origin',
    identification: 'Ser — identification',
    material:    'Ser — material',
    possession:  'Ser — possession',
    event:       'Ser — event location',
  };

  container.innerHTML = `
    <div class="game-type-tag tag-grammar" style="margin-bottom:var(--space-3);background:var(--color-purple-bg);color:var(--color-purple);border-color:var(--color-purple)">Ser vs Estar</div>
    <div class="game-prompt" style="margin-bottom:var(--space-4)">Which verb completes this sentence?</div>
    <div class="card" style="margin-bottom:var(--space-5)">
      <div style="font-family:var(--font-serif);font-size:var(--text-lg);color:var(--color-amber);margin-bottom:var(--space-2);line-height:1.4">${displaySentence}</div>
      <div class="lesson-translation">${en}</div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-3);margin-bottom:var(--space-4)" id="choices"></div>
    <div class="feedback" id="feedback"></div>
    <button class="btn btn--primary" id="next-btn" style="display:none;margin-top:var(--space-3)">Next →</button>
  `;

  const choicesEl = container.querySelector('#choices');
  ['ser', 'estar'].forEach(v => {
    const btn = document.createElement('button');
    btn.className = 'option';
    btn.style.textAlign = 'center';
    btn.style.fontFamily = 'var(--font-serif)';
    btn.style.fontSize = 'var(--text-xl)';
    btn.textContent = v;
    btn.dataset.isCorrect = v === verb ? 'yes' : 'no';
    btn.addEventListener('click', () => {
      const isCorrect = btn.dataset.isCorrect === 'yes';
      container.querySelectorAll('.option').forEach(b => {
        b.disabled = true;
        if (b.dataset.isCorrect === 'yes') b.classList.add('correct');
        else if (b === btn && !isCorrect) b.classList.add('wrong');
      });
      const fb = container.querySelector('#feedback');
      const label = USE_LABELS[use] || verb;
      if (isCorrect) {
        fb.innerHTML = `✓ <em>${verb}</em> — ${label}`;
        fb.className = 'feedback show correct';
      } else {
        fb.innerHTML = `✗ <em>${verb}</em> — ${label}`;
        fb.className = 'feedback show wrong';
      }
      container.querySelector('#next-btn').style.display = 'inline-flex';
      onAnswer(isCorrect, question);
    });
    choicesEl.appendChild(btn);
  });

  container.querySelector('#next-btn').addEventListener('click', () => {
    container.dispatchEvent(new CustomEvent('game:next'));
  });
}

/* ════════════════════════════════════════════════════════════════════════════
   GAME 9: Number Quiz — see a numeral, choose or type the Spanish word
   Three modes:
     'numeral-to-word'  — see "42", pick "cuarenta y dos" from 4 options
     'word-to-numeral'  — see "ochenta y cinco", pick "85" from 4 options
     'time-to-spanish'  — see "3:15", pick "Son las tres y cuarto"
   question: { mode, numeral, spanish, distractors: [string] }
   ════════════════════════════════════════════════════════════════════════════ */

function gameNumberQuiz(container, question, onAnswer) {
  const { mode, numeral, spanish, distractors } = question;

  const opts = shuffle([spanish, ...distractors.slice(0, 3)]);

  let promptLabel, promptValue, optionStyle;

  if (mode === 'numeral-to-word') {
    const isAdverb = !String(numeral).match(/^\d/);
    promptLabel = isAdverb ? 'What is the adverb form of this adjective?' : 'How do you say this number in Spanish?';
    promptValue = `<div style="font-family:var(--font-serif);font-size:clamp(1.8rem,8vw,3rem);color:var(--color-amber);line-height:1">${numeral}</div>`;
    optionStyle = 'font-family:var(--font-serif);font-size:var(--text-md)';
  } else if (mode === 'word-to-numeral') {
    promptLabel = 'Which numeral matches this Spanish number?';
    promptValue = `<div style="font-family:var(--font-serif);font-size:var(--text-2xl);color:var(--color-amber)">${spanish}</div>`;
    optionStyle = 'font-family:var(--font-serif);font-size:var(--text-xl)';
  } else {
    /* time-to-spanish */
    promptLabel = 'How do you say this time in Spanish?';
    promptValue = `<div style="font-family:var(--font-serif);font-size:clamp(2rem,8vw,3.5rem);color:var(--color-amber);line-height:1">${numeral}</div>`;
    optionStyle = 'font-family:var(--font-serif);font-size:var(--text-sm)';
  }

  container.innerHTML = `
    <div class="game-type-tag tag-grammar" style="margin-bottom:var(--space-3);background:var(--color-cyan-bg);color:var(--color-cyan);border-color:var(--color-cyan)">Numbers</div>
    <div class="game-prompt" style="margin-bottom:var(--space-5)">${promptLabel}</div>
    <div style="text-align:center;margin-bottom:var(--space-6);padding:var(--space-5);background:var(--bg-panel);border-radius:var(--radius-md)">
      ${promptValue}
    </div>
    <div id="choices"></div>
    <div class="feedback" id="feedback"></div>
    <button class="btn btn--primary" id="next-btn" style="display:none;margin-top:var(--space-3)">Next →</button>
  `;

  const choicesEl = container.querySelector('#choices');
  opts.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'option';
    btn.style.cssText = optionStyle;
    btn.textContent = opt;
    btn.dataset.isCorrect = opt === spanish ? 'yes' : 'no';
    btn.addEventListener('click', () => {
      const isCorrect = btn.dataset.isCorrect === 'yes';
      container.querySelectorAll('.option').forEach(b => {
        b.disabled = true;
        if (b.dataset.isCorrect === 'yes') b.classList.add('correct');
        else if (b === btn && !isCorrect) b.classList.add('wrong');
      });
      const fb = container.querySelector('#feedback');
      if (isCorrect) {
        fb.innerHTML = `✓ <em>${mode === 'word-to-numeral' ? numeral : spanish}</em>`;
        fb.className = 'feedback show correct';
      } else {
        fb.innerHTML = `✗ ${numeral} → <em>${spanish}</em>`;
        fb.className = 'feedback show wrong';
      }
      container.querySelector('#next-btn').style.display = 'inline-flex';
      onAnswer(isCorrect, question);
    });
    choicesEl.appendChild(btn);
  });

  container.querySelector('#next-btn').addEventListener('click', () => {
    container.dispatchEvent(new CustomEvent('game:next'));
  });
}

/* ════════════════════════════════════════════════════════════════════════════
   GAME 10: Sentence Completion — fill blanks in a real sentence
   question: {
     sentence: 'Julia es ___ fuerte ___ Juan.',   — underscores mark blanks
     answer: 'más...que',                          — the correct choice label
     choices: ['más...que','menos...que','tan...como','el más...de'],
     fills: ['más','que'],                         — what goes in each blank
     en: 'Julia is stronger than Juan.',
     rule: 'Use más...que for more than comparisons'
   }
   ════════════════════════════════════════════════════════════════════════════ */

function gameSentenceCompletion(container, question, onAnswer) {
  const { sentence, answer, choices, fills, en, rule } = question;

  /* Build display sentence with styled blanks */
  let displaySentence = sentence;
  (fills || [answer]).forEach(fill => {
    displaySentence = displaySentence.replace('___',
      `<span style="display:inline-block;min-width:60px;border-bottom:2px solid var(--color-amber);color:var(--color-amber);text-align:center;font-family:var(--font-serif);padding:0 4px">___</span>`);
  });

  container.innerHTML = `
    <div class="game-type-tag tag-grammar" style="margin-bottom:var(--space-3);background:var(--color-cyan-bg);color:var(--color-cyan);border-color:var(--color-cyan)">Complete the sentence</div>
    <div class="game-prompt" style="margin-bottom:var(--space-4)">Choose the correct option to complete the sentence</div>
    <div class="card" style="margin-bottom:var(--space-5)">
      <div style="font-family:var(--font-serif);font-size:var(--text-lg);color:var(--color-amber);margin-bottom:var(--space-2);line-height:1.6">${sentence.replace(/___/g, '<span style="display:inline-block;min-width:50px;border-bottom:2px solid var(--color-cyan);color:var(--color-cyan);text-align:center;padding:0 4px">___</span>')}</div>
      <div class="lesson-translation">${en}</div>
    </div>
    <div id="choices" style="display:flex;flex-direction:column;gap:var(--space-2)"></div>
    <div class="feedback" id="feedback"></div>
    <button class="btn btn--primary" id="next-btn" style="display:none;margin-top:var(--space-3)">Next →</button>
  `;

  const choicesEl = container.querySelector('#choices');
  choices.forEach(choice => {
    const btn = document.createElement('button');
    btn.className = 'option';
    btn.style.fontFamily = 'var(--font-serif)';
    btn.style.fontSize = 'var(--text-md)';
    btn.style.textAlign = 'left';
    btn.textContent = choice;
    btn.dataset.isCorrect = choice === answer ? 'yes' : 'no';
    btn.addEventListener('click', () => {
      const isCorrect = btn.dataset.isCorrect === 'yes';
      container.querySelectorAll('.option').forEach(b => {
        b.disabled = true;
        if (b.dataset.isCorrect === 'yes') b.classList.add('correct');
        else if (b === btn && !isCorrect) b.classList.add('wrong');
      });

      /* Show completed sentence */
      const completed = fills
        ? fills.reduce((s, f) => s.replace('___', `<em style="color:var(--color-green)">${f}</em>`), sentence)
        : sentence.replace(/___/g, `<em style="color:var(--color-green)">${answer}</em>`);

      const fb = container.querySelector('#feedback');
      if (isCorrect) {
        fb.innerHTML = `✓ ${completed}${rule ? `<div style="font-size:var(--text-xs);color:var(--color-cyan);margin-top:6px;font-style:italic">${rule}</div>` : ''}`;
        fb.className = 'feedback show correct';
      } else {
        fb.innerHTML = `✗ ${completed}${rule ? `<div style="font-size:var(--text-xs);color:var(--color-cyan);margin-top:6px;font-style:italic">${rule}</div>` : ''}`;
        fb.className = 'feedback show wrong';
      }
      container.querySelector('#next-btn').style.display = 'inline-flex';
      onAnswer(isCorrect, question);
    });
    choicesEl.appendChild(btn);
  });

  container.querySelector('#next-btn').addEventListener('click', () => {
    container.dispatchEvent(new CustomEvent('game:next'));
  });
}

/* ── Exports ── */

export {
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
};


