/* ─── Fluir · Chapter 11 Data ───────────────────────────────────────────────
   Source: Complete Spanish Step-by-Step, Bregstein (McGraw-Hill)
   Chapter 11: The Direct Object
   4 sub-lessons (Option A):
     11-1  The personal a
     11-2  Direct object pronouns — forms, placement, negation
     11-3  DOP replacing persons vs things — lo/la/los/las in context
     11-4  Transitive verbs — full set + conjugation + DOP drill
   ─────────────────────────────────────────────────────────────────────────── */

/* ════════════════════════════════════════════════════════════════════════════
   SUB-LESSON 11-1 — The Personal A
   ════════════════════════════════════════════════════════════════════════════ */

const SUBLESSON_11_1 = {
  id: '11-1',
  chapterId: 11,
  title: 'The Personal A',
  subtitle: 'Yo veo a la mujer · Visito al hombre · No with tener',

  rules: [
    {
      id: 'r1',
      heading: 'Use personal a before direct object persons',
      body: 'When the direct object of a verb is a person, place the untranslated word a directly before it. This is called the personal a. It has no English translation.',
      examples: [
        { es: 'Yo veo a la mujer.',      en: 'I see the woman.', note: 'person → personal a required' },
        { es: 'Vemos a Pedro.',          en: 'We see Peter.', note: 'proper name → personal a' },
        { es: 'Uds. ven a sus primos.',  en: 'You see your cousins.' },
        { es: 'Yo veo el árbol.',        en: 'I see the tree.', note: 'thing → NO personal a' },
      ],
      tip: 'When a + el combine before a masculine singular noun, they contract to al: visito al hombre, no visito a el hombre.',
    },
    {
      id: 'r2',
      heading: 'a + el = al · Used with alguien/nadie · NOT with tener',
      body: 'The personal a combines with el to form al. It is required before alguien and nadie. It is never used with tener even when the object is a person.',
      examples: [
        { es: 'Yo visito al hombre.',         en: 'I visit the man.', note: 'a + el = al' },
        { es: 'Tú visitas al niño.',          en: 'You visit the child.' },
        { es: '¿Quieres llamar a alguien?',   en: 'Do you want to call someone?' },
        { es: 'No puedo llamar a nadie.',     en: 'I can\'t call anyone.' },
        { es: 'Tengo dos hermanas.',          en: 'I have two sisters.', note: 'tener → NO personal a' },
      ],
    },
  ],

  sentenceCompletionDrills: [
    { sentence:'Yo veo ___ la mujer.',              answer:'a',    choices:['a','al','—','de'],         fills:['a'],    en:'I see the woman.',                    rule:'personal a before a person (feminine)' },
    { sentence:'Vemos ___ Pedro.',                  answer:'a',    choices:['a','al','—','para'],        fills:['a'],    en:'We see Peter.',                       rule:'personal a before a proper name' },
    { sentence:'Yo visito ___ hombre.',             answer:'al',   choices:['a','al','a el','—'],        fills:['al'],   en:'I visit the man.',                    rule:'a + el = al (masculine singular)' },
    { sentence:'Tú visitas ___ niño.',              answer:'al',   choices:['a','al','a la','—'],        fills:['al'],   en:'You visit the child.',                rule:'a + el = al' },
    { sentence:'Queremos ver ___ película hoy.',    answer:'—',    choices:['a','al','—','para'],        fills:['—'],    en:'We want to see a film today.',         rule:'thing (película) → NO personal a' },
    { sentence:'Él espera ___ tren en la estación.',answer:'—',    choices:['a','al','—','para'],        fills:['—'],    en:'He waits for the train at the station.',rule:'thing (tren) → NO personal a' },
    { sentence:'¿Quieres llamar ___ alguien?',      answer:'a',    choices:['a','al','—','para'],        fills:['a'],    en:'Do you want to call someone?',         rule:'personal a required before alguien' },
    { sentence:'No puedo llamar ___ nadie.',        answer:'a',    choices:['a','al','—','para'],        fills:['a'],    en:'I can\'t call anyone.',                rule:'personal a required before nadie' },
    { sentence:'Tengo ___ dos hermanas.',           answer:'—',    choices:['a','—','al','para'],        fills:['—'],    en:'I have two sisters.',                  rule:'tener never takes personal a' },
    { sentence:'Ella busca ___ sus llaves.',        answer:'—',    choices:['a','—','al','para'],        fills:['—'],    en:'She looks for her keys.',              rule:'thing (llaves) → NO personal a' },
    { sentence:'Ella busca ___ su hermano.',        answer:'a',    choices:['a','—','al','para'],        fills:['a'],    en:'She looks for her brother.',           rule:'person → personal a required' },
    { sentence:'Los estudiantes escuchan ___ profesor.', answer:'al', choices:['a','al','—','para'],    fills:['al'],   en:'The students listen to the teacher.',  rule:'a + el profesor = al profesor' },
  ],
};

/* ════════════════════════════════════════════════════════════════════════════
   SUB-LESSON 11-2 — Direct Object Pronouns
   ════════════════════════════════════════════════════════════════════════════ */

const SUBLESSON_11_2 = {
  id: '11-2',
  chapterId: 11,
  title: 'Direct Object Pronouns',
  subtitle: 'me · te · lo/la · nos · los/las',

  rules: [
    {
      id: 'r1',
      heading: 'The direct object pronoun table',
      body: 'Me, te, nos, and os are shared with indirect object pronouns. The new forms are lo, la, los, las — these replace the direct object.',
      examples: [
        { es: 'me — me',         en: 'me (first person singular)' },
        { es: 'te — you',        en: 'you (familiar singular)' },
        { es: 'lo — him / it (m.)', en: 'him or it (masculine object)' },
        { es: 'la — her / it (f.)', en: 'her or it (feminine object)' },
        { es: 'nos — us',        en: 'us (first person plural)' },
        { es: 'los — them (m.)', en: 'them (masculine or mixed)' },
        { es: 'las — them (f.)', en: 'them (feminine)' },
      ],
    },
    {
      id: 'r2',
      heading: 'Two positions — same meaning',
      body: 'Like indirect object pronouns, the direct object pronoun goes before the conjugated verb OR attaches to the infinitive. Both are correct.',
      examples: [
        { es: 'Ella me conoce bien.',        en: 'She knows me well.', note: 'before verb' },
        { es: 'Ella quiere visitarme.',      en: 'She wants to visit me.', note: 'attached to infinitive' },
        { es: 'Debo llamarlo ahora.',        en: 'I ought to call him now.' },
        { es: 'Vamos a extrañarlos mucho.', en: 'We are going to miss them a lot.' },
      ],
    },
    {
      id: 'r3',
      heading: 'Negation — no before the pronoun',
      body: 'To negate, place no directly before the direct object pronoun (which is before the verb). When the pronoun is attached to the infinitive, no goes before the first verb.',
      examples: [
        { es: 'No lo veo.',              en: 'I don\'t see him.', note: 'no before pronoun+verb' },
        { es: 'Ella no me conoce.',      en: 'She doesn\'t know me.' },
        { es: 'No quiero escucharlo.',   en: 'I don\'t want to listen to him.', note: 'no before first verb when attached to inf.' },
        { es: 'No queremos buscarla.',   en: 'We don\'t want to look for her.' },
      ],
    },
  ],

  pronounTable: [
    { pronoun:'me',  en:'me',           example:'Ella me conoce bien.' },
    { pronoun:'te',  en:'you (familiar)',example:'Los niños te van a escuchar.' },
    { pronoun:'lo',  en:'him / it (m.)', example:'Debo llamarlo ahora.' },
    { pronoun:'la',  en:'her / it (f.)', example:'¿Quién quiere ayudarla?' },
    { pronoun:'nos', en:'us',            example:'Ellas nos saludan los lunes.' },
    { pronoun:'los', en:'them (m.)',     example:'Vamos a extrañarlos mucho.' },
    { pronoun:'las', en:'them (f.)',     example:'Yo las debo acompañar al tren.' },
  ],

  sentenceCompletionDrills: [
    { sentence:'Ella ___ conoce bien.',              answer:'me',   choices:['me','te','lo','la'],    fills:['me'],   en:'She knows me well.',                   rule:'me = direct object (me, first person)' },
    { sentence:'Los niños ___ van a escuchar.',      answer:'te',   choices:['me','te','lo','nos'],   fills:['te'],   en:'The children are going to listen to you.',rule:'te = you (familiar, direct object)' },
    { sentence:'Debo llamar___ ahora.',              answer:'lo',   choices:['lo','la','me','los'],   fills:['lo'],   en:'I ought to call him now.',              rule:'lo = him (attached to infinitive)' },
    { sentence:'¿Quién quiere ayudar___?',           answer:'la',   choices:['lo','la','las','nos'],  fills:['la'],   en:'Who wants to help her?',               rule:'la = her (attached to infinitive)' },
    { sentence:'¿Puedes esperar___?',                answer:'nos',  choices:['me','nos','los','las'], fills:['nos'],  en:'Can you wait for us?',                 rule:'nos = us (direct object)' },
    { sentence:'Vamos a extrañar___ mucho.',         answer:'los',  choices:['lo','los','las','nos'], fills:['los'],  en:'We are going to miss them a lot.',      rule:'los = them (masculine/mixed)' },
    { sentence:'No ___ veo.',                        answer:'lo',   choices:['lo','la','me','los'],   fills:['lo'],   en:'I don\'t see him.',                    rule:'no before pronoun+verb' },
    { sentence:'Ella no ___ conoce.',                answer:'me',   choices:['me','te','lo','nos'],   fills:['me'],   en:'She doesn\'t know me.',                rule:'no before direct object pronoun' },
    { sentence:'No quiero escuchar___.',             answer:'lo',   choices:['lo','la','me','nos'],   fills:['lo'],   en:'I don\'t want to listen to him.',      rule:'no before first verb; pronoun attaches to inf.' },
    { sentence:'No queremos buscar___.',             answer:'la',   choices:['lo','la','nos','las'],  fills:['la'],   en:'We don\'t want to look for her.',      rule:'la = her (feminine person/object)' },
  ],
};

/* ════════════════════════════════════════════════════════════════════════════
   SUB-LESSON 11-3 — DOP Replacing Persons vs Things
   ════════════════════════════════════════════════════════════════════════════ */

const SUBLESSON_11_3 = {
  id: '11-3',
  chapterId: 11,
  title: 'DOP Replacing Persons and Things',
  subtitle: 'lo/la/los/las for people · lo/la/los/las for things · le/les for Ud./Uds.',

  rules: [
    {
      id: 'r1',
      heading: 'lo/la/los/las replacing persons',
      body: 'When replacing a person, lo = him, la = her, los = them (m./mixed), las = them (f.). No clarifier needed — the pronoun is unambiguous.',
      examples: [
        { es: 'María lo ama.',           en: 'Mary loves him.' },
        { es: 'Jorge la besa.',          en: 'George kisses her.' },
        { es: 'Los conozco de México.',  en: 'I know them from Mexico.' },
        { es: 'Yo las debo acompañar.',  en: 'I ought to accompany them.' },
      ],
    },
    {
      id: 'r2',
      heading: 'lo/la/los/las replacing things',
      body: 'The same pronouns replace inanimate objects, matching in gender and number with the noun replaced.',
      examples: [
        { es: 'Guillermo compra el carro. → Él lo compra.',  en: 'Bill buys the car. → He buys it.', note: 'el carro → lo (masc. sing.)' },
        { es: 'Ella vende la casa. → Ella la vende.',         en: 'She sells the house. → She sells it.', note: 'la casa → la (fem. sing.)' },
        { es: 'Leo los libros. → Los leo.',                   en: 'I read the books. → I read them.', note: 'los libros → los (masc. pl.)' },
        { es: 'Busco las llaves. → Las busco.',               en: 'I look for the keys. → I look for them.', note: 'las llaves → las (fem. pl.)' },
      ],
    },
    {
      id: 'r3',
      heading: 'Le/les for you (Ud./Uds.)',
      body: 'To express the direct object "you" in the formal Ud. or Uds. form, use le (singular) or les (plural) rather than lo/la/los/las.',
      examples: [
        { es: 'Yo le conozco, ¿verdad?',      en: 'I know you, right? (Ud.)' },
        { es: '¿Puedo ayudarle?',             en: 'May I help you? (Ud.)' },
        { es: 'Les acompañamos al parque.',   en: 'We accompany you (Uds.) to the park.' },
      ],
    },
  ],

  sentenceCompletionDrills: [
    /* Persons */
    { sentence:'María ___ ama.',                       answer:'lo',   choices:['lo','la','los','las'],  fills:['lo'],   en:'Mary loves him.',                      rule:'lo = him (masculine person)' },
    { sentence:'Jorge ___ besa.',                      answer:'la',   choices:['lo','la','los','las'],  fills:['la'],   en:'George kisses her.',                   rule:'la = her (feminine person)' },
    { sentence:'___ conozco de mi viaje a México.',    answer:'Los',  choices:['Lo','La','Los','Las'],  fills:['Los'],  en:'I know them (m.) from my trip to Mexico.',rule:'los = them (masculine/mixed)' },
    { sentence:'Yo ___ debo acompañar al tren.',       answer:'las',  choices:['lo','la','los','las'],  fills:['las'],  en:'I ought to accompany them (f.) to the train.',rule:'las = them (feminine)' },
    /* Things */
    { sentence:'Guillermo compra el carro. Él ___ compra.', answer:'lo', choices:['lo','la','los','las'], fills:['lo'], en:'Bill buys it. (el carro → lo)',        rule:'lo — el carro is masculine singular' },
    { sentence:'Ella vende la casa. Ella ___ vende.',  answer:'la',   choices:['lo','la','los','las'],  fills:['la'],   en:'She sells it. (la casa → la)',          rule:'la — la casa is feminine singular' },
    { sentence:'Leo los libros. ___ leo.',             answer:'Los',  choices:['Lo','La','Los','Las'],  fills:['Los'],  en:'I read them. (los libros → los)',       rule:'los — plural masculine' },
    { sentence:'Busco las llaves. ___ busco.',         answer:'Las',  choices:['Lo','La','Los','Las'],  fills:['Las'],  en:'I look for them. (las llaves → las)',   rule:'las — plural feminine' },
    /* Ud./Uds. */
    { sentence:'Yo ___ conozco, ¿verdad? (a Ud.)',     answer:'le',   choices:['lo','la','le','les'],   fills:['le'],   en:'I know you (Ud.), right?',             rule:'le = direct object for Ud.' },
    { sentence:'___ acompañamos al parque. (a Uds.)',  answer:'Les',  choices:['Los','Las','Le','Les'],  fills:['Les'],  en:'We accompany you (Uds.) to the park.',  rule:'les = direct object for Uds.' },
  ],
};

/* ════════════════════════════════════════════════════════════════════════════
   SUB-LESSON 11-4 — Transitive Verbs
   ════════════════════════════════════════════════════════════════════════════ */

const SUBLESSON_11_4 = {
  id: '11-4',
  chapterId: 11,
  title: 'Transitive Verbs',
  subtitle: 'abrazar · buscar · conocer · esperar · extrañar · ver…',

  rules: [
    {
      id: 'r1',
      heading: 'Transitive verbs take a direct object directly — no preposition',
      body: 'Many Spanish transitive verbs translate to English with a preposition (listen TO, look AT, wait FOR). In Spanish, the verb takes its object directly with no preposition between them.',
      examples: [
        { es: 'Yo escucho la música.',  en: 'I listen to the music.', note: 'escuchar — no "a" needed' },
        { es: 'Ella mira la casa.',     en: 'She looks at the house.' },
        { es: 'Esperamos el tren.',     en: 'We wait for the train.' },
        { es: 'Busco mis llaves.',      en: 'I look for my keys.' },
      ],
    },
    {
      id: 'r2',
      heading: 'Conocer vs saber — two ways to know',
      body: 'Conocer means to know a person or place (be acquainted with). Saber means to know a fact or know how to do something. Both are common and easily confused.',
      examples: [
        { es: 'Yo conozco a esta mujer.',  en: 'I know (am acquainted with) this woman.' },
        { es: 'Él conoce París.',          en: 'He knows Paris.' },
        { es: 'Ella sabe la verdad.',      en: 'She knows the truth.' },
        { es: 'Yo sé nadar.',             en: 'I know how to swim.' },
      ],
    },
    {
      id: 'r3',
      heading: 'Querer vs amar — two ways to love',
      body: 'Querer a una persona means to love a person (less strong). Amar expresses deeper, more profound love.',
      examples: [
        { es: 'Ella quiere a su amiga.',  en: 'She loves her friend. (affection)' },
        { es: 'Él ama a su esposa.',      en: 'He (deeply) loves his wife.' },
      ],
      tip: 'Dejar means to leave something or someone behind. Salir means to exit or leave a place. They are not interchangeable.',
    },
  ],

  verbs: [
    { infinitive:'abrazar',    en:'to hug / to embrace',           stem:'abraz',  type:'ar',
      forms:{ yo:'abrazo',     tu:'abrazas',    el:'abraza',    nos:'abrazamos',  vos:'abrazáis',  ellos:'abrazan'    },
      ex:'Ella abraza a su madre antes de salir.', exEn:'She hugs her mother before leaving.' },
    { infinitive:'acompañar',  en:'to accompany',                  stem:'acompañ',type:'ar',
      forms:{ yo:'acompaño',   tu:'acompañas',  el:'acompaña',  nos:'acompañamos',vos:'acompañáis',ellos:'acompañan'  },
      ex:'Yo siempre acompaño a mi abuela a la tienda.', exEn:'I always accompany my grandmother to the store.' },
    { infinitive:'amar',       en:'to love (deeply)',              stem:'am',     type:'ar',
      forms:{ yo:'amo',        tu:'amas',        el:'ama',       nos:'amamos',     vos:'amáis',     ellos:'aman'       },
      ex:'Él ama a su esposa profundamente.', exEn:'He deeply loves his wife.' },
    { infinitive:'ayudar',     en:'to help',                       stem:'ayud',   type:'ar',
      forms:{ yo:'ayudo',      tu:'ayudas',      el:'ayuda',     nos:'ayudamos',   vos:'ayudáis',   ellos:'ayudan'     },
      ex:'María y Sofía quieren ayudar a los pacientes.', exEn:'María and Sofía want to help the patients.' },
    { infinitive:'besar',      en:'to kiss',                       stem:'bes',    type:'ar',
      forms:{ yo:'beso',       tu:'besas',       el:'besa',      nos:'besamos',    vos:'besáis',    ellos:'besan'      },
      ex:'Carlos besa a su familia antes de salir.', exEn:'Carlos kisses his family before leaving.' },
    { infinitive:'buscar',     en:'to look for',                   stem:'busc',   type:'ar',
      forms:{ yo:'busco',      tu:'buscas',      el:'busca',     nos:'buscamos',   vos:'buscáis',   ellos:'buscan'     },
      ex:'No puedo encontrar a mi hermano. Lo busco.',  exEn:'I can\'t find my brother. I\'m looking for him.' },
    { infinitive:'conocer',    en:'to know (a person/place)',      stem:'conoc',  type:'er',
      forms:{ yo:'conozco',    tu:'conoces',     el:'conoce',    nos:'conocemos',  vos:'conocéis',  ellos:'conocen'    },
      ex:'Yo conozco a esta mujer muy bien.', exEn:'I know this woman very well.' },
    { infinitive:'cuidar',     en:'to take care of',               stem:'cuid',   type:'ar',
      forms:{ yo:'cuido',      tu:'cuidas',      el:'cuida',     nos:'cuidamos',   vos:'cuidáis',   ellos:'cuidan'     },
      ex:'Los padres cuidan a sus hijos.', exEn:'The parents take care of their children.' },
    { infinitive:'dejar',      en:'to leave (something) behind',   stem:'dej',    type:'ar',
      forms:{ yo:'dejo',       tu:'dejas',       el:'deja',      nos:'dejamos',    vos:'dejáis',    ellos:'dejan'      },
      ex:'Dejo mis llaves en mi casa.',    exEn:'I leave my keys in my house.' },
    { infinitive:'esperar',    en:'to wait for / to hope',         stem:'esper',  type:'ar',
      forms:{ yo:'espero',     tu:'esperas',     el:'espera',    nos:'esperamos',  vos:'esperáis',  ellos:'esperan'    },
      ex:'Él espera el tren en la estación.', exEn:'He waits for the train at the station.' },
    { infinitive:'extrañar',   en:'to miss (a person/place)',      stem:'extrañ', type:'ar',
      forms:{ yo:'extraño',    tu:'extrañas',    el:'extraña',   nos:'extrañamos', vos:'extrañáis', ellos:'extrañan'   },
      ex:'El estudiante extraña a su familia.', exEn:'The student misses his family.' },
    { infinitive:'gritar',     en:'to yell at / to scream at',     stem:'grit',   type:'ar',
      forms:{ yo:'grito',      tu:'gritas',      el:'grita',     nos:'gritamos',   vos:'gritáis',   ellos:'gritan'     },
      ex:'No sé por qué él grita a su jefe.', exEn:'I don\'t know why he yells at his boss.' },
    { infinitive:'hallar',     en:'to find (≈ encontrar)',         stem:'hall',   type:'ar',
      forms:{ yo:'hallo',      tu:'hallas',      el:'halla',     nos:'hallamos',   vos:'halláis',   ellos:'hallan'     },
      ex:'No puedo hallar a mi hermano menor.', exEn:'I can\'t find my younger brother.' },
    { infinitive:'invitar',    en:'to invite',                     stem:'invit',  type:'ar',
      forms:{ yo:'invito',     tu:'invitas',     el:'invita',    nos:'invitamos',  vos:'invitáis',  ellos:'invitan'    },
      ex:'Roberto va a invitar a Ramona a la fiesta.', exEn:'Roberto is going to invite Ramona to the party.' },
    { infinitive:'llamar',     en:'to call',                       stem:'llam',   type:'ar',
      forms:{ yo:'llamo',      tu:'llamas',      el:'llama',     nos:'llamamos',   vos:'llamáis',   ellos:'llaman'     },
      ex:'Carlos quiere llamar a sus amigos.', exEn:'Carlos wants to call his friends.' },
    { infinitive:'llevar',     en:'to carry / to take / to wear',  stem:'llev',   type:'ar',
      forms:{ yo:'llevo',      tu:'llevas',      el:'lleva',     nos:'llevamos',   vos:'lleváis',   ellos:'llevan'     },
      ex:'El taxista lleva a los turistas al hotel.', exEn:'The taxi driver takes the tourists to the hotel.' },
    { infinitive:'mirar',      en:'to look at / to watch',         stem:'mir',    type:'ar',
      forms:{ yo:'miro',       tu:'miras',       el:'mira',      nos:'miramos',    vos:'miráis',    ellos:'miran'      },
      ex:'En clase, miramos al profesor y prestamos atención.', exEn:'In class, we look at the teacher and pay attention.' },
    { infinitive:'querer',     en:'to love (a person)',            stem:'quier',  type:'er',
      forms:{ yo:'quiero',     tu:'quieres',     el:'quiere',    nos:'queremos',   vos:'queréis',   ellos:'quieren'    },
      ex:'Ella quiere a su amiga.',           exEn:'She loves her friend.' },
    { infinitive:'recoger',    en:'to pick up / to gather',        stem:'recog',  type:'er',
      forms:{ yo:'recojo',     tu:'recoges',     el:'recoge',    nos:'recogemos',  vos:'recogéis',  ellos:'recogen'    },
      ex:'¿Os podemos recoger a la una?',    exEn:'Can we pick you up at one o\'clock?' },
    { infinitive:'saludar',    en:'to greet',                      stem:'salud',  type:'ar',
      forms:{ yo:'saludo',     tu:'saludas',     el:'saluda',    nos:'saludamos',  vos:'saludáis',  ellos:'saludan'    },
      ex:'Ellas nos saludan los lunes.',      exEn:'They greet us on Mondays.' },
    { infinitive:'visitar',    en:'to visit',                      stem:'visit',  type:'ar',
      forms:{ yo:'visito',     tu:'visitas',     el:'visita',    nos:'visitamos',  vos:'visitáis',  ellos:'visitan'    },
      ex:'Los ingleses van a visitar los Estados Unidos.', exEn:'The English are going to visit the United States.' },
  ],

  readingVocab: [
    { id:'rv11_1',  es:'abrazar',         en:'to embrace / to hug' },
    { id:'rv11_2',  es:'bajarse de',      en:'to get off / to get out of' },
    { id:'rv11_3',  es:'recoger',         en:'to pick up / to collect' },
    { id:'rv11_4',  es:'saltar',          en:'to jump' },
    { id:'rv11_5',  es:'sellar',          en:'to stamp / to seal' },
    { id:'rv11_6',  es:'la aduana',       en:'customs (border)' },
    { id:'rv11_7',  es:'la bienvenida',   en:'the welcome' },
    { id:'rv11_8',  es:'el conductor',    en:'the driver' },
    { id:'rv11_9',  es:'el dueño',        en:'the owner' },
    { id:'rv11_10', es:'la fila',         en:'the line / queue' },
    { id:'rv11_11', es:'la lágrima',      en:'the tear (from crying)' },
    { id:'rv11_12', es:'la maleta',       en:'the suitcase' },
    { id:'rv11_13', es:'la propina',      en:'the tip (gratuity)' },
    { id:'rv11_14', es:'el registro',     en:'the register / record' },
    { id:'rv11_15', es:'la sonrisa',      en:'the smile' },
    { id:'rv11_16', es:'la tarifa',       en:'the fare / rate' },
    { id:'rv11_17', es:'el viajero',      en:'the traveler' },
    { id:'rv11_18', es:'cariñoso',        en:'affectionate' },
    { id:'rv11_19', es:'emocionado',      en:'excited / moved' },
  ],
};

/* ════════════════════════════════════════════════════════════════════════════
   Chapter 11 export
   ════════════════════════════════════════════════════════════════════════════ */

const CHAPTER_11 = {
  id: 11,
  title: 'The Direct Object',
  unlocked: false,
  sublessons: [SUBLESSON_11_1, SUBLESSON_11_2, SUBLESSON_11_3, SUBLESSON_11_4],
};

export default CHAPTER_11;
export { SUBLESSON_11_1, SUBLESSON_11_2, SUBLESSON_11_3, SUBLESSON_11_4 };
