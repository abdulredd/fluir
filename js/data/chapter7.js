/* ─── Fluir · Chapter 7 Data ────────────────────────────────────────────────
   Source: Complete Spanish Step-by-Step, Bregstein (McGraw-Hill)
   Chapter 7: Ir and the Future
   4 sub-lessons:
     7-1  Ir — conjugation, destinations, ir + a + infinitive (near future)
     7-2  Hacer and Tener expressions
     7-3  Verbal idioms — acabar de, dejar de, tener que, tratar de, volver a
     7-4  New vocabulary — 20+ new -ar verbs
   ─────────────────────────────────────────────────────────────────────────── */

/* ════════════════════════════════════════════════════════════════════════════
   SUB-LESSON 7-1 — Ir and the Near Future
   ════════════════════════════════════════════════════════════════════════════ */

const SUBLESSON_7_1 = {
  id: '7-1',
  chapterId: 7,
  title: 'Ir and the Near Future',
  subtitle: 'voy · vas · va · vamos · vais · van',

  rules: [
    {
      id: 'r1',
      heading: 'Ir (to go) — fully irregular conjugation',
      body: 'Ir is completely irregular — the conjugated forms share nothing with the infinitive. These must be memorized as a set.',
      examples: [
        { es: 'yo voy',         en: 'I go / I am going' },
        { es: 'tú vas',         en: 'you go / you are going' },
        { es: 'él/ella va',     en: 'he/she goes / is going' },
        { es: 'nosotros vamos', en: 'we go / we are going' },
        { es: 'ellos van',      en: 'they go / they are going' },
      ],
      tip: '¿Adónde? means "to where?" — used when asking where someone is going. The preposition a always follows ir: voy al banco, van a la tienda.',
    },
    {
      id: 'r2',
      heading: 'Ir + a + infinitive — the near future',
      body: 'To express something that is going to happen, use the conjugated form of ir + a + infinitive. This is the most common way to express future time in everyday Spanish.',
      examples: [
        { es: 'Ellos van a cantar esta noche.', en: 'They are going to sing tonight.' },
        { es: 'Vamos a decidir más tarde.',     en: 'We are going to decide later.' },
        { es: '¿Vas a viajar a España?',        en: 'Are you going to travel to Spain?' },
        { es: 'Vamos a salir ahora.',           en: 'We are going to leave now.' },
      ],
      tip: 'The subject pronoun is often omitted: Vas a estudiar = You are going to study. Vamos a comer = We are going to eat.',
    },
  ],

  conjugations: [
    { pronoun:'yo',       form:'voy',   en:'I go / I am going' },
    { pronoun:'tú',       form:'vas',   en:'you go / you are going' },
    { pronoun:'él/ella',  form:'va',    en:'he/she goes / is going' },
    { pronoun:'Ud.',      form:'va',    en:'you go / you are going' },
    { pronoun:'nosotros', form:'vamos', en:'we go / we are going' },
    { pronoun:'vosotros', form:'vais',  en:'you (pl.) go' },
    { pronoun:'ellos',    form:'van',   en:'they go / they are going' },
    { pronoun:'Uds.',     form:'van',   en:'you all go / are going' },
  ],

  /* Near future drills — pronoun + infinitive → correct ir + a + infinitive */
  futureDrills: [
    { pronoun:'yo',       infinitive:'cantar',   sentence:'Voy a cantar.',         en:'I am going to sing.' },
    { pronoun:'tú',       infinitive:'viajar',   sentence:'Vas a viajar.',         en:'You are going to travel.' },
    { pronoun:'él',       infinitive:'trabajar', sentence:'Va a trabajar.',        en:'He is going to work.' },
    { pronoun:'nosotros', infinitive:'decidir',  sentence:'Vamos a decidir.',      en:'We are going to decide.' },
    { pronoun:'ellos',    infinitive:'salir',    sentence:'Van a salir.',          en:'They are going to leave.' },
    { pronoun:'yo',       infinitive:'terminar', sentence:'Voy a terminar.',       en:'I am going to finish.' },
    { pronoun:'tú',       infinitive:'estudiar', sentence:'Vas a estudiar.',       en:'You are going to study.' },
    { pronoun:'ella',     infinitive:'cocinar',  sentence:'Va a cocinar.',         en:'She is going to cook.' },
    { pronoun:'nosotros', infinitive:'celebrar', sentence:'Vamos a celebrar.',     en:'We are going to celebrate.' },
    { pronoun:'Uds.',     infinitive:'comprar',  sentence:'Van a comprar.',        en:'You all are going to buy.' },
  ],

  vocabulary: [
    { id:'ir7_1', es:'el supermercado', en:'the supermarket', gender:'m', rule:'ends_o',    article:'el', plural:'los supermercados', ex:'Quiero ir al supermercado.', exEn:'I want to go to the supermarket.' },
    { id:'ir7_2', es:'el cine',         en:'the movies',      gender:'m', rule:'ends_e',    article:'el', plural:'los cines',         ex:'Vamos al cine los sábados.', exEn:'We go to the movies on Saturdays.' },
    { id:'ir7_3', es:'el gimnasio',     en:'the gym',         gender:'m', rule:'ends_o',    article:'el', plural:'los gimnasios',     ex:'Voy al gimnasio para hacer ejercicio.', exEn:'I go to the gym to exercise.' },
    { id:'ir7_4', es:'el partido',      en:'the game / match',gender:'m', rule:'ends_o',    article:'el', plural:'los partidos',      ex:'El hombre quiere ir al partido de béisbol.', exEn:'The man wants to go to the baseball game.' },
    { id:'ir7_5', es:'el banco',        en:'the bank',        gender:'m', rule:'ends_o',    article:'el', plural:'los bancos',        ex:'Voy al banco los miércoles.', exEn:'I go to the bank on Wednesdays.' },
    { id:'ir7_6', es:'¿adónde?',        en:'to where? / where to?', gender:'n', rule:'interrogative', article:'', plural:'', ex:'¿Adónde van ellos?', exEn:'Where are they going?' },
  ],
};

/* ════════════════════════════════════════════════════════════════════════════
   SUB-LESSON 7-2 — Hacer and Tener Expressions
   ════════════════════════════════════════════════════════════════════════════ */

const SUBLESSON_7_2 = {
  id: '7-2',
  chapterId: 7,
  title: 'Hacer and Tener Expressions',
  subtitle: 'hace calor · tengo hambre · tiene razón',

  rules: [
    {
      id: 'r1',
      heading: 'Hacer — weather expressions',
      body: 'To describe weather, Spanish uses hace (the third-person singular of hacer). These are fixed expressions — the verb never changes.',
      examples: [
        { es: 'Hace calor.',          en: 'It is hot. (literally: it makes heat)' },
        { es: 'Hace frío.',           en: 'It is cold.' },
        { es: 'Hace sol.',            en: 'It is sunny.' },
        { es: 'Hace buen tiempo.',    en: 'The weather is nice.' },
        { es: 'Hace mal tiempo.',     en: 'The weather is bad.' },
      ],
    },
    {
      id: 'r2',
      heading: 'Tener — idiomatic expressions',
      body: 'Many English expressions using "to be" are expressed in Spanish with tener (to have). The subject must agree with tener — this is NOT a fixed expression like hacer.',
      examples: [
        { es: 'Yo tengo treinta años.',  en: 'I am thirty years old. (I have thirty years)' },
        { es: 'Ella tiene hambre.',      en: 'She is hungry. (she has hunger)' },
        { es: 'Tenemos razón.',          en: 'We are right. (we have reason)' },
        { es: '¿Tienen Uds. miedo?',     en: 'Are you all afraid? (do you have fear?)' },
      ],
      tip: 'Key difference: hacer expressions use hace always (weather); tener expressions conjugate with the subject (tener calor = yo tengo calor, tú tienes calor...).',
    },
  ],

  hacerExpressions: [
    { es:'hace calor',      en:'it is hot',         ex:'En el verano hace mucho calor.',          exEn:'In summer it is very hot.' },
    { es:'hace frío',       en:'it is cold',        ex:'En el invierno hace frío.',               exEn:'In winter it is cold.' },
    { es:'hace sol',        en:'it is sunny',       ex:'Hace sol hoy. Vamos a la playa.',         exEn:'It is sunny today. Let\'s go to the beach.' },
    { es:'hace viento',     en:'it is windy',       ex:'Hace viento y hace frío.',                exEn:'It is windy and cold.' },
    { es:'hace buen tiempo',en:'the weather is nice',ex:'Hace buen tiempo en la primavera.',     exEn:'The weather is nice in spring.' },
    { es:'hace mal tiempo', en:'the weather is bad', ex:'Hace mal tiempo hoy. No vamos al parque.',exEn:'The weather is bad today. We are not going to the park.' },
  ],

  tenerExpressions: [
    { es:'tener años',       en:'to be years old',      ex:'Yo tengo veinticinco años.',              exEn:'I am twenty-five years old.' },
    { es:'tener calor',      en:'to be hot',            ex:'Tengo calor. Quiero nadar.',              exEn:'I am hot. I want to swim.' },
    { es:'tener celos',      en:'to be jealous',        ex:'Ella tiene celos de su amiga.',           exEn:'She is jealous of her friend.' },
    { es:'tener cuidado',    en:'to be careful',        ex:'¡Ten cuidado en situaciones peligrosas!', exEn:'Be careful in dangerous situations!' },
    { es:'tener la culpa',   en:'to be at fault',       ex:'Él tiene la culpa del problema.',         exEn:'He is at fault for the problem.' },
    { es:'tener dolor de cabeza', en:'to have a headache', ex:'Janet tiene dolor de cabeza y no puede ir al trabajo.', exEn:'Janet has a headache and cannot go to work.' },
    { es:'tener envidia',    en:'to be envious',        ex:'Tiene envidia de los estudiantes excelentes.', exEn:'He is envious of the excellent students.' },
    { es:'tener éxito',      en:'to be successful',     ex:'Ella tiene éxito en el trabajo.',         exEn:'She is successful at work.' },
    { es:'tener frío',       en:'to be cold',           ex:'Los niños tienen frío en el invierno.',   exEn:'The children are cold in winter.' },
    { es:'tener ganas de',   en:'to want / to feel like',ex:'Tengo ganas de ir a la playa.',         exEn:'I feel like going to the beach.' },
    { es:'tener hambre',     en:'to be hungry',         ex:'Son las doce. Tenemos hambre.',           exEn:'It is noon. We are hungry.' },
    { es:'tener la palabra', en:'to have the floor',    ex:'El presidente tiene la palabra.',         exEn:'The president has the floor.' },
    { es:'tener lugar',      en:'to take place',        ex:'¿Dónde tiene lugar la fiesta?',           exEn:'Where does the party take place?' },
    { es:'tener miedo de',   en:'to be afraid of',      ex:'Los niños tienen miedo de los perros.',   exEn:'The children are afraid of dogs.' },
    { es:'tener prisa',      en:'to be in a hurry',     ex:'Tengo prisa. Voy a llegar tarde.',        exEn:'I am in a hurry. I am going to be late.' },
    { es:'tener que ver con',en:'to have to do with',   ex:'¿Qué tiene que ver con la pregunta?',    exEn:'What does it have to do with the question?' },
    { es:'tener rabia',      en:'to be in a rage',      ex:'Él tiene rabia porque pierde.',           exEn:'He is in a rage because he is losing.' },
    { es:'tener razón',      en:'to be right',          ex:'Ella tiene razón. La respuesta es correcta.', exEn:'She is right. The answer is correct.' },
    { es:'tener sed',        en:'to be thirsty',        ex:'Tengo sed. ¿Hay agua?',                  exEn:'I am thirsty. Is there water?' },
    { es:'tener sueño',      en:'to be sleepy',         ex:'Son las once de la noche. Tengo sueño.', exEn:'It is eleven at night. I am sleepy.' },
    { es:'tener suerte',     en:'to be lucky',          ex:'¡Tienes suerte! Ganas el premio.',        exEn:'You are lucky! You win the prize.' },
    { es:'tener vergüenza',  en:'to be ashamed',        ex:'Tiene vergüenza porque miente.',          exEn:'He is ashamed because he lies.' },
  ],
};

/* ════════════════════════════════════════════════════════════════════════════
   SUB-LESSON 7-3 — Verbal Idioms
   ════════════════════════════════════════════════════════════════════════════ */

const SUBLESSON_7_3 = {
  id: '7-3',
  chapterId: 7,
  title: 'Verbal Idioms',
  subtitle: 'acabar de · dejar de · tener que · tratar de · volver a',

  rules: [
    {
      id: 'r1',
      heading: 'Verb + infinitive constructions',
      body: 'These five idioms each combine a conjugated verb with a preposition (de, que, a) and then an infinitive. Only the first verb conjugates — the infinitive stays unchanged.',
      examples: [
        { es: 'acabar de + inf.',  en: 'to have just (done something)' },
        { es: 'dejar de + inf.',   en: 'to stop (doing something)' },
        { es: 'tener que + inf.',  en: 'to have to (do something)' },
        { es: 'tratar de + inf.',  en: 'to try to (do something)' },
        { es: 'volver a + inf.',   en: 'to do (something) again' },
      ],
    },
    {
      id: 'r2',
      heading: 'Examples in context',
      body: 'Acabar de uses the present tense in Spanish but translates as the English present perfect ("I have just..."). The others translate more directly.',
      examples: [
        { es: 'Acabo de llegar.',          en: 'I have just arrived.' },
        { es: 'Deja de fumar.',            en: 'He stops smoking.' },
        { es: 'Tengo que ir.',             en: 'I have to go.' },
        { es: 'Tratamos de aprender.',     en: 'We try to learn.' },
        { es: 'Vuelve a mentir.',          en: 'He lies again.' },
      ],
    },
  ],

  idioms: [
    {
      construction: 'acabar de + infinitive',
      en: 'to have just (done something)',
      conjugations: [
        { pronoun:'yo',       form:'acabo de',    ex:'Acabo de llegar.',          exEn:'I have just arrived.' },
        { pronoun:'tú',       form:'acabas de',   ex:'Acabas de cantar.',         exEn:'You have just sung.' },
        { pronoun:'él/ella',  form:'acaba de',    ex:'Él acaba de salir.',        exEn:'He has just left.' },
        { pronoun:'nosotros', form:'acabamos de', ex:'Acabamos de decidir.',      exEn:'We have just decided.' },
        { pronoun:'ellos',    form:'acaban de',   ex:'Ellos acaban de volver.',   exEn:'They have just returned.' },
      ],
    },
    {
      construction: 'dejar de + infinitive',
      en: 'to stop (doing something)',
      conjugations: [
        { pronoun:'yo',       form:'dejo de',     ex:'Dejo de fumar.',            exEn:'I stop smoking.' },
        { pronoun:'tú',       form:'dejas de',    ex:'Dejas de comer.',           exEn:'You stop eating.' },
        { pronoun:'él/ella',  form:'deja de',     ex:'Ella deja de bailar.',      exEn:'She stops dancing.' },
        { pronoun:'nosotros', form:'dejamos de',  ex:'Dejamos de trabajar.',      exEn:'We stop working.' },
        { pronoun:'ellos',    form:'dejan de',    ex:'Ellas dejan de estudiar.',  exEn:'They stop studying.' },
      ],
    },
    {
      construction: 'tener que + infinitive',
      en: 'to have to (do something)',
      conjugations: [
        { pronoun:'yo',       form:'tengo que',   ex:'Tengo que ir.',             exEn:'I have to go.' },
        { pronoun:'tú',       form:'tienes que',  ex:'Tienes que cocinar.',       exEn:'You have to cook.' },
        { pronoun:'él/ella',  form:'tiene que',   ex:'Él tiene que hablar.',      exEn:'He has to speak.' },
        { pronoun:'nosotros', form:'tenemos que', ex:'Tenemos que caminar.',      exEn:'We have to walk.' },
        { pronoun:'ellos',    form:'tienen que',  ex:'Ellos tienen que descansar.', exEn:'They have to rest.' },
      ],
    },
    {
      construction: 'tratar de + infinitive',
      en: 'to try to (do something)',
      conjugations: [
        { pronoun:'yo',       form:'trato de',    ex:'Trato de leer.',            exEn:'I try to read.' },
        { pronoun:'tú',       form:'tratas de',   ex:'Tratas de limpiar.',        exEn:'You try to clean.' },
        { pronoun:'él/ella',  form:'trata de',    ex:'Ud. trata de contestar.',   exEn:'You try to answer.' },
        { pronoun:'nosotros', form:'tratamos de', ex:'Tratamos de escribir.',     exEn:'We try to write.' },
        { pronoun:'ellos',    form:'tratan de',   ex:'Uds. tratan de nadar.',     exEn:'You try to swim.' },
      ],
    },
    {
      construction: 'volver a + infinitive',
      en: 'to do (something) again',
      conjugations: [
        { pronoun:'yo',       form:'vuelvo a',    ex:'Vuelvo a leer.',            exEn:'I read again.' },
        { pronoun:'tú',       form:'vuelves a',   ex:'Vuelves a cocinar.',        exEn:'You cook again.' },
        { pronoun:'él/ella',  form:'vuelve a',    ex:'Ud. vuelve a mentir.',      exEn:'You lie again.' },
        { pronoun:'nosotros', form:'volvemos a',  ex:'Volvemos a conversar.',     exEn:'We speak again.' },
        { pronoun:'ellos',    form:'vuelven a',   ex:'Uds. vuelven a ganar.',     exEn:'You win again.' },
      ],
    },
  ],
};

/* ════════════════════════════════════════════════════════════════════════════
   SUB-LESSON 7-4 — New Vocabulary (-ar verbs)
   ════════════════════════════════════════════════════════════════════════════ */

const SUBLESSON_7_4 = {
  id: '7-4',
  chapterId: 7,
  title: 'New Vocabulary',
  subtitle: '20+ new -ar verbs for everyday communication',

  rules: [
    {
      id: 'r1',
      heading: 'All regular -ar verbs',
      body: 'These verbs all conjugate with the standard -ar endings learned in Chapter 5: -o, -as, -a, -amos, -áis, -an. No stem changes.',
      examples: [
        { es: 'Necesito aprender el portugués.', en: 'I need to learn Portuguese.' },
        { es: 'Vamos a celebrar el cumpleaños.', en: 'We are going to celebrate the birthday.' },
        { es: 'Ella maneja el carro al trabajo.', en: 'She drives the car to work.' },
        { es: '¿Quién va a terminar la tarea?',  en: 'Who is going to finish the homework?' },
      ],
    },
  ],

  verbs: [
    { infinitive:'aceptar',   en:'to accept',           stem:'acept',  type:'ar', ex:'Él no va a aceptar la invitación.',  exEn:'He is not going to accept the invitation.' },
    { infinitive:'apagar',    en:'to turn off',          stem:'apag',   type:'ar', ex:'¿Quién va a apagar las luces?',      exEn:'Who is going to turn off the lights?' },
    { infinitive:'arreglar',  en:'to arrange / to fix',  stem:'arregl', type:'ar', ex:'Voy a arreglar el carro.',           exEn:'I am going to fix the car.' },
    { infinitive:'cambiar',   en:'to change',            stem:'cambi',  type:'ar', ex:'Ella va a cambiar de trabajo.',      exEn:'She is going to change jobs.' },
    { infinitive:'celebrar',  en:'to celebrate',         stem:'celebr', type:'ar', ex:'Vamos a celebrar el cumpleaños.',    exEn:'We are going to celebrate the birthday.' },
    { infinitive:'cruzar',    en:'to cross',             stem:'cruz',   type:'ar', ex:'Cruzamos la calle con cuidado.',     exEn:'We cross the street carefully.' },
    { infinitive:'dibujar',   en:'to draw',              stem:'dibuj',  type:'ar', ex:'Los niños dibujan en la clase.',     exEn:'The children draw in class.' },
    { infinitive:'disfrutar', en:'to enjoy',             stem:'disfrut',type:'ar', ex:'Vamos a disfrutar el verano.',       exEn:'We are going to enjoy the summer.' },
    { infinitive:'doblar',    en:'to turn / to fold',    stem:'dobl',   type:'ar', ex:'Doblas a la derecha en la calle.',   exEn:'You turn right on the street.' },
    { infinitive:'explicar',  en:'to explain',           stem:'explic', type:'ar', ex:'El profesor explica la lección.',    exEn:'The professor explains the lesson.' },
    { infinitive:'firmar',    en:'to sign',              stem:'firm',   type:'ar', ex:'Samuel va a firmar el documento.',   exEn:'Samuel is going to sign the document.' },
    { infinitive:'gozar',     en:'to enjoy',             stem:'goz',    type:'ar', ex:'Gozamos del clima maravilloso.',     exEn:'We enjoy the marvelous climate.' },
    { infinitive:'llorar',    en:'to cry',               stem:'llor',   type:'ar', ex:'Los niños lloran cuando tienen miedo.',exEn:'The children cry when they are afraid.' },
    { infinitive:'manejar',   en:'to drive',             stem:'manej',  type:'ar', ex:'Ella maneja el carro al trabajo.',   exEn:'She drives the car to work.' },
    { infinitive:'marcar',    en:'to dial / to mark',    stem:'marc',   type:'ar', ex:'Marcas el número del médico.',       exEn:'You dial the doctor\'s number.' },
    { infinitive:'necesitar', en:'to need',              stem:'necesit',type:'ar', ex:'Necesito aprender el portugués.',    exEn:'I need to learn Portuguese.' },
    { infinitive:'parar',     en:'to stop',              stem:'par',    type:'ar', ex:'El bus para en la avenida.',         exEn:'The bus stops on the avenue.' },
    { infinitive:'pintar',    en:'to paint',             stem:'pint',   type:'ar', ex:'Los artistas pintan en el parque.',  exEn:'The artists paint in the park.' },
    { infinitive:'preparar',  en:'to prepare',           stem:'prepar', type:'ar', ex:'Ella prepara la comida para la fiesta.',exEn:'She prepares the food for the party.' },
    { infinitive:'repasar',   en:'to review',            stem:'repas',  type:'ar', ex:'Repasamos las lecciones antes del examen.',exEn:'We review the lessons before the exam.' },
    { infinitive:'terminar',  en:'to finish',            stem:'termin', type:'ar', ex:'¿Cuándo van a terminar la tarea?',   exEn:'When are they going to finish the homework?' },
    { infinitive:'tirar',     en:'to throw',             stem:'tir',    type:'ar', ex:'Los niños tiran la pelota.',         exEn:'The children throw the ball.' },
    { infinitive:'usar',      en:'to use',               stem:'us',     type:'ar', ex:'Usamos la computadora cada día.',    exEn:'We use the computer every day.' },
  ],
};

/* ════════════════════════════════════════════════════════════════════════════
   Chapter 7 export
   ════════════════════════════════════════════════════════════════════════════ */

const CHAPTER_7 = {
  id: 7,
  title: 'Ir and the Future',
  unlocked: false,
  sublessons: [SUBLESSON_7_1, SUBLESSON_7_2, SUBLESSON_7_3, SUBLESSON_7_4],
};

export default CHAPTER_7;
export { SUBLESSON_7_1, SUBLESSON_7_2, SUBLESSON_7_3, SUBLESSON_7_4 };
