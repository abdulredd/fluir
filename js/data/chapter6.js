/* ─── Fluir · Chapter 6 Data ────────────────────────────────────────────────
   Source: Complete Spanish Step-by-Step, Bregstein (McGraw-Hill)
   Chapter 6: Irregular Verbs
   4 sub-lessons (organized by stem change pattern):
     6-1  e→ie stem-changing verbs (-ar, -er, -ir)
     6-2  o→ue stem-changing verbs (-ar, -er, -ir)
     6-3  Irregular yo forms only
     6-4  Mixed irregular drill
   ─────────────────────────────────────────────────────────────────────────── */

/* ── Utility: conjugate an irregular verb given its full forms table ── */
function conjugateIrr(forms, pronoun) {
  const map = {
    'yo': forms.yo, 'tú': forms.tu, 'él/ella': forms.el,
    'Ud.': forms.el, 'nosotros': forms.nos,
    'vosotros': forms.vos, 'ellos': forms.ellos,
    'ellas': forms.ellos, 'Uds.': forms.ellos,
  };
  return map[pronoun] || forms.yo;
}

/* ════════════════════════════════════════════════════════════════════════════
   SUB-LESSON 6-1 — e→ie stem-changing verbs
   ════════════════════════════════════════════════════════════════════════════ */

const SUBLESSON_6_1 = {
  id: '6-1',
  chapterId: 6,
  title: 'e→ie Stem Changes',
  subtitle: 'cerrar · querer · preferir — the stem vowel e becomes ie',

  rules: [
    {
      id: 'r1',
      heading: 'The stem vowel e changes to ie',
      body: 'In the present tense, the stressed vowel e in the stem changes to ie for all forms EXCEPT nosotros and vosotros. The endings stay exactly the same as regular verbs.',
      examples: [
        { es: 'cerrar → yo cierro',       en: 'to close → I close', note: 'e→ie' },
        { es: 'querer → tú quieres',      en: 'to want → you want', note: 'e→ie' },
        { es: 'preferir → él prefiere',   en: 'to prefer → he prefers', note: 'e→ie' },
        { es: 'nosotros cerramos',         en: 'we close', note: 'nosotros unchanged' },
      ],
      tip: 'Memory trick: the forms that change make a boot shape around the conjugation table — called the "boot verb" pattern.',
    },
    {
      id: 'r2',
      heading: 'Venir — e→ie with irregular yo',
      body: 'Venir follows the e→ie pattern but also has an irregular yo form (vengo, not viengo). It is both a stem-changer AND a yo irregular.',
      examples: [
        { es: 'yo vengo',         en: 'I come', note: 'irregular yo' },
        { es: 'tú vienes',        en: 'you come', note: 'e→ie' },
        { es: 'nosotros venimos', en: 'we come', note: 'unchanged + -ir endings' },
      ],
    },
  ],

  verbs: [
    /* -ar e→ie */
    { infinitive:'cerrar',   en:'to close',   type:'ar', stemChange:'e→ie',
      forms:{ yo:'cierro', tu:'cierras', el:'cierra', nos:'cerramos', vos:'cerráis', ellos:'cierran' },
      ex:'Cierro la ventana porque hay mucho ruido.', exEn:'I close the window because there is a lot of noise.' },
    { infinitive:'empezar',  en:'to begin',   type:'ar', stemChange:'e→ie',
      forms:{ yo:'empiezo', tu:'empiezas', el:'empieza', nos:'empezamos', vos:'empezáis', ellos:'empiezan' },
      ex:'La clase empieza a las ocho en punto.', exEn:'The class begins at eight sharp.' },
    { infinitive:'pensar',   en:'to think',   type:'ar', stemChange:'e→ie',
      forms:{ yo:'pienso', tu:'piensas', el:'piensa', nos:'pensamos', vos:'pensáis', ellos:'piensan' },
      ex:'¿Qué piensas de la situación?', exEn:'What do you think about the situation?' },
    /* -er e→ie */
    { infinitive:'entender', en:'to understand', type:'er', stemChange:'e→ie',
      forms:{ yo:'entiendo', tu:'entiendes', el:'entiende', nos:'entendemos', vos:'entendéis', ellos:'entienden' },
      ex:'Entendemos las ideas difíciles.', exEn:'We understand the difficult ideas.' },
    { infinitive:'perder',   en:'to lose',    type:'er', stemChange:'e→ie',
      forms:{ yo:'pierdo', tu:'pierdes', el:'pierde', nos:'perdemos', vos:'perdéis', ellos:'pierden' },
      ex:'Ella siempre pierde las llaves.', exEn:'She always loses the keys.' },
    { infinitive:'querer',   en:'to want',    type:'er', stemChange:'e→ie',
      forms:{ yo:'quiero', tu:'quieres', el:'quiere', nos:'queremos', vos:'queréis', ellos:'quieren' },
      ex:'¿Quieres viajar a España?', exEn:'Do you want to travel to Spain?' },
    { infinitive:'tener',    en:'to have',    type:'er', stemChange:'e→ie+yo',
      forms:{ yo:'tengo', tu:'tienes', el:'tiene', nos:'tenemos', vos:'tenéis', ellos:'tienen' },
      ex:'Tengo las llaves del edificio.', exEn:'I have the keys to the building.' },
    /* -ir e→ie */
    { infinitive:'mentir',   en:'to lie',     type:'ir', stemChange:'e→ie',
      forms:{ yo:'miento', tu:'mientes', el:'miente', nos:'mentimos', vos:'mentís', ellos:'mienten' },
      ex:'La niña miente y sus padres están enojados.', exEn:'The girl lies and her parents are angry.' },
    { infinitive:'preferir', en:'to prefer',  type:'ir', stemChange:'e→ie',
      forms:{ yo:'prefiero', tu:'prefieres', el:'prefiere', nos:'preferimos', vos:'preferís', ellos:'prefieren' },
      ex:'¿Cuál prefieres, el vino blanco o el tinto?', exEn:'Which do you prefer, white wine or red?' },
    { infinitive:'venir',    en:'to come',    type:'ir', stemChange:'e→ie+yo',
      forms:{ yo:'vengo', tu:'vienes', el:'viene', nos:'venimos', vos:'venís', ellos:'vienen' },
      ex:'Ellos vienen a Nueva York a ver los museos.', exEn:'They come to New York to see the museums.' },
  ],
};

/* ════════════════════════════════════════════════════════════════════════════
   SUB-LESSON 6-2 — o→ue stem-changing verbs
   ════════════════════════════════════════════════════════════════════════════ */

const SUBLESSON_6_2 = {
  id: '6-2',
  chapterId: 6,
  title: 'o→ue Stem Changes',
  subtitle: 'poder · volver · dormir — the stem vowel o becomes ue',

  rules: [
    {
      id: 'r1',
      heading: 'The stem vowel o changes to ue',
      body: 'Same boot pattern as e→ie — all forms change except nosotros and vosotros. The endings remain the same as regular verbs.',
      examples: [
        { es: 'poder → yo puedo',         en: 'can → I can', note: 'o→ue' },
        { es: 'volver → tú vuelves',      en: 'to return → you return', note: 'o→ue' },
        { es: 'dormir → ella duerme',     en: 'to sleep → she sleeps', note: 'o→ue' },
        { es: 'nosotros podemos',          en: 'we can', note: 'nosotros unchanged' },
      ],
      tip: 'Jugar is the only u→ue verb: yo juego, tú juegas — same boot pattern, just u instead of o.',
    },
  ],

  verbs: [
    /* -ar o→ue */
    { infinitive:'almorzar',  en:'to have lunch', type:'ar', stemChange:'o→ue',
      forms:{ yo:'almuerzo', tu:'almuerzas', el:'almuerza', nos:'almorzamos', vos:'almorzáis', ellos:'almuerzan' },
      ex:'Al mediodía almorzamos en un restaurante.', exEn:'At noon we have lunch at a restaurant.' },
    { infinitive:'encontrar', en:'to find',       type:'ar', stemChange:'o→ue',
      forms:{ yo:'encuentro', tu:'encuentras', el:'encuentra', nos:'encontramos', vos:'encontráis', ellos:'encuentran' },
      ex:'Ella encuentra las llaves en la bolsa.', exEn:'She finds the keys in the bag.' },
    { infinitive:'recordar',  en:'to remember',   type:'ar', stemChange:'o→ue',
      forms:{ yo:'recuerdo', tu:'recuerdas', el:'recuerda', nos:'recordamos', vos:'recordáis', ellos:'recuerdan' },
      ex:'¿Recuerdas toda la letra de las canciones?', exEn:'Do you remember all the lyrics to the songs?' },
    { infinitive:'jugar',     en:'to play (sport/game)', type:'ar', stemChange:'u→ue',
      forms:{ yo:'juego', tu:'juegas', el:'juega', nos:'jugamos', vos:'jugáis', ellos:'juegan' },
      ex:'Los muchachos juegan al béisbol todas las tardes.', exEn:'The boys play baseball every afternoon.' },
    /* -er o→ue */
    { infinitive:'devolver',  en:'to return (something)', type:'er', stemChange:'o→ue',
      forms:{ yo:'devuelvo', tu:'devuelves', el:'devuelve', nos:'devolvemos', vos:'devolvéis', ellos:'devuelven' },
      ex:'Devuelvo los libros a la biblioteca.', exEn:'I return the books to the library.' },
    { infinitive:'poder',     en:'to be able to / can', type:'er', stemChange:'o→ue',
      forms:{ yo:'puedo', tu:'puedes', el:'puede', nos:'podemos', vos:'podéis', ellos:'pueden' },
      ex:'Podemos bailar bien.', exEn:'We are able to dance well.' },
    { infinitive:'volver',    en:'to return',     type:'er', stemChange:'o→ue',
      forms:{ yo:'vuelvo', tu:'vuelves', el:'vuelve', nos:'volvemos', vos:'volvéis', ellos:'vuelven' },
      ex:'Volvemos a casa a las cinco.', exEn:'We return home at five.' },
    /* -ir o→ue */
    { infinitive:'dormir',    en:'to sleep',      type:'ir', stemChange:'o→ue',
      forms:{ yo:'duermo', tu:'duermes', el:'duerme', nos:'dormimos', vos:'dormís', ellos:'duermen' },
      ex:'El hombre fuerte duerme ocho horas cada noche.', exEn:'The strong man sleeps eight hours every night.' },
  ],
};

/* ════════════════════════════════════════════════════════════════════════════
   SUB-LESSON 6-3 — Irregular yo forms only
   ════════════════════════════════════════════════════════════════════════════ */

const SUBLESSON_6_3 = {
  id: '6-3',
  chapterId: 6,
  title: 'Irregular yo Forms',
  subtitle: 'hago · pongo · sé · veo · salgo · oigo',

  rules: [
    {
      id: 'r1',
      heading: 'The yo form alone is irregular',
      body: 'Some verbs are perfectly regular in all forms except yo. All other conjugations follow the normal -er or -ir patterns. The yo irregularity must simply be memorized.',
      examples: [
        { es: 'hacer → yo hago',   en: 'to do/make → I do', note: 'all others regular: haces, hace…' },
        { es: 'poner → yo pongo',  en: 'to put → I put', note: 'all others regular: pones, pone…' },
        { es: 'salir → yo salgo',  en: 'to leave → I leave', note: 'all others regular: sales, sale…' },
        { es: 'ver → yo veo',      en: 'to see → I see', note: 'all others: ves, ve, vemos…' },
      ],
      tip: 'Saber has a completely unique yo form: yo sé (just two letters). All other forms are regular: sabes, sabe, sabemos, saben.',
    },
    {
      id: 'r2',
      heading: 'Sentence formation — chaining verbs',
      body: 'Two or three verbs can be chained. The first verb is conjugated; the second stays as an infinitive. No comes directly before the first verb to negate.',
      examples: [
        { es: 'Yo no quiero cantar.',          en: 'I don\'t want to sing.' },
        { es: 'Podemos bailar bien.',           en: 'We are able to dance well.' },
        { es: 'Susana quiere poder hablar español.', en: 'Susan wants to be able to speak Spanish.' },
      ],
    },
  ],

  verbs: [
    { infinitive:'hacer',  en:'to do / to make',       type:'er', stemChange:'yo-irreg',
      forms:{ yo:'hago',  tu:'haces',  el:'hace',  nos:'hacemos',  vos:'hacéis',  ellos:'hacen'  },
      ex:'¿Qué haces el fin de semana?', exEn:'What do you do on the weekend?' },
    { infinitive:'poner',  en:'to put',                type:'er', stemChange:'yo-irreg',
      forms:{ yo:'pongo', tu:'pones',  el:'pone',  nos:'ponemos',  vos:'ponéis',  ellos:'ponen'  },
      ex:'¿Dónde pones los platos y los cubiertos?', exEn:'Where do you put the plates and silverware?' },
    { infinitive:'saber',  en:'to know (a fact/how to)',type:'er', stemChange:'yo-irreg',
      forms:{ yo:'sé',    tu:'sabes',  el:'sabe',  nos:'sabemos',  vos:'sabéis',  ellos:'saben'  },
      ex:'Sabemos cantar bien también.', exEn:'We know how to sing well too.' },
    { infinitive:'ver',    en:'to see',                type:'er', stemChange:'yo-irreg',
      forms:{ yo:'veo',   tu:'ves',    el:'ve',    nos:'vemos',    vos:'veis',    ellos:'ven'    },
      ex:'¿Ves a los estudiantes en el parque?', exEn:'Do you see the students in the park?' },
    { infinitive:'salir',  en:'to leave / go out',     type:'ir', stemChange:'yo-irreg',
      forms:{ yo:'salgo', tu:'sales',  el:'sale',  nos:'salimos',  vos:'salís',   ellos:'salen'  },
      ex:'Salimos a las ocho de la mañana.', exEn:'We leave at eight in the morning.' },
    { infinitive:'oír',    en:'to hear',               type:'ir', stemChange:'yo-irreg',
      forms:{ yo:'oigo',  tu:'oyes',   el:'oye',   nos:'oímos',   vos:'oís',    ellos:'oyen'   },
      ex:'¿Oyes las voces de los estudiantes?', exEn:'Do you hear the voices of the students?' },
    /* -ir e→i group — pedir, repetir, seguir, servir, sonreír */
    { infinitive:'pedir',   en:'to ask for / request', type:'ir', stemChange:'e→i',
      forms:{ yo:'pido',   tu:'pides',   el:'pide',   nos:'pedimos',   vos:'pedís',   ellos:'piden'   },
      ex:'Pido el menú al camarero.', exEn:'I ask the waiter for the menu.' },
    { infinitive:'repetir', en:'to repeat',            type:'ir', stemChange:'e→i',
      forms:{ yo:'repito', tu:'repites', el:'repite', nos:'repetimos', vos:'repetís', ellos:'repiten' },
      ex:'El profesor repite la pregunta.', exEn:'The professor repeats the question.' },
    { infinitive:'seguir',  en:'to follow / continue', type:'ir', stemChange:'e→i',
      forms:{ yo:'sigo',   tu:'sigues',  el:'sigue',  nos:'seguimos',  vos:'seguís',  ellos:'siguen'  },
      ex:'Ella sigue las instrucciones.', exEn:'She follows the instructions.' },
    { infinitive:'servir',  en:'to serve',             type:'ir', stemChange:'e→i',
      forms:{ yo:'sirvo',  tu:'sirves',  el:'sirve',  nos:'servimos',  vos:'servís',  ellos:'sirven'  },
      ex:'Los camareros sirven el desayuno.', exEn:'The waiters serve breakfast.' },
    { infinitive:'sonreír', en:'to smile',             type:'ir', stemChange:'e→i',
      forms:{ yo:'sonrío', tu:'sonríes', el:'sonríe', nos:'sonreímos',vos:'sonreís', ellos:'sonríen' },
      ex:'Los niños sonríen mucho.', exEn:'The children smile a lot.' },
  ],
};

/* ════════════════════════════════════════════════════════════════════════════
   SUB-LESSON 6-4 — Mixed irregular drill
   ════════════════════════════════════════════════════════════════════════════ */

const SUBLESSON_6_4 = {
  id: '6-4',
  chapterId: 6,
  title: 'Mixed Irregular Drill',
  subtitle: 'All irregular verbs · All pronouns',

  rules: [
    {
      id: 'r1',
      heading: 'Three patterns — one drill',
      body: 'All irregular verbs from this chapter combined. The key is recognizing which pattern applies: e→ie, o→ue, or irregular yo.',
      examples: [
        { es: 'e→ie: quiero, quieres, quiere… queremos', en: 'boot pattern, nosotros unchanged' },
        { es: 'o→ue: puedo, puedes, puede… podemos',    en: 'boot pattern, nosotros unchanged' },
        { es: 'yo-irr: hago, pongo, salgo, sé, veo',    en: 'only yo is different, rest regular' },
      ],
    },
  ],
};

/* ════════════════════════════════════════════════════════════════════════════
   All verbs — collected for mixed drill
   ════════════════════════════════════════════════════════════════════════════ */

const ALL_VERBS_CH6 = [
  ...SUBLESSON_6_1.verbs,
  ...SUBLESSON_6_2.verbs,
  ...SUBLESSON_6_3.verbs,
];

/* ════════════════════════════════════════════════════════════════════════════
   Chapter 6 export
   ════════════════════════════════════════════════════════════════════════════ */

const CHAPTER_6 = {
  id: 6,
  title: 'Irregular Verbs',
  unlocked: false,
  sublessons: [SUBLESSON_6_1, SUBLESSON_6_2, SUBLESSON_6_3, SUBLESSON_6_4],
};

export default CHAPTER_6;
export { SUBLESSON_6_1, SUBLESSON_6_2, SUBLESSON_6_3, SUBLESSON_6_4, ALL_VERBS_CH6, conjugateIrr };
