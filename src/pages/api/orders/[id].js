// pages/api/orders/[id].js
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import Order from '@/models/Order';
import dbConnect from '@/lib/dbconnect';

export default async function handler(req, res) {
  await dbConnect();

  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const order = await Order.findOne({
      _id: req.query.id,
      user: session.user.id
    }).populate('items.product');

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    return res.status(200).json(order);
  } catch (error) {
    console.error('Order fetch error:', error);
    return res.status(500).json({ 
      error: 'Server error',
      details: error.message 
    });
  }
}