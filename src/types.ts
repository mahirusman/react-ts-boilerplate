export type JWTTokens = { refresh: string; access: string };

export type StorageStore = {
  authTokens: JWTTokens | null | undefined;
};
