import { useState, useEffect } from 'react';
import { adminService } from '../services/adminService';

interface DashboardStats {
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

export const useAdminStats = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = async () => {
    try {
      setIsLoading(true);
      const data = await adminService.getDashboardStats();
      setStats(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch stats');
      console.error('Error fetching admin stats:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return { stats, isLoading, error, refetch: fetchStats };
};

import type { Book } from '../types';

export const useAdminProducts = (params?: any) => {
  const [products, setProducts] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    total: 0,
    totalPages: 0,
    limit: 10,
  });

  const fetchProducts = async (newParams?: any) => {
    try {
      setIsLoading(true);
      const response = await adminService.getBooks({ ...params, ...newParams });
      setProducts(response.data);
      setPagination({
        page: response.page || 1,
        total: response.total || 0,
        totalPages: response.totalPages || 0,
        limit: response.limit || 10,
      });
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch products');
      console.error('Error fetching products:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    isLoading,
    error,
    pagination,
    refetch: fetchProducts,
    updateProduct: async (id: string, data: any) => {
      try {
        await adminService.updateBook(id, data);
        fetchProducts(); // Refresh list
      } catch (err) {
        throw err;
      }
    },
    deleteProduct: async (id: string) => {
      try {
        await adminService.deleteBook(id);
        fetchProducts(); // Refresh list
      } catch (err) {
        throw err;
      }
    },
  };
};

import type { User } from '../types';

export const useAdminUsers = (params?: any) => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const response = await adminService.getUsers(params);
      setUsers(response.data);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch users');
      console.error('Error fetching users:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    users,
    isLoading,
    error,
    refetch: fetchUsers,
    // TODO: Implement these methods when backend supports them
    // updateUserRole: async (id: string, role: 'user' | 'admin') => {
    //   try {
    //     await adminService.updateUserRole(id, role);
    //     fetchUsers(); // Refresh list
    //   } catch (err) {
    //     throw err;
    //   }
    // },
    // blockUser: async (id: string, reason?: string) => {
    //   try {
    //     await adminService.blockUser(id, reason);
    //     fetchUsers(); // Refresh list
    //   } catch (err) {
    //     throw err;
    //   }
    // },
  };
};

import type { Order } from '../types';

export const useAdminOrders = (params?: any) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      const response = await adminService.getOrders(params);
      setOrders(response.data);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch orders');
      console.error('Error fetching orders:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return {
    orders,
    isLoading,
    error,
    refetch: fetchOrders,
    updateOrderStatus: async (id: string, status: any) => {
      try {
        await adminService.updateOrderStatus(id, status);
        fetchOrders(); // Refresh list
      } catch (err) {
        throw err;
      }
    },
    // TODO: Implement when backend supports it
    // cancelOrder: async (id: string, reason: string) => {
    //   try {
    //     await adminService.cancelOrder(id, reason);
    //     fetchOrders(); // Refresh list
    //   } catch (err) {
    //     throw err;
    //   }
    // },
  };
};
