import React, { useState } from 'react';
import { authStore } from '../../store/authStore';
import { useFormValidation } from '../../hooks/useFormValidation';
import { registerValidationRules } from '../../utils/validation';
import styles from './AuthModal.module.css';

interface RegisterFormProps {
  onClose: () => void;
  onSwitchToLogin: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onClose, onSwitchToLogin }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { register } = authStore();

  const { values, errors, touched, handleChange, handleBlur, validateForm, reset } =
    useFormValidation({
      initialValues: {
        username: '',
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreeToTerms: false,
      },
      validationRules: registerValidationRules,
    });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      await register(values.username, values.email, values.password);
      onClose();
      reset();
    } catch (error: any) {
      console.error('Register error:', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.header}>
        <h2 className={styles.title}>Tạo tài khoản</h2>
        <p className={styles.subtitle}>Tham gia cộng đồng đọc sách cùng chúng tôi!</p>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="username" className={styles.label}>
            Tên đăng nhập
          </label>
          <input
            id="username"
            type="text"
            name="username"
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`${styles.input} ${errors.username && touched.username ? styles.inputError : ''}`}
            placeholder="Nhập tên đăng nhập"
            disabled={isLoading}
          />
          {errors.username && touched.username && (
            <span className={styles.errorText}>{errors.username}</span>
          )}
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="fullName" className={styles.label}>
            Họ và tên
          </label>
          <input
            id="fullName"
            type="text"
            name="fullName"
            value={values.fullName}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`${styles.input} ${errors.fullName && touched.fullName ? styles.inputError : ''}`}
            placeholder="Nhập họ và tên"
            disabled={isLoading}
          />
          {errors.fullName && touched.fullName && (
            <span className={styles.errorText}>{errors.fullName}</span>
          )}
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
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
          <label htmlFor="password" className={styles.label}>
            Mật khẩu
          </label>
          <input
            id="password"
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`${styles.input} ${errors.password && touched.password ? styles.inputError : ''}`}
            placeholder="Nhập mật khẩu (ít nhất 6 ký tự)"
            disabled={isLoading}
          />
          {errors.password && touched.password && (
            <span className={styles.errorText}>{errors.password}</span>
          )}
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="confirmPassword" className={styles.label}>
            Xác nhận mật khẩu
          </label>
          <input
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            value={values.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`${styles.input} ${errors.confirmPassword && touched.confirmPassword ? styles.inputError : ''}`}
            placeholder="Nhập lại mật khẩu"
            disabled={isLoading}
          />
          {errors.confirmPassword && touched.confirmPassword && (
            <span className={styles.errorText}>{errors.confirmPassword}</span>
          )}
        </div>

        <div className={styles.checkboxGroup}>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              name="agreeToTerms"
              checked={values.agreeToTerms}
              onChange={handleChange}
              className={styles.checkbox}
              disabled={isLoading}
            />
            <span className={styles.checkboxText}>
              Tôi đồng ý với{' '}
              <button type="button" className={styles.linkButton}>
                Điều khoản sử dụng
              </button>{' '}
              và{' '}
              <button type="button" className={styles.linkButton}>
                Chính sách bảo mật
              </button>
            </span>
          </label>
          {errors.agreeToTerms && touched.agreeToTerms && (
            <span className={styles.errorText}>{errors.agreeToTerms}</span>
          )}
        </div>

        <button
          type="submit"
          disabled={
            isLoading ||
            !values.username ||
            !values.email ||
            !values.password ||
            !values.fullName ||
            !values.agreeToTerms
          }
          className={`${styles.submitButton} ${isLoading ? styles.loading : ''}`}
        >
          {isLoading ? (
            <span className={styles.loadingContent}>
              <svg className={styles.spinner} viewBox="0 0 24 24">
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                  opacity="0.25"
                />
                <path
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Đang tạo tài khoản...
            </span>
          ) : (
            'Tạo tài khoản'
          )}
        </button>

        <div className={styles.divider}>
          <span>hoặc</span>
        </div>

        <div className={styles.switchMode}>
          <span>Đã có tài khoản? </span>
          <button type="button" onClick={onSwitchToLogin} className={styles.linkButton}>
            Đăng nhập ngay
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
