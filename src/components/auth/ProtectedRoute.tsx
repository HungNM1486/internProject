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
  fallbackPath = '/login'
}) => {
  const location = useLocation();
  const { user, isAuthenticated, isLoading } = authStore();

  // Hiển thị loading khi đang check authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  // Nếu yêu cầu authentication nhưng user chưa đăng nhập
  if (requireAuth && !isAuthenticated) {
    return <Navigate to={fallbackPath} state={{ from: location }} replace />;
  }

  // Nếu yêu cầu admin role nhưng user không phải admin
  if (requireAdmin && (!user || user.role !== 'admin')) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Nếu không yêu cầu auth và user đã đăng nhập, redirect
  if (!requireAuth && isAuthenticated) {
    const from = location.state?.from?.pathname || '/';
    return <Navigate to={from} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;