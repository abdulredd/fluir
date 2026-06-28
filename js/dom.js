/* ─── Fluir · DOM helpers ─────────────────────────────────────────────────── */

/**
 * Append string or Node children to a parent.
 * @param {Element} parent
 * @param {...(Node|string|null|undefined|(Node|string|null|undefined)[])} children
 */
function appendChildren(parent, ...children) {
  for (const child of children.flat(Infinity)) {
    if (child == null || child === false) continue;
    parent.appendChild(typeof child === 'string' ? document.createTextNode(child) : child);
  }
}

/**
 * Create an element with attributes and children.
 * @param {string} tag
 * @param {Record<string, unknown>} [attrs]
 * @param {...(Node|string|null|undefined|(Node|string|null|undefined)[])} children
 * @returns {HTMLElement}
 */
function el(tag, attrs = {}, ...children) {
  const node = document.createElement(tag);

  for (const [key, val] of Object.entries(attrs)) {
    if (val == null || val === false) continue;

    if (key === 'className') {
      node.className = String(val);
    } else if (key === 'text') {
      node.textContent = String(val);
    } else if (key === 'html') {
      node.innerHTML = String(val);
    } else if (key === 'style') {
      if (typeof val === 'string') node.style.cssText = val;
      else Object.assign(node.style, val);
    } else if (key === 'dataset') {
      Object.assign(node.dataset, val);
    } else if (key === 'checked' && val === true) {
      node.checked = true;
    } else if (key === 'disabled' && val === true) {
      node.disabled = true;
    } else if (key.startsWith('on') && typeof val === 'function') {
      node.addEventListener(key.slice(2).toLowerCase(), val);
    } else {
      node.setAttribute(key, String(val));
    }
  }

  appendChildren(node, ...children);
  return node;
}

/**
 * Replace all children of a container.
 * @param {Element} container
 * @param {...(Node|string|null|undefined|(Node|string|null|undefined)[])} children
 */
function clearAndMount(container, ...children) {
  container.replaceChildren();
  appendChildren(container, ...children);
}

/**
 * Create an SVG element in the SVG namespace.
 * @param {string} tag
 * @param {Record<string, unknown>} [attrs]
 * @param {...(Node|string|null|undefined|(Node|string|null|undefined)[])} children
 * @returns {SVGElement}
 */
function svg(tag, attrs = {}, ...children) {
  const node = document.createElementNS('http://www.w3.org/2000/svg', tag);
  for (const [key, val] of Object.entries(attrs)) {
    if (val == null || val === false) continue;
    node.setAttribute(key, String(val));
  }
  appendChildren(node, ...children);
  return node;
}

/** Rich HTML sink — prefer `text` on `el()` when possible. */
function setHtml(node, html) {
  node.innerHTML = html;
}

export { el, svg, appendChildren, clearAndMount, setHtml };
