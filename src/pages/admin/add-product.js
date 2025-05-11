
import { useState } from 'react';
import { useRouter } from 'next/router';
import ProductPreview from '@/components/ProductPreview';
import ProductForm from '@/components/ProductForm';

const AddProduct = () => {
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  

  const initialData = {
    title: '',
    description: '',
    price: '',
    discountPrice: '0',
    category: 'All',
    quantity: '',
    image: '',
  };
  const [productData , setProductData] = useState(initialData)
  console.log("productdata",productData)
  const handleAddProduct = async (formData) => {
    console.log(formData)
    try {
      setLoading(true);
      setError('');
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('Failed to add product');
      if(res.ok){
        setProductData(formData)
        alert("Product Added successfully")
        router.push('/admin/dashboard');
      }
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="container">
     
      {error && <p className="error">{error}</p>}

      <div className="add-product-container">
        {/* <div className="product-preview">
          <ProductPreview formData={productData} />
        </div> */}
        <div className="product-form">
          <ProductForm initialData={initialData} onSubmit={handleAddProduct} isSubmitting={loading} />
        </div>
      </div>
    </div>
    
  );
};

export default AddProduct;
