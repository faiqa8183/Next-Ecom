import { getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]';
import Order from '@/models/Order';
import dbConnect from "../../lib/dbconnect"
import { useState } from 'react';

export default function AdminOrders({ orders: initialOrders }) {
  const [orders, setOrders] = useState(initialOrders);
  const [loading, setLoading] = useState(false);

  const updateOrderStatus = async (orderId, newStatus) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/admin/orders/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update order status');
      }

      const updatedOrder = await response.json();
      
      setOrders(orders.map(order => 
        order._id === updatedOrder._id ? updatedOrder : order
      ));
    } catch (error) {
      console.error('Error updating order:', error);
      alert('Failed to update order status');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Orders</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border">Order ID</th>
              <th className="py-2 px-4 border">User</th>
              <th className="py-2 px-4 border">Total</th>
              <th className="py-2 px-4 border">Status</th>
              <th className="py-2 px-4 border">Date</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id}>
                <td className="py-2 px-4 border">{order._id}</td>
                <td className="py-2 px-4 border">{order.user?.name || 'N/A'}</td>
                <td className="py-2 px-4 border">${order.totalAmount.toFixed(2)}</td>
                <td className="py-2 px-4 border">{order.status}</td>
                <td className="py-2 px-4 border">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className="py-2 px-4 border">
                  {order.status === 'pending' && (
                    <button 
                      onClick={() => updateOrderStatus(order._id, 'confirmed')}
                      className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                      disabled={loading}
                    >
                      {loading ? 'Updating...' : 'Confirm'}
                    </button>
                  )}
                  {order.status === 'confirmed' && (
                    <button 
                      onClick={() => updateOrderStatus(order._id, 'shipped')}
                      className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                      disabled={loading}
                    >
                      {loading ? 'Updating...' : 'Mark as Shipped'}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session || session.user.role !== 'admin') {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  await dbConnect();
  const orders = await Order.find({})
    .populate('user', 'name email')
    .sort({ createdAt: -1 })
    .lean();

  return {
    props: {
      orders: JSON.parse(JSON.stringify(orders)),
    },
  };
}