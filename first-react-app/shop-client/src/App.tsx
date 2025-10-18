import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import ProductsListPage from './pages/ProductsListPage';
import ProductPage from './pages/ProductPage';

function App() {
  return (
    <Routes>
      <Route path="/products-list" element={<ProductsListPage />} />
      <Route path="/products/:id" element={<ProductPage />} />
      <Route path="/" element={<MainPage />} />
    </Routes>
  );
}

export default App;