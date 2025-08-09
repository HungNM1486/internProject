import React, { ReactNode } from 'react';
import ProtectedRoute from './ProtectedRoute';

interface AdminRouteProps {
  children: ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  return (
    <ProtectedRoute requireAuth={true} requireAdmin={true} fallbackPath="/unauthorized">
      {children}
    </ProtectedRoute>
  );
};

export default AdminRoute;