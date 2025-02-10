import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const useLogout = () => {
  const navigate = useNavigate();

  const logoutMutation = useMutation({
    mutationFn: async () => {
      localStorage.clear();
      window.dispatchEvent(new Event('logout'));
    },
    onSuccess: () => {
      toast.success('Déconnexion réussie', {
        position: "top-right",
        autoClose: 2000
      });
      navigate('/login');
    },
  });

  return {
    logout: logoutMutation.mutate,
    isLoading: logoutMutation.isPending
  };
};