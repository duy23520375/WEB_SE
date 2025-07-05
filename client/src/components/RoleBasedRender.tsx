import { useAuth } from '../auth/AuthContext';

export const RoleBasedRender = ({ allow, children }: { allow: 'Admin' | 'NhanVien', children: React.ReactNode }) => {
  const { role } = useAuth();
  return role === allow ? <>{children}</> : null;
};