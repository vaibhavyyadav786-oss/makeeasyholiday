(function (global) {
  const utils = {
    createElement(tagName, options = {}) {
      const element = document.createElement(tagName);
      if (options.className) {
        element.className = options.className;
      }
      if (options.id) {
        element.id = options.id;
      }
      if (options.textContent) {
        element.textContent = options.textContent;
      }
      if (options.html) {
        element.innerHTML = options.html;
      }
      if (options.attributes) {
        Object.entries(options.attributes).forEach(([name, value]) => {
          element.setAttribute(name, value);
        });
      }
      return element;
    },

    appendChildren(parent, children) {
      children.forEach((child) => parent.appendChild(child));
      return parent;
    },

    renderList(items, renderer) {
      return items.map(renderer).join('');
    },

    escapeHtml(value) {
      return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
    },

    joinClassNames(...classes) {
      return classes.filter(Boolean).join(' ');
    }
  };

  global.makeEasyHolidayUtils = utils;
})(window);
