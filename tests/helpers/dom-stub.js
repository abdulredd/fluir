/* Shared minimal DOM stub for Node test runs (no jsdom). */

function createDomStub() {
  function createElement(tag) {
    const listeners = {};
    const node = {
      tagName: tag.toUpperCase(),
      className: '',
      classList: {
        _c: new Set(),
        add(...cls) { cls.forEach(c => this._c.add(c)); node.className = [...this._c].join(' '); },
        contains(c) { return this._c.has(c); },
      },
      style: { cssText: '' },
      innerHTML: '',
      dataset: {},
      childNodes: [],
      children: [],
      disabled: false,
      checked: false,
      id: '',
      value: '',
      _attrs: {},
      get textContent() {
        if (this._leafText != null) return this._leafText;
        return (this.childNodes || []).map(c => c.textContent || '').join('');
      },
      set textContent(val) {
        this._leafText = String(val);
        this.childNodes = [];
        this.children = [];
      },
      setAttribute(k, v) {
        this._attrs[k] = String(v);
        if (k === 'id') this.id = String(v);
        if (k === 'class') this.className = String(v);
      },
      getAttribute(k) {
        return this._attrs[k] ?? null;
      },
      appendChild(child) {
        this._leafText = null;
        this.childNodes.push(child);
        this.children.push(child);
        return child;
      },
      replaceChildren(...nodes) {
        this.childNodes = [];
        this.children = [];
        nodes.forEach(n => this.appendChild(n));
      },
      querySelector(sel) { return query(this, sel); },
      querySelectorAll(sel) {
        const found = [];
        walk(this, n => { if (match(n, sel)) found.push(n); });
        return found;
      },
      addEventListener(type, fn) {
        (listeners[type] ||= []).push(fn);
      },
      dispatchEvent(event) {
        const type = typeof event === 'string' ? event : event.type;
        const payload = typeof event === 'string'
          ? { type, preventDefault() {}, currentTarget: this }
          : { preventDefault() {}, currentTarget: this, ...event };
        for (const fn of listeners[type] || []) fn(payload);
        return true;
      },
      click() {
        this.dispatchEvent({ type: 'click' });
      },
      focus() {},
    };
    return node;
  }

  function walk(node, fn) {
    fn(node);
    for (const child of node.childNodes || []) walk(child, fn);
  }

  function match(node, sel) {
    if (!sel || node.tagName == null) return false;
    if (sel.startsWith('#')) return node.id === sel.slice(1);
    if (sel.startsWith('.')) {
      const classes = sel.slice(1).split('.').filter(Boolean);
      return classes.every(c => node.classList?.contains(c) || node.className?.split(/\s+/).includes(c));
    }
    return node.tagName === sel.toUpperCase();
  }

  function query(node, sel) {
    if (match(node, sel)) return node;
    for (const child of node.childNodes || []) {
      const hit = query(child, sel);
      if (hit) return hit;
    }
    return null;
  }

  return {
    createElement,
    createElementNS: (_ns, tag) => createElement(tag),
    createTextNode: text => ({ nodeType: 3, textContent: text }),
  };
}

function installDom() {
  const prev = globalThis.document;
  globalThis.document = createDomStub();
  return () => { globalThis.document = prev; };
}

function mockContainer() {
  return globalThis.document.createElement('div');
}

export { createDomStub, installDom, mockContainer };
