import { useState } from 'react';
import { UserService, CreateUserDTO } from '../services/user.service';

export const useSignup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const signup = async (data: CreateUserDTO) => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await UserService.createUser(data);
      setSuccess(true);
      return { success: true };
    } catch (err: any) {
      setError(err.message || 'Ocorreu um erro inesperado.');
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  };

  return { signup, isLoading, error, success };
};
