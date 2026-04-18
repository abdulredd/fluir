/* ─── Fluir · Chapter 13 Data ───────────────────────────────────────────────
   Source: Complete Spanish Step-by-Step, Bregstein (McGraw-Hill)
   Chapter 13: The Present Subjunctive
   4 sub-lessons (Option D):
     13-1  Formation — regular, spelling changes, 6 irregular verbs
     13-2  Impersonal expressions + wish/preference verbs
     13-3  Emotion/hope + command/prohibition + doubt/denial verbs
     13-4  Conjunctions + adjective clauses + ojalá/tal vez/quizás
   ─────────────────────────────────────────────────────────────────────────── */

/* ════════════════════════════════════════════════════════════════════════════
   SUB-LESSON 13-1 — Formation of the Present Subjunctive
   ════════════════════════════════════════════════════════════════════════════ */

const SUBLESSON_13_1 = {
  id: '13-1',
  chapterId: 13,
  title: 'Formation of the Present Subjunctive',
  subtitle: 'yo form → drop -o → add opposite vowel endings',

  rules: [
    {
      id: 'r1',
      heading: 'The formation rule — start with yo, flip the vowel',
      body: 'Almost all verbs form the present subjunctive from the yo form of the present indicative. Drop the -o. Then add the "opposite" vowel endings: -ar verbs add -e endings; -er/-ir verbs add -a endings.',
      examples: [
        { es: 'cantar → canto → cante, cantes, cante, cantemos, cantéis, canten', en: '-ar: add -e endings' },
        { es: 'comer → como → coma, comas, coma, comamos, comáis, coman',        en: '-er: add -a endings' },
        { es: 'vivir → vivo → viva, vivas, viva, vivamos, viváis, vivan',         en: '-ir: add -a endings' },
      ],
      tip: 'Any irregularity in the yo form of the present indicative carries into the subjunctive. Tener → tengo → tenga. Hacer → hago → haga. Conocer → conozco → conozca.',
    },
    {
      id: 'r2',
      heading: 'Spelling changes — maintain the yo sound',
      body: 'Verbs ending in -gar, -car, -zar need spelling changes before -e to preserve the pronunciation of the yo form.',
      examples: [
        { es: 'llegar → llego → llegue (g→gu)',   en: 'to arrive → subjunctive: llegue' },
        { es: 'buscar → busco → busque (c→qu)',    en: 'to look for → subjunctive: busque' },
        { es: 'empezar → empiezo → empiece (z→c)', en: 'to begin → subjunctive: empiece' },
        { es: 'tocar → toco → toque (c→qu)',       en: 'to play → subjunctive: toque' },
      ],
    },
    {
      id: 'r3',
      heading: 'Six fully irregular subjunctives — memorize these',
      body: 'These six verbs do not form the subjunctive from their yo form. They must be memorized as a set.',
      examples: [
        { es: 'dar → dé, des, dé, demos, deis, den',        en: 'to give' },
        { es: 'estar → esté, estés, esté, estemos, estéis, estén', en: 'to be (location/state)' },
        { es: 'ir → vaya, vayas, vaya, vayamos, vayáis, vayan',   en: 'to go' },
        { es: 'saber → sepa, sepas, sepa, sepamos, sepáis, sepan', en: 'to know' },
        { es: 'ser → sea, seas, sea, seamos, seáis, sean',   en: 'to be (identity)' },
        { es: 'haber → haya, hayas, haya, hayamos, hayáis, hayan', en: 'to have (auxiliary)' },
      ],
    },
  ],

  /* Formation drills — infinitive + pronoun → correct subjunctive form */
  formationDrills: [
    /* Regular -ar */
    { infinitive:'cantar',   pronoun:'yo',       subjunctive:'cante',    indicativeYo:'canto',   type:'ar' },
    { infinitive:'cantar',   pronoun:'tú',       subjunctive:'cantes',   indicativeYo:'canto',   type:'ar' },
    { infinitive:'cantar',   pronoun:'él',       subjunctive:'cante',    indicativeYo:'canto',   type:'ar' },
    { infinitive:'cantar',   pronoun:'nosotros', subjunctive:'cantemos', indicativeYo:'canto',   type:'ar' },
    { infinitive:'cantar',   pronoun:'ellos',    subjunctive:'canten',   indicativeYo:'canto',   type:'ar' },
    /* Irregular yo → irregular subjunctive */
    { infinitive:'tener',    pronoun:'yo',       subjunctive:'tenga',    indicativeYo:'tengo',   type:'er' },
    { infinitive:'tener',    pronoun:'ellos',    subjunctive:'tengan',   indicativeYo:'tengo',   type:'er' },
    { infinitive:'hacer',    pronoun:'yo',       subjunctive:'haga',     indicativeYo:'hago',    type:'er' },
    { infinitive:'hacer',    pronoun:'tú',       subjunctive:'hagas',    indicativeYo:'hago',    type:'er' },
    { infinitive:'conocer',  pronoun:'yo',       subjunctive:'conozca',  indicativeYo:'conozco', type:'er' },
    { infinitive:'venir',    pronoun:'ella',     subjunctive:'venga',    indicativeYo:'vengo',   type:'ir' },
    { infinitive:'salir',    pronoun:'Ud.',      subjunctive:'salga',    indicativeYo:'salgo',   type:'ir' },
    { infinitive:'poner',    pronoun:'nosotros', subjunctive:'pongamos', indicativeYo:'pongo',   type:'er' },
    { infinitive:'traer',    pronoun:'ellos',    subjunctive:'traigan',  indicativeYo:'traigo',  type:'er' },
    /* Spelling changes */
    { infinitive:'llegar',   pronoun:'yo',       subjunctive:'llegue',   indicativeYo:'llego',   type:'ar', note:'g→gu' },
    { infinitive:'buscar',   pronoun:'tú',       subjunctive:'busques',  indicativeYo:'busco',   type:'ar', note:'c→qu' },
    { infinitive:'empezar',  pronoun:'ella',     subjunctive:'empiece',  indicativeYo:'empiezo', type:'ar', note:'z→c' },
    { infinitive:'tocar',    pronoun:'ellos',    subjunctive:'toquen',   indicativeYo:'toco',    type:'ar', note:'c→qu' },
    /* Six irregulars */
    { infinitive:'ir',       pronoun:'yo',       subjunctive:'vaya',     indicativeYo:'voy',     type:'ir', irregular:true },
    { infinitive:'ir',       pronoun:'ellos',    subjunctive:'vayan',    indicativeYo:'voy',     type:'ir', irregular:true },
    { infinitive:'ser',      pronoun:'tú',       subjunctive:'seas',     indicativeYo:'soy',     type:'er', irregular:true },
    { infinitive:'ser',      pronoun:'nosotros', subjunctive:'seamos',   indicativeYo:'soy',     type:'er', irregular:true },
    { infinitive:'estar',    pronoun:'ella',     subjunctive:'esté',     indicativeYo:'estoy',   type:'ar', irregular:true },
    { infinitive:'estar',    pronoun:'Uds.',     subjunctive:'estén',    indicativeYo:'estoy',   type:'ar', irregular:true },
    { infinitive:'saber',    pronoun:'yo',       subjunctive:'sepa',     indicativeYo:'sé',      type:'er', irregular:true },
    { infinitive:'dar',      pronoun:'él',       subjunctive:'dé',       indicativeYo:'doy',     type:'ar', irregular:true },
    { infinitive:'haber',    pronoun:'yo',       subjunctive:'haya',     indicativeYo:'he',      type:'er', irregular:true },
  ],

  /* Six irregular subjunctive full tables */
  irregularTables: [
    { infinitive:'dar',   forms:{ yo:'dé',    tu:'des',    el:'dé',    nos:'demos',   vos:'deis',    ellos:'den'    } },
    { infinitive:'estar', forms:{ yo:'esté',  tu:'estés',  el:'esté',  nos:'estemos', vos:'estéis',  ellos:'estén'  } },
    { infinitive:'ir',    forms:{ yo:'vaya',  tu:'vayas',  el:'vaya',  nos:'vayamos', vos:'vayáis',  ellos:'vayan'  } },
    { infinitive:'saber', forms:{ yo:'sepa',  tu:'sepas',  el:'sepa',  nos:'sepamos', vos:'sepáis',  ellos:'sepan'  } },
    { infinitive:'ser',   forms:{ yo:'sea',   tu:'seas',   el:'sea',   nos:'seamos',  vos:'seáis',   ellos:'sean'   } },
    { infinitive:'haber', forms:{ yo:'haya',  tu:'hayas',  el:'haya',  nos:'hayamos', vos:'hayáis',  ellos:'hayan'  } },
  ],
};

/* ════════════════════════════════════════════════════════════════════════════
   SUB-LESSON 13-2 — Impersonal Expressions + Wish/Preference Verbs
   ════════════════════════════════════════════════════════════════════════════ */

const SUBLESSON_13_2 = {
  id: '13-2',
  chapterId: 13,
  title: 'Impersonal Expressions and Wish/Preference',
  subtitle: 'es importante que… · quiero que… · prefiere que…',

  rules: [
    {
      id: 'r1',
      heading: 'Impersonal expressions trigger the subjunctive',
      body: 'An impersonal expression in the main clause (es importante, es posible, es dudoso…) always triggers the subjunctive in the dependent clause introduced by que.',
      examples: [
        { es: 'Es importante que ella coma bien.',      en: 'It is important that she eat well.' },
        { es: 'Es posible que él llegue tarde.',        en: 'It is possible that he arrive late.' },
        { es: 'Es necesario que estudiemos.',           en: 'It is necessary that we study.' },
        { es: 'Es una lástima que no puedas venir.',    en: 'It is a pity that you can\'t come.' },
      ],
      tip: 'If there is no specific subject after the impersonal expression, use the infinitive instead: Es importante estudiar (no que clause needed).',
    },
    {
      id: 'r2',
      heading: 'Wish and preference verbs — different subjects required',
      body: 'When querer, desear, or preferir express a wish about what someone ELSE does, the subjunctive is required. If there is only one subject, use the infinitive.',
      examples: [
        { es: 'Él quiere que yo cante.',          en: 'He wants me to sing. (two subjects → subjunctive)' },
        { es: 'Él quiere cantar.',                en: 'He wants to sing. (one subject → infinitive)' },
        { es: 'Ella prefiere que su hijo juegue.', en: 'She prefers that her son play baseball.' },
        { es: 'Deseamos que ella esté bien.',     en: 'We want her to be well.' },
      ],
    },
  ],

  impersonalExpressions: [
    { es:'es bueno que',      en:'it is good that' },
    { es:'es difícil que',    en:'it is difficult that' },
    { es:'es dudoso que',     en:'it is doubtful that' },
    { es:'es fácil que',      en:'it is easy that' },
    { es:'es imposible que',  en:'it is impossible that' },
    { es:'es importante que', en:'it is important that' },
    { es:'es malo que',       en:'it is bad that' },
    { es:'es mejor que',      en:'it is better that' },
    { es:'es necesario que',  en:'it is necessary that' },
    { es:'es posible que',    en:'it is possible that' },
    { es:'es probable que',   en:'it is probable that' },
    { es:'es preciso que',    en:'it is extremely necessary that' },
    { es:'es una lástima que',en:'it is a pity that' },
    { es:'es urgente que',    en:'it is urgent that' },
  ],

  sentenceCompletionDrills: [
    { sentence:'Es importante que ella ___ bien.',           answer:'coma',    choices:['coma','come','comer','como'],         fills:['coma'],    en:'It is important that she eat well.',         rule:'impersonal expression + que → subjunctive' },
    { sentence:'Es posible que él ___ tarde.',               answer:'llegue',  choices:['llegue','llega','llegar','llegó'],    fills:['llegue'],  en:'It is possible that he arrive late.',        rule:'llegar: c→gu spelling change in subjunctive' },
    { sentence:'Es necesario que nosotros ___.',             answer:'estudiemos', choices:['estudiemos','estudiamos','estudiar','estudien'], fills:['estudiemos'], en:'It is necessary that we study.', rule:'estudiar: regular -ar subjunctive nosotros' },
    { sentence:'Es dudoso que ellos ___ ricos.',             answer:'sean',    choices:['sean','son','ser','están'],           fills:['sean'],    en:'It is doubtful that they are rich.',         rule:'ser: irregular subjunctive (sean)' },
    { sentence:'Es urgente que tú ___ al doctor.',           answer:'vayas',   choices:['vayas','vas','ir','vaya'],            fills:['vayas'],   en:'It is urgent that you go to the doctor.',   rule:'ir: irregular subjunctive (vayas)' },
    { sentence:'Él quiere que yo ___.',                      answer:'cante',   choices:['cante','canto','cantar','cantó'],     fills:['cante'],   en:'He wants me to sing.',                      rule:'querer + que + different subject → subjunctive' },
    { sentence:'Quiero cantar. → quiero que ___ cante.',     answer:'él',      choices:['él','yo','nosotros','ellos'],         fills:['él'],      en:'I want him to sing. (different subject)',    rule:'two subjects needed for subjunctive with querer' },
    { sentence:'Ella prefiere que su hijo ___ al béisbol.',  answer:'juegue',  choices:['juegue','juega','jugar','jugó'],      fills:['juegue'],  en:'She prefers that her son play baseball.',   rule:'jugar u→ue + c→gu: yo juego → juegue' },
    { sentence:'Deseamos que ella ___ bien.',                answer:'esté',    choices:['esté','está','estar','estaba'],       fills:['esté'],    en:'We want her to be well.',                   rule:'estar: irregular subjunctive (esté)' },
    { sentence:'Es una lástima que no ___ venir.',           answer:'puedas',  choices:['puedas','puedes','poder','podías'],   fills:['puedas'],  en:'It is a pity that you can\'t come.',        rule:'poder o→ue + yo form puedo → puedas' },
  ],
};

/* ════════════════════════════════════════════════════════════════════════════
   SUB-LESSON 13-3 — Emotion/Hope + Command/Prohibition + Doubt/Denial
   ════════════════════════════════════════════════════════════════════════════ */

const SUBLESSON_13_3 = {
  id: '13-3',
  chapterId: 13,
  title: 'Emotion, Command, and Doubt Verbs',
  subtitle: 'esperar que… · mandar que… · dudar que…',

  rules: [
    {
      id: 'r1',
      heading: 'Verbs of emotion and hope',
      body: 'When the main clause expresses an emotional reaction or hope about another person\'s action, the subjunctive follows que.',
      examples: [
        { es: 'Me alegro de que Uds. estén bien.',     en: 'I am glad that you are well.' },
        { es: 'Esperamos que Ud. tenga buen fin de semana.', en: 'We hope that you have a good weekend.' },
        { es: 'Lo siento que Ud. no gane la lotería.', en: 'I am sorry that you never win the lottery.' },
        { es: 'Tengo miedo de que ella no llegue.',    en: 'I am afraid that she won\'t arrive.' },
      ],
    },
    {
      id: 'r2',
      heading: 'Verbs of command and prohibition',
      body: 'Verbs that order or forbid someone else to do something trigger the subjunctive. Note: decir triggers subjunctive only when it means "to order," not when it means "to inform."',
      examples: [
        { es: 'El capitán manda que los soldados descansen.', en: 'The captain orders the soldiers to rest.' },
        { es: 'Les pido que expliquen mejor la idea.',       en: 'I ask them to explain the idea better.' },
        { es: 'Te digo que vayas al doctor.',               en: 'I tell you to go to the doctor. (order)' },
        { es: 'José nos dice que el tren viene.',           en: 'Joe tells us that the train is coming. (fact → indicative)' },
      ],
      tip: 'Decir + fact = indicative. Decir + order = subjunctive. The distinction is whether the person is conveying information or issuing a command.',
    },
    {
      id: 'r3',
      heading: 'Verbs of doubt and denial',
      body: 'Verbs expressing doubt or disbelief trigger the subjunctive. Note: the affirmative (creer, pensar) uses the indicative; only the negative (no creer, no pensar) triggers subjunctive.',
      examples: [
        { es: 'Ella duda que yo sepa tocar el piano.',      en: 'She doubts that I know how to play piano.' },
        { es: 'No creemos que sea la verdad.',              en: 'We don\'t believe that it is the truth.' },
        { es: 'No pensamos que Daniel nos invite.',         en: 'We don\'t think that Daniel will invite us.' },
        { es: 'Creo que ella viene. (indicative)',          en: 'I believe that she is coming. (affirmative → indicative)' },
      ],
    },
  ],

  emotionVerbs: [
    { es:'alegrarse de que', en:'to be glad that' },
    { es:'esperar que',      en:'to hope that' },
    { es:'estar contento de que', en:'to be happy that' },
    { es:'estar triste de que',   en:'to be sad that' },
    { es:'gustarle a uno que',    en:'to be pleasing that' },
    { es:'sentir que',       en:'to regret that / to be sorry that' },
    { es:'tener miedo de que',    en:'to be afraid that' },
    { es:'temer que',        en:'to fear that' },
  ],

  commandVerbs: [
    { es:'aconsejar que',   en:'to advise that' },
    { es:'decir que',       en:'to tell/order that (command use)' },
    { es:'insistir en que', en:'to insist that' },
    { es:'mandar que',      en:'to order/command that' },
    { es:'pedir que',       en:'to ask/request that' },
    { es:'permitir que',    en:'to permit that / to allow' },
    { es:'prohibir que',    en:'to prohibit that / to forbid' },
    { es:'sugerir que',     en:'to suggest that' },
  ],

  sentenceCompletionDrills: [
    { sentence:'Me alegro de que Uds. ___ bien.',           answer:'estén',   choices:['estén','están','estar','estaban'],     fills:['estén'],   en:'I am glad that you are well.',              rule:'alegrarse de que → subjunctive (estar irregular: estén)' },
    { sentence:'Esperamos que Ud. ___ buen fin de semana.', answer:'tenga',   choices:['tenga','tiene','tener','tendrá'],     fills:['tenga'],   en:'We hope you have a good weekend.',          rule:'esperar que → subjunctive (tener: tengo → tenga)' },
    { sentence:'Lo siento que Ud. no ___ la lotería.',      answer:'gane',    choices:['gane','gana','ganar','ganará'],       fills:['gane'],    en:'I am sorry that you don\'t win the lottery.',rule:'sentir que → subjunctive' },
    { sentence:'El capitán manda que los soldados ___.',    answer:'descansen',choices:['descansen','descansan','descansar','descansaron'], fills:['descansen'], en:'The captain orders the soldiers to rest.', rule:'mandar que → subjunctive' },
    { sentence:'Les pido que ___ mejor la idea.',           answer:'expliquen',choices:['expliquen','explican','explicar','explicarán'], fills:['expliquen'], en:'I ask them to explain the idea better.',  rule:'pedir que → subjunctive; c→qu spelling change' },
    { sentence:'Te digo que ___ al doctor.',                answer:'vayas',   choices:['vayas','vas','ir','irás'],            fills:['vayas'],   en:'I tell you to go to the doctor.',           rule:'decir (command use) → subjunctive; ir irregular: vayas' },
    { sentence:'José dice que el tren ___. (fact)',         answer:'viene',   choices:['viene','venga','venir','vino'],       fills:['viene'],   en:'José says the train is coming.',            rule:'decir (informing) → indicative, NOT subjunctive' },
    { sentence:'Ella duda que yo ___ tocar el piano.',      answer:'sepa',    choices:['sepa','sé','saber','sabré'],          fills:['sepa'],    en:'She doubts that I know how to play piano.', rule:'dudar que → subjunctive; saber irregular: sepa' },
    { sentence:'No ___ que sea la verdad.',                 answer:'creemos', choices:['creemos','creo','creen','crees'],     fills:['creemos'], en:'We don\'t believe it is the truth.',        rule:'no creer que → subjunctive (choose the right indicative conjugation of creer for main clause)' },
    { sentence:'___ que ella viene. (I believe — fact)',    answer:'Creo',    choices:['Creo','Dudo','No creo','Espero'],     fills:['Creo'],    en:'I believe that she is coming.',             rule:'Affirming → indicative in dependent clause (viene, not venga)' },
  ],
};

/* ════════════════════════════════════════════════════════════════════════════
   SUB-LESSON 13-4 — Conjunctions + Adjective Clauses + Special Expressions
   ════════════════════════════════════════════════════════════════════════════ */

const SUBLESSON_13_4 = {
  id: '13-4',
  chapterId: 13,
  title: 'Conjunctions, Adjective Clauses, and Special Expressions',
  subtitle: 'antes de que · cuando · ojalá · tal vez · busco un apartamento que…',

  rules: [
    {
      id: 'r1',
      heading: 'Conjunctions that always trigger subjunctive',
      body: 'Some conjunctions always require the subjunctive when there are two different subjects, because they imply purpose, condition, or action before it has happened.',
      examples: [
        { es: 'Él enseña para que los estudiantes aprendan.', en: 'He teaches so that the students learn.' },
        { es: 'Voy a esperar hasta que tú llegues.',         en: 'I am going to wait until you arrive.' },
        { es: 'Lo haré sin que Ud. me ayude.',               en: 'I\'ll do it without your helping me.' },
        { es: 'Vamos a bailar a menos que no haya música.',  en: 'We are going to dance unless there is no music.' },
      ],
      tip: 'One subject = infinitive (Ella estudia para aprender). Two subjects = subjunctive (Ella estudia para que él aprenda).',
    },
    {
      id: 'r2',
      heading: 'Cuando — subjunctive for future, indicative for present/habit',
      body: 'Cuando is unique: it takes subjunctive when referring to a future action, but indicative for habitual or general present actions.',
      examples: [
        { es: 'Vamos a viajar cuando tengamos dinero.',     en: 'We will travel when we have money. (future → subjunctive)' },
        { es: 'Cuando hace frío, los niños juegan.',        en: 'When it is cold, the children play. (habit → indicative)' },
        { es: '¿Cuándo vas a estar en casa?',              en: 'When are you going to be home? (question → indicative)' },
      ],
    },
    {
      id: 'r3',
      heading: 'Adjective clauses — indefinite or nonexistent antecedents',
      body: 'The subjunctive is used in the dependent clause when the noun it describes is unknown, indefinite, or nonexistent.',
      examples: [
        { es: 'Busco un apartamento que sea grande.',       en: 'I am looking for an apartment that is big. (indefinite)' },
        { es: 'No hay nadie que siempre tenga razón.',      en: 'There is no one who is always right. (nonexistent)' },
        { es: 'Conozco un apartamento que es grande.',      en: 'I know an apartment that is big. (specific, known → indicative)' },
      ],
    },
    {
      id: 'r4',
      heading: 'Special expressions — ojalá, tal vez, quizás, aunque',
      body: 'Ojalá always takes the subjunctive. Tal vez and quizás take the subjunctive when expressing doubt. Aunque takes the subjunctive for future/hypothetical, indicative for known facts.',
      examples: [
        { es: 'Ojalá que ella tenga suerte.',              en: 'I hope/would to God that she has luck.' },
        { es: 'Tal vez ellos me digan la verdad.',         en: 'Perhaps they will tell me the truth.' },
        { es: 'Aunque sea difícil, él lo puede hacer.',   en: 'Although it may be difficult, he can do it. (hypothetical)' },
        { es: 'Aunque está enfermo, va al trabajo.',       en: 'Although he is sick, he goes to work. (known fact)' },
      ],
    },
  ],

  conjunctions: [
    { es:'antes de que',    en:'before',                alwaysSubjunctive: true },
    { es:'para que',        en:'so that / in order that', alwaysSubjunctive: true },
    { es:'sin que',         en:'without',               alwaysSubjunctive: true },
    { es:'a menos que',     en:'unless',                alwaysSubjunctive: true },
    { es:'hasta que',       en:'until',                 alwaysSubjunctive: true },
    { es:'en caso de que',  en:'in case',               alwaysSubjunctive: true },
    { es:'después de que',  en:'after',                 alwaysSubjunctive: true },
    { es:'a pesar de que',  en:'in spite of',           alwaysSubjunctive: true },
    { es:'cuando',          en:'when (future implied)', alwaysSubjunctive: false, note:'indicative for habit/fact' },
    { es:'aunque',          en:'although/even if',      alwaysSubjunctive: false, note:'indicative for known facts' },
    { es:'luego que',       en:'as soon as',            alwaysSubjunctive: true },
    { es:'tan pronto como', en:'as soon as',            alwaysSubjunctive: true },
  ],

  sentenceCompletionDrills: [
    { sentence:'Él enseña para que los estudiantes ___.',   answer:'aprendan', choices:['aprendan','aprenden','aprender','aprendieron'], fills:['aprendan'], en:'He teaches so that the students learn.',   rule:'para que → always subjunctive' },
    { sentence:'Voy a esperar hasta que tú ___.',           answer:'llegues',  choices:['llegues','llegas','llegar','llegaste'],  fills:['llegues'],  en:'I will wait until you arrive.',             rule:'hasta que → always subjunctive' },
    { sentence:'Vamos a bailar a menos que no ___ música.', answer:'haya',     choices:['haya','hay','haber','había'],           fills:['haya'],     en:'We\'ll dance unless there is no music.',    rule:'a menos que → always subjunctive; haber irregular: haya' },
    { sentence:'Vamos a viajar cuando ___ dinero.',         answer:'tengamos', choices:['tengamos','tenemos','tener','tuvimos'], fills:['tengamos'], en:'We will travel when we have money.',         rule:'cuando + future → subjunctive; tener: tengo → tengamos' },
    { sentence:'Cuando hace frío, los niños ___ en la nieve.', answer:'juegan', choices:['juegan','jueguen','jugar','jugaron'],  fills:['juegan'],   en:'When it is cold, the children play.',       rule:'cuando + habitual present → indicative' },
    { sentence:'Busco un apartamento que ___ grande.',      answer:'sea',      choices:['sea','es','estar','será'],             fills:['sea'],      en:'I am looking for an apartment that is big.', rule:'indefinite antecedent → subjunctive; ser irregular: sea' },
    { sentence:'No hay nadie que siempre ___ razón.',       answer:'tenga',    choices:['tenga','tiene','tener','tuvo'],        fills:['tenga'],    en:'There is no one who is always right.',      rule:'nonexistent antecedent → subjunctive; tener: tengo → tenga' },
    { sentence:'Conozco un apartamento que ___ grande.',    answer:'es',       choices:['es','sea','ser','está'],               fills:['es'],       en:'I know an apartment that is big. (specific)', rule:'known specific antecedent → indicative' },
    { sentence:'Ojalá que ella ___ suerte.',                answer:'tenga',    choices:['tenga','tiene','tener','tuvo'],        fills:['tenga'],    en:'I hope she has luck.',                      rule:'ojalá → always subjunctive' },
    { sentence:'Tal vez ellos me ___ la verdad.',           answer:'digan',    choices:['digan','dicen','decir','dijeron'],     fills:['digan'],    en:'Perhaps they will tell me the truth.',      rule:'tal vez + doubt → subjunctive; decir: digo → digan' },
    { sentence:'Aunque ___ difícil, él lo puede hacer.',   answer:'sea',      choices:['sea','es','estar','fue'],              fills:['sea'],      en:'Although it may be difficult, he can do it.', rule:'aunque + hypothetical → subjunctive; ser irregular: sea' },
    { sentence:'Aunque ___ enfermo, va al trabajo.',       answer:'está',     choices:['está','esté','estar','estaba'],        fills:['está'],     en:'Although he is sick, he goes to work.',     rule:'aunque + known fact → indicative' },
  ],
};

/* ════════════════════════════════════════════════════════════════════════════
   Utility — conjugate any verb in the present subjunctive from yo indicative
   ════════════════════════════════════════════════════════════════════════════ */

function subjunctiveFromYo(yoForm, type, pronoun) {
  /* Remove -o from yo form to get subjunctive stem */
  const stem = yoForm.endsWith('o') ? yoForm.slice(0, -1) : yoForm;
  const AR = { 'yo':'-e','tú':'-es','él/ella':'-e','nosotros':'-emos','vosotros':'-éis','ellos':'-en','Ud.':'-e','Uds.':'-en' };
  const ER = { 'yo':'-a','tú':'-as','él/ella':'-a','nosotros':'-amos','vosotros':'-áis','ellos':'-an','Ud.':'-a','Uds.':'-an' };
  const map = type === 'ar' ? AR : ER; /* er and ir use same endings in subjunctive */
  const ending = map[pronoun] || '-e';
  return stem + ending.slice(1);
}

/* ════════════════════════════════════════════════════════════════════════════
   Chapter 13 export
   ════════════════════════════════════════════════════════════════════════════ */

const CHAPTER_13 = {
  id: 13,
  title: 'The Present Subjunctive',
  unlocked: false,
  sublessons: [SUBLESSON_13_1, SUBLESSON_13_2, SUBLESSON_13_3, SUBLESSON_13_4],
};

export default CHAPTER_13;
export { SUBLESSON_13_1, SUBLESSON_13_2, SUBLESSON_13_3, SUBLESSON_13_4, subjunctiveFromYo };
