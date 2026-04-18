/* ─── Fluir · Chapter 2 Data ────────────────────────────────────────────────
   Source: Complete Spanish Step-by-Step, Bregstein (McGraw-Hill)
   Chapter 2: Estar, Ser, and Subject Pronouns
   4 sub-lessons:
     2-1  Subject Pronouns
     2-2  Estar (to be)
     2-3  Ser (to be)
     2-4  Ser vs Estar
   ─────────────────────────────────────────────────────────────────────────── */

/* ════════════════════════════════════════════════════════════════════════════
   SUB-LESSON 2-1 — Subject Pronouns
   ════════════════════════════════════════════════════════════════════════════ */

const SUBLESSON_2_1 = {
  id: '2-1',
  chapterId: 2,
  title: 'Subject Pronouns',
  subtitle: 'yo · tú · él · ella · usted · nosotros · ellos · ellas · ustedes',

  rules: [
    {
      id: 'r1',
      heading: 'Every Spanish verb needs a subject',
      body: 'The subject pronoun tells you WHO is performing the action. Spanish has singular and plural forms, and also formal vs informal distinctions.',
      examples: [
        { es: 'yo',       en: 'I',        note: 'always lowercase in Spanish' },
        { es: 'tú',       en: 'you (informal)', note: 'friends & family' },
        { es: 'usted',    en: 'you (formal)',    note: 'abbreviated Ud.' },
        { es: 'él / ella',en: 'he / she' },
      ],
    },
    {
      id: 'r2',
      heading: 'Plural pronouns',
      body: 'Nosotros means "we." Ellos refers to a group of males or a mixed group. Ellas refers to a group of only females. Ustedes (Uds.) means "you all" — used throughout Latin America instead of vosotros.',
      examples: [
        { es: 'nosotros', en: 'we' },
        { es: 'ellos',    en: 'they (male or mixed group)' },
        { es: 'ellas',    en: 'they (all female)' },
        { es: 'ustedes',  en: 'you all (Uds.)' },
      ],
      tip: 'Vosotros (you all, familiar) is used only in Spain. In Latin America, ustedes covers both formal and informal plural "you."',
    },
    {
      id: 'r3',
      heading: 'No "it" in Spanish',
      body: 'Spanish has no subject pronoun for "it." Él and ella refer to people and sometimes animals — never to things. The noun itself acts as the subject.',
      examples: [
        { es: 'El libro es azul.', en: 'The book is blue.', note: 'no "it" needed' },
        { es: 'La casa es grande.', en: 'The house is big.', note: 'no "it" needed' },
      ],
    },
  ],

  vocabulary: [
    { id:'p2_1',  es:'yo',        en:'I',                    gender:'n', rule:'pronoun', article:'', plural:'', ex:'Yo soy estudiante.',          exEn:'I am a student.' },
    { id:'p2_2',  es:'tú',        en:'you (informal)',        gender:'n', rule:'pronoun', article:'', plural:'', ex:'Tú eres mi amigo.',           exEn:'You are my friend.' },
    { id:'p2_3',  es:'él',        en:'he',                   gender:'m', rule:'pronoun', article:'', plural:'', ex:'Él está en la clase.',         exEn:'He is in the class.' },
    { id:'p2_4',  es:'ella',      en:'she',                  gender:'f', rule:'pronoun', article:'', plural:'', ex:'Ella es doctora.',             exEn:'She is a doctor.' },
    { id:'p2_5',  es:'usted',     en:'you (formal)',          gender:'n', rule:'pronoun', article:'', plural:'', ex:'¿Cómo está usted?',           exEn:'How are you?' },
    { id:'p2_6',  es:'nosotros',  en:'we',                   gender:'n', rule:'pronoun', article:'', plural:'', ex:'Nosotros somos amigos.',       exEn:'We are friends.' },
    { id:'p2_7',  es:'ellos',     en:'they (male/mixed)',     gender:'n', rule:'pronoun', article:'', plural:'', ex:'Ellos están cansados.',        exEn:'They are tired.' },
    { id:'p2_8',  es:'ellas',     en:'they (all female)',     gender:'n', rule:'pronoun', article:'', plural:'', ex:'Ellas son estudiantes.',       exEn:'They are students.' },
    { id:'p2_9',  es:'ustedes',   en:'you all',               gender:'n', rule:'pronoun', article:'', plural:'', ex:'¿Cómo están ustedes?',         exEn:'How are you all?' },
    { id:'p2_10', es:'vosotros',  en:'you all (Spain only)',  gender:'n', rule:'pronoun', article:'', plural:'', ex:'Vosotros estáis en España.',   exEn:'You all are in Spain.' },
  ],
};

/* ════════════════════════════════════════════════════════════════════════════
   SUB-LESSON 2-2 — Estar
   ════════════════════════════════════════════════════════════════════════════ */

const SUBLESSON_2_2 = {
  id: '2-2',
  chapterId: 2,
  title: 'Estar (to be)',
  subtitle: 'Location · Health · Mood · Taste & Appearance',

  rules: [
    {
      id: 'r1',
      heading: 'Conjugation of estar',
      body: 'Estar is irregular. Memorize these forms — they appear constantly. Notice that él, ella, and Ud. share the same form (está), as do ellos, ellas, and Uds. (están).',
      examples: [
        { es: 'yo estoy',         en: 'I am' },
        { es: 'tú estás',         en: 'you are' },
        { es: 'él / ella está',   en: 'he / she is' },
        { es: 'nosotros estamos', en: 'we are' },
        { es: 'ellos están',      en: 'they are' },
        { es: 'Uds. están',       en: 'you all are' },
      ],
    },
    {
      id: 'r2',
      heading: 'Estar — location',
      body: 'Use estar to describe where someone or something is physically located.',
      examples: [
        { es: 'Yo estoy en la clase.',          en: 'I am in the class.' },
        { es: 'El restaurante está en la ciudad.', en: 'The restaurant is in the city.' },
        { es: 'Ellas están en el baño.',         en: 'They are in the bathroom.' },
      ],
    },
    {
      id: 'r3',
      heading: 'Estar — health & mood',
      body: 'Use estar for health conditions and changing moods or emotional states. These are temporary, not permanent characteristics.',
      examples: [
        { es: 'Ella está enferma.',     en: 'She is sick.' },
        { es: 'Estoy feliz.',           en: 'I am happy.' },
        { es: 'Los hombres están cansados.', en: 'The men are tired.' },
        { es: '¿Estás enojado?',        en: 'Are you angry?' },
      ],
      tip: 'Key: estar = temporary states. If it can change by tomorrow, use estar.',
    },
    {
      id: 'r4',
      heading: 'Estar — taste & appearance',
      body: 'When estar is used with food, it means "tastes." When used with appearance, it means "looks." These are subjective, changeable observations.',
      examples: [
        { es: 'La comida está buena.',   en: 'The meal tastes good.' },
        { es: 'El pescado está delicioso.', en: 'The fish tastes delicious.' },
        { es: 'Ella está hermosa hoy.',  en: 'She looks beautiful today.' },
      ],
    },
  ],

  vocabulary: [
    { id:'v2_1',  es:'estoy',    en:'I am (estar)',           gender:'n', rule:'estar_conj', article:'', plural:'', ex:'Yo estoy en la clase.',          exEn:'I am in the class.' },
    { id:'v2_2',  es:'estás',    en:'you are (estar)',         gender:'n', rule:'estar_conj', article:'', plural:'', ex:'¿Estás tú en el hospital?',      exEn:'Are you in the hospital?' },
    { id:'v2_3',  es:'está',     en:'he/she/you is (estar)',  gender:'n', rule:'estar_conj', article:'', plural:'', ex:'Ella está enferma.',             exEn:'She is sick.' },
    { id:'v2_4',  es:'estamos',  en:'we are (estar)',          gender:'n', rule:'estar_conj', article:'', plural:'', ex:'Nosotros estamos en el carro.',  exEn:'We are in the car.' },
    { id:'v2_5',  es:'están',    en:'they/you all are (estar)',gender:'n', rule:'estar_conj', article:'', plural:'', ex:'Ellas están en el baño.',        exEn:'They are in the bathroom.' },
    /* Key vocabulary from chapter */
    { id:'v2_6',  es:'enfermo',  en:'sick',                   gender:'m', rule:'ends_o',     article:'', plural:'enfermos', ex:'El doctor está enfermo.',  exEn:'The doctor is sick.' },
    { id:'v2_7',  es:'cansado',  en:'tired',                  gender:'m', rule:'ends_o',     article:'', plural:'cansados', ex:'Los hombres están cansados.', exEn:'The men are tired.' },
    { id:'v2_8',  es:'contento', en:'happy (contented)',       gender:'m', rule:'ends_o',     article:'', plural:'contentos', ex:'Yo estoy contento.',      exEn:'I am happy.' },
    { id:'v2_9',  es:'enojado',  en:'angry',                  gender:'m', rule:'ends_o',     article:'', plural:'enojados', ex:'¿Estás enojado?',          exEn:'Are you angry?' },
    { id:'v2_10', es:'sabroso',  en:'delicious',              gender:'m', rule:'ends_o',     article:'', plural:'sabrosos', ex:'La sopa está sabrosa.',     exEn:'The soup tastes delicious.' },
    { id:'v2_11', es:'delicioso',en:'delicious',              gender:'m', rule:'ends_o',     article:'', plural:'deliciosos', ex:'El pescado está delicioso.', exEn:'The fish tastes delicious.' },
    { id:'v2_12', es:'aquí',     en:'here',                   gender:'n', rule:'adverb',     article:'', plural:'', ex:'¿Quién está aquí?',                exEn:'Who is here?' },
    { id:'v2_13', es:'allí',     en:'there',                  gender:'n', rule:'adverb',     article:'', plural:'', ex:'Ellos están allí.',               exEn:'They are there.' },
    { id:'v2_14', es:'¿cómo?',   en:'how?',                   gender:'n', rule:'interrogative', article:'', plural:'', ex:'¿Cómo estás tú?',              exEn:'How are you?' },
    { id:'v2_15', es:'¿dónde?',  en:'where?',                 gender:'n', rule:'interrogative', article:'', plural:'', ex:'¿Dónde está el baño?',         exEn:'Where is the bathroom?' },
    { id:'v2_16', es:'¿quién?',  en:'who?',                   gender:'n', rule:'interrogative', article:'', plural:'', ex:'¿Quién está aquí?',            exEn:'Who is here?' },
    { id:'v2_17', es:'bonito',   en:'pretty',                 gender:'m', rule:'ends_o',     article:'', plural:'bonitos', ex:'El patio es bonito.',        exEn:'The yard is pretty.' },
    { id:'v2_18', es:'lindo',    en:'pretty',                 gender:'m', rule:'ends_o',     article:'', plural:'lindos', ex:'La flor está linda.',         exEn:'The flower looks pretty.' },
  ],

  /* Conjugation table for game use */
  conjugations: [
    { pronoun:'yo',       form:'estoy',   en:'I am' },
    { pronoun:'tú',       form:'estás',   en:'you are' },
    { pronoun:'él',       form:'está',    en:'he is' },
    { pronoun:'ella',     form:'está',    en:'she is' },
    { pronoun:'Ud.',      form:'está',    en:'you are' },
    { pronoun:'nosotros', form:'estamos', en:'we are' },
    { pronoun:'ellos',    form:'están',   en:'they are' },
    { pronoun:'ellas',    form:'están',   en:'they are' },
    { pronoun:'Uds.',     form:'están',   en:'you all are' },
  ],
};

/* ════════════════════════════════════════════════════════════════════════════
   SUB-LESSON 2-3 — Ser
   ════════════════════════════════════════════════════════════════════════════ */

const SUBLESSON_2_3 = {
  id: '2-3',
  chapterId: 2,
  title: 'Ser (to be)',
  subtitle: 'Description · Profession · Origin · Identification · Material · Possession · Events',

  rules: [
    {
      id: 'r1',
      heading: 'Conjugation of ser',
      body: 'Ser is also irregular. These forms must be memorized. Notice the pattern — soy, eres, es, somos, son.',
      examples: [
        { es: 'yo soy',         en: 'I am' },
        { es: 'tú eres',        en: 'you are' },
        { es: 'él / ella es',   en: 'he / she is' },
        { es: 'nosotros somos', en: 'we are' },
        { es: 'ellos son',      en: 'they are' },
        { es: 'Uds. son',       en: 'you all are' },
      ],
    },
    {
      id: 'r2',
      heading: 'Ser — description & profession',
      body: 'Use ser for permanent or inherent descriptions — color, size, character. Also use ser for professions. Note: Spanish does not use a/an before an unmodified profession.',
      examples: [
        { es: 'La casa es roja.',         en: 'The house is red.' },
        { es: 'Somos simpáticos.',        en: 'We are nice.' },
        { es: 'Yo soy estudiante.',       en: 'I am a student.', note: 'no a/an' },
        { es: 'José es un estudiante fantástico.', en: 'José is a fantastic student.', note: 'a/an when modified' },
      ],
    },
    {
      id: 'r3',
      heading: 'Ser — origin, identification & material',
      body: 'De + ser expresses origin (from where) and material (made of). Use ser for nationality, religion, and relationships.',
      examples: [
        { es: 'Yo soy de Nueva York.',    en: 'I am from New York.' },
        { es: 'Somos amigos.',            en: 'We are friends.' },
        { es: 'La mesa es de madera.',    en: 'The table is (made of) wood.' },
        { es: 'La bolsa es de plástico.', en: 'The bag is (made of) plastic.' },
      ],
      tip: 'De + el contracts to del. El barco es del hombre = The boat belongs to the man.',
    },
    {
      id: 'r4',
      heading: 'Ser — possession & events',
      body: 'Use de + ser to express possession (ownership). Use ser to say where an event takes place — not estar.',
      examples: [
        { es: 'La muñeca es de la niña.',     en: 'The doll belongs to the girl.' },
        { es: 'Los perros son del muchacho.', en: 'The dogs belong to the boy.' },
        { es: 'La fiesta es en la casa de José.', en: 'The party takes place at José\'s house.' },
        { es: 'El concierto es en el club.',  en: 'The concert takes place at the club.' },
      ],
    },
  ],

  vocabulary: [
    { id:'s2_1',  es:'soy',     en:'I am (ser)',              gender:'n', rule:'ser_conj', article:'', plural:'', ex:'Yo soy de Puerto Rico.',          exEn:'I am from Puerto Rico.' },
    { id:'s2_2',  es:'eres',    en:'you are (ser)',            gender:'n', rule:'ser_conj', article:'', plural:'', ex:'¿Eres tú ingeniero?',             exEn:'Are you an engineer?' },
    { id:'s2_3',  es:'es',      en:'he/she/it is (ser)',       gender:'n', rule:'ser_conj', article:'', plural:'', ex:'El café es de Brasil.',           exEn:'The coffee is from Brazil.' },
    { id:'s2_4',  es:'somos',   en:'we are (ser)',             gender:'n', rule:'ser_conj', article:'', plural:'', ex:'Somos amigos de Raúl.',           exEn:'We are Raúl\'s friends.' },
    { id:'s2_5',  es:'son',     en:'they/you all are (ser)',   gender:'n', rule:'ser_conj', article:'', plural:'', ex:'Ellas son maestras excelentes.',  exEn:'They are excellent teachers.' },
    /* New vocabulary from ser sections */
    { id:'s2_6',  es:'arquitecto', en:'architect',            gender:'m', rule:'ends_o',   article:'el', plural:'arquitectos', ex:'Él es arquitecto.',   exEn:'He is an architect.' },
    { id:'s2_7',  es:'abogado',    en:'lawyer',               gender:'m', rule:'ends_o',   article:'el', plural:'abogados',    ex:'Roberto es abogado.',  exEn:'Robert is a lawyer.' },
    { id:'s2_8',  es:'ingeniero',  en:'engineer',             gender:'m', rule:'ends_o',   article:'el', plural:'ingenieros',  ex:'¿Eres tú ingeniero?',  exEn:'Are you an engineer?' },
    { id:'s2_9',  es:'madera',     en:'wood',                 gender:'f', rule:'ends_a',   article:'la', plural:'maderas',     ex:'La mesa es de madera.',exEn:'The table is made of wood.' },
    { id:'s2_10', es:'plástico',   en:'plastic',              gender:'m', rule:'ends_o',   article:'el', plural:'plásticos',   ex:'La bolsa es de plástico.', exEn:'The bag is made of plastic.' },
    { id:'s2_11', es:'cuero',      en:'leather',              gender:'m', rule:'ends_o',   article:'el', plural:'',           ex:'Los zapatos son de cuero.', exEn:'The shoes are made of leather.' },
    { id:'s2_12', es:'piedra',     en:'stone',                gender:'f', rule:'ends_a',   article:'la', plural:'piedras',     ex:'La casa es de piedra.',exEn:'The house is made of stone.' },
    { id:'s2_13', es:'vidrio',     en:'glass',                gender:'m', rule:'ends_o',   article:'el', plural:'vidrios',     ex:'Las ventanas son de vidrio.', exEn:'The windows are made of glass.' },
    { id:'s2_14', es:'fiesta',     en:'party',                gender:'f', rule:'ends_a',   article:'la', plural:'fiestas',     ex:'La fiesta es en la casa.', exEn:'The party takes place at the house.' },
    { id:'s2_15', es:'concierto',  en:'concert',              gender:'m', rule:'ends_o',   article:'el', plural:'conciertos',  ex:'El concierto es en el club.', exEn:'The concert takes place at the club.' },
  ],

  conjugations: [
    { pronoun:'yo',       form:'soy',   en:'I am' },
    { pronoun:'tú',       form:'eres',  en:'you are' },
    { pronoun:'él',       form:'es',    en:'he is' },
    { pronoun:'ella',     form:'es',    en:'she is' },
    { pronoun:'Ud.',      form:'es',    en:'you are' },
    { pronoun:'nosotros', form:'somos', en:'we are' },
    { pronoun:'ellos',    form:'son',   en:'they are' },
    { pronoun:'ellas',    form:'son',   en:'they are' },
    { pronoun:'Uds.',     form:'son',   en:'you all are' },
  ],
};

/* ════════════════════════════════════════════════════════════════════════════
   SUB-LESSON 2-4 — Ser vs Estar
   ════════════════════════════════════════════════════════════════════════════ */

const SUBLESSON_2_4 = {
  id: '2-4',
  chapterId: 2,
  title: 'Ser vs Estar',
  subtitle: 'Choosing the right "to be"',

  rules: [
    {
      id: 'r1',
      heading: 'The key distinction',
      body: 'Both ser and estar mean "to be" in English, but they are not interchangeable. The choice changes the meaning of the sentence. Ser = permanent/inherent. Estar = temporary/changeable.',
      examples: [
        { es: 'Ella es hermosa.',     en: 'She is beautiful. (permanent trait → ser)' },
        { es: 'Ella está hermosa hoy.', en: 'She looks beautiful today. (observation → estar)' },
        { es: 'El café es bueno.',    en: 'Coffee is good. (general truth → ser)' },
        { es: 'El café está bueno.',  en: 'The coffee tastes good. (right now → estar)' },
      ],
    },
    {
      id: 'r2',
      heading: 'Use SER for…',
      body: 'DOCTOR-PE is a memory device: Description, Occupation, Characteristic, Time/date, Origin, Relationship, Possession, Events.',
      examples: [
        { es: 'La casa es roja.',       en: 'Description — permanent color' },
        { es: 'Él es médico.',          en: 'Occupation — profession' },
        { es: 'Somos de España.',       en: 'Origin — where from' },
        { es: 'La fiesta es aquí.',     en: 'Event — where it takes place' },
      ],
    },
    {
      id: 'r3',
      heading: 'Use ESTAR for…',
      body: 'HALT is a memory device: Health, Activity/action in progress, Location, Temporary condition or emotion.',
      examples: [
        { es: 'Ella está enferma.',     en: 'Health — temporary' },
        { es: 'Estamos en la clase.',   en: 'Location — where someone is right now' },
        { es: 'Estoy cansado.',         en: 'Temporary condition' },
        { es: 'La sopa está sabrosa.',  en: 'Taste/appearance — subjective observation' },
      ],
      tip: 'Location rule exception: events use ser, not estar. "La fiesta es en casa" (ser) vs "El libro está en la mesa" (estar).',
    },
  ],

  /* Ser vs Estar decision questions for game */
  serVsEstarQuestions: [
    { sentence:'Daniel está muy cansado hoy.',          verb:'estar', use:'health/mood',    en:'Daniel is very tired today.' },
    { sentence:'El teléfono está en la mesa.',           verb:'estar', use:'location',       en:'The telephone is on the table.' },
    { sentence:'La mujer está bien.',                    verb:'estar', use:'health',         en:'The woman is well.' },
    { sentence:'El niño está enojado.',                  verb:'estar', use:'mood',           en:'The child is angry.' },
    { sentence:'Los muchachos están alegres.',           verb:'estar', use:'mood',           en:'The boys are happy.' },
    { sentence:'Yo estoy contento.',                     verb:'estar', use:'mood',           en:'I am happy.' },
    { sentence:'El café es de Colombia.',                verb:'ser',   use:'origin',         en:'The coffee is from Colombia.' },
    { sentence:'Ellos son doctores.',                    verb:'ser',   use:'profession',     en:'They are doctors.' },
    { sentence:'Los hermanos son simpáticos.',           verb:'ser',   use:'description',    en:'The brothers are nice.' },
    { sentence:'El hotel viejo es excelente.',           verb:'ser',   use:'description',    en:'The old hotel is excellent.' },
    { sentence:'Los zapatos son de cuero.',              verb:'ser',   use:'material',       en:'The shoes are made of leather.' },
    { sentence:'La mujer es de Ecuador.',                verb:'ser',   use:'origin',         en:'The woman is from Ecuador.' },
    { sentence:'La fiesta es en la casa de José.',       verb:'ser',   use:'event',          en:'The party takes place at José\'s house.' },
    { sentence:'San Francisco está en California.',      verb:'estar', use:'location',       en:'San Francisco is in California.' },
    { sentence:'El profesor está enfermo.',              verb:'estar', use:'health',         en:'The professor is sick.' },
    { sentence:'Nosotros estamos en la clase.',          verb:'estar', use:'location',       en:'We are in the class.' },
    { sentence:'Tú eres abogado.',                       verb:'ser',   use:'profession',     en:'You are a lawyer.' },
    { sentence:'La lección es fácil.',                   verb:'ser',   use:'description',    en:'The lesson is easy.' },
    { sentence:'Los estudiantes están en la ciudad.',    verb:'estar', use:'location',       en:'The students are in the city.' },
    { sentence:'Ellas son inteligentes.',                verb:'ser',   use:'description',    en:'They are intelligent.' },
    { sentence:'Los doctores están aquí.',               verb:'estar', use:'location',       en:'The doctors are here.' },
    { sentence:'El profesor está contento.',             verb:'estar', use:'mood',           en:'The professor is happy.' },
    { sentence:'La comida está deliciosa.',              verb:'estar', use:'taste',          en:'The food tastes delicious.' },
    { sentence:'Los tomates son de California.',         verb:'ser',   use:'origin',         en:'The tomatoes are from California.' },
    { sentence:'Julia está alegre porque la fiesta es fantástica.', verb:'estar', use:'mood', en:'Julia is happy because the party is fantastic.' },
  ],

  /* Household vocabulary from the reading "La casa" */
  vocabulary: [
    { id:'h2_1',  es:'la alcoba',    en:'the bedroom',         gender:'f', rule:'ends_a',    article:'la', plural:'las alcobas',    ex:'Mi alcoba es azul y blanca.',      exEn:'My bedroom is blue and white.' },
    { id:'h2_2',  es:'la alfombra',  en:'the rug',             gender:'f', rule:'ends_a',    article:'la', plural:'las alfombras',  ex:'La alfombra es roja.',             exEn:'The rug is red.' },
    { id:'h2_3',  es:'el bolígrafo', en:'the ballpoint pen',   gender:'m', rule:'ends_o',    article:'el', plural:'los bolígrafos', ex:'El bolígrafo está en la mesa.',    exEn:'The pen is on the table.' },
    { id:'h2_4',  es:'la cocina',    en:'the kitchen',         gender:'f', rule:'ends_a',    article:'la', plural:'las cocinas',    ex:'La cocina es amplia.',             exEn:'The kitchen is spacious.' },
    { id:'h2_5',  es:'el comedor',   en:'the dining room',     gender:'m', rule:'masc_irreg',article:'el', plural:'los comedores',  ex:'El comedor es sencillo.',          exEn:'The dining room is simple.' },
    { id:'h2_6',  es:'la cortina',   en:'the curtain',         gender:'f', rule:'ends_a',    article:'la', plural:'las cortinas',   ex:'Las cortinas son gruesas.',        exEn:'The curtains are thick.' },
    { id:'h2_7',  es:'el cuaderno',  en:'the notebook',        gender:'m', rule:'ends_o',    article:'el', plural:'los cuadernos',  ex:'El cuaderno está en el estudio.',  exEn:'The notebook is in the study.' },
    { id:'h2_8',  es:'la estufa',    en:'the stove',           gender:'f', rule:'ends_a',    article:'la', plural:'las estufas',    ex:'La estufa está limpia.',           exEn:'The stove is clean.' },
    { id:'h2_9',  es:'el horno',     en:'the oven',            gender:'m', rule:'masc_irreg',article:'el', plural:'los hornos',     ex:'El horno está limpio.',            exEn:'The oven is clean.' },
    { id:'h2_10', es:'el lápiz',     en:'the pencil',          gender:'m', rule:'masc_irreg',article:'el', plural:'los lápices',    ex:'El lápiz está en el cuaderno.',   exEn:'The pencil is in the notebook.' },
    { id:'h2_11', es:'la nevera',    en:'the refrigerator',    gender:'f', rule:'ends_a',    article:'la', plural:'las neveras',    ex:'La nevera es bastante grande.',    exEn:'The refrigerator is quite big.' },
    { id:'h2_12', es:'la pared',     en:'the wall',            gender:'f', rule:'fem_irreg',  article:'la', plural:'las paredes',    ex:'Las paredes son blancas.',         exEn:'The walls are white.' },
    { id:'h2_13', es:'el patio',     en:'the yard / patio',   gender:'m', rule:'ends_o',    article:'el', plural:'los patios',     ex:'El patio es bonito.',              exEn:'The yard is pretty.' },
    { id:'h2_14', es:'la sala',      en:'the living room',     gender:'f', rule:'ends_a',    article:'la', plural:'las salas',      ex:'Dos sillones están en la sala.',   exEn:'Two armchairs are in the living room.' },
    { id:'h2_15', es:'el estudio',   en:'the study',           gender:'m', rule:'ends_o',    article:'el', plural:'los estudios',   ex:'Mis libros están en el estudio.',  exEn:'My books are in the study.' },
    { id:'h2_16', es:'el vestíbulo', en:'the entryway',        gender:'m', rule:'ends_o',    article:'el', plural:'los vestíbulos', ex:'Un espejo está en el vestíbulo.',  exEn:'A mirror is in the entryway.' },
    { id:'h2_17', es:'cómodo',       en:'comfortable',         gender:'m', rule:'ends_o',    article:'',   plural:'cómodos',        ex:'El sillón es cómodo.',             exEn:'The armchair is comfortable.' },
    { id:'h2_18', es:'amplio',       en:'spacious / ample',    gender:'m', rule:'ends_o',    article:'',   plural:'amplios',        ex:'La cocina es amplia.',             exEn:'The kitchen is spacious.' },
    { id:'h2_19', es:'limpio',       en:'clean',               gender:'m', rule:'ends_o',    article:'',   plural:'limpios',        ex:'La estufa está limpia.',           exEn:'The stove is clean.' },
    { id:'h2_20', es:'sencillo',     en:'simple',              gender:'m', rule:'ends_o',    article:'',   plural:'sencillos',      ex:'El comedor es sencillo.',          exEn:'The dining room is simple.' },
  ],
};

/* ════════════════════════════════════════════════════════════════════════════
   Chapter 2 export
   ════════════════════════════════════════════════════════════════════════════ */

const CHAPTER_2 = {
  id: 2,
  title: 'Estar, Ser, and Subject Pronouns',
  unlocked: false,
  sublessons: [SUBLESSON_2_1, SUBLESSON_2_2, SUBLESSON_2_3, SUBLESSON_2_4],
};

export default CHAPTER_2;
export { SUBLESSON_2_1, SUBLESSON_2_2, SUBLESSON_2_3, SUBLESSON_2_4 };
