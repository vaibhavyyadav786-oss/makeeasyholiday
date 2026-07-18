export function validateEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function validatePhone(value) {
  return /^\+?[0-9\s-]{7,15}$/.test(value);
}

export function validateRequired(value) {
  return String(value || '').trim().length > 0;
}

export function validateForm(fields) {
  const errors = {};
  Object.entries(fields).forEach(([name, value]) => {
    if (typeof value === 'string' && !validateRequired(value)) {
      errors[name] = 'This field is required.';
    }
  });
  return errors;
}
