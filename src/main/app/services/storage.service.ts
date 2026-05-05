import { safeStorage } from 'electron';
import Store from 'electron-store';

const store = new Store();

export const StorageService = {
  saveToken(token: string) {
    if (!safeStorage.isEncryptionAvailable()) return;
    
    const encrypted = safeStorage.encryptString(token);
    store.set('auth_token', encrypted.toString('base64'));
  },

  getToken(): string | null {
    const encryptedBase64 = store.get('auth_token') as string;
    if (!encryptedBase64 || !safeStorage.isEncryptionAvailable()) return null;

    try {
      const buffer = Buffer.from(encryptedBase64, 'base64');
      return safeStorage.decryptString(buffer);
    } catch (e) {
      console.error("Falha ao descriptografar token:", e);
      return null;
    }
  },

  deleteToken() {
    store.delete('auth_token');
  }
};
