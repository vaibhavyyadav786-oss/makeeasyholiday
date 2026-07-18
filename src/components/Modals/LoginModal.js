import { escapeHtml } from '../../utils/helpers.js';

export class LoginModal {
  constructor({ container, labels, onSubmit }) {
    this.container = container;
    this.labels = labels;
    this.onSubmit = onSubmit;
  }

  render() {
    if (!this.container) return;
    this.container.innerHTML = `
      <div id="login-modal" class="modal">
        <div class="modal-content">
          <a href="#" class="close-btn" aria-label="Close modal">&times;</a>
          <div class="modal-header">
            <h2>${escapeHtml(this.labels.modals.login.title)}</h2>
            <p>${escapeHtml(this.labels.modals.login.subtitle)}</p>
          </div>
          <form class="login-form" id="login-form">
            <div class="input-group">
              <i class="fas fa-envelope"></i>
              <input type="email" id="login-email" placeholder="${escapeHtml(this.labels.modals.login.emailPlaceholder)}" required />
            </div>
            <div class="input-group">
              <i class="fas fa-lock"></i>
              <input type="password" id="login-password" placeholder="${escapeHtml(this.labels.modals.login.passwordPlaceholder)}" required />
            </div>
            <button type="submit" class="submit-login-btn">${escapeHtml(this.labels.modals.login.submitLabel)}</button>
          </form>
          <p class="signup-link">${escapeHtml(this.labels.modals.login.signupText)}<a href="#signup-modal">${escapeHtml(this.labels.modals.login.signupLinkLabel)}</a></p>
        </div>
      </div>
    `;

    this.bindEvents();
  }

  bindEvents() {
    const form = this.container.querySelector('#login-form');
    if (!form) return;
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (this.onSubmit) {
        this.onSubmit({
          email: this.container.querySelector('#login-email').value,
          password: this.container.querySelector('#login-password').value
        });
      }
    });
  }
}
