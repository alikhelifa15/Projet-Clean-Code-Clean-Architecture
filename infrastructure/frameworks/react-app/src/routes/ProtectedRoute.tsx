import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../features/auth/hooks/useAuth';
import Loader from '../components/Loader';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedTypes?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedTypes }) => {
  const location = useLocation();
  const { isAuthenticated, userType, isLoading } = useAuth();

  if (isLoading) {
    return <div><Loader/></div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedTypes && userType && !allowedTypes.includes(userType)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;