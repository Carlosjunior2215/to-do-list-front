import api from '../config/api';

export interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
}

export const UserService = {
  async createUser(data: CreateUserDTO) {
    try {
      const response = await api.post('/users', data);
      return response.data;
    } catch (error: any) {
      let errorMessage = 'Erro ao criar usuário';
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
