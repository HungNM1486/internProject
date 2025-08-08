import { useState, useEffect } from 'react';
import { adminService } from '../services/adminService';

export const useAdminStats = () => {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
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

    fetchStats();
  }, []);

  return { stats, isLoading, error, refetch: () => fetchStats() };
};

export const useAdminProducts = (params?: any) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    total: 0,
    totalPages: 0,
    limit: 10
  });

  const fetchProducts = async (newParams?: any) => {
    try {
      setIsLoading(true);
      const response = await adminService.getProducts({ ...params, ...newParams });
      setProducts(response.data);
      setPagination({
        page: response.page || 1,
        total: response.total || 0,
        totalPages: response.totalPages || 0,
        limit: response.limit || 10
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
        await adminService.updateProduct(id, data);
        fetchProducts(); // Refresh list
      } catch (err) {
        throw err;
      }
    },
    deleteProduct: async (id: string) => {
      try {
        await adminService.deleteProduct(id);
        fetchProducts(); // Refresh list
      } catch (err) {
        throw err;
      }
    }
  };
};

export const useAdminUsers = (params?: any) => {
  const [users, setUsers] = useState([]);
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
    updateUserRole: async (id: string, role: 'user' | 'admin') => {
      try {
        await adminService.updateUserRole(id, role);
        fetchUsers(); // Refresh list
      } catch (err) {
        throw err;
      }
    },
    blockUser: async (id: string, reason?: string) => {
      try {
        await adminService.blockUser(id, reason);
        fetchUsers(); // Refresh list
      } catch (err) {
        throw err;
      }
    }
  };
};

export const useAdminOrders = (params?: any) => {
  const [orders, setOrders] = useState([]);
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
    updateOrderStatus: async (id: string, status: any, notes?: string) => {
      try {
        await adminService.updateOrderStatus(id, status, notes);
        fetchOrders(); // Refresh list
      } catch (err) {
        throw err;
      }
    },
    cancelOrder: async (id: string, reason: string) => {
      try {
        await adminService.cancelOrder(id, reason);
        fetchOrders(); // Refresh list
      } catch (err) {
        throw err;
      }
    }
  };
};