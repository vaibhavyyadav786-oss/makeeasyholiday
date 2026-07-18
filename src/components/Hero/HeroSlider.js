import { APP_CONFIG, VIDEO_ATTRIBUTES } from '../../utils/constants.js';
import { classNames } from '../../utils/helpers.js';

export class HeroSlider {
  constructor({ container, slides, onSlideChange }) {
    this.container = container;
    this.slides = slides;
    this.onSlideChange = onSlideChange;
    this.currentIndex = 0;
    this.timerId = null;
    this.videos = [];
    this.isPaused = false;
  }

  init() {
    if (!this.container || !this.slides.length) return;
    this.render();
    this.bindEvents();
    this.startRotation();
  }

  render() {
    this.container.innerHTML = this.slides.map((slide, index) => `
      <div class="slide${index === 0 ? ' is-active' : ''}" data-index="${index}">
        <video class="bg-video" ${index === 0 ? 'autoplay ' : ''}loop muted playsinline preload="${index === 0 ? 'metadata' : 'none'}" data-video="${index}">
          <source src="${slide.videoSrc}" type="video/mp4" />
        </video>
        <h2 class="slide-theme-name">${slide.label}</h2>
      </div>
    `).join('');

    this.videos = Array.from(this.container.querySelectorAll('.bg-video'));
    this.videos.forEach((video, index) => {
      video.muted = true;
      video.setAttribute('playsinline', '');
      video.setAttribute('loop', '');
      video.preload = index === 0 ? 'metadata' : 'none';
      if (index === 0) {
        video.play().catch(() => {});
      }
    });
  }

  bindEvents() {
    this.container.addEventListener('mouseenter', () => {
      this.isPaused = true;
      this.stopRotation();
    });

    this.container.addEventListener('mouseleave', () => {
      this.isPaused = false;
      this.startRotation();
    });
  }

  startRotation() {
    if (this.isPaused || this.timerId) return;
    this.timerId = window.setInterval(() => {
      this.goToNext();
    }, APP_CONFIG.heroRotationInterval);
  }

  stopRotation() {
    if (this.timerId) {
      window.clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  goToNext() {
    const nextIndex = (this.currentIndex + 1) % this.slides.length;
    this.showSlide(nextIndex);
  }

  showSlide(index) {
    if (index === this.currentIndex) return;
    this.currentIndex = index;
    const slides = this.container.querySelectorAll('.slide');
    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle('is-active', slideIndex === index);
    });

    this.videos.forEach((video, videoIndex) => {
      if (videoIndex === index) {
        video.currentTime = 0;
        video.play().catch(() => {});
        video.style.opacity = '1';
      } else {
        video.pause();
        video.style.opacity = '0';
      }
    });

    if (this.onSlideChange) this.onSlideChange(index);
  }
}
