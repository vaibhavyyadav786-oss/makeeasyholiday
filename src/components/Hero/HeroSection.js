import { HeroSlider } from './HeroSlider.js';
import { escapeHtml } from '../../utils/helpers.js';

export class HeroSection {
  constructor({ container, labels, onSearchSubmit }) {
    this.container = container;
    this.labels = labels;
    this.onSearchSubmit = onSearchSubmit;
    this.slider = null;
  }

  render() {
    if (!this.container) return;
    this.container.innerHTML = `
      <section class="hero-section">
        <div class="video-overlay fixed-overlay">
          <h1 id="hero-title">${escapeHtml(this.labels.hero.title)}</h1>
          <p id="hero-subtitle">${escapeHtml(this.labels.hero.subtitle)}</p>

          <form class="glass-form" id="hero-search-form">
            <input type="text" id="hero-destination" placeholder="${escapeHtml(this.labels.hero.destinationPlaceholder)}" required />
            <input type="date" id="hero-date" required />
            <select id="hero-traveler"></select>
            <button type="submit" id="hero-submit-button">${escapeHtml(this.labels.hero.submitLabel)}</button>
          </form>
        </div>

        <div class="slider-container" id="hero-slider"></div>
      </section>
    `;

    this.renderTravelerOptions();
    this.initSlider();
    this.bindEvents();
  }

  renderTravelerOptions() {
    const travelerSelect = this.container.querySelector('#hero-traveler');
    if (!travelerSelect) return;
    travelerSelect.innerHTML = this.labels.hero.travelerOptions.map((option) => `
      <option value="${escapeHtml(option.value)}">${escapeHtml(option.label)}</option>
    `).join('');
  }

  initSlider() {
    const sliderContainer = this.container.querySelector('#hero-slider');
    this.slider = new HeroSlider({
      container: sliderContainer,
      slides: this.labels.hero.slides,
      onSlideChange: () => {}
    });
    this.slider.init();
  }

  bindEvents() {
    const form = this.container.querySelector('#hero-search-form');
    if (!form) return;
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (this.onSearchSubmit) {
        this.onSearchSubmit({
          destination: this.container.querySelector('#hero-destination').value,
          date: this.container.querySelector('#hero-date').value,
          traveler: this.container.querySelector('#hero-traveler').value
        });
      }
    });
  }
}
