// pages/api/admin/orders/[id].js
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]';
import Order from '@/models/Order';
import dbConnect from "../../../../lib/dbconnect"

export default async function handler(req, res) {
  await dbConnect();

  const session = await getServerSession(req, res, authOptions);
  if (!session || session.user.role !== 'admin') {
    return res.status(403).json({ error: 'Unauthorized' });
  }

  if (req.method !== 'PUT') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.query.id,
      { status },
      { new: true }
    ).populate('user', 'name email');

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    return res.status(200).json(order);
  } catch (error) {
    console.error('Order update error:', error);
    return res.status(500).json({ 
      error: 'Server error',
      details: error.message 
    });
  }
}