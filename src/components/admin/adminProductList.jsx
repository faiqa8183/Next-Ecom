import Link from "next/link";

const AdminProductList = ({ products }) => {
  return (
    <section className="p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products && products.length > 0 ? (
        products.map((prod) => (
          <div
            key={prod._id}
            className="bg-white shadow-md p-4 rounded-none border border-gray-200"
          >
            <img
              src={prod.image}
              alt={prod.title}
              className="w-full h-48 object-cover mb-4"
            />
            <h2 className="text-lg font-semibold text-gray-800">{prod.title}</h2>
            <p className="text-sm text-gray-600 mb-2">{prod.description}</p>
            <p className="text-pink-600 font-bold mb-1">${prod.price}</p>
            <p className="text-blue-600 text-sm font-semibold mb-2">
              In Stock: {prod.quantity}
            </p>
            <Link href={`/admin/edit-product/${prod._id}`}>
              <button className="w-full bg-pink-500 text-white py-2 hover:bg-pink-600 transition-all">
                ✏️ Edit Product
              </button>
            </Link>
          </div>
        ))
      ) : (
        <p className="col-span-full text-center text-gray-500">
          No products found.
        </p>
      )}
    </section>
  );
};

export default AdminProductList;
