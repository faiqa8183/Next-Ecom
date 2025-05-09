import connectDB from '../../../lib/dbconnect';
import Product from '../../../models/Product';

export default async function handler(req, res) {
  await connectDB();

  if (req.method === 'GET') {
    try {
      const products = await Product.find({});
      res.status(200).json(products);
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ message: 'Failed to fetch products' });
    }

  } else if (req.method === 'POST') {
    try {
      const product = new Product(req.body);
      await product.save();
      res.status(201).json({ message: 'Product added successfully', product });
    } catch (error) {
      console.error('Error adding product:', error);
      res.status(500).json({ message: 'Failed to add product' });
    }

  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export async function getAllProducts() {
  await connectDB();
  const products = await Product.find({}).lean();
  return products;
}
