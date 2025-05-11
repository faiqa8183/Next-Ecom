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
    return (
    <div className="fixed inset-0 bg-[#8B5E3C] flex justify-center items-center">
      <p className="text-white text-3xl font-bold">Loading session...</p>
    </div>
  );
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
  return (
    <div className="fixed inset-0 bg-[#8B5E3C] flex justify-center items-center">
      <p className="text-white text-3xl font-bold">Loading...</p>
    </div>
  );
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
    // <div className="container mx-auto p-4">
    //   <h1 className="text-2xl font-bold mb-6">Order Confirmation</h1>
    //   <div className="bg-white p-6 rounded-lg shadow">
    //     <h2 className="text-xl font-semibold mb-4">Thank you for your order!</h2>
    //     <p className="mb-2">Order ID: {order._id}</p>
    //     <p className="mb-2">Status: {order.status}</p>
    //     <p className="mb-2">Total: ${order.totalAmount.toFixed(2)}</p>
        
    //     <h3 className="font-medium mt-4">Items:</h3>
    //     <ul className="mt-2 space-y-2">
    //       {order.items.map(item => (
    //         <li key={item._id} className="flex justify-between">
    //           <span>{item.product?.name || 'Product'} × {item.quantity}</span>
    //           <span>${(item.price * item.quantity).toFixed(2)}</span>
    //         </li>
    //       ))}
    //     </ul>
        
        
    //   </div>
    // </div>
  <div className="container mx-auto p-4">
  <h1 className="text-3xl font-extrabold text-[#8B5E3C] mb-6 text-center">
    Order Confirmation 🎉
  </h1>

  <div className="bg-[#f9f6f1] p-8 shadow-lg border border-[#8B5E3C] max-w-2xl mx-auto">
    <h2 className="text-2xl font-semibold text-[#8B5E3C] mb-6 text-center">
      Thank you for your order!
    </h2>

    <div className="mb-6">
      <div className="flex justify-between mb-2 text-[#8B5E3C] text-lg">
        <span className="font-medium">Order ID:</span>
        <span>{order._id}</span>
      </div>
      <div className="flex justify-between mb-2 text-[#8B5E3C] text-lg">
        <span className="font-medium">Status:</span>
        <span>{order.status}</span>
      </div>
      <div className="flex justify-between mb-2 text-[#8B5E3C] text-lg">
        <span className="font-medium">Total:</span>
        <span className="font-bold">${order.totalAmount.toFixed(2)}</span>
      </div>
    </div>

    <h3 className="text-xl font-semibold text-[#8B5E3C] mb-3 border-b border-[#8B5E3C] pb-2">
      Items in your order
    </h3>
    <ul className="space-y-3">
      {order.items.map(item => (
        <li key={item._id} className="flex justify-between text-[#8B5E3C] text-base">
          <span>{item.product?.name || 'Product'} × {item.quantity}</span>
          <span>${(item.price * item.quantity).toFixed(2)}</span>
        </li>
      ))}
    </ul>

    <div className="mt-8 text-center">
      <Link href="/orders">
        <button className="bg-[#8B5E3C] text-white py-2 px-6 hover:bg-[#74462e] transition font-semibold">
          My Orders
        </button>
      </Link>
    </div>
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