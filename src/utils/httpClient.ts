import axios from 'axios';
import { config } from '../config/constants';

const httpClient = axios.create({
  baseURL: config.SERVER_URL,
});

// Add this as an interceptor so that it calls currentSession for each ajax
// request which will refresh out id token automatically in the background in
// case it expires.
httpClient.interceptors.request.use(async (config) => {
  return config;
});

export default httpClient;
