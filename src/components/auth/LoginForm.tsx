import React, { useState } from 'react';
import { authStore } from '../../store/authStore';
import { useFormValidation } from '../../hooks/useFormValidation';
import { loginValidationRules } from '../../utils/validation';
import styles from './AuthModal.module.css';

interface LoginFormProps {
  onClose: () => void;
  onSwitchToRegister: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onClose, onSwitchToRegister }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { login } = authStore();

  const { values, errors, touched, handleChange, handleBlur, validateForm, reset } = useFormValidation({
    initialValues: { email: '', password: '' },
    validationRules: loginValidationRules
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      await login(values.email, values.password);
      onClose();
      reset();
    } catch (error: any) {
      console.error('Login error:', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.header}>
        <h2 className={styles.title}>Đăng nhập</h2>
        <p className={styles.subtitle}>Chào mừng bạn trở lại!</p>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="email" className={styles.label}>Email</label>
          <input
            id="email"
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`${styles.input} ${errors.email && touched.email ? styles.inputError : ''}`}
            placeholder="Nhập email của bạn"
            disabled={isLoading}
          />
          {errors.email && touched.email && (
            <span className={styles.errorText}>{errors.email}</span>
          )}
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="password" className={styles.label}>Mật khẩu</label>
          <input
            id="password"
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`${styles.input} ${errors.password && touched.password ? styles.inputError : ''}`}
            placeholder="Nhập mật khẩu"
            disabled={isLoading}
          />
          {errors.password && touched.password && (
            <span className={styles.errorText}>{errors.password}</span>
          )}
        </div>

        <div className={styles.forgotPassword}>
          <button type="button" className={styles.linkButton}>
            Quên mật khẩu?
          </button>
        </div>

        <button
          type="submit"
          disabled={isLoading || !values.email || !values.password}
          className={`${styles.submitButton} ${isLoading ? styles.loading : ''}`}
        >
          {isLoading ? (
            <span className={styles.loadingContent}>
              <svg className={styles.spinner} viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" opacity="0.25"/>
                <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
              </svg>
              Đang đăng nhập...
            </span>
          ) : (
            'Đăng nhập'
          )}
        </button>

        <div className={styles.divider}>
          <span>hoặc</span>
        </div>

        <div className={styles.switchMode}>
          <span>Chưa có tài khoản? </span>
          <button 
            type="button"
            onClick={onSwitchToRegister}
            className={styles.linkButton}
          >
            Tạo tài khoản ngay
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;