import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { MainLayout } from "./components/layout/MainLayout";
import { CartProvider } from "./components/cart/CartContext";
import { ErrorBoundary } from "./components/common/ErrorBoundary";

import BookDetail from "./pages/BookDetail";
import Books from "./pages/Books";
import SearchResults from "./pages/SearchResults";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import Orders from "./pages/Orders";

// Clean imports after debugging

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <Router>
        <CartProvider>
          <Routes>
            {/* Route checkout riêng biệt - không qua MainLayout */}
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-success" element={<OrderSuccess />} />


            
            {/* Các route khác vẫn qua MainLayout */}
            <Route path="/" element={
              <MainLayout>
                <Books />
              </MainLayout>
            } />
            <Route path="/books" element={
              <MainLayout>
                <Books />
              </MainLayout>
            } />
            <Route path="/search" element={
              <MainLayout>
                <SearchResults />
              </MainLayout>
            } />
            <Route path="/books/:id" element={
              <MainLayout>
                <BookDetail />
              </MainLayout>
            } />
            <Route path="/cart" element={
              <MainLayout>
                <Cart />
              </MainLayout>
            } />
            <Route path="/orders" element={
              <MainLayout>
                <Orders />
              </MainLayout>
            } />
          </Routes>
        </CartProvider>
      </Router>
    </ErrorBoundary>
  );
};

export default App;
