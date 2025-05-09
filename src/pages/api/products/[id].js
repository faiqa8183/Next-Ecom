import connectDB from '../../../lib/dbconnect';
import Product from '../../../models/Product';

export default async function handler(req, res) {
  const { id } = req.query;
  await connectDB();

  if (req.method === 'GET') {
    try {
      const product = await Product.findById(id);
      if (!product) return res.status(404).json({ message: 'Product not found' });
      res.status(200).json(product);
    } catch (error) {
      console.error('Error fetching product:', error);
      res.status(500).json({ message: 'Failed to fetch product' });
    }

  } else if (req.method === 'PUT') {
    try {
      const updated = await Product.findByIdAndUpdate(id, req.body, { new: true });
      res.status(200).json(updated);
    } catch (error) {
      console.error('Error updating product:', error);
      res.status(500).json({ message: 'Failed to update product' });
    }

  } else if (req.method === 'DELETE') {
    try {
      await Product.findByIdAndDelete(id);
      res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
      console.error('Error deleting product:', error);
      res.status(500).json({ message: 'Failed to delete product' });
    }

  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}


export async function getSingleProduct(id) {
    const product = await Product.findById(id).lean();
    return product;
  }