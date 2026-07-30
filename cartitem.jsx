// src/features/cart/CartItem.jsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} from './CartSlice';

const CartItem = () => {
  const dispatch = useDispatch();
  const { items, totalAmount, totalItems } = useSelector((state) => state.cart);

  // Si el carrito está vacío
  if (items.length === 0) {
    return (
      <div className="cart-container" style={{ textAlign: 'center', padding: '40px' }}>
        <h2>🛒 Tu carrito está vacío</h2>
        <p>¡Explora nuestra selección de plantas y añade algunas a tu carrito!</p>
        <Link to="/products">
          <button className="continue-btn" style={{ marginTop: '20px' }}>
            🌿 Continuar Comprando
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2>🛒 Tu Carrito de Compras</h2>
      <p>Artículos: {totalItems}</p>

      {items.map((item) => (
        <div key={item.id} className="cart-item">
          <img src={item.image} alt={item.name} />
          
          <div style={{ flex: 1 }}>
            <h4>{item.name}</h4>
            <p>Precio unitario: ${item.price.toFixed(2)}</p>
            <p>
              Subtotal: <strong>${(item.price * item.quantity).toFixed(2)}</strong>
            </p>
          </div>

          <div className="quantity-controls">
            <button onClick={() => dispatch(decreaseQuantity(item.id))}>−</button>
            <span>{item.quantity}</span>
            <button onClick={() => dispatch(increaseQuantity(item.id))}>+</button>
          </div>

          <button 
            className="remove-btn"
            onClick={() => dispatch(removeFromCart(item.id))}
          >
            🗑️ Eliminar
          </button>
        </div>
      ))}

      <div className="cart-total">
        <h3>Total del Carrito: ${totalAmount.toFixed(2)}</h3>
      </div>

      <div className="cart-actions">
        <Link to="/products">
          <button className="continue-btn">🌿 Continuar Comprando</button>
        </Link>
        <button 
          className="checkout-btn"
          onClick={() => alert('🛍️ Próximamente: Funcionalidad de pago disponible')}
        >
          💳 Proceder al Pago
        </button>
        <button 
          className="remove-btn"
          onClick={() => dispatch(clearCart())}
        >
          🗑️ Vaciar Carrito
        </button>
      </div>
    </div>
  );
};

export default CartItem;