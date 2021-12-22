import axios from 'axios';
import { config } from '../config/constants';

const Config = config.SERVER_URL;

export class HttpService {
  protected get = (url: string, params?: any) =>
    axios.get(`${Config}/${url}`, {
      params,
    });

  protected post = (url: string, body: any, options = {}) =>
    axios.post(`${Config}/${url}`, body, {
      ...options,
    });

  protected delete = (url: string, params?: any, data?: any) =>
    axios.delete(`${Config}/${url}`, { params, data });

  protected put = (url: string, body?: any, params?: any) =>
    axios.put(`${Config}/${url}`, body, {
      ...params,
    });
}
