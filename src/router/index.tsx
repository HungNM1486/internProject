// src/router/index.tsx
import { createBrowserRouter, Outlet } from 'react-router-dom';
import { lazy } from 'react';
import { MainLayout } from '../components/layout/MainLayout';

// Lazy load pages for better performance
const Home = lazy(() => import('../pages/Home'));
const Books = lazy(() => import('../pages/Books'));
const BookDetail = lazy(() => import('../pages/BookDetail'));
const Login = lazy(() => import('../pages/Login'));
const Register = lazy(() => import('../pages/Register'));
const Profile = lazy(() => import('../pages/Profile'));
const Cart = lazy(() => import('../pages/Cart'));
const Orders = lazy(() => import('../pages/Orders'));
const Admin = lazy(() => import('../pages/Admin'));
const NotFound = lazy(() => import('../pages/NotFound'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout><Outlet /></MainLayout>,
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
        element: <Profile />
      },
      {
        path: 'cart',
        element: <Cart />
      },
      {
        path: 'orders',
        element: <Orders />
      },
      
      // Admin routes
      {
        path: 'admin',
        element: <Admin />
      }
    ]
  }
]);