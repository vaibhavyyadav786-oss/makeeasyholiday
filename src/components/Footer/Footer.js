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
            <h3>${escapeHtml(this.labels.footer.aboutTitle)}</h3><br>
            <p style="line-height: 1.6;">${escapeHtml(this.labels.footer.aboutDescription)}</p>
          </div>
          
          <div class="footer-col">
            <h3>${escapeHtml(this.labels.footer.quickLinksTitle)}</h3><br>
            <div style="display: flex; flex-direction: column; gap: 12px;">
              ${this.labels.footer.links.map((link) => `<a href="${escapeHtml(link.href)}">${escapeHtml(link.label)}</a>`).join('')}
            </div>
          </div>
          
          <div class="footer-col">
            <h3>${escapeHtml(this.labels.footer.contactTitle)}</h3><br>
            <div style="display: flex; flex-direction: column; gap: 15px;">
              
              <div style="display: flex; align-items: flex-start;">
                <i class="fas fa-envelope" style="width: 20px; text-align: center; margin-right: 10px; margin-top: 4px;"></i> 
                <span style="word-break: break-word; line-height: 1.5;">${escapeHtml(this.labels.footer.email)}</span>
              </div>
              
              <div style="display: flex; align-items: flex-start;">
                <i class="fas fa-mobile-alt" style="width: 20px; text-align: center; margin-right: 10px; margin-top: 4px;"></i> 
                <span style="line-height: 1.5;">${escapeHtml(this.labels.footer.phone)}</span>
              </div>
              
              <div style="display: flex; align-items: flex-start;">
                <i class="fas fa-map-marker-alt" style="width: 20px; text-align: center; margin-right: 10px; margin-top: 4px;"></i> 
                <span style="line-height: 1.5;">${escapeHtml(this.labels.footer.location)}</span>
              </div>
              
            </div>
          </div>
          
          <div class="footer-col social-links">
            <h3>${escapeHtml(this.labels.footer.socialTitle)}</h3><br>
            <p style="margin-bottom: 15px; line-height: 1.6;">${escapeHtml(this.labels.footer.socialDescription)}</p>
            <div class="social-icons">
              ${this.labels.footer.socialLinks.map((item) => `<a href="${escapeHtml(item.href)}" target="_blank" class="${escapeHtml(item.className)}"><i class="${escapeHtml(item.icon)}"></i></a>`).join('')}
            </div>
          </div>
          
        </div>
        <div class="footer-bottom" style="margin-top: 20px;">
          <p>${escapeHtml(this.labels.footer.copyright)}</p>
        </div>
      </footer>
    `;
  }
}