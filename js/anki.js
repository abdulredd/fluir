/* ─── Fluir · Anki Export ───────────────────────────────────────────────────
   Generates a valid Anki .apkg file entirely in the browser.
   .apkg format = ZIP containing:
     collection.anki2  — SQLite database with cards, notes, decks
     media             — JSON mapping of media files (empty for us)

   Uses sql.js (SQLite compiled to WebAssembly) for the database layer
   and JSZip for the ZIP layer.
   ─────────────────────────────────────────────────────────────────────────── */

import Store from './store.js';
import CHAPTER_1  from './data/chapter1.js';
import CHAPTER_2  from './data/chapter2.js';
import CHAPTER_3  from './data/chapter3.js';
import CHAPTER_4  from './data/chapter4.js';
import CHAPTER_5  from './data/chapter5.js';
import CHAPTER_6  from './data/chapter6.js';
import CHAPTER_7  from './data/chapter7.js';
import CHAPTER_8  from './data/chapter8.js';
import CHAPTER_9  from './data/chapter9.js';
import CHAPTER_10 from './data/chapter10.js';
import CHAPTER_11 from './data/chapter11.js';
import CHAPTER_12 from './data/chapter12.js';
import CHAPTER_13 from './data/chapter13.js';
import CHAPTER_14 from './data/chapter14.js';
import CHAPTER_15 from './data/chapter15.js';

const CHAPTERS = {
  1: CHAPTER_1,   2: CHAPTER_2,   3: CHAPTER_3,   4: CHAPTER_4,   5: CHAPTER_5,
  6: CHAPTER_6,   7: CHAPTER_7,   8: CHAPTER_8,   9: CHAPTER_9,   10: CHAPTER_10,
  11: CHAPTER_11, 12: CHAPTER_12, 13: CHAPTER_13, 14: CHAPTER_14, 15: CHAPTER_15,
};

const VOCAB_KEYS = [
  'vocabulary', 'adjectives', 'verbs', 'idioms', 'tenerExpressions', 'hacerExpressions',
  'locationPrepositions', 'porExpressions', 'becomeExpressions', 'movementVerbs',
  'reciprocalVerbs', 'impersonalExpressions', 'emotionVerbs', 'commandVerbs', 'conjunctions',
  'readingVocab',
];

/* ── sql.js and JSZip are loaded via CDN script tags in index.html ── */

/* ════════════════════════════════════════════════════════════════════════════
   Normalize a raw item from any vocab array into a consistent card shape
   ════════════════════════════════════════════════════════════════════════════ */

function normalizeItem(raw, chapterId, arrayKey) {
  /* Verbs use `infinitive` as the Spanish term */
  const es = raw.es || raw.infinitive || '';
  /* Generate a stable id if the item doesn't have one */
  const id = raw.id || `${chapterId}_${arrayKey}_${es.replace(/\s+/g, '_')}`;
  return {
    id,
    es,
    en:         raw.en || '',
    article:    raw.article || '',
    gender:     raw.gender  || 'n',
    plural:     raw.plural  || '',
    ex:         raw.ex      || raw.example || '',
    exEn:       raw.exEn    || '',
    rule:       raw.rule    || '',
    arrayKey,
    chapterId,
  };
}

/* ════════════════════════════════════════════════════════════════════════════
   Main export function
   Called from settings.js with a scope object: { chapterIds: [1,2,...] | 'all' }
   ════════════════════════════════════════════════════════════════════════════ */

async function exportToAnki(scope = { chapterIds: 'all' }) {
  const queue = Store.getAnkiQueue();

  const chapterIds = scope.chapterIds === 'all'
    ? Object.keys(CHAPTERS).map(Number)
    : scope.chapterIds;

  /* Gather all vocab items to export */
  const allCards = [];

  chapterIds.forEach(cid => {
    const chapter = CHAPTERS[cid];
    if (!chapter) return;
    chapter.sublessons.forEach(sl => {
      VOCAB_KEYS.forEach(key => {
        const arr = sl[key];
        if (!arr?.length) return;
        arr.forEach(raw => {
          const card = normalizeItem(raw, cid, key);
          if (!card.es) return; /* skip items with no Spanish term */
          if (queue.pending.includes(card.id) || scope.forceAll) {
            allCards.push({ ...card, chapterTitle: chapter.title });
          }
        });
      });
    });
  });

  if (allCards.length === 0) {
    return { success: false, reason: 'no_cards' };
  }

  try {
    const apkgBlob = await buildApkg(allCards, chapterIds);
    triggerDownload(apkgBlob, `Fluir-Chapter${chapterIds.join('-')}.apkg`);

    /* Mark exported */
    Store.markAnkiExported(allCards.map(c => c.id));

    return { success: true, count: allCards.length };
  } catch (err) {
    console.error('[Anki] Export failed:', err);
    return { success: false, reason: err.message };
  }
}

/* ════════════════════════════════════════════════════════════════════════════
   Build the .apkg blob
   ════════════════════════════════════════════════════════════════════════════ */

async function buildApkg(cards, chapterIds) {
  /* ── Init sql.js ── */
  const SQL    = await initSqlJs({ locateFile: f => `/js/vendor/${f}` });
  const db     = new SQL.Database();

  /* ── Create Anki schema ── */
  createSchema(db);

  /* ── IDs — Anki uses Unix timestamps in ms as IDs ── */
  const now      = Date.now();
  const deckId   = now;
  const modelId  = now + 1;
  const colId    = 1;

  /* ── Insert collection (col) ── */
  const deckName = chapterIds.length === 1
    ? `Fluir::Chapter ${chapterIds[0]}`
    : `Fluir::Chapters ${chapterIds.join(', ')}`;

  const decksJson  = buildDecksJson(deckId, deckName, now);
  const modelsJson = buildModelsJson(modelId, now);
  const confJson   = buildConfJson(deckId);

  db.run(`INSERT INTO col VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`, [
    colId, now, now, now, 11, 0, 0, 0,
    confJson, modelsJson, decksJson, '{}', '[]',
  ]);

  /* ── Insert notes and cards ── */
  cards.forEach((card, i) => {
    const noteId  = now + 100 + i;
    const cardId  = now + 200 + i;
    const front   = buildFront(card);
    const back    = buildBack(card);
    const sfld    = card.es || '';
    const fields  = `${front}\x1f${back}`;
    const tags    = buildTags(card);

    db.run(`INSERT INTO notes VALUES (?,?,?,?,?,?,?,?,?,?,?)`, [
      noteId, guid(noteId), modelId, now, -1, tags, fields, sfld, 0, 0, '',
    ]);

    db.run(`INSERT INTO cards VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`, [
      cardId, noteId, deckId, 0, now, -1, 0, 0, 0, 0, 2500, 0, 0, 0, 0, 0, 0, '',
    ]);
  });

  /* ── Export database to binary ── */
  const dbBytes = db.export();
  db.close();

  /* ── Package into ZIP (.apkg) ── */
  const zip = new JSZip();
  zip.file('collection.anki2', dbBytes);
  zip.file('media', '{}');

  return await zip.generateAsync({ type: 'blob', mimeType: 'application/zip' });
}

/* ════════════════════════════════════════════════════════════════════════════
   Card content builders
   ════════════════════════════════════════════════════════════════════════════ */

function buildFront(card) {
  const isVerb = card.arrayKey === 'verbs' || card.arrayKey === 'movementVerbs' ||
                 card.arrayKey === 'reciprocalVerbs' || card.arrayKey === 'emotionVerbs' ||
                 card.arrayKey === 'commandVerbs' || card.arrayKey === 'readingVocab';
  const article = card.article && card.article !== 'el/la' ? card.article + ' ' : '';
  const gender  = card.gender === 'm' ? 'masculine' : card.gender === 'f' ? 'feminine' : '';

  return `<div style="text-align:center;font-family:Georgia,serif;font-size:2em;color:#e5c07b">${article}${card.es}</div>${gender && !isVerb ? `<div style="text-align:center;font-size:0.8em;color:#5c6370;margin-top:6px">${gender}</div>` : ''}`;
}

function buildBack(card) {
  const article  = card.article && card.article !== 'el/la' ? card.article + ' ' : '';
  const plural   = card.plural ? `<div style="font-size:0.8em;color:#5c6370;margin-top:4px">plural: ${card.gender === 'm' ? 'los' : 'las'} ${card.plural}</div>` : '';
  const example  = card.ex ? `
    <div style="margin:10px 0;padding:8px 10px;background:#181a1f;border-radius:5px;text-align:left">
      <div style="font-family:Georgia,serif;font-size:0.95em;color:#e5c07b">${card.ex}</div>
      <div style="font-size:0.75em;color:#5c6370;margin-top:3px">${card.exEn || ''}</div>
    </div>` : '';
  const ruleMap = {
    ends_o: 'Ends in -o → masculine', ends_a: 'Ends in -a → feminine',
    ends_cion: 'Ends in -ción → feminine', ends_sion: 'Ends in -sión → feminine',
    ends_dad: 'Ends in -dad → feminine', ends_tad: 'Ends in -tad → feminine',
    ends_tud: 'Ends in -tud → feminine', masc_a_excep: 'Exception: ends in -a but masculine',
    fem_o_excep: 'Exception: ends in -o but feminine',
    masc_irreg: 'Irregular masculine — memorize with article',
    fem_irreg: 'Irregular feminine — memorize with article',
    ista_gender: 'Ends in -ista — article shows gender',
    nte_gender: 'Ends in -nte — article shows gender',
  };
  const ruleNote = ruleMap[card.rule] ? `<div style="font-size:0.75em;color:#56b6c2;margin-top:8px;font-style:italic">${ruleMap[card.rule]}</div>` : '';

  return `<div style="text-align:center">
    <div style="font-family:Georgia,serif;font-size:1.8em;color:#e5c07b">${article}${card.es}</div>
    <div style="font-size:1.1em;color:#abb2bf;margin-top:6px">${card.en}</div>
    ${plural}
    ${example}
    ${ruleNote}
    <div style="font-size:0.7em;color:#3e4451;margin-top:10px">Fluir · Chapter ${card.chapterId}</div>
  </div>`;
}

function buildTags(card) {
  const tags = [`fluir`, `chapter${card.chapterId}`, card.arrayKey];
  if (card.gender === 'm') tags.push('masculine');
  if (card.gender === 'f') tags.push('feminine');
  if (card.rule)           tags.push(card.rule.replace(/_/g, '-'));
  return ' ' + tags.join(' ') + ' ';
}

/* ════════════════════════════════════════════════════════════════════════════
   Anki schema — minimal valid collection.anki2 schema
   ════════════════════════════════════════════════════════════════════════════ */

function createSchema(db) {
  db.run(`CREATE TABLE IF NOT EXISTS col (
    id INTEGER PRIMARY KEY, crt INTEGER NOT NULL, mod INTEGER NOT NULL,
    scm INTEGER NOT NULL, ver INTEGER NOT NULL, dty INTEGER NOT NULL,
    usn INTEGER NOT NULL, ls INTEGER NOT NULL, conf TEXT NOT NULL,
    models TEXT NOT NULL, decks TEXT NOT NULL, dconf TEXT NOT NULL, tags TEXT NOT NULL
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS notes (
    id INTEGER PRIMARY KEY, guid TEXT NOT NULL, mid INTEGER NOT NULL,
    mod INTEGER NOT NULL, usn INTEGER NOT NULL, tags TEXT NOT NULL,
    flds TEXT NOT NULL, sfld INTEGER NOT NULL, csum INTEGER NOT NULL,
    flags INTEGER NOT NULL, data TEXT NOT NULL
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS cards (
    id INTEGER PRIMARY KEY, nid INTEGER NOT NULL, did INTEGER NOT NULL,
    ord INTEGER NOT NULL, mod INTEGER NOT NULL, usn INTEGER NOT NULL,
    type INTEGER NOT NULL, queue INTEGER NOT NULL, due INTEGER NOT NULL,
    ivl INTEGER NOT NULL, factor INTEGER NOT NULL, reps INTEGER NOT NULL,
    lapses INTEGER NOT NULL, left INTEGER NOT NULL, odue INTEGER NOT NULL,
    odid INTEGER NOT NULL, flags INTEGER NOT NULL, data TEXT NOT NULL
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS revlog (
    id INTEGER PRIMARY KEY, cid INTEGER NOT NULL, usn INTEGER NOT NULL,
    ease INTEGER NOT NULL, ivl INTEGER NOT NULL, lastIvl INTEGER NOT NULL,
    factor INTEGER NOT NULL, time INTEGER NOT NULL, type INTEGER NOT NULL
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS graves (usn INTEGER NOT NULL, oid INTEGER NOT NULL, type INTEGER NOT NULL)`);
  db.run(`CREATE INDEX IF NOT EXISTS ix_notes_usn ON notes (usn)`);
  db.run(`CREATE INDEX IF NOT EXISTS ix_cards_usn ON cards (usn)`);
  db.run(`CREATE INDEX IF NOT EXISTS ix_cards_nid ON cards (nid)`);
  db.run(`CREATE INDEX IF NOT EXISTS ix_cards_sched ON cards (did, queue, due)`);
  db.run(`CREATE INDEX IF NOT EXISTS ix_revlog_usn ON revlog (usn)`);
  db.run(`CREATE INDEX IF NOT EXISTS ix_revlog_cid ON revlog (cid)`);
}

/* ── JSON builders for Anki col fields ── */

function buildDecksJson(deckId, deckName, now) {
  return JSON.stringify({
    [deckId]: {
      id: deckId, name: deckName, desc: 'Generated by Fluir',
      mod: Math.floor(now / 1000), usn: -1,
      collapsed: false, browserCollapsed: false,
      newToday: [0, 0], revToday: [0, 0], lrnToday: [0, 0],
      timeToday: [0, 0], dyn: 0, conf: 1, extendNew: 10, extendRev: 50,
    }
  });
}

function buildModelsJson(modelId, now) {
  return JSON.stringify({
    [modelId]: {
      id: modelId, name: 'Fluir Basic', type: 0,
      mod: Math.floor(now / 1000), usn: -1,
      sortf: 0, did: null, tmpls: [{
        name: 'Card 1', ord: 0,
        qfmt: '{{Front}}',
        afmt: '{{FrontSide}}<hr id="answer">{{Back}}',
        bqfmt: '', bafmt: '', did: null, bfont: '', bsize: 0,
      }],
      flds: [
        { name: 'Front', ord: 0, sticky: false, rtl: false, font: 'Arial', size: 20, media: [] },
        { name: 'Back',  ord: 1, sticky: false, rtl: false, font: 'Arial', size: 20, media: [] },
      ],
      css: `.card { font-family: arial; font-size: 20px; text-align: center; color: #abb2bf; background-color: #282c34; } .card1 { background-color: #21252b; }`,
      latexPre:  '\\documentclass[12pt]{article}\n\\special{papersize=3in,5in}\n\\usepackage[utf8]{inputenc}\n\\usepackage{amssymb,amsmath}\n\\pagestyle{empty}\n\\setlength{\\parindent}{0in}\n\\begin{document}\n',
      latexPost: '\\end{document}',
      tags: [], vers: [],
    }
  });
}

function buildConfJson(deckId) {
  return JSON.stringify({
    nextPos: 1, estTimes: true, activeDecks: [deckId],
    sortType: 'noteFld', timeLim: 0, sortBackwards: false,
    addToCur: true, curDeck: deckId, newBury: true,
    newSpread: 0, dueCounts: true, curModel: null, collapseTime: 1200,
  });
}

/* ── GUID generator for Anki notes ── */

function guid(id) {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result  = '';
  let n       = Math.abs(id);
  while (n > 0) { result = chars[n % chars.length] + result; n = Math.floor(n / chars.length); }
  return result || 'fluir0';
}

/* ── Trigger browser download ── */

function triggerDownload(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a   = document.createElement('a');
  a.href    = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 5000);
}

export { exportToAnki };
