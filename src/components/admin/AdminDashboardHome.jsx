

import Link from "next/link";
import AdminNavbar from '../../components/admin/AdminNavbar';
import AdminWelcomePanel from '../../components/admin/AdminWelcomePanel';


const AdminDashboardHome = ({product}) => {
  console.log("productsadmin",product)
  return (
    <div >
      {/* <div className="navbar">
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
        </div> */}
        <AdminNavbar />
        <AdminWelcomePanel />

        {/* <main className="p-4">
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

      </main> */}
      <main className="p-4">
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {product && product.map((prod) => (
      <div
        key={prod._id}
        className="text-[#8B5E3C] border border-[#8B5E3C] bg-white  shadow-md p-4 w-72" // fixed width for consistency
      >
        <img
          src={prod.image}
          alt={prod.title}
          className="w-full h-40 object-cover mb-4"
        />
        <h2 className="text-lg font-semibold">{prod.title}</h2>
        <p className="text-sm mb-2">{prod.description}</p>
        <p className="font-bold">${prod.price}</p>
        <p className="font-bold">Stock: {prod.quantity}</p>

        <Link href={`/admin/edit-product/${prod._id}`}>
          <button className="mt-4 bg-white text-[#8B5E3C] py-2 w-full border border-[#8B5E3C] hover:bg-[#8B5E3C] hover:text-white transition">
            Edit Product
          </button>
        </Link>
      </div>
    ))}
  </div>
</main>

      </div>
    // </div>
  );
};

export default AdminDashboardHome;
// import AdminNavbar from '../../components/admin/AdminNavbar';
// import AdminWelcomePanel from '../../components/admin/AdminWelcomePanel';
// import AdminProductList from '../../components/admin/AdminProductList';

// const AdminDashboardHome = ({ products }) => {
//   return (
//     <div>
//       <AdminNavbar />
//       <AdminWelcomePanel />
      
// //         <main className="p-4">
// //           {product && product.map((prod) => (
// //             <div key={prod._id} className="bg-white rounded-2xl shadow-md p-4 m-4 w-full max-w-xs">
// //             <img
// //               src={prod.image}
// //               alt={prod.title}
// //               className="w-full h-48 object-cover rounded-xl mb-4"
// //             />
// //             <h2 className="text-lg font-semibold text-gray-800">{prod.title}</h2>
// //             <p className="text-gray-600 text-sm mb-2">{prod.description}</p>
// //             <p className="text-pink-600 font-bold">${prod.price}</p>
// //             <p className="text-blue-600 font-bold">{prod.quantity}</p>
// //             <Link href={`/admin/edit-product/${prod._id}`}>
// //               <button className="px-4 py-2 bg-white rounded hover:bg-pink-100 transition">Edit Product</button>
// //             </Link>
// //           </div>
// //           ))}

// //       </main>
//     </div>
//   );
// };

// export default AdminDashboardHome;
