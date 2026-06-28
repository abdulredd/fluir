/* ─── Fluir · Shared SVG icons ─────────────────────────────────────────────── */

import { svg } from './dom.js';

const STROKE = {
  fill:         'none',
  stroke:       'currentColor',
  'stroke-width': '1.5',
  'stroke-linecap':  'round',
  'stroke-linejoin': 'round',
};

function iconSvg(size, ...children) {
  return svg('svg', { width: size, height: size, viewBox: '0 0 24 24', ...STROKE }, ...children);
}

function iconChevronLeft(size = 16) {
  return iconSvg(size, svg('polyline', { points: '15 18 9 12 15 6' }));
}

function iconChevronRight(size = 16) {
  return iconSvg(size, svg('polyline', { points: '9 18 15 12 9 6' }));
}

function iconCheck(size = 18) {
  return iconSvg(size, svg('polyline', { points: '20 6 9 17 4 12', 'stroke-width': '2' }));
}

function iconLock(size = 16) {
  return iconSvg(size,
    svg('rect', { x: '3', y: '11', width: '18', height: '11', rx: '2' }),
    svg('path', { d: 'M7 11V7a5 5 0 0110 0v4' }),
  );
}

function iconRules(size = 14) {
  return iconSvg(size,
    svg('path', { d: 'M4 19.5A2.5 2.5 0 0 1 6.5 17H20' }),
    svg('path', { d: 'M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z' }),
  );
}

function iconGrid(size = 16) {
  return iconSvg(size,
    svg('rect', { x: '3', y: '3', width: '18', height: '18', rx: '2' }),
    svg('line', { x1: '3', y1: '9', x2: '21', y2: '9' }),
    svg('line', { x1: '9', y1: '21', x2: '9', y2: '9' }),
  );
}

export {
  iconChevronLeft,
  iconChevronRight,
  iconCheck,
  iconLock,
  iconRules,
  iconGrid,
};
