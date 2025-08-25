import React from 'react';
import AuthModal from '../components/auth/AuthModal';
import { Navigate } from 'react-router-dom';
import { authStore } from '../store/authStore';
import styles from './AuthPages.module.css';

const Register: React.FC = () => {
  const { isAuthenticated } = authStore();

  // Redirect if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className={styles.pageContainer}>
      <div className={styles.backgroundPattern}></div>
      
      <div className={styles.contentWrapper}>
        <div className={styles.brandSection}>
          <div className={styles.brandContent}>
            <img 
              src="/logo.png" 
              alt="Logo" 
              className={styles.brandLogo}
            />
            <h1 className={styles.brandTitle}>Tham gia cùng chúng tôi!</h1>
            <p className={styles.brandSubtitle}>
              Tạo tài khoản để khám phá thế giới sách đầy thú vị
            </p>
            
            <div className={styles.featuresList}>
              <div className={styles.featureItem}>
                <svg className={styles.featureIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Miễn phí đăng ký</span>
              </div>
              
              <div className={styles.featureItem}>
                <svg className={styles.featureIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Giao hàng nhanh chóng</span>
              </div>
              
              <div className={styles.featureItem}>
                <svg className={styles.featureIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
                <span>Ưu đãi độc quyền</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.formSection}>
          <div className={styles.formContainer}>
            <AuthModal 
              isOpen={true}
              onClose={() => {}} // Empty function since this is a page
              initialMode="register"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;