// components/admin/AdminDashboardHome.js

import Link from "next/link";

const AdminDashboardHome = ({product}) => {
  console.log("productsadmin",product)
  return (
    <div className="p-8 text-center">
      <div className="navbar">
        <h1 className="text-3xl font-bold mb-4">Welcome, Admin 👋</h1>
        <p className="text-lg mb-8 text-gray-600">
          Manage your store efficiently from here.
        </p>
        <div className="flex justify-center gap-6">
          <Link href="/admin/add-product">
            <button className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-lg shadow">
              ➕ Add Product
            </button>
          </Link>
          <Link href="/admin/orders">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg shadow">
              📦 View Orders
            </button>
          </Link>
        </div>

        <main className="p-4">
          {product && product.map((prod) => (
            <div key={prod._id} className="bg-white rounded-2xl shadow-md p-4 m-4 w-full max-w-xs">
            <img
              src={prod.image}
              alt={prod.title}
              className="w-full h-48 object-cover rounded-xl mb-4"
            />
            <h2 className="text-lg font-semibold text-gray-800">{prod.title}</h2>
            <p className="text-gray-600 text-sm mb-2">{prod.description}</p>
            <p className="text-pink-600 font-bold">${prod.price}</p>
            <p className="text-blue-600 font-bold">{prod.quantity}</p>
            <Link href={`/admin/edit-product/${prod._id}`}>
              <button className="px-4 py-2 bg-white rounded hover:bg-pink-100 transition">Edit Product</button>
            </Link>
          </div>
          ))}

      </main>
      </div>
    </div>
  );
};

export default AdminDashboardHome;
