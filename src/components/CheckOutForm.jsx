// components/CheckoutForm.js
import { useState } from 'react';

export default function CheckoutForm({ onSubmit, isLoading }) {
  const [shippingAddress, setShippingAddress] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ shippingAddress });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-1 font-medium">Shipping Address</label>
        <textarea
          value={shippingAddress}
          onChange={(e) => setShippingAddress(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Enter your complete shipping address"
          rows={4}
          required
        />
      </div>
      
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {isLoading ? 'Placing Order...' : 'Confirm Order'}
      </button>
    </form>
  );
}