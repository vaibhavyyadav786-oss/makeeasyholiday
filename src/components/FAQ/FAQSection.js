import { escapeHtml } from '../../utils/helpers.js';

export class FAQSection {
  constructor({ container }) {
    this.container = container;
  }

  render() {
    if (!this.container) return;
    this.container.innerHTML = `
      <section class="faq-section">
        <h2 class="section-title">Frequently Asked Questions</h2>
        <div class="faq-list">
          <details open>
            <summary>How do I plan a custom trip?</summary>
            <p>Fill out the custom quote form and our team will contact you within 24 hours.</p>
          </details>
          <details>
            <summary>Do you offer packages for families?</summary>
            <p>Yes, we provide family-friendly packages across India with flexible itineraries.</p>
          </details>
          <details>
            <summary>Can I book a trip on short notice?</summary>
            <p>Yes, we can help with last-minute travel planning based on availability.</p>
          </details>
        </div>
      </section>
    `;
  }
}
