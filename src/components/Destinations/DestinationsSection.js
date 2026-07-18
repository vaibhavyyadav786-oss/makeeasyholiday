import { escapeHtml } from '../../utils/helpers.js';

export class DestinationsSection {
  constructor({ container, labels }) {
    this.container = container;
    this.labels = labels;
  }

  render() {
    if (!this.container) return;
    this.container.innerHTML = `
      <section class="destinations" id="packages-section">
        <h2 class="section-title" id="destinations-title">${escapeHtml(this.labels.destinations.title)}</h2>
        <div class="card-container" id="destinations-container">
          ${this.labels.destinations.cards.map((card) => `
            <a class="card-link" href="${escapeHtml(card.href)}">
              <div class="card">
                <img src="${escapeHtml(card.image)}" alt="${escapeHtml(card.alt)}" loading="lazy" />
                <div class="card-info">
                  <h3>${escapeHtml(card.title)}</h3>
                  <p>${escapeHtml(card.description)}</p>
                  <span class="card-btn">${escapeHtml(card.buttonText)}</span>
                </div>
              </div>
            </a>
          `).join('')}
        </div>
      </section>
    `;
  }
}
