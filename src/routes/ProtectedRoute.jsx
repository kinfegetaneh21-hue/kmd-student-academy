import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ roles, children }) {
  const { isAuthenticated, role } = useAuth();
  const loc = useLocation();
  if (!isAuthenticated) return <Navigate to="/login" state={{ from: loc.pathname }} replace />;
  if (roles && roles.length && !roles.includes(role)) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
}
