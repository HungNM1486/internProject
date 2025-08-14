// src/router/index.tsx
import { createBrowserRouter, Outlet } from 'react-router-dom';
import { lazy } from 'react';
import { MainLayout } from '../components/layout/MainLayout';

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
import NotFound from '../pages/NotFound';

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
        path: 'checkout',
        element: <Checkout />
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