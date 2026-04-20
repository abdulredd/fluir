/* ─── Fluir · Chapter 8 Data ────────────────────────────────────────────────
   Source: Complete Spanish Step-by-Step, Bregstein (McGraw-Hill)
   Chapter 8: Adjectives and Adverbs
   4 sub-lessons (Option A):
     8-1  Possessive adjectives + demonstrative adjectives
     8-2  Special adjectives (position-dependent, quantity, nationality, bueno/malo/grande)
     8-3  Comparatives and superlatives (regular + irregular)
     8-4  Adverbs (-mente formation + common adverbs)
   ─────────────────────────────────────────────────────────────────────────── */

/* ════════════════════════════════════════════════════════════════════════════
   SUB-LESSON 8-1 — Possessive and Demonstrative Adjectives
   ════════════════════════════════════════════════════════════════════════════ */

const SUBLESSON_8_1 = {
  id: '8-1',
  chapterId: 8,
  title: 'Possessives and Demonstratives',
  subtitle: 'mi/tu/su/nuestro · este/ese/aquel',

  rules: [
    {
      id: 'r1',
      heading: 'Possessive adjectives agree with the noun, not the owner',
      body: 'In Spanish, possessive adjectives agree in gender and number with the NOUN they modify — not with the person who owns it. They always precede the noun.',
      examples: [
        { es: 'mi libro / mis libros',             en: 'my book / my books' },
        { es: 'tu casa / tus casas',               en: 'your house / your houses' },
        { es: 'nuestro tren / nuestra fiesta',     en: 'our train / our party', note: 'nuestro agrees with noun gender' },
        { es: 'su carro / sus ideas',              en: 'his/her/your/their car / ideas' },
      ],
      tip: 'Su/sus is ambiguous — can mean his, her, your (Ud.), or their. Clarify with: el carro de él / el carro de ella.',
    },
    {
      id: 'r2',
      heading: 'Demonstrative adjectives — three distances',
      body: 'Spanish has three demonstratives: este (near the speaker), ese (near the listener), aquel (far from both). All agree in gender and number with the noun.',
      examples: [
        { es: 'este piano / esta revista',         en: 'this piano / this magazine', note: 'near me' },
        { es: 'ese libro / esa guitarra',          en: 'that book / that guitar', note: 'near you' },
        { es: 'aquel traje / aquella blusa',       en: 'that suit / that blouse (over there)', note: 'far from both' },
        { es: 'esto / eso / aquello',              en: 'this / that / that (neuter, unknown objects)', note: 'neuter — no gender' },
      ],
    },
  ],

  possessiveDrills: [
    { sentence:'___ hermana quiere ir a España.',      answer:'Mi',      choices:['Mi','Tu','Su','Nuestra'],      fills:['Mi'],      en:'My sister wants to go to Spain.',         rule:'mi = my (singular noun)' },
    { sentence:'___ libro está en la mesa.',           answer:'Tu',      choices:['Mi','Tu','Su','Nuestro'],      fills:['Tu'],      en:'Your book is on the table.',              rule:'tu = your (tú form, singular noun)' },
    { sentence:'___ ideas son fantásticas.',           answer:'Sus',     choices:['Mi','Sus','Nuestras','Tus'],   fills:['Sus'],     en:'His/her/their ideas are fantastic.',       rule:'sus = his/her/their (plural noun)' },
    { sentence:'___ tren viene a las ocho.',           answer:'Nuestro', choices:['Nuestro','Nuestra','Su','Mi'], fills:['Nuestro'], en:'Our train comes at eight.',               rule:'nuestro — tren is masculine' },
    { sentence:'___ fiesta va a ser fantástica.',      answer:'Nuestra', choices:['Nuestro','Nuestra','Su','Tu'], fills:['Nuestra'], en:'Our party is going to be fantastic.',      rule:'nuestra — fiesta is feminine' },
    { sentence:'Somos principiantes; ___ tarea no es fácil.', answer:'nuestra', choices:['nuestro','nuestra','su','mi'], fills:['nuestra'], en:'We are beginners; our homework is not easy.', rule:'nuestra — tarea is feminine' },
    { sentence:'Mis primos escriben libros; ___ trabajo es interesante.', answer:'su', choices:['su','sus','mi','tu'], fills:['su'], en:'My cousins write books; their work is interesting.', rule:'su = their (singular noun trabajo)' },
    { sentence:'___ lápices están en la silla.',       answer:'Tus',     choices:['Tu','Tus','Sus','Mis'],        fills:['Tus'],     en:'Your pencils are on the chair.',          rule:'tus — lápices is plural' },
  ],

  demonstrativeDrills: [
    { sentence:'___ periódico es interesante.',        answer:'Este',    choices:['Este','Ese','Aquel','Esta'],   fills:['Este'],    en:'This newspaper is interesting (near me).', rule:'este — periódico is masculine, near speaker' },
    { sentence:'___ revista es interesante también.',  answer:'Esta',    choices:['Este','Ese','Esta','Esa'],     fills:['Esta'],    en:'This magazine is interesting too.',       rule:'esta — revista is feminine, near speaker' },
    { sentence:'___ piano es viejo.',                  answer:'Ese',     choices:['Este','Ese','Aquel','Esa'],    fills:['Ese'],     en:'That piano is old (near you).',           rule:'ese — piano is masculine, near listener' },
    { sentence:'___ guitarra es nueva.',               answer:'Esa',     choices:['Ese','Esa','Esta','Aquella'],  fills:['Esa'],     en:'That guitar is new (near you).',          rule:'esa — guitarra is feminine, near listener' },
    { sentence:'___ traje es feo.',                    answer:'Aquel',   choices:['Este','Ese','Aquel','Aquella'],fills:['Aquel'],   en:'That suit over there is ugly.',           rule:'aquel — masculine, far from both' },
    { sentence:'___ casas son pequeñas.',              answer:'Aquellas',choices:['Estos','Esos','Aquellos','Aquellas'],fills:['Aquellas'],en:'Those houses over there are small.', rule:'aquellas — casas is feminine plural, far from both' },
    { sentence:'¿Qué es ___?',                         answer:'esto',    choices:['este','esta','esto','eso'],    fills:['esto'],    en:'What is this?',                          rule:'esto — neuter, refers to unknown object' },
    { sentence:'___ no es necesario.',                 answer:'Aquello', choices:['Aquel','Aquella','Aquello','Eso'], fills:['Aquello'], en:'That (over there) is not necessary.',  rule:'aquello — neuter demonstrative' },
  ],
};

/* ════════════════════════════════════════════════════════════════════════════
   SUB-LESSON 8-2 — Special Adjectives
   ════════════════════════════════════════════════════════════════════════════ */

const SUBLESSON_8_2 = {
  id: '8-2',
  chapterId: 8,
  title: 'Special Adjectives',
  subtitle: 'buen/gran · position-dependent · quantity · nationality',

  rules: [
    {
      id: 'r1',
      heading: 'Bueno and malo shorten before masculine singular nouns',
      body: 'Bueno → buen and malo → mal when placed before a masculine singular noun. They keep their full forms in all other positions.',
      examples: [
        { es: 'un buen estudiante',    en: 'a good student', note: 'bueno → buen before masc. sing.' },
        { es: 'una buena estudiante',  en: 'a good student (f)', note: 'buena unchanged before fem.' },
        { es: 'un mal perro',          en: 'a bad dog', note: 'malo → mal before masc. sing.' },
        { es: 'una mala idea',         en: 'a bad idea', note: 'mala unchanged before fem.' },
      ],
      tip: 'Grande shortens to gran before any singular noun: el gran hombre (the great man), la gran mujer (the great woman).',
    },
    {
      id: 'r2',
      heading: 'Adjectives whose meaning changes by position',
      body: 'A few adjectives mean different things depending on whether they come before or after the noun.',
      examples: [
        { es: 'su antiguo novio',      en: 'her former boyfriend (before noun)' },
        { es: 'una civilización antigua', en: 'an ancient civilization (after noun)' },
        { es: 'el gran hombre',        en: 'the great man (before noun)' },
        { es: 'el hombre grande',      en: 'the big man (after noun)' },
        { es: 'el pobre niño',         en: 'the poor, unfortunate child (before noun)' },
        { es: 'el hombre pobre',       en: 'the poor man (without money, after noun)' },
      ],
    },
    {
      id: 'r3',
      heading: 'Adjectives of quantity and other useful adjectives',
      body: 'These adjectives precede the noun and do not follow the standard description pattern.',
      examples: [
        { es: 'mucho dinero / muchas personas', en: 'a lot of money / many people' },
        { es: 'poco tiempo / pocos clientes',   en: 'little time / few clients' },
        { es: 'cada día',                       en: 'each day' },
        { es: 'próximo año / última clase',     en: 'next year / last class' },
      ],
    },
  ],

  sentenceCompletionDrills: [
    { sentence:'Este niño es un ___ estudiante.',      answer:'buen',   choices:['buen','bueno','buena','bien'],  fills:['buen'],   en:'This child is a good student.',           rule:'bueno → buen before masculine singular noun' },
    { sentence:'Ella tiene un ___ perro.',             answer:'mal',    choices:['malo','mal','mala','bien'],     fills:['mal'],    en:'She has a bad dog.',                     rule:'malo → mal before masculine singular noun' },
    { sentence:'Es el ___ hombre de la ciudad.',       answer:'gran',   choices:['grande','gran','grandes','muy'],fills:['gran'],   en:'He is the great man of the city.',        rule:'grande → gran before any singular noun' },
    { sentence:'El ___ mes del año es diciembre.',     answer:'último', choices:['último','próximo','único','solo'],fills:['último'],en:'The last month of the year is December.', rule:'último = last/final, precedes noun' },
    { sentence:'La ___ lección es interesante.',       answer:'próxima',choices:['próxima','última','única','misma'],fills:['próxima'],en:'The next lesson is interesting.',      rule:'próximo/a = next, precedes noun' },
    { sentence:'Ricardo es el ___ mexicano aquí.',     answer:'único',  choices:['único','solo','mismo','último'], fills:['único'],  en:'Ricardo is the only Mexican here.',       rule:'único = only, precedes noun' },
    { sentence:'Él no tiene ___ dinero.',              answer:'mucho',  choices:['mucho','mucha','muchos','poco'], fills:['mucho'],  en:'He doesn\'t have a lot of money.',        rule:'mucho agrees with noun: dinero is masculine' },
    { sentence:'Hay ___ gente en el hotel hoy.',       answer:'poca',   choices:['poco','poca','pocos','muchas'],  fills:['poca'],   en:'There are not many people in the hotel today.', rule:'poca — gente is feminine singular' },
    { sentence:'Su ___ novio es de España.',           answer:'antiguo',choices:['antiguo','antigua','gran','viejo'],fills:['antiguo'],en:'Her former boyfriend is from Spain.',  rule:'antiguo before noun = former' },
  ],

  vocabulary: [
    { id:'a8_1',  es:'mucho',    en:'a lot of / much / many',  gender:'m', rule:'ends_o', article:'', plural:'muchos',  ex:'Él tiene muchos amigos.',          exEn:'He has a lot of friends.' },
    { id:'a8_2',  es:'poco',     en:'a little / few / not many',gender:'m', rule:'ends_o', article:'', plural:'pocos',  ex:'Hay poco dinero en este banco.',   exEn:'There is not much money in this bank.' },
    { id:'a8_3',  es:'cada',     en:'each / every',            gender:'n', rule:'invariable',article:'',plural:'',     ex:'Practica el piano cada día.',      exEn:'She practices the piano every day.' },
    { id:'a8_4',  es:'próximo',  en:'next',                    gender:'m', rule:'ends_o', article:'', plural:'próximos',ex:'Vamos a viajar el próximo año.',   exEn:'We are going to travel next year.' },
    { id:'a8_5',  es:'único',    en:'only / sole',             gender:'m', rule:'ends_o', article:'', plural:'únicos', ex:'Es la única española.',            exEn:'She is the only Spaniard.' },
    { id:'a8_6',  es:'último',   en:'last / final',            gender:'m', rule:'ends_o', article:'', plural:'últimos',ex:'El último mes del año es diciembre.',exEn:'The last month of the year is December.' },
    { id:'a8_7',  es:'mismo',    en:'same / himself',          gender:'m', rule:'ends_o', article:'', plural:'mismos', ex:'Somos amigas del mismo país.',     exEn:'We are friends from the same country.' },
    { id:'a8_8',  es:'alguno',   en:'some / any',              gender:'m', rule:'ends_o', article:'', plural:'algunos',ex:'Hay algunos libros en la mesa.',   exEn:'There are some books on the table.' },
    { id:'a8_9',  es:'bastante', en:'enough / quite',          gender:'n', rule:'invariable',article:'',plural:'bastantes',ex:'Hay bastante agua.',           exEn:'There is enough water.' },
    { id:'a8_10', es:'varios',   en:'several / various',       gender:'m', rule:'ends_o', article:'', plural:'varios', ex:'Hay varias revistas en la librería.',exEn:'There are several magazines in the bookstore.' },
  ],
};

/* ════════════════════════════════════════════════════════════════════════════
   SUB-LESSON 8-3 — Comparatives and Superlatives
   ════════════════════════════════════════════════════════════════════════════ */

const SUBLESSON_8_3 = {
  id: '8-3',
  chapterId: 8,
  title: 'Comparatives and Superlatives',
  subtitle: 'más/menos/tan · el más/el menos · mejor/peor/mayor/menor',

  rules: [
    {
      id: 'r1',
      heading: 'Comparative — more than, less than, as...as',
      body: 'Three structures cover all comparisons. The adjective always agrees in gender and number with the noun being described.',
      examples: [
        { es: 'Julia es más fuerte que Juan.',        en: 'Julia is stronger than Juan.', note: 'más...que = more...than' },
        { es: 'El libro es menos interesante que la revista.', en: 'The book is less interesting than the magazine.', note: 'menos...que = less...than' },
        { es: 'El perro es tan inteligente como el gato.', en: 'The dog is as intelligent as the cat.', note: 'tan...como = as...as' },
      ],
      tip: 'For quantities (nouns not adjectives): más/menos + noun + que. Also: más de / menos de before numbers (Hay más de cien personas).',
    },
    {
      id: 'r2',
      heading: 'Superlative — the most, the least',
      body: 'Add el/la/los/las before más or menos. Use de (not en) after the superlative — de translates as "in" here.',
      examples: [
        { es: '¿Quién es la persona más fuerte de su familia?', en: 'Who is the strongest person in your family?' },
        { es: 'Es el sitio más bonito del país.',     en: 'It is the most beautiful place in the country.' },
        { es: 'Es la clase menos interesante de la escuela.', en: 'It is the least interesting class in the school.' },
      ],
    },
    {
      id: 'r3',
      heading: 'Irregular comparatives and superlatives',
      body: 'Four adjectives have irregular comparative forms that must be memorized. They do not use más or menos.',
      examples: [
        { es: 'bueno → mejor → el mejor',   en: 'good → better → the best' },
        { es: 'malo → peor → el peor',      en: 'bad → worse → the worst' },
        { es: 'joven → menor → el menor',   en: 'young → younger → the youngest', note: 'refers to people only' },
        { es: 'viejo → mayor → el mayor',   en: 'old → older → the oldest', note: 'refers to people only' },
      ],
    },
  ],

  sentenceCompletionDrills: [
    { sentence:'Julia es ___ fuerte ___ Juan.',        answer:'más...que',    choices:['más...que','menos...que','tan...como','el más...de'], fills:['más','que'],     en:'Julia is stronger than Juan.',               rule:'más...que = more...than' },
    { sentence:'El libro es ___ interesante ___ la revista.', answer:'menos...que', choices:['más...que','menos...que','tan...como','el menos...de'], fills:['menos','que'], en:'The book is less interesting than the magazine.', rule:'menos...que = less...than' },
    { sentence:'¿Es el perro ___ inteligente ___ el gato?', answer:'tan...como', choices:['más...que','menos...que','tan...como','el más...de'], fills:['tan','como'],  en:'Is the dog as intelligent as the cat?',       rule:'tan...como = as...as' },
    { sentence:'Es el sitio ___ bonito ___ país.',     answer:'más...del',   choices:['más...que','más...del','tan...como','menos...del'],   fills:['más','del'],    en:'It is the most beautiful place in the country.',rule:'superlative: el/la más...de (de + el = del)' },
    { sentence:'Esta torta es buena, pero el pastel es ___.',  answer:'mejor', choices:['mejor','el mejor','bueno','más bueno'],             fills:['mejor'],        en:'This cake is good but the pastry is better.',  rule:'bueno → mejor (irregular comparative)' },
    { sentence:'Estos postres son ___ de todos.',      answer:'los mejores', choices:['los mejores','los más buenos','los peores','mejores'], fills:['los mejores'],  en:'These desserts are the best of all.',           rule:'bueno → el mejor (irregular superlative)' },
    { sentence:'Ella es ___ de su escuela.',           answer:'la peor',     choices:['la peor','la más mala','la mejor','la menos buena'],  fills:['la peor'],      en:'She is the worst in her school.',              rule:'malo → el peor (irregular superlative)' },
    { sentence:'Su hermano es ___.',                   answer:'menor',       choices:['menor','más joven','el menor','más pequeño'],         fills:['menor'],        en:'His brother is younger.',                      rule:'joven → menor (irregular comparative, people only)' },
    { sentence:'Anita tiene dos años. Ella es ___ de su familia.', answer:'la menor', choices:['la menor','la más joven','la mayor','la peor'], fills:['la menor'], en:'Anita is two years old. She is the youngest in her family.', rule:'joven → la menor (irregular superlative, people)' },
    { sentence:'Ellas cantan ___ sus hermanos.',       answer:'mejor que',   choices:['mejor que','peor que','más que','tan como'],          fills:['mejor que'],    en:'They sing better than their brothers.',         rule:'bien → mejor (irregular adverbial comparison)' },
  ],
};

/* ════════════════════════════════════════════════════════════════════════════
   SUB-LESSON 8-4 — Adverbs
   ════════════════════════════════════════════════════════════════════════════ */

const SUBLESSON_8_4 = {
  id: '8-4',
  chapterId: 8,
  title: 'Adverbs',
  subtitle: 'adjective + -mente · bien · mal · mejor · peor',

  rules: [
    {
      id: 'r1',
      heading: 'Forming adverbs with -mente',
      body: 'Add -mente to the feminine form of the adjective. If the adjective ends in -o, change to -a first, then add -mente. Adjectives that don\'t end in -o just add -mente directly.',
      examples: [
        { es: 'rápido → rápida → rápidamente',  en: 'rapid → rapidly', note: '-o adjective' },
        { es: 'claro → clara → claramente',     en: 'clear → clearly' },
        { es: 'fácil → fácilmente',             en: 'easy → easily', note: 'no -o, add -mente directly' },
        { es: 'feliz → felizmente',             en: 'happy → happily' },
      ],
      tip: 'When two adverbs appear in a series, only the last one adds -mente. The first takes the feminine adjective form: Él camina frecuente y alegremente.',
    },
    {
      id: 'r2',
      heading: 'Common irregular and standalone adverbs',
      body: 'Some adverbs don\'t follow the -mente pattern and must be memorized.',
      examples: [
        { es: 'bien',        en: 'well' },
        { es: 'mal',         en: 'badly / poorly' },
        { es: 'mejor',       en: 'better' },
        { es: 'peor',        en: 'worse' },
        { es: 'mucho',       en: 'a lot / very much' },
        { es: 'poco',        en: 'a little / not much' },
      ],
    },
  ],

  adverbDrills: [
    { adjective:'perfecto',    adverb:'perfectamente',   en:'perfectly' },
    { adjective:'rápido',      adverb:'rápidamente',     en:'rapidly / quickly' },
    { adjective:'lento',       adverb:'lentamente',      en:'slowly' },
    { adjective:'claro',       adverb:'claramente',      en:'clearly' },
    { adjective:'honesto',     adverb:'honestamente',    en:'honestly' },
    { adjective:'tranquilo',   adverb:'tranquilamente',  en:'calmly' },
    { adjective:'sincero',     adverb:'sinceramente',    en:'sincerely' },
    { adjective:'alegre',      adverb:'alegremente',     en:'happily' },
    { adjective:'feliz',       adverb:'felizmente',      en:'happily' },
    { adjective:'triste',      adverb:'tristemente',     en:'sadly' },
    { adjective:'fácil',       adverb:'fácilmente',      en:'easily' },
    { adjective:'frecuente',   adverb:'frecuentemente',  en:'frequently' },
    { adjective:'cariñoso',    adverb:'cariñosamente',   en:'affectionately' },
    { adjective:'normal',      adverb:'normalmente',     en:'normally' },
    { adjective:'total',       adverb:'totalmente',      en:'totally' },
  ],

  sentenceCompletionDrills: [
    { sentence:'Ella camina frecuente y ___.',          answer:'alegremente',   choices:['alegremente','alegre','alegremente ','felizmente'],   fills:['alegremente'],   en:'She walks frequently and happily.',          rule:'Two adverbs in series: first keeps feminine adj form, last adds -mente' },
    { sentence:'Él corre lenta y ___.',                 answer:'tristemente',   choices:['tristemente','triste','tristemente ','lentamente'],   fills:['tristemente'],   en:'He runs slowly and sadly.',                 rule:'Two adverbs in series — only last gets -mente' },
    { sentence:'Hablo clara y ___.',                    answer:'concisamente',  choices:['concisamente','conciso','claramente','directamente'], fills:['concisamente'],  en:'I speak clearly and concisely.',            rule:'Two adverbs in series' },
    { sentence:'Ella vive tranquila y ___.',            answer:'libremente',    choices:['libremente','libremente ','libre','felizmente'],       fills:['libremente'],    en:'She lives calmly and freely.',              rule:'libre → libremente (ends in -e, add -mente)' },
    { sentence:'Ellas cantan ___ sus hermanos.',        answer:'mejor que',     choices:['mejor que','bien que','más bien que','peor que'],      fills:['mejor que'],     en:'They sing better than their brothers.',      rule:'bien → mejor (irregular adverb comparison)' },
  ],

  vocabulary: [
    { id:'adv8_1',  es:'rápidamente',    en:'rapidly / quickly', gender:'n', rule:'adverb', article:'', plural:'', ex:'El tren llega rápidamente.',         exEn:'The train arrives quickly.' },
    { id:'adv8_2',  es:'lentamente',     en:'slowly',            gender:'n', rule:'adverb', article:'', plural:'', ex:'Él camina lentamente.',              exEn:'He walks slowly.' },
    { id:'adv8_3',  es:'claramente',     en:'clearly',           gender:'n', rule:'adverb', article:'', plural:'', ex:'Ella habla claramente.',             exEn:'She speaks clearly.' },
    { id:'adv8_4',  es:'frecuentemente', en:'frequently',        gender:'n', rule:'adverb', article:'', plural:'', ex:'Viajamos frecuentemente.',           exEn:'We travel frequently.' },
    { id:'adv8_5',  es:'perfectamente',  en:'perfectly',         gender:'n', rule:'adverb', article:'', plural:'', ex:'Ella toca el piano perfectamente.',  exEn:'She plays the piano perfectly.' },
    { id:'adv8_6',  es:'tranquilamente', en:'calmly',            gender:'n', rule:'adverb', article:'', plural:'', ex:'Vivimos tranquilamente.',            exEn:'We live calmly.' },
    { id:'adv8_7',  es:'bien',           en:'well',              gender:'n', rule:'adverb', article:'', plural:'', ex:'Ella escribe bien.',                 exEn:'She writes well.' },
    { id:'adv8_8',  es:'mal',            en:'badly / poorly',    gender:'n', rule:'adverb', article:'', plural:'', ex:'Él canta mal.',                     exEn:'He sings badly.' },
    { id:'adv8_9',  es:'mejor',          en:'better',            gender:'n', rule:'adverb', article:'', plural:'', ex:'Ella cocina mejor que su hermana.',  exEn:'She cooks better than her sister.' },
    { id:'adv8_10', es:'peor',           en:'worse',             gender:'n', rule:'adverb', article:'', plural:'', ex:'Hoy canto peor que ayer.',           exEn:'Today I sing worse than yesterday.' },
  ],

  readingVocab: [
    { id:'rv8_1',  es:'apagar',          en:'to turn off' },
    { id:'rv8_2',  es:'imaginar',        en:'to imagine' },
    { id:'rv8_3',  es:'sonreír',         en:'to smile' },
    { id:'rv8_4',  es:'la brisa',        en:'the breeze' },
    { id:'rv8_5',  es:'el entremés',     en:'the appetizer' },
    { id:'rv8_6',  es:'el invitado',     en:'the guest' },
    { id:'rv8_7',  es:'la letra',        en:'the lyrics / words of a song' },
    { id:'rv8_8',  es:'el ambiente',     en:'the atmosphere' },
    { id:'rv8_9',  es:'el anfitrión',    en:'the host' },
    { id:'rv8_10', es:'el bocadillo',    en:'the snack' },
    { id:'rv8_11', es:'la botella',      en:'the bottle' },
    { id:'rv8_12', es:'la pareja',       en:'the couple / partner' },
    { id:'rv8_13', es:'la vela',         en:'the candle' },
    { id:'rv8_14', es:'el vestuario',    en:'the wardrobe / closet' },
    { id:'rv8_15', es:'acerca de',       en:'about / concerning' },
  ],
};

/* ════════════════════════════════════════════════════════════════════════════
   Chapter 8 export
   ════════════════════════════════════════════════════════════════════════════ */

const CHAPTER_8 = {
  id: 8,
  title: 'Adjectives and Adverbs',
  unlocked: false,
  sublessons: [SUBLESSON_8_1, SUBLESSON_8_2, SUBLESSON_8_3, SUBLESSON_8_4],
};

export default CHAPTER_8;
export { SUBLESSON_8_1, SUBLESSON_8_2, SUBLESSON_8_3, SUBLESSON_8_4 };
