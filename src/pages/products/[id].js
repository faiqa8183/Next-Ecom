// pages/products/[id].js
import { getSession } from "next-auth/react";
import Link from "next/link";
import { getSingleProduct } from "../api/products/[id]";  
import { useState } from "react";
import { useCart } from "@/context/CartContext";

const Productdetails = ({product}) => {
   const [message, setMessage] = useState("");
    const { addToCart } = useCart()
    return (
  <div className="min-h-screen bg-[#fdf7f3] flex items-center justify-center py-10 px-4">
    <div className="product-detail max-w-3xl w-full bg-white p-6 shadow-lg">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        {/* Product image */}
        <div className="w-full">
          <img
            src={product.image}
            alt={product.title}
            className="w-full max-w-md mx-auto rounded shadow"
          />
        </div>

        {/* Product details */}
        <div>
          <h1 className="text-3xl font-bold mb-2 text-gray-800">{product.title}</h1>
          <p className="text-2xl font-semibold text-[#8B5E3C] mb-4">${product.price}</p>
          <p className="text-sm text-gray-700 mb-6">{product.description}</p>

          <button
            onClick={() => {
              addToCart(product);
              setMessage("Product added to cart!");
            }}
            className="w-full border border-[#8B5E3C] text-[#8B5E3C] px-4 py-2 hover:bg-[#8B5E3C] hover:text-white transition"
          >
            Add to Cart
          </button>

          {message && (
            <div className="mt-4 p-3  bg-[#f3ece7] text-[#8B5E3C] rounded-none">
              <p className="font-semibold mb-2">Product added to cart!</p>
              <Link href="/CartPage">
<button className="w-full bg-[#8B5E3C] text-white px-4 py-2 border border-[#8B5E3C] hover:bg-transparent hover:text-[#8B5E3C] transition">
                  View Cart
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>

      <Link href="/products">
        <button className="mt-6 border border-[#8B5E3C] text-[#8B5E3C] px-4 py-2 hover:bg-[#8B5E3C] hover:text-white transition">
          Continue Shopping
        </button>
      </Link>
    </div>
  </div>
);

//   return (
//     <div className="container bg-gradient-to-bl">
//       <div className="product-detail max-w-3xl mx-auto p-4   shadow-md">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
//           {/* Product image */}
//           <div className="w-full">
//             <img
//               src={product.image}
//               alt={product.title}
//               className="w-full max-w-md mx-auto rounded shadow"
//             />
//           </div>

//           <div>
//             <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
//             <p className="text-2xl font-semibold text-red-600 mb-2">${product.price}</p>
//             <p className="text-sm text-gray-700">
//               {product.description}
//             </p>
//             <div className="flex items-center space-x-2 text-yellow-500 mb-2">
//               show Reviews
//             </div>

//             <div>
//               <input
//                 type='number'
//                 name= 'order'
//                 defaultValue="0"
//                 className="w-full border rounded px-3 py-2 text-sm"
//               />
//               <button
//   onClick={() => {
//     addToCart(product);
//     setMessage("Product added to cart!");
//   }}
// >
//   Add Cart
// </button>
// {message && (
//   <div className="mt-3 p-3 border border-red-300 bg-red-100 text-red-800 rounded">
//     <p className="font-semibold mb-2">Product added to cart!</p>
//     <Link href="/Cartpage">
//       <button className="px-4 py-2 bg-[#8B5E3C] text-white rounded hover:bg-[#74462e] transition">
//         View Cart
//       </button>
//     </Link>
//   </div>
// )}
//             </div>
//           </div>

//         </div>
//       <Link href="/products">
//         <button className='flex items-center space-x-2 text-yellow-500 mb-2 rounded hover:bg-pink-100 transition' style={{ marginTop: "20px", padding: "10px 20px" }}>
//           Continue Shopping
//         </button>
//       </Link>

//       </div>
//     </div>
//   );
};

export const getServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session || session.user.role !== "user") {
    return {
      redirect: {
        destination: session ? "/admin/dashboard" : "/auth/login",
        permanent: false,
      },
    };
  }
  const { id } = context.params;
     const product = await getSingleProduct(id);
     console.log(product)
     if (!product) {
        return { notFound: true };
      }
    
      return {
        props: {
          product: JSON.parse(JSON.stringify(product)), // Serialize if needed
        },
     }
};

export default Productdetails;
