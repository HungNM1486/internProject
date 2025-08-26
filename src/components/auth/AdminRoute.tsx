import React, { ReactNode } from 'react';
import ProtectedRoute from './ProtectedRoute';
import { authStore } from '../../store/authStore';

interface AdminRouteProps {
  children: ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const { user, isAuthenticated, isLoading } = authStore();

  // Debug logging
  console.log('🔍 AdminRoute Debug:', {
    user,
    isAuthenticated,
    isLoading,
    userRole: user?.role,
    hasUser: !!user,
    userKeys: user ? Object.keys(user) : [],
    fullUserObject: JSON.stringify(user, null, 2),
  });

  return (
    <ProtectedRoute requireAuth={true} requireAdmin={true} fallbackPath="/unauthorized">
      {children}
    </ProtectedRoute>
  );
};

export default AdminRoute;
