import React, { ReactNode } from 'react';
import { useAuthGuard } from '../../hooks/useAuthGuard';
import LoadingSpinner from '../common/LoadingSpinner';
import UnauthorizedPage from '../../pages/Unauthorized';

interface AuthGuardProps {
  children: ReactNode;
  requireAuth?: boolean;
  requireAdmin?: boolean;
  fallback?: ReactNode;
  loadingComponent?: ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({
  children,
  requireAuth = true,
  requireAdmin = false,
  fallback,
  loadingComponent
}) => {
  const { isLoading, canAccess, isAdmin } = useAuthGuard({
    requireAuth,
    requireAdmin
  });

  if (isLoading) {
    return loadingComponent || (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (!canAccess) {
    if (requireAdmin && !isAdmin) {
      return fallback || <UnauthorizedPage />;
    }
    // Navigation will be handled by useAuthGuard hook
    return null;
  }

  return <>{children}</>;
};

export default AuthGuard;