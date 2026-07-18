import { escapeHtml } from '../../utils/helpers.js';

export class LeadSection {
  constructor({ container, labels, onSubmit }) {
    this.container = container;
    this.labels = labels;
    this.onSubmit = onSubmit;
  }

  render() {
    if (!this.container) return;
    this.container.innerHTML = `
      <section class="lead-magnet">
        <div class="lead-container">
          <div class="lead-text">
            <h2>${escapeHtml(this.labels.lead.title)}</h2>
            <p>${escapeHtml(this.labels.lead.description)}</p>
            <ul>${this.labels.lead.benefits.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>
          </div>

          <div class="lead-form-box">
            <h3>${escapeHtml(this.labels.lead.formTitle)}</h3>
            <form class="custom-quote-form" id="lead-form">
              <input type="text" id="lead-name" placeholder="${escapeHtml(this.labels.lead.namePlaceholder)}" required />
              <div class="input-row">
                <input type="tel" id="lead-phone" placeholder="${escapeHtml(this.labels.lead.phonePlaceholder)}" required />
                <input type="email" id="lead-email" placeholder="${escapeHtml(this.labels.lead.emailPlaceholder)}" required />
              </div>
              <input type="text" id="lead-destination" placeholder="${escapeHtml(this.labels.lead.destinationPlaceholder)}" required />
              <div class="input-row">
                <input type="date" id="lead-date" placeholder="${escapeHtml(this.labels.lead.datePlaceholder)}" required />
                <input type="number" id="lead-days" placeholder="${escapeHtml(this.labels.lead.daysPlaceholder)}" min="1" required />
              </div>
              <textarea rows="3" id="lead-requirements" placeholder="${escapeHtml(this.labels.lead.requirementsPlaceholder)}"></textarea>
              <button type="submit" class="submit-lead-btn">${escapeHtml(this.labels.lead.submitLabel)}</button>
            </form>
          </div>
        </div>
      </section>
    `;

    this.bindEvents();
  }

  bindEvents() {
    const form = this.container.querySelector('#lead-form');
    if (!form) return;
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const payload = {
        name: this.container.querySelector('#lead-name').value,
        phone: this.container.querySelector('#lead-phone').value,
        email: this.container.querySelector('#lead-email').value,
        destination: this.container.querySelector('#lead-destination').value,
        date: this.container.querySelector('#lead-date').value,
        days: this.container.querySelector('#lead-days').value,
        requirements: this.container.querySelector('#lead-requirements').value
      };
      if (this.onSubmit) this.onSubmit(payload);
    });
  }
}
