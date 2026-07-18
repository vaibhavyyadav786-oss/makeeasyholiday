export class Toast {
  constructor() {
    this.element = null;
  }

  render() {
    if (this.element) return this.element;
    this.element = document.createElement('div');
    this.element.className = 'toast-stack';
    document.body.appendChild(this.element);
    return this.element;
  }

  show(message, type = 'info') {
    const stack = this.render();
    const toast = document.createElement('div');
    toast.className = `toast toast--${type}`;
    toast.textContent = message;
    stack.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('is-visible');
    }, 10);

    setTimeout(() => {
      toast.classList.remove('is-visible');
      setTimeout(() => toast.remove(), 220);
    }, 3200);
  }
}
