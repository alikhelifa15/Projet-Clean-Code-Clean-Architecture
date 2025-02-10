import { useMutation } from '@tanstack/react-query';
import { authApi } from '../api/rest';
import { LoginData, LoginResponse } from '../types';



export const useLogin = () => {
  const loginMutation = useMutation({
    mutationFn: async (data: LoginData): Promise<LoginResponse> => {
      const response = await authApi.login(data);
      return response;
    }
  });

  return {
    login: loginMutation.mutateAsync,
    isLoading: loginMutation.isPending,
    error: loginMutation.error
  };
};