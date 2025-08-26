import { createBrowserRouter, Outlet } from 'react-router-dom';
import { MainLayout } from '../components/layout/MainLayout';
import { AdminRoute } from '../components/auth';
import { CartProvider } from '../components/cart/CartContext';
import { AuthProvider } from '../components/auth/AuthProvider';

// Import pages directly for testing
import Home from '../pages/Home';
import Books from '../pages/Books';
import BookDetail from '../pages/BookDetail';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Profile from '../pages/Profile';
import Cart from '../pages/Cart';
import Checkout from '../pages/Checkout';
import Orders from '../pages/Orders';
import Admin from '../pages/Admin';
import Dashboard from '../pages/admin/Dashboard';
import Products from '../pages/admin/Products';
import AdminOrders from '../pages/admin/Orders';
import Users from '../pages/admin/Users';
import NotFound from '../pages/NotFound';

export const router = createBrowserRouter([
  // Admin routes - separate from MainLayout and protected
  {
    path: '/admin',
    element: (
      <AuthProvider>
        <CartProvider>
          <Admin />
        </CartProvider>
      </AuthProvider>
    ),
    children: [
      {
        path: '',
        element: <Dashboard />,
      },
      {
        path: 'products',
        element: <Products />,
      },
      {
        path: 'orders',
        element: <AdminOrders />,
      },
      {
        path: 'users',
        element: <Users />,
      },
    ],
  },
  {
    path: '/',
    element: (
      <AuthProvider>
        <CartProvider>
          <MainLayout>
            <Outlet />
          </MainLayout>
        </CartProvider>
      </AuthProvider>
    ),
    errorElement: <NotFound />,
    children: [
      // Public routes
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'books',
        element: <Books />,
      },
      {
        path: 'books/:id',
        element: <BookDetail />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },

      // Protected routes
      {
        path: 'profile',
        element: <Profile />,
      },
      {
        path: 'cart',
        element: <Cart />,
      },
      {
        path: 'checkout',
        element: <Checkout />,
      },
      {
        path: 'orders',
        element: <Orders />,
      },
    ],
  },
]);
