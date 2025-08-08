// src/components/layout/MobileSidebar.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { authStore } from '../../store/authStore';
import styles from './MobileSidebar.module.css';

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginClick?: () => void;
}

const MobileSidebar: React.FC<MobileSidebarProps> = ({ isOpen, onClose, onLoginClick }) => {
  const { user, isAuthenticated, logout } = authStore();

  const handleLoginClick = () => {
    if (onLoginClick) {
      onLoginClick();
    } else {
      onClose();
    }
  };

  const handleLogout = () => {
    logout();
    onClose();
  };

  return (
    <div className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ''}`}>
      {/* Header Section */}
      <div className={styles.sidebarHeader}>
        <div className={styles.userSection}>
          <div className={styles.avatar}>
            <svg className={styles.avatarIcon} fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          </div>
          <div className={styles.userInfo}>
            <div className={styles.loginText}>
              {isAuthenticated ? (user?.fullName || user?.email) : 'Đăng nhập'}
            </div>
            <div className={styles.promoText}>
              {isAuthenticated ? user?.role === 'admin' ? 'Quản trị viên' : 'Khách hàng' : 'Nhận nhiều ưu đãi hơn'}
            </div>
          </div>
          {isAuthenticated ? (
            <button onClick={handleLogout} className={styles.arrowBtn} title="Đăng xuất">
              <svg className={styles.arrowIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          ) : (
            <button onClick={handleLoginClick} className={styles.arrowBtn}>
              <svg className={styles.arrowIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className={styles.sidebarContent}>
        {/* Navigation Group 1 */}
        <div className={styles.navGroup}>
          <Link to="/" className={styles.navItem} onClick={onClose}>
            <svg className={styles.navIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span>Trang chủ</span>
          </Link>

          <Link to="/categories" className={styles.navItem} onClick={onClose}>
            <svg className={styles.navIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
            <span>Danh sách ngành hàng</span>
          </Link>

          <Link to="/account" className={styles.navItem} onClick={onClose}>
            <div className={styles.smallAvatar}>
              <svg className={styles.smallAvatarIcon} fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
            </div>
            <span>{isAuthenticated ? 'Hồ sơ của tôi' : 'Quản lý tài khoản'}</span>
          </Link>

          <Link to="/notifications" className={styles.navItem} onClick={onClose}>
            <svg className={styles.navIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5-5-5h5v-8a4 4 0 118 0v8z" />
            </svg>
            <span>Thông báo</span>
          </Link>
        </div>

        <div className={styles.divider}></div>

        {/* Promotion Group */}
        <div className={styles.navGroup}>
          <div className={styles.groupTitle}>KHUYẾN MÃI HOT</div>
          
          <Link to="/tiki-deal" className={styles.navItem} onClick={onClose}>
            <span>Tiki deal</span>
          </Link>

          <Link to="/gift-voucher" className={styles.navItem} onClick={onClose}>
            <span>Phiếu quà tặng</span>
          </Link>

          <Link to="/bank-offers" className={styles.navItem} onClick={onClose}>
            <span>Ưu đãi cho chủ thẻ ngân hàng</span>
          </Link>
        </div>

        <div className={styles.divider}></div>

        {/* Support Group */}
        <div className={styles.navGroup}>
          <div className={styles.groupTitle}>HỖ TRỢ</div>
          
          <div className={styles.supportItem}>
            <span className={styles.hotlineLabel}>HOTLINE:</span>
            <a href="tel:19006035" className={styles.hotlineNumber}>1900 - 6035</a>
            <span className={styles.hotlineRate}>(1000đ/phút)</span>
          </div>

          <Link to="/customer-support" className={styles.navItem} onClick={onClose}>
            <span>Hỗ trợ khách hàng</span>
            <svg className={styles.arrowIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MobileSidebar;