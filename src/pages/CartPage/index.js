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
 return (
    <div className="fixed inset-0 bg-[#8B5E3C] flex justify-center items-center">
      <p className="text-white text-3xl font-bold">Loading...</p>
    </div>
  );
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
      <h1 className="text-5xl font-serif font-bold mb-6">
  Your <span className="text-[#8B5E3C]">Quick</span><span className="text-black">Cart</span>!
</h1>



      {cart.length === 0 ? (
        <div className="text-center py-12 bg-[#f3e1d1] ">
  <p className="text-[#8B5E3C] text-xl mb-4">Your cart is empty 😢</p>
  <Link href="/products">
    <button className="text-white bg-[#8B5E3C] px-6 py-2  hover:bg-[#74462e] transition">
      Continue Shopping
    </button>
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

          <div className="bg-gray-50 p-6 ">
           <h2 className="text-2xl font-bold mb-4 text-[#8B5E3C]">Order Summary</h2>

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
                <label className="block mb-2  font-medium">Shipping Address</label>
                <textarea
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  className="w-full p-2 border  mb-4"
                  rows={3}
                  placeholder="Enter your complete shipping address"
                />
                <button
                  onClick={handleCheckout}
                  className="w-full bg-[#8B5E3C] text-white py-3  hover:bg-white hover:text-[#8B5E3C] border hover:border-[#8B5E3C] transition"
                  disabled={isLoading}
                >
                  Confirm Order
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={() => setShowAddressForm(true)}
                  className="w-full bg-[#8B5E3C] text-white py-3 mt-6 hover:bg-[#74462e] transition"

                  disabled={isLoading}
                >
                  Proceed to Checkout
                </button>
                <button
                  onClick={clearCart}
                  className="w-full border border-[#8B5E3C] py-3 mt-2 text-[#8B5E3C] hover:bg-gray-100 transition"
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