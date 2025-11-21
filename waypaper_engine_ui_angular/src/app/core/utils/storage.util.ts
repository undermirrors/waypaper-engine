export class StorageUtil {
  static set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('[StorageUtil] Error saving:', error);
    }
  }

  static get<T>(key: string, defaultValue: T): T {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) as T : defaultValue;
    } catch (error) {
      console.error('[StorageUtil] Error reading:', error);
      return defaultValue;
    }
  }

  static remove(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('[StorageUtil] Error removing:', error);
    }
  }

  static clear(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('[StorageUtil] Error clearing:', error);
    }
  }
}

