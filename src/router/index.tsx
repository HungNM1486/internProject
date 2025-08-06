// src/router/index.tsx
import { createBrowserRouter } from 'react-router-dom';
import { lazy } from 'react';
import Layout from '../components/layout/Layout';
import ProtectedRoute from '../components/auth/ProtectedRoute';

// Lazy load pages for better performance
const Home = lazy(() => import('../pages/Home/Home'));
const Books = lazy(() => import('../pages/Books/Books'));
const BookDetail = lazy(() => import('../pages/Books/BookDetail'));
const Login = lazy(() => import('../pages/Auth/Login'));
const Register = lazy(() => import('../pages/Auth/Register'));
const Profile = lazy(() => import('../pages/Profile/Profile'));
const Cart = lazy(() => import('../pages/Cart/Cart'));
const Orders = lazy(() => import('../pages/Orders/Orders'));
const Admin = lazy(() => import('../pages/Admin/Admin'));
const NotFound = lazy(() => import('../pages/NotFound/NotFound'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      // Public routes
      {
        path: '',
        element: <Home />
      },
      {
        path: 'books',
        element: <Books />
      },
      {
        path: 'books/:id',
        element: <BookDetail />
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'register',
        element: <Register />
      },
      
      // Protected routes
      {
        path: 'profile',
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        )
      },
      {
        path: 'cart',
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        )
      },
      {
        path: 'orders',
        element: (
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        )
      },
      
      // Admin routes
      {
        path: 'admin',
        element: (
          <ProtectedRoute requireAdmin>
            <Admin />
          </ProtectedRoute>
        )
      }
    ]
  }
]);