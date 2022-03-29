import { StorageStore } from "@/types";

const AsyncStorage = window.localStorage;

export const Keys: { [key: string]: keyof StorageStore } = {
  AUTH_TOKEN: "authTokens",
};

const EMPTY_VALUE = "null";

// Wrapper class for Async Storage
// API: https://github.com/react-native-community/async-storage/blob/master/docs/API.md
class StorageService {
  get(key: keyof StorageStore): Promise<any> {
    return new Promise((resolve) => {
      AsyncStorage.getItem(key).then(
        (res: string | null) => {
          const value = this.fromJSON(res);
          resolve(value);
        },
        (err) => {
          const e = JSON.parse(JSON.stringify(err));
          if (e.code !== "404") {
            console.warn("[Storage] Get", key, err);
          }
          resolve(null);
        }
      );
    });
  }

  set(key: keyof StorageStore, value: any): Promise<any> {
    const storeValue = this.toJSON(value);
    return AsyncStorage.setItem(key, storeValue);
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

  getAllKeys(): Promise<any> {
    return new Promise((resolve) => {
      AsyncStorage.multiGet(Object.values(Keys)).then(
        (result: Array<[string, string | null]>) => {
          const obj = {};
          // @ts-ignore
          result.forEach(([key, value]: [string, string]) => {
            // @ts-ignore
            obj[key] = this.fromJSON(value);
          });
          resolve(obj);
        }
      );
    });
  }

  getItem(key: keyof StorageStore): Promise<any> {
    return this.get(key);
  }

  setItem(key: keyof StorageStore, value: any): Promise<any> {
    return this.set(key, value);
  }

  clearAllKeys(): Promise<any> {
    return new Promise((resolve) => {
      AsyncStorage.multiRemove([Keys.DEBUG_AUTH_TOKEN, Keys.AUTH_TOKEN]).then(
        () => resolve()
      );
    });
  }

  setAuthTokens = (authTokens: JWTTokens | null) =>
    this.set(Keys.AUTH_TOKEN, authTokens);

  getAuthTokens = (): Promise<JWTTokens | null> => this.get(Keys.AUTH_TOKEN);

  setDebugAuthTokens = (authToken: JWTTokens | null) =>
    this.set(Keys.DEBUG_AUTH_TOKEN, authToken);

  getDebugAuthTokens = (): Promise<JWTTokens | null> =>
    this.get(Keys.DEBUG_AUTH_TOKEN);
}

export default new StorageService();
