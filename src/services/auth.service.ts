import { HttpService } from './base.service';

class AuthService extends HttpService {
  private readonly prefix = 'user';
  login(data: any) {
    this.post(`${this.prefix}/login`, data);
  }
}

export const authService = new AuthService();
