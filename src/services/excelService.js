import { APP_CONFIG } from '../utils/constants.js';
import { StorageService } from './storage.js';

export class ExcelService {
  constructor() {
    this.storage = new StorageService();
    this.scriptUrl = 'https://script.google.com/macros/s/AKfycbwpdN8VCl8StkShumO2WZ5oEvwWAqdh6SOwU6-oHvCUiYxvbw6UnMwcvMWpUOcg4JwA7g/exec';
  }

  async submitInquiry(payload) {
    const saved = this.storage.get(APP_CONFIG.storageKeys.inquiries, []);
    const next = [...saved, { ...payload, submittedAt: new Date().toISOString() }];
    this.storage.set(APP_CONFIG.storageKeys.inquiries, next);

    try {
      const formData = new URLSearchParams();
      formData.append('name', payload.name);
      formData.append('phone', payload.phone);
      formData.append('email', payload.email);
      formData.append('destination', payload.destination);
      formData.append('date', payload.date);
      formData.append('days', payload.days);
      formData.append('requirements', payload.requirements);
      await fetch(this.scriptUrl, {
        method: 'POST',
        body: formData,
      });

      return { ok: true };
    } catch (error) {
      console.warn('Spreadsheet submission failed; data was preserved locally.', error);
      return { ok: true, offline: true };
    }
  }
}
