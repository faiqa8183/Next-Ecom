
import { useState } from 'react';
import { useRouter } from 'next/router';
import ProductPreview from '@/components/ProductPreview';
import ProductForm from '@/components/ProductForm'; // ✅ NEW import

const AddProduct = () => {
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const initialData = {
    title: '',
    description: '',
    price: '',
    discountPrice: '',
    category: 'All',
    quantity: '',
    image: '',
  };

  const handleAddProduct = async (formData) => {
    try {
      setLoading(true);
      setError('');
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('Failed to add product');
      router.push('/admin/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Add New Product</h1>
      {error && <p className="error">{error}</p>}

      <div className="add-product-container">
        <div className="product-preview">
          <ProductPreview formData={initialData} />
        </div>
        <div className="product-form">
          <ProductForm initialData={initialData} onSubmit={handleAddProduct} isSubmitting={loading} />
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
