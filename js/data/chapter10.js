/* ─── Fluir · Chapter 10 Data ───────────────────────────────────────────────
   Source: Complete Spanish Step-by-Step, Bregstein (McGraw-Hill)
   Chapter 10: The Indirect Object
   4 sub-lessons (Option A):
     10-1  Gustar — me gusta/gustan, all indirect object pronouns, clarifying phrases
     10-2  Verbs like gustar — agradar, convenir, doler, encantar, fascinar,
            faltar, hacer falta, importar, interesar, molestar, parecer, quedar,
            sobrar, tocarle
     10-3  Indirect object with action verbs — dar, decir, escribir, enseñar,
            prestar, traer, vender, comprar, hacer, cobrar, contar, contestar,
            enviar, preguntar
     10-4  Pronoun placement drill — before verb vs attached to infinitive,
            two-verb constructions, mixed drill
   ─────────────────────────────────────────────────────────────────────────── */

/* ════════════════════════════════════════════════════════════════════════════
   SUB-LESSON 10-1 — Gustar and the Indirect Object
   ════════════════════════════════════════════════════════════════════════════ */

const SUBLESSON_10_1 = {
  id: '10-1',
  chapterId: 10,
  title: 'Gustar and the Indirect Object',
  subtitle: 'Me gusta · Me gustan · Te gusta · Le gusta · Nos gusta',

  rules: [
    {
      id: 'r1',
      heading: 'Gustar means "to be pleasing to" — not "I like"',
      body: 'In Spanish there is no direct equivalent of "I like." Instead, gustar is used with the structure: indirect object pronoun + gusta/gustan + subject. The verb agrees with the subject (the thing liked), not with the person.',
      examples: [
        { es: 'Me gusta la música.',    en: 'Music is pleasing to me. (I like music.)', note: 'singular subject → gusta' },
        { es: 'Me gustan los libros.',  en: 'Books are pleasing to me. (I like books.)', note: 'plural subject → gustan' },
        { es: 'Me gusta nadar.',        en: 'Swimming is pleasing to me. (I like to swim.)', note: 'infinitive subject → gusta' },
      ],
      tip: 'The only two forms you need are gusta (singular or infinitive) and gustan (plural). Gustar has no other forms in everyday use.',
    },
    {
      id: 'r2',
      heading: 'All six indirect object pronouns',
      body: 'Swap the indirect object pronoun to change who likes something. Le is ambiguous — add a clarifying phrase (a él, a ella, a Ud.) to specify.',
      examples: [
        { es: 'Me gusta el café.',      en: 'I like coffee.' },
        { es: 'Te gusta el café.',      en: 'You like coffee.' },
        { es: 'Le gusta el café.',      en: 'He/she/you (formal) like(s) coffee.' },
        { es: 'Nos gusta el café.',     en: 'We like coffee.' },
        { es: 'Les gusta el café.',     en: 'They/you all like coffee.' },
      ],
    },
    {
      id: 'r3',
      heading: 'Clarifying phrases — a mí, a ti, a él…',
      body: 'Because le and les are ambiguous, add a prepositional phrase for clarity or emphasis. A mí and a ti emphasize the person; a él/ella/Uds./ellos clarify who is meant.',
      examples: [
        { es: 'A mí me gusta viajar.',       en: 'I (for my part) like to travel.' },
        { es: 'A él le gusta nadar.',         en: 'He likes to swim.' },
        { es: 'A ellos les gustan los carros.', en: 'They like cars.' },
        { es: 'A Susana le gusta bailar.',    en: 'Susana likes to dance.' },
      ],
    },
  ],

  sentenceCompletionDrills: [
    { sentence:'___ gusta la música.',            answer:'Me',    choices:['Me','Te','Le','Nos'],         fills:['Me'],    en:'I like music.',                       rule:'me = indirect object pronoun for yo' },
    { sentence:'___ gustan los deportes.',        answer:'Me',    choices:['Me','Le','Les','Nos'],        fills:['Me'],    en:'I like sports.',                      rule:'gustan — los deportes is plural' },
    { sentence:'___ gusta el café.',              answer:'Te',    choices:['Me','Te','Le','Les'],         fills:['Te'],    en:'You like coffee.',                    rule:'te = indirect object for tú' },
    { sentence:'___ gusta viajar.',               answer:'Le',    choices:['Me','Te','Le','Les'],         fills:['Le'],    en:'He/she likes to travel.',             rule:'le = to him/her/you (formal)' },
    { sentence:'___ gustan las fiestas.',         answer:'Nos',   choices:['Me','Te','Nos','Les'],        fills:['Nos'],   en:'We like parties.',                    rule:'nos = to us · gustan because plural' },
    { sentence:'___ gusta bailar.',               answer:'Les',   choices:['Me','Le','Nos','Les'],        fills:['Les'],   en:'They/you all like to dance.',          rule:'les = to them/you all' },
    { sentence:'Me ___ la música.',               answer:'gusta', choices:['gusta','gustan','gusto','gustas'], fills:['gusta'], en:'I like music.',                rule:'gusta — la música is singular' },
    { sentence:'Me ___ los libros.',              answer:'gustan',choices:['gusta','gustan','gusto','gustan'], fills:['gustan'], en:'I like books.',               rule:'gustan — los libros is plural' },
    { sentence:'A ___ le gusta nadar.',           answer:'él',    choices:['él','mí','ti','nosotros'],    fills:['él'],    en:'He likes to swim.',                   rule:'clarifying phrase: a él = him' },
    { sentence:'A mí ___ gusta el café.',         answer:'me',    choices:['me','te','le','les'],         fills:['me'],    en:'I (for my part) like coffee.',         rule:'a mí always pairs with me' },
    { sentence:'A ellos ___ gustan los carros.',  answer:'les',   choices:['me','te','le','les'],         fills:['les'],   en:'They like cars.',                     rule:'a ellos pairs with les' },
    { sentence:'A Susana ___ gusta bailar.',      answer:'le',    choices:['me','te','le','les'],         fills:['le'],    en:'Susana likes to dance.',               rule:'a proper noun → le' },
  ],

  pronounTable: [
    { pronoun:'me', clarifier:'a mí',       en:'to me',             example:'Me gusta el café.' },
    { pronoun:'te', clarifier:'a ti',       en:'to you (familiar)', example:'¿Te gustan los deportes?' },
    { pronoun:'le', clarifier:'a él/ella/Ud.',en:'to him/her/you',  example:'Le gusta nadar.' },
    { pronoun:'nos',clarifier:'a nosotros', en:'to us',             example:'Nos gustan las fiestas.' },
    { pronoun:'os', clarifier:'a vosotros', en:'to you (Spain)',    example:'¿Os gusta la música?' },
    { pronoun:'les',clarifier:'a ellos/Uds.',en:'to them/you all',  example:'Les gusta bailar.' },
  ],
};

/* ════════════════════════════════════════════════════════════════════════════
   SUB-LESSON 10-2 — Verbs Like Gustar
   ════════════════════════════════════════════════════════════════════════════ */

const SUBLESSON_10_2 = {
  id: '10-2',
  chapterId: 10,
  title: 'Verbs Like Gustar',
  subtitle: 'encantar · fascinar · interesar · molestar · doler · quedar…',

  rules: [
    {
      id: 'r1',
      heading: 'All these verbs work exactly like gustar',
      body: 'Every verb in this group uses the same structure: indirect object pronoun + verb (agreeing with subject) + subject. Learn the meaning of each verb and apply the gustar pattern.',
      examples: [
        { es: 'Le encanta viajar.',              en: 'He loves to travel. (Travel is enchanting to him.)' },
        { es: 'Nos fascina el baile flamenco.',  en: 'Flamenco dance fascinates us.' },
        { es: 'Me duele la cabeza.',             en: 'My head hurts. (The head hurts me.)' },
        { es: 'Nos quedan veinte minutos.',      en: 'We have 20 minutes left.' },
      ],
      tip: 'Encantar is stronger than gustar and cannot be used in the negative. Parecer, importar, and faltar can be used without an indirect object pronoun.',
    },
  ],

  verbs: [
    { es:'agradar',     en:'to be pleasing to (≈ gustar)',  ex:'Me agrada vivir en el campo.',         exEn:'To live in the country is pleasing to me.' },
    { es:'convenir',    en:'to suit / to be convenient for', ex:'¿Te conviene tomar ese trabajo?',      exEn:'Does it suit you to take that job?' },
    { es:'doler',       en:'to hurt / to be painful to',    ex:'Me duele la cabeza.',                  exEn:'My head hurts me.' },
    { es:'encantar',    en:'to love / to be enchanting to', ex:'Le encanta viajar.',                   exEn:'He loves to travel.' },
    { es:'faltar',      en:'to be lacking / to be missing', ex:'A ellos les falta disciplina.',        exEn:'They lack discipline.' },
    { es:'fascinar',    en:'to fascinate / to be fascinating to', ex:'Nos fascina el baile flamenco.', exEn:'Flamenco dance fascinates us.' },
    { es:'hacer falta', en:'to need (something)',           ex:'Me hace falta tomar vacaciones.',      exEn:'I need to take a vacation.' },
    { es:'importar',    en:'to matter / to be important to',ex:'No me importa.',                      exEn:'It doesn\'t matter to me.' },
    { es:'interesar',   en:'to interest / to be interesting to', ex:'Les interesa estudiar.',         exEn:'It interests them to study.' },
    { es:'molestar',    en:'to bother / to annoy',          ex:'¿Le molesta si alguien fuma?',        exEn:'Does it bother you if someone smokes?' },
    { es:'parecer',     en:'to seem / to appear to be',     ex:'Me parece que es una buena escuela.',  exEn:'It seems to me that it is a good school.' },
    { es:'quedar',      en:'to be left over / to remain',   ex:'Nos quedan veinte minutos.',          exEn:'We have 20 minutes left.' },
    { es:'sobrar',      en:'to have more than enough of',   ex:'Me sobra comida para mañana.',        exEn:'I have more than enough food for tomorrow.' },
    { es:'tocarle',     en:'to be someone\'s turn',         ex:'Cada vez que me toca a mí, gano.',    exEn:'Every time it\'s my turn, I win.' },
  ],

  sentenceCompletionDrills: [
    { sentence:'Le ___ viajar.',                  answer:'encanta',  choices:['encanta','encantan','gusta','fascina'],   fills:['encanta'],  en:'He loves to travel.',                 rule:'encantar — viajar (infinitive) → singular form' },
    { sentence:'Nos ___ el baile flamenco.',      answer:'fascina',  choices:['fascina','fascinan','gusta','encanta'],   fills:['fascina'],  en:'Flamenco dance fascinates us.',        rule:'fascinar — el baile is singular' },
    { sentence:'Me ___ la cabeza.',               answer:'duele',    choices:['duele','duelen','gusta','molesta'],       fills:['duele'],    en:'My head hurts.',                       rule:'doler — la cabeza is singular' },
    { sentence:'Te ___ los dientes.',             answer:'duelen',   choices:['duele','duelen','molestan','faltan'],     fills:['duelen'],   en:'Your teeth hurt.',                     rule:'doler — los dientes is plural → duelen' },
    { sentence:'Nos ___ veinte minutos.',         answer:'quedan',   choices:['quedan','queda','sobran','faltan'],       fills:['quedan'],   en:'We have 20 minutes left.',             rule:'quedar — veinte minutos is plural → quedan' },
    { sentence:'No me ___.',                      answer:'importa',  choices:['importa','importan','molesta','parece'],  fills:['importa'],  en:'It doesn\'t matter to me.',            rule:'importar — no subject → singular importa' },
    { sentence:'Me ___ que es una buena escuela.',answer:'parece',   choices:['parece','parecen','importa','interesa'], fills:['parece'],   en:'It seems to me it\'s a good school.',  rule:'parecer — que clause → singular parece' },
    { sentence:'A ellos les ___ disciplina.',     answer:'falta',    choices:['falta','faltan','sobra','queda'],         fills:['falta'],    en:'They lack discipline.',                rule:'faltar — disciplina is singular → falta' },
    { sentence:'Me ___ ir a museos.',             answer:'interesa', choices:['interesa','interesan','encanta','agrada'],fills:['interesa'], en:'It interests me to go to museums.',    rule:'interesar — ir (infinitive) → singular' },
    { sentence:'¿Le ___ si alguien fuma?',        answer:'molesta',  choices:['molesta','molestan','duele','importa'],   fills:['molesta'],  en:'Does it bother you if someone smokes?',rule:'molestar — si clause → singular molesta' },
  ],
};

/* ════════════════════════════════════════════════════════════════════════════
   SUB-LESSON 10-3 — Indirect Object with Action Verbs
   ════════════════════════════════════════════════════════════════════════════ */

const SUBLESSON_10_3 = {
  id: '10-3',
  chapterId: 10,
  title: 'Indirect Object with Action Verbs',
  subtitle: 'dar · decir · escribir · enseñar · prestar · traer · vender…',

  rules: [
    {
      id: 'r1',
      heading: 'Indirect object answers "to whom?" or "for whom?"',
      body: 'With action verbs, the indirect object pronoun tells us to whom or for whom the action is done. The pronoun goes before the conjugated verb.',
      examples: [
        { es: 'Carlos me escribe una carta.',   en: 'Carlos writes a letter to me.' },
        { es: 'Yo le escribo una carta.',       en: 'I write a letter to him/her/you.' },
        { es: 'Él me compra flores.',           en: 'He buys flowers for me.' },
        { es: 'Te hago un favor.',              en: 'I do you a favor.' },
      ],
      tip: 'Le is ambiguous — add a clarifying phrase: le escribo a él, le escribo a Ud., le escribo a Ana.',
    },
    {
      id: 'r2',
      heading: 'Le and les ambiguity — clarifying phrases',
      body: 'Le means "to him," "to her," or "to you (formal)." Les means "to them" or "to you all." Always clarify when context is unclear.',
      examples: [
        { es: 'María le escribe a Ud.',        en: 'María writes to you.' },
        { es: 'María le escribe a él.',        en: 'María writes to him.' },
        { es: 'Juan les escribe a ellas.',     en: 'Juan writes to them (f.).' },
        { es: 'Él les escribe a sus hermanos.',en: 'He writes to his brothers.' },
      ],
    },
  ],

  verbs: [
    { infinitive:'cobrar',    en:'to charge (money)',        type:'ar',
      forms:{ yo:'cobro',    tu:'cobras',    el:'cobra',    nos:'cobramos',   vos:'cobráis',   ellos:'cobran'    },
      ex:'El taxista me cobra veinte dólares.',      exEn:'The taxi driver charges me twenty dollars.' },
    { infinitive:'comprar',   en:'to buy (for)',             type:'ar',
      forms:{ yo:'compro',   tu:'compras',   el:'compra',   nos:'compramos',  vos:'compráis',  ellos:'compran'   },
      ex:'Él me compra flores.',                     exEn:'He buys flowers for me.' },
    { infinitive:'contar',    en:'to tell (a story) / count',type:'ar',
      forms:{ yo:'cuento',   tu:'cuentas',   el:'cuenta',   nos:'contamos',   vos:'contáis',   ellos:'cuentan'   },
      ex:'Ellos nos quieren contar un cuento.',      exEn:'They want to tell us a story.' },
    { infinitive:'contestar', en:'to answer',                type:'ar',
      forms:{ yo:'contesto', tu:'contestas', el:'contesta', nos:'contestamos',vos:'contestáis',ellos:'contestan' },
      ex:'Ella me contesta las preguntas.',          exEn:'She answers my questions.' },
    { infinitive:'dar',       en:'to give',                  type:'ar',
      forms:{ yo:'doy',      tu:'das',       el:'da',       nos:'damos',      vos:'dais',      ellos:'dan'       },
      ex:'Carlos me da la lección de hoy.',          exEn:'Carlos gives me today\'s lesson.' },
    { infinitive:'decir',     en:'to say / to tell',         type:'ir',
      forms:{ yo:'digo',     tu:'dices',     el:'dice',     nos:'decimos',    vos:'decís',     ellos:'dicen'     },
      ex:'Él me dice que su hermana vive en Nueva York.', exEn:'He tells me his sister lives in New York.' },
    { infinitive:'enseñar',   en:'to teach',                 type:'ar',
      forms:{ yo:'enseño',   tu:'enseñas',   el:'enseña',   nos:'enseñamos',  vos:'enseñáis',  ellos:'enseñan'   },
      ex:'Nosotros les enseñamos a hablar español.', exEn:'We teach them to speak Spanish.' },
    { infinitive:'enviar',    en:'to send',                  type:'ar',
      forms:{ yo:'envío',    tu:'envías',    el:'envía',    nos:'enviamos',   vos:'enviáis',   ellos:'envían'    },
      ex:'José y María nos envían tarjetas desde Barcelona.', exEn:'José and María send us cards from Barcelona.' },
    { infinitive:'hacer',     en:'to do / to make (for)',    type:'er',
      forms:{ yo:'hago',     tu:'haces',     el:'hace',     nos:'hacemos',    vos:'hacéis',    ellos:'hacen'     },
      ex:'Te hago un favor.',                        exEn:'I do you a favor.' },
    { infinitive:'preguntar', en:'to ask (a question)',      type:'ar',
      forms:{ yo:'pregunto', tu:'preguntas', el:'pregunta', nos:'preguntamos',vos:'preguntáis',ellos:'preguntan' },
      ex:'Yo te pregunto si mi tarea está en tu casa.',exEn:'I ask you if my homework is at your house.' },
    { infinitive:'prestar',   en:'to lend',                  type:'ar',
      forms:{ yo:'presto',   tu:'prestas',   el:'presta',   nos:'prestamos',  vos:'prestáis',  ellos:'prestan'   },
      ex:'Tú me prestas tus libros todo el tiempo.',  exEn:'You lend me your books all the time.' },
    { infinitive:'traer',     en:'to bring',                 type:'er',
      forms:{ yo:'traigo',   tu:'traes',     el:'trae',     nos:'traemos',    vos:'traéis',    ellos:'traen'     },
      ex:'El camarero le trae al hombre un vaso de agua.', exEn:'The waiter brings the man a glass of water.' },
    { infinitive:'vender',    en:'to sell',                  type:'er',
      forms:{ yo:'vendo',    tu:'vendes',    el:'vende',    nos:'vendemos',   vos:'vendéis',   ellos:'venden'    },
      ex:'Yo te quiero vender mi computadora vieja.', exEn:'I want to sell you my old computer.' },
    { infinitive:'escribir',  en:'to write (to)',            type:'ir',
      forms:{ yo:'escribo',  tu:'escribes',  el:'escribe',  nos:'escribimos', vos:'escribís',  ellos:'escriben'  },
      ex:'Julia me escribe dos tarjetas cada semana.', exEn:'Julia writes me two cards each week.' },
  ],

  sentenceCompletionDrills: [
    { sentence:'Carlos ___ escribe una carta.',   answer:'me',   choices:['me','te','le','les'],   fills:['me'],   en:'Carlos writes a letter to me.',         rule:'me = to me (indirect object)' },
    { sentence:'Yo ___ escribo una carta.',       answer:'le',   choices:['me','te','le','les'],   fills:['le'],   en:'I write a letter to him/her/you.',       rule:'le = to him/her/Ud. (add clarifier to specify)' },
    { sentence:'Él ___ compra flores.',           answer:'me',   choices:['me','te','le','les'],   fills:['me'],   en:'He buys flowers for me.',               rule:'comprar with IOP = to buy for someone' },
    { sentence:'___ hago un favor.',              answer:'Te',   choices:['Me','Te','Le','Les'],   fills:['Te'],   en:'I do you a favor.',                     rule:'te = for you (hacer with IOP = to do for someone)' },
    { sentence:'El camarero ___ trae agua.',      answer:'le',   choices:['me','te','le','nos'],   fills:['le'],   en:'The waiter brings him water.',           rule:'le = to him (single person)' },
    { sentence:'Nosotros ___ enviamos tarjetas.', answer:'les',  choices:['me','te','le','les'],   fills:['les'],  en:'We send them cards.',                   rule:'les = to them (plural)' },
    { sentence:'¿Quién ___ enseña las lecciones?',answer:'nos',  choices:['me','te','le','nos'],   fills:['nos'],  en:'Who teaches us the lessons?',           rule:'nos = to us' },
    { sentence:'Tú ___ prestas libros.',          answer:'me',   choices:['me','te','le','les'],   fills:['me'],   en:'You lend me books.',                    rule:'me = to me' },
  ],
};

/* ════════════════════════════════════════════════════════════════════════════
   SUB-LESSON 10-4 — Pronoun Placement Drill
   ════════════════════════════════════════════════════════════════════════════ */

const SUBLESSON_10_4 = {
  id: '10-4',
  chapterId: 10,
  title: 'Pronoun Placement',
  subtitle: 'Before the verb · Attached to the infinitive · Two-verb constructions',

  rules: [
    {
      id: 'r1',
      heading: 'Two valid positions — same meaning',
      body: 'The indirect object pronoun can go directly before the first verb OR attached to the end of the infinitive. Both positions are correct and mean exactly the same thing.',
      examples: [
        { es: 'Yo te quiero escribir una carta.',  en: 'I want to write you a letter.', note: 'pronoun before first verb' },
        { es: 'Yo quiero escribirte una carta.',   en: 'I want to write you a letter.', note: 'pronoun attached to infinitive' },
        { es: 'Él me va a vender un carro.',       en: 'He is going to sell me a car.', note: 'pronoun before ir' },
        { es: 'Él va a venderme un carro.',        en: 'He is going to sell me a car.', note: 'pronoun attached to vender' },
      ],
      tip: 'With ir + a + infinitive, the pronoun can go before ir OR attach to the infinitive — never between ir and a.',
    },
  ],

  placementDrills: [
    /* Each drill has the sentence with pronoun before verb AND attached to infinitive */
    {
      beforeVerb:    'Juan me quiere dar una lámpara.',
      attached:      'Juan quiere darme una lámpara.',
      en:            'Juan wants to give me a lamp.',
      pronoun: 'me', verb: 'dar',
    },
    {
      beforeVerb:    'Él me va a vender un carro.',
      attached:      'Él va a venderme un carro.',
      en:            'He is going to sell me a car.',
      pronoun: 'me', verb: 'vender',
    },
    {
      beforeVerb:    'Ellos nos quieren contar un cuento.',
      attached:      'Ellos quieren contarnos un cuento.',
      en:            'They want to tell us a story.',
      pronoun: 'nos', verb: 'contar',
    },
    {
      beforeVerb:    'Les debemos decir a Uds. la verdad.',
      attached:      'Debemos decirles a Uds. la verdad.',
      en:            'We ought to tell you the truth.',
      pronoun: 'les', verb: 'decir',
    },
    {
      beforeVerb:    'Te puedo traer una chaqueta.',
      attached:      'Puedo traerte una chaqueta.',
      en:            'I can bring you a jacket.',
      pronoun: 'te', verb: 'traer',
    },
    {
      beforeVerb:    'Mis primos me van a comprar un carro.',
      attached:      'Mis primos van a comprarme un carro.',
      en:            'My cousins are going to buy me a car.',
      pronoun: 'me', verb: 'comprar',
    },
  ],

  sentenceCompletionDrills: [
    { sentence:'Juan ___ quiere dar una lámpara.',          answer:'me',    choices:['me','te','le','nos'],    fills:['me'],    en:'Juan wants to give me a lamp.',         rule:'pronoun before first verb' },
    { sentence:'Juan quiere dar___ una lámpara.',           answer:'me',    choices:['me','te','le','nos'],    fills:['me'],    en:'Juan wants to give me a lamp.',         rule:'pronoun attached to infinitive' },
    { sentence:'Él ___ va a vender un carro.',              answer:'me',    choices:['me','te','le','les'],    fills:['me'],    en:'He is going to sell me a car.',         rule:'pronoun before ir in ir + a + inf' },
    { sentence:'Él va a vender___ un carro.',               answer:'me',    choices:['me','te','le','les'],    fills:['me'],    en:'He is going to sell me a car.',         rule:'pronoun attached to infinitive' },
    { sentence:'Ellos ___ quieren contar un cuento.',       answer:'nos',   choices:['me','te','nos','les'],   fills:['nos'],   en:'They want to tell us a story.',         rule:'nos = to us' },
    { sentence:'Ellos quieren contar___ un cuento.',        answer:'nos',   choices:['me','te','nos','les'],   fills:['nos'],   en:'They want to tell us a story.',         rule:'pronoun attached to infinitive' },
    { sentence:'___ debemos decir la verdad.',              answer:'Les',   choices:['Me','Te','Le','Les'],    fills:['Les'],   en:'We ought to tell you (all) the truth.', rule:'les = to you all / to them' },
    { sentence:'Debemos decir___ la verdad.',               answer:'les',   choices:['me','te','le','les'],    fills:['les'],   en:'We ought to tell you (all) the truth.', rule:'pronoun attached to decir' },
  ],
};

/* ════════════════════════════════════════════════════════════════════════════
   Chapter 10 export
   ════════════════════════════════════════════════════════════════════════════ */

const CHAPTER_10 = {
  id: 10,
  title: 'The Indirect Object',
  unlocked: false,
  sublessons: [SUBLESSON_10_1, SUBLESSON_10_2, SUBLESSON_10_3, SUBLESSON_10_4],
};

export default CHAPTER_10;
export { SUBLESSON_10_1, SUBLESSON_10_2, SUBLESSON_10_3, SUBLESSON_10_4 };
