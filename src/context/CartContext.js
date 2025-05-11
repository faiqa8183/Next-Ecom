// context/CartContext.js
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const { data: session, status } = useSession();
  const [cart, setCart] = useState({ items: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCart = useCallback(async () => {
    if (status !== "authenticated") {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/cart', {
        credentials: 'include',
        headers: {
          'Authorization': `Bearer ${session.accessToken}`
        }
      });

      if (!res.ok) throw new Error(await res.text());

      const data = await res.json();
      setCart(data);
    } catch (err) {
      console.error("Failed to fetch cart:", err);
      setError(err.message);
      setCart({ items: [] });
    } finally {
      setIsLoading(false);
    }
  }, [session, status]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const addToCart = async (product, quantity = 1) => {
    if (status !== "authenticated") {
      setError("Please login to add items to cart");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch('/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.accessToken}`
        },
        credentials: 'include',
        body: JSON.stringify({ productId: product._id, quantity }),
      });

      if (!res.ok) throw new Error(await res.text());

      const data = await res.json();
      setCart(data);
      fetchCart()
    } catch (err) {
      console.error("Failed to add to cart:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromCart = async (productId) => {
    if (status !== "authenticated") return;

    setIsLoading(true);
    try {
      const res = await fetch('/api/cart', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.accessToken}`
        },
        credentials: 'include',
        body: JSON.stringify({ productId }),
      });

      if (!res.ok) throw new Error(await res.text());

      const data = await res.json();
      setCart(data);
    } catch (err) {
      console.error("Failed to remove from cart:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    if (status !== "authenticated") return;

    setIsLoading(true);
    try {
      const res = await fetch('/api/cart', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.accessToken}`
        },
        credentials: 'include',
        body: JSON.stringify({ productId, quantity }),
      });

      if (!res.ok) throw new Error(await res.text());

      const data = await res.json();
      setCart(data);
    } catch (err) {
      console.error("Failed to update quantity:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // context/CartContext.js
  // context/CartContext.js
  const clearCart = async () => {
    if (status !== "authenticated") return;

    setIsLoading(true);
    try {
      const res = await fetch('/api/cart', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.accessToken}`
        },
        credentials: 'include',
        body: JSON.stringify({ items: [] }), // Send empty array to clear
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || 'Failed to clear cart');
      }

      const data = await res.json();
      setCart(data);
    } catch (err) {
      console.error("Failed to clear cart:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const cartCount = cart?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;
  const cartTotal = cart?.items?.reduce(
    (sum, item) => sum + ((item.product?.price || 0) * item.quantity),
    0
  ) || 0;

  return (
    <CartContext.Provider
      value={{
        cart: cart?.items || [],
        cartCount,
        cartTotal,
        isLoading,
        error,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        refreshCart: fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);