/* ─── Fluir · Chapter 1 Data ────────────────────────────────────────────────
   Source: Complete Spanish Step-by-Step, Bregstein (McGraw-Hill)
   Chapter 1: Nouns, Articles, and Adjectives
   ─────────────────────────────────────────────────────────────────────────── */

/* ── Gender rules — used for wrong-answer feedback ── */
const GENDER_RULES = {
  ends_o:       'Most nouns ending in -o are masculine → el',
  ends_a:       'Most nouns ending in -a are feminine → la',
  ends_cion:    'Nouns ending in -ción are always feminine → la',
  ends_sion:    'Nouns ending in -sión are always feminine → la',
  ends_dad:     'Nouns ending in -dad are always feminine → la',
  ends_tad:     'Nouns ending in -tad are always feminine → la',
  ends_tud:     'Nouns ending in -tud are always feminine → la',
  masc_a_excep: 'Exception — some nouns ending in -a are masculine (el día, el mapa, el programa…)',
  fem_o_excep:  'Exception — a few nouns ending in -o are feminine (la foto, la mano, la radio)',
  masc_irreg:   'This masculine noun does not end in -o — must be memorized with its article',
  fem_irreg:    'This feminine noun does not follow a pattern — must be memorized with its article',
  ista_gender:  'Nouns ending in -ista can be masculine or feminine — the article shows gender',
  nte_gender:   'Nouns ending in -nte can be masculine or feminine — the article shows gender',
};

/* ── Plural rules ── */
const PLURAL_RULES = {
  vowel_masc:   'Masculine nouns ending in a vowel add -s → los ___s',
  vowel_fem:    'Feminine nouns ending in a vowel add -s → las ___s',
  cons_masc:    'Masculine nouns ending in a consonant add -es → los ___es',
  cons_fem:     'Feminine nouns ending in a consonant add -es → las ___es',
  cion_plural:  'Nouns ending in -ción drop the accent and add -es → -ciones',
};

/* ── Adjective rules ── */
const ADJ_RULES = {
  o_masc:       'Adjectives ending in -o are masculine — they agree with the masculine noun',
  a_fem:        'Adjectives ending in -o change to -a for feminine nouns',
  invariable:   'Adjectives not ending in -o have the same form for masculine and feminine nouns',
  plural_vowel: 'Adjectives ending in a vowel add -s to form the plural',
  plural_cons:  'Adjectives ending in a consonant add -es to form the plural',
  position:     'In Spanish, adjectives almost always follow the noun they describe',
};

/* ════════════════════════════════════════════════════════════════════════════
   SUB-LESSON 1 — Gender & Definite Articles
   ════════════════════════════════════════════════════════════════════════════ */

const SUBLESSON_1 = {
  id: '1-1',
  chapterId: 1,
  title: 'Gender & Definite Articles',
  subtitle: 'el · la · los · las',

  /* ── Teach-first rule cards ── */
  rules: [
    {
      id: 'r1',
      heading: 'All Spanish nouns have gender',
      body: 'Every Spanish noun is either masculine or feminine. The definite article (English "the") must agree with the noun in gender and number.',
      examples: [
        { es: 'el libro', en: 'the book', note: 'masculine' },
        { es: 'la casa',  en: 'the house', note: 'feminine' },
      ],
    },
    {
      id: 'r2',
      heading: 'Masculine nouns → el',
      body: 'Most nouns ending in -o are masculine and take the article el.',
      examples: [
        { es: 'el gato',    en: 'the cat' },
        { es: 'el carro',   en: 'the car' },
        { es: 'el hermano', en: 'the brother' },
      ],
      tip: 'Many masculine nouns don\'t end in -o (el hombre, el tren). Learn these with their article.',
    },
    {
      id: 'r3',
      heading: 'Feminine nouns → la',
      body: 'Most nouns ending in -a are feminine and take the article la. Nouns ending in -ción, -sión, -dad, -tad, or -tud are also feminine.',
      examples: [
        { es: 'la mesa',    en: 'the table' },
        { es: 'la canción', en: 'the song',  note: '-ción → feminine' },
        { es: 'la ciudad',  en: 'the city',  note: '-dad → feminine' },
      ],
      tip: 'Watch out — some nouns ending in -a are masculine: el día, el mapa, el problema.',
    },
    {
      id: 'r4',
      heading: 'Plural: los & las',
      body: 'For plural nouns, el becomes los and la becomes las. Nouns ending in a vowel add -s; nouns ending in a consonant add -es.',
      examples: [
        { es: 'el libro → los libros',    en: 'the book → the books' },
        { es: 'la ciudad → las ciudades', en: 'the city → the cities', note: 'consonant + es' },
      ],
    },
  ],

  /* ── Vocabulary with rule tags ── */
  vocabulary: [
    /* Masculine -o */
    { id:'v1_1',  es:'amigo',    en:'friend (m)',         gender:'m', rule:'ends_o',      article:'el',    plural:'amigos',       ex:'El amigo es simpático.',         exEn:'The friend is nice.' },
    { id:'v1_2',  es:'banco',    en:'bank',               gender:'m', rule:'ends_o',      article:'el',    plural:'bancos',       ex:'El banco es grande.',            exEn:'The bank is big.' },
    { id:'v1_3',  es:'baño',     en:'bathroom',           gender:'m', rule:'ends_o',      article:'el',    plural:'baños',        ex:'El baño es pequeño.',            exEn:'The bathroom is small.' },
    { id:'v1_4',  es:'carro',    en:'car',                gender:'m', rule:'ends_o',      article:'el',    plural:'carros',       ex:'El carro es rojo.',              exEn:'The car is red.' },
    { id:'v1_5',  es:'gato',     en:'cat',                gender:'m', rule:'ends_o',      article:'el',    plural:'gatos',        ex:'El gato es negro.',              exEn:'The cat is black.' },
    { id:'v1_6',  es:'hermano',  en:'brother',            gender:'m', rule:'ends_o',      article:'el',    plural:'hermanos',     ex:'El hermano es joven.',           exEn:'The brother is young.' },
    { id:'v1_7',  es:'libro',    en:'book',               gender:'m', rule:'ends_o',      article:'el',    plural:'libros',       ex:'El libro blanco es interesante.',exEn:'The white book is interesting.' },
    { id:'v1_8',  es:'muchacho', en:'boy',                gender:'m', rule:'ends_o',      article:'el',    plural:'muchachos',    ex:'El muchacho simpático es mi amigo.', exEn:'The nice boy is my friend.' },
    { id:'v1_9',  es:'niño',     en:'little boy, child',  gender:'m', rule:'ends_o',      article:'el',    plural:'niños',        ex:'El niño es pequeño.',            exEn:'The child is small.' },
    { id:'v1_10', es:'perro',    en:'dog',                gender:'m', rule:'ends_o',      article:'el',    plural:'perros',       ex:'El perro es grande.',            exEn:'The dog is big.' },
    { id:'v1_11', es:'teléfono', en:'telephone',          gender:'m', rule:'ends_o',      article:'el',    plural:'teléfonos',    ex:'El teléfono es nuevo.',          exEn:'The telephone is new.' },
    { id:'v1_12', es:'vino',     en:'wine',               gender:'m', rule:'ends_o',      article:'el',    plural:'vinos',        ex:'El vino es bueno.',              exEn:'The wine is good.' },
    /* Masculine irregular */
    { id:'v1_13', es:'animal',   en:'animal',             gender:'m', rule:'masc_irreg',  article:'el',    plural:'animales',     ex:'El animal es grande.',           exEn:'The animal is big.' },
    { id:'v1_14', es:'café',     en:'coffee',             gender:'m', rule:'masc_irreg',  article:'el',    plural:'cafés',        ex:'El café es bueno.',              exEn:'The coffee is good.' },
    { id:'v1_15', es:'doctor',   en:'doctor',             gender:'m', rule:'masc_irreg',  article:'el',    plural:'doctores',     ex:'El doctor es inteligente.',      exEn:'The doctor is intelligent.' },
    { id:'v1_16', es:'hombre',   en:'man',                gender:'m', rule:'masc_irreg',  article:'el',    plural:'hombres',      ex:'El hombre hermoso es el doctor.',exEn:'The handsome man is the doctor.' },
    { id:'v1_17', es:'hospital', en:'hospital',           gender:'m', rule:'masc_irreg',  article:'el',    plural:'hospitales',   ex:'El hospital es grande.',         exEn:'The hospital is big.' },
    { id:'v1_18', es:'hotel',    en:'hotel',              gender:'m', rule:'masc_irreg',  article:'el',    plural:'hoteles',      ex:'El hotel es caro.',              exEn:'The hotel is expensive.' },
    { id:'v1_19', es:'tomate',   en:'tomato',             gender:'m', rule:'masc_irreg',  article:'el',    plural:'tomates',      ex:'El tomate es rojo.',             exEn:'The tomato is red.' },
    { id:'v1_20', es:'tren',     en:'train',              gender:'m', rule:'masc_irreg',  article:'el',    plural:'trenes',       ex:'El tren es rápido.',             exEn:'The train is fast.' },
    /* Masculine -a/-ma exceptions */
    { id:'v1_21', es:'día',      en:'day',                gender:'m', rule:'masc_a_excep',article:'el',    plural:'días',         ex:'El día es bueno.',               exEn:'The day is good.' },
    { id:'v1_22', es:'mapa',     en:'map',                gender:'m', rule:'masc_a_excep',article:'el',    plural:'mapas',        ex:'El mapa es viejo.',              exEn:'The map is old.' },
    { id:'v1_23', es:'problema', en:'problem',            gender:'m', rule:'masc_a_excep',article:'el',    plural:'problemas',    ex:'El problema es difícil.',        exEn:'The problem is difficult.' },
    { id:'v1_24', es:'programa', en:'program',            gender:'m', rule:'masc_a_excep',article:'el',    plural:'programas',    ex:'El programa es interesante.',    exEn:'The program is interesting.' },
    { id:'v1_25', es:'sistema',  en:'system',             gender:'m', rule:'masc_a_excep',article:'el',    plural:'sistemas',     ex:'El sistema es bueno.',           exEn:'The system is good.' },
    { id:'v1_26', es:'idioma',   en:'language',           gender:'m', rule:'masc_a_excep',article:'el',    plural:'idiomas',      ex:'El idioma es difícil.',          exEn:'The language is difficult.' },
    { id:'v1_27', es:'clima',    en:'climate',            gender:'m', rule:'masc_a_excep',article:'el',    plural:'climas',       ex:'El clima es fantástico.',        exEn:'The climate is fantastic.' },
    { id:'v1_28', es:'planeta',  en:'planet',             gender:'m', rule:'masc_a_excep',article:'el',    plural:'planetas',     ex:'El planeta es grande.',          exEn:'The planet is big.' },
    { id:'v1_29', es:'poema',    en:'poem',               gender:'m', rule:'masc_a_excep',article:'el',    plural:'poemas',       ex:'El poema es maravilloso.',       exEn:'The poem is marvelous.' },
    { id:'v1_30', es:'drama',    en:'drama',              gender:'m', rule:'masc_a_excep',article:'el',    plural:'dramas',       ex:'El drama es interesante.',       exEn:'The drama is interesting.' },
    /* Feminine -a */
    { id:'v1_31', es:'amiga',    en:'friend (f)',         gender:'f', rule:'ends_a',      article:'la',    plural:'amigas',       ex:'La amiga es simpática.',         exEn:'The friend is nice.' },
    { id:'v1_32', es:'blusa',    en:'blouse',             gender:'f', rule:'ends_a',      article:'la',    plural:'blusas',       ex:'La blusa es blanca.',            exEn:'The blouse is white.' },
    { id:'v1_33', es:'bolsa',    en:'bag',                gender:'f', rule:'ends_a',      article:'la',    plural:'bolsas',       ex:'La bolsa es pequeña.',           exEn:'The bag is small.' },
    { id:'v1_34', es:'cama',     en:'bed',                gender:'f', rule:'ends_a',      article:'la',    plural:'camas',        ex:'La cama es grande.',             exEn:'The bed is big.' },
    { id:'v1_35', es:'casa',     en:'house',              gender:'f', rule:'ends_a',      article:'la',    plural:'casas',        ex:'La casa blanca es bonita.',      exEn:'The white house is pretty.' },
    { id:'v1_36', es:'cerveza',  en:'beer',               gender:'f', rule:'ends_a',      article:'la',    plural:'cervezas',     ex:'La cerveza es fría.',            exEn:'The beer is cold.' },
    { id:'v1_37', es:'comida',   en:'meal, food',         gender:'f', rule:'ends_a',      article:'la',    plural:'comidas',      ex:'La comida excelente es cara.',   exEn:'The excellent meal is expensive.' },
    { id:'v1_38', es:'hermana',  en:'sister',             gender:'f', rule:'ends_a',      article:'la',    plural:'hermanas',     ex:'La hermana es inteligente.',     exEn:'The sister is intelligent.' },
    { id:'v1_39', es:'iglesia',  en:'church',             gender:'f', rule:'ends_a',      article:'la',    plural:'iglesias',     ex:'La iglesia es vieja.',           exEn:'The church is old.' },
    { id:'v1_40', es:'lámpara',  en:'lamp',               gender:'f', rule:'ends_a',      article:'la',    plural:'lámparas',     ex:'La lámpara roja es bonita.',     exEn:'The red lamp is pretty.' },
    { id:'v1_41', es:'mesa',     en:'table',              gender:'f', rule:'ends_a',      article:'la',    plural:'mesas',        ex:'La mesa es gris.',               exEn:'The table is gray.' },
    { id:'v1_42', es:'muchacha', en:'girl',               gender:'f', rule:'ends_a',      article:'la',    plural:'muchachas',    ex:'La muchacha simpática es mi amiga.', exEn:'The nice girl is my friend.' },
    { id:'v1_43', es:'niña',     en:'little girl',        gender:'f', rule:'ends_a',      article:'la',    plural:'niñas',        ex:'La niña es alegre.',             exEn:'The little girl is happy.' },
    { id:'v1_44', es:'persona',  en:'person',             gender:'f', rule:'ends_a',      article:'la',    plural:'personas',     ex:'La persona es sincera.',         exEn:'The person is sincere.' },
    { id:'v1_45', es:'planta',   en:'plant',              gender:'f', rule:'ends_a',      article:'la',    plural:'plantas',      ex:'La planta es verde.',            exEn:'The plant is green.' },
    { id:'v1_46', es:'silla',    en:'chair',              gender:'f', rule:'ends_a',      article:'la',    plural:'sillas',       ex:'La silla es marrón.',            exEn:'The chair is brown.' },
    { id:'v1_47', es:'tienda',   en:'store',              gender:'f', rule:'ends_a',      article:'la',    plural:'tiendas',      ex:'La tienda es pequeña.',          exEn:'The store is small.' },
    { id:'v1_48', es:'ventana',  en:'window',             gender:'f', rule:'ends_a',      article:'la',    plural:'ventanas',     ex:'La ventana es azul.',            exEn:'The window is blue.' },
    /* Feminine -ción/-sión */
    { id:'v1_49', es:'canción',      en:'song',           gender:'f', rule:'ends_cion',   article:'la',    plural:'canciones',    ex:'La canción es maravillosa.',     exEn:'The song is marvelous.' },
    { id:'v1_50', es:'conversación', en:'conversation',   gender:'f', rule:'ends_cion',   article:'la',    plural:'conversaciones',ex:'La conversación es interesante.',exEn:'The conversation is interesting.' },
    { id:'v1_51', es:'invitación',   en:'invitation',     gender:'f', rule:'ends_cion',   article:'la',    plural:'invitaciones', ex:'La invitación es para la fiesta.',exEn:'The invitation is for the party.' },
    { id:'v1_52', es:'lección',      en:'lesson',         gender:'f', rule:'ends_cion',   article:'la',    plural:'lecciones',    ex:'La lección es difícil.',         exEn:'The lesson is difficult.' },
    { id:'v1_53', es:'ilusión',      en:'illusion',       gender:'f', rule:'ends_sion',   article:'la',    plural:'ilusiones',    ex:'La ilusión es fantástica.',      exEn:'The illusion is fantastic.' },
    { id:'v1_54', es:'televisión',   en:'television',     gender:'f', rule:'ends_sion',   article:'la',    plural:'televisiones', ex:'La televisión es grande.',       exEn:'The television is big.' },
    /* Feminine -dad/-tad/-tud */
    { id:'v1_55', es:'ciudad',   en:'city',               gender:'f', rule:'ends_dad',    article:'la',    plural:'ciudades',     ex:'La ciudad es grande.',           exEn:'The city is big.' },
    { id:'v1_56', es:'verdad',   en:'truth',              gender:'f', rule:'ends_dad',    article:'la',    plural:'verdades',     ex:'La verdad es importante.',       exEn:'The truth is important.' },
    { id:'v1_57', es:'amistad',  en:'friendship',         gender:'f', rule:'ends_tad',    article:'la',    plural:'amistades',    ex:'La amistad es buena.',           exEn:'The friendship is good.' },
    { id:'v1_58', es:'actitud',  en:'attitude',           gender:'f', rule:'ends_tud',    article:'la',    plural:'actitudes',    ex:'La actitud es positiva.',        exEn:'The attitude is positive.' },
    /* Feminine -o exceptions */
    { id:'v1_59', es:'foto',     en:'photograph',         gender:'f', rule:'fem_o_excep', article:'la',    plural:'fotos',        ex:'La foto es bonita.',             exEn:'The photograph is pretty.' },
    { id:'v1_60', es:'mano',     en:'hand',               gender:'f', rule:'fem_o_excep', article:'la',    plural:'manos',        ex:'La mano es pequeña.',            exEn:'The hand is small.' },
    { id:'v1_61', es:'radio',    en:'radio',              gender:'f', rule:'fem_o_excep', article:'la',    plural:'radios',       ex:'La radio es vieja.',             exEn:'The radio is old.' },
    /* Feminine irregular */
    { id:'v1_62', es:'clase',    en:'class',              gender:'f', rule:'fem_irreg',   article:'la',    plural:'clases',       ex:'La clase es interesante.',       exEn:'The class is interesting.' },
    { id:'v1_63', es:'flor',     en:'flower',             gender:'f', rule:'fem_irreg',   article:'la',    plural:'flores',       ex:'La flor es amarilla.',           exEn:'The flower is yellow.' },
    { id:'v1_64', es:'luz',      en:'light',              gender:'f', rule:'fem_irreg',   article:'la',    plural:'luces',        ex:'La luz es verde.',               exEn:'The light is green.' },
    { id:'v1_65', es:'mujer',    en:'woman',              gender:'f', rule:'fem_irreg',   article:'la',    plural:'mujeres',      ex:'La mujer hermosa es la doctora.',exEn:'The beautiful woman is the doctor.' },
    { id:'v1_66', es:'suerte',   en:'luck',               gender:'f', rule:'fem_irreg',   article:'la',    plural:'suertes',      ex:'La suerte es buena.',            exEn:'The luck is good.' },
    /* -ista */
    { id:'v1_67', es:'artista',  en:'artist',             gender:'n', rule:'ista_gender', article:'el/la', plural:'artistas',     ex:'El artista es famoso.',          exEn:'The artist is famous.' },
    { id:'v1_68', es:'dentista', en:'dentist',            gender:'n', rule:'ista_gender', article:'el/la', plural:'dentistas',    ex:'La dentista es inteligente.',    exEn:'The dentist is intelligent.' },
    { id:'v1_69', es:'pianista', en:'pianist',            gender:'n', rule:'ista_gender', article:'el/la', plural:'pianistas',    ex:'El pianista es maravilloso.',    exEn:'The pianist is marvelous.' },
    { id:'v1_70', es:'taxista',  en:'cab driver',         gender:'n', rule:'ista_gender', article:'el/la', plural:'taxistas',     ex:'La taxista es simpática.',       exEn:'The cab driver is nice.' },
    /* -nte */
    { id:'v1_71', es:'cantante',   en:'singer',           gender:'n', rule:'nte_gender',  article:'el/la', plural:'cantantes',    ex:'La cantante es famosa.',         exEn:'The singer is famous.' },
    { id:'v1_72', es:'estudiante', en:'student',          gender:'n', rule:'nte_gender',  article:'el/la', plural:'estudiantes',  ex:'El estudiante es inteligente.',  exEn:'The student is intelligent.' },
    { id:'v1_73', es:'gerente',    en:'manager',          gender:'n', rule:'nte_gender',  article:'el/la', plural:'gerentes',     ex:'La gerente es sincera.',         exEn:'The manager is sincere.' },
    { id:'v1_74', es:'presidente', en:'president',        gender:'n', rule:'nte_gender',  article:'el/la', plural:'presidentes',  ex:'El presidente es viejo.',        exEn:'The president is old.' },
  ],
};

/* ════════════════════════════════════════════════════════════════════════════
   SUB-LESSON 2 — Indefinite Articles & Plurals
   ════════════════════════════════════════════════════════════════════════════ */

const SUBLESSON_2 = {
  id: '1-2',
  chapterId: 1,
  title: 'Indefinite Articles & Plurals',
  subtitle: 'un · una · unos · unas',

  rules: [
    {
      id: 'r1',
      heading: 'Indefinite articles: un & una',
      body: 'The Spanish singular indefinite article (English "a" or "an") is un before a masculine noun and una before a feminine noun.',
      examples: [
        { es: 'un amigo',   en: 'a (male) friend',  note: 'masculine' },
        { es: 'una amiga',  en: 'a (female) friend', note: 'feminine' },
        { es: 'un jardín',  en: 'a garden' },
        { es: 'una ciudad', en: 'a city' },
      ],
    },
    {
      id: 'r2',
      heading: 'Plural indefinite: unos & unas',
      body: 'The plural indefinite article (English "some") is unos before masculine plural nouns and unas before feminine plural nouns.',
      examples: [
        { es: 'unos libros',  en: 'some books' },
        { es: 'unas casas',   en: 'some houses' },
        { es: 'unos gatos',   en: 'some cats' },
        { es: 'unas flores',  en: 'some flowers' },
      ],
    },
    {
      id: 'r3',
      heading: 'Forming plurals',
      body: 'Nouns ending in a vowel add -s. Nouns ending in a consonant add -es. Nouns ending in -ción/-sión drop the accent and add -es.',
      examples: [
        { es: 'el libro → los libros',       en: 'vowel + s' },
        { es: 'el doctor → los doctores',    en: 'consonant + es' },
        { es: 'la canción → las canciones',  en: '-ción → -ciones' },
        { es: 'la ciudad → las ciudades',    en: '-dad → -dades' },
      ],
    },
  ],

  /* Indefinite article vocabulary — subset for drill */
  vocabulary: [
    { id:'v2_1',  es:'jardín',    en:'garden',        gender:'m', rule:'masc_irreg',  article:'un',  indef:'un',  ex:'El jardín es verde.',            exEn:'The garden is green.' },
    { id:'v2_2',  es:'museo',     en:'museum',        gender:'m', rule:'ends_o',      article:'un',  indef:'un',  ex:'El museo es grande.',            exEn:'The museum is big.' },
    { id:'v2_3',  es:'espejo',    en:'mirror',        gender:'m', rule:'ends_o',      article:'un',  indef:'un',  ex:'El espejo es pequeño.',          exEn:'The mirror is small.' },
    { id:'v2_4',  es:'sillón',    en:'armchair',      gender:'m', rule:'masc_irreg',  article:'un',  indef:'un',  ex:'El sillón es cómodo.',           exEn:'The armchair is comfortable.' },
    { id:'v2_5',  es:'tiquete',   en:'ticket',        gender:'m', rule:'ends_o',      article:'un',  indef:'un',  ex:'El tiquete es caro.',            exEn:'The ticket is expensive.' },
    { id:'v2_6',  es:'biblioteca',en:'library',       gender:'f', rule:'ends_a',      article:'una', indef:'una', ex:'La biblioteca es grande.',       exEn:'The library is big.' },
    { id:'v2_7',  es:'librería',  en:'bookstore',     gender:'f', rule:'ends_a',      article:'una', indef:'una', ex:'La librería es pequeña.',        exEn:'The bookstore is small.' },
    { id:'v2_8',  es:'maleta',    en:'suitcase',      gender:'f', rule:'ends_a',      article:'una', indef:'una', ex:'La maleta es vieja.',            exEn:'The suitcase is old.' },
    { id:'v2_9',  es:'página',    en:'page',          gender:'f', rule:'ends_a',      article:'una', indef:'una', ex:'La página es interesante.',      exEn:'The page is interesting.' },
    { id:'v2_10', es:'pluma',     en:'pen',           gender:'f', rule:'ends_a',      article:'una', indef:'una', ex:'La pluma es azul.',              exEn:'The pen is blue.' },
    { id:'v2_11', es:'idea',      en:'idea',          gender:'f', rule:'ends_a',      article:'una', indef:'una', ex:'La idea es fantástica.',         exEn:'The idea is fantastic.' },
    { id:'v2_12', es:'barco',     en:'boat',          gender:'m', rule:'ends_o',      article:'un',  indef:'un',  ex:'El barco es grande.',            exEn:'The boat is big.' },
  ],
};

/* ════════════════════════════════════════════════════════════════════════════
   SUB-LESSON 3 — Adjectives
   ════════════════════════════════════════════════════════════════════════════ */

const SUBLESSON_3 = {
  id: '1-3',
  chapterId: 1,
  title: 'Adjectives',
  subtitle: 'Agreement in gender & number',

  rules: [
    {
      id: 'r1',
      heading: 'Adjectives agree with their noun',
      body: 'Spanish adjectives must match the noun they describe in both gender (masculine/feminine) and number (singular/plural). Adjectives almost always follow the noun.',
      examples: [
        { es: 'el libro blanco',   en: 'the white book',    note: 'masculine singular' },
        { es: 'la casa blanca',    en: 'the white house',   note: 'feminine singular' },
        { es: 'los libros blancos',en: 'the white books',   note: 'masculine plural' },
        { es: 'las casas blancas', en: 'the white houses',  note: 'feminine plural' },
      ],
    },
    {
      id: 'r2',
      heading: 'Adjectives ending in -o',
      body: 'Adjectives ending in -o are masculine. Change the -o to -a for feminine nouns. Add -s for plural.',
      examples: [
        { es: 'el gato negro',    en: 'the black cat' },
        { es: 'la chaqueta negra',en: 'the black jacket', note: '-o → -a' },
        { es: 'los gatos negros', en: 'the black cats',   note: 'add -s' },
      ],
    },
    {
      id: 'r3',
      heading: 'Adjectives NOT ending in -o',
      body: 'Adjectives not ending in -o have the same form for masculine and feminine. Add -s (vowel ending) or -es (consonant ending) for plural.',
      examples: [
        { es: 'el libro excelente',  en: 'the excellent book' },
        { es: 'la comida excelente', en: 'the excellent meal', note: 'same form!' },
        { es: 'el barco azul',       en: 'the blue boat' },
        { es: 'la pluma azul',       en: 'the blue pen',      note: 'same form!' },
      ],
    },
  ],

  adjectives: [
    /* Colors */
    { id:'a1_1',  es:'amarillo', en:'yellow',        endsO:true,  ex:'La flor amarilla es bonita.',      exEn:'The yellow flower is pretty.' },
    { id:'a1_2',  es:'anaranjado',en:'orange',       endsO:true,  ex:'El carro anaranjado es nuevo.',    exEn:'The orange car is new.' },
    { id:'a1_3',  es:'azul',     en:'blue',          endsO:false, ex:'La ventana azul es grande.',       exEn:'The blue window is big.' },
    { id:'a1_4',  es:'blanco',   en:'white',         endsO:true,  ex:'La casa blanca es bonita.',        exEn:'The white house is pretty.' },
    { id:'a1_5',  es:'gris',     en:'gray',          endsO:false, ex:'El perro gris es grande.',         exEn:'The gray dog is big.' },
    { id:'a1_6',  es:'marrón',   en:'brown',         endsO:false, ex:'La silla marrón es vieja.',        exEn:'The brown chair is old.' },
    { id:'a1_7',  es:'morado',   en:'purple',        endsO:true,  ex:'La bolsa morada es pequeña.',      exEn:'The purple bag is small.' },
    { id:'a1_8',  es:'negro',    en:'black',         endsO:true,  ex:'El gato negro es el animal.',      exEn:'The black cat is the animal.' },
    { id:'a1_9',  es:'rojo',     en:'red',           endsO:true,  ex:'El carro rojo es caro.',           exEn:'The red car is expensive.' },
    { id:'a1_10', es:'rosado',   en:'pink',          endsO:true,  ex:'La blusa rosada es bonita.',       exEn:'The pink blouse is pretty.' },
    { id:'a1_11', es:'verde',    en:'green',         endsO:false, ex:'La planta verde es grande.',       exEn:'The green plant is big.' },
    /* Descriptive */
    { id:'a1_12', es:'agradable',en:'pleasant',      endsO:false, ex:'La persona agradable es mi amiga.',exEn:'The pleasant person is my friend.' },
    { id:'a1_13', es:'alegre',   en:'happy',         endsO:false, ex:'La niña alegre es simpática.',     exEn:'The happy girl is nice.' },
    { id:'a1_14', es:'barato',   en:'inexpensive',   endsO:true,  ex:'El hotel barato es pequeño.',      exEn:'The inexpensive hotel is small.' },
    { id:'a1_15', es:'caro',     en:'expensive',     endsO:true,  ex:'El tiquete caro es para el tren.', exEn:'The expensive ticket is for the train.' },
    { id:'a1_16', es:'débil',    en:'weak',          endsO:false, ex:'El animal débil es el gato.',      exEn:'The weak animal is the cat.' },
    { id:'a1_17', es:'delgado',  en:'slender',       endsO:true,  ex:'La muchacha delgada es mi hermana.',exEn:'The slender girl is my sister.' },
    { id:'a1_18', es:'difícil',  en:'difficult',     endsO:false, ex:'La lección difícil es interesante.',exEn:'The difficult lesson is interesting.' },
    { id:'a1_19', es:'excelente',en:'excellent',     endsO:false, ex:'La comida excelente es cara.',     exEn:'The excellent food is expensive.' },
    { id:'a1_20', es:'fácil',    en:'easy',          endsO:false, ex:'El idioma fácil es el español.',   exEn:'The easy language is Spanish.' },
    { id:'a1_21', es:'fantástico',en:'fantastic',    endsO:true,  ex:'El clima fantástico es agradable.',exEn:'The fantastic climate is pleasant.' },
    { id:'a1_22', es:'feliz',    en:'happy',         endsO:false, ex:'La niña feliz es alegre.',         exEn:'The happy girl is cheerful.' },
    { id:'a1_23', es:'feo',      en:'ugly',          endsO:true,  ex:'El problema feo es difícil.',      exEn:'The ugly problem is difficult.' },
    { id:'a1_24', es:'fuerte',   en:'strong',        endsO:false, ex:'El hombre fuerte es el doctor.',   exEn:'The strong man is the doctor.' },
    { id:'a1_25', es:'gordo',    en:'fat',           endsO:true,  ex:'El gato gordo es simpático.',      exEn:'The fat cat is nice.' },
    { id:'a1_26', es:'grande',   en:'big',           endsO:false, ex:'La ciudad grande es interesante.', exEn:'The big city is interesting.' },
    { id:'a1_27', es:'guapo',    en:'handsome',      endsO:true,  ex:'El hombre guapo es el doctor.',    exEn:'The handsome man is the doctor.' },
    { id:'a1_28', es:'hermoso',  en:'beautiful',     endsO:true,  ex:'La flor hermosa es amarilla.',     exEn:'The beautiful flower is yellow.' },
    { id:'a1_29', es:'horrible', en:'horrible',      endsO:false, ex:'El problema horrible es difícil.', exEn:'The horrible problem is difficult.' },
    { id:'a1_30', es:'inteligente',en:'intelligent', endsO:false, ex:'La estudiante inteligente es mi amiga.',exEn:'The intelligent student is my friend.' },
    { id:'a1_31', es:'interesante',en:'interesting', endsO:false, ex:'El libro interesante es viejo.',   exEn:'The interesting book is old.' },
    { id:'a1_32', es:'joven',    en:'young',         endsO:false, ex:'El dentista joven es simpático.',  exEn:'The young dentist is nice.' },
    { id:'a1_33', es:'maravilloso',en:'marvelous',   endsO:true,  ex:'La canción maravillosa es nueva.', exEn:'The marvelous song is new.' },
    { id:'a1_34', es:'pequeño',  en:'small',         endsO:true,  ex:'El niño pequeño es alegre.',       exEn:'The small child is happy.' },
    { id:'a1_35', es:'pobre',    en:'poor',          endsO:false, ex:'El hombre pobre es triste.',       exEn:'The poor man is sad.' },
    { id:'a1_36', es:'rico',     en:'rich',          endsO:true,  ex:'El hotel rico es caro.',           exEn:'The rich hotel is expensive.' },
    { id:'a1_37', es:'simpático',en:'nice',          endsO:true,  ex:'La persona simpática es mi amiga.',exEn:'The nice person is my friend.' },
    { id:'a1_38', es:'triste',   en:'sad',           endsO:false, ex:'La canción triste es hermosa.',    exEn:'The sad song is beautiful.' },
    { id:'a1_39', es:'viejo',    en:'old',           endsO:true,  ex:'El libro viejo es interesante.',   exEn:'The old book is interesting.' },
  ],
};

/* ════════════════════════════════════════════════════════════════════════════
   Chapter 1 export
   ════════════════════════════════════════════════════════════════════════════ */

const CHAPTER_1 = {
  id: 1,
  title: 'Nouns, Articles, and Adjectives',
  unlocked: true,
  sublessons: [SUBLESSON_1, SUBLESSON_2, SUBLESSON_3],
  genderRules: GENDER_RULES,
  pluralRules:  PLURAL_RULES,
  adjRules:     ADJ_RULES,
};

export default CHAPTER_1;
export { SUBLESSON_1, SUBLESSON_2, SUBLESSON_3, GENDER_RULES, PLURAL_RULES, ADJ_RULES };
