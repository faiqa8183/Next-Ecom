// pages/products/index.js
import { useState } from "react";
import CategoryNavbar from "../../components/Products/CategoryNavbar";
import UserMenu from "../../components/Products/UserMenu";
import { getAllProducts } from "../api/products";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import CartIcon from "@/components/Products/CartComponent";
// Adjust path if necessary

import Header from "@/components/Products/Header";

const ProductIndex = ({ products }) => {
  const { addToCart } = useCart()
  //console.log("product", products)
  const [selectedCategory, setSelectedCategory] = useState("All");
  //const[selectshow, isShowSelected] =useState(false)



  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    console.log("selectedCategory", selectedCategory)
  };

  let filteredProducts;

  if (selectedCategory === 'All') {
    filteredProducts = products;
  } else {
    filteredProducts = products.filter((prod) => prod.category === selectedCategory);
  }

  return (
    <div>
      {/* <header className="flex justify-between items-center p-4 bg-pink-50 shadow">
        <h1 className="text-2xl font-bold">Products</h1>
        <CartIcon />
        <UserMenu />
    

      </header> */}
      <Header  />
       <hr className="border-t border-gray-300" />
      <CategoryNavbar onCategoryChange={handleCategoryChange} />

      {/* <main className="p-4">
        {filteredProducts && filteredProducts.map((prod) => (
          <div key={prod._id} className="bg-white rounded-2xl shadow-md p-4 m-4 w-full max-w-xs">
            <img
              src={prod.image}
              alt={prod.title}
              className="w-full h-48 object-cover rounded-xl mb-4"
            />
            <h2 className="text-lg font-semibold text-gray-800">{prod.title}</h2>
            <p className="text-gray-600 text-sm mb-2">{prod.description}</p>
            <p className="text-pink-600 font-bold">${prod.price}</p>
            <button
              onClick={() => addToCart(prod)}
              className="px-3 py-1 bg-pink-500 text-white rounded hover:bg-pink-600 transition"
            >
              Add to Cart
            </button>
            <Link href={`/products/${prod._id}`}>
              <button className="text-blue-600">View Details</button>
            </Link>
          </div>
        ))}

      </main> */}
      <main className="p-5 flex flex-wrap justify-between gap-3">
  {filteredProducts && filteredProducts.map((prod) => (
    <div
      key={prod._id}
      className="bg-white rounded-none shadow-lg p-6 w-full sm:w-64 lg:w-80 xl:w-96"
    >
      <img
        src={prod.image}
        alt={prod.title}
        className="w-full h-60 object-cover mb-4"
      />
      <h2 className="text-xl font-semibold text-gray-800">{prod.title}</h2>
      
      <p className="text-[#8B5E3C] font-bold mt-2">${prod.price}</p>

      <div className="flex justify-between gap-4 mt-4">
        <button
          onClick={() => addToCart(prod)}
          className="px-4 py-2 bg-[#8B5E3C] text-white  hover:bg-[#6A3C1D] focus:outline-none focus:ring-2 focus:ring-[#8B5E3C] transition"
        >
          Add to Cart
        </button>

        <Link href={`/products/${prod._id}`}>
          <button className="px-4 py-2 text-[#8B5E3C] border-2 border-[#8B5E3C] bg-white  hover:bg-[#8B5E3C] hover:text-white transition">
            View Details
          </button>
        </Link>
      </div>
    </div>
  ))}
</main>

    </div>
  );
};

export async function getStaticProps() {
  const products = await getAllProducts();
  console.log("product", products)
  return {
    props: { products: JSON.parse(JSON.stringify(products)) }, //remove moongose object warper
    revalidate: 60,
  };
}


export default ProductIndex;
