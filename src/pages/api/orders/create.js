// pages/api/orders/create.js
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import Order from '@/models/Order';
import Cart from '@/models/Cart';
import dbConnect from  "../../../lib/dbconnect"

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  await dbConnect();

  try {
    const { shippingAddress } = req.body;
    
    if (!shippingAddress) {
      return res.status(400).json({ error: 'Shipping address is required' });
    }

    const cart = await Cart.findOne({ user: session.user.id }).populate('items.product');
    if (!cart?.items?.length) {
      return res.status(400).json({ error: 'Cart is empty' });
    }

    const order = new Order({
      user: session.user.id,
      items: cart.items.map(item => ({
        product: item.product._id,
        quantity: item.quantity,
        price: item.product.price
      })),
      totalAmount: cart.items.reduce(
        (total, item) => total + (item.product.price * item.quantity), 
        0
      ),
      shippingAddress
    });

    await order.save();
    await Cart.updateOne({ _id: cart._id }, { $set: { items: [] } });

    return res.status(201).json(order);
  } catch (error) {
    console.error('Order creation error:', error);
    return res.status(500).json({ 
      error: 'Server error',
      details: error.message 
    });
  }
}