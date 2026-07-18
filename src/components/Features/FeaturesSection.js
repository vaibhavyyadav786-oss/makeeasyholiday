import { escapeHtml } from '../../utils/helpers.js';

export class FeaturesSection {
  constructor({ container, labels }) {
    this.container = container;
    this.labels = labels;
  }

  render() {
    if (!this.container) return;
    this.container.innerHTML = `
      <section class="features">
        <h2 class="section-title" id="features-title">${escapeHtml(this.labels.features.title)}</h2>
        <div class="features-grid" id="features-container">
          ${this.labels.features.items.map((item) => `
            <div class="feature-box">
              <span class="icon">${escapeHtml(item.icon)}</span>
              <h3>${escapeHtml(item.title)}</h3>
              <p>${escapeHtml(item.description)}</p>
            </div>
          `).join('')}
        </div>
      </section>
    `;
  }
}
