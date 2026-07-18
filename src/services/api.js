export class ApiService {
  constructor(baseUrl = '') {
    this.baseUrl = baseUrl;
  }

  async post(path, payload) {
    const response = await fetch(`${this.baseUrl}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error('Request failed');
    }

    return response.json().catch(() => ({}));
  }
}
