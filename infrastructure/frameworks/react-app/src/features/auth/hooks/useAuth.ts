import { useEffect, useState } from 'react';
import { DecodedUser } from '../types';
import { jwtDecode } from 'jwt-decode';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userType, setUserType] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const verifyToken = () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded: DecodedUser = jwtDecode(token);
        const isTokenValid = decoded.exp * 1000 > Date.now();

        if (isTokenValid) {
          setIsAuthenticated(true);
          setUserType(decoded.type.value);
        } else {
          localStorage.clear();
          setIsAuthenticated(false);
          setUserType(null);
        }
      } catch (error) {
        console.error('Error verifying token:', error);
        localStorage.clear();
        setIsAuthenticated(false);
        setUserType(null);
      }
    } else {
      setIsAuthenticated(false);
      setUserType(null);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    verifyToken();

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'token') {
        verifyToken();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    const handleLogout = () => {
      verifyToken();
    };
    window.addEventListener('logout', handleLogout);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('logout', handleLogout);
    };
  }, []);

  return { isAuthenticated, userType, isLoading };
};