// import { useState } from 'react';
// import { categories } from '@/utils/constants';
// import Upload_Images from './Upload_image';

// const ProductForm = ({ initialData, onSubmit, isSubmitting }) => {
//   const [formData, setFormData] = useState(initialData);
//   //const [isConfirmed, setIsConfirmed] = useState(false);

//   const handleImageUpload=(url)=>{
//     setFormData((prev) => ({ ...prev, image: url }));
//   }
//   const handleChange = (e) => {
//     const { name, value} = e.target;

//       setFormData((prev) => ({
//         ...prev,
//         [name]: value,
//       }));

//   };
//   console.log("formData",formData)
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(formData);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white shadow rounded-lg w-full max-w-md mx-auto">
//       {[
//         { label: 'Title', name: 'title', type: 'text' },
//         { label: 'Description', name: 'description', type: 'textarea' },
//         { label: 'Price', name: 'price', type: 'number' },
//         { label: 'Quantity', name: 'quantity', type: 'number' },
//         { label: 'Product Image', name: 'image', type: 'file' },
//       ].map(({ label, name, type }) => (
//         <div key={name}>
//           <label className="block text-sm font-medium mb-1">{label}</label>
//           {type === 'textarea' ? (
//             <textarea
//               name={name}
//               value={formData[name]}
//               onChange={handleChange}
//               className="w-full border rounded px-3 py-2 text-sm"
//               required
//             />
//           ) :type === 'file' ? (
//             <Upload_Images onImageUpload={handleImageUpload} />

//           ): (
//             <input
//               type={type}
//               name={name}
//               value={formData[name]}
//               onChange={handleChange}
//               className="w-full border rounded px-3 py-2 text-sm"
//               required={name !== 'discountPrice'}
//             />
//           )}
//         </div>
//       ))}
//       <div>
//         <label className="block text-sm font-medium mb-1">Category</label>
//         <select
//           name="category"
//           value={formData.category}
//           onChange={handleChange}
//           className="w-full border rounded px-3 py-2 text-sm"
//         >
//           {categories.map((c) => (
//             <option key={c} value={c}>{c}</option>
//           ))}
//         </select>
//       </div>

//       <div className="flex gap-4 pt-2">
//         <button
//           type="submit"
//           disabled={isSubmitting}
//           className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
//         >
//           {isSubmitting ? 'Adding...' : 'Add Product'}
//         </button>
//       </div>
//     </form>
//   );
// };

// export default ProductForm
 import { useState } from 'react';
import { categories } from '@/utils/constants';
import Upload_Images from './Upload_image';
import Image from 'next/image';
import Link from 'next/link';

const ProductForm = ({ initialData, onSubmit, isSubmitting }) => {
  const [formData, setFormData] = useState(initialData);

  const handleImageUpload = (url) => {
    setFormData((prev) => ({ ...prev, image: url }));
  };

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
    <div className="min-h-screen w-screen overflow-hidden bg-[#8B5E3C] flex flex-col">
      {/* Navbar */}
      <nav className="bg-white shadow px-6 py-4 flex items-center">
        <Link href="/">
          <span className="text-2xl font-bold text-[#8B5E3C]">QuickCart</span>
        </Link>
      </nav>

      {/* Main layout: fixed full height minus navbar */}
      <div className="flex flex-1 h-[calc(100vh-64px)]">
        {/* Left Image Section */}
        <div className="w-1/2 relative hidden md:block h-full">
          <Image
            src="/images/banner3.jpg"
            alt="Banner"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Right Form Section */}
        <div className="w-full md:w-1/2 h-full flex   items-center justify-center bg-[#8B5E3C] ">
          <form
            onSubmit={handleSubmit}
            className=" p-6 bg-white shadow-md  w-full max-w-md"
          >
            {[
              { label: 'Title', name: 'title', type: 'text' },
              { label: 'Description', name: 'description', type: 'textarea' },
              { label: 'Price', name: 'price', type: 'number' },
              { label: 'Quantity', name: 'quantity', type: 'number' },
              { label: 'Product Image', name: 'image', type: 'file' },
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
                ) : type === 'file' ? (
                  <Upload_Images onImageUpload={handleImageUpload} />
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
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-4 pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 bg-[#8B5E3C] text-white  hover:bg-[#a06b44] disabled:opacity-50"
              >
                {isSubmitting ? 'Adding...' : 'Add Product'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
