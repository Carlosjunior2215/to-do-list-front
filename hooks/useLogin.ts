import { useState } from 'react';
import { AuthService, LoginDTO } from '../services/auth.service';

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const login = async (data: LoginDTO) => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const result = await AuthService.login(data);
      setSuccess(true);
      console.log(result)
      localStorage.setItem('token', result.token);
      return { success: true, data: result };
    } catch (err: any) {
      setError(err.message || 'Ocorreu um erro inesperado ao fazer login.');
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading, error, success };
};
