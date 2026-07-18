import { escapeHtml } from '../../utils/helpers.js';

export class Header {
  constructor({ container, labels }) {
    this.container = container;
    this.labels = labels;
  }

  render() {
    if (!this.container) return;
    this.container.innerHTML = `
      <nav class="navbar" aria-label="Main Navigation">
        <a href="makeeasyholidayHomePage.html" class="logo">
          <h2>${escapeHtml(this.labels.logo.brand)}<span>${escapeHtml(this.labels.logo.accent)}</span></h2>
        </a>

        <div class="nav-links" id="nav-links">
          ${this.labels.navigation.links.map((link) => `<a href="${escapeHtml(link.href)}">${escapeHtml(link.label)}</a>`).join('')}
        </div>

        <div class="nav-auth">
          <a href="#login-modal" class="login-btn">
            <i class="fas fa-user-circle"></i>
            <span>${escapeHtml(this.labels.navigation.loginLabel)}</span>
          </a>
        </div>
      </nav>
    `;
  }
}
