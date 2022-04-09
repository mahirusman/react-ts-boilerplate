import { User } from "./models";

export type JWTTokens = { refresh: string; access: string };

export type StorageStore = {
  authTokens: JWTTokens | null | undefined;
};

export type loaderStoreState = {
  loader: boolean;
};

export type UserstoreState = {
  user: User;
};

export type StoreState = {
  loader: loaderStoreState;
  user: UserstoreState;
};

export type StoreState$Values = StoreState[keyof StoreState];
export type StoreState$Keys = keyof StoreState;
