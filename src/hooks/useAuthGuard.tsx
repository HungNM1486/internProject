import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { authStore } from '../store/authStore';
import { User } from '../types';

interface UseAuthGuardOptions {
  requireAuth?: boolean;
  requireAdmin?: boolean;
  redirectTo?: string;
}

export const useAuthGuard = (options: UseAuthGuardOptions = {}) => {
  const {
    requireAuth = true,
    requireAdmin = false,
    redirectTo = '/login'
  } = options;

  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated, isLoading } = authStore();

  useEffect(() => {
    if (isLoading) return;

    // Check authentication requirement
    if (requireAuth && !isAuthenticated) {
      navigate(redirectTo, { 
        state: { from: location },
        replace: true 
      });
      return;
    }

    // Check admin requirement
    if (requireAdmin && (!user || user.role !== 'admin')) {
      navigate('/unauthorized', { replace: true });
      return;
    }

    // Redirect authenticated users from login/register pages
    if (!requireAuth && isAuthenticated) {
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
      return;
    }
  }, [user, isAuthenticated, isLoading, requireAuth, requireAdmin, navigate, location, redirectTo]);

  return {
    user,
    isAuthenticated,
    isLoading,
    isAdmin: user?.role === 'admin',
    canAccess: requireAuth ? isAuthenticated && (!requireAdmin || user?.role === 'admin') : true
  };
};