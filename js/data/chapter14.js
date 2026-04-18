/* ─── Fluir · Chapter 14 Data ───────────────────────────────────────────────
   Source: Complete Spanish Step-by-Step, Bregstein (McGraw-Hill)
   Chapter 14: The Preterit Tense
   4 sub-lessons (Option C):
     14-1  Regular preterit — -ar, -er, -ir
     14-2  Spelling changes — -ar (g/c/z) and -er/-ir (i→y, -uir)
     14-3  Irregular preterit — all 17 verbs grouped by stem type
     14-4  -ir stem changes in 3rd person + compound verbs + mixed drill
   ─────────────────────────────────────────────────────────────────────────── */

/* ════════════════════════════════════════════════════════════════════════════
   SUB-LESSON 14-1 — Regular Preterit
   ════════════════════════════════════════════════════════════════════════════ */

const SUBLESSON_14_1 = {
  id: '14-1',
  chapterId: 14,
  title: 'Regular Preterit',
  subtitle: '-é/-aste/-ó · -í/-iste/-ió · completed past actions',

  rules: [
    {
      id: 'r1',
      heading: 'The preterit expresses completed past actions',
      body: 'The preterit tense (pretérito) is used for actions completed in the past, a series of completed actions, or conditions no longer in effect. The English translation is usually the simple past (I sang, she ate, they lived).',
      examples: [
        { es: 'Ella cantó una canción anoche.',    en: 'She sang a song last night.' },
        { es: 'Comimos en un restaurante ayer.',   en: 'We ate at a restaurant yesterday.' },
        { es: 'Él vivió en España por dos años.',  en: 'He lived in Spain for two years.' },
      ],
      tip: 'Key time words that signal the preterit: ayer (yesterday), anoche (last night), la semana pasada (last week), el año pasado (last year), hace + time (ago).',
    },
    {
      id: 'r2',
      heading: '-ar preterit endings: -é, -aste, -ó, -amos, -asteis, -aron',
      body: 'Drop the -ar and add the endings. Note the accent marks on yo (-é) and él/ella (-ó). The nosotros form is identical to the present tense for -ar verbs.',
      examples: [
        { es: 'yo canté',          en: 'I sang' },
        { es: 'tú cantaste',       en: 'you sang' },
        { es: 'él/ella cantó',     en: 'he/she sang' },
        { es: 'nosotros cantamos', en: 'we sang (same as present)' },
        { es: 'ellos cantaron',    en: 'they sang' },
      ],
    },
    {
      id: 'r3',
      heading: '-er/-ir preterit endings: -í, -iste, -ió, -imos, -isteis, -ieron',
      body: '-er and -ir verbs share the same preterit endings. The accent marks fall on yo (-í) and él/ella (-ió).',
      examples: [
        { es: 'yo comí',           en: 'I ate' },
        { es: 'tú comiste',        en: 'you ate' },
        { es: 'él/ella comió',     en: 'he/she ate' },
        { es: 'nosotros comimos',  en: 'we ate' },
        { es: 'ellos comieron',    en: 'they ate' },
      ],
      tip: 'The nosotros form for -er/-ir verbs in the preterit is the same as the present tense (comemos/comimos differ only in the -i-). Context or time words clarify which tense is meant.',
    },
  ],

  verbs: [
    /* Regular -ar */
    { infinitive:'ayudar',    en:'to help',      stem:'ayud',    type:'ar',
      forms:{ yo:'ayudé',     tu:'ayudaste',     el:'ayudó',     nos:'ayudamos',   ellos:'ayudaron'   },
      ex:'Ella me ayudó con la tarea ayer.',         exEn:'She helped me with the homework yesterday.' },
    { infinitive:'bailar',    en:'to dance',     stem:'bail',    type:'ar',
      forms:{ yo:'bailé',     tu:'bailaste',     el:'bailó',     nos:'bailamos',   ellos:'bailaron'   },
      ex:'Bailamos toda la noche en la fiesta.',     exEn:'We danced all night at the party.' },
    { infinitive:'caminar',   en:'to walk',      stem:'camin',   type:'ar',
      forms:{ yo:'caminé',    tu:'caminaste',    el:'caminó',    nos:'caminamos',  ellos:'caminaron'  },
      ex:'Caminé al trabajo esta mañana.',           exEn:'I walked to work this morning.' },
    { infinitive:'cantar',    en:'to sing',      stem:'cant',    type:'ar',
      forms:{ yo:'canté',     tu:'cantaste',     el:'cantó',     nos:'cantamos',   ellos:'cantaron'   },
      ex:'Ella cantó una canción triste anoche.',    exEn:'She sang a sad song last night.' },
    { infinitive:'comprar',   en:'to buy',       stem:'compr',   type:'ar',
      forms:{ yo:'compré',    tu:'compraste',    el:'compró',    nos:'compramos',  ellos:'compraron'  },
      ex:'Compramos la casa el año pasado.',         exEn:'We bought the house last year.' },
    { infinitive:'escuchar',  en:'to listen to', stem:'escuch',  type:'ar',
      forms:{ yo:'escuché',   tu:'escuchaste',   el:'escuchó',   nos:'escuchamos', ellos:'escucharon' },
      ex:'Escuché la música a las ocho anoche.',     exEn:'I listened to music at eight last night.' },
    { infinitive:'hablar',    en:'to speak',     stem:'habl',    type:'ar',
      forms:{ yo:'hablé',     tu:'hablaste',     el:'habló',     nos:'hablamos',   ellos:'hablaron'   },
      ex:'Hablamos con los turistas ayer.',          exEn:'We spoke with the tourists yesterday.' },
    { infinitive:'trabajar',  en:'to work',      stem:'trabaj',  type:'ar',
      forms:{ yo:'trabajé',   tu:'trabajaste',   el:'trabajó',   nos:'trabajamos', ellos:'trabajaron' },
      ex:'Él trabajó todo el día ayer.',             exEn:'He worked all day yesterday.' },
    { infinitive:'viajar',    en:'to travel',    stem:'viaj',    type:'ar',
      forms:{ yo:'viajé',     tu:'viajaste',     el:'viajó',     nos:'viajamos',   ellos:'viajaron'   },
      ex:'Viajamos a España el verano pasado.',      exEn:'We traveled to Spain last summer.' },
    /* Regular -er */
    { infinitive:'aprender',  en:'to learn',     stem:'aprend',  type:'er',
      forms:{ yo:'aprendí',   tu:'aprendiste',   el:'aprendió',  nos:'aprendimos', ellos:'aprendieron'},
      ex:'Aprendí mucho en esa clase.',              exEn:'I learned a lot in that class.' },
    { infinitive:'beber',     en:'to drink',     stem:'beb',     type:'er',
      forms:{ yo:'bebí',      tu:'bebiste',      el:'bebió',     nos:'bebimos',    ellos:'bebieron'   },
      ex:'Bebimos café con leche esta mañana.',      exEn:'We drank café con leche this morning.' },
    { infinitive:'comer',     en:'to eat',       stem:'com',     type:'er',
      forms:{ yo:'comí',      tu:'comiste',      el:'comió',     nos:'comimos',    ellos:'comieron'   },
      ex:'Comimos en un restaurante ayer.',          exEn:'We ate at a restaurant yesterday.' },
    { infinitive:'correr',    en:'to run',       stem:'corr',    type:'er',
      forms:{ yo:'corrí',     tu:'corriste',     el:'corrió',    nos:'corrimos',   ellos:'corrieron'  },
      ex:'Corrí cinco kilómetros esta mañana.',      exEn:'I ran five kilometers this morning.' },
    { infinitive:'vender',    en:'to sell',      stem:'vend',    type:'er',
      forms:{ yo:'vendí',     tu:'vendiste',     el:'vendió',    nos:'vendimos',   ellos:'vendieron'  },
      ex:'Él vendió su carro la semana pasada.',     exEn:'He sold his car last week.' },
    /* Regular -ir */
    { infinitive:'abrir',     en:'to open',      stem:'abr',     type:'ir',
      forms:{ yo:'abrí',      tu:'abriste',      el:'abrió',     nos:'abrimos',    ellos:'abrieron'   },
      ex:'Abrí la ventana esta mañana.',             exEn:'I opened the window this morning.' },
    { infinitive:'escribir',  en:'to write',     stem:'escrib',  type:'ir',
      forms:{ yo:'escribí',   tu:'escribiste',   el:'escribió',  nos:'escribimos', ellos:'escribieron'},
      ex:'Escribí una carta a mi familia ayer.',     exEn:'I wrote a letter to my family yesterday.' },
    { infinitive:'recibir',   en:'to receive',   stem:'recib',   type:'ir',
      forms:{ yo:'recibí',    tu:'recibiste',    el:'recibió',   nos:'recibimos',  ellos:'recibieron' },
      ex:'Recibimos buenas noticias ayer.',          exEn:'We received good news yesterday.' },
    { infinitive:'vivir',     en:'to live',      stem:'viv',     type:'ir',
      forms:{ yo:'viví',      tu:'viviste',      el:'vivió',     nos:'vivimos',    ellos:'vivieron'   },
      ex:'Él vivió en España por dos años.',         exEn:'He lived in Spain for two years.' },
  ],

  timeExpressions: [
    { es:'ayer',              en:'yesterday' },
    { es:'anoche',            en:'last night' },
    { es:'la semana pasada',  en:'last week' },
    { es:'el año pasado',     en:'last year' },
    { es:'el mes pasado',     en:'last month' },
    { es:'hace + tiempo',     en:'ago (hace dos días = two days ago)' },
    { es:'anteayer',          en:'the day before yesterday' },
    { es:'esta mañana',       en:'this morning' },
    { es:'ayer por la mañana',en:'yesterday morning' },
  ],
};

/* ════════════════════════════════════════════════════════════════════════════
   SUB-LESSON 14-2 — Spelling Changes in the Preterit
   ════════════════════════════════════════════════════════════════════════════ */

const SUBLESSON_14_2 = {
  id: '14-2',
  chapterId: 14,
  title: 'Spelling Changes in the Preterit',
  subtitle: 'llegué · busqué · empecé · leyó · construyó',

  rules: [
    {
      id: 'r1',
      heading: '-ar verbs: spelling changes in yo form only',
      body: 'To preserve the sound of the infinitive stem, -ar verbs ending in -gar, -car, -zar change their spelling in the yo preterit form only. All other forms are regular.',
      examples: [
        { es: 'llegar → yo llegué (g→gu)',     en: 'I arrived', note: 'all others regular: llegaste, llegó…' },
        { es: 'buscar → yo busqué (c→qu)',     en: 'I looked for' },
        { es: 'empezar → yo empecé (z→c)',     en: 'I began' },
        { es: 'tocar → yo toqué (c→qu)',       en: 'I played/touched' },
        { es: 'pagar → yo pagué (g→gu)',       en: 'I paid' },
      ],
      tip: 'Only yo changes — tú llegaste, él llegó, nosotros llegamos are all regular.',
    },
    {
      id: 'r2',
      heading: '-er/-ir verbs: i→y in 3rd person when vowel precedes ending',
      body: 'When the stem ends in a vowel, the -ió and -ieron endings change to -yó and -yeron to avoid three vowels in a row. Written accents appear on yo, tú, nosotros, vosotros forms.',
      examples: [
        { es: 'leer: leyó, leyeron (leió → leyó)', en: 'he read, they read' },
        { es: 'caer: cayó, cayeron',               en: 'he fell, they fell' },
        { es: 'oír: oyó, oyeron',                  en: 'he heard, they heard' },
        { es: 'construir: construyó, construyeron', en: 'he built, they built (-uir verbs)' },
      ],
    },
  ],

  arSpellingChanges: [
    { infinitive:'llegar',    en:'to arrive',          change:'g→gu', yo:'llegué',   others:'llegaste/llegó/llegamos/llegaron',
      forms:{ yo:'llegué',    tu:'llegaste',    el:'llegó',    nos:'llegamos',   ellos:'llegaron'   } },
    { infinitive:'buscar',    en:'to look for',        change:'c→qu', yo:'busqué',   others:'buscaste/buscó/buscamos/buscaron',
      forms:{ yo:'busqué',    tu:'buscaste',    el:'buscó',    nos:'buscamos',   ellos:'buscaron'   } },
    { infinitive:'empezar',   en:'to begin',           change:'z→c',  yo:'empecé',   others:'empezaste/empezó/empezamos/empezaron',
      forms:{ yo:'empecé',    tu:'empezaste',   el:'empezó',   nos:'empezamos',  ellos:'empezaron'  } },
    { infinitive:'tocar',     en:'to play/touch',      change:'c→qu', yo:'toqué',    others:'tocaste/tocó/tocamos/tocaron',
      forms:{ yo:'toqué',     tu:'tocaste',     el:'tocó',     nos:'tocamos',    ellos:'tocaron'    } },
    { infinitive:'pagar',     en:'to pay',             change:'g→gu', yo:'pagué',    others:'pagaste/pagó/pagamos/pagaron',
      forms:{ yo:'pagué',     tu:'pagaste',     el:'pagó',     nos:'pagamos',    ellos:'pagaron'    } },
    { infinitive:'sacar',     en:'to take out',        change:'c→qu', yo:'saqué',    others:'sacaste/sacó/sacamos/sacaron',
      forms:{ yo:'saqué',     tu:'sacaste',     el:'sacó',     nos:'sacamos',    ellos:'sacaron'    } },
    { infinitive:'cruzar',    en:'to cross',           change:'z→c',  yo:'crucé',    others:'cruzaste/cruzó/cruzamos/cruzaron',
      forms:{ yo:'crucé',     tu:'cruzaste',    el:'cruzó',    nos:'cruzamos',   ellos:'cruzaron'   } },
    { infinitive:'practicar', en:'to practice',        change:'c→qu', yo:'practiqué',others:'practicaste/practicó/practicamos/practicaron',
      forms:{ yo:'practiqué', tu:'practicaste', el:'practicó', nos:'practicamos',ellos:'practicaron'} },
  ],

  erIrSpellingChanges: [
    { infinitive:'leer',      en:'to read',   change:'i→y (3rd)',
      forms:{ yo:'leí',       tu:'leíste',    el:'leyó',      nos:'leímos',     ellos:'leyeron'    } },
    { infinitive:'caer',      en:'to fall',   change:'i→y (3rd)',
      forms:{ yo:'caí',       tu:'caíste',    el:'cayó',      nos:'caímos',     ellos:'cayeron'    } },
    { infinitive:'oír',       en:'to hear',   change:'i→y (3rd)',
      forms:{ yo:'oí',        tu:'oíste',     el:'oyó',       nos:'oímos',      ellos:'oyeron'     } },
    { infinitive:'construir', en:'to build',  change:'-uir: i→y (3rd)',
      forms:{ yo:'construí',  tu:'construiste',el:'construyó',nos:'construimos', ellos:'construyeron'} },
    { infinitive:'destruir',  en:'to destroy',change:'-uir: i→y (3rd)',
      forms:{ yo:'destruí',   tu:'destruiste',el:'destruyó',  nos:'destruimos',  ellos:'destruyeron'} },
    { infinitive:'incluir',   en:'to include',change:'-uir: i→y (3rd)',
      forms:{ yo:'incluí',    tu:'incluiste', el:'incluyó',   nos:'incluimos',   ellos:'incluyeron' } },
  ],

  sentenceCompletionDrills: [
    { sentence:'Yo ___ a las ocho anoche. (llegar)',     answer:'llegué',    choices:['llegué','llegé','llegaste','llegó'],       fills:['llegué'],    en:'I arrived at eight last night.',          rule:'llegar: g→gu in yo preterit (llegué)' },
    { sentence:'Yo ___ las llaves en mi bolsa. (buscar)',answer:'busqué',    choices:['busqué','busqé','buscaste','buscó'],        fills:['busqué'],    en:'I looked for the keys in my bag.',        rule:'buscar: c→qu in yo preterit (busqué)' },
    { sentence:'Yo ___ a estudiar a las siete. (empezar)',answer:'empecé',   choices:['empecé','empezé','empezaste','empezó'],     fills:['empecé'],    en:'I began to study at seven.',              rule:'empezar: z→c in yo preterit (empecé)' },
    { sentence:'Él ___ el periódico anoche. (leer)',     answer:'leyó',      choices:['leyó','leió','leí','leyeron'],              fills:['leyó'],      en:'He read the newspaper last night.',       rule:'leer: i→y in 3rd person (leyó)' },
    { sentence:'Ellos ___ la música. (oír)',             answer:'oyeron',    choices:['oyeron','oieron','oíron','oíeron'],         fills:['oyeron'],    en:'They heard the music.',                   rule:'oír: i→y in 3rd person plural (oyeron)' },
    { sentence:'Él ___ la casa nueva. (construir)',      answer:'construyó', choices:['construyó','construió','construí','construyeron'], fills:['construyó'], en:'He built the new house.',            rule:'-uir verbs: i→y in 3rd person (construyó)' },
    { sentence:'Yo ___ la guitarra en la fiesta. (tocar)',answer:'toqué',    choices:['toqué','tocé','tocaste','tocó'],            fills:['toqué'],     en:'I played the guitar at the party.',       rule:'tocar: c→qu in yo preterit (toqué)' },
    { sentence:'Yo ___ la cuenta en el restaurante. (pagar)', answer:'pagué', choices:['pagué','pagé','pagaste','pagó'],          fills:['pagué'],     en:'I paid the bill at the restaurant.',      rule:'pagar: g→gu in yo preterit (pagué)' },
  ],
};

/* ════════════════════════════════════════════════════════════════════════════
   SUB-LESSON 14-3 — Irregular Preterit Verbs
   ════════════════════════════════════════════════════════════════════════════ */

const SUBLESSON_14_3 = {
  id: '14-3',
  chapterId: 14,
  title: 'Irregular Preterit Verbs',
  subtitle: 'u-stem · j-stem · i-stem · dar/ir/ser/haber',

  rules: [
    {
      id: 'r1',
      heading: 'Irregular preterit — special stem + unaccented endings',
      body: 'Irregular preterit verbs share a special feature: they use a completely different stem AND their endings carry no accent marks (-e, -iste, -o, -imos, -isteis, -ieron). Learn the stem, then add these endings.',
      examples: [
        { es: 'tener → tuv- → tuve, tuviste, tuvo, tuvimos, tuvieron', en: 'I had, you had, he had…' },
        { es: 'hacer → hic- → hice, hiciste, hizo, hicimos, hicieron', en: 'Note: hizo (z) to preserve /s/ sound' },
        { es: 'decir → dij- → dije, dijiste, dijo, dijimos, dijeron',  en: 'j-stem: -ieron becomes -eron' },
      ],
      tip: 'J-stem verbs (decir, traer, producir) use -eron NOT -ieron in the ellos form: dijeron, trajeron, produjeron.',
    },
    {
      id: 'r2',
      heading: 'Ir and ser share identical preterit forms',
      body: 'Ir and ser are identical in the preterit. Context always makes the meaning clear.',
      examples: [
        { es: 'Ella fue doctora.',      en: 'She was a doctor. (ser)' },
        { es: 'Ella fue a la tienda.',  en: 'She went to the store. (ir)' },
        { es: 'Fui al banco ayer.',     en: 'I went to the bank yesterday. (ir)' },
        { es: 'Fue una fiesta excelente.', en: 'It was an excellent party. (ser)' },
      ],
    },
  ],

  verbGroups: {
    uStem: [
      { infinitive:'andar',   en:'to walk',         stem:'anduv',
        forms:{ yo:'anduve',   tu:'anduviste',  el:'anduvo',   nos:'anduvimos',  ellos:'anduvieron'  },
        ex:'Pedro y Jorge anduvieron en las montañas.', exEn:'Peter and Jorge walked in the mountains.' },
      { infinitive:'caber',   en:'to fit',          stem:'cup',
        forms:{ yo:'cupe',     tu:'cupiste',    el:'cupo',     nos:'cupimos',    ellos:'cupieron'    },
        ex:'No cupo toda la ropa en la maleta.',        exEn:'All the clothes didn\'t fit in the suitcase.' },
      { infinitive:'estar',   en:'to be',           stem:'estuv',
        forms:{ yo:'estuve',   tu:'estuviste',  el:'estuvo',   nos:'estuvimos',  ellos:'estuvieron'  },
        ex:'Estuve en casa todo el día ayer.',          exEn:'I was home all day yesterday.' },
      { infinitive:'poder',   en:'to be able to',   stem:'pud',
        forms:{ yo:'pude',     tu:'pudiste',    el:'pudo',     nos:'pudimos',    ellos:'pudieron'    },
        ex:'No pude bajar en el ascensor.',             exEn:'I was not able to go down in the elevator.' },
      { infinitive:'poner',   en:'to put',          stem:'pus',
        forms:{ yo:'puse',     tu:'pusiste',    el:'puso',     nos:'pusimos',    ellos:'pusieron'    },
        ex:'¿Dónde pusiste las llaves?',                exEn:'Where did you put the keys?' },
      { infinitive:'querer',  en:'to want',         stem:'quis',
        forms:{ yo:'quise',    tu:'quisiste',   el:'quiso',    nos:'quisimos',   ellos:'quisieron'   },
        ex:'Yo no quise bajar en el ascensor.',         exEn:'I didn\'t want to go down in the elevator.' },
      { infinitive:'saber',   en:'to know',         stem:'sup',
        forms:{ yo:'supe',     tu:'supiste',    el:'supo',     nos:'supimos',    ellos:'supieron'    },
        ex:'Supe la verdad ayer.',                      exEn:'I found out the truth yesterday.' },
      { infinitive:'tener',   en:'to have',         stem:'tuv',
        forms:{ yo:'tuve',     tu:'tuviste',    el:'tuvo',     nos:'tuvimos',    ellos:'tuvieron'    },
        ex:'Tuve una cita con el dentista.',            exEn:'I had an appointment with the dentist.' },
    ],
    jStem: [
      { infinitive:'decir',    en:'to say/tell',     stem:'dij',
        forms:{ yo:'dije',     tu:'dijiste',    el:'dijo',     nos:'dijimos',    ellos:'dijeron'     },
        ex:'¿Por qué no me dijo Ud. la verdad?',       exEn:'Why didn\'t you tell me the truth?' },
      { infinitive:'producir', en:'to produce',      stem:'produj',
        forms:{ yo:'produje',  tu:'produjiste', el:'produjo',  nos:'produjimos', ellos:'produjeron'  },
        ex:'Los estudiantes produjeron su propia obra.',exEn:'The students produced their own play.' },
      { infinitive:'traer',    en:'to bring',        stem:'traj',
        forms:{ yo:'traje',    tu:'trajiste',   el:'trajo',    nos:'trajimos',   ellos:'trajeron'    },
        ex:'Le trajimos una bicicleta al niño.',        exEn:'We brought the child a bicycle.' },
    ],
    iStem: [
      { infinitive:'hacer',   en:'to do/make',       stem:'hic/hiz',
        forms:{ yo:'hice',     tu:'hiciste',    el:'hizo',     nos:'hicimos',    ellos:'hicieron'    },
        ex:'¿Hiciste tu tarea para hoy?',              exEn:'Did you do your homework for today?' },
      { infinitive:'venir',   en:'to come',          stem:'vin',
        forms:{ yo:'vine',     tu:'viniste',    el:'vino',     nos:'vinimos',    ellos:'vinieron'    },
        ex:'¿Por qué no vino Ud. a mi fiesta?',        exEn:'Why didn\'t you come to my party?' },
    ],
    special: [
      { infinitive:'dar',     en:'to give',          stem:'d',
        forms:{ yo:'di',       tu:'diste',      el:'dio',      nos:'dimos',      ellos:'dieron'      },
        ex:'Miguel le dio a su novia un anillo.',      exEn:'Michael gave his girlfriend a ring.' },
      { infinitive:'ir',      en:'to go',            stem:'fu',
        forms:{ yo:'fui',      tu:'fuiste',     el:'fue',      nos:'fuimos',     ellos:'fueron'      },
        ex:'Fui al banco ayer.',                       exEn:'I went to the bank yesterday.' },
      { infinitive:'ser',     en:'to be',            stem:'fu',
        forms:{ yo:'fui',      tu:'fuiste',     el:'fue',      nos:'fuimos',     ellos:'fueron'      },
        ex:'Fue una fiesta excelente.',                exEn:'It was an excellent party.' },
    ],
  },
};

/* ════════════════════════════════════════════════════════════════════════════
   SUB-LESSON 14-4 — -ir Stem Changes + Compound Verbs + Mixed Drill
   ════════════════════════════════════════════════════════════════════════════ */

const SUBLESSON_14_4 = {
  id: '14-4',
  chapterId: 14,
  title: '-ir Stem Changes and Mixed Drill',
  subtitle: 'mintió · prefirió · pidió · durmió · se divirtió',

  rules: [
    {
      id: 'r1',
      heading: '-ir stem-changing verbs: change in 3rd person only',
      body: '-ir verbs that have stem changes in the present indicative also change in the 3rd person singular and plural of the preterit. E→I in the 3rd person (e→ie and e→i verbs), O→U in the 3rd person (o→ue verbs).',
      examples: [
        { es: 'mentir (e→ie present) → mintió, mintieron',      en: 'he lied, they lied' },
        { es: 'preferir (e→ie present) → prefirió, prefirieron',en: 'he preferred, they preferred' },
        { es: 'pedir (e→i present) → pidió, pidieron',          en: 'he asked for, they asked for' },
        { es: 'dormir (o→ue present) → durmió, durmieron',      en: 'he slept, they slept' },
      ],
      tip: 'Only the 3rd person forms change. All other preterit forms (yo, tú, nosotros) are regular: yo mentí, tú mentiste, nosotros mentimos.',
    },
    {
      id: 'r2',
      heading: 'Compound verbs follow their root verb',
      body: 'Verbs built from irregular preterit roots conjugate exactly like their parent verb.',
      examples: [
        { es: 'conducir (like producir) → conduje, condujiste, condujo…',  en: 'to drive' },
        { es: 'traducir (like producir) → traduje, tradujiste, tradujo…',  en: 'to translate' },
        { es: 'componer (like poner) → compuse, compusiste, compuso…',     en: 'to compose' },
        { es: 'mantener (like tener) → mantuve, mantuviste, mantuvo…',     en: 'to maintain' },
      ],
    },
  ],

  irStemChanges: [
    /* e→ie present → e→i in 3rd person preterit */
    { infinitive:'mentir',     en:'to lie',           presentStem:'mient/ment', preteritStem:'mint',
      forms:{ yo:'mentí',      tu:'mentiste',  el:'mintió',    nos:'mentimos',   ellos:'mintieron'   },
      ex:'El niño mintió y sus padres se enojaron.',  exEn:'The child lied and his parents got angry.' },
    { infinitive:'preferir',   en:'to prefer',        presentStem:'prefier/prefer', preteritStem:'prefir',
      forms:{ yo:'preferí',    tu:'preferiste',el:'prefirió',  nos:'preferimos', ellos:'prefirieron' },
      ex:'Ella prefirió el vino blanco.',             exEn:'She preferred the white wine.' },
    { infinitive:'sentirse',   en:'to feel',          presentStem:'sient/sent', preteritStem:'sint',
      forms:{ yo:'me sentí',   tu:'te sentiste',el:'se sintió',nos:'nos sentimos',ellos:'se sintieron'},
      ex:'Él se sintió mal anoche.',                  exEn:'He felt sick last night.' },
    { infinitive:'sugerir',    en:'to suggest',       presentStem:'sugier/suger',preteritStem:'sugir',
      forms:{ yo:'sugerí',     tu:'sugeriste', el:'sugirió',   nos:'sugerimos',  ellos:'sugirieron'  },
      ex:'Ella sugirió un buen restaurante.',         exEn:'She suggested a good restaurant.' },
    /* e→i present → e→i in 3rd person preterit */
    { infinitive:'pedir',      en:'to ask for',       presentStem:'pid/ped',    preteritStem:'pid',
      forms:{ yo:'pedí',       tu:'pediste',   el:'pidió',     nos:'pedimos',    ellos:'pidieron'    },
      ex:'Él pidió la cuenta al camarero.',           exEn:'He asked the waiter for the bill.' },
    { infinitive:'repetir',    en:'to repeat',        presentStem:'repit/repet',preteritStem:'repit',
      forms:{ yo:'repetí',     tu:'repetiste', el:'repitió',   nos:'repetimos',  ellos:'repitieron'  },
      ex:'El profesor repitió la pregunta.',          exEn:'The professor repeated the question.' },
    { infinitive:'seguir',     en:'to follow',        presentStem:'sig/segu',   preteritStem:'sigui',
      forms:{ yo:'seguí',      tu:'seguiste',  el:'siguió',    nos:'seguimos',   ellos:'siguieron'   },
      ex:'Ella siguió las instrucciones.',            exEn:'She followed the instructions.' },
    { infinitive:'servir',     en:'to serve',         presentStem:'sirv/serv',  preteritStem:'sirvi',
      forms:{ yo:'serví',      tu:'serviste',  el:'sirvió',    nos:'servimos',   ellos:'sirvieron'   },
      ex:'El camarero sirvió la comida rápidamente.', exEn:'The waiter served the food quickly.' },
    { infinitive:'divertirse', en:'to have fun',      presentStem:'diviert/divert',preteritStem:'divirti',
      forms:{ yo:'me divertí', tu:'te divertiste',el:'se divirtió',nos:'nos divertimos',ellos:'se divirtieron'},
      ex:'Los niños se divirtieron en la fiesta.',    exEn:'The children had fun at the party.' },
    /* o→ue present → o→u in 3rd person preterit */
    { infinitive:'dormir',     en:'to sleep',         presentStem:'duerm/dorm', preteritStem:'durm',
      forms:{ yo:'dormí',      tu:'dormiste',  el:'durmió',    nos:'dormimos',   ellos:'durmieron'   },
      ex:'Ellos durmieron ocho horas.',               exEn:'They slept eight hours.' },
    { infinitive:'dormirse',   en:'to fall asleep',   presentStem:'me duerm',   preteritStem:'se durm',
      forms:{ yo:'me dormí',   tu:'te dormiste',el:'se durmió',nos:'nos dormimos',ellos:'se durmieron'},
      ex:'Me dormí rápidamente anoche.',              exEn:'I fell asleep quickly last night.' },
  ],

  compoundVerbs: [
    { infinitive:'conducir',  en:'to drive',      rootVerb:'producir', ex:'Él condujo el carro.',       exEn:'He drove the car.' },
    { infinitive:'traducir',  en:'to translate',  rootVerb:'producir', ex:'Tradujimos el documento.',   exEn:'We translated the document.' },
    { infinitive:'componer',  en:'to compose',    rootVerb:'poner',    ex:'Ella compuso una canción.',  exEn:'She composed a song.' },
    { infinitive:'proponer',  en:'to propose',    rootVerb:'poner',    ex:'Él propuso un plan nuevo.',  exEn:'He proposed a new plan.' },
    { infinitive:'contener',  en:'to contain',    rootVerb:'tener',    ex:'El vaso contuvo el líquido.',exEn:'The glass contained the liquid.' },
    { infinitive:'mantener',  en:'to maintain',   rootVerb:'tener',    ex:'Mantuvimos la paz.',         exEn:'We maintained the peace.' },
    { infinitive:'contradecir',en:'to contradict',rootVerb:'decir',    ex:'Él me contradijo.',          exEn:'He contradicted me.' },
    { infinitive:'atraer',    en:'to attract',    rootVerb:'traer',    ex:'La música los atrajo.',      exEn:'The music attracted them.' },
  ],

  sentenceCompletionDrills: [
    { sentence:'El niño ___ y sus padres se enojaron. (mentir)', answer:'mintió',    choices:['mintió','mentió','mentí','mintieron'],     fills:['mintió'],    en:'The child lied and parents got angry.',   rule:'mentir: e→i in 3rd person singular (mintió)' },
    { sentence:'Ella ___ el vino blanco. (preferir)',            answer:'prefirió',  choices:['prefirió','preferió','preferí','prefirieron'], fills:['prefirió'], en:'She preferred the white wine.',          rule:'preferir: e→i in 3rd person singular (prefirió)' },
    { sentence:'Él ___ la cuenta al camarero. (pedir)',          answer:'pidió',     choices:['pidió','pedió','pedí','pidieron'],         fills:['pidió'],     en:'He asked the waiter for the bill.',       rule:'pedir: e→i in 3rd person singular (pidió)' },
    { sentence:'Los niños ___ en la fiesta. (divertirse)',       answer:'se divirtieron', choices:['se divirtieron','se divirtió','se divertieron','me divertí'], fills:['se divirtieron'], en:'The children had fun at the party.', rule:'divertirse: e→i in 3rd person plural (se divirtieron)' },
    { sentence:'Ellos ___ ocho horas. (dormir)',                 answer:'durmieron', choices:['durmieron','dormieron','dormí','durmió'],   fills:['durmieron'], en:'They slept eight hours.',                 rule:'dormir: o→u in 3rd person plural (durmieron)' },
    { sentence:'Yo ___ al trabajo esta mañana. (mentir→mentí/yo)', answer:'mentí',  choices:['mentí','minté','mintí','mentía'],          fills:['mentí'],     en:'I lied this morning.',                    rule:'mentir: yo form is REGULAR (mentí, not mintí)' },
    { sentence:'Él ___ el carro. (conducir)',                    answer:'condujo',   choices:['condujo','condució','condujó','conduci'],   fills:['condujo'],   en:'He drove the car.',                       rule:'conducir follows producir: conduj- stem (condujo)' },
    { sentence:'Ella ___ una canción hermosa. (componer)',        answer:'compuso',   choices:['compuso','componió','compuse','componian'], fills:['compuso'],  en:'She composed a beautiful song.',          rule:'componer follows poner: compus- stem (compuso)' },
  ],
};

/* ════════════════════════════════════════════════════════════════════════════
   Utility — conjugate a regular verb in the preterit
   ════════════════════════════════════════════════════════════════════════════ */

function conjugatePreterit(stem, type, pronoun) {
  const AR = { 'yo':'-é','tú':'-aste','él/ella':'-ó','nosotros':'-amos','vosotros':'-asteis','ellos':'-aron','Ud.':'-ó','Uds.':'-aron','ella':'-ó','ellas':'-aron' };
  const ER = { 'yo':'-í','tú':'-iste','él/ella':'-ió','nosotros':'-imos','vosotros':'-isteis','ellos':'-ieron','Ud.':'-ió','Uds.':'-ieron','ella':'-ió','ellas':'-ieron' };
  const map = type === 'ar' ? AR : ER;
  const ending = map[pronoun] || '-é';
  return stem + ending.slice(1);
}

/* ════════════════════════════════════════════════════════════════════════════
   Chapter 14 export
   ════════════════════════════════════════════════════════════════════════════ */

const CHAPTER_14 = {
  id: 14,
  title: 'The Preterit Tense',
  unlocked: false,
  sublessons: [SUBLESSON_14_1, SUBLESSON_14_2, SUBLESSON_14_3, SUBLESSON_14_4],
};

export default CHAPTER_14;
export { SUBLESSON_14_1, SUBLESSON_14_2, SUBLESSON_14_3, SUBLESSON_14_4, conjugatePreterit };
