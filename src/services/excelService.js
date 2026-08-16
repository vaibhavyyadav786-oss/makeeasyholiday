import { APP_CONFIG } from '../utils/constants.js';
import { StorageService } from './storage.js';

export class ExcelService {
  constructor() {
    this.storage = new StorageService();
    // Niche single quotes (' ') ke andar apna lamba wala Google Web App URL paste karein:
    this.scriptUrl = 'https://script.google.com/macros/s/AKfycbxgvgJ5ydy8iSlNrHOH43zjKUDnMy0EU229StD0qi_entvwQtikBh9z8__Fm6Y4zAkStQ/exec';
  }

  async submitInquiry(payload) {
    // Backup ke liye data browser (local storage) mein hamesha save karna
    const saved = this.storage.get(APP_CONFIG.storageKeys.inquiries, []);
    const next = [...saved, { ...payload, submittedAt: new Date().toISOString() }];
    this.storage.set(APP_CONFIG.storageKeys.inquiries, next);

    try {
      // Google Sheet (doPost) ko data bhejne ke liye format set karna
      const formData = new URLSearchParams();
      formData.append('name', payload.name);
      formData.append('phone', payload.phone);
      formData.append('email', payload.email);
      formData.append('destination', payload.destination);
      formData.append('date', payload.date);
      formData.append('days', payload.days);
      formData.append('requirements', payload.requirements);

      // Google Apps Script URL par data bhejna
      await fetch(this.scriptUrl, {
        method: 'POST',
        body: formData,
        mode: 'no-cors' // Google Sheets integration ke liye bina error ke run karne ke liye
      });

      return { ok: true };
    } catch (error) {
      console.warn('Spreadsheet submission failed; data was preserved locally.', error);
      return { ok: true, offline: true };
    }
  }
}
