import React, { createContext, useState } from 'react';

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart(prevCart => [...prevCart, product]);
  };

  const updateProductInCart = (updatedProduct) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.selectedVariant.id === updatedProduct.selectedVariant.id
          ? { ...item, selectedVariant: { ...item.selectedVariant, quantity: updatedProduct.selectedVariant.quantity } }
          : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };


  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, updateProductInCart }}>
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider };
