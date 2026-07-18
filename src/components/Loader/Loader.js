export class Loader {
  constructor() {
    this.element = null;
  }

  render() {
    if (this.element) return this.element;
    this.element = document.createElement('div');
    this.element.className = 'app-loader';
    this.element.innerHTML = `
      <div class="app-loader__content">
        <div class="app-loader__spinner"></div>
        <p class="app-loader__text">Loading</p>
      </div>
    `;
    document.body.appendChild(this.element);
    return this.element;
  }

  show(text = 'Loading') {
    this.render();
    const label = this.element.querySelector('.app-loader__text');
    if (label) label.textContent = text;
    this.element.classList.add('is-visible');
  }

  hide() {
    if (!this.element) return;
    this.element.classList.remove('is-visible');
  }
}
