/* ─── Fluir · Chapter 3 Data ────────────────────────────────────────────────
   Source: Complete Spanish Step-by-Step, Bregstein (McGraw-Hill)
   Chapter 3: Hay, Interrogative Words, Days, and Months
   4 sub-lessons:
     3-1  Hay (there is / there are)
     3-2  Interrogative Words
     3-3  Days, Months & Seasons
     3-4  Vocabulary (nouns, adjectives, conjunctions)
   ─────────────────────────────────────────────────────────────────────────── */

/* ════════════════════════════════════════════════════════════════════════════
   SUB-LESSON 3-1 — Hay
   ════════════════════════════════════════════════════════════════════════════ */

const SUBLESSON_3_1 = {
  id: '3-1',
  chapterId: 3,
  title: 'Hay',
  subtitle: 'There is · There are · Is there? · Are there?',

  rules: [
    {
      id: 'r1',
      heading: 'Hay — one word, four meanings',
      body: 'The word hay covers "there is," "there are," "is there?", and "are there?" in English. It never changes form — singular and plural use the same word.',
      examples: [
        { es: 'Hay una alfombra en la casa.',  en: 'There is a rug in the house.' },
        { es: 'Hay dos vasos en la mesa.',     en: 'There are two glasses on the table.' },
        { es: '¿Hay un hotel en la ciudad?',   en: 'Is there a hotel in the city?' },
        { es: '¿Hay periódicos en la tienda?', en: 'Are there newspapers in the store?' },
      ],
    },
    {
      id: 'r2',
      heading: 'Hay + plural nouns — no article',
      body: 'When hay is followed by a plural noun referring to things in general, the indefinite article is omitted. The definite article (el, la, los, las) NEVER follows hay.',
      examples: [
        { es: 'Hay tigres en el zoológico.',  en: 'There are tigers in the zoo.', note: 'no article before tigres' },
        { es: 'Hay estrellas en el cielo.',   en: 'There are stars in the sky.' },
        { es: 'Hay flores en el jardín.',     en: 'There are flowers in the garden.' },
      ],
      tip: 'Compare: Hay un gato (one cat, indefinite) vs Hay gatos (cats in general, no article).',
    },
    {
      id: 'r3',
      heading: 'No hay — negation',
      body: 'To make a hay sentence negative, simply place no before hay. No hay = there is no / there are no.',
      examples: [
        { es: 'No hay luz en el baño.',       en: 'There is no light in the bathroom.' },
        { es: 'No hay teléfonos aquí.',       en: 'There are no telephones here.' },
        { es: 'No hay revistas en el hotel.', en: 'There are no magazines in the hotel.' },
      ],
    },
  ],

  vocabulary: [
    { id:'h3_1',  es:'hay',           en:'there is / there are',  gender:'n', rule:'invariable', article:'', plural:'', ex:'Hay una lámpara azul en la casa.', exEn:'There is a blue lamp in the house.' },
    { id:'h3_2',  es:'no hay',        en:'there is no / there are no', gender:'n', rule:'invariable', article:'', plural:'', ex:'No hay luz en el baño.', exEn:'There is no light in the bathroom.' },
    { id:'h3_3',  es:'árbol',      en:'the tree',              gender:'m', rule:'masc_irreg',  article:'el', plural:'árboles', ex:'Hay un árbol en el jardín.',  exEn:'There is a tree in the garden.' },
    { id:'h3_4',  es:'vaso',       en:'the glass (cup)',             gender:'m', rule:'ends_o',      article:'el', plural:'vasos',   ex:'Hay dos vasos en la mesa.',  exEn:'There are two glasses on the table.' },
    { id:'h3_5',  es:'piso',       en:'the floor',             gender:'m', rule:'ends_o',      article:'el', plural:'pisos',   ex:'Hay tres libros en el piso.', exEn:'There are three books on the floor.' },
    { id:'h3_6',  es:'cuarto',     en:'the room',              gender:'m', rule:'ends_o',      article:'el', plural:'cuartos', ex:'Hay una mesa marrón en el cuarto.', exEn:'There is a brown table in the room.' },
    { id:'h3_7',  es:'zoológico',  en:'the zoo',               gender:'m', rule:'ends_o',      article:'el', plural:'zoológicos', ex:'Hay tigres en el zoológico.', exEn:'There are tigers in the zoo.' },
    { id:'h3_8',  es:'cielo',      en:'the sky',               gender:'m', rule:'ends_o',      article:'el', plural:'cielos',  ex:'Hay estrellas en el cielo.', exEn:'There are stars in the sky.' },
    { id:'h3_9',  es:'mercado',    en:'the market',            gender:'m', rule:'ends_o',      article:'el', plural:'mercados', ex:'Hay tomates rojos en este mercado.', exEn:'There are red tomatoes in this market.' },
    { id:'h3_10', es:'periódico',  en:'the newspaper',         gender:'m', rule:'ends_o',      article:'el', plural:'periódicos', ex:'Hay periódicos en la tienda.', exEn:'There are newspapers in the store.' },
    { id:'h3_11', es:'revista',    en:'the magazine',          gender:'f', rule:'ends_a',      article:'la', plural:'revistas', ex:'No hay revistas en el hotel.', exEn:'There are no magazines in the hotel.' },
    { id:'h3_12', es:'luz',        en:'the light',             gender:'f', rule:'fem_irreg',   article:'la', plural:'luces',   ex:'No hay luz en el baño.',     exEn:'There is no light in the bathroom.' },
    { id:'h3_13', es:'balcón',     en:'the balcony',           gender:'m', rule:'masc_irreg',  article:'el', plural:'balcones', ex:'Hay flores en el balcón.', exEn:'There are flowers on the balcony.' },
  ],

  /* Hay sentence drills */
  hayDrills: [
    { es:'Hay una alfombra en la casa.',    en:'There is a rug in the house.',        isQuestion:false, isNeg:false },
    { es:'Hay un árbol en el jardín.',      en:'There is a tree in the garden.',      isQuestion:false, isNeg:false },
    { es:'Hay dos vasos en la mesa.',       en:'There are two glasses on the table.', isQuestion:false, isNeg:false },
    { es:'¿Hay un hotel en la ciudad?',     en:'Is there a hotel in the city?',       isQuestion:true,  isNeg:false },
    { es:'¿Hay clase hoy?',                 en:'Is there class today?',               isQuestion:true,  isNeg:false },
    { es:'No hay luz en el baño.',          en:'There is no light in the bathroom.',   isQuestion:false, isNeg:true  },
    { es:'No hay revistas en el hotel.',    en:'There are no magazines in the hotel.', isQuestion:false, isNeg:true  },
    { es:'Hay tigres en el zoológico.',     en:'There are tigers in the zoo.',         isQuestion:false, isNeg:false },
    { es:'¿Hay periódicos en esta tienda?', en:'Are there newspapers in this store?',  isQuestion:true,  isNeg:false },
    { es:'No hay teléfonos aquí.',          en:'There are no telephones here.',         isQuestion:false, isNeg:true  },
    { es:'¿Hay una lección fácil en el libro?', en:'Is there an easy lesson in the book?', isQuestion:true, isNeg:false },
    { es:'Hay flores en el balcón del apartamento.', en:'There are flowers on the apartment balcony.', isQuestion:false, isNeg:false },
    { es:'¿Hay más preguntas de los estudiantes?', en:'Are there more questions from the students?', isQuestion:true, isNeg:false },
  ],
};

/* ════════════════════════════════════════════════════════════════════════════
   SUB-LESSON 3-2 — Interrogative Words
   ════════════════════════════════════════════════════════════════════════════ */

const SUBLESSON_3_2 = {
  id: '3-2',
  chapterId: 3,
  title: 'Interrogative Words',
  subtitle: '¿Cómo? · ¿Dónde? · ¿Qué? · ¿Cuál? · ¿Cuánto? · ¿Cuándo? · ¿Por qué?',

  rules: [
    {
      id: 'r1',
      heading: 'All interrogative words carry written accents',
      body: 'Every interrogative word in Spanish has an accent mark. The accent marks do not change pronunciation — they simply distinguish question words from their non-question counterparts.',
      examples: [
        { es: '¿Cómo estás?',         en: 'How are you?' },
        { es: '¿Dónde está la casa?',  en: 'Where is the house?' },
        { es: '¿Quién está aquí?',     en: 'Who is here?' },
        { es: '¿Qué día es hoy?',      en: 'What day is today?' },
      ],
    },
    {
      id: 'r2',
      heading: '¿Qué? vs ¿Cuál?',
      body: '¿Qué? before ser asks for a definition. ¿Cuál? before ser asks for a selection or choice from among possibilities — often translated as "which" or "what" in English.',
      examples: [
        { es: '¿Qué es comunicación?',      en: 'What is communication? (definition)' },
        { es: '¿Cuál es la capital de Perú?', en: 'What (which city) is the capital of Peru?' },
        { es: '¿Cuál es el problema?',       en: 'What (which) is the problem?' },
        { es: '¿Cuáles son los días?',       en: 'Which ones are the days?' },
      ],
      tip: '¿Cuánto? = how much (singular). ¿Cuántos/Cuántas? = how many (agree in gender with the noun). Remember: ¿por qué? (why) always has an accent; porque (because) never does.',
    },
    {
      id: 'r3',
      heading: 'Prepositions + interrogatives',
      body: 'Prepositions can combine with interrogatives. In Spanish, a sentence can never end with a preposition — it always comes before the interrogative word.',
      examples: [
        { es: '¿De dónde es el hombre?',     en: 'Where is the man from?' },
        { es: '¿De qué color es la mesa?',   en: 'What color is the table?' },
        { es: '¿De quién es la idea?',       en: 'Whose idea is it?' },
        { es: '¿Con quién estás?',           en: 'Who are you with?' },
      ],
    },
  ],

  vocabulary: [
    { id:'i3_1',  es:'¿cómo?',          en:'how?',                       gender:'n', rule:'interrogative', article:'', plural:'', ex:'¿Cómo están los muchachos?',     exEn:'How are the boys?' },
    { id:'i3_2',  es:'¿dónde?',         en:'where?',                     gender:'n', rule:'interrogative', article:'', plural:'', ex:'¿Dónde está la casa del alcalde?', exEn:'Where is the mayor\'s house?' },
    { id:'i3_3',  es:'¿quién?',         en:'who? (singular)',             gender:'n', rule:'interrogative', article:'', plural:'', ex:'¿Quién está aquí?',               exEn:'Who is here?' },
    { id:'i3_4',  es:'¿quiénes?',       en:'who? (plural)',               gender:'n', rule:'interrogative', article:'', plural:'', ex:'¿Quiénes son ellos?',             exEn:'Who are they?' },
    { id:'i3_5',  es:'¿qué?',           en:'what?',                       gender:'n', rule:'interrogative', article:'', plural:'', ex:'¿Qué día es hoy?',                exEn:'What day is today?' },
    { id:'i3_6',  es:'¿cuál?',          en:'which? / which one?',         gender:'n', rule:'interrogative', article:'', plural:'', ex:'¿Cuál es el problema?',           exEn:'Which is the problem?' },
    { id:'i3_7',  es:'¿cuáles?',        en:'which ones?',                 gender:'n', rule:'interrogative', article:'', plural:'', ex:'¿Cuáles son los días de la semana?', exEn:'Which are the days of the week?' },
    { id:'i3_8',  es:'¿por qué?',       en:'why?',                        gender:'n', rule:'interrogative', article:'', plural:'', ex:'¿Por qué estamos alegres?',       exEn:'Why are we happy?' },
    { id:'i3_9',  es:'¿cuánto?',        en:'how much?',                   gender:'n', rule:'interrogative', article:'', plural:'', ex:'¿Cuánto es?',                     exEn:'How much is it?' },
    { id:'i3_10', es:'¿cuántos?',       en:'how many? (masculine)',        gender:'n', rule:'interrogative', article:'', plural:'', ex:'¿Cuántos gatos hay en la ciudad?', exEn:'How many cats are there in the city?' },
    { id:'i3_11', es:'¿cuántas?',       en:'how many? (feminine)',         gender:'n', rule:'interrogative', article:'', plural:'', ex:'¿Cuántas estrellas hay en el cielo?', exEn:'How many stars are there in the sky?' },
    { id:'i3_12', es:'¿cuándo?',        en:'when?',                        gender:'n', rule:'interrogative', article:'', plural:'', ex:'¿Cuándo es la fiesta?',           exEn:'When is the party?' },
    { id:'i3_13', es:'¿de dónde?',      en:'from where? / where from?',    gender:'n', rule:'interrogative', article:'', plural:'', ex:'¿De dónde es el hombre?',        exEn:'Where is the man from?' },
    { id:'i3_14', es:'¿de qué color?',  en:'what color?',                  gender:'n', rule:'interrogative', article:'', plural:'', ex:'¿De qué color es la mesa?',      exEn:'What color is the table?' },
    { id:'i3_15', es:'¿de quién?',      en:'whose?',                       gender:'n', rule:'interrogative', article:'', plural:'', ex:'¿De quién es la idea fantástica?', exEn:'Whose fantastic idea is it?' },
    { id:'i3_16', es:'¿con quién?',     en:'with whom?',                   gender:'n', rule:'interrogative', article:'', plural:'', ex:'¿Con quién estás?',              exEn:'Who are you with?' },
    { id:'i3_17', es:'¿en qué?',        en:'in what?',                     gender:'n', rule:'interrogative', article:'', plural:'', ex:'¿En qué tienda hay muchos libros?', exEn:'In what store are there many books?' },
    { id:'i3_18', es:'¿en cuál?',       en:'in which?',                    gender:'n', rule:'interrogative', article:'', plural:'', ex:'¿En cuál parque hay animales exóticos?', exEn:'In which park are there exotic animals?' },
    { id:'i3_19', es:'¿de qué material?', en:'made of what?',              gender:'n', rule:'interrogative', article:'', plural:'', ex:'¿De qué material es la ventana?', exEn:'What material is the window made of?' },
  ],

  /* Match question word to its meaning */
  interrogativeQuestions: [
    { word:'¿cómo?',          en:'how?',              example:'¿Cómo estás tú?' },
    { word:'¿dónde?',         en:'where?',            example:'¿Dónde está el baño?' },
    { word:'¿quién?',         en:'who? (sing.)',      example:'¿Quién está aquí?' },
    { word:'¿quiénes?',       en:'who? (pl.)',        example:'¿Quiénes son ellos?' },
    { word:'¿qué?',           en:'what?',             example:'¿Qué día es hoy?' },
    { word:'¿cuál?',          en:'which one?',        example:'¿Cuál es la capital?' },
    { word:'¿cuáles?',        en:'which ones?',       example:'¿Cuáles son los días?' },
    { word:'¿por qué?',       en:'why?',              example:'¿Por qué estamos alegres?' },
    { word:'¿cuánto?',        en:'how much?',         example:'¿Cuánto es?' },
    { word:'¿cuántos?',       en:'how many? (m)',     example:'¿Cuántos gatos hay?' },
    { word:'¿cuántas?',       en:'how many? (f)',     example:'¿Cuántas estrellas hay?' },
    { word:'¿cuándo?',        en:'when?',             example:'¿Cuándo es la fiesta?' },
    { word:'¿de dónde?',      en:'from where?',       example:'¿De dónde es Ud.?' },
    { word:'¿de qué color?',  en:'what color?',       example:'¿De qué color es la mesa?' },
    { word:'¿de quién?',      en:'whose?',            example:'¿De quién es el carro?' },
    { word:'¿con quién?',     en:'with whom?',        example:'¿Con quién estás?' },
    { word:'¿en qué?',        en:'in what?',          example:'¿En qué tienda hay libros?' },
    { word:'¿en cuál?',       en:'in which?',         example:'¿En cuál parque hay animales?' },
    { word:'¿de qué material?', en:'made of what?',   example:'¿De qué material es la ventana?' },
  ],
};

/* ════════════════════════════════════════════════════════════════════════════
   SUB-LESSON 3-3 — Days, Months & Seasons
   ════════════════════════════════════════════════════════════════════════════ */

const SUBLESSON_3_3 = {
  id: '3-3',
  chapterId: 3,
  title: 'Days, Months & Seasons',
  subtitle: 'Los días · Los meses · Las estaciones',

  rules: [
    {
      id: 'r1',
      heading: 'Days of the week — not capitalized',
      body: 'Days of the week are NOT capitalized in Spanish. Use el + day to mean "on Monday." Use los + day for recurring days ("on Mondays"). Lunes through viernes already end in -s — only sábado and domingo add -s in the plural.',
      examples: [
        { es: 'el lunes',      en: 'Monday / on Monday' },
        { es: 'los sábados',   en: 'on Saturdays', note: 'add -s' },
        { es: 'Hay clase los lunes.', en: 'There is class on Mondays.' },
        { es: '¿Dónde estás los viernes?', en: 'Where are you on Fridays?' },
      ],
    },
    {
      id: 'r2',
      heading: 'Months and seasons — not capitalized',
      body: 'Like days, months and seasons are NOT capitalized in Spanish. Seasons use the definite article: el verano, el otoño, el invierno, la primavera.',
      examples: [
        { es: 'Es enero.',             en: 'It is January.' },
        { es: 'Es el verano.',         en: 'It is summer.' },
        { es: 'En la primavera, hay flores.', en: 'In spring, there are flowers.' },
        { es: 'En el otoño, hay hojas amarillas.', en: 'In autumn, there are yellow leaves.' },
      ],
      tip: 'Parts of the day: la mañana (morning), la tarde (afternoon), la noche (night/evening).',
    },
  ],

  vocabulary: [
    /* Days */
    { id:'d3_1',  es:'lunes',       en:'Monday',      gender:'m', rule:'masc_irreg', article:'el', plural:'lunes',      ex:'Hay clase los lunes.',         exEn:'There is class on Mondays.' },
    { id:'d3_2',  es:'martes',      en:'Tuesday',     gender:'m', rule:'masc_irreg', article:'el', plural:'martes',     ex:'El martes es el día del amor.',exEn:'Tuesday is Valentine\'s Day.' },
    { id:'d3_3',  es:'miércoles',   en:'Wednesday',   gender:'m', rule:'masc_irreg', article:'el', plural:'miércoles',  ex:'Estamos en clase los miércoles.', exEn:'We are in class on Wednesdays.' },
    { id:'d3_4',  es:'jueves',      en:'Thursday',    gender:'m', rule:'masc_irreg', article:'el', plural:'jueves',     ex:'El jueves es el día de acción de gracias.', exEn:'Thursday is Thanksgiving Day.' },
    { id:'d3_5',  es:'viernes',     en:'Friday',      gender:'m', rule:'masc_irreg', article:'el', plural:'viernes',    ex:'¿Dónde estás los viernes?',    exEn:'Where are you on Fridays?' },
    { id:'d3_6',  es:'sábado',      en:'Saturday',    gender:'m', rule:'ends_o',     article:'el', plural:'sábados',    ex:'¿Hay fiestas los sábados?',    exEn:'Are there parties on Saturdays?' },
    { id:'d3_7',  es:'domingo',     en:'Sunday',      gender:'m', rule:'ends_o',     article:'el', plural:'domingos',   ex:'¿Dónde está Tomás los domingos?', exEn:'Where is Thomas on Sundays?' },
    /* Months */
    { id:'d3_8',  es:'enero',       en:'January',     gender:'m', rule:'ends_o',     article:'',   plural:'', ex:'Hace frío en enero.',          exEn:'It is cold in January.' },
    { id:'d3_9',  es:'febrero',     en:'February',    gender:'m', rule:'ends_o',     article:'',   plural:'', ex:'Hay amor en febrero.',         exEn:'There is love in February.' },
    { id:'d3_10', es:'marzo',       en:'March',       gender:'m', rule:'ends_o',     article:'',   plural:'', ex:'La primavera empieza en marzo.',exEn:'Spring begins in March.' },
    { id:'d3_11', es:'abril',       en:'April',       gender:'m', rule:'masc_irreg', article:'',   plural:'', ex:'Hay flores en abril.',         exEn:'There are flowers in April.' },
    { id:'d3_12', es:'mayo',        en:'May',         gender:'m', rule:'ends_o',     article:'',   plural:'', ex:'Hace calor en mayo.',          exEn:'It is hot in May.' },
    { id:'d3_13', es:'junio',       en:'June',        gender:'m', rule:'ends_o',     article:'',   plural:'', ex:'¿Cuántos días hay en junio?',  exEn:'How many days are there in June?' },
    { id:'d3_14', es:'julio',       en:'July',        gender:'m', rule:'ends_o',     article:'',   plural:'', ex:'Es el verano en julio.',       exEn:'It is summer in July.' },
    { id:'d3_15', es:'agosto',      en:'August',      gender:'m', rule:'ends_o',     article:'',   plural:'', ex:'Los niños están en la playa en agosto.', exEn:'The children are at the beach in August.' },
    { id:'d3_16', es:'septiembre',  en:'September',   gender:'m', rule:'masc_irreg', article:'',   plural:'', ex:'Es septiembre. ¿Qué mes es?',  exEn:'It is September. What month is it?' },
    { id:'d3_17', es:'octubre',     en:'October',     gender:'m', rule:'masc_irreg', article:'',   plural:'', ex:'En octubre, hay hojas rojas.', exEn:'In October, there are red leaves.' },
    { id:'d3_18', es:'noviembre',   en:'November',    gender:'m', rule:'masc_irreg', article:'',   plural:'', ex:'Es otoño en noviembre.',       exEn:'It is autumn in November.' },
    { id:'d3_19', es:'diciembre',   en:'December',    gender:'m', rule:'masc_irreg', article:'',   plural:'', ex:'Hay fiestas en diciembre.',    exEn:'There are parties in December.' },
    /* Seasons */
    { id:'d3_20', es:'verano',   en:'summer',  gender:'m', rule:'ends_o',     article:'el', plural:'', ex:'En el verano, el clima es maravilloso.', exEn:'In summer, the climate is marvelous.' },
    { id:'d3_21', es:'otoño',    en:'autumn',  gender:'m', rule:'ends_o',     article:'el', plural:'', ex:'En el otoño, hay hojas amarillas.', exEn:'In autumn, there are yellow leaves.' },
    { id:'d3_22', es:'invierno', en:'winter',  gender:'m', rule:'masc_irreg', article:'el', plural:'', ex:'Mucha gente está en los restaurantes porque es el invierno.', exEn:'Many people are in restaurants because it is winter.' },
    { id:'d3_23', es:'primavera',en:'spring',  gender:'f', rule:'ends_a',     article:'la', plural:'', ex:'En la primavera, hay flores bellas.', exEn:'In spring, there are beautiful flowers.' },
    /* Parts of day */
    { id:'d3_24', es:'mañana',   en:'the morning', gender:'f', rule:'ends_a',     article:'la', plural:'mañanas', ex:'Hay música en la mañana.',    exEn:'There is music in the morning.' },
    { id:'d3_25', es:'tarde',    en:'the afternoon',gender:'f', rule:'ends_a',    article:'la', plural:'tardes',  ex:'Hay una comida en la tarde.', exEn:'There is a meal in the afternoon.' },
    { id:'d3_26', es:'noche',    en:'the night / evening', gender:'f', rule:'ends_e', article:'la', plural:'noches', ex:'¿Es peligrosa la ciudad en la noche?', exEn:'Is the city dangerous at night?' },
    { id:'d3_27', es:'semana',   en:'the week',    gender:'f', rule:'ends_a',     article:'la', plural:'semanas', ex:'Hay siete días en la semana.', exEn:'There are seven days in a week.' },
    { id:'d3_28', es:'mes',      en:'the month',   gender:'m', rule:'masc_irreg', article:'el', plural:'meses',   ex:'¿Qué mes es?',                exEn:'What month is it?' },
    { id:'d3_29', es:'año',      en:'the year',    gender:'m', rule:'ends_o',     article:'el', plural:'años',    ex:'¿Cuántos días hay en un año?', exEn:'How many days are there in a year?' },
  ],
};

/* ════════════════════════════════════════════════════════════════════════════
   SUB-LESSON 3-4 — Vocabulary
   ════════════════════════════════════════════════════════════════════════════ */

const SUBLESSON_3_4 = {
  id: '3-4',
  chapterId: 3,
  title: 'Vocabulary',
  subtitle: 'New nouns · Adjectives · Conjunctions',

  rules: [
    {
      id: 'r1',
      heading: 'New masculine nouns',
      body: 'This chapter introduces a large set of nouns essential for everyday communication. Remember: most nouns ending in -o are masculine.',
      examples: [
        { es: 'el edificio', en: 'the building' },
        { es: 'el viaje',    en: 'the trip' },
        { es: 'el país',     en: 'the country' },
        { es: 'el parque',   en: 'the park' },
      ],
    },
    {
      id: 'r2',
      heading: 'New feminine nouns',
      body: 'Most feminine nouns end in -a, but several important ones end in other letters — learn these with their article.',
      examples: [
        { es: 'la calle',   en: 'the street' },
        { es: 'la playa',   en: 'the beach' },
        { es: 'la gente',   en: 'the people' },
        { es: 'la puerta',  en: 'the door' },
      ],
    },
    {
      id: 'r3',
      heading: 'Adjectives & conjunctions',
      body: 'New adjectives describe physical qualities (alto, bajo, largo, corto) and character (amable, fiel, tranquilo). Conjunctions connect ideas: y (and), o (or), pero (but), porque (because), si (if), mientras (while).',
      examples: [
        { es: 'el edificio alto',  en: 'the tall building' },
        { es: 'la calle estrecha', en: 'the narrow street' },
        { es: 'Estoy feliz porque hay música.', en: 'I am happy because there is music.' },
        { es: 'Es viejo pero es bonito.', en: 'It is old but it is pretty.' },
      ],
    },
  ],

  vocabulary: [
    /* Masculine nouns */
    { id:'n3_1',  es:'avión',       en:'the airplane',    gender:'m', rule:'masc_irreg', article:'el', plural:'aviones',    ex:'Hay un avión en el cielo.',       exEn:'There is an airplane in the sky.' },
    { id:'n3_2',  es:'bus',         en:'the bus',         gender:'m', rule:'masc_irreg', article:'el', plural:'buses',      ex:'Hay buses en la avenida.',        exEn:'There are buses on the avenue.' },
    { id:'n3_3',  es:'campo',       en:'the countryside', gender:'m', rule:'ends_o',     article:'el', plural:'campos',     ex:'Hay perros en el campo.',         exEn:'There are dogs in the countryside.' },
    { id:'n3_4',  es:'coche',       en:'the car',         gender:'m', rule:'ends_e',     article:'el', plural:'coches',     ex:'El coche es caro.',               exEn:'The car is expensive.' },
    { id:'n3_5',  es:'cumpleaños',  en:'the birthday',    gender:'m', rule:'masc_irreg', article:'el', plural:'cumpleaños', ex:'¿Cuándo es tu cumpleaños?',       exEn:'When is your birthday?' },
    { id:'n3_6',  es:'dinero',      en:'the money',       gender:'m', rule:'ends_o',     article:'el', plural:'',              ex:'No hay dinero en la bolsa.',       exEn:'There is no money in the bag.' },
    { id:'n3_7',  es:'edificio',    en:'the building',    gender:'m', rule:'ends_o',     article:'el', plural:'edificios',  ex:'Los edificios son altos.',         exEn:'The buildings are tall.' },
    { id:'n3_8',  es:'equipaje',    en:'the baggage',     gender:'m', rule:'ends_e',     article:'el', plural:'',              ex:'El equipaje está en el avión.',    exEn:'The baggage is on the airplane.' },
    { id:'n3_9',  es:'jardín',      en:'the garden',      gender:'m', rule:'masc_irreg', article:'el', plural:'jardines',   ex:'Hay flores en el jardín.',        exEn:'There are flowers in the garden.' },
    { id:'n3_10', es:'mensaje',     en:'the message',     gender:'m', rule:'ends_e',     article:'el', plural:'mensajes',   ex:'Hay un mensaje en la mesa.',      exEn:'There is a message on the table.' },
    { id:'n3_11', es:'país',        en:'the country',     gender:'m', rule:'masc_irreg', article:'el', plural:'países',     ex:'¿De qué país es ella?',           exEn:'What country is she from?' },
    { id:'n3_12', es:'papel',       en:'the paper',       gender:'m', rule:'masc_irreg', article:'el', plural:'papeles',    ex:'Hay papel en la mesa.',           exEn:'There is paper on the table.' },
    { id:'n3_13', es:'parque',      en:'the park',        gender:'m', rule:'ends_e',     article:'el', plural:'parques',    ex:'Hay animales en el parque.',      exEn:'There are animals in the park.' },
    { id:'n3_14', es:'precio',      en:'the price',       gender:'m', rule:'ends_o',     article:'el', plural:'precios',    ex:'¿Cuánto es el precio?',           exEn:'How much is the price?' },
    { id:'n3_15', es:'ruido',       en:'the noise',       gender:'m', rule:'ends_o',     article:'el', plural:'ruidos',     ex:'Hay ruido en la ciudad.',         exEn:'There is noise in the city.' },
    { id:'n3_16', es:'salón',       en:'the classroom',   gender:'m', rule:'masc_irreg', article:'el', plural:'salones',    ex:'Los estudiantes están en el salón.', exEn:'The students are in the classroom.' },
    { id:'n3_17', es:'teatro',      en:'the theater',     gender:'m', rule:'ends_o',     article:'el', plural:'teatros',    ex:'El concierto es en el teatro.',   exEn:'The concert is at the theater.' },
    { id:'n3_18', es:'tema',        en:'the theme / topic',gender:'m', rule:'masc_a_excep', article:'el', plural:'temas',  ex:'¿Cuál es el tema de la lección?', exEn:'What is the theme of the lesson?' },
    { id:'n3_19', es:'viaje',       en:'the trip',        gender:'m', rule:'ends_e',     article:'el', plural:'viajes',     ex:'El viaje es tranquilo.',          exEn:'The trip is peaceful.' },
    { id:'n3_20', es:'hogar',       en:'the home',        gender:'m', rule:'masc_irreg', article:'el', plural:'hogares',    ex:'El hogar es cómodo.',             exEn:'The home is comfortable.' },
    { id:'n3_21', es:'sueño',       en:'the dream',       gender:'m', rule:'ends_o',     article:'el', plural:'sueños',     ex:'El sueño es raro.',               exEn:'The dream is strange.' },
    { id:'n3_22', es:'sitio',       en:'the place',       gender:'m', rule:'ends_o',     article:'el', plural:'sitios',     ex:'¿Cuál es el sitio de la fiesta?', exEn:'What is the place of the party?' },
    /* Feminine nouns */
    { id:'n3_23', es:'avenida',     en:'the avenue',      gender:'f', rule:'ends_a',     article:'la', plural:'avenidas',   ex:'La avenida es ancha.',            exEn:'The avenue is wide.' },
    { id:'n3_24', es:'calle',       en:'the street',      gender:'f', rule:'fem_irreg',  article:'la', plural:'calles',     ex:'Las calles de México son estrechas.', exEn:'The streets of Mexico are narrow.' },
    { id:'n3_25', es:'camisa',      en:'the shirt',       gender:'f', rule:'ends_a',     article:'la', plural:'camisas',    ex:'La camisa es elegante.',          exEn:'The shirt is elegant.' },
    { id:'n3_26', es:'carta',       en:'the letter',      gender:'f', rule:'ends_a',     article:'la', plural:'cartas',     ex:'Hay una carta en la mesa.',       exEn:'There is a letter on the table.' },
    { id:'n3_27', es:'cuenta',      en:'the bill / check',gender:'f', rule:'ends_a',     article:'la', plural:'cuentas',    ex:'¿Cuánto es la cuenta?',           exEn:'How much is the bill?' },
    { id:'n3_28', es:'ducha',       en:'the shower',      gender:'f', rule:'ends_a',     article:'la', plural:'duchas',     ex:'La ducha está en el baño.',       exEn:'The shower is in the bathroom.' },
    { id:'n3_29', es:'entrada',     en:'the entrance',    gender:'f', rule:'ends_a',     article:'la', plural:'entradas',   ex:'La entrada es estrecha.',         exEn:'The entrance is narrow.' },
    { id:'n3_30', es:'escalera',    en:'the stairs',      gender:'f', rule:'ends_a',     article:'la', plural:'escaleras',  ex:'La escalera es alta.',            exEn:'The staircase is tall.' },
    { id:'n3_31', es:'escuela',     en:'the school',      gender:'f', rule:'ends_a',     article:'la', plural:'escuelas',   ex:'Hay una escuela en el pueblo.',   exEn:'There is a school in the town.' },
    { id:'n3_32', es:'fiesta',      en:'the party',       gender:'f', rule:'ends_a',     article:'la', plural:'fiestas',    ex:'Hay fiestas los viernes.',        exEn:'There are parties on Fridays.' },
    { id:'n3_33', es:'frase',       en:'the sentence',    gender:'f', rule:'ends_e',     article:'la', plural:'frases',     ex:'La frase está en la página.',     exEn:'The sentence is on the page.' },
    { id:'n3_34', es:'gente',       en:'the people',      gender:'f', rule:'ends_e',     article:'la', plural:'',              ex:'La gente es simpática.',          exEn:'The people are nice.' },
    { id:'n3_35', es:'guerra',      en:'the war',         gender:'f', rule:'ends_a',     article:'la', plural:'guerras',    ex:'La guerra es larga.',             exEn:'The war is long.' },
    { id:'n3_36', es:'habitación',  en:'the bedroom',        gender:'f', rule:'ends_cion',  article:'la', plural:'habitaciones', ex:'La habitación es amplia.',     exEn:'The room is spacious.' },
    { id:'n3_37', es:'hoja',        en:'the leaf',        gender:'f', rule:'ends_a',     article:'la', plural:'hojas',      ex:'En el otoño, hay hojas amarillas.', exEn:'In autumn, there are yellow leaves.' },
    { id:'n3_38', es:'llave',       en:'the key',         gender:'f', rule:'ends_e',     article:'la', plural:'llaves',     ex:'La llave está en la puerta.',     exEn:'The key is in the door.' },
    { id:'n3_39', es:'música',      en:'the music',       gender:'f', rule:'ends_a',     article:'la', plural:'',              ex:'Hay música en la mañana.',        exEn:'There is music in the morning.' },
    { id:'n3_40', es:'obra',        en:'the play (theater)',gender:'f', rule:'ends_a',   article:'la', plural:'obras',      ex:'La obra es emocionante.',         exEn:'The play is exciting.' },
    { id:'n3_41', es:'palabra',     en:'the word',        gender:'f', rule:'ends_a',     article:'la', plural:'palabras',   ex:'La palabra está en la frase.',    exEn:'The word is in the sentence.' },
    { id:'n3_42', es:'playa',       en:'the beach',       gender:'f', rule:'ends_a',     article:'la', plural:'playas',     ex:'Los niños están en la playa.',    exEn:'The children are at the beach.' },
    { id:'n3_43', es:'pregunta',    en:'the question',    gender:'f', rule:'ends_a',     article:'la', plural:'preguntas',  ex:'Hay preguntas de los estudiantes.', exEn:'There are questions from the students.' },
    { id:'n3_44', es:'puerta',      en:'the door',        gender:'f', rule:'ends_a',     article:'la', plural:'puertas',    ex:'La puerta es fuerte.',            exEn:'The door is strong.' },
    { id:'n3_45', es:'salida',      en:'the exit',        gender:'f', rule:'ends_a',     article:'la', plural:'salidas',    ex:'La salida es estrecha.',          exEn:'The exit is narrow.' },
    { id:'n3_46', es:'salud',       en:'the health',      gender:'f', rule:'ends_dad',   article:'la', plural:'',              ex:'La salud es importante.',         exEn:'Health is important.' },
    { id:'n3_47', es:'tarea',       en:'the homework',    gender:'f', rule:'ends_a',     article:'la', plural:'tareas',     ex:'La tarea es sencilla.',           exEn:'The homework is simple.' },
    { id:'n3_48', es:'tarjeta',     en:'the postcard',    gender:'f', rule:'ends_a',     article:'la', plural:'tarjetas',   ex:'Hay una tarjeta en la mesa.',     exEn:'There is a postcard on the table.' },
    { id:'n3_49', es:'ascensor',    en:'the elevator',    gender:'m', rule:'masc_irreg', article:'el', plural:'ascensores', ex:'El ascensor está en el edificio.', exEn:'The elevator is in the building.' },
    { id:'n3_50', es:'día',         en:'the day',         gender:'m', rule:'masc_irreg', article:'el', plural:'días',       ex:'El sábado y el domingo son días de fiesta.', exEn:'Saturday and Sunday are holidays.' },
    { id:'n3_51', es:'lapicero',    en:'the ballpoint pen', gender:'m', rule:'ends_o',  article:'el', plural:'lapiceros',  ex:'Hay un lapicero en la mesa.',     exEn:'There is a ballpoint pen on the table.' },
    { id:'n3_52', es:'niño',        en:'the child',       gender:'m', rule:'ends_o',     article:'el', plural:'niños',      ex:'Los niños están en la playa.',    exEn:'The children are at the beach.' },
    { id:'n3_53', es:'bolígrafo',   en:'the ballpoint pen', gender:'m', rule:'ends_o',  article:'el', plural:'bolígrafos', ex:'Hay bolígrafos en la mesa.',      exEn:'There are pens on the table.' },
    { id:'n3_54', es:'lápiz',       en:'the pencil',      gender:'m', rule:'masc_irreg', article:'el', plural:'lápices',    ex:'Hay muchos lápices en la mesa.',   exEn:'There are many pencils on the table.' },
    { id:'n3_55', es:'biblioteca',  en:'the library',     gender:'f', rule:'ends_a',     article:'la', plural:'bibliotecas', ex:'Hay libros en la biblioteca.',   exEn:'There are books in the library.' },
    { id:'n3_56', es:'ciudad',      en:'the city',        gender:'f', rule:'ends_dad',   article:'la', plural:'ciudades',   ex:'Las calles de la ciudad son estrechas.', exEn:'The city streets are narrow.' },
    { id:'n3_57', es:'librería',    en:'the bookstore',   gender:'f', rule:'ends_a',     article:'la', plural:'librerías',  ex:'¿Cuántos libros hay en la librería?', exEn:'How many books are in the bookstore?' },
    { id:'n3_58', es:'medicina',    en:'the medicine',    gender:'f', rule:'ends_a',     article:'la', plural:'',              ex:'La medicina es importante.',      exEn:'Medicine is important.' },
    { id:'n3_59', es:'página',      en:'the page',        gender:'f', rule:'ends_a',     article:'la', plural:'páginas',    ex:'La frase está en la página.',     exEn:'The sentence is on the page.' },
    { id:'n3_60', es:'cocina',      en:'the kitchen',     gender:'f', rule:'ends_a',     article:'la', plural:'cocinas',    ex:'La cocina es amplia.',            exEn:'The kitchen is spacious.' },
    { id:'n3_61', es:'pared',       en:'the wall',        gender:'f', rule:'fem_irreg',  article:'la', plural:'paredes',    ex:'Las paredes son blancas.',        exEn:'The walls are white.' },
    /* Reading — Un pueblo colonial & El cine */
    { id:'r3_1',  es:'pueblo',      en:'the town',        gender:'m', rule:'ends_o',     article:'el', plural:'pueblos',    ex:'Guanajuato es un pueblo colonial.', exEn:'Guanajuato is a colonial town.' },
    { id:'r3_2',  es:'arqueóloga',  en:'the archeologist', gender:'f', rule:'ista_gender', article:'la', plural:'arqueólogas', ex:'La madre de Laura es arqueóloga.', exEn:'Laura\'s mother is an archeologist.' },
    { id:'r3_3',  es:'político',    en:'the politician',  gender:'m', rule:'ends_o',     article:'el', plural:'políticos',  ex:'El padre de Laura es político.',  exEn:'Laura\'s father is a politician.' },
    { id:'r3_4',  es:'cine',        en:'the movies / cinema', gender:'m', rule:'ends_e', article:'el', plural:'',              ex:'Roberto Vélez es director de cine.', exEn:'Roberto Vélez is a film director.' },
    { id:'r3_5',  es:'película',    en:'the film / movie', gender:'f', rule:'ends_a',   article:'la', plural:'películas',  ex:'Las películas de Roberto son cómicas.', exEn:'Roberto\'s films are funny.' },
    { id:'r3_6',  es:'pobreza',     en:'the poverty',     gender:'f', rule:'ends_dad',   article:'la', plural:'',              ex:'En la Argentina hay mucha pobreza.', exEn:'There is a lot of poverty in Argentina.' },
    { id:'r3_7',  es:'jurado',      en:'the jury / judge', gender:'m', rule:'ends_o',    article:'el', plural:'jurados',    ex:'Hay actores, directores y jurados en la ciudad.', exEn:'There are actors, directors, and judges in the city.' },
    { id:'r3_8',  es:'premio',      en:'the award / prize', gender:'m', rule:'ends_o',  article:'el', plural:'premios',    ex:'La presentación de los premios es esta noche.', exEn:'The awards presentation is tonight.' },
    /* Adjectives */
    { id:'a3_1',  es:'alto',       en:'tall',           gender:'m', rule:'ends_o',    article:'', plural:'altos',      ex:'Los edificios son altos.',        exEn:'The buildings are tall.' },
    { id:'a3_2',  es:'amable',     en:'kind',           gender:'m', rule:'invariable',article:'', plural:'amables',    ex:'El hombre amable es el doctor.',  exEn:'The kind man is the doctor.' },
    { id:'a3_3',  es:'amistoso',   en:'friendly',       gender:'m', rule:'ends_o',    article:'', plural:'amistosos',  ex:'La mujer amistosa es mi amiga.',  exEn:'The friendly woman is my friend.' },
    { id:'a3_4',  es:'ancho',      en:'wide',           gender:'m', rule:'ends_o',    article:'', plural:'anchos',     ex:'La avenida es ancha.',            exEn:'The avenue is wide.' },
    { id:'a3_5',  es:'bajo',       en:'short (height) / low', gender:'m', rule:'ends_o', article:'', plural:'bajos', ex:'Las casas son bajas.',            exEn:'The houses are short.' },
    { id:'a3_6',  es:'bello',      en:'beautiful (fine/handsome)',      gender:'m', rule:'ends_o',    article:'', plural:'bellos',     ex:'Las flores son bellas.',          exEn:'The flowers are beautiful.' },
    { id:'a3_7',  es:'cariñoso',   en:'affectionate',   gender:'m', rule:'ends_o',    article:'', plural:'cariñosos',  ex:'El niño cariñoso es alegre.',     exEn:'The affectionate child is happy.' },
    { id:'a3_8',  es:'corto',      en:'short (length)', gender:'m', rule:'ends_o',    article:'', plural:'cortos',     ex:'El mes es corto.',                exEn:'The month is short.' },
    { id:'a3_9',  es:'dulce',      en:'sweet',          gender:'m', rule:'invariable',article:'', plural:'dulces',     ex:'La música es dulce.',             exEn:'The music is sweet.' },
    { id:'a3_10', es:'duro',       en:'hard',           gender:'m', rule:'ends_o',    article:'', plural:'duros',      ex:'El trabajo es duro.',             exEn:'The work is hard.' },
    { id:'a3_11', es:'elegante',   en:'elegant',        gender:'m', rule:'invariable',article:'', plural:'elegantes',  ex:'La camisa es elegante.',          exEn:'The shirt is elegant.' },
    { id:'a3_12', es:'emocionante',en:'exciting',       gender:'m', rule:'invariable',article:'', plural:'emocionantes', ex:'La obra es emocionante.',      exEn:'The play is exciting.' },
    { id:'a3_13', es:'especial',   en:'special',        gender:'m', rule:'invariable',article:'', plural:'especiales', ex:'El día es especial.',             exEn:'The day is special.' },
    { id:'a3_14', es:'estrecho',   en:'narrow',         gender:'m', rule:'ends_o',    article:'', plural:'estrechos',  ex:'Las calles son estrechas.',       exEn:'The streets are narrow.' },
    { id:'a3_15', es:'fiel',       en:'faithful',       gender:'m', rule:'invariable',article:'', plural:'fieles',     ex:'El perro es fiel.',               exEn:'The dog is faithful.' },
    { id:'a3_16', es:'largo',      en:'long',           gender:'m', rule:'ends_o',    article:'', plural:'largos',     ex:'La guerra es larga.',             exEn:'The war is long.' },
    { id:'a3_17', es:'lento',      en:'slow',           gender:'m', rule:'ends_o',    article:'', plural:'lentos',     ex:'El tren es lento.',               exEn:'The train is slow.' },
    { id:'a3_18', es:'libre',      en:'free',           gender:'m', rule:'invariable',article:'', plural:'libres',     ex:'La entrada es libre.',            exEn:'Admission is free.' },
    { id:'a3_19', es:'nuevo',      en:'new',            gender:'m', rule:'ends_o',    article:'', plural:'nuevos',     ex:'El coche es nuevo.',              exEn:'The car is new.' },
    { id:'a3_20', es:'peligroso',  en:'dangerous',      gender:'m', rule:'ends_o',    article:'', plural:'peligrosos', ex:'La ciudad es peligrosa en la noche.', exEn:'The city is dangerous at night.' },
    { id:'a3_21', es:'pesado',     en:'heavy / dull',   gender:'m', rule:'ends_o',    article:'', plural:'pesados',    ex:'El equipaje es pesado.',          exEn:'The baggage is heavy.' },
    { id:'a3_22', es:'rápido',     en:'fast',           gender:'m', rule:'ends_o',    article:'', plural:'rápidos',    ex:'El avión es rápido.',             exEn:'The airplane is fast.' },
    { id:'a3_23', es:'raro',       en:'strange',        gender:'m', rule:'ends_o',    article:'', plural:'raros',      ex:'El sueño es raro.',               exEn:'The dream is strange.' },
    { id:'a3_24', es:'suave',      en:'soft',           gender:'m', rule:'invariable',article:'', plural:'suaves',     ex:'La música es suave.',             exEn:'The music is soft.' },
    { id:'a3_25', es:'tranquilo',  en:'peaceful',       gender:'m', rule:'ends_o',    article:'', plural:'tranquilos', ex:'El viaje es tranquilo.',          exEn:'The trip is peaceful.' },
    { id:'a3_26', es:'ciego',      en:'blind',          gender:'m', rule:'ends_o',    article:'', plural:'ciegos',     ex:'El hombre ciego es amable.',      exEn:'The blind man is kind.' },
    { id:'a3_27', es:'flojo',      en:'lax',            gender:'m', rule:'ends_o',    article:'', plural:'flojos',     ex:'El trabajo es flojo.',            exEn:'The work is lax.' },
    { id:'a3_28', es:'gracioso',   en:'amusing',        gender:'m', rule:'ends_o',    article:'', plural:'graciosos',  ex:'Las películas son cómicas y graciosas.', exEn:'The films are funny and amusing.' },
    { id:'a3_29', es:'hondo',      en:'deep',           gender:'m', rule:'ends_o',    article:'', plural:'hondos',     ex:'El río es hondo.',                exEn:'The river is deep.' },
    { id:'a3_30', es:'orgulloso',  en:'proud',          gender:'m', rule:'ends_o',    article:'', plural:'orgullosos', ex:'La gente orgullosa es sincera.',  exEn:'Proud people are sincere.' },
    { id:'a3_31', es:'sencillo',   en:'simple',         gender:'m', rule:'ends_o',    article:'', plural:'sencillos',  ex:'La tarea es sencilla.',           exEn:'The homework is simple.' },
    { id:'a3_32', es:'sordo',      en:'deaf',           gender:'m', rule:'ends_o',    article:'', plural:'sordos',     ex:'El niño sordo es inteligente.',   exEn:'The deaf child is intelligent.' },
    { id:'a3_33', es:'serio',      en:'serious',        gender:'m', rule:'ends_o',    article:'', plural:'serios',     ex:'Somos estudiantes serios.',       exEn:'We are serious students.' },
    { id:'a3_34', es:'relajante',  en:'relaxing',       gender:'m', rule:'invariable',article:'', plural:'relajantes', ex:'El viaje es tranquilo y relajante.', exEn:'The trip is peaceful and relaxing.' },
    { id:'a3_35', es:'cómico',     en:'funny',          gender:'m', rule:'ends_o',    article:'', plural:'cómicos',    ex:'Las películas de Roberto son cómicas.', exEn:'Roberto\'s films are funny.' },
    { id:'a3_36', es:'emocionado', en:'excited',        gender:'m', rule:'ends_o',    article:'', plural:'emocionados', ex:'Roberto y Rosa están emocionados.', exEn:'Roberto and Rosa are excited.' },
    { id:'a3_37', es:'antiguo',    en:'old / ancient',  gender:'m', rule:'ends_o',    article:'', plural:'antiguos',   ex:'Guanajuato es un pueblo colonial y antiguo.', exEn:'Guanajuato is a colonial and ancient town.' },
    { id:'a3_38', es:'durante',    en:'during',         gender:'n', rule:'invariable', article:'', plural:'', ex:'Hay conversación durante el día.', exEn:'There is conversation during the day.' },
    /* Conjunctions */
    { id:'c3_1',  es:'y',          en:'and',            gender:'n', rule:'conjunction', article:'', plural:'', ex:'Hay flores y árboles en el parque.', exEn:'There are flowers and trees in the park.' },
    { id:'c3_2',  es:'o',          en:'or',             gender:'n', rule:'conjunction', article:'', plural:'', ex:'¿Es lunes o martes?',                exEn:'Is it Monday or Tuesday?' },
    { id:'c3_3',  es:'pero',       en:'but',            gender:'n', rule:'conjunction', article:'', plural:'', ex:'Es viejo pero es bonito.',           exEn:'It is old but it is pretty.' },
    { id:'c3_4',  es:'porque',     en:'because',        gender:'n', rule:'conjunction', article:'', plural:'', ex:'Estoy feliz porque hay música.',     exEn:'I am happy because there is music.' },
    { id:'c3_5',  es:'si',         en:'if',             gender:'n', rule:'conjunction', article:'', plural:'', ex:'Si es sábado, hay fiesta.',          exEn:'If it is Saturday, there is a party.' },
    { id:'c3_6',  es:'mientras',   en:'while',          gender:'n', rule:'conjunction', article:'', plural:'', ex:'Hay música mientras estamos aquí.',  exEn:'There is music while we are here.' },
  ],

  /* El cine reading comprehension — PDF p. 39 */
  readingComprehensionDrills: [
    { sentence:'Roberto Vélez ___ de España.', answer:'es', choices:['es','está','son','están'], fills:['es'], en:'Roberto Vélez is from Spain.', rule:'origin → ser' },
    { sentence:'Rosa Morales ___ argentina.', answer:'es', choices:['es','está','son','están'], fills:['es'], en:'Rosa Morales is Argentine.', rule:'origin / nationality → ser' },
    { sentence:'Roberto y Rosa ___ en Cannes.', answer:'están', choices:['están','es','está','son'], fills:['están'], en:'Roberto and Rosa are in Cannes.', rule:'location → estar' },
    { sentence:'Las películas de Roberto son ___; las de Rosa son tristes.', answer:'cómicas', choices:['cómicas','cómicos','tristes','emocionantes'], fills:['cómicas'], en:'Roberto\'s films are funny; Rosa\'s are sad.', rule:'description → adjective agreement' },
    { sentence:'Roberto y Rosa ___ directores de cine.', answer:'son', choices:['son','están','es','están'], fills:['son'], en:'Roberto and Rosa are film directors.', rule:'profession → ser' },
  ],

  /* Exercise 3.6 — ser, estar, or hay in context */
  mixedVerbDrills: [
    { sentence:'¿Cuál ___ la escuela de los niños?', answer:'es', choices:['es','está','hay','son'], fills:['es'], en:'Which is the children\'s school?', rule:'selection → ser' },
    { sentence:'¿Quién ___ aquí?', answer:'está', choices:['está','es','hay','están'], fills:['está'], en:'Who is here?', rule:'location → estar' },
    { sentence:'¿De qué color ___ la puerta?', answer:'es', choices:['es','está','hay','son'], fills:['es'], en:'What color is the door?', rule:'description → ser' },
    { sentence:'¿___ edificios altos en Madrid?', answer:'Hay', choices:['Hay','Están','Son','Es'], fills:['Hay'], en:'Are there tall buildings in Madrid?', rule:'existence → hay' },
    { sentence:'La palabra ___ en la frase.', answer:'está', choices:['está','es','hay','están'], fills:['está'], en:'The word is in the sentence.', rule:'location → estar' },
    { sentence:'Los hombres ___ altos.', answer:'son', choices:['son','están','es','hay'], fills:['son'], en:'The men are tall.', rule:'description → ser' },
    { sentence:'Los niños ___ bajos.', answer:'son', choices:['son','están','es','hay'], fills:['son'], en:'The children are short.', rule:'description → ser' },
    { sentence:'Nosotros ___ estudiantes excelentes.', answer:'somos', choices:['somos','estamos','hay','son'], fills:['somos'], en:'We are excellent students.', rule:'identification → ser' },
    { sentence:'¿___ peligrosa la ciudad en la noche?', answer:'Es', choices:['Es','Está','Hay','Son'], fills:['Es'], en:'Is the city dangerous at night?', rule:'description → ser' },
  ],
};

/* ════════════════════════════════════════════════════════════════════════════
   Chapter 3 export
   ════════════════════════════════════════════════════════════════════════════ */

const CHAPTER_3 = {
  id: 3,
  title: 'Hay, Interrogative Words, Days, and Months',
  sublessons: [SUBLESSON_3_1, SUBLESSON_3_2, SUBLESSON_3_3, SUBLESSON_3_4],
};

export default CHAPTER_3;
export { SUBLESSON_3_1, SUBLESSON_3_2, SUBLESSON_3_3, SUBLESSON_3_4 };
