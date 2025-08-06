import { RouterProvider } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense } from 'react';
import { router } from './router';
import LoadingSpinner from './components/common/LoadingSpinner';
import { MainLayout } from './components/layout/MainLayout';


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