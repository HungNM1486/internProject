import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { Order } from '../../types';
import styles from './AdminPages.module.css';

interface MockOrder extends Omit<Order, 'user' | 'items'> {
  customerName: string;
  customerEmail: string;
  itemCount: number;
}

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<MockOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<'all' | Order['status']>('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockOrders: MockOrder[] = [
        {
          id: '1',
          userId: '1',
          customerName: 'Nguyễn Văn A',
          customerEmail: 'user1@gmail.com',
          itemCount: 2,
          totalAmount: 250000,
          status: 'pending',
          shippingAddress: {
            fullName: 'Nguyễn Văn A',
            phone: '0912345678',
            address: '123 Đường ABC',
            ward: 'Phường 1',
            district: 'Quận 1',
            city: 'TP.HCM'
          },
          paymentMethod: 'cash',
          createdAt: '2024-01-20T10:30:00Z',
          updatedAt: '2024-01-20T10:30:00Z'
        },
        {
          id: '2',
          userId: '2',
          customerName: 'Trần Thị B',
          customerEmail: 'user2@yahoo.com',
          itemCount: 1,
          totalAmount: 95000,
          status: 'confirmed',
          shippingAddress: {
            fullName: 'Trần Thị B',
            phone: '0923456789',
            address: '456 Đường XYZ',
            ward: 'Phường 2',
            district: 'Quận 2',
            city: 'TP.HCM'
          },
          paymentMethod: 'card',
          createdAt: '2024-01-19T14:20:00Z',
          updatedAt: '2024-01-19T16:45:00Z'
        },
        {
          id: '3',
          userId: '3',
          customerName: 'Lê Văn C',
          customerEmail: 'user3@hotmail.com',
          itemCount: 3,
          totalAmount: 180000,
          status: 'delivered',
          shippingAddress: {
            fullName: 'Lê Văn C',
            phone: '0934567890',
            address: '789 Đường DEF',
            ward: 'Phường 3',
            district: 'Quận 3',
            city: 'Hà Nội'
          },
          paymentMethod: 'bank_transfer',
          createdAt: '2024-01-18T09:15:00Z',
          updatedAt: '2024-01-19T10:30:00Z'
        }
      ];
      setOrders(mockOrders);
      setIsLoading(false);
    }, 1000);
  }, []);

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusText = (status: Order['status']) => {
    const statusMap = {
      pending: 'Chờ xác nhận',
      confirmed: 'Đã xác nhận',
      shipping: 'Đang giao',
      delivered: 'Đã giao',
      cancelled: 'Đã hủy'
    };
    return statusMap[status];
  };

  const getPaymentMethodText = (method: Order['paymentMethod']) => {
    const methodMap = {
      cash: 'Tiền mặt',
      card: 'Thẻ tín dụng',
      bank_transfer: 'Chuyển khoản'
    };
    return methodMap[method];
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className={styles.loadingContainer}>
          <LoadingSpinner size="large" text="Đang tải danh sách đơn hàng..." />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.pageTitle}>Quản lý đơn hàng</h1>
          <div className={styles.orderStats}>
            <span className={styles.statItem}>
              Tổng: <strong>{orders.length}</strong>
            </span>
            <span className={styles.statItem}>
              Chờ xử lý: <strong>{orders.filter(o => o.status === 'pending').length}</strong>
            </span>
          </div>
        </div>

        <div className={styles.toolbar}>
          <div className={styles.searchBox}>
            <svg className={styles.searchIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Tìm kiếm theo ID, tên khách hàng..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
          </div>
          
          <select 
            className={styles.filterSelect}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as 'all' | Order['status'])}
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="pending">Chờ xác nhận</option>
            <option value="confirmed">Đã xác nhận</option>
            <option value="shipping">Đang giao</option>
            <option value="delivered">Đã giao</option>
            <option value="cancelled">Đã hủy</option>
          </select>
        </div>

        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Đơn hàng</th>
                <th>Khách hàng</th>
                <th>Sản phẩm</th>
                <th>Tổng tiền</th>
                <th>Thanh toán</th>
                <th>Trạng thái</th>
                <th>Ngày đặt</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id}>
                  <td>
                    <div className={styles.orderInfo}>
                      <p className={styles.orderId}>#{order.id}</p>
                      <p className={styles.orderDate}>
                        {formatDate(order.createdAt)}
                      </p>
                    </div>
                  </td>
                  <td>
                    <div className={styles.customerInfo}>
                      <p className={styles.customerName}>{order.customerName}</p>
                      <p className={styles.customerEmail}>{order.customerEmail}</p>
                    </div>
                  </td>
                  <td>
                    <span className={styles.itemCount}>
                      {order.itemCount} sản phẩm
                    </span>
                  </td>
                  <td>
                    <span className={styles.totalAmount}>
                      {formatCurrency(order.totalAmount)}
                    </span>
                  </td>
                  <td>
                    <span className={styles.paymentMethod}>
                      {getPaymentMethodText(order.paymentMethod)}
                    </span>
                  </td>
                  <td>
                    <span className={`${styles.statusBadge} ${styles[order.status]}`}>
                      {getStatusText(order.status)}
                    </span>
                  </td>
                  <td>
                    {formatDate(order.createdAt)}
                  </td>
                  <td>
                    <div className={styles.actionButtons}>
                      <button className={styles.viewButton} title="Xem chi tiết">
                        <svg className={styles.actionIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                      {order.status === 'pending' && (
                        <button className={styles.confirmButton} title="Xác nhận">
                          <svg className={styles.actionIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </button>
                      )}
                      <button className={styles.editButton} title="Chỉnh sửa">
                        <svg className={styles.actionIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles.summary}>
          <p>
            Hiển thị <strong>{filteredOrders.length}</strong> / <strong>{orders.length}</strong> đơn hàng
          </p>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Orders;