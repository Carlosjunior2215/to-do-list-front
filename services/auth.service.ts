import api from '../config/api';

export interface LoginDTO {
  email: string;
  password: string;
}

export const AuthService = {
  async login(data: LoginDTO) {
    try {
      const response = await api.post('/auth/login', data);
      return response.data;
    } catch (error: any) {
      let errorMessage = 'E-mail ou senha incorretos';
      if (error.response && error.response.data) {
        if (error.response.data.result) {
          errorMessage = error.response.data.result;
        } else if (error.response.data.message) {
          const msg = error.response.data.message;
          errorMessage = Array.isArray(msg) ? msg[0] : msg;
        }
      }
      throw new Error(errorMessage);
    }
  }
};
