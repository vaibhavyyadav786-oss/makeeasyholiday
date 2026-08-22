import { Header } from './components/Header/Header.js';
import { Footer } from './components/Footer/Footer.js';
import { LoginModal } from './components/Modals/LoginModal.js';
import { SignupModal } from './components/Modals/SignupModal.js';
import { WhatsAppButton } from './components/WhatsApp/WhatsAppButton.js';
import { labels } from './data/labels.js';

class ThemeApp {
  constructor() {
    this.labels = labels;
    this.header = null;
    this.footer = null;
    this.loginModal = null;
    this.signupModal = null;
    this.whatsApp = null;
  }

  init() {
    this.render();
    this.bindGlobalEvents();
    this.loadPackages();
  }

  render() {
    const root = document.getElementById('theme-shell');
    if (!root) return;

    root.innerHTML = `
      <header id="site-header"></header>
      
      <main id="site-main" style="min-height: 60vh; padding: 100px 20px 40px; background-color: #f4f6f9;">
        <h1 style="text-align: center; color: #2c3e50; font-size: 2.5rem; margin-bottom: 20px;">
            Explore Our Destinations
        </h1>
        <p style="text-align: center; color: #7f8c8d; margin-bottom: 40px; font-size: 1.1rem;">
            Here are the best packages curated just for you.
        </p>
        <div id="packages-container" class="card-container" style="display: flex; flex-wrap: wrap; justify-content: center; gap: 20px;">
            <p><i>Loading amazing packages...</i></p>
        </div>
      </main>

      <div id="site-footer"></div>
      <div id="login-modal-root"></div>
      <div id="signup-modal-root"></div>
      <div id="whatsapp-root"></div>
    `;
    this.header = new Header({ container: document.getElementById('site-header'), labels: this.labels });
    this.header.render();
    this.footer = new Footer({ container: document.getElementById('site-footer'), labels: this.labels });
    this.footer.render();
    this.loginModal = new LoginModal({ container: document.getElementById('login-modal-root'), labels: this.labels, onSubmit: (v) => console.log(v) });
    this.loginModal.render();

    this.signupModal = new SignupModal({ container: document.getElementById('signup-modal-root'), labels: this.labels, onSubmit: (v) => console.log(v) });
    this.signupModal.render();
    this.whatsApp = new WhatsAppButton({ 
        container: document.getElementById('whatsapp-root'), 
        href: this.labels.whatsappHref || 'https://wa.me/918955721614?text=Hi!', 
        label: 'Contact on WhatsApp' 
    });
    this.whatsApp.render();
  }

  bindGlobalEvents() {
    document.addEventListener('click', (event) => {
      const target = event.target;
      if (target.matches('.close-btn')) {
        event.preventDefault();
        const modal = target.closest('.modal');
        if (modal) {
          window.location.hash = '';
        }
      }
    });
  }

  loadPackages() {
    const urlParams = new URLSearchParams(window.location.search);
    const themeType = urlParams.get('type');
    console.log("Customer ne select kiya hai:", themeType);
  }
}
const themeApp = new ThemeApp();
themeApp.init();