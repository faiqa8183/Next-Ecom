// pages/orders/index.js
import { useEffect, useState } from 'react';
import Link from 'next/link';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/orders')
      .then(res => res.json())
      .then(data => {
        setOrders(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching orders:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fdf7f2]">
        <p className="text-white text-xl font-bold bg-[#8B5E3C] p-4 rounded">Loading orders...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fdf7f2] p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#8B5E3C]">My Orders 🧾</h1>
        <Link href="/products">
        <button className="border border-[#8B5E3C] text-white bg-[#8B5E3C] px-4 py-2 hover:bg-white hover:text-[#8B5E3C] transition">
            Continue Shopping
          </button>
        </Link>
      </div>

      {orders.length === 0 ? (
        <div className="bg-[#fff6f0] p-6 text-center rounded border border-[#8B5E3C]">
          <p className="text-[#8B5E3C] text-lg mb-2">You haven't placed any orders yet 😔</p>
          <Link href="/products">
            <button className="border border-[#8B5E3C] text-[#8B5E3C] px-4 py-2 hover:bg-[#8B5E3C] hover:text-white transition">
              Continue Shopping
            </button>
          </Link>
        </div>
      ) : (
       <div className="space-y-4">
  {orders.map(order => (
    <div key={order._id} className="bg-white p-4 shadow-sm flex justify-between items-center">
      <div className="space-y-2">
        <p><strong>Order ID:</strong> {order._id}</p>
        <p><strong>Status:</strong> {order.status}</p>
        <p><strong>Total:</strong> ${order.totalAmount.toFixed(2)}</p>
        <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
      </div>
      <Link href={`/orders/${order._id}`}>
       <button className="border border-[#8B5E3C] bg-[#8B5E3C] text-white px-3 py-1 hover:bg-[#fff6f0] hover:text-[#8B5E3C] transition">
  View Details
</button>

      </Link>
    </div>
  ))}
</div>
      )}
    </div>
  );
};

export default OrdersPage;
