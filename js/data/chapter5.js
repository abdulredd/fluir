/* ─── Fluir · Chapter 5 Data ────────────────────────────────────────────────
   Source: Complete Spanish Step-by-Step, Bregstein (McGraw-Hill)
   Chapter 5: Regular Verbs
   4 sub-lessons:
     5-1  -ar Verbs
     5-2  -er and -ir Verbs
     5-3  Multi-meaning Verbs
     5-4  Mixed Conjugation Drill
   ─────────────────────────────────────────────────────────────────────────── */

/* ════════════════════════════════════════════════════════════════════════════
   SUB-LESSON 5-1 — -ar Verbs
   ════════════════════════════════════════════════════════════════════════════ */

const SUBLESSON_5_1 = {
  id: '5-1',
  chapterId: 5,
  title: '-ar Verbs',
  subtitle: 'canto · cantas · canta · cantamos · cantáis · cantan',

  rules: [
    {
      id: 'r1',
      heading: 'How the present tense works',
      body: 'The Spanish present tense covers both the English simple present and the present progressive. One form, two translations.',
      examples: [
        { es: 'Ella canta una canción triste.', en: 'She sings a sad song. / She is singing a sad song.' },
        { es: 'No canto en el tren.',          en: 'I don\'t sing on the train.', note: 'no + verb = negation' },
        { es: '¿Cantas tú los domingos?',      en: 'Do you sing on Sundays?' },
      ],
    },
    {
      id: 'r2',
      heading: '-ar verb endings',
      body: 'Drop the -ar and add: -o, -as, -a, -amos, -áis, -an. The stem never changes for regular verbs.',
      examples: [
        { es: 'yo canto',         en: 'I sing' },
        { es: 'tú cantas',        en: 'you sing' },
        { es: 'él/ella canta',    en: 'he/she sings' },
        { es: 'nosotros cantamos',en: 'we sing' },
        { es: 'ellos cantan',     en: 'they sing' },
      ],
      tip: 'All -ar verbs follow this same pattern. Learn the pattern once, apply it to all.',
    },
  ],

  verbs: [
    { infinitive:'bailar',    en:'to dance',           stem:'bail', type:'ar', ex:'Ella baila en la fiesta.',        exEn:'She dances at the party.' },
    { infinitive:'bajar',     en:'to go down',         stem:'baj',  type:'ar', ex:'Bajamos al primer piso.',         exEn:'We go down to the first floor.' },
    { infinitive:'caminar',   en:'to walk',            stem:'camin',type:'ar', ex:'Camino a la escuela.',           exEn:'I walk to school.' },
    { infinitive:'cantar',    en:'to sing',            stem:'cant', type:'ar', ex:'¿Cantas tú los domingos?',       exEn:'Do you sing on Sundays?' },
    { infinitive:'cocinar',   en:'to cook',            stem:'cocin',type:'ar', ex:'Él cocina en la cocina.',        exEn:'He cooks in the kitchen.' },
    { infinitive:'comprar',   en:'to buy',             stem:'compr',type:'ar', ex:'Compramos la casa.',             exEn:'We buy the house.' },
    { infinitive:'contestar', en:'to answer',          stem:'contest',type:'ar',ex:'Roberto contesta las preguntas.',exEn:'Roberto answers the questions.' },
    { infinitive:'descansar', en:'to rest',            stem:'descans',type:'ar',ex:'Descansamos en la cama.',       exEn:'We rest in bed.' },
    { infinitive:'entrar',    en:'to enter',           stem:'entr', type:'ar', ex:'Los estudiantes entran al salón.',exEn:'The students enter the classroom.' },
    { infinitive:'escuchar',  en:'to listen to',       stem:'escuch',type:'ar', ex:'Escucho la música a las ocho.', exEn:'I listen to music at eight.' },
    { infinitive:'estudiar',  en:'to study',           stem:'estudi',type:'ar', ex:'Ella estudia mucho.',           exEn:'She studies a lot.' },
    { infinitive:'hablar',    en:'to speak / to talk', stem:'habl', type:'ar', ex:'Hablan español en la clase.',    exEn:'They speak Spanish in class.' },
    { infinitive:'limpiar',   en:'to clean',           stem:'limpi', type:'ar', ex:'Limpiamos el apartamento.',     exEn:'We clean the apartment.' },
    { infinitive:'llegar',    en:'to arrive',          stem:'llega', type:'ar', ex:'María llega a casa a las seis.',exEn:'María arrives home at six.' },
    { infinitive:'mirar',     en:'to look at / watch', stem:'mir',  type:'ar', ex:'Miro la televisión los domingos.',exEn:'I watch TV on Sundays.' },
    { infinitive:'nadar',     en:'to swim',            stem:'nad',  type:'ar', ex:'Ricardo nada en la piscina.',    exEn:'Ricardo swims in the pool.' },
    { infinitive:'practicar', en:'to practice',        stem:'practic',type:'ar',ex:'Los músicos practican el piano.',exEn:'The musicians practice the piano.' },
    { infinitive:'regresar',  en:'to return',          stem:'regres',type:'ar', ex:'Regresamos a casa a las cinco.',exEn:'We return home at five.' },
    { infinitive:'trabajar',  en:'to work',            stem:'trabaj',type:'ar', ex:'Enrique trabaja en un restaurante.',exEn:'Enrique works in a restaurant.' },
    { infinitive:'viajar',    en:'to travel',          stem:'viaj', type:'ar', ex:'Viajamos mucho en el verano.',   exEn:'We travel a lot in summer.' },
  ],

  conjugations: [
    { pronoun:'yo',       ending:'-o',   note:'drop -ar, add -o' },
    { pronoun:'tú',       ending:'-as',  note:'drop -ar, add -as' },
    { pronoun:'él/ella',  ending:'-a',   note:'drop -ar, add -a' },
    { pronoun:'nosotros', ending:'-amos',note:'drop -ar, add -amos' },
    { pronoun:'vosotros', ending:'-áis', note:'drop -ar, add -áis' },
    { pronoun:'ellos',    ending:'-an',  note:'drop -ar, add -an' },
  ],
};

/* ════════════════════════════════════════════════════════════════════════════
   SUB-LESSON 5-2 — -er and -ir Verbs
   ════════════════════════════════════════════════════════════════════════════ */

const SUBLESSON_5_2 = {
  id: '5-2',
  chapterId: 5,
  title: '-er and -ir Verbs',
  subtitle: 'como · comes · come · comemos · coméis · comen',

  rules: [
    {
      id: 'r1',
      heading: '-er verb endings',
      body: 'Drop the -er and add: -o, -es, -e, -emos, -éis, -en. Note: -er and -ar both use -o for yo, but -er uses -es/-e instead of -as/-a.',
      examples: [
        { es: 'yo como',         en: 'I eat' },
        { es: 'tú comes',        en: 'you eat' },
        { es: 'él/ella come',    en: 'he/she eats' },
        { es: 'nosotros comemos',en: 'we eat' },
        { es: 'ellos comen',     en: 'they eat' },
      ],
    },
    {
      id: 'r2',
      heading: '-ir verb endings',
      body: '-ir verbs are almost identical to -er verbs. The only difference is nosotros (-imos not -emos) and vosotros (-ís not -éis).',
      examples: [
        { es: 'yo vivo',         en: 'I live' },
        { es: 'tú vives',        en: 'you live' },
        { es: 'nosotros vivimos',en: 'we live', note: '-imos not -emos' },
        { es: 'vosotros vivís',  en: 'you (pl.) live', note: '-ís not -éis' },
        { es: 'ellos viven',     en: 'they live' },
      ],
      tip: '-er and -ir endings are identical EXCEPT nosotros and vosotros. Everything else is the same.',
    },
  ],

  verbs: [
    /* -er verbs */
    { infinitive:'aprender',   en:'to learn',          stem:'aprend', type:'er', ex:'Aprendemos mucho en la clase.',  exEn:'We learn a lot in class.' },
    { infinitive:'beber',      en:'to drink',          stem:'beb',    type:'er', ex:'Mariana bebe ocho vasos de agua.',exEn:'Mariana drinks eight glasses of water.' },
    { infinitive:'comer',      en:'to eat',            stem:'com',    type:'er', ex:'Comemos en restaurantes excelentes.',exEn:'We eat at excellent restaurants.' },
    { infinitive:'comprender', en:'to understand',     stem:'comprend',type:'er',ex:'Comprenden las ideas difíciles.',exEn:'They understand the difficult ideas.' },
    { infinitive:'correr',     en:'to run',            stem:'corr',   type:'er', ex:'¿Quién corre más rápido?',       exEn:'Who runs faster?' },
    { infinitive:'leer',       en:'to read',           stem:'le',     type:'er', ex:'Leo un libro cada semana.',      exEn:'I read a book each week.' },
    { infinitive:'meter',      en:'to put in',         stem:'met',    type:'er', ex:'Meto los libros en la bolsa.',   exEn:'I put the books in the bag.' },
    { infinitive:'prender',    en:'to turn on',        stem:'prend',  type:'er', ex:'Prendes la televisión.',         exEn:'You turn on the television.' },
    { infinitive:'romper',     en:'to break',          stem:'romp',   type:'er', ex:'Los niños rompen los vasos.',    exEn:'The children break the glasses.' },
    { infinitive:'vender',     en:'to sell',           stem:'vend',   type:'er', ex:'Él vende carros en la ciudad.',  exEn:'He sells cars in the city.' },
    /* -ir verbs */
    { infinitive:'abrir',      en:'to open',           stem:'abr',    type:'ir', ex:'Abro la puerta a las ocho.',     exEn:'I open the door at eight.' },
    { infinitive:'compartir',  en:'to share',          stem:'compart',type:'ir', ex:'Compartimos la comida.',         exEn:'We share the food.' },
    { infinitive:'decidir',    en:'to decide',         stem:'decid',  type:'ir', ex:'¿Por qué decides estudiar español?',exEn:'Why do you decide to study Spanish?' },
    { infinitive:'describir',  en:'to describe',       stem:'describ',type:'ir', ex:'Él describe la ciudad.',         exEn:'He describes the city.' },
    { infinitive:'discutir',   en:'to discuss',        stem:'discut', type:'ir', ex:'Discutimos las noticias del día.',exEn:'We discuss the news of the day.' },
    { infinitive:'escribir',   en:'to write',          stem:'escrib', type:'ir', ex:'¿Escribes con pluma o computadora?',exEn:'Do you write with a pen or computer?' },
    { infinitive:'recibir',    en:'to receive',        stem:'recib',  type:'ir', ex:'Cecilia recibe muchas cartas.',   exEn:'Cecilia receives many letters.' },
    { infinitive:'subir',      en:'to go up',          stem:'sub',    type:'ir', ex:'Subimos al noveno piso.',        exEn:'We go up to the ninth floor.' },
    { infinitive:'sufrir',     en:'to suffer',         stem:'sufr',   type:'ir', ex:'El hombre sufre mucho.',         exEn:'The man suffers a lot.' },
    { infinitive:'vivir',      en:'to live',           stem:'viv',    type:'ir', ex:'Ella trabaja en la ciudad pero vive en el campo.',exEn:'She works in the city but lives in the countryside.' },
  ],
};

/* ════════════════════════════════════════════════════════════════════════════
   SUB-LESSON 5-3 — Multi-meaning Verbs
   ════════════════════════════════════════════════════════════════════════════ */

const SUBLESSON_5_3 = {
  id: '5-3',
  chapterId: 5,
  title: 'Multi-meaning Verbs',
  subtitle: 'deber · ganar · llevar · pasar · tocar',

  rules: [
    {
      id: 'r1',
      heading: 'Some verbs have more than one English meaning',
      body: 'These five verbs each have two or more distinct meanings in English depending on context. They conjugate as regular -ar or -er verbs — the trick is knowing which meaning applies.',
      examples: [
        { es: 'Ella debe comer mejor.',    en: 'She ought to eat better. (deber = should)' },
        { es: 'Él debe mucho dinero.',     en: 'He owes a lot of money. (deber = to owe)' },
        { es: 'Llevo una bolsa a la tienda.', en: 'I carry a bag to the store. (llevar = carry)' },
        { es: 'Ella no lleva un abrigo.',  en: 'She isn\'t wearing a coat. (llevar = wear)' },
      ],
    },
    {
      id: 'r2',
      heading: 'Ganar, pasar, tocar',
      body: 'Ganar = to win or to earn. Pasar = to pass, to happen, or to spend time. Tocar = to touch or to play an instrument.',
      examples: [
        { es: 'Cecilia siempre gana el primer premio.', en: 'Cecilia always wins first prize.' },
        { es: 'Raúl gana quinientos dólares.',          en: 'Raúl earns 500 dollars.' },
        { es: '¿Qué pasa?',                            en: 'What\'s happening?' },
        { es: 'Él toca el piano muy bien.',             en: 'He plays the piano very well.' },
      ],
      tip: 'Context determines meaning. ¿Qué pasa? always means "what\'s happening?" — very common in everyday Spanish.',
    },
  ],

  verbs: [
    { infinitive:'deber',  en:'should / to owe',              stem:'deb',  type:'er',
      meanings:[ 'should / ought to (+ infinitive)', 'to owe (money)' ],
      ex:'Ella debe comer mejor. Él debe mucho dinero.',
      exEn:'She ought to eat better. He owes a lot of money.' },
    { infinitive:'ganar',  en:'to win / to earn',             stem:'gan',  type:'ar',
      meanings:[ 'to win (a prize, game)', 'to earn (money)' ],
      ex:'Cecilia gana el primer premio. Raúl gana quinientos dólares.',
      exEn:'Cecilia wins first prize. Raúl earns five hundred dollars.' },
    { infinitive:'llevar', en:'to carry / to wear',           stem:'llev', type:'ar',
      meanings:[ 'to carry (an object)', 'to wear (clothing)' ],
      ex:'Llevo una bolsa. Ella no lleva un abrigo.',
      exEn:'I carry a bag. She isn\'t wearing a coat.' },
    { infinitive:'pasar',  en:'to pass / to happen / to spend (time)', stem:'pas', type:'ar',
      meanings:[ 'to pass (by)', 'to happen', 'to spend (time)' ],
      ex:'¿Qué pasa? El tiempo pasa. Pasa mucho tiempo aquí.',
      exEn:'What\'s happening? Time passes. She spends a lot of time here.' },
    { infinitive:'tocar',  en:'to touch / to play (instrument)', stem:'toc', type:'ar',
      meanings:[ 'to touch', 'to play (an instrument)' ],
      ex:'No toco el piano. Toca la guitarra muy bien.',
      exEn:'I don\'t play the piano. He plays the guitar very well.' },
  ],

  /* Additional vocabulary from reading comprehension */
  vocabulary: [
    { id:'v5_1',  es:'el premio',    en:'the prize / award',  gender:'m', rule:'ends_o',     article:'el', plural:'los premios',   ex:'Cecilia gana el primer premio.', exEn:'Cecilia wins first prize.' },
    { id:'v5_2',  es:'el dólar',     en:'the dollar',         gender:'m', rule:'masc_irreg',  article:'el', plural:'los dólares',   ex:'Raúl gana quinientos dólares.', exEn:'Raúl earns five hundred dollars.' },
    { id:'v5_3',  es:'el abrigo',    en:'the coat',           gender:'m', rule:'ends_o',      article:'el', plural:'los abrigos',   ex:'Ella no lleva un abrigo hoy.', exEn:'She isn\'t wearing a coat today.' },
    { id:'v5_4',  es:'el tiempo',    en:'the time / weather', gender:'m', rule:'ends_o',      article:'el', plural:'',             ex:'El tiempo pasa.',              exEn:'Time passes.' },
    { id:'v5_5',  es:'el turista',   en:'the tourist',        gender:'m', rule:'ista_gender', article:'el', plural:'los turistas',  ex:'Ella pasa tiempo con los turistas.', exEn:'She spends time with the tourists.' },
    { id:'v5_6',  es:'la guitarra',  en:'the guitar',         gender:'f', rule:'ends_a',      article:'la', plural:'las guitarras', ex:'Él toca la guitarra muy bien.', exEn:'He plays the guitar very well.' },
    { id:'v5_7',  es:'el piano',     en:'the piano',          gender:'m', rule:'ends_o',      article:'el', plural:'los pianos',    ex:'Los estudiantes practican el piano.', exEn:'The students practice the piano.' },
    { id:'v5_8',  es:'la piscina',   en:'the swimming pool',  gender:'f', rule:'ends_a',      article:'la', plural:'las piscinas',  ex:'Ricardo nada en la piscina.',  exEn:'Ricardo swims in the pool.' },
    { id:'v5_9',  es:'el cocinero',  en:'the cook / chef',    gender:'m', rule:'ends_o',      article:'el', plural:'los cocineros', ex:'Él es cocinero y cocina en la cocina.', exEn:'He is a cook and cooks in the kitchen.' },
    { id:'v5_10', es:'sucio',        en:'dirty',              gender:'m', rule:'ends_o',      article:'',   plural:'sucios',        ex:'Limpiamos el apartamento cuando está sucio.', exEn:'We clean the apartment when it is dirty.' },
  ],
};

/* ════════════════════════════════════════════════════════════════════════════
   SUB-LESSON 5-4 — Mixed Conjugation Drill
   ════════════════════════════════════════════════════════════════════════════ */

const SUBLESSON_5_4 = {
  id: '5-4',
  chapterId: 5,
  title: 'Mixed Conjugation Drill',
  subtitle: 'All -ar, -er, -ir verbs · All pronouns',

  rules: [
    {
      id: 'r1',
      heading: 'Putting it all together',
      body: 'All three verb types (-ar, -er, -ir) share the same yo ending (-o) and the same ellos/ellas/Uds. pattern. The middle forms differ slightly between types.',
      examples: [
        { es: 'yo: -o (all types)',           en: 'canto / como / vivo' },
        { es: 'tú: -as / -es / -es',          en: 'cantas / comes / vives' },
        { es: 'nosotros: -amos / -emos / -imos', en: 'cantamos / comemos / vivimos' },
        { es: 'ellos: -an / -en / -en',        en: 'cantan / comen / viven' },
      ],
      tip: 'The key difference: nosotros. -ar → -amos, -er → -emos, -ir → -imos.',
    },
  ],

  /* All verbs from 5-1, 5-2, 5-3 collected for mixed drill — built dynamically in lesson.js */
  allVerbInfinitives: [
    /* -ar */
    'bailar','bajar','caminar','cantar','cocinar','comprar','contestar',
    'descansar','entrar','escuchar','estudiar','hablar','limpiar','llegar',
    'mirar','nadar','practicar','regresar','trabajar','viajar',
    'deber','ganar','llevar','pasar','tocar',
    /* -er */
    'aprender','beber','comer','comprender','correr','leer','meter',
    'prender','romper','vender',
    /* -ir */
    'abrir','compartir','decidir','describir','discutir','escribir',
    'recibir','subir','sufrir','vivir',
  ],
};

/* ════════════════════════════════════════════════════════════════════════════
   All verbs with conjugation data — used by lesson.js for drill questions
   ════════════════════════════════════════════════════════════════════════════ */

const ALL_VERBS_CH5 = [
  ...SUBLESSON_5_1.verbs,
  ...SUBLESSON_5_2.verbs,
  ...SUBLESSON_5_3.verbs.map(v => ({ ...v })),
];

/* Build a conjugation entry for any regular verb given a pronoun */
function conjugate(stem, type, pronoun) {
  const AR = { 'yo':'-o','tú':'-as','él/ella':'-a','nosotros':'-amos','vosotros':'-áis','ellos':'-an','Ud.':'-a','Uds.':'-an','ella':'-a','ellas':'-an' };
  const ER = { 'yo':'-o','tú':'-es','él/ella':'-e','nosotros':'-emos','vosotros':'-éis','ellos':'-en','Ud.':'-e','Uds.':'-en','ella':'-e','ellas':'-en' };
  const IR = { 'yo':'-o','tú':'-es','él/ella':'-e','nosotros':'-imos','vosotros':'-ís','ellos':'-en','Ud.':'-e','Uds.':'-en','ella':'-e','ellas':'-en' };
  const map = type === 'ar' ? AR : type === 'er' ? ER : IR;
  const ending = map[pronoun] || '-o';
  return stem + ending.slice(1);
}

/* ════════════════════════════════════════════════════════════════════════════
   Chapter 5 export
   ════════════════════════════════════════════════════════════════════════════ */

const CHAPTER_5 = {
  id: 5,
  title: 'Regular Verbs',
  unlocked: false,
  sublessons: [SUBLESSON_5_1, SUBLESSON_5_2, SUBLESSON_5_3, SUBLESSON_5_4],
};

export default CHAPTER_5;
export { SUBLESSON_5_1, SUBLESSON_5_2, SUBLESSON_5_3, SUBLESSON_5_4, ALL_VERBS_CH5, conjugate };
