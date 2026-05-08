import { safeStorage } from 'electron';
import Store from 'electron-store';

const store = new Store();

export const StorageService = {
  saveToken(token: string) {
    if (safeStorage.isEncryptionAvailable()) {
      const encrypted = safeStorage.encryptString(token);
      store.set('auth_token', encrypted.toString('base64'));
    } else {
      store.set('auth_token', token);
    }
  },

  getToken(): string | null {
    const encryptedBase64 = store.get('auth_token') as string;
    if (!encryptedBase64) return null;

    if (safeStorage.isEncryptionAvailable()) {
      try {
        const buffer = Buffer.from(encryptedBase64, 'base64');
        return safeStorage.decryptString(buffer);
      } catch (e) {
        return encryptedBase64;
      }
    } else {
      return encryptedBase64;
    }
  },

  deleteToken() {
    store.delete('auth_token');
  },
};
