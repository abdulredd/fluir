/* ─── Fluir · Chapter 9 Data ────────────────────────────────────────────────
   Source: Complete Spanish Step-by-Step, Bregstein (McGraw-Hill)
   Chapter 9: Negatives and Prepositions
   4 sub-lessons (Option A):
     9-1  Negatives and affirmatives
     9-2  Basic prepositions + verb-phrase prepositions (antes de, después de…)
     9-3  Por vs para + pronouns after prepositions
     9-4  Location prepositions + common por expressions
   ─────────────────────────────────────────────────────────────────────────── */

/* ════════════════════════════════════════════════════════════════════════════
   SUB-LESSON 9-1 — Negatives and Affirmatives
   ════════════════════════════════════════════════════════════════════════════ */

const SUBLESSON_9_1 = {
  id: '9-1',
  chapterId: 9,
  title: 'Negatives and Affirmatives',
  subtitle: 'nada · nadie · nunca · jamás · ninguno',

  rules: [
    {
      id: 'r1',
      heading: 'Negative words — Spanish uses double negatives',
      body: 'In Spanish, place no before the verb and the negative word after it. Unlike English, double negatives are correct and required. The more negatives, the more emphatic the sentence.',
      examples: [
        { es: 'No tengo nada en mi bolsa.',   en: 'I have nothing in my bag.', note: 'no + verb + nada' },
        { es: 'No hay nadie aquí.',           en: 'There is no one here.' },
        { es: 'Ella no habla nunca.',         en: 'She never talks.' },
        { es: 'Ella no quiere hacer nada.',   en: 'She doesn\'t want to do anything.' },
      ],
      tip: 'Negative words can also go BEFORE the verb — then no is dropped: Nadie quiere cocinar. Nunca bailo. Jamás habla.',
    },
    {
      id: 'r2',
      heading: 'Affirmative ↔ negative pairs',
      body: 'Every negative word has an affirmative counterpart. Knowing both lets you flip any sentence from positive to negative.',
      examples: [
        { es: 'algo ↔ nada',              en: 'something ↔ nothing' },
        { es: 'alguien ↔ nadie',          en: 'someone ↔ no one' },
        { es: 'siempre ↔ nunca / jamás',  en: 'always ↔ never' },
        { es: 'alguno ↔ ninguno',         en: 'some ↔ not one / none' },
        { es: 'a veces ↔ nunca',          en: 'sometimes ↔ never' },
      ],
    },
    {
      id: 'r3',
      heading: 'Nada and algo as adverbs',
      body: 'Nada and algo can modify adjectives as adverbs. Nada = not at all. Algo = somewhat.',
      examples: [
        { es: 'El libro es algo interesante.',     en: 'The book is somewhat interesting.' },
        { es: 'El libro no es nada interesante.',  en: 'The book is not interesting at all.' },
      ],
    },
  ],

  sentenceCompletionDrills: [
    { sentence:'No tengo ___ en mi bolsa.',             answer:'nada',   choices:['nada','nadie','nunca','algo'],      fills:['nada'],   en:'I have nothing in my bag.',                 rule:'nada = nothing (after verb)' },
    { sentence:'No hay ___ aquí.',                      answer:'nadie',  choices:['nadie','nada','nunca','alguien'],   fills:['nadie'],  en:'There is no one here.',                     rule:'nadie = no one (after verb)' },
    { sentence:'Ella no habla ___; es muy tímida.',     answer:'nunca',  choices:['nunca','nada','nadie','jamás'],     fills:['nunca'],  en:'She never talks; she is very shy.',          rule:'nunca = never (after verb, no before verb)' },
    { sentence:'___ quiere cocinar esta noche.',        answer:'Nadie',  choices:['Nadie','Nada','Nunca','Ninguno'],   fills:['Nadie'],  en:'No one wants to cook tonight.',              rule:'nadie before verb — no is dropped' },
    { sentence:'___ bailo en las fiestas.',             answer:'Nunca',  choices:['Nunca','Nadie','Nada','Jamás'],     fills:['Nunca'],  en:'I never dance at parties.',                  rule:'nunca before verb — no is dropped' },
    { sentence:'¿Hay ___ aquí? No, no hay nadie.',      answer:'alguien',choices:['alguien','algo','siempre','nadie'], fills:['alguien'],en:'Is there someone here? No, there is no one.', rule:'alguien = someone (affirmative)' },
    { sentence:'¿Tienes ___ para ella? No, no tengo nada.', answer:'algo', choices:['algo','alguien','siempre','nada'], fills:['algo'], en:'Do you have something for her? No, I have nothing.', rule:'algo = something (affirmative)' },
    { sentence:'Ella no quiere hacer ___.',             answer:'nada',   choices:['nada','nadie','nunca','algo'],      fills:['nada'],   en:'She doesn\'t want to do anything.',          rule:'two verbs: no before first, nada after second' },
    { sentence:'No vamos a escribir ___.',              answer:'nada',   choices:['nada','nadie','nunca','algo'],      fills:['nada'],   en:'We are not going to write anything.',         rule:'ir + a + inf: no before ir, nada after infinitive' },
    { sentence:'El libro es ___ interesante.',          answer:'algo',   choices:['algo','nada','muy','nunca'],        fills:['algo'],   en:'The book is somewhat interesting.',          rule:'algo as adverb = somewhat' },
  ],

  vocabulary: [
    { id:'neg9_1',  es:'nada',     en:'nothing / not at all',    gender:'n', rule:'invariable', article:'', plural:'', ex:'No tengo nada.',             exEn:'I have nothing.' },
    { id:'neg9_2',  es:'nadie',    en:'no one / nobody',         gender:'n', rule:'invariable', article:'', plural:'', ex:'No hay nadie.',              exEn:'There is no one.' },
    { id:'neg9_3',  es:'nunca',    en:'never',                   gender:'n', rule:'invariable', article:'', plural:'', ex:'Nunca bailo.',               exEn:'I never dance.' },
    { id:'neg9_4',  es:'jamás',    en:'never (emphatic)',         gender:'n', rule:'invariable', article:'', plural:'', ex:'Él no baila jamás.',         exEn:'He never dances.' },
    { id:'neg9_5',  es:'ninguno',  en:'not one / none',          gender:'n', rule:'ends_o',     article:'', plural:'', ex:'No hay ningún problema.',    exEn:'There is no problem.' },
    { id:'neg9_6',  es:'algo',     en:'something / somewhat',    gender:'n', rule:'invariable', article:'', plural:'', ex:'¿Tienes algo para ella?',    exEn:'Do you have something for her?' },
    { id:'neg9_7',  es:'alguien',  en:'someone / somebody',      gender:'n', rule:'invariable', article:'', plural:'', ex:'¿Hay alguien aquí?',         exEn:'Is there someone here?' },
    { id:'neg9_8',  es:'siempre',  en:'always',                  gender:'n', rule:'invariable', article:'', plural:'', ex:'Ella siempre estudia.',      exEn:'She always studies.' },
    { id:'neg9_9',  es:'a veces',  en:'sometimes',               gender:'n', rule:'invariable', article:'', plural:'', ex:'A veces voy al cine.',       exEn:'Sometimes I go to the movies.' },
    { id:'neg9_10', es:'también',  en:'also / too',              gender:'n', rule:'invariable', article:'', plural:'', ex:'Quiero ir también.',         exEn:'I want to go too.' },
    { id:'neg9_11', es:'tampoco',  en:'neither / not either',    gender:'n', rule:'invariable', article:'', plural:'', ex:'Ella no quiere ir tampoco.', exEn:'She doesn\'t want to go either.' },
  ],
};

/* ════════════════════════════════════════════════════════════════════════════
   SUB-LESSON 9-2 — Basic Prepositions + Verb-Phrase Prepositions
   ════════════════════════════════════════════════════════════════════════════ */

const SUBLESSON_9_2 = {
  id: '9-2',
  chapterId: 9,
  title: 'Prepositions',
  subtitle: 'a · con · de · en · para · sin · antes de · después de…',

  rules: [
    {
      id: 'r1',
      heading: 'Basic prepositions',
      body: 'You already know the six core prepositions. They can be followed by an infinitive, a noun, or a pronoun. When a Spanish infinitive follows a preposition, English often translates it as a gerund (-ing).',
      examples: [
        { es: 'Ella estudia para aprender.',   en: 'She studies in order to learn.' },
        { es: 'Él habla sin pensar.',          en: 'He speaks without thinking.' },
        { es: 'Ella va con nosotros.',         en: 'She goes with us.' },
        { es: 'El libro es de la biblioteca.', en: 'The book is from the library.' },
      ],
    },
    {
      id: 'r2',
      heading: 'Prepositions followed by verbs or nouns',
      body: 'These compound prepositions express time relationships and are always followed by an infinitive or a noun phrase.',
      examples: [
        { es: 'Antes de nadar, ella quiere comer.',     en: 'Before swimming, she wants to eat.' },
        { es: 'Después de correr, tienen sed.',         en: 'After running, they are thirsty.' },
        { es: 'En vez de correr, prefiere caminar.',    en: 'Instead of running, he prefers to walk.' },
        { es: 'A pesar de estar enfermo, va al trabajo.', en: 'In spite of being sick, he goes to work.' },
        { es: 'Además de ser valiente, es simpática.',  en: 'In addition to being brave, she is nice.' },
      ],
      tip: 'Pattern: preposition + de + infinitive OR preposition + de + noun. The infinitive never changes — it stays in its base form.',
    },
    {
      id: 'r3',
      heading: 'Other prepositions followed by nouns or pronouns',
      body: 'These prepositions cannot be followed by infinitives — only nouns or pronouns follow them.',
      examples: [
        { es: 'contra la pared',    en: 'against the wall' },
        { es: 'durante el verano',  en: 'during the summer' },
        { es: 'entre amigos',       en: 'among friends' },
        { es: 'hasta las tres',     en: 'until three o\'clock' },
        { es: 'según él',           en: 'according to him' },
        { es: 'sobre la historia',  en: 'about history' },
      ],
    },
  ],

  vocabulary: [
    { id:'prep9_1',  es:'antes de',    en:'before (+ infinitive/noun)',     gender:'n', rule:'invariable', article:'', plural:'', ex:'Antes de la clase, ellos estudian.',      exEn:'Before class, they study.' },
    { id:'prep9_2',  es:'después de',  en:'after (+ infinitive/noun)',      gender:'n', rule:'invariable', article:'', plural:'', ex:'Después de correr, tienen sed.',          exEn:'After running, they are thirsty.' },
    { id:'prep9_3',  es:'en vez de',   en:'instead of',                    gender:'n', rule:'invariable', article:'', plural:'', ex:'En vez de correr, él prefiere caminar.',  exEn:'Instead of running, he prefers to walk.' },
    { id:'prep9_4',  es:'a pesar de',  en:'in spite of',                   gender:'n', rule:'invariable', article:'', plural:'', ex:'A pesar de estar enfermo, va al trabajo.',exEn:'In spite of being sick, he goes to work.' },
    { id:'prep9_5',  es:'además de',   en:'in addition to',                gender:'n', rule:'invariable', article:'', plural:'', ex:'Además de ser valiente, es simpática.',   exEn:'In addition to being brave, she is nice.' },
    { id:'prep9_6',  es:'contra',      en:'against',                       gender:'n', rule:'invariable', article:'', plural:'', ex:'El niño corre contra la pared.',          exEn:'The child runs against the wall.' },
    { id:'prep9_7',  es:'durante',     en:'during',                        gender:'n', rule:'invariable', article:'', plural:'', ex:'Hay fiestas durante el verano.',          exEn:'There are parties during the summer.' },
    { id:'prep9_8',  es:'entre',       en:'between / among',               gender:'n', rule:'invariable', article:'', plural:'', ex:'La librería está entre el banco y el hotel.', exEn:'The bookstore is between the bank and the hotel.' },
    { id:'prep9_9',  es:'hasta',       en:'until / up to',                 gender:'n', rule:'invariable', article:'', plural:'', ex:'Ella trabaja hasta las tres.',            exEn:'She works until three.' },
    { id:'prep9_10', es:'según',       en:'according to',                  gender:'n', rule:'invariable', article:'', plural:'', ex:'Según él, la lección es fácil.',          exEn:'According to him, the lesson is easy.' },
    { id:'prep9_11', es:'sobre',       en:'about / on top of / around',    gender:'n', rule:'invariable', article:'', plural:'', ex:'El autor escribe sobre la historia.',     exEn:'The author writes about history.' },
    { id:'prep9_12', es:'desde',       en:'from / since (point of departure)', gender:'n', rule:'invariable', article:'', plural:'', ex:'Veo el río desde mi ventana.',       exEn:'I see the river from my window.' },
    { id:'prep9_13', es:'hacia',       en:'toward',                        gender:'n', rule:'invariable', article:'', plural:'', ex:'Los niños corren hacia nosotros.',        exEn:'The children run toward us.' },
    { id:'prep9_14', es:'sin',         en:'without',                       gender:'n', rule:'invariable', article:'', plural:'', ex:'Él habla sin pensar.',                   exEn:'He speaks without thinking.' },
  ],

  sentenceCompletionDrills: [
    { sentence:'Ella estudia ___ aprender.',             answer:'para',        choices:['para','por','sin','de'],            fills:['para'],        en:'She studies in order to learn.',             rule:'para + infinitive = in order to' },
    { sentence:'Él habla ___ pensar.',                   answer:'sin',         choices:['sin','para','con','antes de'],       fills:['sin'],         en:'He speaks without thinking.',               rule:'sin + infinitive = without doing' },
    { sentence:'___ nadar, ella quiere comer.',          answer:'Antes de',    choices:['Antes de','Después de','En vez de','A pesar de'], fills:['Antes de'], en:'Before swimming, she wants to eat.',    rule:'antes de + infinitive = before doing' },
    { sentence:'___ correr, ellos tienen sed.',          answer:'Después de',  choices:['Después de','Antes de','En vez de','Además de'], fills:['Después de'], en:'After running, they are thirsty.',     rule:'después de + infinitive = after doing' },
    { sentence:'___ correr, él prefiere caminar.',       answer:'En vez de',   choices:['En vez de','Antes de','Después de','A pesar de'], fills:['En vez de'], en:'Instead of running, he prefers to walk.', rule:'en vez de + infinitive = instead of doing' },
    { sentence:'___ estar enfermo, va al trabajo.',      answer:'A pesar de',  choices:['A pesar de','Además de','Antes de','En vez de'], fills:['A pesar de'], en:'In spite of being sick, he goes to work.', rule:'a pesar de + infinitive = in spite of doing' },
    { sentence:'La librería está ___ el banco y el hotel.', answer:'entre',   choices:['entre','durante','hacia','contra'],  fills:['entre'],       en:'The bookstore is between the bank and the hotel.', rule:'entre = between / among' },
    { sentence:'Ella trabaja ___ las tres de la tarde.', answer:'hasta',       choices:['hasta','desde','durante','según'],   fills:['hasta'],       en:'She works until three in the afternoon.',    rule:'hasta = until' },
    { sentence:'Veo el río ___ mi ventana.',             answer:'desde',       choices:['desde','hasta','sobre','entre'],     fills:['desde'],       en:'I see the river from my window.',            rule:'desde = from (specific point of departure)' },
  ],
};

/* ════════════════════════════════════════════════════════════════════════════
   SUB-LESSON 9-3 — Por vs Para + Pronouns After Prepositions
   ════════════════════════════════════════════════════════════════════════════ */

const SUBLESSON_9_3 = {
  id: '9-3',
  chapterId: 9,
  title: 'Por vs Para',
  subtitle: 'The hardest preposition distinction in Spanish',

  rules: [
    {
      id: 'r1',
      heading: 'Para — for (recipient, purpose, deadline)',
      body: 'Para expresses who something is for, the purpose of an action, or a future deadline. It is the default meaning of "for" in most situations.',
      examples: [
        { es: 'El regalo es para su hijo.',        en: 'The gift is for her son.', note: 'recipient' },
        { es: 'Ella estudia para aprender.',       en: 'She studies in order to learn.', note: 'purpose' },
        { es: 'Necesito la blusa para el viernes.',en: 'I need the blouse by Friday.', note: 'deadline' },
        { es: 'El tren sale para Canadá.',         en: 'The train is leaving for Canada.', note: 'destination' },
      ],
    },
    {
      id: 'r2',
      heading: 'Por — through, because of, per, in exchange for, duration',
      body: 'Por covers a cluster of meanings that relate to cause, means, exchange, and duration. It is never the default "for" — use para for that.',
      examples: [
        { es: 'Preferimos viajar por avión.',      en: 'We prefer to travel by plane.', note: 'means/method' },
        { es: 'Él está triste por el mal clima.',  en: 'He is sad because of the bad weather.', note: 'cause' },
        { es: 'Pago diez dólares por este vestido.',en: 'I pay $10 for (in exchange for) this dress.', note: 'exchange' },
        { es: 'Corro por una hora cada día.',      en: 'I run for one hour each day.', note: 'duration of time' },
        { es: 'Él gana quinientos dólares por semana.', en: 'He earns $500 per week.', note: 'per' },
      ],
      tip: 'Quick test: can you substitute "in exchange for," "because of," "through," or "per"? → use por. Is it a recipient, purpose, or deadline? → use para.',
    },
    {
      id: 'r3',
      heading: 'Pronouns after prepositions',
      body: 'Subject pronouns follow prepositions except mí (me) and ti (you). Con has special combined forms: conmigo, contigo, consigo.',
      examples: [
        { es: 'El libro es para mí.',    en: 'The book is for me.', note: 'mí not yo' },
        { es: '¿Quieres salir conmigo?', en: 'Do you want to go out with me?', note: 'conmigo not con mí' },
        { es: 'No quiero salir sin ti.', en: 'I don\'t want to leave without you.', note: 'ti not tú' },
        { es: 'Ella lleva su bolsa consigo.', en: 'She carries her bag with her.', note: 'consigo = with herself' },
      ],
    },
  ],

  porVsParaDrills: [
    { sentence:'El regalo es ___ su hijo.',            answer:'para', choices:['para','por'],  fills:['para'], en:'The gift is for her son.',                rule:'para = for (recipient)' },
    { sentence:'Necesito la blusa ___ el viernes.',    answer:'para', choices:['para','por'],  fills:['para'], en:'I need the blouse by Friday.',            rule:'para = by (deadline)' },
    { sentence:'Prefiero viajar ___ avión.',           answer:'por',  choices:['para','por'],  fills:['por'],  en:'I prefer to travel by plane.',            rule:'por = by (means/method)' },
    { sentence:'Él está triste ___ el mal clima.',     answer:'por',  choices:['para','por'],  fills:['por'],  en:'He is sad because of the bad weather.',   rule:'por = because of (cause)' },
    { sentence:'Corro ___ una hora cada día.',         answer:'por',  choices:['para','por'],  fills:['por'],  en:'I run for one hour each day.',            rule:'por = for (duration of time)' },
    { sentence:'Él gana quinientos dólares ___ semana.',answer:'por', choices:['para','por'],  fills:['por'],  en:'He earns $500 per week.',                 rule:'por = per' },
    { sentence:'Pago diez dólares ___ este vestido.',  answer:'por',  choices:['para','por'],  fills:['por'],  en:'I pay $10 for this dress.',               rule:'por = in exchange for' },
    { sentence:'El tren sale ___ Canadá.',             answer:'para', choices:['para','por'],  fills:['para'], en:'The train is leaving for Canada.',         rule:'para = for (destination)' },
    { sentence:'Queremos una habitación ___ dos personas ___ una noche.', answer:'para...por', choices:['para...por','por...para','para...para','por...por'], fills:['para','por'], en:'We want a room for two people for one night.', rule:'para = for (recipient) · por = for (duration)' },
    { sentence:'Voy a viajar ___ varios meses.',       answer:'por',  choices:['para','por'],  fills:['por'],  en:'I am going to travel for several months.', rule:'por = for (period of time)' },
  ],

  pronounDrills: [
    { sentence:'El libro es para ___.',               answer:'mí',      choices:['mí','yo','me','mi'],         fills:['mí'],      en:'The book is for me.',              rule:'mí not yo after prepositions (except entre/según/salvo)' },
    { sentence:'No quiero salir sin ___.',            answer:'ti',      choices:['ti','tú','te','tu'],         fills:['ti'],      en:'I don\'t want to leave without you.',rule:'ti not tú after prepositions' },
    { sentence:'¿Quieres salir ___ mañana?',          answer:'conmigo', choices:['conmigo','con mí','con yo','con me'], fills:['conmigo'], en:'Do you want to go out with me tomorrow?', rule:'con + mí = conmigo (special form)' },
    { sentence:'¿Vas a ir ___ al cine?',              answer:'conmigo', choices:['conmigo','con mí','contigo','con yo'], fills:['conmigo'], en:'Are you going to go with me to the movies?', rule:'conmigo = with me' },
    { sentence:'Este regalo es para ___.',            answer:'ti',      choices:['ti','tú','te','tu'],         fills:['ti'],      en:'This gift is for you.',            rule:'ti after prepositions (except con)' },
    { sentence:'Ella lleva su bolsa ___.',            answer:'consigo', choices:['consigo','con ella','con sí','con su'], fills:['consigo'], en:'She carries her bag with her.',  rule:'consigo = with herself/himself/themselves' },
  ],
};

/* ════════════════════════════════════════════════════════════════════════════
   SUB-LESSON 9-4 — Location Prepositions + Por Expressions
   ════════════════════════════════════════════════════════════════════════════ */

const SUBLESSON_9_4 = {
  id: '9-4',
  chapterId: 9,
  title: 'Location Prepositions and Por Expressions',
  subtitle: 'al lado de · cerca de · por favor · por fin…',

  rules: [
    {
      id: 'r1',
      heading: 'Compound location prepositions',
      body: 'These expressions describe physical relationships between objects. They all end in de and are followed by a noun or pronoun.',
      examples: [
        { es: 'El sartén está sobre la estufa.',    en: 'The pan is on top of the stove.' },
        { es: 'El gato está debajo de la mesa.',    en: 'The cat is underneath the table.' },
        { es: 'La librería está cerca del banco.',  en: 'The bookstore is near the bank.' },
        { es: 'El baño está detrás del salón.',     en: 'The bathroom is behind the classroom.' },
      ],
    },
    {
      id: 'r2',
      heading: 'Common por expressions — memorize these',
      body: 'Por appears in many fixed expressions that must be learned as vocabulary. These are high-frequency in everyday Spanish.',
      examples: [
        { es: 'por favor',       en: 'please' },
        { es: 'por fin',         en: 'finally / at last' },
        { es: 'por supuesto',    en: 'of course' },
        { es: 'por eso',         en: 'therefore / for this reason' },
        { es: 'por ejemplo',     en: 'for example' },
        { es: 'por lo menos',    en: 'at least' },
      ],
    },
  ],

  locationPrepositions: [
    { es:'al lado de',      en:'next to',                    ex:'La farmacia está al lado del banco.',      exEn:'The pharmacy is next to the bank.' },
    { es:'alrededor de',    en:'around',                     ex:'Hay árboles alrededor de la casa.',        exEn:'There are trees around the house.' },
    { es:'cerca de',        en:'near',                       ex:'Hay un restaurante cerca del hotel.',      exEn:'There is a restaurant near the hotel.' },
    { es:'debajo de',       en:'underneath / below',         ex:'El gato está debajo de la mesa.',          exEn:'The cat is underneath the table.' },
    { es:'delante de',      en:'in front of',                ex:'El carro está delante del edificio.',      exEn:'The car is in front of the building.' },
    { es:'dentro de',       en:'inside of',                  ex:'Los libros están dentro de la bolsa.',     exEn:'The books are inside the bag.' },
    { es:'detrás de',       en:'behind',                     ex:'El baño está detrás del salón.',           exEn:'The bathroom is behind the classroom.' },
    { es:'encima de',       en:'on top of',                  ex:'El sartén está encima de la estufa.',      exEn:'The pan is on top of the stove.' },
    { es:'enfrente de',     en:'in front of / across from',  ex:'El parque está enfrente del hotel.',       exEn:'The park is across from the hotel.' },
    { es:'fuera de',        en:'outside of',                 ex:'Los estudiantes están fuera de la clase.', exEn:'The students are outside the classroom.' },
    { es:'lejos de',        en:'far from',                   ex:'El aeropuerto está lejos de la ciudad.',   exEn:'The airport is far from the city.' },
    { es:'junto a',         en:'right next to / close to',   ex:'Mi casa está junto a la librería.',        exEn:'My house is right next to the bookstore.' },
  ],

  porExpressions: [
    { es:'por favor',      en:'please',                      ex:'Por favor, ¿dónde está el baño?',         exEn:'Please, where is the bathroom?' },
    { es:'por fin',        en:'finally / at last',           ex:'Por fin llegamos a la ciudad.',           exEn:'We finally arrived at the city.' },
    { es:'por supuesto',   en:'of course',                   ex:'¿Quieres ir? Por supuesto.',              exEn:'Do you want to go? Of course.' },
    { es:'por eso',        en:'therefore / for this reason', ex:'Está lloviendo; por eso no vamos.',       exEn:'It is raining; therefore we are not going.' },
    { es:'por ejemplo',    en:'for example',                 ex:'Por ejemplo, el café es de Colombia.',    exEn:'For example, the coffee is from Colombia.' },
    { es:'por lo menos',   en:'at least',                    ex:'Hay por lo menos cien personas.',         exEn:'There are at least a hundred people.' },
    { es:'por ahora',      en:'for now',                     ex:'Por ahora, vamos a descansar.',           exEn:'For now, we are going to rest.' },
    { es:'por casualidad', en:'by chance',                   ex:'¿Conoces a María por casualidad?',        exEn:'Do you know María by chance?' },
    { es:'por lo común',   en:'usually / generally',         ex:'Por lo común, estudio en la mañana.',     exEn:'Usually, I study in the morning.' },
    { es:'por eso',        en:'therefore',                   ex:'No hay clases; por eso estamos aquí.',    exEn:'There are no classes; therefore we are here.' },
    { es:'por primera vez',en:'for the first time',          ex:'Es la primera vez que viajo a España.',   exEn:'It is the first time I travel to Spain.' },
    { es:'por todas partes',en:'everywhere',                 ex:'Hay música por todas partes.',            exEn:'There is music everywhere.' },
    { es:'por la mañana',  en:'in the morning',              ex:'Estudio por la mañana.',                  exEn:'I study in the morning.' },
    { es:'por la tarde',   en:'in the afternoon',            ex:'Trabajo por la tarde.',                   exEn:'I work in the afternoon.' },
    { es:'por la noche',   en:'in the evening',              ex:'Leo por la noche.',                       exEn:'I read in the evening.' },
  ],
};

/* ════════════════════════════════════════════════════════════════════════════
   Chapter 9 export
   ════════════════════════════════════════════════════════════════════════════ */

const CHAPTER_9 = {
  id: 9,
  title: 'Negatives and Prepositions',
  unlocked: false,
  sublessons: [SUBLESSON_9_1, SUBLESSON_9_2, SUBLESSON_9_3, SUBLESSON_9_4],
};

export default CHAPTER_9;
export { SUBLESSON_9_1, SUBLESSON_9_2, SUBLESSON_9_3, SUBLESSON_9_4 };
