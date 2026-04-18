/* ─── Fluir · Chapter 15 Data ───────────────────────────────────────────────
   Source: Complete Spanish Step-by-Step, Bregstein (McGraw-Hill)
   Chapter 15: The Imperfect Tense
   4 sub-lessons (Option A):
     15-1  Imperfect formation — regular -ar, -er/-ir + 3 irregulars (ir, ser, ver)
     15-2  Seven uses of the imperfect + signal words
     15-3  Preterit vs imperfect contrast
     15-4  Double object pronouns — IOP + DOP together
   ─────────────────────────────────────────────────────────────────────────── */

/* ════════════════════════════════════════════════════════════════════════════
   SUB-LESSON 15-1 — Imperfect Formation
   ════════════════════════════════════════════════════════════════════════════ */

const SUBLESSON_15_1 = {
  id: '15-1',
  chapterId: 15,
  title: 'Imperfect Formation',
  subtitle: '-aba/-abas/-aba · -ía/-ías/-ía · only 3 irregulars',

  rules: [
    {
      id: 'r1',
      heading: '-ar imperfect: -aba, -abas, -aba, -ábamos, -abais, -aban',
      body: 'Drop the -ar and add the endings. Note that yo and él/ella are identical (-aba). There are NO irregular -ar verbs in the imperfect.',
      examples: [
        { es: 'yo hablaba',          en: 'I was speaking / I used to speak' },
        { es: 'tú hablabas',         en: 'you were speaking' },
        { es: 'él/ella hablaba',     en: 'he/she was speaking (same as yo)' },
        { es: 'nosotros hablábamos', en: 'we were speaking' },
        { es: 'ellos hablaban',      en: 'they were speaking' },
      ],
      tip: 'Because yo and él/ella are identical (-aba), a subject pronoun or noun is often included for clarity: Yo hablaba vs Él hablaba.',
    },
    {
      id: 'r2',
      heading: '-er/-ir imperfect: -ía, -ías, -ía, -íamos, -íais, -ían',
      body: '-er and -ir verbs share the same imperfect endings. All carry written accents on the í. Yo and él/ella are again identical.',
      examples: [
        { es: 'yo comía',            en: 'I was eating / I used to eat' },
        { es: 'tú comías',           en: 'you were eating' },
        { es: 'él/ella comía',       en: 'he/she was eating' },
        { es: 'nosotros comíamos',   en: 'we were eating' },
        { es: 'ellos comían',        en: 'they were eating' },
      ],
    },
    {
      id: 'r3',
      heading: 'Only three irregular imperfect verbs: ir, ser, ver',
      body: 'Ir, ser, and ver are the only irregular verbs in the imperfect. All other verbs — including verbs that are irregular in the present, preterit, or subjunctive — are regular in the imperfect.',
      examples: [
        { es: 'ir: iba, ibas, iba, íbamos, ibais, iban',       en: 'was going / used to go' },
        { es: 'ser: era, eras, era, éramos, erais, eran',       en: 'was / used to be' },
        { es: 'ver: veía, veías, veía, veíamos, veíais, veían', en: 'was seeing / used to see' },
      ],
      tip: 'Hacer, tener, querer, poder — all regular in the imperfect despite being irregular elsewhere. Only ir, ser, ver are exceptions.',
    },
  ],

  verbs: [
    /* Regular -ar */
    { infinitive:'hablar',     en:'to speak',      stem:'habl',    type:'ar',
      forms:{ yo:'hablaba',    tu:'hablabas',    el:'hablaba',    nos:'hablábamos',   ellos:'hablaban'   },
      ex:'Ella hablaba español perfectamente.',      exEn:'She used to speak Spanish perfectly.' },
    { infinitive:'trabajar',   en:'to work',       stem:'trabaj',  type:'ar',
      forms:{ yo:'trabajaba',  tu:'trabajabas',  el:'trabajaba',  nos:'trabajábamos',  ellos:'trabajaban'  },
      ex:'Él trabajaba doce horas al día.',          exEn:'He used to work twelve hours a day.' },
    { infinitive:'caminar',    en:'to walk',       stem:'camin',   type:'ar',
      forms:{ yo:'caminaba',   tu:'caminabas',   el:'caminaba',   nos:'caminábamos',   ellos:'caminaban'   },
      ex:'Yo caminaba al trabajo todos los días.',   exEn:'I used to walk to work every day.' },
    { infinitive:'estudiar',   en:'to study',      stem:'estudi',  type:'ar',
      forms:{ yo:'estudiaba',  tu:'estudiabas',  el:'estudiaba',  nos:'estudiábamos',  ellos:'estudiaban'  },
      ex:'Ella estudiaba mucho cuando era joven.',   exEn:'She used to study a lot when she was young.' },
    { infinitive:'recordar',   en:'to remember',   stem:'record',  type:'ar',
      forms:{ yo:'recordaba',  tu:'recordabas',  el:'recordaba',  nos:'recordábamos',  ellos:'recordaban'  },
      ex:'Recordaba los nombres de todos.',          exEn:'She used to remember everyone\'s names.' },
    { infinitive:'jugar',      en:'to play',       stem:'jug',     type:'ar',
      forms:{ yo:'jugaba',     tu:'jugabas',     el:'jugaba',     nos:'jugábamos',     ellos:'jugaban'     },
      ex:'Todos los veranos, jugaba al tenis.',      exEn:'Every summer, I used to play tennis.' },
    /* Regular -er */
    { infinitive:'comer',      en:'to eat',        stem:'com',     type:'er',
      forms:{ yo:'comía',      tu:'comías',      el:'comía',      nos:'comíamos',      ellos:'comían'      },
      ex:'Comíamos en ese restaurante cada semana.',  exEn:'We used to eat at that restaurant every week.' },
    { infinitive:'tener',      en:'to have',       stem:'ten',     type:'er',
      forms:{ yo:'tenía',      tu:'tenías',      el:'tenía',      nos:'teníamos',      ellos:'tenían'      },
      ex:'Ella tenía veinte años cuando se graduó.',  exEn:'She was twenty years old when she graduated.' },
    { infinitive:'querer',     en:'to want',       stem:'quer',    type:'er',
      forms:{ yo:'quería',     tu:'querías',     el:'quería',     nos:'queríamos',     ellos:'querían'     },
      ex:'Él quería ser médico de niño.',            exEn:'He wanted to be a doctor as a child.' },
    { infinitive:'poder',      en:'to be able to', stem:'pod',     type:'er',
      forms:{ yo:'podía',      tu:'podías',      el:'podía',      nos:'podíamos',      ellos:'podían'      },
      ex:'Antes podía correr muy rápido.',           exEn:'Before, I used to be able to run very fast.' },
    { infinitive:'hacer',      en:'to do/make',    stem:'hac',     type:'er',
      forms:{ yo:'hacía',      tu:'hacías',      el:'hacía',      nos:'hacíamos',      ellos:'hacían'      },
      ex:'¿Qué hacías cuando eras joven?',           exEn:'What used you to do when you were young?' },
    { infinitive:'saber',      en:'to know',       stem:'sab',     type:'er',
      forms:{ yo:'sabía',      tu:'sabías',      el:'sabía',      nos:'sabíamos',      ellos:'sabían'      },
      ex:'Él sabía tocar el piano.',                 exEn:'He knew how to play the piano.' },
    /* Regular -ir */
    { infinitive:'vivir',      en:'to live',       stem:'viv',     type:'ir',
      forms:{ yo:'vivía',      tu:'vivías',      el:'vivía',      nos:'vivíamos',      ellos:'vivían'      },
      ex:'Vivíamos cerca del mar.',                  exEn:'We used to live near the sea.' },
    { infinitive:'venir',      en:'to come',       stem:'ven',     type:'ir',
      forms:{ yo:'venía',      tu:'venías',      el:'venía',      nos:'veníamos',      ellos:'venían'      },
      ex:'Ella venía a visitarnos cada domingo.',    exEn:'She used to come visit us every Sunday.' },
    { infinitive:'decir',      en:'to say/tell',   stem:'dec',     type:'ir',
      forms:{ yo:'decía',      tu:'decías',      el:'decía',      nos:'decíamos',      ellos:'decían'      },
      ex:'Siempre decía la verdad.',                 exEn:'He always used to tell the truth.' },
    /* Three irregulars */
    { infinitive:'ir',         en:'to go',         stem:'ib',      type:'ar', irregular:true,
      forms:{ yo:'iba',        tu:'ibas',        el:'iba',        nos:'íbamos',        ellos:'iban'        },
      ex:'Yo iba al cine todos los sábados.',        exEn:'I used to go to the movies every Saturday.' },
    { infinitive:'ser',        en:'to be',         stem:'er',      type:'ar', irregular:true,
      forms:{ yo:'era',        tu:'eras',        el:'era',        nos:'éramos',        ellos:'eran'        },
      ex:'Ella era doctora antes de jubilarse.',     exEn:'She used to be a doctor before retiring.' },
    { infinitive:'ver',        en:'to see',        stem:'ve',      type:'er', irregular:true,
      forms:{ yo:'veía',       tu:'veías',       el:'veía',       nos:'veíamos',       ellos:'veían'       },
      ex:'Los veía en la plaza todos los días.',     exEn:'I used to see them in the plaza every day.' },
  ],
};

/* ════════════════════════════════════════════════════════════════════════════
   SUB-LESSON 15-2 — Seven Uses of the Imperfect
   ════════════════════════════════════════════════════════════════════════════ */

const SUBLESSON_15_2 = {
  id: '15-2',
  chapterId: 15,
  title: 'Uses of the Imperfect',
  subtitle: 'Setting the stage · Habits · Descriptions · Time · Age',

  rules: [
    {
      id: 'r1',
      heading: 'Use 1 — Setting the stage / narration / background',
      body: 'The imperfect paints the background scene. It describes what WAS happening, what the situation WAS — not what happened (that\'s the preterit).',
      examples: [
        { es: 'El sol brillaba y los pájaros cantaban.',       en: 'The sun was shining and the birds were singing.' },
        { es: 'No había nadie en la casa.',                    en: 'There was no one in the house.' },
        { es: 'Había un silencio profundo en el bosque.',      en: 'There was a profound silence in the forest.' },
      ],
    },
    {
      id: 'r2',
      heading: 'Use 2 — Habitual / repeated actions in the past',
      body: 'The imperfect expresses "used to" or "would" for things done repeatedly or habitually in the past. Signal words: todos los días, siempre, cada año, de niño, antes, frecuentemente.',
      examples: [
        { es: 'Todos los veranos, jugaba al tenis.',           en: 'Every summer, I used to play tennis.' },
        { es: 'Cada noche, él leía antes de dormirse.',        en: 'Each night, he would read before going to sleep.' },
        { es: 'Siempre comíamos en ese restaurante.',          en: 'We always used to eat at that restaurant.' },
      ],
    },
    {
      id: 'r3',
      heading: 'Uses 3–7 — Continuous actions, description, origin, time, age',
      body: 'Continuous: was doing something (interrupted by preterit). Description: what something WAS like. Origin: where someone WAS from. Time: what time it WAS. Age: how old someone WAS.',
      examples: [
        { es: 'Ella buscaba sus llaves cuando el teléfono sonó.', en: 'She was looking for her keys when the phone rang.' },
        { es: 'La casa era blanca. Nuestro vecino era viejo.',    en: 'The house was white. Our neighbor was old.' },
        { es: 'El hombre era de Perú.',                          en: 'The man was from Peru.' },
        { es: 'Eran las cinco de la tarde.',                     en: 'It was five in the afternoon.' },
        { es: 'Ella tenía veinte años cuando se graduó.',        en: 'She was twenty when she graduated.' },
      ],
    },
  ],

  uses: [
    { use:'Setting the stage / narration',   signal:'no specific signal — describes the scene',     example:'El sol brillaba y los pájaros cantaban.' },
    { use:'Habitual / repeated past action', signal:'todos los días, siempre, cada año, de niño, antes', example:'Todos los veranos, jugaba al tenis.' },
    { use:'Continuous action in progress',   signal:'cuando (interrupted by preterit)',              example:'Ella buscaba sus llaves cuando sonó el teléfono.' },
    { use:'Description in the past',         signal:'no specific signal — describes how things were', example:'La casa era blanca. Él era viejo.' },
    { use:'Point of origin in the past',     signal:'ser de',                                       example:'El hombre era de Perú.' },
    { use:'Time in the past',                signal:'¿Qué hora era? / Eran las…',                   example:'Eran las cinco de la tarde.' },
    { use:'Age in the past',                 signal:'tener + años',                                  example:'Ella tenía veinte años cuando se graduó.' },
  ],

  signalWords: [
    { es:'todos los días',     en:'every day',       tense:'imperfect' },
    { es:'siempre',            en:'always',           tense:'imperfect' },
    { es:'cada año/semana',    en:'every year/week',  tense:'imperfect' },
    { es:'de niño/joven',      en:'as a child/young', tense:'imperfect' },
    { es:'antes',              en:'before/formerly',  tense:'imperfect' },
    { es:'frecuentemente',     en:'frequently',       tense:'imperfect' },
    { es:'mientras',           en:'while',            tense:'imperfect' },
    { es:'ayer',               en:'yesterday',        tense:'preterit' },
    { es:'anoche',             en:'last night',       tense:'preterit' },
    { es:'la semana pasada',   en:'last week',        tense:'preterit' },
    { es:'de repente',         en:'suddenly',         tense:'preterit' },
    { es:'una vez',            en:'once / one time',  tense:'preterit' },
  ],

  sentenceCompletionDrills: [
    { sentence:'Todos los veranos, yo ___ al tenis. (jugar)',      answer:'jugaba',     choices:['jugaba','jugué','jugaré','jugo'],          fills:['jugaba'],     en:'Every summer, I used to play tennis.',          rule:'todos los veranos → habitual past → imperfect' },
    { sentence:'El sol ___ y los pájaros cantaban. (brillar)',     answer:'brillaba',   choices:['brillaba','brilló','brilla','brillara'],    fills:['brillaba'],   en:'The sun was shining and the birds were singing.', rule:'background/stage-setting → imperfect' },
    { sentence:'Ella ___ veinte años cuando se graduó. (tener)',   answer:'tenía',      choices:['tenía','tuvo','tiene','tendrá'],            fills:['tenía'],      en:'She was twenty when she graduated.',             rule:'age in the past → imperfect (tenía)' },
    { sentence:'___ las cinco de la tarde. (ser)',                 answer:'Eran',       choices:['Eran','Fueron','Son','Será'],               fills:['Eran'],       en:'It was five in the afternoon.',                 rule:'time in the past → imperfect (eran las…)' },
    { sentence:'El hombre ___ de Perú. (ser)',                     answer:'era',        choices:['era','fue','es','será'],                   fills:['era'],        en:'The man was from Peru.',                        rule:'point of origin in the past → imperfect' },
    { sentence:'La casa ___ blanca. (ser)',                        answer:'era',        choices:['era','fue','es','estaba'],                 fills:['era'],        en:'The house was white.',                          rule:'description in the past → imperfect' },
    { sentence:'Cada noche, él ___ antes de dormirse. (leer)',     answer:'leía',       choices:['leía','leyó','lee','leerá'],               fills:['leía'],       en:'Each night, he would read before going to sleep.', rule:'cada noche → habitual past → imperfect' },
    { sentence:'Yo ___ al cine todos los sábados. (ir)',           answer:'iba',        choices:['iba','fui','voy','iré'],                   fills:['iba'],        en:'I used to go to the movies every Saturday.',    rule:'todos los sábados → habitual past → ir irregular: iba' },
    { sentence:'Antes, yo ___ mucho. (leer)',                      answer:'leía',       choices:['leía','leí','leo','leeré'],                fills:['leía'],       en:'Before, I used to read a lot.',                 rule:'antes → habitual past → imperfect' },
    { sentence:'No ___ nadie en la casa. (haber)',                 answer:'había',      choices:['había','hubo','hay','habrá'],              fills:['había'],      en:'There was no one in the house.',                rule:'background description → imperfect (había)' },
  ],
};

/* ════════════════════════════════════════════════════════════════════════════
   SUB-LESSON 15-3 — Preterit vs Imperfect Contrast
   ════════════════════════════════════════════════════════════════════════════ */

const SUBLESSON_15_3 = {
  id: '15-3',
  chapterId: 15,
  title: 'Preterit vs Imperfect',
  subtitle: 'Completed action (preterit) vs ongoing/habitual (imperfect)',

  rules: [
    {
      id: 'r1',
      heading: 'The key distinction — completed vs ongoing',
      body: 'Preterit = the action is over, completed, done. Imperfect = the action was ongoing, habitual, or a background condition. Context and signal words determine which to use.',
      examples: [
        { es: 'Ella llegó ayer. (preterit)',                  en: 'She arrived yesterday. (completed, done)' },
        { es: 'Ella llegaba a las cinco todos los días. (imperfect)', en: 'She used to arrive at five every day. (habitual)' },
        { es: 'Fui a la tienda. (preterit)',                  en: 'I went to the store. (completed trip)' },
        { es: 'Iba a la tienda cuando vi a José. (imperfect + preterit)', en: 'I was going to the store when I saw José.' },
      ],
    },
    {
      id: 'r2',
      heading: 'Interrupted actions — imperfect + preterit in same sentence',
      body: 'A very common pattern: the imperfect describes what WAS happening (background), the preterit describes what HAPPENED (the interruption). Cuando signals the interruption.',
      examples: [
        { es: 'Ella buscaba sus llaves cuando el teléfono sonó.',  en: 'She was looking for her keys when the phone rang.' },
        { es: 'Yo hablaba cuando mi profesor me interrumpió.',      en: 'I was speaking when my professor interrupted me.' },
        { es: 'Él dormía cuando escuchó un ruido.',                en: 'He was sleeping when he heard a noise.' },
      ],
      tip: 'Pattern: [imperfect — ongoing action] + cuando + [preterit — interrupting event].',
    },
  ],

  contrastPairs: [
    { preterit:'Ella llegó ayer.',              imperfect:'Ella llegaba a las cinco todos los días.', verb:'llegar', signal:'ayer vs todos los días' },
    { preterit:'La semana pasada, leí un libro.', imperfect:'Antes, yo leía mucho.',                 verb:'leer',   signal:'la semana pasada vs antes' },
    { preterit:'Me levanté a las seis.',        imperfect:'Me levantaba tarde.',                      verb:'levantarse', signal:'esta mañana (implied) vs habitual' },
    { preterit:'Fui a la tienda.',              imperfect:'Iba a la playa todos los veranos.',        verb:'ir',     signal:'specific trip vs habitual summers' },
    { preterit:'Eduardo hizo su tarea.',        imperfect:'Eduardo hacía su tarea todos los lunes.',  verb:'hacer',  signal:'once vs every Monday' },
    { preterit:'Mi papá pagó la cuenta ayer.',  imperfect:'Mi papá siempre pagaba la cuenta.',       verb:'pagar',  signal:'ayer vs siempre' },
    { preterit:'Marta comió temprano hoy.',     imperfect:'Marta siempre comía temprano.',            verb:'comer',  signal:'hoy vs siempre' },
  ],

  sentenceCompletionDrills: [
    { sentence:'Ella ___ ayer. (llegar)',                              answer:'llegó',     choices:['llegó','llegaba','llegará','llega'],         fills:['llegó'],     en:'She arrived yesterday.',                         rule:'ayer → completed past → preterit' },
    { sentence:'Ella ___ a las cinco todos los días. (llegar)',        answer:'llegaba',   choices:['llegó','llegaba','llegará','llega'],         fills:['llegaba'],   en:'She used to arrive at five every day.',          rule:'todos los días → habitual → imperfect' },
    { sentence:'La semana pasada, ___ un buen libro. (leer)',          answer:'leí',       choices:['leí','leía','leeré','leo'],                 fills:['leí'],       en:'Last week, I read a good book.',                 rule:'la semana pasada → completed → preterit' },
    { sentence:'Antes, yo ___ mucho. (leer)',                          answer:'leía',      choices:['leí','leía','leeré','leo'],                 fills:['leía'],      en:'Before, I used to read a lot.',                  rule:'antes → habitual/former → imperfect' },
    { sentence:'Ella ___ sus llaves cuando el teléfono sonó. (buscar)',answer:'buscaba',  choices:['buscaba','buscó','busca','buscará'],        fills:['buscaba'],   en:'She was looking for her keys when the phone rang.', rule:'ongoing action interrupted → imperfect' },
    { sentence:'Yo ___ cuando mi profesor me interrumpió. (hablar)',   answer:'hablaba',  choices:['hablaba','hablé','hablaré','hablo'],        fills:['hablaba'],   en:'I was speaking when my professor interrupted me.', rule:'background ongoing action → imperfect' },
    { sentence:'Eduardo ___ su tarea. (hacer — one specific time)',    answer:'hizo',      choices:['hizo','hacía','hace','hará'],               fills:['hizo'],      en:'Eduardo did his homework. (completed)',           rule:'no signal word → single completed action → preterit' },
    { sentence:'Eduardo ___ su tarea todos los lunes. (hacer)',        answer:'hacía',     choices:['hizo','hacía','hace','hará'],               fills:['hacía'],     en:'Eduardo used to do his homework every Monday.',  rule:'todos los lunes → habitual → imperfect' },
    { sentence:'___ las dos de la tarde cuando él llamó. (ser)',       answer:'Eran',      choices:['Eran','Fueron','Son','Será'],               fills:['Eran'],      en:'It was two in the afternoon when he called.',    rule:'time in past (background) → imperfect; llamó (preterit) = the event' },
    { sentence:'Siempre ___ a ese restaurante. (ir)',                  answer:'íbamos',    choices:['íbamos','fuimos','vamos','iremos'],         fills:['íbamos'],    en:'We always used to go to that restaurant.',       rule:'siempre → habitual → imperfect; ir irregular: íbamos' },
  ],
};

/* ════════════════════════════════════════════════════════════════════════════
   SUB-LESSON 15-4 — Double Object Pronouns
   ════════════════════════════════════════════════════════════════════════════ */

const SUBLESSON_15_4 = {
  id: '15-4',
  chapterId: 15,
  title: 'Double Object Pronouns',
  subtitle: 'me lo · te la · se los · nos las',

  rules: [
    {
      id: 'r1',
      heading: 'IOP always precedes DOP — and le/les → se before lo/la/los/las',
      body: 'When an indirect object pronoun and a direct object pronoun appear together, the IOP always comes first. When the IOP is le or les, it changes to se before a DOP that begins with l.',
      examples: [
        { es: 'me + lo = me lo',    en: 'it to me' },
        { es: 'te + la = te la',    en: 'it (f.) to you' },
        { es: 'le + lo → se lo',    en: 'it to him/her/you (le→se)', note: 'le becomes se' },
        { es: 'les + los → se los', en: 'them to them (les→se)', note: 'les becomes se' },
      ],
      tip: 'Memory aid: le lo and les los are impossible — too many l sounds. Spanish replaces le/les with se: se lo, se la, se los, se las.',
    },
    {
      id: 'r2',
      heading: 'Two positions — same rules as single object pronouns',
      body: 'Double object pronouns can go before the first verb OR attached to the infinitive (with written accent added). They cannot be separated from each other.',
      examples: [
        { es: '¿Me lo prestas? (before verb)',            en: 'Will you lend it to me?' },
        { es: '¿Puedes prestármelo? (attached)',          en: 'Can you lend it to me?' },
        { es: 'Él me la va a dar. (before ir)',           en: 'He is going to give it to me.' },
        { es: 'Él va a dármela. (attached to infinitive)',en: 'He is going to give it to me.' },
      ],
    },
  ],

  doublePronouns: [
    /* me + DOP */
    { iop:'me', dop:'lo', combined:'me lo', en:'it (m.) to me',   example:'¿Me lo prestas?',              exEn:'Will you lend it to me?' },
    { iop:'me', dop:'la', combined:'me la', en:'it (f.) to me',   example:'Él me la va a dar.',           exEn:'He is going to give it to me.' },
    { iop:'me', dop:'los',combined:'me los',en:'them (m.) to me', example:'Ella no me los quería decir.', exEn:'She didn\'t want to tell them to me.' },
    { iop:'me', dop:'las',combined:'me las',en:'them (f.) to me', example:'Él me las explicó.',           exEn:'He explained them to me.' },
    /* te + DOP */
    { iop:'te', dop:'lo', combined:'te lo', en:'it (m.) to you',  example:'Te lo digo ahora.',            exEn:'I\'ll tell it to you now.' },
    { iop:'te', dop:'la', combined:'te la', en:'it (f.) to you',  example:'¿Quieres que te la explique?', exEn:'Do you want me to explain it to you?' },
    /* se + DOP (le/les → se) */
    { iop:'se', dop:'lo', combined:'se lo', en:'it (m.) to him/her/them', example:'Le doy el periódico a Enrique. Se lo doy.', exEn:'I give it to him.' },
    { iop:'se', dop:'la', combined:'se la', en:'it (f.) to him/her/them', example:'Ella quiere comprar una camisa. Nosotros se la vendemos.', exEn:'We sell it to her.' },
    { iop:'se', dop:'los',combined:'se los',en:'them (m.) to him/her/them', example:'Ana les trae pasteles. Ana se los trae.', exEn:'Ana brings them to them.' },
    { iop:'se', dop:'las',combined:'se las',en:'them (f.) to him/her/them', example:'Él les muestra las fotos. Él trata de mostrárselas.', exEn:'He tries to show them to them.' },
    /* nos + DOP */
    { iop:'nos',dop:'lo', combined:'nos lo',en:'it (m.) to us',  example:'¿Puedes explicárnoslo?',        exEn:'Can you explain it to us?' },
    { iop:'nos',dop:'la', combined:'nos la',en:'it (f.) to us',  example:'Ella nos la trajo.',            exEn:'She brought it to us.' },
  ],

  sentenceCompletionDrills: [
    { sentence:'Necesito tu carro. ¿___ prestas? (me + lo)',          answer:'Me lo',   choices:['Me lo','Me la','Se lo','Te lo'],      fills:['Me lo'],   en:'I need your car. Will you lend it to me?',      rule:'me (to me) + lo (it, masc.) → me lo' },
    { sentence:'Él tiene una revista. Él ___ va a dar. (me + la)',     answer:'me la',   choices:['me la','me lo','se la','te la'],      fills:['me la'],   en:'He has a magazine. He is going to give it to me.',rule:'me (to me) + la (it, fem.) → me la' },
    { sentence:'Le doy el libro a Juan. ___ doy. (le + lo → se)',      answer:'Se lo',   choices:['Se lo','Le lo','Me lo','Te lo'],      fills:['Se lo'],   en:'I give the book to Juan. I give it to him.',    rule:'le + lo → se lo (le becomes se before l-)' },
    { sentence:'Ella les trae las flores. Ella ___ trae. (les + las → se)', answer:'se las', choices:['se las','les las','me las','te las'], fills:['se las'], en:'She brings the flowers to them. She brings them to them.', rule:'les + las → se las (les becomes se)' },
    { sentence:'Les enviamos dinero. ___ enviamos. (les + lo)',         answer:'Se lo',   choices:['Se lo','Les lo','Nos lo','Me lo'],    fills:['Se lo'],   en:'We send money to them. We send it to them.',    rule:'les + lo → se lo' },
    { sentence:'¿Puedes prestar___ el carro? (me + lo, attached)',      answer:'melo',    choices:['melo','lome','mela','telo'],          fills:['melo'],    en:'Can you lend me the car? (attached form)',       rule:'prestármelo — pronoun attached to infinitive' },
    { sentence:'Él va a dar___ la revista. (me + la, attached)',        answer:'mela',    choices:['mela','lame','melo','tela'],          fills:['mela'],    en:'He is going to give me the magazine.',          rule:'dármela — pronoun attached; written accent added' },
    { sentence:'Ella no ___ quería decir. (me + los)',                  answer:'me los',  choices:['me los','me las','se los','te los'],  fills:['me los'],  en:'She didn\'t want to tell them to me.',          rule:'me (to me) + los (them, masc. pl.) → me los' },
    { sentence:'¿___ explicaste? (te + la)',                           answer:'Te la',   choices:['Te la','Se la','Me la','Nos la'],     fills:['Te la'],   en:'Did you explain it to yourself / to you?',      rule:'te (to you) + la (it, fem.) → te la' },
    { sentence:'Ana ___ trae a sus amigas. (les + los → se)',          answer:'se los',  choices:['se los','les los','me los','te los'],  fills:['se los'],  en:'Ana brings them to her friends.',               rule:'les + los → se los' },
  ],
};

/* ════════════════════════════════════════════════════════════════════════════
   Utility — conjugate a regular verb in the imperfect
   ════════════════════════════════════════════════════════════════════════════ */

function conjugateImperfect(stem, type, pronoun) {
  const AR = { 'yo':'-aba','tú':'-abas','él/ella':'-aba','nosotros':'-ábamos','vosotros':'-abais','ellos':'-aban','Ud.':'-aba','Uds.':'-aban','ella':'-aba','ellas':'-aban' };
  const ER = { 'yo':'-ía','tú':'-ías','él/ella':'-ía','nosotros':'-íamos','vosotros':'-íais','ellos':'-ían','Ud.':'-ía','Uds.':'-ían','ella':'-ía','ellas':'-ían' };
  const map = type === 'ar' ? AR : ER;
  const ending = map[pronoun] || '-aba';
  return stem + ending.slice(1);
}

/* ════════════════════════════════════════════════════════════════════════════
   Chapter 15 export
   ════════════════════════════════════════════════════════════════════════════ */

const CHAPTER_15 = {
  id: 15,
  title: 'The Imperfect Tense',
  unlocked: false,
  sublessons: [SUBLESSON_15_1, SUBLESSON_15_2, SUBLESSON_15_3, SUBLESSON_15_4],
};

export default CHAPTER_15;
export { SUBLESSON_15_1, SUBLESSON_15_2, SUBLESSON_15_3, SUBLESSON_15_4, conjugateImperfect };
