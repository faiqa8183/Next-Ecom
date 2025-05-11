// pages/products/index.js
import { useState } from "react";
import CategoryNavbar from "../../components/CategoryNavbar";
import UserMenu from "../../components/UserMenu";
import { getAllProducts } from "../api/products";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import CartIcon from "@/components/CartComponent";
// Adjust path if necessary



const ProductIndex = ({ products }) => {
  const { addToCart } = useCart()
  console.log("product", products)
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
      <header className="flex justify-between items-center p-4 bg-pink-50 shadow">
        <h1 className="text-2xl font-bold">Products</h1>
        <UserMenu />
        <CartIcon />
      </header>
      <CategoryNavbar onCategoryChange={handleCategoryChange} />

      <main className="p-4">
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
