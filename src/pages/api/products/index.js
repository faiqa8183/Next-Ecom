import connectDB from '../../../lib/dbconnect';
import Product from '../../../models/Product';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      await connectDB();
      const product = new Product(req.body);
      await product.save();
      
      res.status(200).json({ message: 'Product added successfully' });
    } catch (error) {
      console.error('Error adding product:', error);
      res.status(500).json({ message: 'Error adding product' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
