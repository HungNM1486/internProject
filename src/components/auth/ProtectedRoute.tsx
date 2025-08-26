// src/components/auth/ProtectedRoute.tsx
import React, { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { authStore } from '../../store/authStore';
import LoadingSpinner from '../common/LoadingSpinner';

interface ProtectedRouteProps {
  children: ReactNode;
  requireAuth?: boolean;
  requireAdmin?: boolean;
  fallbackPath?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireAuth = true,
  requireAdmin = false,
  fallbackPath = '/login',
}) => {
  const location = useLocation();
  const { user, isAuthenticated, isLoading } = authStore();

  // Debug logging
  console.log('🛡️ ProtectedRoute Debug:', {
    location: location.pathname,
    requireAuth,
    requireAdmin,
    fallbackPath,
    user,
    isAuthenticated,
    isLoading,
    userRole: user?.role,
    willShowLoading: isLoading,
    willRedirectToLogin: requireAuth && !isAuthenticated,
    willRedirectToUnauthorized: requireAdmin && (!user || user.role !== 'admin'),
    willShowChildren:
      !isLoading &&
      (!requireAuth || isAuthenticated) &&
      (!requireAdmin || (user && user.role === 'admin')),
  });

  // Hiển thị loading khi đang check authentication
  if (isLoading) {
    console.log('⏳ ProtectedRoute: Showing loading spinner');
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  // Nếu yêu cầu authentication nhưng user chưa đăng nhập
  if (requireAuth && !isAuthenticated) {
    console.log('🚫 ProtectedRoute: Redirecting to login - not authenticated');
    return <Navigate to={fallbackPath} state={{ from: location }} replace />;
  }

  // Nếu yêu cầu admin role nhưng user không phải admin
  if (requireAdmin && (!user || user.role !== 'admin')) {
    console.log('🚫 ProtectedRoute: Redirecting to unauthorized - not admin', {
      hasUser: !!user,
      userRole: user?.role,
      expectedRole: 'admin',
    });
    return <Navigate to="/unauthorized" replace />;
  }

  // Nếu không yêu cầu auth và user đã đăng nhập, redirect
  if (!requireAuth && isAuthenticated) {
    const from = location.state?.from?.pathname || '/';
    console.log('🔄 ProtectedRoute: Redirecting authenticated user to:', from);
    return <Navigate to={from} replace />;
  }

  console.log('✅ ProtectedRoute: Rendering children');
  return <>{children}</>;
};

export default ProtectedRoute;
