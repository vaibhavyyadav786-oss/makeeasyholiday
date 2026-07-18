export class WhatsAppButton {
  constructor({ container, href, label }) {
    this.container = container;
    this.href = href;
    this.label = label;
  }

  render() {
    if (!this.container) return;
    this.container.innerHTML = `
      <a href="${this.href}" target="_blank" class="whatsapp-btn" aria-label="${this.label}">
        <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" />
      </a>
    `;
  }
}
