import { escapeHtml } from '../../utils/helpers.js';

export class SignupModal {
  constructor({ container, labels, onSubmit }) {
    this.container = container;
    this.labels = labels;
    this.onSubmit = onSubmit;
  }

  render() {
    if (!this.container) return;
    this.container.innerHTML = `
      <div id="signup-modal" class="modal">
        <div class="modal-content modal-content--signup">
          <a href="#" class="close-btn" aria-label="Close modal">&times;</a>
          <div class="modal-header">
            <h2>${escapeHtml(this.labels.modals.signup.title)}</h2>
            <p>${escapeHtml(this.labels.modals.signup.subtitle)}</p>
          </div>
          <form class="login-form" id="signup-form">
            <div class="input-group">
              <i class="fas fa-user"></i>
              <input type="text" id="signup-name" placeholder="${escapeHtml(this.labels.modals.signup.namePlaceholder)}" required />
            </div>
            <div class="otp-row">
              <div class="input-group input-group--compact">
                <i class="fas fa-envelope"></i>
                <input type="email" id="signup-email" placeholder="${escapeHtml(this.labels.modals.signup.emailPlaceholder)}" required />
              </div>
              <button type="button" class="verify-btn">${escapeHtml(this.labels.modals.signup.emailOtpLabel)}</button>
            </div>
            <div class="otp-row">
              <div class="input-group input-group--compact">
                <i class="fas fa-mobile-alt"></i>
                <input type="tel" id="signup-phone" placeholder="${escapeHtml(this.labels.modals.signup.phonePlaceholder)}" required />
              </div>
              <button type="button" class="verify-btn">${escapeHtml(this.labels.modals.signup.phoneOtpLabel)}</button>
            </div>
            <div class="input-group">
              <i class="fas fa-check-circle"></i>
              <input type="text" id="signup-otp" placeholder="${escapeHtml(this.labels.modals.signup.otpPlaceholder)}" required />
            </div>
            <div class="input-group">
              <i class="fas fa-lock"></i>
              <input type="password" id="signup-password" placeholder="${escapeHtml(this.labels.modals.signup.passwordPlaceholder)}" required />
            </div>
            <button type="submit" class="submit-login-btn">${escapeHtml(this.labels.modals.signup.submitLabel)}</button>
          </form>
          <p class="signup-link">${escapeHtml(this.labels.modals.signup.loginText)}<a href="#login-modal">${escapeHtml(this.labels.modals.signup.loginLinkLabel)}</a></p>
        </div>
      </div>
    `;

    this.bindEvents();
  }

  bindEvents() {
    const form = this.container.querySelector('#signup-form');
    if (!form) return;
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (this.onSubmit) {
        this.onSubmit({
          name: this.container.querySelector('#signup-name').value,
          email: this.container.querySelector('#signup-email').value,
          phone: this.container.querySelector('#signup-phone').value,
          otp: this.container.querySelector('#signup-otp').value,
          password: this.container.querySelector('#signup-password').value
        });
      }
    });
  }
}
