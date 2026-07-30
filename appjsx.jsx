// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './App.css';
import ProductList from './features/cart/ProductList';
import CartItem from './features/cart/CartItem';
import AboutUs from './components/AboutUs';

// Componente de la página de inicio
const HomePage = () => {
  return (
    <div className="home-page">
      <h1>🌿 Paradise Nursery</h1>
      <p>Descubre la naturaleza en tu hogar</p>
      <Link to="/products" className="btn-start">
        Comenzar 🌱
      </Link>
    </div>
  );
};

// Componente de navegación (reutilizable)
const Navbar = () => {
  const cartCount = useSelector((state) => 
    state.cart.items.reduce((total, item) => total + item.quantity, 0)
  );

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <strong>🌿 Paradise Nursery</strong>
      </div>
      <div className="navbar-links">
        <Link to="/">Inicio</Link>
        <Link to="/products">Plantas</Link>
        <Link to="/cart" className="cart-icon">
          🛒
          {cartCount > 0 && (
            <span className="cart-badge">{cartCount}</span>
          )}
        </Link>
        <Link to="/about">Sobre Nosotros</Link>
      </div>
    </nav>
  );
};

// Componente principal App
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <>
            <Navbar />
            <HomePage />
          </>
        } />
        <Route path="/products" element={
          <>
            <Navbar />
            <ProductList />
          </>
        } />
        <Route path="/cart" element={
          <>
            <Navbar />
            <CartItem />
          </>
        } />
        <Route path="/about" element={
          <>
            <Navbar />
            <AboutUs />
          </>
        } />
      </Routes>
    </Router>
  );
}

export default App;