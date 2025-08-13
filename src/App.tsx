import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';

const HomePage = () => <div>Home Page</div>;
const BooksPage = () => <div>Books Page</div>;
const BookDetailPage = () => <div>Book Detail</div>;
const CartPage = () => <div>Cart Page</div>;

const App: React.FC = () => {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/books" element={<BooksPage />} />
          <Route path="/books/:id" element={<BookDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/category/:categoryId" element={<BooksPage />} />
        </Routes>
      </MainLayout>
    </Router>
  );
};

export default App;