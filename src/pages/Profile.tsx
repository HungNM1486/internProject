import React, { useState } from 'react';
import { authStore } from '../store/authStore';
import UserProfile from '../components/profile/UserProfile';
import ChangePassword from '../components/profile/ChangePassword';
import { Navigate } from 'react-router-dom';
import styles from './Profile.module.css';

const Profile: React.FC = () => {
  const { isAuthenticated, user } = authStore();
  const [activeTab, setActiveTab] = useState<'profile' | 'password' | 'orders'>('profile');

  // Redirect if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const tabs = [
    {
      id: 'profile' as const,
      label: 'Thông tin cá nhân',
      icon: (
        <svg className={styles.tabIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    },
    {
      id: 'password' as const,
      label: 'Đổi mật khẩu',
      icon: (
        <svg className={styles.tabIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      )
    },
    {
      id: 'orders' as const,
      label: 'Đơn hàng',
      icon: (
        <svg className={styles.tabIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      )
    }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return <UserProfile />;
      case 'password':
        return <ChangePassword />;
      case 'orders':
        return (
          <div className={styles.comingSoon}>
            <h3>Đơn hàng của tôi</h3>
            <p>Tính năng này sẽ có trong Sprint 3!</p>
          </div>
        );
      default:
        return <UserProfile />;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.pageTitle}>Tài khoản của tôi</h1>
        <p className={styles.welcomeText}>
          Xin chào, {user?.fullName || user?.email}!
        </p>
      </div>

      <div className={styles.content}>
        <nav className={styles.sidebar}>
          <div className={styles.tabList}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`${styles.tab} ${activeTab === tab.id ? styles.tabActive : ''}`}
              >
                {tab.icon}
                <span className={styles.tabLabel}>{tab.label}</span>
              </button>
            ))}
          </div>
        </nav>

        <main className={styles.mainContent}>
          {renderTabContent()}
        </main>
      </div>
    </div>
  );
};

export default Profile;