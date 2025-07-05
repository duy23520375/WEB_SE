import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

export const ProtectedRoute = ({ allow, children }: { allow: 'Admin' | 'NhanVien', children: JSX.Element }) => {
  const { role } = useAuth();

  if (!role) return <Navigate to="/login" replace />;
  if (role !== allow) return <Navigate to="/" replace />;

  return children;
};