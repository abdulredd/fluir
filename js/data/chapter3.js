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
    { id:'h3_3',  es:'el árbol',      en:'the tree',              gender:'m', rule:'masc_irreg',  article:'el', plural:'los árboles', ex:'Hay un árbol en el jardín.',  exEn:'There is a tree in the garden.' },
    { id:'h3_4',  es:'el vaso',       en:'the glass',             gender:'m', rule:'ends_o',      article:'el', plural:'los vasos',   ex:'Hay dos vasos en la mesa.',  exEn:'There are two glasses on the table.' },
    { id:'h3_5',  es:'el piso',       en:'the floor',             gender:'m', rule:'ends_o',      article:'el', plural:'los pisos',   ex:'Hay tres libros en el piso.', exEn:'There are three books on the floor.' },
    { id:'h3_6',  es:'el cuarto',     en:'the room',              gender:'m', rule:'ends_o',      article:'el', plural:'los cuartos', ex:'Hay una mesa marrón en el cuarto.', exEn:'There is a brown table in the room.' },
    { id:'h3_7',  es:'el zoológico',  en:'the zoo',               gender:'m', rule:'ends_o',      article:'el', plural:'los zoológicos', ex:'Hay tigres en el zoológico.', exEn:'There are tigers in the zoo.' },
    { id:'h3_8',  es:'el cielo',      en:'the sky',               gender:'m', rule:'ends_o',      article:'el', plural:'los cielos',  ex:'Hay estrellas en el cielo.', exEn:'There are stars in the sky.' },
    { id:'h3_9',  es:'el mercado',    en:'the market',            gender:'m', rule:'ends_o',      article:'el', plural:'los mercados', ex:'Hay tomates rojos en este mercado.', exEn:'There are red tomatoes in this market.' },
    { id:'h3_10', es:'el periódico',  en:'the newspaper',         gender:'m', rule:'ends_o',      article:'el', plural:'los periódicos', ex:'Hay periódicos en la tienda.', exEn:'There are newspapers in the store.' },
    { id:'h3_11', es:'la revista',    en:'the magazine',          gender:'f', rule:'ends_a',      article:'la', plural:'las revistas', ex:'No hay revistas en el hotel.', exEn:'There are no magazines in the hotel.' },
    { id:'h3_12', es:'la luz',        en:'the light',             gender:'f', rule:'fem_irreg',   article:'la', plural:'las luces',   ex:'No hay luz en el baño.',     exEn:'There is no light in the bathroom.' },
    { id:'h3_13', es:'el balcón',     en:'the balcony',           gender:'m', rule:'masc_irreg',  article:'el', plural:'los balcones', ex:'Hay flores en el balcón.', exEn:'There are flowers on the balcony.' },
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
  ],
};

/* ════════════════════════════════════════════════════════════════════════════
   SUB-LESSON 3-2 — Interrogative Words
   ════════════════════════════════════════════════════════════════════════════ */

const SUBLESSON_3_2 = {
  id: '3-2',
  chapterId: 3,
  title: 'Interrogative Words',
  subtitle: '¿Cómo? · ¿Dónde? · ¿Quién? · ¿Qué? · ¿Cuál? · ¿Por qué? · ¿Cuándo?',

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
      tip: '¿Cuánto? = how much (singular). ¿Cuántos/Cuántas? = how many (agree in gender with the noun).',
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
  ],

  /* Match question word to its meaning */
  interrogativeQuestions: [
    { word:'¿cómo?',    en:'how?',              example:'¿Cómo estás tú?' },
    { word:'¿dónde?',   en:'where?',            example:'¿Dónde está el baño?' },
    { word:'¿quién?',   en:'who? (sing.)',       example:'¿Quién está aquí?' },
    { word:'¿qué?',     en:'what?',             example:'¿Qué día es hoy?' },
    { word:'¿cuál?',    en:'which one?',        example:'¿Cuál es la capital?' },
    { word:'¿por qué?', en:'why?',              example:'¿Por qué estamos alegres?' },
    { word:'¿cuánto?',  en:'how much?',         example:'¿Cuánto es?' },
    { word:'¿cuántos?', en:'how many? (m)',      example:'¿Cuántos gatos hay?' },
    { word:'¿cuándo?',  en:'when?',             example:'¿Cuándo es la fiesta?' },
    { word:'¿de dónde?',en:'from where?',       example:'¿De dónde es Ud.?' },
    { word:'¿de quién?',en:'whose?',            example:'¿De quién es el carro?' },
    { word:'¿con quién?',en:'with whom?',       example:'¿Con quién estás?' },
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
    { id:'d3_1',  es:'lunes',       en:'Monday',      gender:'m', rule:'masc_irreg', article:'el', plural:'los lunes',      ex:'Hay clase los lunes.',         exEn:'There is class on Mondays.' },
    { id:'d3_2',  es:'martes',      en:'Tuesday',     gender:'m', rule:'masc_irreg', article:'el', plural:'los martes',     ex:'El martes es el día del amor.',exEn:'Tuesday is Valentine\'s Day.' },
    { id:'d3_3',  es:'miércoles',   en:'Wednesday',   gender:'m', rule:'masc_irreg', article:'el', plural:'los miércoles',  ex:'Estamos en clase los miércoles.', exEn:'We are in class on Wednesdays.' },
    { id:'d3_4',  es:'jueves',      en:'Thursday',    gender:'m', rule:'masc_irreg', article:'el', plural:'los jueves',     ex:'El jueves es el día de acción de gracias.', exEn:'Thursday is Thanksgiving Day.' },
    { id:'d3_5',  es:'viernes',     en:'Friday',      gender:'m', rule:'masc_irreg', article:'el', plural:'los viernes',    ex:'¿Dónde estás los viernes?',    exEn:'Where are you on Fridays?' },
    { id:'d3_6',  es:'sábado',      en:'Saturday',    gender:'m', rule:'ends_o',     article:'el', plural:'los sábados',    ex:'¿Hay fiestas los sábados?',    exEn:'Are there parties on Saturdays?' },
    { id:'d3_7',  es:'domingo',     en:'Sunday',      gender:'m', rule:'ends_o',     article:'el', plural:'los domingos',   ex:'¿Dónde está Tomás los domingos?', exEn:'Where is Thomas on Sundays?' },
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
    { id:'d3_20', es:'el verano',   en:'the summer',  gender:'m', rule:'ends_o',     article:'el', plural:'', ex:'En el verano, el clima es maravilloso.', exEn:'In summer, the climate is marvelous.' },
    { id:'d3_21', es:'el otoño',    en:'the autumn',  gender:'m', rule:'ends_o',     article:'el', plural:'', ex:'En el otoño, hay hojas amarillas.', exEn:'In autumn, there are yellow leaves.' },
    { id:'d3_22', es:'el invierno', en:'the winter',  gender:'m', rule:'masc_irreg', article:'el', plural:'', ex:'Mucha gente está en los restaurantes porque es el invierno.', exEn:'Many people are in restaurants because it is winter.' },
    { id:'d3_23', es:'la primavera',en:'the spring',  gender:'f', rule:'ends_a',     article:'la', plural:'', ex:'En la primavera, hay flores bellas.', exEn:'In spring, there are beautiful flowers.' },
    /* Parts of day */
    { id:'d3_24', es:'la mañana',   en:'the morning', gender:'f', rule:'ends_a',     article:'la', plural:'las mañanas', ex:'Hay música en la mañana.',    exEn:'There is music in the morning.' },
    { id:'d3_25', es:'la tarde',    en:'the afternoon',gender:'f', rule:'ends_a',    article:'la', plural:'las tardes',  ex:'Hay una comida en la tarde.', exEn:'There is a meal in the afternoon.' },
    { id:'d3_26', es:'la noche',    en:'the night / evening', gender:'f', rule:'ends_e', article:'la', plural:'las noches', ex:'¿Peligrosa la ciudad en la noche?', exEn:'Is the city dangerous at night?' },
    { id:'d3_27', es:'la semana',   en:'the week',    gender:'f', rule:'ends_a',     article:'la', plural:'las semanas', ex:'Hay siete días en la semana.', exEn:'There are seven days in a week.' },
    { id:'d3_28', es:'el mes',      en:'the month',   gender:'m', rule:'masc_irreg', article:'el', plural:'los meses',   ex:'¿Qué mes es?',                exEn:'What month is it?' },
    { id:'d3_29', es:'el año',      en:'the year',    gender:'m', rule:'ends_o',     article:'el', plural:'los años',    ex:'¿Cuántos días hay en un año?', exEn:'How many days are there in a year?' },
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
    { id:'n3_1',  es:'el avión',       en:'the airplane',    gender:'m', rule:'masc_irreg', article:'el', plural:'los aviones',    ex:'Hay un avión en el cielo.',       exEn:'There is an airplane in the sky.' },
    { id:'n3_2',  es:'el bus',         en:'the bus',         gender:'m', rule:'masc_irreg', article:'el', plural:'los buses',      ex:'Hay buses en la avenida.',        exEn:'There are buses on the avenue.' },
    { id:'n3_3',  es:'el campo',       en:'the countryside', gender:'m', rule:'ends_o',     article:'el', plural:'los campos',     ex:'Hay perros en el campo.',         exEn:'There are dogs in the countryside.' },
    { id:'n3_4',  es:'el coche',       en:'the car',         gender:'m', rule:'ends_e',     article:'el', plural:'los coches',     ex:'El coche es caro.',               exEn:'The car is expensive.' },
    { id:'n3_5',  es:'el cumpleaños',  en:'the birthday',    gender:'m', rule:'masc_irreg', article:'el', plural:'los cumpleaños', ex:'¿Cuándo es tu cumpleaños?',       exEn:'When is your birthday?' },
    { id:'n3_6',  es:'el dinero',      en:'the money',       gender:'m', rule:'ends_o',     article:'el', plural:'',              ex:'No hay dinero en la bolsa.',       exEn:'There is no money in the bag.' },
    { id:'n3_7',  es:'el edificio',    en:'the building',    gender:'m', rule:'ends_o',     article:'el', plural:'los edificios',  ex:'Los edificios son altos.',         exEn:'The buildings are tall.' },
    { id:'n3_8',  es:'el equipaje',    en:'the baggage',     gender:'m', rule:'ends_e',     article:'el', plural:'',              ex:'El equipaje está en el avión.',    exEn:'The baggage is on the airplane.' },
    { id:'n3_9',  es:'el jardín',      en:'the garden',      gender:'m', rule:'masc_irreg', article:'el', plural:'los jardines',   ex:'Hay flores en el jardín.',        exEn:'There are flowers in the garden.' },
    { id:'n3_10', es:'el mensaje',     en:'the message',     gender:'m', rule:'ends_e',     article:'el', plural:'los mensajes',   ex:'Hay un mensaje en la mesa.',      exEn:'There is a message on the table.' },
    { id:'n3_11', es:'el país',        en:'the country',     gender:'m', rule:'masc_irreg', article:'el', plural:'los países',     ex:'¿De qué país es ella?',           exEn:'What country is she from?' },
    { id:'n3_12', es:'el papel',       en:'the paper',       gender:'m', rule:'masc_irreg', article:'el', plural:'los papeles',    ex:'Hay papel en la mesa.',           exEn:'There is paper on the table.' },
    { id:'n3_13', es:'el parque',      en:'the park',        gender:'m', rule:'ends_e',     article:'el', plural:'los parques',    ex:'Hay animales en el parque.',      exEn:'There are animals in the park.' },
    { id:'n3_14', es:'el precio',      en:'the price',       gender:'m', rule:'ends_o',     article:'el', plural:'los precios',    ex:'¿Cuánto es el precio?',           exEn:'How much is the price?' },
    { id:'n3_15', es:'el ruido',       en:'the noise',       gender:'m', rule:'ends_o',     article:'el', plural:'los ruidos',     ex:'Hay ruido en la ciudad.',         exEn:'There is noise in the city.' },
    { id:'n3_16', es:'el salón',       en:'the classroom',   gender:'m', rule:'masc_irreg', article:'el', plural:'los salones',    ex:'Los estudiantes están en el salón.', exEn:'The students are in the classroom.' },
    { id:'n3_17', es:'el teatro',      en:'the theater',     gender:'m', rule:'ends_o',     article:'el', plural:'los teatros',    ex:'El concierto es en el teatro.',   exEn:'The concert is at the theater.' },
    { id:'n3_18', es:'el tema',        en:'the theme / topic',gender:'m', rule:'masc_a_excep', article:'el', plural:'los temas',  ex:'¿Cuál es el tema de la lección?', exEn:'What is the theme of the lesson?' },
    { id:'n3_19', es:'el viaje',       en:'the trip',        gender:'m', rule:'ends_e',     article:'el', plural:'los viajes',     ex:'El viaje es tranquilo.',          exEn:'The trip is peaceful.' },
    { id:'n3_20', es:'el hogar',       en:'the home',        gender:'m', rule:'masc_irreg', article:'el', plural:'los hogares',    ex:'El hogar es cómodo.',             exEn:'The home is comfortable.' },
    { id:'n3_21', es:'el sueño',       en:'the dream',       gender:'m', rule:'ends_o',     article:'el', plural:'los sueños',     ex:'El sueño es raro.',               exEn:'The dream is strange.' },
    { id:'n3_22', es:'el sitio',       en:'the place',       gender:'m', rule:'ends_o',     article:'el', plural:'los sitios',     ex:'¿Cuál es el sitio de la fiesta?', exEn:'What is the place of the party?' },
    /* Feminine nouns */
    { id:'n3_23', es:'la avenida',     en:'the avenue',      gender:'f', rule:'ends_a',     article:'la', plural:'las avenidas',   ex:'La avenida es ancha.',            exEn:'The avenue is wide.' },
    { id:'n3_24', es:'la calle',       en:'the street',      gender:'f', rule:'fem_irreg',  article:'la', plural:'las calles',     ex:'Las calles de México son estrechas.', exEn:'The streets of Mexico are narrow.' },
    { id:'n3_25', es:'la camisa',      en:'the shirt',       gender:'f', rule:'ends_a',     article:'la', plural:'las camisas',    ex:'La camisa es elegante.',          exEn:'The shirt is elegant.' },
    { id:'n3_26', es:'la carta',       en:'the letter',      gender:'f', rule:'ends_a',     article:'la', plural:'las cartas',     ex:'Hay una carta en la mesa.',       exEn:'There is a letter on the table.' },
    { id:'n3_27', es:'la cuenta',      en:'the bill / check',gender:'f', rule:'ends_a',     article:'la', plural:'las cuentas',    ex:'¿Cuánto es la cuenta?',           exEn:'How much is the bill?' },
    { id:'n3_28', es:'la ducha',       en:'the shower',      gender:'f', rule:'ends_a',     article:'la', plural:'las duchas',     ex:'La ducha está en el baño.',       exEn:'The shower is in the bathroom.' },
    { id:'n3_29', es:'la entrada',     en:'the entrance',    gender:'f', rule:'ends_a',     article:'la', plural:'las entradas',   ex:'La entrada es estrecha.',         exEn:'The entrance is narrow.' },
    { id:'n3_30', es:'la escalera',    en:'the stairs',      gender:'f', rule:'ends_a',     article:'la', plural:'las escaleras',  ex:'La escalera es alta.',            exEn:'The staircase is tall.' },
    { id:'n3_31', es:'la escuela',     en:'the school',      gender:'f', rule:'ends_a',     article:'la', plural:'las escuelas',   ex:'Hay una escuela en el pueblo.',   exEn:'There is a school in the town.' },
    { id:'n3_32', es:'la fiesta',      en:'the party',       gender:'f', rule:'ends_a',     article:'la', plural:'las fiestas',    ex:'Hay fiestas los viernes.',        exEn:'There are parties on Fridays.' },
    { id:'n3_33', es:'la frase',       en:'the sentence',    gender:'f', rule:'ends_e',     article:'la', plural:'las frases',     ex:'La frase está en la página.',     exEn:'The sentence is on the page.' },
    { id:'n3_34', es:'la gente',       en:'the people',      gender:'f', rule:'ends_e',     article:'la', plural:'',              ex:'La gente es simpática.',          exEn:'The people are nice.' },
    { id:'n3_35', es:'la guerra',      en:'the war',         gender:'f', rule:'ends_a',     article:'la', plural:'las guerras',    ex:'La guerra es larga.',             exEn:'The war is long.' },
    { id:'n3_36', es:'la habitación',  en:'the room',        gender:'f', rule:'ends_cion',  article:'la', plural:'las habitaciones', ex:'La habitación es amplia.',     exEn:'The room is spacious.' },
    { id:'n3_37', es:'la hoja',        en:'the leaf',        gender:'f', rule:'ends_a',     article:'la', plural:'las hojas',      ex:'En el otoño, hay hojas amarillas.', exEn:'In autumn, there are yellow leaves.' },
    { id:'n3_38', es:'la llave',       en:'the key',         gender:'f', rule:'ends_e',     article:'la', plural:'las llaves',     ex:'La llave está en la puerta.',     exEn:'The key is in the door.' },
    { id:'n3_39', es:'la música',      en:'the music',       gender:'f', rule:'ends_a',     article:'la', plural:'',              ex:'Hay música en la mañana.',        exEn:'There is music in the morning.' },
    { id:'n3_40', es:'la obra',        en:'the play (theater)',gender:'f', rule:'ends_a',   article:'la', plural:'las obras',      ex:'La obra es emocionante.',         exEn:'The play is exciting.' },
    { id:'n3_41', es:'la palabra',     en:'the word',        gender:'f', rule:'ends_a',     article:'la', plural:'las palabras',   ex:'La palabra está en la frase.',    exEn:'The word is in the sentence.' },
    { id:'n3_42', es:'la playa',       en:'the beach',       gender:'f', rule:'ends_a',     article:'la', plural:'las playas',     ex:'Los niños están en la playa.',    exEn:'The children are at the beach.' },
    { id:'n3_43', es:'la pregunta',    en:'the question',    gender:'f', rule:'ends_a',     article:'la', plural:'las preguntas',  ex:'Hay preguntas de los estudiantes.', exEn:'There are questions from the students.' },
    { id:'n3_44', es:'la puerta',      en:'the door',        gender:'f', rule:'ends_a',     article:'la', plural:'las puertas',    ex:'La puerta es fuerte.',            exEn:'The door is strong.' },
    { id:'n3_45', es:'la salida',      en:'the exit',        gender:'f', rule:'ends_a',     article:'la', plural:'las salidas',    ex:'La salida es estrecha.',          exEn:'The exit is narrow.' },
    { id:'n3_46', es:'la salud',       en:'the health',      gender:'f', rule:'ends_dad',   article:'la', plural:'',              ex:'La salud es importante.',         exEn:'Health is important.' },
    { id:'n3_47', es:'la tarea',       en:'the homework',    gender:'f', rule:'ends_a',     article:'la', plural:'las tareas',     ex:'La tarea es sencilla.',           exEn:'The homework is simple.' },
    { id:'n3_48', es:'la tarjeta',     en:'the postcard',    gender:'f', rule:'ends_a',     article:'la', plural:'las tarjetas',   ex:'Hay una tarjeta en la mesa.',     exEn:'There is a postcard on the table.' },
    /* Adjectives */
    { id:'a3_1',  es:'alto',       en:'tall',           gender:'m', rule:'ends_o',    article:'', plural:'altos',      ex:'Los edificios son altos.',        exEn:'The buildings are tall.' },
    { id:'a3_2',  es:'amable',     en:'kind',           gender:'m', rule:'invariable',article:'', plural:'amables',    ex:'El hombre amable es el doctor.',  exEn:'The kind man is the doctor.' },
    { id:'a3_3',  es:'amistoso',   en:'friendly',       gender:'m', rule:'ends_o',    article:'', plural:'amistosos',  ex:'La mujer amistosa es mi amiga.',  exEn:'The friendly woman is my friend.' },
    { id:'a3_4',  es:'ancho',      en:'wide',           gender:'m', rule:'ends_o',    article:'', plural:'anchos',     ex:'La avenida es ancha.',            exEn:'The avenue is wide.' },
    { id:'a3_5',  es:'bajo',       en:'short (height) / low', gender:'m', rule:'ends_o', article:'', plural:'bajos', ex:'Las casas son bajas.',            exEn:'The houses are short.' },
    { id:'a3_6',  es:'bello',      en:'beautiful',      gender:'m', rule:'ends_o',    article:'', plural:'bellos',     ex:'Las flores son bellas.',          exEn:'The flowers are beautiful.' },
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
    { id:'a3_18', es:'libre',      en:'free',           gender:'m', rule:'invariable',article:'', plural:'libres',     ex:'El parque es libre.',             exEn:'The park is free.' },
    { id:'a3_19', es:'nuevo',      en:'new',            gender:'m', rule:'ends_o',    article:'', plural:'nuevos',     ex:'El coche es nuevo.',              exEn:'The car is new.' },
    { id:'a3_20', es:'peligroso',  en:'dangerous',      gender:'m', rule:'ends_o',    article:'', plural:'peligrosos', ex:'La ciudad es peligrosa en la noche.', exEn:'The city is dangerous at night.' },
    { id:'a3_21', es:'pesado',     en:'heavy / dull',   gender:'m', rule:'ends_o',    article:'', plural:'pesados',    ex:'El equipaje es pesado.',          exEn:'The baggage is heavy.' },
    { id:'a3_22', es:'rápido',     en:'fast',           gender:'m', rule:'ends_o',    article:'', plural:'rápidos',    ex:'El avión es rápido.',             exEn:'The airplane is fast.' },
    { id:'a3_23', es:'raro',       en:'strange',        gender:'m', rule:'ends_o',    article:'', plural:'raros',      ex:'El sueño es raro.',               exEn:'The dream is strange.' },
    { id:'a3_24', es:'suave',      en:'soft',           gender:'m', rule:'invariable',article:'', plural:'suaves',     ex:'La música es suave.',             exEn:'The music is soft.' },
    { id:'a3_25', es:'tranquilo',  en:'peaceful',       gender:'m', rule:'ends_o',    article:'', plural:'tranquilos', ex:'El viaje es tranquilo.',          exEn:'The trip is peaceful.' },
    /* Conjunctions */
    { id:'c3_1',  es:'y',          en:'and',            gender:'n', rule:'conjunction', article:'', plural:'', ex:'Hay flores y árboles en el parque.', exEn:'There are flowers and trees in the park.' },
    { id:'c3_2',  es:'o',          en:'or',             gender:'n', rule:'conjunction', article:'', plural:'', ex:'¿Es lunes o martes?',                exEn:'Is it Monday or Tuesday?' },
    { id:'c3_3',  es:'pero',       en:'but',            gender:'n', rule:'conjunction', article:'', plural:'', ex:'Es viejo pero es bonito.',           exEn:'It is old but it is pretty.' },
    { id:'c3_4',  es:'porque',     en:'because',        gender:'n', rule:'conjunction', article:'', plural:'', ex:'Estoy feliz porque hay música.',     exEn:'I am happy because there is music.' },
    { id:'c3_5',  es:'si',         en:'if',             gender:'n', rule:'conjunction', article:'', plural:'', ex:'Si es sábado, hay fiesta.',          exEn:'If it is Saturday, there is a party.' },
    { id:'c3_6',  es:'mientras',   en:'while',          gender:'n', rule:'conjunction', article:'', plural:'', ex:'Hay música mientras estamos aquí.',  exEn:'There is music while we are here.' },
  ],
};

/* ════════════════════════════════════════════════════════════════════════════
   Chapter 3 export
   ════════════════════════════════════════════════════════════════════════════ */

const CHAPTER_3 = {
  id: 3,
  title: 'Hay, Interrogative Words, Days, and Months',
  unlocked: false,
  sublessons: [SUBLESSON_3_1, SUBLESSON_3_2, SUBLESSON_3_3, SUBLESSON_3_4],
};

export default CHAPTER_3;
export { SUBLESSON_3_1, SUBLESSON_3_2, SUBLESSON_3_3, SUBLESSON_3_4 };
