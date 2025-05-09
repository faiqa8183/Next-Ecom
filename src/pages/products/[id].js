// pages/products/[id].js
import { getSession } from "next-auth/react";
import Link from "next/link";
import { getSingleProduct } from "../api/products/[id]";  

const Productdetails = ({product}) => {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="product-detail max-w-3xl mx-auto p-4 border rounded shadow-md">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Product image */}
          <div className="w-full">
            <img
              src={product.image}
              alt={product.title}
              className="w-full max-w-md mx-auto rounded shadow"
            />
          </div>

          <div>
            <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
            <div className="flex items-center space-x-2 text-yellow-500 mb-2">
              show Reviews
            </div>
            <p className="text-2xl font-semibold text-red-600 mb-2">${product.price}</p>
            <p className="text-sm text-gray-700">
            {product.description}
          </p>
          </div>


        </div>
      <Link href="/auth/login">
        <button style={{ marginTop: "20px", padding: "10px 20px" }}>
          Go to Login
        </button>
      </Link>

      </div>
    </div>
  );
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
