// src/components/admin/AdminLayout.tsx
import React, { ReactNode, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { authStore } from '../../store/authStore';
import styles from './AdminLayout.module.css';

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = authStore();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Debug logging
  console.log('AdminLayout Debug:', {
    children,
    location: location.pathname,
    user,
    hasChildren: !!children,
  });

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const menuItems = [
    {
      path: '/admin',
      label: 'Dashboard',
      icon: (
        <svg className={styles.menuIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      ),
    },
    {
      path: '/admin/products',
      label: 'Sản phẩm',
      icon: (
        <svg className={styles.menuIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      ),
    },
    {
      path: '/admin/orders',
      label: 'Đơn hàng',
      icon: (
        <svg className={styles.menuIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
          />
        </svg>
      ),
    },
    {
      path: '/admin/users',
      label: 'Người dùng',
      icon: (
        <svg className={styles.menuIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
          />
        </svg>
      ),
    },
  ];

  const isActive = (path: string) => {
    if (path === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className={styles.adminLayout}>
      {/* Sidebar */}
      <aside
        className={`${styles.sidebar} ${isSidebarCollapsed ? styles.collapsed : ''} ${isMobileMenuOpen ? styles.mobileOpen : ''}`}
      >
        <div className={styles.sidebarHeader}>
          <Link to="/admin" className={styles.logo}>
            <img src="/logo.png" alt="Admin Logo" className={styles.logoImage} />
            {!isSidebarCollapsed && <span className={styles.logoText}>Admin Panel</span>}
          </Link>
        </div>

        <nav className={styles.sidebarNav}>
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`${styles.navItem} ${isActive(item.path) ? styles.active : ''}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.icon}
              {!isSidebarCollapsed && <span className={styles.navLabel}>{item.label}</span>}
            </Link>
          ))}
        </nav>

        <div className={styles.sidebarFooter}>
          <Link to="/" className={styles.backToSite}>
            <svg className={styles.menuIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            {!isSidebarCollapsed && <span>Về trang chính</span>}
          </Link>
        </div>
      </aside>

      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div className={styles.mobileOverlay} onClick={() => setIsMobileMenuOpen(false)} />
      )}

      {/* Main content */}
      <div className={styles.mainContent}>
        {/* Top bar */}
        <header className={styles.topBar}>
          <div className={styles.topBarLeft}>
            <button onClick={toggleSidebar} className={`${styles.sidebarToggle} ${styles.desktop}`}>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            <button
              onClick={toggleMobileMenu}
              className={`${styles.sidebarToggle} ${styles.mobile}`}
            >
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            <h1 className={styles.pageTitle}>
              {menuItems.find((item) => isActive(item.path))?.label || 'Admin Panel'}
            </h1>
          </div>

          <div className={styles.topBarRight}>
            <div className={styles.userMenu}>
              <div className={styles.userInfo}>
                <div className={styles.userAvatar}>
                  {user?.fullName?.charAt(0) || user?.email?.charAt(0) || 'A'}
                </div>
                <div className={styles.userDetails}>
                  <span className={styles.userName}>{user?.fullName || user?.email}</span>
                  <span className={styles.userRole}>Quản trị viên</span>
                </div>
              </div>

              <div className={styles.userActions}>
                <Link to="/profile" className={styles.userAction}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <span>Hồ sơ</span>
                </Link>

                <button onClick={handleLogout} className={styles.userAction}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  <span>Đăng xuất</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main
          className={styles.content}
          style={{ padding: '20px', background: 'yellow', minHeight: '400px' }}
        >
          <div>{children}</div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
