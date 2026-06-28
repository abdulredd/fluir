/* ─── Fluir · Grammar rule copy (wrong-answer feedback) ───────────────────── */

const GENDER_RULES = {
  ends_o:       'Most nouns ending in -o are masculine → el',
  ends_a:       'Most nouns ending in -a are feminine → la',
  ends_cion:    'Nouns ending in -ción are always feminine → la',
  ends_ion:     'Nouns ending in -ión are always feminine → la',
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

const PLURAL_RULES = {
  vowel_masc:   'Masculine nouns ending in a vowel add -s → los ___s',
  vowel_fem:    'Feminine nouns ending in a vowel add -s → las ___s',
  cons_masc:    'Masculine nouns ending in a consonant add -es → los ___es',
  cons_fem:     'Feminine nouns ending in a consonant add -es → las ___es',
  cion_plural:  'Nouns ending in -ción drop the accent and add -es → -ciones',
};

const ADJ_RULES = {
  o_masc:       'Adjectives ending in -o are masculine — they agree with the masculine noun',
  a_fem:        'Adjectives ending in -o change to -a for feminine nouns',
  invariable:   'Adjectives not ending in -o have the same form for masculine and feminine nouns',
  plural_vowel: 'Adjectives ending in a vowel add -s to form the plural',
  plural_cons:  'Adjectives ending in a consonant add -es to form the plural',
  plural_z:     'Adjectives ending in -z change z → c and add -es (feliz → felices)',
  position:     'In Spanish, adjectives almost always follow the noun they describe',
};

export { GENDER_RULES, PLURAL_RULES, ADJ_RULES };
