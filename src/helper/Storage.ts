import { JWTTokens, StorageStore } from "src/types";

const { localStorage } = window;

export const Keys: { [key: string]: keyof StorageStore } = {
  AUTH_TOKEN: "authTokens",
};

const EMPTY_VALUE = "null";

class StorageService {
  get(key: keyof StorageStore): any {
    // @ts-ignore: Object is possibly 'null'.
    const res: string | null = localStorage.getItem(key);
    if (res) {
      return this.fromJSON(res);
    }
    console.warn("[Storage] Get", key, "not found");
  }

  set(key: keyof StorageStore, value: any): void {
    const storeValue = this.toJSON(value);
    return localStorage.setItem(key, storeValue);
  }

  toJSON = (value: any) => {
    let storeValue = value;
    if (storeValue === null || storeValue === undefined) {
      storeValue = EMPTY_VALUE;
    } else if (typeof value !== "string") {
      storeValue = JSON.stringify(value).replace(/\\"/g, "");
    }
    return storeValue;
  };

  fromJSON = (value: any) => {
    let val = value;
    if (EMPTY_VALUE === value) {
      val = null;
    } else if (value) {
      if (typeof value === "string") {
        if (
          value[0] === "{" ||
          value[0] === "[" ||
          value === "true" ||
          value === "false" ||
          value === "null"
        ) {
          try {
            val = JSON.parse(value);
          } catch (e) {
            console.warn(e);
          }
        }
      }
    }
    return val;
  };

  getItem(key: keyof StorageStore): any {
    return this.get(key);
  }

  setItem(key: keyof StorageStore, value: any): void {
    return this.set(key, value);
  }

  clearAllKeys(): void {
    localStorage.clear();
  }

  setAuthTokens = (authTokens: JWTTokens | null) => this.set(Keys.AUTH_TOKEN, authTokens);

  getAuthTokens = (): JWTTokens | null => this.get(Keys.AUTH_TOKEN);
}

export default new StorageService();
