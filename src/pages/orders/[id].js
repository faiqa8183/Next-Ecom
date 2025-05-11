import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function OrderConfirmation({ orderId }) {
  const { data: session, status } = useSession();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await fetch(`/api/orders/${orderId}`);
        if (!res.ok) {
          throw new Error(await res.text());
        }
        const data = await res.json();
        setOrder(data);
      } catch (err) {
        console.error('Failed to fetch order:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (status === 'authenticated') {
      fetchOrder();
    }
  }, [orderId, status]);

  if (status === 'loading') {
    return <div className="container mx-auto p-4">Loading session...</div>;
  }

  if (status === 'unauthenticated') {
    return (
      <div className="container mx-auto p-4 text-center">
        <p>Please sign in to view your order</p>
        <Link href="/auth/login" className="text-blue-600">
          Sign In
        </Link>
      </div>
    );
  }

  if (loading) {
    return <div className="container mx-auto p-4">Loading order details...</div>;
  }

  if (error) {
    return (
      <div className="container mx-auto p-4 text-red-600">
        Error: {error.includes('<!DOCTYPE') ? 'Failed to load order details' : error}
      </div>
    );
  }

  if (!order) {
    return <div className="container mx-auto p-4">Order not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Order Confirmation</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Thank you for your order!</h2>
        <p className="mb-2">Order ID: {order._id}</p>
        <p className="mb-2">Status: {order.status}</p>
        <p className="mb-2">Total: ${order.totalAmount.toFixed(2)}</p>
        
        <h3 className="font-medium mt-4">Items:</h3>
        <ul className="mt-2 space-y-2">
          {order.items.map(item => (
            <li key={item._id} className="flex justify-between">
              <span>{item.product?.name || 'Product'} × {item.quantity}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </li>
          ))}
        </ul>
        
        
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {
      orderId: context.params.id,
    },
  };
}