export function qs(selector, root = document) {
  return root.querySelector(selector);
}

export function qsa(selector, root = document) {
  return Array.from(root.querySelectorAll(selector));
}

export function setText(element, text) {
  if (!element) return;
  element.textContent = text;
}

export function setHtml(element, html) {
  if (!element) return;
  element.innerHTML = html;
}
