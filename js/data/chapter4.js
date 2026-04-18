/* ─── Fluir · Chapter 4 Data ────────────────────────────────────────────────
   Source: Complete Spanish Step-by-Step, Bregstein (McGraw-Hill)
   Chapter 4: Numbers, Dates, and Time
   4 sub-lessons:
     4-1  Cardinal Numbers (0–1,000,000)
     4-2  Ordinal Numbers
     4-3  Dates
     4-4  Telling Time
   ─────────────────────────────────────────────────────────────────────────── */

/* ── Utility: Spanish number words ── */

const ONES = ['','uno','dos','tres','cuatro','cinco','seis','siete','ocho','nueve',
  'diez','once','doce','trece','catorce','quince','dieciséis','diecisiete',
  'dieciocho','diecinueve'];
const TENS = ['','','veinte','treinta','cuarenta','cincuenta','sesenta','setenta','ochenta','noventa'];

/* ════════════════════════════════════════════════════════════════════════════
   SUB-LESSON 4-1 — Cardinal Numbers
   ════════════════════════════════════════════════════════════════════════════ */

const SUBLESSON_4_1 = {
  id: '4-1',
  chapterId: 4,
  title: 'Cardinal Numbers',
  subtitle: '0–1,000,000',

  rules: [
    {
      id: 'r1',
      heading: 'Numbers 0–29',
      body: 'Numbers 16–19 and 21–29 are written as one word. After 15 (quince), numbers combine: diez y seis → dieciséis.',
      examples: [
        { es: 'cero, uno, dos, tres',    en: '0, 1, 2, 3' },
        { es: 'diez, once, doce, trece', en: '10, 11, 12, 13' },
        { es: 'dieciséis',              en: '16 (diez y seis combined)' },
        { es: 'veintitrés',             en: '23 (veinte y tres combined)' },
      ],
    },
    {
      id: 'r2',
      heading: 'Numbers 30–99',
      body: 'From 30 onwards, numbers are written as separate words connected by y. They do NOT combine into one word like 16–29.',
      examples: [
        { es: 'treinta y uno',          en: '31' },
        { es: 'cuarenta y cinco',       en: '45' },
        { es: 'setenta y siete',        en: '77' },
        { es: 'noventa y nueve',        en: '99' },
      ],
      tip: 'Before a masculine noun, uno drops the -o: veintiún años, treinta y un libros.',
    },
    {
      id: 'r3',
      heading: 'Numbers 100–1,000,000',
      body: 'Cien = 100 exactly. Ciento = 100+ (ciento uno = 101). Hundreds from 200–900 agree in gender: doscientos libros / doscientas casas. Spanish counts in thousands, not hundreds, after 1000.',
      examples: [
        { es: 'cien',                   en: '100 (exactly)' },
        { es: 'ciento cincuenta',       en: '150' },
        { es: 'doscientos / doscientas',en: '200 (m/f)' },
        { es: 'mil novecientos noventa y dos', en: '1992' },
      ],
    },
  ],

  /* Cardinal number drills — numeral → Spanish word */
  numberDrills: [
    /* 0–19 */
    { numeral: '0',    spanish: 'cero' },
    { numeral: '1',    spanish: 'uno' },
    { numeral: '2',    spanish: 'dos' },
    { numeral: '3',    spanish: 'tres' },
    { numeral: '4',    spanish: 'cuatro' },
    { numeral: '5',    spanish: 'cinco' },
    { numeral: '6',    spanish: 'seis' },
    { numeral: '7',    spanish: 'siete' },
    { numeral: '8',    spanish: 'ocho' },
    { numeral: '9',    spanish: 'nueve' },
    { numeral: '10',   spanish: 'diez' },
    { numeral: '11',   spanish: 'once' },
    { numeral: '12',   spanish: 'doce' },
    { numeral: '13',   spanish: 'trece' },
    { numeral: '14',   spanish: 'catorce' },
    { numeral: '15',   spanish: 'quince' },
    { numeral: '16',   spanish: 'dieciséis' },
    { numeral: '17',   spanish: 'diecisiete' },
    { numeral: '18',   spanish: 'dieciocho' },
    { numeral: '19',   spanish: 'diecinueve' },
    /* 20–29 */
    { numeral: '20',   spanish: 'veinte' },
    { numeral: '21',   spanish: 'veintiuno' },
    { numeral: '22',   spanish: 'veintidós' },
    { numeral: '23',   spanish: 'veintitrés' },
    { numeral: '25',   spanish: 'veinticinco' },
    { numeral: '26',   spanish: 'veintiséis' },
    { numeral: '29',   spanish: 'veintinueve' },
    /* Tens */
    { numeral: '30',   spanish: 'treinta' },
    { numeral: '40',   spanish: 'cuarenta' },
    { numeral: '50',   spanish: 'cincuenta' },
    { numeral: '60',   spanish: 'sesenta' },
    { numeral: '70',   spanish: 'setenta' },
    { numeral: '80',   spanish: 'ochenta' },
    { numeral: '90',   spanish: 'noventa' },
    /* Compound 30–99 */
    { numeral: '31',   spanish: 'treinta y uno' },
    { numeral: '45',   spanish: 'cuarenta y cinco' },
    { numeral: '52',   spanish: 'cincuenta y dos' },
    { numeral: '67',   spanish: 'sesenta y siete' },
    { numeral: '76',   spanish: 'setenta y seis' },
    { numeral: '83',   spanish: 'ochenta y tres' },
    { numeral: '99',   spanish: 'noventa y nueve' },
    /* Hundreds */
    { numeral: '100',  spanish: 'cien' },
    { numeral: '101',  spanish: 'ciento uno' },
    { numeral: '150',  spanish: 'ciento cincuenta' },
    { numeral: '200',  spanish: 'doscientos' },
    { numeral: '300',  spanish: 'trescientos' },
    { numeral: '400',  spanish: 'cuatrocientos' },
    { numeral: '500',  spanish: 'quinientos' },
    { numeral: '600',  spanish: 'seiscientos' },
    { numeral: '700',  spanish: 'setecientos' },
    { numeral: '800',  spanish: 'ochocientos' },
    { numeral: '900',  spanish: 'novecientos' },
    /* Thousands */
    { numeral: '1.000',  spanish: 'mil' },
    { numeral: '2.000',  spanish: 'dos mil' },
    { numeral: '1.992',  spanish: 'mil novecientos noventa y dos' },
    { numeral: '2.006',  spanish: 'dos mil seis' },
    { numeral: '1.000.000', spanish: 'un millón' },
  ],

  vocabulary: [
    { id:'num4_1',  es:'cero',          en:'zero',          gender:'m', rule:'ends_o',     article:'el', plural:'', ex:'Hay cero problemas.',              exEn:'There are zero problems.' },
    { id:'num4_2',  es:'uno',           en:'one',           gender:'m', rule:'ends_o',     article:'el', plural:'', ex:'Hay un libro en la mesa.',         exEn:'There is one book on the table.' },
    { id:'num4_3',  es:'diez',          en:'ten',           gender:'m', rule:'masc_irreg', article:'el', plural:'', ex:'Hay diez estudiantes.',            exEn:'There are ten students.' },
    { id:'num4_4',  es:'once',          en:'eleven',        gender:'m', rule:'masc_irreg', article:'el', plural:'', ex:'Hay once capítulos.',              exEn:'There are eleven chapters.' },
    { id:'num4_5',  es:'doce',          en:'twelve',        gender:'m', rule:'masc_irreg', article:'el', plural:'', ex:'Hay doce meses en el año.',        exEn:'There are twelve months in the year.' },
    { id:'num4_6',  es:'quince',        en:'fifteen',       gender:'m', rule:'masc_irreg', article:'el', plural:'', ex:'Hay quince días.',                 exEn:'There are fifteen days.' },
    { id:'num4_7',  es:'veinte',        en:'twenty',        gender:'m', rule:'masc_irreg', article:'el', plural:'', ex:'Hay veinte personas.',             exEn:'There are twenty people.' },
    { id:'num4_8',  es:'treinta',       en:'thirty',        gender:'m', rule:'masc_irreg', article:'el', plural:'', ex:'Hay treinta días en septiembre.',  exEn:'There are thirty days in September.' },
    { id:'num4_9',  es:'cuarenta',      en:'forty',         gender:'m', rule:'masc_irreg', article:'el', plural:'', ex:'Hay cuarenta estudiantes.',        exEn:'There are forty students.' },
    { id:'num4_10', es:'cincuenta',     en:'fifty',         gender:'m', rule:'masc_irreg', article:'el', plural:'', ex:'Hay cincuenta preguntas.',         exEn:'There are fifty questions.' },
    { id:'num4_11', es:'sesenta',       en:'sixty',         gender:'m', rule:'masc_irreg', article:'el', plural:'', ex:'Hay sesenta minutos.',             exEn:'There are sixty minutes.' },
    { id:'num4_12', es:'setenta',       en:'seventy',       gender:'m', rule:'masc_irreg', article:'el', plural:'', ex:'Hay setenta páginas.',             exEn:'There are seventy pages.' },
    { id:'num4_13', es:'ochenta',       en:'eighty',        gender:'m', rule:'masc_irreg', article:'el', plural:'', ex:'Hay ochenta árboles.',             exEn:'There are eighty trees.' },
    { id:'num4_14', es:'noventa',       en:'ninety',        gender:'m', rule:'masc_irreg', article:'el', plural:'', ex:'Hay noventa y nueve problemas.',   exEn:'There are ninety-nine problems.' },
    { id:'num4_15', es:'cien',          en:'one hundred',   gender:'m', rule:'masc_irreg', article:'el', plural:'', ex:'Hay cien personas en el restaurante.', exEn:'There are one hundred people in the restaurant.' },
    { id:'num4_16', es:'mil',           en:'one thousand',  gender:'m', rule:'masc_irreg', article:'el', plural:'', ex:'Hay mil años.',                    exEn:'There are one thousand years.' },
    { id:'num4_17', es:'un millón',     en:'one million',   gender:'m', rule:'masc_irreg', article:'el', plural:'', ex:'Hay un millón de personas.',       exEn:'There are one million people.' },
  ],
};

/* ════════════════════════════════════════════════════════════════════════════
   SUB-LESSON 4-2 — Ordinal Numbers
   ════════════════════════════════════════════════════════════════════════════ */

const SUBLESSON_4_2 = {
  id: '4-2',
  chapterId: 4,
  title: 'Ordinal Numbers',
  subtitle: 'primero · segundo · tercero… décimo',

  rules: [
    {
      id: 'r1',
      heading: 'Ordinals 1st–10th',
      body: 'Ordinal numbers precede the noun and agree in gender. Primero and tercero drop the -o before a masculine singular noun.',
      examples: [
        { es: 'el primer piso',    en: 'the first floor', note: 'primero → primer' },
        { es: 'la primera mujer',  en: 'the first woman' },
        { es: 'el tercer día',     en: 'the third day', note: 'tercero → tercer' },
        { es: 'la quinta avenida', en: 'Fifth Avenue' },
      ],
    },
    {
      id: 'r2',
      heading: 'After tenth — use cardinal numbers',
      body: 'For 11th and above, state the noun first, then the cardinal number. Ordinals are only used 1st through 10th in everyday Spanish.',
      examples: [
        { es: 'el piso catorce',    en: 'the fourteenth floor' },
        { es: 'la calle once',      en: 'Eleventh Street' },
        { es: 'la lección veintitrés', en: 'the twenty-third lesson' },
      ],
      tip: 'Ordinals for kings and centuries do follow the noun: Carlos Quinto, el siglo segundo.',
    },
  ],

  ordinalDrills: [
    { numeral:'1st', spanish:'primero/a',  masculine:'primer',   feminine:'primera',  ex:'el primer hombre / la primera mujer' },
    { numeral:'2nd', spanish:'segundo/a',  masculine:'segundo',  feminine:'segunda',  ex:'el segundo mes / la segunda parte' },
    { numeral:'3rd', spanish:'tercero/a',  masculine:'tercer',   feminine:'tercera',  ex:'el tercer día / la tercera semana' },
    { numeral:'4th', spanish:'cuarto/a',   masculine:'cuarto',   feminine:'cuarta',   ex:'el cuarto piso / la cuarta lección' },
    { numeral:'5th', spanish:'quinto/a',   masculine:'quinto',   feminine:'quinta',   ex:'el quinto mes / la quinta avenida' },
    { numeral:'6th', spanish:'sexto/a',    masculine:'sexto',    feminine:'sexta',    ex:'el sexto tren / la sexta calle' },
    { numeral:'7th', spanish:'séptimo/a',  masculine:'séptimo',  feminine:'séptima',  ex:'el séptimo capítulo / la séptima página' },
    { numeral:'8th', spanish:'octavo/a',   masculine:'octavo',   feminine:'octava',   ex:'el octavo libro / la octava pregunta' },
    { numeral:'9th', spanish:'noveno/a',   masculine:'noveno',   feminine:'novena',   ex:'el noveno presidente / la novena fiesta' },
    { numeral:'10th',spanish:'décimo/a',   masculine:'décimo',   feminine:'décima',   ex:'el décimo sueño / la décima razón' },
  ],

  vocabulary: [
    { id:'ord4_1',  es:'primero',   en:'first',   gender:'m', rule:'ends_o', article:'', plural:'', ex:'Soy el primer estudiante.',    exEn:'I am the first student.' },
    { id:'ord4_2',  es:'segundo',   en:'second',  gender:'m', rule:'ends_o', article:'', plural:'', ex:'Es el segundo mes.',           exEn:'It is the second month.' },
    { id:'ord4_3',  es:'tercero',   en:'third',   gender:'m', rule:'ends_o', article:'', plural:'', ex:'Es el tercer capítulo.',       exEn:'It is the third chapter.' },
    { id:'ord4_4',  es:'cuarto',    en:'fourth',  gender:'m', rule:'ends_o', article:'', plural:'', ex:'La oficina está en el cuarto piso.', exEn:'The office is on the fourth floor.' },
    { id:'ord4_5',  es:'quinto',    en:'fifth',   gender:'m', rule:'ends_o', article:'', plural:'', ex:'Mayo es el quinto mes.',       exEn:'May is the fifth month.' },
    { id:'ord4_6',  es:'sexto',     en:'sixth',   gender:'m', rule:'ends_o', article:'', plural:'', ex:'Es el sexto tren.',            exEn:'It is the sixth train.' },
    { id:'ord4_7',  es:'séptimo',   en:'seventh', gender:'m', rule:'ends_o', article:'', plural:'', ex:'Es el séptimo capítulo.',      exEn:'It is the seventh chapter.' },
    { id:'ord4_8',  es:'octavo',    en:'eighth',  gender:'m', rule:'ends_o', article:'', plural:'', ex:'Es la octava pregunta.',       exEn:'It is the eighth question.' },
    { id:'ord4_9',  es:'noveno',    en:'ninth',   gender:'m', rule:'ends_o', article:'', plural:'', ex:'Es el noveno presidente.',     exEn:'It is the ninth president.' },
    { id:'ord4_10', es:'décimo',    en:'tenth',   gender:'m', rule:'ends_o', article:'', plural:'', ex:'Es la décima razón.',          exEn:'It is the tenth reason.' },
  ],
};

/* ════════════════════════════════════════════════════════════════════════════
   SUB-LESSON 4-3 — Dates
   ════════════════════════════════════════════════════════════════════════════ */

const SUBLESSON_4_3 = {
  id: '4-3',
  chapterId: 4,
  title: 'The Date',
  subtitle: '¿Cuál es la fecha de hoy?',

  rules: [
    {
      id: 'r1',
      heading: 'Expressing dates',
      body: 'Spanish uses cardinal numbers (2–31) for all dates except the first of the month, which uses the ordinal primero. The pattern is: el + number + de + month.',
      examples: [
        { es: 'Hoy es el cinco de mayo.',     en: 'Today is May 5.' },
        { es: 'Es el treinta y uno de octubre.', en: 'It is October 31.' },
        { es: 'Hoy es el primero de junio.',  en: 'Today is June 1.', note: 'ordinal for 1st only' },
        { es: 'Mañana es el seis de mayo.',   en: 'Tomorrow is May 6.' },
      ],
      tip: '¿Cuál es la fecha de hoy? = What is today\'s date? — use cuál not qué.',
    },
  ],

  dateDrills: [
    { numeral:'May 5',      spanish:'el cinco de mayo' },
    { numeral:'May 6',      spanish:'el seis de mayo' },
    { numeral:'Feb 28',     spanish:'el veintiocho de febrero' },
    { numeral:'Oct 31',     spanish:'el treinta y uno de octubre' },
    { numeral:'June 1',     spanish:'el primero de junio' },
    { numeral:'Oct 1',      spanish:'el primero de octubre' },
    { numeral:'Dec 14',     spanish:'el catorce de diciembre' },
    { numeral:'March 3',    spanish:'el tres de marzo' },
    { numeral:'Jan 11',     spanish:'el once de enero' },
    { numeral:'Sept 21',    spanish:'el veintiuno de septiembre' },
  ],

  vocabulary: [
    { id:'dt4_1',  es:'la fecha',     en:'the date',       gender:'f', rule:'ends_a',    article:'la', plural:'las fechas',    ex:'¿Cuál es la fecha de hoy?',       exEn:'What is today\'s date?' },
    { id:'dt4_2',  es:'hoy',          en:'today',          gender:'n', rule:'adverb',    article:'',   plural:'',              ex:'Hoy es el cinco de mayo.',        exEn:'Today is May 5.' },
    { id:'dt4_3',  es:'mañana',       en:'tomorrow',       gender:'n', rule:'adverb',    article:'',   plural:'',              ex:'Mañana es el seis de mayo.',      exEn:'Tomorrow is May 6.' },
    { id:'dt4_4',  es:'el nacimiento',en:'the birth',      gender:'m', rule:'masc_irreg',article:'el', plural:'',              ex:'¿Cuál es la fecha de nacimiento?', exEn:'What is the date of birth?' },
    { id:'dt4_5',  es:'el primero',   en:'the first (of the month)', gender:'m', rule:'ends_o', article:'el', plural:'', ex:'Hoy es el primero de junio.', exEn:'Today is June 1.' },
  ],
};

/* ════════════════════════════════════════════════════════════════════════════
   SUB-LESSON 4-4 — Telling Time
   ════════════════════════════════════════════════════════════════════════════ */

const SUBLESSON_4_4 = {
  id: '4-4',
  chapterId: 4,
  title: 'Telling Time',
  subtitle: '¿Qué hora es?',

  rules: [
    {
      id: 'r1',
      heading: '¿Qué hora es? — What time is it?',
      body: 'Use ser to tell time. Es la una for 1 o\'clock. Son las + number for all other hours. La/las represents the hour.',
      examples: [
        { es: 'Es la una.',       en: 'It is one o\'clock.' },
        { es: 'Son las dos.',     en: 'It is two o\'clock.' },
        { es: 'Son las doce.',    en: 'It is twelve o\'clock.' },
        { es: 'de la mañana / tarde / noche', en: 'a.m. / p.m. (afternoon) / p.m. (evening)' },
      ],
    },
    {
      id: 'r2',
      heading: 'Minutes after and before the hour',
      body: 'Add minutes after the hour with y. Subtract minutes before the hour with menos. Special terms: cuarto (quarter), media (half).',
      examples: [
        { es: 'Son las tres y quince.',      en: 'It is 3:15.' },
        { es: 'Son las seis y cuarto.',      en: 'It is 6:15.' },
        { es: 'Son las nueve y treinta.',    en: 'It is 9:30.' },
        { es: 'Son las ocho y media.',       en: 'It is 8:30.' },
      ],
    },
    {
      id: 'r3',
      heading: 'Before the hour — menos',
      body: 'To express time before the next hour, state the upcoming hour minus (menos) the remaining minutes.',
      examples: [
        { es: 'Son las tres menos diez.',    en: 'It is 2:50.' },
        { es: 'Son las nueve menos cuarto.', en: 'It is 8:45.' },
        { es: 'Son las doce menos quince.',  en: 'It is 11:45.' },
        { es: 'A las cuatro y diez.',        en: 'At 4:10.' },
      ],
      tip: 'For at a certain time use a: A la una. A las dos. A las tres y cuarto.',
    },
  ],

  timeDrills: [
    { numeral:'1:00',  spanish:'Es la una.' },
    { numeral:'2:00',  spanish:'Son las dos.' },
    { numeral:'3:00',  spanish:'Son las tres.' },
    { numeral:'5:00',  spanish:'Son las cinco.' },
    { numeral:'12:00', spanish:'Son las doce.' },
    { numeral:'1:20',  spanish:'Es la una y veinte.' },
    { numeral:'3:15',  spanish:'Son las tres y quince.' },
    { numeral:'6:15',  spanish:'Son las seis y cuarto.' },
    { numeral:'8:30',  spanish:'Son las ocho y media.' },
    { numeral:'9:30',  spanish:'Son las nueve y treinta.' },
    { numeral:'2:50',  spanish:'Son las tres menos diez.' },
    { numeral:'8:45',  spanish:'Son las nueve menos cuarto.' },
    { numeral:'11:45', spanish:'Son las doce menos quince.' },
    { numeral:'5:10',  spanish:'Son las cinco y diez.' },
    { numeral:'7:03',  spanish:'Son las siete y tres.' },
    { numeral:'2:00 a.m.', spanish:'Son las dos de la mañana.' },
    { numeral:'1:00 p.m.', spanish:'Es la una de la tarde.' },
    { numeral:'8:00 p.m.', spanish:'Son las ocho de la noche.' },
  ],

  vocabulary: [
    { id:'t4_1',  es:'la hora',          en:'the hour / time',   gender:'f', rule:'ends_a',    article:'la', plural:'las horas',      ex:'¿Qué hora es?',                   exEn:'What time is it?' },
    { id:'t4_2',  es:'el cuarto',        en:'a quarter (15 min)',gender:'m', rule:'ends_o',     article:'el', plural:'',               ex:'Son las seis y cuarto.',           exEn:'It is 6:15.' },
    { id:'t4_3',  es:'la media',         en:'half (30 min)',      gender:'f', rule:'ends_a',    article:'la', plural:'',               ex:'Son las ocho y media.',            exEn:'It is 8:30.' },
    { id:'t4_4',  es:'menos',            en:'minus / to (time)', gender:'n', rule:'adverb',     article:'',   plural:'',               ex:'Son las tres menos diez.',         exEn:'It is 2:50.' },
    { id:'t4_5',  es:'de la mañana',     en:'in the morning (a.m.)', gender:'n', rule:'phrase', article:'', plural:'',                ex:'Son las dos de la mañana.',        exEn:'It is two in the morning.' },
    { id:'t4_6',  es:'de la tarde',      en:'in the afternoon (p.m.)', gender:'n', rule:'phrase', article:'', plural:'',             ex:'Es la una de la tarde.',           exEn:'It is one in the afternoon.' },
    { id:'t4_7',  es:'de la noche',      en:'at night (p.m.)',   gender:'n', rule:'phrase',     article:'',   plural:'',               ex:'Son las ocho de la noche.',        exEn:'It is eight at night.' },
    { id:'t4_8',  es:'en punto',         en:'sharp / exactly',   gender:'n', rule:'phrase',     article:'',   plural:'',               ex:'Son las diez en punto.',           exEn:'It is ten o\'clock sharp.' },
    { id:'t4_9',  es:'a eso de',         en:'at about',          gender:'n', rule:'phrase',     article:'',   plural:'',               ex:'Es a eso de la una.',              exEn:'It is about one o\'clock.' },
    { id:'t4_10', es:'mediodía',         en:'midday / noon',     gender:'m', rule:'masc_irreg', article:'el', plural:'',               ex:'Es mediodía.',                     exEn:'It is noon.' },
    { id:'t4_11', es:'medianoche',       en:'midnight',          gender:'f', rule:'fem_irreg',  article:'la', plural:'',               ex:'Es medianoche.',                   exEn:'It is midnight.' },
    { id:'t4_12', es:'temprano',         en:'early',             gender:'n', rule:'adverb',     article:'',   plural:'',               ex:'Es temprano.',                     exEn:'It is early.' },
    { id:'t4_13', es:'tarde',            en:'late',              gender:'n', rule:'adverb',     article:'',   plural:'',               ex:'Es tarde.',                        exEn:'It is late.' },
    /* Restaurant vocabulary from reading */
    { id:'t4_14', es:'el camarero',      en:'the waiter',        gender:'m', rule:'ends_o',     article:'el', plural:'los camareros',  ex:'Hay cinco camareros excelentes.',  exEn:'There are five excellent waiters.' },
    { id:'t4_15', es:'la mesa',          en:'the table',         gender:'f', rule:'ends_a',     article:'la', plural:'las mesas',      ex:'Hay dieciocho mesas.',             exEn:'There are eighteen tables.' },
    { id:'t4_16', es:'el menú',          en:'the menu',          gender:'m', rule:'masc_irreg', article:'el', plural:'los menús',      ex:'¿Qué hay en el menú?',             exEn:'What is there on the menu?' },
    { id:'t4_17', es:'el plato',         en:'the plate / dish',  gender:'m', rule:'ends_o',     article:'el', plural:'los platos',     ex:'El plato del día es excelente.',   exEn:'The dish of the day is excellent.' },
    { id:'t4_18', es:'el postre',        en:'the dessert',       gender:'m', rule:'ends_e',     article:'el', plural:'los postres',    ex:'Hay torta y helado para el postre.', exEn:'There is cake and ice cream for dessert.' },
    { id:'t4_19', es:'la propina',       en:'the tip',           gender:'f', rule:'ends_a',     article:'la', plural:'las propinas',   ex:'La propina es para el camarero.',  exEn:'The tip is for the waiter.' },
    { id:'t4_20', es:'la servilleta',    en:'the napkin',        gender:'f', rule:'ends_a',     article:'la', plural:'las servilletas',ex:'La servilleta está en la mesa.',   exEn:'The napkin is on the table.' },
    { id:'t4_21', es:'el tenedor',       en:'the fork',          gender:'m', rule:'masc_irreg', article:'el', plural:'los tenedores',  ex:'El tenedor está en la mesa.',      exEn:'The fork is on the table.' },
    { id:'t4_22', es:'el cuchillo',      en:'the knife',         gender:'m', rule:'ends_o',     article:'el', plural:'los cuchillos',  ex:'El cuchillo está en la mesa.',     exEn:'The knife is on the table.' },
    { id:'t4_23', es:'la cuchara',       en:'the spoon',         gender:'f', rule:'ends_a',     article:'la', plural:'las cucharas',   ex:'La cuchara está en la mesa.',      exEn:'The spoon is on the table.' },
    { id:'t4_24', es:'el vaso',          en:'the glass',         gender:'m', rule:'ends_o',     article:'el', plural:'los vasos',      ex:'Hay dos vasos en la mesa.',        exEn:'There are two glasses on the table.' },
  ],
};

/* ════════════════════════════════════════════════════════════════════════════
   Chapter 4 export
   ════════════════════════════════════════════════════════════════════════════ */

const CHAPTER_4 = {
  id: 4,
  title: 'Numbers, Dates, and Time',
  unlocked: false,
  sublessons: [SUBLESSON_4_1, SUBLESSON_4_2, SUBLESSON_4_3, SUBLESSON_4_4],
};

export default CHAPTER_4;
export { SUBLESSON_4_1, SUBLESSON_4_2, SUBLESSON_4_3, SUBLESSON_4_4 };
