import React, { useState, useEffect } from 'react';
import styles from './AdminPages.module.css';
import adminService from '../../services/adminService';
import LoadingSpinner from '../../components/common/LoadingSpinner';

interface DashboardData {
  totalUsers: number;
  totalOrders: number;
  totalProducts: number;
  totalRevenue: number;
  todayOrders: number;
  pendingOrders: number;
  monthlyStats?: {
    month: string;
    revenue: number;
    orders: number;
  }[];
}

interface RecentOrder {
  id: string;
  customer_name: string;
  total_amount: number;
  status: string;
  created_at: string;
}

const Dashboard: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // 并行获取所有数据
        const [statsResponse, revenueResponse, ordersResponse] = await Promise.all([
          adminService.getDashboardStats(),
          adminService.getRevenueStats(),
          adminService.getRecentOrders(),
        ]);

        setDashboardData(statsResponse);
        setRecentOrders(ordersResponse || []);
      } catch (err) {
        console.error('Lỗi khi tải dữ liệu dashboard:', err);
        setError('Không thể tải dữ liệu dashboard. Vui lòng thử lại sau.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusText = (status: string) => {
    const statusMap: { [key: string]: string } = {
      pending: 'Chờ xác nhận',
      confirmed: 'Đã xác nhận',
      shipping: 'Đang giao',
      delivered: 'Đã giao',
      cancelled: 'Đã hủy',
    };
    return statusMap[status] || status;
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.pageTitle}>Dashboard Quản trị</h1>
        <div className={styles.headerActions}>
          <button className={styles.secondaryButton}>Xuất báo cáo</button>
          <button className={styles.primaryButton}>
            <svg
              className={styles.buttonIcon}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Thêm mới
          </button>
        </div>
      </div>

      {/* Loading and Error States */}
      {isLoading && (
        <div className={styles.loadingContainer}>
          <LoadingSpinner size="large" text="Đang tải dữ liệu dashboard..." />
        </div>
      )}

      {error && (
        <div className={styles.errorContainer}>
          <h3>❌ Lỗi</h3>
          <p>{error}</p>
          <button className={styles.primaryButton} onClick={() => window.location.reload()}>
            Thử lại
          </button>
        </div>
      )}

      {/* Stats Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px',
          marginBottom: '30px',
        }}
      >
        <div
          style={{
            background: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          }}
        >
          <h4 style={{ color: '#374151', marginBottom: '10px' }}>Tổng sản phẩm</h4>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#059669' }}>
            {dashboardData?.totalProducts?.toLocaleString() || '0'}
          </p>
          <span style={{ color: '#059669', fontSize: '0.875rem' }}>
            Tất cả sản phẩm trong hệ thống
          </span>
        </div>

        <div
          style={{
            background: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          }}
        >
          <h4 style={{ color: '#374151', marginBottom: '10px' }}>Đơn hàng mới</h4>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2563eb' }}>
            {dashboardData?.todayOrders?.toLocaleString() || '0'}
          </p>
          <span style={{ color: '#2563eb', fontSize: '0.875rem' }}>Đơn hàng hôm nay</span>
        </div>

        <div
          style={{
            background: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          }}
        >
          <h4 style={{ color: '#374151', marginBottom: '10px' }}>Doanh thu</h4>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#7c3aed' }}>
            {formatCurrency(dashboardData?.totalRevenue || 0)}
          </p>
          <span style={{ color: '#7c3aed', fontSize: '0.875rem' }}>Tổng doanh thu</span>
        </div>

        <div
          style={{
            background: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          }}
        >
          <h4 style={{ color: '#374151', marginBottom: '10px' }}>Người dùng mới</h4>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#dc2626' }}>
            {dashboardData?.totalUsers?.toLocaleString() || '0'}
          </p>
          <span style={{ color: '#dc2626', fontSize: '0.875rem' }}>Tổng số người dùng</span>
        </div>
      </div>

      {/* Recent Activity */}
      <div className={styles.recentActivity}>
        <div className={styles.sectionHeader}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#111827' }}>
            Hoạt động gần đây
          </h3>
          <button className={styles.viewAllButton}>Xem tất cả</button>
        </div>

        <div className={styles.activityList}>
          {recentOrders.length > 0 ? (
            recentOrders.slice(0, 5).map((order) => (
              <div key={order.id} className={styles.activityItem}>
                <div className={styles.activityIcon}>📦</div>
                <div className={styles.activityContent}>
                  <p className={styles.activityText}>
                    Đơn hàng #{order.id} từ {order.customer_name} -{' '}
                    {formatCurrency(order.total_amount)}
                  </p>
                  <p className={styles.activityTime}>
                    {formatDate(order.created_at)} - {getStatusText(order.status)}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className={styles.activityItem}>
              <div className={styles.activityIcon}>📋</div>
              <div className={styles.activityContent}>
                <p className={styles.activityText}>Chưa có đơn hàng nào</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Pending Orders Alert */}
      {dashboardData?.pendingOrders && dashboardData.pendingOrders > 0 && (
        <div
          style={{
            marginTop: '20px',
            padding: '15px',
            background: '#fef3c7',
            border: '1px solid #f59e0b',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <span style={{ fontSize: '1.5rem' }}>⚠️</span>
          <div>
            <strong>Có {dashboardData.pendingOrders} đơn hàng đang chờ xử lý</strong>
            <p style={{ margin: '5px 0 0 0', fontSize: '0.875rem' }}>
              Vui lòng kiểm tra và xử lý các đơn hàng này
            </p>
          </div>
        </div>
      )}

      {/* Quick Navigation */}
      <div
        style={{ marginTop: '30px', padding: '20px', background: '#f9fafb', borderRadius: '8px' }}
      >
        <h4 style={{ marginBottom: '15px', color: '#374151' }}>Kiểm tra Navigation:</h4>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <a
            href="/admin/products"
            style={{
              padding: '8px 16px',
              background: '#3b82f6',
              color: 'white',
              borderRadius: '6px',
              textDecoration: 'none',
              fontSize: '14px',
            }}
          >
            Quản lý sản phẩm
          </a>
          <a
            href="/admin/orders"
            style={{
              padding: '8px 16px',
              background: '#10b981',
              color: 'white',
              borderRadius: '6px',
              textDecoration: 'none',
              fontSize: '14px',
            }}
          >
            Quản lý đơn hàng
          </a>
          <a
            href="/admin/users"
            style={{
              padding: '8px 16px',
              background: '#8b5cf6',
              color: 'white',
              borderRadius: '6px',
              textDecoration: 'none',
              fontSize: '14px',
            }}
          >
            Quản lý người dùng
          </a>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
