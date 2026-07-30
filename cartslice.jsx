// src/features/cart/CartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalAmount: 0,
  totalItems: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Agregar producto al carrito
    addToCart: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        // Si ya existe, incrementar cantidad
        existingItem.quantity += 1;
      } else {
        // Si es nuevo, agregar con cantidad 1
        state.items.push({
          ...action.payload,
          quantity: 1,
        });
      }

      // Actualizar totales
      state.totalItems = state.items.reduce(
        (total, item) => total + item.quantity, 0
      );
      state.totalAmount = state.items.reduce(
        (total, item) => total + (item.price * item.quantity), 0
      );
    },

    // Eliminar producto del carrito
    removeFromCart: (state, action) => {
      state.items = state.items.filter(
        (item) => item.id !== action.payload
      );
      
      // Actualizar totales
      state.totalItems = state.items.reduce(
        (total, item) => total + item.quantity, 0
      );
      state.totalAmount = state.items.reduce(
        (total, item) => total + (item.price * item.quantity), 0
      );
    },

    // Incrementar cantidad de un producto
    increaseQuantity: (state, action) => {
      const item = state.items.find(
        (item) => item.id === action.payload
      );
      if (item) {
        item.quantity += 1;
        state.totalItems = state.items.reduce(
          (total, item) => total + item.quantity, 0
        );
        state.totalAmount = state.items.reduce(
          (total, item) => total + (item.price * item.quantity), 0
        );
      }
    },

    // Decrementar cantidad de un producto
    decreaseQuantity: (state, action) => {
      const item = state.items.find(
        (item) => item.id === action.payload
      );
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        state.totalItems = state.items.reduce(
          (total, item) => total + item.quantity, 0
        );
        state.totalAmount = state.items.reduce(
          (total, item) => total + (item.price * item.quantity), 0
        );
      } else if (item && item.quantity === 1) {
        // Si la cantidad es 1, eliminar el producto
        state.items = state.items.filter(
          (item) => item.id !== action.payload
        );
        state.totalItems = state.items.reduce(
          (total, item) => total + item.quantity, 0
        );
        state.totalAmount = state.items.reduce(
          (total, item) => total + (item.price * item.quantity), 0
        );
      }
    },

    // Vaciar carrito
    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
      state.totalItems = 0;
    },
  },
});

// Exportar acciones
export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

// Exportar reducer
export default cartSlice.reducer;