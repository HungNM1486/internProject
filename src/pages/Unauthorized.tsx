import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authStore } from '../store/authStore';
import styles from './ErrorPages.module.css';

const Unauthorized: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = authStore();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.iconContainer}>
          <svg className={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        
        <h1 className={styles.title}>Truy cập bị từ chối</h1>
        
        <p className={styles.description}>
          {!isAuthenticated 
            ? 'Bạn cần đăng nhập để truy cập trang này.'
            : 'Bạn không có quyền truy cập vào trang này. Vui lòng liên hệ quản trị viên nếu bạn cần hỗ trợ.'
          }
        </p>

        <div className={styles.actions}>
          <button onClick={handleGoBack} className={styles.secondaryButton}>
            <svg className={styles.buttonIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Quay lại
          </button>
          
          <button onClick={handleGoHome} className={styles.primaryButton}>
            <svg className={styles.buttonIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Về trang chủ
          </button>

          {!isAuthenticated && (
            <Link to="/login" className={styles.primaryButton}>
              <svg className={styles.buttonIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Đăng nhập
            </Link>
          )}
        </div>

        <div className={styles.helpSection}>
          <p className={styles.helpText}>
            Cần hỗ trợ? <Link to="/contact" className={styles.helpLink}>Liên hệ với chúng tôi</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;