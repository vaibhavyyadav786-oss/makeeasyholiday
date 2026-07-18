import { ApiService } from './api.js';
import { APP_CONFIG } from '../utils/constants.js';
import { StorageService } from './storage.js';

export class ExcelService {
  constructor() {
    this.api = new ApiService();
    this.storage = new StorageService();
  }

  async submitInquiry(payload) {
    const saved = this.storage.get(APP_CONFIG.storageKeys.inquiries, []);
    const next = [...saved, { ...payload, submittedAt: new Date().toISOString() }];
    this.storage.set(APP_CONFIG.storageKeys.inquiries, next);

    try {
      return await this.api.post('/api/inquiries', payload);
    } catch (error) {
      console.warn('Spreadsheet submission failed; data was preserved locally.', error);
      return { ok: true, offline: true };
    }
  }
}
