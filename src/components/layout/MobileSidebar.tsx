// src/components/layout/MobileSidebar.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './MobileSidebar.module.css';

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileSidebar: React.FC<MobileSidebarProps> = ({ isOpen, onClose }) => {
  return (
    <div className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ''}`}>
      {/* Header Section */}
      <div className={styles.sidebarHeader}>
        <div className={styles.userSection}>
          <div className={styles.avatar}>
            <svg className={styles.avatarIcon} fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
            </svg>
          </div>
          <div className={styles.userInfo}>
            <div className={styles.loginText}>Đăng nhập</div>
            <div className={styles.promoText}>Nhận nhiều ưu đãi hơn</div>
          </div>
          <button className={styles.arrowBtn}>
            <svg className={styles.arrowIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
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
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
              </svg>
            </div>
            <span>Quản lý tài khoản</span>
          </Link>

          <Link to="/notifications" className={styles.navItem} onClick={onClose}>
            <svg className={styles.navIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
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