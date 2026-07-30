// src/features/cart/ProductList.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from './CartSlice';

// Datos de plantas (6 plantas en 3 categorías)
const plantsData = {
  '🌵 Suculentas': [
    { id: 1, name: 'Aloe Vera', price: 15.99, image: 'https://via.placeholder.com/200x150/2e7d32/ffffff?text=Aloe+Vera' },
    { id: 2, name: 'Echeveria', price: 12.50, image: 'https://via.placeholder.com/200x150/2e7d32/ffffff?text=Echeveria' },
  ],
  '🌿 Follaje Verde': [
    { id: 3, name: 'Monstera Deliciosa', price: 29.99, image: 'https://via.placeholder.com/200x150/2e7d32/ffffff?text=Monstera' },
    { id: 4, name: 'Pothos', price: 18.75, image: 'https://via.placeholder.com/200x150/2e7d32/ffffff?text=Pothos' },
    { id: 5, name: 'Helecho', price: 22.00, image: 'https://via.placeholder.com/200x150/2e7d32/ffffff?text=Helecho' },
  ],
  '🌸 Plantas Florales': [
    { id: 6, name: 'Orquídea Phalaenopsis', price: 35.50, image: 'https://via.placeholder.com/200x150/2e7d32/ffffff?text=Orquidea' },
  ],
};

const ProductList = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [addedItems, setAddedItems] = useState([]);

  // Verificar si un producto ya está en el carrito
  const isItemAdded = (productId) => {
    return cartItems.some((item) => item.id === productId);
  };

  // Manejar agregar al carrito
  const handleAddToCart = (product) => {
    if (!isItemAdded(product.id)) {
      dispatch(addToCart(product));
      setAddedItems([...addedItems, product.id]);
    }
  };

  return (
    <div className="product-list">
      <h2 style={{ textAlign: 'center', padding: '20px', color: '#2e7d32' }}>
        🌱 Nuestras Plantas de Interior
      </h2>
      
      {Object.entries(plantsData).map(([category, plants]) => (
        <div key={category} className="category-section">
          <h3 style={{ paddingLeft: '20px', color: '#1b5e20' }}>{category}</h3>
          <div className="product-grid">
            {plants.map((plant) => (
              <div key={plant.id} className="product-card">
                <img src={plant.image} alt={plant.name} />
                <h4>{plant.name}</h4>
                <p>💰 ${plant.price.toFixed(2)}</p>
                <button
                  onClick={() => handleAddToCart(plant)}
                  disabled={isItemAdded(plant.id)}
                >
                  {isItemAdded(plant.id) ? '✅ Agregado' : '🛒 Agregar al Carrito'}
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;