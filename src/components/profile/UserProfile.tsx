import React, { useState, useEffect } from 'react';
import { authStore } from '../../store/authStore';
import { authService } from '../../services/authService';
import { useFormValidation } from '../../hooks/useFormValidation'
import { profileValidationRules } from '../../utils/validation';
import styles from './UserProfile.module.css';

const UserProfile: React.FC = () => {
  const { user, isLoading } = authStore();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  const { values, errors, touched, handleChange, handleBlur, validateForm, setValues, reset } = useFormValidation({
    initialValues: {
      fullName: user?.fullName || '',
      email: user?.email || '',
      phone: user?.phone || '',
      address: user?.address || '',
      dateOfBirth: user?.dateOfBirth || '',
    },
    validationRules: profileValidationRules
  });

  useEffect(() => {
    if (user) {
      setValues({
        fullName: user.fullName || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',    
        dateOfBirth: user.dateOfBirth || '',
      });
    }
  }, [user, setValues]);

  const handleEdit = () => {
    setIsEditing(true);
    setSaveMessage(null);
  };

  const handleCancel = () => {
    setIsEditing(false);
    reset();
    setSaveMessage(null);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSaving(true);
    setSaveMessage(null);
    
    try {
      await authService.updateProfile(values);
      setIsEditing(false);
      setSaveMessage('Cập nhật thông tin thành công!');
      
      // Clear success message after 3 seconds
      setTimeout(() => setSaveMessage(null), 3000);
    } catch (error: any) {
      setSaveMessage(`Lỗi: ${error.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>Đang tải thông tin...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Thông tin tài khoản</h1>
        {!isEditing && (
          <button onClick={handleEdit} className={styles.editButton}>
            <svg className={styles.editIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Chỉnh sửa
          </button>
        )}
      </div>

      {saveMessage && (
        <div className={`${styles.message} ${saveMessage.includes('Lỗi') ? styles.error : styles.success}`}>
          {saveMessage}
        </div>
      )}

      <div className={styles.profileCard}>
        <div className={styles.avatarSection}>
          <div className={styles.avatar}>
            <img 
              src={user?.avatar || '/default-avatar.png'} 
              alt="Avatar" 
              className={styles.avatarImage}
            />
          </div>
          <div className={styles.avatarInfo}>
            <h3 className={styles.userName}>{user?.fullName || 'Người dùng'}</h3>
            <p className={styles.userRole}>{user?.role === 'admin' ? 'Quản trị viên' : 'Khách hàng'}</p>
            <p className={styles.joinDate}>
              Tham gia từ: {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('vi-VN') : 'N/A'}
            </p>
          </div>
        </div>

        <form onSubmit={handleSave} className={styles.form}>
          <div className={styles.row}>
            <div className={styles.inputGroup}>
              <label htmlFor="fullName" className={styles.label}>Họ và tên</label>
              <input
                id="fullName"
                type="text"
                name="fullName"
                value={values.fullName}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={!isEditing}
                className={`${styles.input} ${errors.fullName && touched.fullName ? styles.inputError : ''} ${!isEditing ? styles.inputDisabled : ''}`}
                placeholder="Nhập họ và tên"
              />
              {errors.fullName && touched.fullName && (
                <span className={styles.errorText}>{errors.fullName}</span>
              )}
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="email" className={styles.label}>Email</label>
              <input
                id="email"
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={true} // Email không được phép thay đổi
                className={`${styles.input} ${styles.inputDisabled}`}
                placeholder="Email"
              />
              <small className={styles.helpText}>Email không thể thay đổi</small>
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.inputGroup}>
              <label htmlFor="phone" className={styles.label}>Số điện thoại</label>
              <input
                id="phone"
                type="tel"
                name="phone"
                value={values.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={!isEditing}
                className={`${styles.input} ${errors.phone && touched.phone ? styles.inputError : ''} ${!isEditing ? styles.inputDisabled : ''}`}
                placeholder="Nhập số điện thoại"
              />
              {errors.phone && touched.phone && (
                <span className={styles.errorText}>{errors.phone}</span>
              )}
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="dateOfBirth" className={styles.label}>Ngày sinh</label>
              <input
                id="dateOfBirth"
                type="date"
                name="dateOfBirth"
                value={values.dateOfBirth}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={!isEditing}
                className={`${styles.input} ${errors.dateOfBirth && touched.dateOfBirth ? styles.inputError : ''} ${!isEditing ? styles.inputDisabled : ''}`}
              />
              {errors.dateOfBirth && touched.dateOfBirth && (
                <span className={styles.errorText}>{errors.dateOfBirth}</span>
              )}
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="address" className={styles.label}>Địa chỉ</label>
            <textarea
              id="address"
              name="address"
              value={values.address}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={!isEditing}
              rows={3}
              className={`${styles.textarea} ${errors.address && touched.address ? styles.inputError : ''} ${!isEditing ? styles.inputDisabled : ''}`}
              placeholder="Nhập địa chỉ của bạn"
            />
            {errors.address && touched.address && (
              <span className={styles.errorText}>{errors.address}</span>
            )}
          </div>

          {isEditing && (
            <div className={styles.actions}>
              <button
                type="button"
                onClick={handleCancel}
                className={styles.cancelButton}
                disabled={isSaving}
              >
                Hủy
              </button>
              <button
                type="submit"
                disabled={isSaving || Object.keys(errors).length > 0}
                className={`${styles.saveButton} ${isSaving ? styles.loading : ''}`}
              >
                {isSaving ? (
                  <span className={styles.loadingContent}>
                    <svg className={styles.spinner} viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" opacity="0.25"/>
                      <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                    </svg>
                    Đang lưu...
                  </span>
                ) : (
                  'Lưu thay đổi'
                )}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default UserProfile;