import { Header } from './components/Header/Header.js';
import { HeroSection } from './components/Hero/HeroSection.js';
import { DestinationsSection } from './components/Destinations/DestinationsSection.js';
import { FeaturesSection } from './components/Features/FeaturesSection.js';
import { LeadSection } from './components/Lead/LeadSection.js';
import { TestimonialsSection } from './components/Testimonials/TestimonialsSection.js';
import { FAQSection } from './components/FAQ/FAQSection.js';
import { Footer } from './components/Footer/Footer.js';
import { LoginModal } from './components/Modals/LoginModal.js';
import { SignupModal } from './components/Modals/SignupModal.js';
import { WhatsAppButton } from './components/WhatsApp/WhatsAppButton.js';
import { ExcelService } from './services/excelService.js';
import { validateEmail, validatePhone, validateForm } from './utils/validators.js';
import { Loader } from './components/Loader/Loader.js';
import { Toast } from './components/Toast/Toast.js';
import { labels } from './data/labels.js';

class App {
  constructor() {
    this.labels = labels;
    this.excelService = new ExcelService();
    this.header = null;
    this.hero = null;
    this.destinations = null;
    this.features = null;
    this.lead = null;
    this.testimonials = null;
    this.footer = null;
    this.loginModal = null;
    this.signupModal = null;
    this.whatsApp = null;
    this.loader = new Loader();
    this.toast = new Toast();
  }

  init() {
    this.render();
    this.bindGlobalEvents();
  }

  render() {
    const root = document.getElementById('app-shell');
    if (!root) return;

    root.innerHTML = `
      <header id="site-header"></header>
      <main id="site-main">
        <div id="hero-root"></div>
        <div id="destinations-root"></div>
        <div id="features-root"></div>
        <div id="lead-root"></div>
        <div id="testimonials-root"></div>
        <div id="faq-root"></div>
      </main>
      <div id="site-footer"></div>
      <div id="login-modal-root"></div>
      <div id="signup-modal-root"></div>
      <div id="whatsapp-root"></div>
    `;

    this.header = new Header({ container: document.getElementById('site-header'), labels: this.labels });
    this.header.render();

    this.hero = new HeroSection({
      container: document.getElementById('hero-root'),
      labels: this.labels,
      onSearchSubmit: (values) => this.handleSearch(values)
    });
    this.hero.render();

    this.destinations = new DestinationsSection({ container: document.getElementById('destinations-root'), labels: this.labels });
    this.destinations.render();

    this.features = new FeaturesSection({ container: document.getElementById('features-root'), labels: this.labels });
    this.features.render();

    this.lead = new LeadSection({ container: document.getElementById('lead-root'), labels: this.labels, onSubmit: (values) => this.handleLeadSubmit(values) });
    this.lead.render();

    this.testimonials = new TestimonialsSection({ container: document.getElementById('testimonials-root'), labels: this.labels });
    this.testimonials.render();

    this.faq = new FAQSection({ container: document.getElementById('faq-root') });
    this.faq.render();

    this.footer = new Footer({ container: document.getElementById('site-footer'), labels: this.labels });
    this.footer.render();

    this.loginModal = new LoginModal({ container: document.getElementById('login-modal-root'), labels: this.labels, onSubmit: (values) => this.handleLogin(values) });
    this.loginModal.render();

    this.signupModal = new SignupModal({ container: document.getElementById('signup-modal-root'), labels: this.labels, onSubmit: (values) => this.handleSignup(values) });
    this.signupModal.render();

    this.whatsApp = new WhatsAppButton({ container: document.getElementById('whatsapp-root'), href: this.labels.whatsappHref || 'https://wa.me/919876543210?text=Hi!%20I%20want%20to%20plan%20a%20trip.', label: 'Contact on WhatsApp' });
    this.whatsApp.render();
    this.loader.hide();
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

  handleSearch(values) {
    console.info('Hero search submitted', values);
  }

  async handleLeadSubmit(values) {
    const errors = validateForm(values);
    if (Object.keys(errors).length) {
      this.toast.show('Please fill all required fields.', 'error');
      return;
    }
    if (!validateEmail(values.email)) {
      this.toast.show('Please enter a valid email address.', 'error');
      return;
    }
    if (!validatePhone(values.phone)) {
      this.toast.show('Please enter a valid phone number.', 'error');
      return;
    }

    this.loader.show('Submitting your inquiry');
    try {
      await this.excelService.submitInquiry(values);
      this.toast.show('Your tour inquiry was saved successfully.', 'success');
    } catch (error) {
      console.error('Lead submission failed', error);
      this.toast.show('Something went wrong. Please try again later.', 'error');
    } finally {
      this.loader.hide();
    }
  }

  handleLogin(values) {
    console.info('Login submitted', values);
  }

  handleSignup(values) {
    console.info('Signup submitted', values);
  }
}

const app = new App();
app.init();
