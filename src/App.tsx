import { RouterProvider } from 'react-router-dom';
import { Suspense } from 'react';
import { router } from './router';
import LoadingSpinner from './components/common/LoadingSpinner';

function App() {
  return (
    <div className="App">
      <Suspense fallback={<LoadingSpinner />}>
        <RouterProvider router={router} />
      </Suspense>
    </div>
  );
}

export default App;

// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Initialize auth when app starts
import { authStore } from './store/authStore';
authStore.getState().initializeAuth();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);