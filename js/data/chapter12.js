/* ─── Fluir · Chapter 12 Data ───────────────────────────────────────────────
   Source: Complete Spanish Step-by-Step, Bregstein (McGraw-Hill)
   Chapter 12: Reflexive Verbs
   4 sub-lessons (Option A):
     12-1  Reflexive pronouns + daily routine verbs
     12-2  Regular reflexive verbs (social/emotional group)
     12-3  Irregular reflexive verbs + "to become" expressions
     12-4  Movement reflexives + reciprocal reflexives + placement drill
   ─────────────────────────────────────────────────────────────────────────── */

/* ════════════════════════════════════════════════════════════════════════════
   SUB-LESSON 12-1 — Reflexive Pronouns + Daily Routine Verbs
   ════════════════════════════════════════════════════════════════════════════ */

const SUBLESSON_12_1 = {
  id: '12-1',
  chapterId: 12,
  title: 'Reflexive Pronouns and Daily Routines',
  subtitle: 'me lavo · te lavas · se lava · nos lavamos',

  rules: [
    {
      id: 'r1',
      heading: 'A reflexive verb — the subject acts on itself',
      body: 'A verb is reflexive when the subject and object are the same person. In Spanish, -se is added to the infinitive. To conjugate, drop -se and place the matching reflexive pronoun before the verb.',
      examples: [
        { es: 'yo me lavo',          en: 'I wash myself' },
        { es: 'tú te lavas',         en: 'you wash yourself' },
        { es: 'él/ella se lava',     en: 'he/she washes himself/herself' },
        { es: 'nosotros nos lavamos',en: 'we wash ourselves' },
        { es: 'ellos se lavan',      en: 'they wash themselves' },
      ],
      tip: 'Compare: Él se lava (He washes himself — reflexive) vs Él lava el carro (He washes the car — not reflexive). The pronoun tells you it is reflexive.',
    },
    {
      id: 'r2',
      heading: 'Daily routine reflexives — English often drops "oneself"',
      body: 'Many Spanish reflexive verbs translate into English without "myself/yourself" — the reflexive meaning is simply built into the English verb.',
      examples: [
        { es: 'Me despierto a las siete.',     en: 'I wake up at seven.' },
        { es: 'Me levanto a las siete y media.',en: 'I get up at seven thirty.' },
        { es: 'Me visto rápidamente.',         en: 'I get dressed quickly.' },
        { es: 'Me acuesto a las once.',        en: 'I go to bed at eleven.' },
      ],
    },
  ],

  verbs: [
    { infinitive:'lavarse',      en:'to wash oneself',           reflexiveStem:'lav',      type:'ar', stemChange:null,
      forms:{ yo:'me lavo',     tu:'te lavas',     el:'se lava',     nos:'nos lavamos',   vos:'os laváis',   ellos:'se lavan'     },
      ex:'Antes de comer, me lavo las manos.',       exEn:'Before eating, I wash my hands.' },
    { infinitive:'bañarse',      en:'to bathe oneself',          reflexiveStem:'bañ',      type:'ar', stemChange:null,
      forms:{ yo:'me baño',     tu:'te bañas',     el:'se baña',     nos:'nos bañamos',   vos:'os bañáis',   ellos:'se bañan'     },
      ex:'Me baño cada mañana.',                     exEn:'I bathe every morning.' },
    { infinitive:'ducharse',     en:'to shower',                 reflexiveStem:'duch',     type:'ar', stemChange:null,
      forms:{ yo:'me ducho',    tu:'te duchas',    el:'se ducha',    nos:'nos duchamos',  vos:'os ducháis',  ellos:'se duchan'    },
      ex:'Antes de vestirme, me ducho.',             exEn:'Before getting dressed, I shower.' },
    { infinitive:'despertarse',  en:'to wake up',                reflexiveStem:'despert',  type:'ar', stemChange:'e→ie',
      forms:{ yo:'me despierto',tu:'te despiertas',el:'se despierta',nos:'nos despertamos',vos:'os despertáis',ellos:'se despiertan'},
      ex:'Me despierto a las seis de la mañana.',    exEn:'I wake up at six in the morning.' },
    { infinitive:'levantarse',   en:'to get up',                 reflexiveStem:'levant',   type:'ar', stemChange:null,
      forms:{ yo:'me levanto',  tu:'te levantas',  el:'se levanta',  nos:'nos levantamos',vos:'os levantáis',ellos:'se levantan'  },
      ex:'Me levanto a las siete y media.',          exEn:'I get up at seven thirty.' },
    { infinitive:'vestirse',     en:'to get dressed',            reflexiveStem:'vest',     type:'ir', stemChange:'e→i',
      forms:{ yo:'me visto',    tu:'te vistes',    el:'se viste',    nos:'nos vestimos',  vos:'os vestís',   ellos:'se visten'    },
      ex:'Me visto rápidamente.',                    exEn:'I get dressed quickly.' },
    { infinitive:'sentarse',     en:'to sit down',               reflexiveStem:'sent',     type:'ar', stemChange:'e→ie',
      forms:{ yo:'me siento',   tu:'te sientas',   el:'se sienta',   nos:'nos sentamos',  vos:'os sentáis',  ellos:'se sientan'   },
      ex:'Me siento en la mesa para desayunar.',     exEn:'I sit down at the table for breakfast.' },
    { infinitive:'desayunarse',  en:'to have breakfast',         reflexiveStem:'desayun',  type:'ar', stemChange:null,
      forms:{ yo:'me desayuno', tu:'te desayunas', el:'se desayuna', nos:'nos desayunamos',vos:'os desayunáis',ellos:'se desayunan'},
      ex:'Me desayuno a las siete.',                 exEn:'I have breakfast at seven.' },
    { infinitive:'acostarse',    en:'to go to bed',              reflexiveStem:'acost',    type:'ar', stemChange:'o→ue',
      forms:{ yo:'me acuesto',  tu:'te acuestas',  el:'se acuesta',  nos:'nos acostamos', vos:'os acostáis', ellos:'se acuestan'  },
      ex:'Me acuesto a las once.',                   exEn:'I go to bed at eleven.' },
    { infinitive:'dormirse',     en:'to fall asleep',            reflexiveStem:'dorm',     type:'ir', stemChange:'o→ue',
      forms:{ yo:'me duermo',   tu:'te duermes',   el:'se duerme',   nos:'nos dormimos',  vos:'os dormís',   ellos:'se duermen'   },
      ex:'Me duermo rápidamente.',                   exEn:'I fall asleep quickly.' },
    { infinitive:'llamarse',     en:'to be called / one\'s name is', reflexiveStem:'llam', type:'ar', stemChange:null,
      forms:{ yo:'me llamo',    tu:'te llamas',    el:'se llama',    nos:'nos llamamos',  vos:'os llamáis',  ellos:'se llaman'    },
      ex:'Me llamo Juan.',                           exEn:'My name is Juan.' },
    { infinitive:'divertirse',   en:'to have a good time',       reflexiveStem:'divert',   type:'ir', stemChange:'e→ie',
      forms:{ yo:'me divierto', tu:'te diviertes', el:'se divierte', nos:'nos divertimos',vos:'os divertís', ellos:'se divierten' },
      ex:'Ellos se divierten los fines de semana.',  exEn:'They have a good time on weekends.' },
  ],

  sentenceCompletionDrills: [
    { sentence:'___ despierto a las seis.',        answer:'Me',  choices:['Me','Te','Se','Nos'],   fills:['Me'],  en:'I wake up at six.',              rule:'me = reflexive pronoun for yo' },
    { sentence:'___ levantas tarde los domingos.', answer:'Te',  choices:['Me','Te','Se','Nos'],   fills:['Te'],  en:'You get up late on Sundays.',    rule:'te = reflexive pronoun for tú' },
    { sentence:'Ella ___ acuesta a las once.',     answer:'se',  choices:['me','te','se','nos'],   fills:['se'],  en:'She goes to bed at eleven.',     rule:'se = reflexive pronoun for él/ella' },
    { sentence:'___ divertimos los sábados.',      answer:'Nos', choices:['Me','Te','Se','Nos'],   fills:['Nos'], en:'We have a good time on Saturdays.',rule:'nos = reflexive pronoun for nosotros' },
    { sentence:'Ellos ___ levantan a las siete.',  answer:'se',  choices:['me','te','se','nos'],   fills:['se'],  en:'They get up at seven.',          rule:'se = reflexive pronoun for ellos' },
    { sentence:'Me ___ a las once.',               answer:'acuesto', choices:['acuesto','acuestas','acuesta','acostamos'], fills:['acuesto'], en:'I go to bed at eleven.', rule:'acostarse o→ue: yo → me acuesto' },
    { sentence:'Ella ___ rápidamente.',            answer:'se viste', choices:['se viste','se visten','me visto','te vistes'], fills:['se viste'], en:'She gets dressed quickly.', rule:'vestirse e→i: ella → se viste' },
    { sentence:'Nos ___ a las ocho.',              answer:'despertamos', choices:['despertamos','despiertan','despierto','despertáis'], fills:['despertamos'], en:'We wake up at eight.', rule:'despertarse: nosotros unchanged — nos despertamos' },
  ],
};

/* ════════════════════════════════════════════════════════════════════════════
   SUB-LESSON 12-2 — Regular Reflexive Verbs (Social/Emotional)
   ════════════════════════════════════════════════════════════════════════════ */

const SUBLESSON_12_2 = {
  id: '12-2',
  chapterId: 12,
  title: 'Regular Reflexive Verbs',
  subtitle: 'enamorarse · quejarse · portarse · equivocarse · llevarse bien…',

  rules: [
    {
      id: 'r1',
      heading: 'Same conjugation pattern — different meanings',
      body: 'All these verbs follow the same reflexive conjugation pattern as lavarse. What changes is the meaning. Some require a following preposition (de, con, en, a) that cannot be omitted even if English drops it.',
      examples: [
        { es: 'Me enamoro de ella.',        en: 'I fall in love with her.', note: 'enamorarse de — de required' },
        { es: 'Se queja del trabajo.',       en: 'He complains about work.', note: 'quejarse de — de required' },
        { es: 'Nos llevamos bien.',          en: 'We get along well.' },
        { es: 'Me equivoco a veces.',        en: 'I make mistakes sometimes.' },
      ],
      tip: 'Several of these take a preposition: enamorarse DE, quejarse DE, burlarse DE, fiarse EN, fijarse EN, meterse EN, reunirse CON, aprovecharse DE, atreverse A.',
    },
  ],

  verbs: [
    { infinitive:'arreglarse',     en:'to get ready / fix oneself up',   stem:'arregl',    type:'ar', prep:null,
      ex:'Me arreglo antes de salir.',            exEn:'I get ready before going out.' },
    { infinitive:'aprovecharse de',en:'to take advantage of',            stem:'aprovech',  type:'ar', prep:'de',
      ex:'Él se aprovecha de la situación.',      exEn:'He takes advantage of the situation.' },
    { infinitive:'atreverse a',    en:'to dare to',                      stem:'atrev',     type:'er', prep:'a',
      ex:'No me atrevo a hablar en público.',     exEn:'I don\'t dare to speak in public.' },
    { infinitive:'burlarse de',    en:'to make fun of',                  stem:'burl',      type:'ar', prep:'de',
      ex:'Ella se burla de sus amigos.',          exEn:'She makes fun of her friends.' },
    { infinitive:'callarse',       en:'to become quiet / to be quiet',   stem:'call',      type:'ar', prep:null,
      ex:'Los niños se callan en la clase.',      exEn:'The children become quiet in class.' },
    { infinitive:'demorarse',      en:'to delay / to take a long time',  stem:'demor',     type:'ar', prep:null,
      ex:'No te demores; tenemos prisa.',         exEn:'Don\'t delay; we are in a hurry.' },
    { infinitive:'enamorarse de',  en:'to fall in love with',            stem:'enamor',    type:'ar', prep:'de',
      ex:'Él se enamora de ella.',                exEn:'He falls in love with her.' },
    { infinitive:'equivocarse',    en:'to make a mistake',               stem:'equivoc',   type:'ar', prep:null,
      ex:'Me equivoco a veces.',                  exEn:'I make mistakes sometimes.' },
    { infinitive:'fiarse de',      en:'to trust',                        stem:'fí',        type:'ar', prep:'de',
      ex:'No me fío de él.',                      exEn:'I don\'t trust him.' },
    { infinitive:'fijarse en',     en:'to notice',                       stem:'fij',       type:'ar', prep:'en',
      ex:'Me fijo mucho en los detalles.',        exEn:'I notice the details a lot.' },
    { infinitive:'lastimarse',     en:'to hurt oneself',                 stem:'lastim',    type:'ar', prep:null,
      ex:'El niño se lastima al caer.',           exEn:'The child hurts himself when he falls.' },
    { infinitive:'llevarse (bien) con', en:'to get along (well) with',   stem:'llev',      type:'ar', prep:'con',
      ex:'Nos llevamos bien.',                    exEn:'We get along well.' },
    { infinitive:'mejorarse',      en:'to get better',                   stem:'mejor',     type:'ar', prep:null,
      ex:'Espero que te mejores pronto.',         exEn:'I hope you get better soon.' },
    { infinitive:'meterse en',     en:'to get involved in / to meddle',  stem:'met',       type:'er', prep:'en',
      ex:'No te metas en mis asuntos.',           exEn:'Don\'t get involved in my business.' },
    { infinitive:'portarse (bien/mal)', en:'to behave (well/badly)',     stem:'port',      type:'ar', prep:null,
      ex:'Los niños se portan bien.',             exEn:'The children behave well.' },
    { infinitive:'quejarse de',    en:'to complain about',               stem:'quej',      type:'ar', prep:'de',
      ex:'Ella se queja del trabajo.',            exEn:'She complains about work.' },
    { infinitive:'quemarse',       en:'to burn oneself / get burned',    stem:'quem',      type:'ar', prep:null,
      ex:'Me quemo con el café caliente.',        exEn:'I burn myself with the hot coffee.' },
    { infinitive:'reunirse con',   en:'to meet with',                    stem:'reun',      type:'ir', prep:'con',
      ex:'Nos reunimos con los clientes.',        exEn:'We meet with the clients.' },
  ],
};

/* ════════════════════════════════════════════════════════════════════════════
   SUB-LESSON 12-3 — Irregular Reflexive Verbs + "To Become"
   ════════════════════════════════════════════════════════════════════════════ */

const SUBLESSON_12_3 = {
  id: '12-3',
  chapterId: 12,
  title: 'Irregular Reflexives and "To Become"',
  subtitle: 'acordarse · ponerse · volverse · hacerse · sentirse · reírse',

  rules: [
    {
      id: 'r1',
      heading: 'Irregular reflexive verbs — stem changes apply',
      body: 'Some reflexive verbs have stem changes that must be memorized. The reflexive pronoun pattern stays the same — only the stem changes.',
      examples: [
        { es: 'acordarse (o→ue): me acuerdo',      en: 'I remember' },
        { es: 'sentirse (e→ie): me siento bien',   en: 'I feel well' },
        { es: 'reírse (e→i): me río',              en: 'I laugh' },
        { es: 'morirse (o→ue): se muere',          en: 'he is dying' },
      ],
    },
    {
      id: 'r2',
      heading: '"To become" — three expressions, three uses',
      body: 'Spanish has three ways to express "to become" depending on the type of change. Ponerse is for physical/emotional states. Volverse is for sudden or drastic change. Hacerse/llegar a ser is for change through effort.',
      examples: [
        { es: 'Me pongo nervioso.',          en: 'I become nervous. (ponerse + adjective = emotional/physical)', note: 'most common' },
        { es: 'Ella se pone roja.',          en: 'She turns red (blushes).' },
        { es: 'Él se vuelve loco.',          en: 'He goes crazy. (volverse = sudden/involuntary)' },
        { es: 'Ella se hace doctora.',       en: 'She is becoming a doctor. (hacerse = through effort)' },
        { es: 'Él llega a ser arquitecto.',  en: 'He becomes an architect. (llegar a ser = through effort)' },
      ],
      tip: 'Quick guide: feeling angry/happy/sick/red → ponerse. Going crazy/changing drastically → volverse. Becoming a professional → hacerse or llegar a ser.',
    },
  ],

  verbs: [
    { infinitive:'acordarse de',   en:'to remember',              stemChange:'o→ue',
      forms:{ yo:'me acuerdo',    tu:'te acuerdas',    el:'se acuerda',    nos:'nos acordamos',    ellos:'se acuerdan'    },
      ex:'No me acuerdo de su nombre.',          exEn:'I don\'t remember his name.' },
    { infinitive:'darse cuenta de',en:'to realize',               stemChange:'irregular',
      forms:{ yo:'me doy cuenta', tu:'te das cuenta',  el:'se da cuenta',  nos:'nos damos cuenta', ellos:'se dan cuenta'  },
      ex:'Me doy cuenta de que tengo razón.',    exEn:'I realize that I am right.' },
    { infinitive:'encontrarse con',en:'to meet / run into',       stemChange:'o→ue',
      forms:{ yo:'me encuentro',  tu:'te encuentras',  el:'se encuentra',  nos:'nos encontramos',  ellos:'se encuentran'  },
      ex:'Me encuentro con mis amigos los viernes.', exEn:'I meet with my friends on Fridays.' },
    { infinitive:'morirse',        en:'to die / to be dying',     stemChange:'o→ue',
      forms:{ yo:'me muero',      tu:'te mueres',      el:'se muere',      nos:'nos morimos',       ellos:'se mueren'      },
      ex:'Me muero de hambre.',                  exEn:'I am dying of hunger.' },
    { infinitive:'moverse',        en:'to move (oneself)',        stemChange:'o→ue',
      forms:{ yo:'me muevo',      tu:'te mueves',      el:'se mueve',      nos:'nos movemos',       ellos:'se mueven'      },
      ex:'No te muevas.',                        exEn:'Don\'t move.' },
    { infinitive:'parecerse a',    en:'to resemble / look like',  stemChange:'yo-irreg',
      forms:{ yo:'me parezco',    tu:'te pareces',     el:'se parece',     nos:'nos parecemos',     ellos:'se parecen'     },
      ex:'Me parezco a mi madre.',               exEn:'I resemble my mother.' },
    { infinitive:'reírse',         en:'to laugh',                 stemChange:'e→i',
      forms:{ yo:'me río',        tu:'te ríes',        el:'se ríe',        nos:'nos reímos',        ellos:'se ríen'        },
      ex:'Los niños se ríen mucho.',             exEn:'The children laugh a lot.' },
    { infinitive:'sentirse',       en:'to feel (well/ill)',       stemChange:'e→ie',
      forms:{ yo:'me siento',     tu:'te sientes',     el:'se siente',     nos:'nos sentimos',      ellos:'se sienten'     },
      ex:'¿Cómo te sientes hoy?',               exEn:'How do you feel today?' },
  ],

  becomeExpressions: [
    { es:'ponerse + adjective',     en:'to become (emotional/physical state)', example:'Me pongo nervioso.',        exEn:'I become nervous.' },
    { es:'volverse + adjective',    en:'to become (sudden/involuntary change)',example:'Él se vuelve loco.',        exEn:'He goes crazy.' },
    { es:'hacerse + noun',          en:'to become (through effort)',           example:'Ella se hace doctora.',     exEn:'She becomes a doctor.' },
    { es:'llegar a ser + noun',     en:'to become (through effort)',           example:'Él llega a ser arquitecto.',exEn:'He becomes an architect.' },
  ],

  sentenceCompletionDrills: [
    { sentence:'Me ___ brava al escuchar las noticias.',  answer:'pongo',    choices:['pongo','vuelvo','hago','llego a ser'],  fills:['pongo'],    en:'I become angry upon hearing the news.',    rule:'ponerse + adjective = emotional/physical change' },
    { sentence:'Ella ___ roja porque es tímida.',         answer:'se pone',  choices:['se pone','se vuelve','se hace','llega a ser'], fills:['se pone'], en:'She turns red because she is shy.',       rule:'ponerse = physical/emotional change' },
    { sentence:'Hasta los psicólogos ___ locos.',         answer:'se vuelven',choices:['se vuelven','se ponen','se hacen','llegan a ser'], fills:['se vuelven'], en:'Even psychologists go crazy.',     rule:'volverse = sudden, drastic change' },
    { sentence:'Ella ___ doctora.',                       answer:'se hace',  choices:['se hace','se pone','se vuelve','llega a ser'], fills:['se hace'], en:'She is becoming a doctor.',              rule:'hacerse + noun = change through effort' },
    { sentence:'No me ___ de su nombre.',                 answer:'acuerdo',  choices:['acuerdo','acuerdas','acuerda','acordamos'], fills:['acuerdo'], en:'I don\'t remember his name.',             rule:'acordarse o→ue: yo → me acuerdo' },
    { sentence:'¿Cómo ___ hoy?',                         answer:'te sientes',choices:['te sientes','me siento','se siente','nos sentimos'], fills:['te sientes'], en:'How do you feel today?',        rule:'sentirse e→ie: tú → te sientes' },
    { sentence:'Los niños ___ mucho.',                    answer:'se ríen',  choices:['se ríen','se río','se ríes','nos reímos'], fills:['se ríen'], en:'The children laugh a lot.',               rule:'reírse e→i: ellos → se ríen' },
    { sentence:'Me ___ de que tengo razón.',              answer:'doy cuenta',choices:['doy cuenta','das cuenta','da cuenta','damos cuenta'], fills:['doy cuenta'], en:'I realize that I am right.', rule:'darse cuenta: yo → me doy cuenta (irregular)' },
  ],
};

/* ════════════════════════════════════════════════════════════════════════════
   SUB-LESSON 12-4 — Movement Reflexives + Reciprocals + Placement Drill
   ════════════════════════════════════════════════════════════════════════════ */

const SUBLESSON_12_4 = {
  id: '12-4',
  chapterId: 12,
  title: 'Movement, Reciprocals, and Placement',
  subtitle: 'quedarse · irse · caerse · ayudarse · pronoun placement',

  rules: [
    {
      id: 'r1',
      heading: 'Reflexive verbs expressing movement',
      body: 'These reflexive verbs describe physical movement or change of location. They follow the same conjugation pattern.',
      examples: [
        { es: 'Me quedo en casa hoy.',   en: 'I stay home today.' },
        { es: 'Nos mudamos a Miami.',    en: 'We move to Miami.' },
        { es: 'Me voy ahora.',           en: 'I am leaving now.' },
        { es: 'El niño se cae.',         en: 'The child falls down.' },
      ],
    },
    {
      id: 'r2',
      heading: 'Reciprocal reflexives — "each other"',
      body: 'The plural reflexive forms (nos, os, se) can express a reciprocal action — something done to each other. Context or el uno al otro clarifies the meaning.',
      examples: [
        { es: 'Nos conocemos bien.',         en: 'We know each other well.' },
        { es: 'Roberto y Sonia se quieren.', en: 'Roberto and Sonia love each other.' },
        { es: 'Ellos se ven todos los días.', en: 'They see each other every day.' },
        { es: 'Se ayudan el uno al otro.',   en: 'They help each other.' },
      ],
    },
    {
      id: 'r3',
      heading: 'Pronoun placement — two valid positions',
      body: 'Like indirect and direct object pronouns, the reflexive pronoun can go before the first verb or attached to the infinitive.',
      examples: [
        { es: 'Voy a bañarme antes de acostarme.',  en: 'I am going to bathe before going to bed.' },
        { es: 'Me voy a bañar antes de acostarme.', en: 'I am going to bathe before going to bed.' },
        { es: 'Ella va a dedicarse a la ley.',       en: 'She is going to dedicate herself to law.' },
        { es: 'Queremos expresarnos bien.',          en: 'We want to express ourselves well.' },
      ],
    },
  ],

  movementVerbs: [
    { infinitive:'quedarse',   en:'to stay / to remain',        stemChange:null,
      forms:{ yo:'me quedo',   tu:'te quedas',   el:'se queda',   nos:'nos quedamos',  ellos:'se quedan'   },
      ex:'Me quedo en casa hoy.',              exEn:'I stay home today.' },
    { infinitive:'mudarse',    en:'to move (to a new place)',   stemChange:null,
      forms:{ yo:'me mudo',    tu:'te mudas',    el:'se muda',    nos:'nos mudamos',   ellos:'se mudan'    },
      ex:'Nos mudamos a San Francisco.',        exEn:'We move to San Francisco.' },
    { infinitive:'pararse',    en:'to stand up / to stop',      stemChange:null,
      forms:{ yo:'me paro',    tu:'te paras',    el:'se para',    nos:'nos paramos',   ellos:'se paran'    },
      ex:'Me paro cuando llega el director.',   exEn:'I stand up when the director arrives.' },
    { infinitive:'caerse',     en:'to fall down',               stemChange:'yo-irreg',
      forms:{ yo:'me caigo',   tu:'te caes',     el:'se cae',     nos:'nos caemos',    ellos:'se caen'     },
      ex:'El niño se cae del árbol.',           exEn:'The child falls from the tree.' },
    { infinitive:'irse',       en:'to go away / to leave',      stemChange:'irregular',
      forms:{ yo:'me voy',     tu:'te vas',      el:'se va',      nos:'nos vamos',     ellos:'se van'      },
      ex:'Me voy a las cinco.',                 exEn:'I leave at five.' },
  ],

  reciprocalVerbs: [
    { es:'ayudarse',     en:'to help each other',           example:'Mis amigos se ayudan el uno al otro.' },
    { es:'conocerse',    en:'to know each other',           example:'Nos conocemos bien.' },
    { es:'entenderse',   en:'to understand each other',     example:'Las dos hermanas se entienden bien.' },
    { es:'escribirse',   en:'to write to each other',       example:'Ellas se escriben cada semana.' },
    { es:'hablarse',     en:'to speak to each other',       example:'¿Se hablan Uds. con frecuencia?' },
    { es:'quererse',     en:'to love each other',           example:'Roberto y Sonia se quieren.' },
    { es:'verse',        en:'to see each other',            example:'Ellos se ven todos los días.' },
  ],

  sentenceCompletionDrills: [
    { sentence:'___ quedo en casa hoy.',           answer:'Me',     choices:['Me','Te','Se','Nos'],      fills:['Me'],     en:'I stay home today.',                    rule:'me quedo = I stay (quedarse)' },
    { sentence:'Ellos ___ van a las cinco.',       answer:'se',     choices:['me','te','se','nos'],      fills:['se'],     en:'They leave at five.',                   rule:'se van = they leave (irse)' },
    { sentence:'El niño ___ cae del árbol.',       answer:'se',     choices:['me','te','se','nos'],      fills:['se'],     en:'The child falls from the tree.',         rule:'se cae = falls (caerse)' },
    { sentence:'___ mudamos a San Francisco.',     answer:'Nos',    choices:['Me','Te','Se','Nos'],      fills:['Nos'],    en:'We move to San Francisco.',             rule:'nos mudamos = we move (mudarse)' },
    { sentence:'Mis amigos ___ ayudan.',           answer:'se',     choices:['me','te','se','nos'],      fills:['se'],     en:'My friends help each other.',            rule:'se ayudan = they help each other (reciprocal)' },
    { sentence:'Voy a ___ antes de acostarme.',    answer:'bañarme',choices:['bañarme','me bañar','me baño','bañarme '], fills:['bañarme'], en:'I am going to bathe before going to bed.', rule:'pronoun attached to infinitive: bañarme' },
    { sentence:'___ voy a bañar.',                answer:'Me',     choices:['Me','Te','Se','Nos'],      fills:['Me'],     en:'I am going to bathe.',                  rule:'pronoun before first verb: me voy a bañar' },
    { sentence:'Queremos ___ bien en español.',    answer:'expresarnos', choices:['expresarnos','nos expresar','expresamos','expresarte'], fills:['expresarnos'], en:'We want to express ourselves well in Spanish.', rule:'pronoun attached to infinitive after querer' },
  ],
};

/* ════════════════════════════════════════════════════════════════════════════
   Chapter 12 export
   ════════════════════════════════════════════════════════════════════════════ */

const CHAPTER_12 = {
  id: 12,
  title: 'Reflexive Verbs',
  unlocked: false,
  sublessons: [SUBLESSON_12_1, SUBLESSON_12_2, SUBLESSON_12_3, SUBLESSON_12_4],
};

export default CHAPTER_12;
export { SUBLESSON_12_1, SUBLESSON_12_2, SUBLESSON_12_3, SUBLESSON_12_4 };
