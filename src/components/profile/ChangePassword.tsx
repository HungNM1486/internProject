import React, { useState } from 'react';
import { authService } from '../../services/authService';
import { useFormValidation } from '../../hooks/useFormValidation';
import { changePasswordValidationRules } from '../../utils/validation';
import styles from './UserProfile.module.css';

const ChangePassword: React.FC = () => {
  const [isChanging, setIsChanging] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const { values, errors, touched, handleChange, handleBlur, validateForm, reset } = useFormValidation({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    },
    validationRules: changePasswordValidationRules
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsChanging(true);
    setMessage(null);
    
    try {
      await authService.changePassword(values.currentPassword, values.newPassword);
      setMessage('Đổi mật khẩu thành công!');
      reset();
      
      setTimeout(() => setMessage(null), 3000);
    } catch (error: any) {
      setMessage(`Lỗi: ${error.message}`);
    } finally {
      setIsChanging(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Đổi mật khẩu</h2>
      </div>

      {message && (
        <div className={`${styles.message} ${message.includes('Lỗi') ? styles.error : styles.success}`}>
          {message}
        </div>
      )}

      <div className={styles.profileCard}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="currentPassword" className={styles.label}>Mật khẩu hiện tại</label>
            <input
              id="currentPassword"
              type="password"
              name="currentPassword"
              value={values.currentPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`${styles.input} ${errors.currentPassword && touched.currentPassword ? styles.inputError : ''}`}
              placeholder="Nhập mật khẩu hiện tại"
              disabled={isChanging}
            />
            {errors.currentPassword && touched.currentPassword && (
              <span className={styles.errorText}>{errors.currentPassword}</span>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="newPassword" className={styles.label}>Mật khẩu mới</label>
            <input
              id="newPassword"
              type="password"
              name="newPassword"
              value={values.newPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`${styles.input} ${errors.newPassword && touched.newPassword ? styles.inputError : ''}`}
              placeholder="Nhập mật khẩu mới (ít nhất 6 ký tự)"
              disabled={isChanging}
            />
            {errors.newPassword && touched.newPassword && (
              <span className={styles.errorText}>{errors.newPassword}</span>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="confirmPassword" className={styles.label}>Xác nhận mật khẩu mới</label>
            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`${styles.input} ${errors.confirmPassword && touched.confirmPassword ? styles.inputError : ''}`}
              placeholder="Nhập lại mật khẩu mới"
              disabled={isChanging}
            />
            {errors.confirmPassword && touched.confirmPassword && (
              <span className={styles.errorText}>{errors.confirmPassword}</span>
            )}
          </div>

          <div className={styles.actions}>
            <button
              type="submit"
              disabled={isChanging || Object.keys(errors).length > 0}
              className={`${styles.saveButton} ${isChanging ? styles.loading : ''}`}
            >
              {isChanging ? (
                <span className={styles.loadingContent}>
                  <svg className={styles.spinner} viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" opacity="0.25"/>
                    <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                  </svg>
                  Đang đổi...
                </span>
              ) : (
                'Đổi mật khẩu'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;