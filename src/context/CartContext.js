import React, { createContext, useState, useContext, useEffect } from 'react';
import { useSession } from 'next-auth/react';

// Create a Cart Context
const CartContext = createContext();

// Custom hook to use cart context
export const useCart = () => {
  return useContext(CartContext);
};

// CartContext Provider Component
export const CartProvider = ({ children }) => {
  const { data: session } = useSession();
  const [cart, setCart] = useState([]);

  // Fetch cart from the backend when the user is logged in
  useEffect(() => {
    const fetchCart = async () => {
      if (session) {
        try {
          const response = await fetch('/api/cart');
          if (response.ok) {
            const data = await response.json();
            setCart(data); // Set the fetched cart state
          }
        } catch (error) {
          console.error('Error fetching cart:', error);
        }
      }
    };

    fetchCart();
  }, [session]);

  // Add item to cart
  const addToCart = async (product, quantity) => {
    const updatedCart = [...cart, { product, quantity }];
    setCart(updatedCart);

    if (session) {
      await fetch('/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: session.user.id,
          productId: product._id,
          quantity,
        }),
      });
    }
  };

  // Update item quantity in the cart
  const updateQuantity = async (productId, quantity) => {
    const updatedCart = cart.map(item =>
      item.product._id === productId ? { ...item, quantity } : item
    );
    setCart(updatedCart);

    if (session) {
      await fetch('/api/cart', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: session.user.id,
          productId,
          quantity,
        }),
      });
    }
  };

  // Remove item from cart
  const removeFromCart = async (productId) => {
    const updatedCart = cart.filter(item => item.product._id !== productId);
    setCart(updatedCart);

    if (session) {
      await fetch('/api/cart', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: session.user.id,
          productId,
        }),
      });
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
