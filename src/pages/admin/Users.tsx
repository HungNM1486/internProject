import React, { useState, useEffect } from 'react';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { User } from '../../types';
import adminService from '../../services/adminService';
import styles from './AdminPages.module.css';

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | 'user' | 'admin'>('all');

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchUsers();
  }, [currentPage, searchTerm, roleFilter]);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await adminService.getUsers({
        page: currentPage,
        limit: itemsPerPage,
        search: searchTerm || undefined,
        role: roleFilter === 'all' ? undefined : roleFilter,
      });

      setUsers(response.data);
      setTotalUsers(response.total || 0);
      setTotalPages(Math.ceil((response.total || 0) / itemsPerPage));
    } catch (err) {
      console.error('Lỗi khi tải danh sách người dùng:', err);
      setError('Không thể tải danh sách người dùng. Vui lòng thử lại sau.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBlockUser = async (userId: string) => {
    if (window.confirm('Bạn có chắc chắn muốn khóa tài khoản này?')) {
      try {
        // TODO: 实现用户锁定功能
        alert('Tính năng khóa tài khoản sẽ được triển khai sau.');
      } catch (err) {
        console.error('Lỗi khi khóa tài khoản:', err);
        alert('Không thể khóa tài khoản. Vui lòng thử lại sau.');
      }
    }
  };

  // 移除本地过滤，因为现在使用API过滤
  // const filteredUsers = users.filter((user) => {
  //   const matchesSearch =
  //     user.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     user.email.toLowerCase().includes(searchTerm.toLowerCase());
  //   const matchesRole = roleFilter === 'all' || user.role === roleFilter;
  //   return matchesSearch && matchesRole;
  // });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (isLoading && users.length === 0) {
    return (
      <div className={styles.loadingContainer}>
        <LoadingSpinner size="large" text="Đang tải danh sách người dùng..." />
      </div>
    );
  }

  if (error && users.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.errorContainer}>
          <h3>❌ Lỗi</h3>
          <p>{error}</p>
          <button className={styles.primaryButton} onClick={fetchUsers}>
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.pageTitle}>Quản lý người dùng</h1>
        <button className={styles.primaryButton}>
          <svg className={styles.buttonIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Thêm người dùng
        </button>
      </div>

      <div className={styles.toolbar}>
        <div className={styles.searchBox}>
          <svg className={styles.searchIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Tìm kiếm theo tên, email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        <select
          className={styles.filterSelect}
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value as 'all' | 'user' | 'admin')}
        >
          <option value="all">Tất cả vai trò</option>
          <option value="user">Người dùng</option>
          <option value="admin">Quản trị viên</option>
        </select>
      </div>

      {isLoading && (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <LoadingSpinner size="medium" text="Đang tải..." />
        </div>
      )}

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Thông tin</th>
              <th>Email</th>
              <th>Số điện thoại</th>
              <th>Vai trò</th>
              <th>Ngày tạo</th>
              <th>Lần đăng nhập cuối</th>
              <th>Trạng thái</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>
                  <div className={styles.userInfo}>
                    <div className={styles.userAvatar}>
                      {user.fullName?.charAt(0) || user.email.charAt(0)}
                    </div>
                    <div>
                      <p className={styles.userName}>{user.fullName || 'Chưa cập nhật'}</p>
                      <p className={styles.userId}>ID: {user.id}</p>
                    </div>
                  </div>
                </td>
                <td>{user.email}</td>
                <td>{user.phone || 'Chưa cập nhật'}</td>
                <td>
                  <span
                    className={`${styles.roleBadge} ${user.role === 'admin' ? styles.adminRole : styles.userRole}`}
                  >
                    {user.role === 'admin' ? 'Quản trị viên' : 'Người dùng'}
                  </span>
                </td>
                <td>{user.createdAt ? formatDate(user.createdAt) : 'N/A'}</td>
                <td>{user.lastLoginAt ? formatDate(user.lastLoginAt) : 'Chưa đăng nhập'}</td>
                <td>
                  <span className={`${styles.statusBadge} ${styles.active}`}>Hoạt động</span>
                </td>
                <td>
                  <div className={styles.actionButtons}>
                    <button className={styles.editButton} title="Chỉnh sửa">
                      <svg
                        className={styles.actionIcon}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </button>
                    <button
                      className={styles.blockButton}
                      title="Khóa tài khoản"
                      onClick={() => handleBlockUser(user.id)}
                    >
                      <svg
                        className={styles.actionIcon}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728"
                        />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={styles.paginationButton}
          >
            Trước
          </button>

          <span className={styles.paginationInfo}>
            Trang {currentPage} / {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={styles.paginationButton}
          >
            Sau
          </button>
        </div>
      )}

      <div className={styles.summary}>
        <p>
          Tổng cộng: <strong>{totalUsers}</strong> người dùng
        </p>
      </div>
    </div>
  );
};

export default Users;
