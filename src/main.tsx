import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { authStore } from './store/authStore';
authStore.getState().initializeAuth();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);