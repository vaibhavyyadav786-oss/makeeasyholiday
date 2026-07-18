import { escapeHtml } from '../../utils/helpers.js';

export class Footer {
  constructor({ container, labels }) {
    this.container = container;
    this.labels = labels;
  }

  render() {
    if (!this.container) return;
    this.container.innerHTML = `
      <footer class="footer" id="contact-section">
        <div class="footer-columns">
          <div class="footer-col">
            <h3>${escapeHtml(this.labels.footer.aboutTitle)}</h3>
            <p>${escapeHtml(this.labels.footer.aboutDescription)}</p>
          </div>
          <div class="footer-col">
            <h3>${escapeHtml(this.labels.footer.quickLinksTitle)}</h3>
            ${this.labels.footer.links.map((link) => `<a href="${escapeHtml(link.href)}">${escapeHtml(link.label)}</a>`).join('')}
          </div>
          <div class="footer-col">
            <h3>${escapeHtml(this.labels.footer.contactTitle)}</h3>
            <p><i class="fas fa-envelope"></i> ${escapeHtml(this.labels.footer.email)}</p>
            <p><i class="fas fa-mobile-alt"></i> ${escapeHtml(this.labels.footer.phone)}</p>
            <p><i class="fas fa-map-marker-alt"></i> ${escapeHtml(this.labels.footer.location)}</p>
          </div>
          <div class="footer-col social-links">
            <h3>${escapeHtml(this.labels.footer.socialTitle)}</h3>
            <p>${escapeHtml(this.labels.footer.socialDescription)}</p>
            <div class="social-icons">
              ${this.labels.footer.socialLinks.map((item) => `<a href="${escapeHtml(item.href)}" target="_blank" class="${escapeHtml(item.className)}"><i class="${escapeHtml(item.icon)}"></i></a>`).join('')}
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <p>${escapeHtml(this.labels.footer.copyright)}</p>
        </div>
      </footer>
    `;
  }
}
