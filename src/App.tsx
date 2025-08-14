import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { MainLayout } from "./components/layout/MainLayout";
import { CartProvider } from "./components/cart/CartContext";

import { Home } from "./pages";
import BookDetail from "./pages/BookDetail";
import Books from "./pages/Books";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";


const BooksPage = () => <div>Books Page</div>;

const App: React.FC = () => {
  return (
    <Router>
      <CartProvider>
        <Routes>
          {/* Route checkout riêng biệt - không qua MainLayout */}
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-success" element={<OrderSuccess />} />

          
          {/* Các route khác vẫn qua MainLayout */}
          <Route path="/*" element={
            <MainLayout>
              <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/" element={<Books />} />
                <Route path="/books" element={<Books />} />
                <Route path="/books/:id" element={<BookDetail />} />
                <Route path="/category/:categoryId" element={<BooksPage />} />
                <Route path="/cart" element={<Cart />} />
              </Routes>
            </MainLayout>
          } />
        </Routes>
      </CartProvider>
    </Router>
  );
};

export default App;
