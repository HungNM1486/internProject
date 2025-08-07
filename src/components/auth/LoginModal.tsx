// src/components/auth/LoginModal.tsx
import React, { useState } from 'react';
import { authStore } from '../../store/authStore';
import styles from './AuthModal.module.css';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToRegister: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onSwitchToRegister }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isLoading, setIsLoading] = useState(false);
  const { login } = authStore();

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.email) {
      newErrors.email = 'Vui lòng nhập email';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }
    
    if (!formData.password) {
      newErrors.password = 'Vui lòng nhập mật khẩu';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setIsLoading(true);
    setErrors({});
    
    try {
      await login(formData.email, formData.password);
      onClose();
      setFormData({ email: '', password: '' });
    } catch (error: any) {
      setErrors({ general: error.message || 'Đăng nhập thất bại' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <div className={styles.content}>
          <div className={styles.leftPanel}>
            <div className={styles.illustration}>
              <div className={styles.mascot}>
                <span className="text-6xl">📚</span>
                <div className={styles.crown}>👑</div>
              </div>
            </div>
            <div className={styles.promoText}>
              <h3>Mua sắm tại BookStore</h3>
              <p>Siêu ưu đãi mỗi ngày</p>
            </div>
          </div>
          
          <div className={styles.rightPanel}>
            <div className={styles.header}>
              <h2>Đăng nhập bằng email</h2>
              <p>Nhập email và mật khẩu tài khoản BookStore</p>
            </div>
            
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.inputGroup}>
                <input
                  type="email"
                  placeholder="abc@email.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                />
                {errors.email && <span className={styles.errorText}>{errors.email}</span>}
              </div>
              
              <div className={styles.inputGroup}>
                <input
                  type="password"
                  placeholder="Mật khẩu"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
                />
                {errors.password && <span className={styles.errorText}>{errors.password}</span>}
              </div>
              
              {errors.general && (
                <div className={styles.generalError}>{errors.general}</div>
              )}
              
              <button
                type="submit"
                disabled={isLoading}
                className={`${styles.submitButton} ${isLoading ? styles.loading : ''}`}
              >
                {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
              </button>
            </form>
            
            <div className={styles.footer}>
              <p>Quên mật khẩu?</p>
              <p>
                Chưa có tài khoản?{' '}
                <button 
                  onClick={onSwitchToRegister}
                  className={styles.switchButton}
                >
                  Tạo tài khoản
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// src/components/auth/RegisterModal.tsx
interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({ isOpen, onClose, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isLoading, setIsLoading] = useState(false);
  const { register } = authStore();

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.name) {
      newErrors.name = 'Vui lòng nhập họ tên';
    }
    
    if (!formData.email) {
      newErrors.email = 'Vui lòng nhập email';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }
    
    if (!formData.password) {
      newErrors.password = 'Vui lòng nhập mật khẩu';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Vui lòng xác nhận mật khẩu';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Mật khẩu xác nhận không khớp';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setIsLoading(true);
    setErrors({});
    
    try {
      await register(formData.email, formData.password);
      onClose();
      setFormData({ name: '', email: '', password: '', confirmPassword: '' });
    } catch (error: any) {
      setErrors({ general: error.message || 'Đăng ký thất bại' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <div className={styles.content}>
          <div className={styles.leftPanel}>
            <div className={styles.illustration}>
              <div className={styles.mascot}>
                <span className="text-6xl">📚</span>
                <div className={styles.crown}>👑</div>
              </div>
            </div>
            <div className={styles.promoText}>
              <h3>Chào mừng đến BookStore</h3>
              <p>Đăng ký để nhận ưu đãi</p>
            </div>
          </div>
          
          <div className={styles.rightPanel}>
            <div className={styles.header}>
              <h2>Đăng ký tài khoản</h2>
              <p>Tạo tài khoản BookStore để mua sắm</p>
            </div>
            
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.inputGroup}>
                <input
                  type="text"
                  placeholder="Họ và tên"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                />
                {errors.name && <span className={styles.errorText}>{errors.name}</span>}
              </div>
              
              <div className={styles.inputGroup}>
                <input
                  type="email"
                  placeholder="abc@email.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                />
                {errors.email && <span className={styles.errorText}>{errors.email}</span>}
              </div>
              
              <div className={styles.inputGroup}>
                <input
                  type="password"
                  placeholder="Mật khẩu"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
                />
                {errors.password && <span className={styles.errorText}>{errors.password}</span>}
              </div>
              
              <div className={styles.inputGroup}>
                <input
                  type="password"
                  placeholder="Xác nhận mật khẩu"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  className={`${styles.input} ${errors.confirmPassword ? styles.inputError : ''}`}
                />
                {errors.confirmPassword && <span className={styles.errorText}>{errors.confirmPassword}</span>}
              </div>
              
              {errors.general && (
                <div className={styles.generalError}>{errors.general}</div>
              )}
              
              <button
                type="submit"
                disabled={isLoading}
                className={`${styles.submitButton} ${isLoading ? styles.loading : ''}`}
              >
                {isLoading ? 'Đang đăng ký...' : 'Đăng ký'}
              </button>
            </form>
            
            <div className={styles.footer}>
              <p>
                Đã có tài khoản?{' '}
                <button 
                  onClick={onSwitchToLogin}
                  className={styles.switchButton}
                >
                  Đăng nhập
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { LoginModal, RegisterModal };