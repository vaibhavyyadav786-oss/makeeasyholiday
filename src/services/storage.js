export class StorageService {
  constructor(storage = window.localStorage) {
    this.storage = storage;
  }

  get(key, fallback = null) {
    try {
      const value = this.storage.getItem(key);
      return value ? JSON.parse(value) : fallback;
    } catch (error) {
      console.error('Storage read failed', error);
      return fallback;
    }
  }

  set(key, value) {
    try {
      this.storage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error('Storage write failed', error);
      return false;
    }
  }

  remove(key) {
    this.storage.removeItem(key);
  }
}
