import { escapeHtml } from '../../utils/helpers.js';

export class TestimonialsSection {
  constructor({ container, labels }) {
    this.container = container;
    this.labels = labels;
  }

  render() {
    if (!this.container) return;
    const reviews = [...this.labels.testimonials.cards, ...this.labels.testimonials.cards];
    this.container.innerHTML = `
      <section class="testimonials">
        <h2 class="section-title">${escapeHtml(this.labels.testimonials.title)}</h2>
        <p class="section-subtitle">${escapeHtml(this.labels.testimonials.subtitle)}</p>
        <div class="marquee-container">
          <div class="marquee-track">
            ${reviews.map((review) => `
              <div class="review-card">
                <div class="stars">
                  <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
                </div>
                <p>“${escapeHtml(review.quote)}”</p>
                <div class="reviewer">
                  <img src="${escapeHtml(review.avatar)}" alt="${escapeHtml(review.name)}" loading="lazy" />
                  <div class="reviewer-info">
                    <h4>${escapeHtml(review.name)}</h4>
                    <span><i class="fab fa-google" style="color:#DB4437; margin-right: 5px;"></i> Verified on Google Maps</span>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>
    `;
  }
}
