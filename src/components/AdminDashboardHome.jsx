// components/admin/AdminDashboardHome.js

import Link from "next/link";

const AdminDashboardHome = () => {
  return (
    <div className="p-8 text-center">
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
    </div>
  );
};

export default AdminDashboardHome;
