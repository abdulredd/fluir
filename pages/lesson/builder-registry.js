/* ─── Fluir · Sublesson question builder registry ──────────────────────────── */

import { builders as ch1 } from './builders/ch1.js';
import { builders as ch2 } from './builders/ch2.js';
import { builders as ch3 } from './builders/ch3.js';
import { builders as ch4 } from './builders/ch4.js';
import { builders as ch5 } from './builders/ch5.js';
import { builders as ch6 } from './builders/ch6.js';
import { builders as ch7 } from './builders/ch7.js';
import { builders as ch8 } from './builders/ch8.js';
import { builders as ch9 } from './builders/ch9.js';
import { builders as ch10 } from './builders/ch10.js';
import { builders as ch11 } from './builders/ch11.js';
import { builders as ch12 } from './builders/ch12.js';
import { builders as ch13 } from './builders/ch13.js';
import { builders as ch14 } from './builders/ch14.js';
import { builders as ch15 } from './builders/ch15.js';

/**
 * @typedef {object} LessonQuestion
 * @property {string} type
 */

/** @type {Record<string, (sublesson: object) => LessonQuestion[]>} */
const SUBLESSON_BUILDERS = {
  ...ch1, ...ch2, ...ch3, ...ch4, ...ch5,
  ...ch6, ...ch7, ...ch8, ...ch9, ...ch10,
  ...ch11, ...ch12, ...ch13, ...ch14, ...ch15,
};

export { SUBLESSON_BUILDERS };
