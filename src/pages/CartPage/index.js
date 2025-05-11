// pages/CartPage.js
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function CartPage() {
  const {
    cart,
    cartTotal,
    isLoading,
    error,
    removeFromCart,
    updateQuantity,
    clearCart
  } = useCart();
  const { data: session, status } = useSession();
  const [shippingAddress, setShippingAddress] = useState('');
  const [showAddressForm, setShowAddressForm] = useState(false);


  const handleCheckout = async () => {
  if (!shippingAddress.trim()) {
    alert('Please enter a shipping address');
    return;
  }

  try {
    const response = await fetch('/api/orders/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        shippingAddress: shippingAddress.trim()
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to create order');
    }

    const order = await response.json();
    window.location.href = `/orders/${order._id}`;
    clearCart(); // Clear the cart after successful order
  } catch (error) {
    console.error('Checkout error:', error);
    alert('Checkout failed: ' + error.message);
  }
};

  if (status === "loading" || isLoading) {
    return <div className="container mx-auto p-4">Loading cart...</div>;
  }

  if (status === "unauthenticated") {
    return (
      <div className="container mx-auto p-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
        <p className="mb-4">Please sign in to view your cart</p>
        <Link href="/auth/login" className="text-blue-600 hover:underline">
          Sign In
        </Link>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4 text-center text-red-600">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      {cart.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">Your cart is empty</p>
          <Link href="/products" className="text-blue-600 hover:underline">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {cart.map(item => (
              <div key={item.product._id} className="flex border-b py-4 items-center">
                <img
                  src={item.product.image}
                  alt={item.product.title}
                  className="w-24 h-24 object-cover rounded mr-4"
                />
                <div className="flex-1">
                  <h3 className="font-medium">{item.product.title}</h3>
                  <p className="text-gray-600">${item.product.price}</p>
                  <div className="flex items-center mt-2">
                    <button
                      onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                      className="px-3 py-1 border rounded-l"
                      disabled={isLoading}
                    >
                      -
                    </button>
                    <span className="px-4 py-1 border-t border-b">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                      className="px-3 py-1 border rounded-r"
                      disabled={isLoading}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="ml-4 text-right">
                  <p className="font-medium">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </p>
                  <button
                    onClick={() => removeFromCart(item.product._id)}
                    className="text-red-500 text-sm mt-2"
                    disabled={isLoading}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-lg font-medium mb-4">Order Summary</h2>
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <div className="border-t pt-4 mt-4">
              <div className="flex justify-between font-medium text-lg">
                <span>Total</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
            </div>

            {showAddressForm ? (
              <div className="mt-6">
                <label className="block mb-2 font-medium">Shipping Address</label>
                <textarea
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  className="w-full p-2 border rounded mb-4"
                  rows={3}
                  placeholder="Enter your complete shipping address"
                />
                <button
                  onClick={handleCheckout}
                  className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
                  disabled={isLoading}
                >
                  Confirm Order
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={() => setShowAddressForm(true)}
                  className="w-full bg-blue-600 text-white py-3 rounded mt-6 hover:bg-blue-700 transition"
                  disabled={isLoading}
                >
                  Proceed to Checkout
                </button>
                <button
                  onClick={clearCart}
                  className="w-full border border-gray-300 py-3 rounded mt-2 hover:bg-gray-100 transition"
                  disabled={isLoading}
                >
                  Clear Cart
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}