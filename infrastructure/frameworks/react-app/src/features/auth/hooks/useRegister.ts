import { useMutation } from '@tanstack/react-query';
import { authApi } from '../api/rest';
import { DealerRegistrationData, CompanyRegistrationData } from '../types';

export const useRegister = () => {
  const dealerMutation = useMutation({
    mutationFn: (data: DealerRegistrationData) => authApi.registerDealer(data),

    onSuccess: (data) => {
     console.log(data);
    },
    onError: (error) => {
      console.error(error);
    }
  });

  const companyMutation = useMutation({
    mutationFn: (data: CompanyRegistrationData) => authApi.registerCompany(data),
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.error(error);
    }
  });

  return {
    registerDealer: dealerMutation.mutate,
    registerCompany: companyMutation.mutate,
    isLoading: dealerMutation.isPending || companyMutation.isPending,
    error: dealerMutation.error || companyMutation.error
  };
};