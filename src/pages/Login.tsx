import React from 'react';
import AuthModal from '../components/auth/AuthModal';
import { Navigate } from 'react-router-dom';
import { authStore } from '../store/authStore';
import styles from './AuthPages.module.css';

const Login: React.FC = () => {
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
            <h1 className={styles.brandTitle}>Chào mừng trở lại!</h1>
            <p className={styles.brandSubtitle}>
              Khám phá thế giới sách cùng với chúng tôi
            </p>
          </div>
        </div>

        <div className={styles.formSection}>
          <div className={styles.formContainer}>
            <AuthModal 
              isOpen={true}
              onClose={() => {}} // Empty function since this is a page
              initialMode="login"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;