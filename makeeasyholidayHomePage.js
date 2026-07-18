(function () {
  const labels = window.makeEasyHolidayLabels || {};
  const utils = window.makeEasyHolidayUtils || {};
  let sliderIntervalId = null;

  function init() {
    renderLogo();
    renderNavigation();
    renderHero();
    renderDestinations();
    renderFeatures();
    renderLead();
    renderTestimonials();
    renderFooter();
    renderModals();
    initHeroSlider();
  }

  function renderLogo() {
    const logoHeading = document.querySelector('.logo h2');
    if (!logoHeading) return;
    logoHeading.innerHTML = `${utils.escapeHtml(labels.logo.brand)}<span>${utils.escapeHtml(labels.logo.accent)}</span>`;
  }

  function renderNavigation() {
    const navLinks = document.getElementById('nav-links');
    const loginLabel = document.querySelector('.login-btn span');
    if (!navLinks || !loginLabel) return;

    navLinks.innerHTML = utils.renderList(labels.navigation.links, (link) => `<a href="${utils.escapeHtml(link.href)}">${utils.escapeHtml(link.label)}</a>`);
    loginLabel.textContent = labels.navigation.loginLabel;
  }

  function renderHero() {
    const title = document.getElementById('hero-title');
    const subtitle = document.getElementById('hero-subtitle');
    const destinationInput = document.getElementById('hero-destination');
    const submitButton = document.getElementById('hero-submit-button');
    const travelerSelect = document.getElementById('hero-traveler');
    const slider = document.getElementById('hero-slider');

    if (title) title.textContent = labels.hero.title;
    if (subtitle) subtitle.textContent = labels.hero.subtitle;
    if (destinationInput) destinationInput.placeholder = labels.hero.destinationPlaceholder;
    if (submitButton) submitButton.textContent = labels.hero.submitLabel;
    if (travelerSelect) {
      travelerSelect.innerHTML = utils.renderList(labels.hero.travelerOptions, (option) => `<option value="${utils.escapeHtml(option.value)}">${utils.escapeHtml(option.label)}</option>`);
    }

    if (slider) {
      slider.innerHTML = utils.renderList(labels.hero.slides, (slide, index) => `
        <div class="slide${index === 0 ? ' is-active' : ''}">
          <video ${index === 0 ? 'autoplay ' : ''}loop muted playsinline preload="${index === 0 ? 'metadata' : 'none'}" class="bg-video">
            <source src="${utils.escapeHtml(slide.videoSrc)}" type="video/mp4" />
          </video>
          <h2 class="slide-theme-name">${utils.escapeHtml(slide.label)}</h2>
        </div>
      `);
    }
  }

  function renderDestinations() {
    const container = document.getElementById('destinations-container');
    const title = document.getElementById('destinations-title');
    if (!container || !title) return;

    title.textContent = labels.destinations.title;
    container.innerHTML = utils.renderList(labels.destinations.cards, (card) => `
      <a class="card-link" href="${utils.escapeHtml(card.href)}">
        <div class="card">
          <img src="${utils.escapeHtml(card.image)}" alt="${utils.escapeHtml(card.alt)}" loading="lazy" />
          <div class="card-info">
            <h3>${utils.escapeHtml(card.title)}</h3>
            <p>${utils.escapeHtml(card.description)}</p>
            <span class="card-btn">${utils.escapeHtml(card.buttonText)}</span>
          </div>
        </div>
      </a>
    `);
  }

  function renderFeatures() {
    const container = document.getElementById('features-container');
    const title = document.getElementById('features-title');
    if (!container || !title) return;

    title.textContent = labels.features.title;
    container.innerHTML = utils.renderList(labels.features.items, (item) => `
      <div class="feature-box">
        <span class="icon">${utils.escapeHtml(item.icon)}</span>
        <h3>${utils.escapeHtml(item.title)}</h3>
        <p>${utils.escapeHtml(item.description)}</p>
      </div>
    `);
  }

  function renderLead() {
    const title = document.getElementById('lead-title');
    const description = document.getElementById('lead-description');
    const benefits = document.getElementById('lead-benefits');
    const formTitle = document.getElementById('lead-form-title');
    const nameInput = document.getElementById('lead-name');
    const phoneInput = document.getElementById('lead-phone');
    const emailInput = document.getElementById('lead-email');
    const destinationInput = document.getElementById('lead-destination');
    const dateInput = document.getElementById('lead-date');
    const daysInput = document.getElementById('lead-days');
    const requirementsInput = document.getElementById('lead-requirements');
    const submitButton = document.getElementById('lead-submit-button');

    if (title) title.textContent = labels.lead.title;
    if (description) description.textContent = labels.lead.description;
    if (benefits) benefits.innerHTML = utils.renderList(labels.lead.benefits, (item) => `<li>${utils.escapeHtml(item)}</li>`);
    if (formTitle) formTitle.textContent = labels.lead.formTitle;
    if (nameInput) nameInput.placeholder = labels.lead.namePlaceholder;
    if (phoneInput) phoneInput.placeholder = labels.lead.phonePlaceholder;
    if (emailInput) emailInput.placeholder = labels.lead.emailPlaceholder;
    if (destinationInput) destinationInput.placeholder = labels.lead.destinationPlaceholder;
    if (dateInput) dateInput.placeholder = labels.lead.datePlaceholder;
    if (daysInput) daysInput.placeholder = labels.lead.daysPlaceholder;
    if (requirementsInput) requirementsInput.placeholder = labels.lead.requirementsPlaceholder;
    if (submitButton) submitButton.textContent = labels.lead.submitLabel;
  }

  function renderTestimonials() {
    const title = document.getElementById('testimonials-title');
    const subtitle = document.getElementById('testimonials-subtitle');
    const container = document.getElementById('testimonials-container');

    if (title) title.textContent = labels.testimonials.title;
    if (subtitle) subtitle.textContent = labels.testimonials.subtitle;
    if (!container) return;

    const reviews = [...labels.testimonials.cards, ...labels.testimonials.cards];
    container.innerHTML = utils.renderList(reviews, (review) => `
      <div class="review-card">
        <div class="stars">
          <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
        </div>
        <p>“${utils.escapeHtml(review.quote)}”</p>
        <div class="reviewer">
          <img src="${utils.escapeHtml(review.avatar)}" alt="${utils.escapeHtml(review.name)}" loading="lazy" />
          <div class="reviewer-info">
            <h4>${utils.escapeHtml(review.name)}</h4>
            <span><i class="fab fa-google" style="color:#DB4437; margin-right: 5px;"></i> Verified on Google Maps</span>
          </div>
        </div>
      </div>
    `);
  }

  function renderFooter() {
    const about = document.getElementById('footer-about');
    const links = document.getElementById('footer-links');
    const contact = document.getElementById('footer-contact');
    const social = document.getElementById('footer-social');
    const copyright = document.getElementById('footer-copyright');

    if (about) {
      about.innerHTML = `
        <h3>${utils.escapeHtml(labels.footer.aboutTitle)}</h3>
        <p>${utils.escapeHtml(labels.footer.aboutDescription)}</p>
      `;
    }

    if (links) {
      links.innerHTML = `
        <h3>${utils.escapeHtml(labels.footer.quickLinksTitle)}</h3>
        ${utils.renderList(labels.footer.links, (link) => `<a href="${utils.escapeHtml(link.href)}">${utils.escapeHtml(link.label)}</a>`)}
      `;
    }

    if (contact) {
      contact.innerHTML = `
        <h3>${utils.escapeHtml(labels.footer.contactTitle)}</h3>
        <p><i class="fas fa-envelope"></i> ${utils.escapeHtml(labels.footer.email)}</p>
        <p><i class="fas fa-mobile-alt"></i> ${utils.escapeHtml(labels.footer.phone)}</p>
        <p><i class="fas fa-map-marker-alt"></i> ${utils.escapeHtml(labels.footer.location)}</p>
      `;
    }

    if (social) {
      social.innerHTML = `
        <h3>${utils.escapeHtml(labels.footer.socialTitle)}</h3>
        <p>${utils.escapeHtml(labels.footer.socialDescription)}</p>
        <div class="social-icons">
          ${utils.renderList(labels.footer.socialLinks, (item) => `<a href="${utils.escapeHtml(item.href)}" target="_blank" class="${utils.escapeHtml(item.className)}"><i class="${utils.escapeHtml(item.icon)}"></i></a>`)}
        </div>
      `;
    }

    if (copyright) {
      copyright.textContent = labels.footer.copyright;
    }
  }

  function renderModals() {
    const loginTitle = document.getElementById('login-title');
    const loginSubtitle = document.getElementById('login-subtitle');
    const loginEmail = document.getElementById('login-email');
    const loginPassword = document.getElementById('login-password');
    const loginSubmitButton = document.getElementById('login-submit-button');
    const loginSignupLink = document.getElementById('login-signup-link');

    const signupTitle = document.getElementById('signup-title');
    const signupSubtitle = document.getElementById('signup-subtitle');
    const signupName = document.getElementById('signup-name');
    const signupEmail = document.getElementById('signup-email');
    const signupPhone = document.getElementById('signup-phone');
    const signupOtp = document.getElementById('signup-otp');
    const signupPassword = document.getElementById('signup-password');
    const signupSubmitButton = document.getElementById('signup-submit-button');
    const signupEmailOtp = document.getElementById('signup-email-otp');
    const signupPhoneOtp = document.getElementById('signup-phone-otp');
    const signupLoginLink = document.getElementById('signup-login-link');

    if (loginTitle) loginTitle.textContent = labels.modals.login.title;
    if (loginSubtitle) loginSubtitle.innerHTML = `Sign in to unlock <span class="highlight-accent">${utils.escapeHtml(labels.modals.login.subtitle.split(' ')[4])}</span>.`;
    if (loginEmail) loginEmail.placeholder = labels.modals.login.emailPlaceholder;
    if (loginPassword) loginPassword.placeholder = labels.modals.login.passwordPlaceholder;
    if (loginSubmitButton) loginSubmitButton.textContent = labels.modals.login.submitLabel;
    if (loginSignupLink) loginSignupLink.innerHTML = `${utils.escapeHtml(labels.modals.login.signupText)}<a href="#signup-modal">${utils.escapeHtml(labels.modals.login.signupLinkLabel)}</a>`;

    if (signupTitle) signupTitle.innerHTML = `Join <span>${utils.escapeHtml(labels.logo.brand)}${utils.escapeHtml(labels.logo.accent)}</span>`;
    if (signupSubtitle) signupSubtitle.textContent = labels.modals.signup.subtitle;
    if (signupName) signupName.placeholder = labels.modals.signup.namePlaceholder;
    if (signupEmail) signupEmail.placeholder = labels.modals.signup.emailPlaceholder;
    if (signupPhone) signupPhone.placeholder = labels.modals.signup.phonePlaceholder;
    if (signupOtp) signupOtp.placeholder = labels.modals.signup.otpPlaceholder;
    if (signupPassword) signupPassword.placeholder = labels.modals.signup.passwordPlaceholder;
    if (signupSubmitButton) signupSubmitButton.textContent = labels.modals.signup.submitLabel;
    if (signupEmailOtp) signupEmailOtp.textContent = labels.modals.signup.emailOtpLabel;
    if (signupPhoneOtp) signupPhoneOtp.textContent = labels.modals.signup.phoneOtpLabel;
    if (signupLoginLink) signupLoginLink.innerHTML = `${utils.escapeHtml(labels.modals.signup.loginText)}<a href="#login-modal">${utils.escapeHtml(labels.modals.signup.loginLinkLabel)}</a>`;
  }

  function initHeroSlider() {
    const slider = document.getElementById('hero-slider');
    const slides = slider ? Array.from(slider.querySelectorAll('.slide')) : [];
    if (!slider || slides.length < 2) return;

    let currentIndex = 0;

    const scrollToSlide = (index) => {
        currentIndex = (index + slides.length) % slides.length;

        slides.forEach((slide, i) => {
          const video = slide.querySelector("video");

          if (video) {
            if (i === currentIndex) {
              video.currentTime = 0;
              video.play().catch(() => {});
            } else {
              video.pause();
            }
          }
        });
      };

    sliderIntervalId = window.setInterval(() => scrollToSlide(currentIndex + 1), 5000);
    slider.addEventListener('mouseenter', () => window.clearInterval(sliderIntervalId));
    slider.addEventListener('mouseleave', () => {
      sliderIntervalId = window.setInterval(() => scrollToSlide(currentIndex + 1), 5000);
    });
  }

  document.addEventListener('DOMContentLoaded', init);
})();
