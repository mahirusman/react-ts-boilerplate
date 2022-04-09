import { JWTTokens } from "@/types";
import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";

import { config } from "../config/constants";
import { modelMapper } from "../models";
import StorageService from "./Storage";

const REFRESH_TOKEN = "/refresh/";

type APIRequestArgs = {
  url: string;
  payload?: any;
};

class ApiService {
  axios: AxiosInstance;

  authToken: JWTTokens | undefined | null;

  refreshing: boolean;

  constructor() {
    this.setupInstance();
    this.refreshing = false;
    this.axios = axios.create();
  }

  setupInstance = (authToken?: JWTTokens) => {
    const { SERVER_URL, showsAPIBodies } = config;
    const data: {
      headers: {
        Accept: string;
        Authorization?: string;
        "Content-Type": "application/json";
      };
      baseURL: string;
    } = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      baseURL: SERVER_URL || "",
    };

    this.authToken = authToken;
    this.axios = axios.create(data);
    if (authToken && authToken.access && authToken.access?.length > 0) {
      this.setAuthHeader(authToken.access);
    }

    let start: number;
    // @ts-ignore
    this.axios.interceptors.request.use((configuration) => {
      start = Date.now();
      if (config.showsAPIBodies) {
        const method = configuration?.method || "";
        // eslint-disable-next-line no-console
        console.groupCollapsed(
          `%c API Request => ${method.toUpperCase()} ${configuration.url}`,
          `color:white`
        );
        console.log("timestamp", new Date(Date.now()).toString());
        console.log("configuration", configuration);
        console.groupEnd();
      }
      return configuration;
    });

    this.axios.interceptors.response.use(
      (response: AxiosResponse) => {
        if (showsAPIBodies) {
          const method = response?.config?.method || "";
          // eslint-disable-next-line no-console
          console.groupCollapsed(
            `%c API Response => ${method.toUpperCase()} ${
              response?.config.url
            }`,
            `color: green`
          );
          console.log("timestamp", new Date(Date.now()).toString());
          console.log("duration", `${Date.now() - start}ms`);
          console.log("response", response);
          console.groupEnd();
        }

        return response;
      },
      async (error: AxiosError) => {
        const method = error.response?.config?.method || "";
        if (
          !this.refreshing &&
          (error.response?.status === 401 || error.response?.status === 403)
        ) {
          // Try to refresh the token and make the request again
          console.log(
            `%c API Refreshing => ${method.toUpperCase()} ${
              error.response?.config.url || ""
            }`,
            `color: green`
          );
          try {
            this.refreshing = true;
            const refreshResponse = await this.axios.post(REFRESH_TOKEN, {
              refresh: this.authToken?.refresh,
            });
            const tokens = refreshResponse.data;
            this.authToken = tokens;
            StorageService.setAuthTokens(tokens);
            this.setAuthHeader(tokens.access);
            // @ts-ignore
            const { apiResponseType } = error.config;
            const response = await this.axios.request({
              ...error.config,
              headers: {
                ...error.config.headers,
                Authorization: `Bearer ${tokens.access}`,
              },
            });
            if (apiResponseType) {
              response.data = modelMapper(
                response.data?.data || response.data?.results,
                // @ts-ignore
                apiResponseType
              );
            }
            this.refreshing = false;
            return Promise.resolve(response);
          } catch (e) {
            this.refreshing = false;
          }
        }
        console.groupCollapsed(
          `%c API Error => ${method.toUpperCase()} ${
            error.response?.config.url || ""
          }`,
          `color:green`
        );
        console.log("duration", `${Date.now() - start}ms`);
        console.log("error", { error });
        console.groupEnd();
        return Promise.reject(error);
      }
    );
  };

  setAuthHeader = (access: string) => {
    // this.axios.defaults.headers.Authorization = `Bearer ${access}`;
  };

  clearAuthInfo = (wrappedAPI: ApiService): ApiService => {
    this.setupInstance();
    return wrappedAPI;
  };

  get = ({
    url,
    payload,
  }: // @ts-ignore
  APIRequestArgs) =>
    this.axios.get<any, any>(url, {
      params: payload,
    });

  // @ts-ignore
  post = ({ url, payload }: APIRequestArgs) =>
    this.axios.post<any, any>(url, payload);

  // @ts-ignore
  delete = ({ url, payload }: APIRequestArgs) =>
    this.axios.delete(url, payload);
}

export default new ApiService();
