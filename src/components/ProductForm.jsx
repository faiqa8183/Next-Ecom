import { useState } from 'react';
import { categories } from '@/utils/constants';

const ProductForm = ({ initialData, onSubmit, isSubmitting }) => {
  const [formData, setFormData] = useState(initialData);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white shadow rounded-lg w-full max-w-md mx-auto">
      {[
        { label: 'Title', name: 'title', type: 'text' },
        { label: 'Description', name: 'description', type: 'textarea' },
        { label: 'Price', name: 'price', type: 'number' },
        { label: 'Discount Price', name: 'discountPrice', type: 'number' },
        { label: 'Quantity', name: 'quantity', type: 'number' },
        { label: 'Image URL', name: 'image', type: 'text' },
      ].map(({ label, name, type }) => (
        <div key={name}>
          <label className="block text-sm font-medium mb-1">{label}</label>
          {type === 'textarea' ? (
            <textarea
              name={name}
              value={formData[name]}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 text-sm"
              required
            />
          ) : (
            <input
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 text-sm"
              required={name !== 'discountPrice'}
            />
          )}
        </div>
      ))}

      <div>
        <label className="block text-sm font-medium mb-1">Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 text-sm"
        >
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <div className="flex gap-4 pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {isSubmitting ? 'Adding...' : 'Add Product'}
        </button>
        <button
          type="button"
          disabled={isConfirmed || isSubmitting}
          onClick={() => setIsConfirmed(true)}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
        >
          {isConfirmed ? 'Product Added' : 'Confirm Product'}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
