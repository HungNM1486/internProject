import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { useAdminStats } from '../../hooks/useAdminData';
import { adminService } from '../../services/adminService';
import styles from './AdminPages.module.css';

const Dashboard: React.FC = () => {
  const { stats, isLoading, error, refetch } = useAdminStats();
  const [recentActivity, setRecentActivity] = useState([]);
  const [isLoadingActivity, setIsLoadingActivity] = useState(false);

  // Fetch recent activity from API
  useEffect(() => {
    const fetchRecentActivity = async () => {
      try {
        setIsLoadingActivity(true);
        const activity = await adminService.getRecentActivity();
        setRecentActivity(activity);
      } catch (error) {
        console.error('Failed to fetch recent activity:', error);
      } finally {
        setIsLoadingActivity(false);
      }
    };

    fetchRecentActivity();
  }, []);

  if (isLoading) {
    return (
      <AdminLayout>
        <div className={styles.loadingContainer}>
          <LoadingSpinner size="large" text="Đang tải dashboard..." />
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className={styles.container}>
          <div className={styles.errorContainer}>
            <h2>Lỗi tải dữ liệu</h2>
            <p>{error}</p>
            <button onClick={refetch} className={styles.primaryButton}>
              Thử lại
            </button>
          </div>
        </div>
      </AdminLayout>
    );
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const statCards = [
    {
      title: 'Tổng người dùng',
      value: stats?.totalUsers || 0,
      icon: (
        <svg className={styles.statIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
        </svg>
      ),
      color: 'blue',
      change: '+12%',
      trend: 'up'
    },
    {
      title: 'Tổng đơn hàng',
      value: stats?.totalOrders || 0,
      icon: (
        <svg className={styles.statIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ),
      color: 'green',
      change: '+8%',
      trend: 'up'
    },
    {
      title: 'Tổng sản phẩm',
      value: stats?.totalProducts || 0,
      icon: (
        <svg className={styles.statIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      color: 'purple',
      change: '+3%',
      trend: 'up'
    },
    {
      title: 'Tổng doanh thu',
      value: formatCurrency(stats?.totalRevenue || 0),
      icon: (
        <svg className={styles.statIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
        </svg>
      ),
      color: 'orange',
      isLarge: true,
      change: '+15%',
      trend: 'up'
    },
    {
      title: 'Đơn hàng hôm nay',
      value: stats?.todayOrders || 0,
      icon: (
        <svg className={styles.statIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: 'indigo',
      change: '+5%',
      trend: 'up'
    },
    {
      title: 'Đơn chờ xử lý',
      value: stats?.pendingOrders || 0,
      icon: (
        <svg className={styles.statIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
      color: 'red',
      change: '-2%',
      trend: 'down'
    }
  ];

  return (
    <AdminLayout>
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.pageTitle}>Dashboard</h1>
            <p className={styles.subtitle}>Tổng quan hệ thống quản lý</p>
          </div>
          
          <div className={styles.headerActions}>
            <button onClick={refetch} className={styles.secondaryButton}>
              <svg className={styles.buttonIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Làm mới
            </button>
            
            <button 
              onClick={() => window.open('/admin/reports', '_blank')} 
              className={styles.primaryButton}
            >
              <svg className={styles.buttonIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Xem báo cáo
            </button>
          </div>
        </div>

        {/* Stats Grid với Real Data */}
        <div className={styles.statsGrid}>
          {statCards.map((stat, index) => (
            <div key={index} className={`${styles.statCard} ${styles[stat.color]} ${stat.isLarge ? styles.statCardLarge : ''}`}>
              <div className={styles.statCardContent}>
                <div className={styles.statCardIcon}>
                  {stat.icon}
                </div>
                <div className={styles.statCardText}>
                  <div className={styles.statValue}>{stat.value}</div>
                  <div className={styles.statLabel}>{stat.title}</div>
                  {stat.change && (
                    <div className={`${styles.statChange} ${styles[stat.trend]}`}>
                      {stat.trend === 'up' ? '↗' : '↘'} {stat.change}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Activity Section */}
        <div className={styles.recentActivity}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Hoạt động gần đây</h2>
            <button className={styles.viewAllButton}>Xem tất cả</button>
          </div>

          {isLoadingActivity ? (
            <div className={styles.activityLoading}>
              <LoadingSpinner size="medium" text="Đang tải hoạt động..." />
            </div>
          ) : (
            <div className={styles.activityList}>
              {recentActivity.length > 0 ? (
                recentActivity.slice(0, 5).map((activity: any, index) => (
                  <div key={index} className={styles.activityItem}>
                    <div className={styles.activityIcon}>
                      {activity.type === 'order' && '📦'}
                      {activity.type === 'user' && '👤'}
                      {activity.type === 'product' && '📚'}
                    </div>
                    <div className={styles.activityContent}>
                      <p className={styles.activityText}>{activity.message}</p>
                      <span className={styles.activityTime}>
                        {new Date(activity.createdAt).toLocaleString('vi-VN')}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className={styles.noActivity}>
                  <p>Chưa có hoạt động nào</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Quick Actions với Real Navigation */}
        <div className={styles.quickActions}>
          <h2 className={styles.sectionTitle}>Thao tác nhanh</h2>
          <div className={styles.actionGrid}>
            <button 
              onClick={() => window.location.href = '/admin/products/new'}
              className={styles.actionCard}
            >
              <svg className={styles.actionIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span>Thêm sản phẩm mới</span>
            </button>
            
            <button 
              onClick={() => window.location.href = '/admin/orders?status=pending'}
              className={styles.actionCard}
            >
              <svg className={styles.actionIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <span>Xem đơn hàng mới ({stats?.pendingOrders || 0})</span>
            </button>
            
            <button 
              onClick={() => window.location.href = '/admin/users'}
              className={styles.actionCard}
            >
              <svg className={styles.actionIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>Quản lý người dùng</span>
            </button>
            
            <button 
              onClick={() => window.location.href = '/admin/reports'}
              className={styles.actionCard}
            >
              <svg className={styles.actionIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <span>Xem báo cáo</span>
            </button>
          </div>
        </div>

        {/* Monthly Revenue Chart (if data available) */}
        {stats?.monthlyStats && stats.monthlyStats.length > 0 && (
          <div className={styles.chartSection}>
            <h2 className={styles.sectionTitle}>Doanh thu theo tháng</h2>
            <div className={styles.chartContainer}>
              {/* Simple bar chart với CSS */}
              <div className={styles.simpleChart}>
                {stats.monthlyStats.map((month, index) => (
                  <div key={index} className={styles.chartBar}>
                    <div 
                      className={styles.bar}
                      style={{ 
                        height: `${(month.revenue / Math.max(...stats.monthlyStats.map(m => m.revenue))) * 100}%` 
                      }}
                      title={`${month.month}: ${formatCurrency(month.revenue)}`}
                    />
                    <span className={styles.chartLabel}>{month.month}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default Dashboard;