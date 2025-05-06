// pages/products/index.js

import { getSession } from "next-auth/react";
import CategoryNavbar from "../../components/CategoryNavbar";
import UserMenu from "../../components/UserMenu";

const ProductIndex = () => {
  return (
    <div>
      <header className="flex justify-between items-center p-4 bg-pink-50 shadow">
        <h1 className="text-2xl font-bold">Products</h1>
        <UserMenu />
      </header>
      <CategoryNavbar />

      <main className="p-8">
        <p>Here we'll show the list of products...</p>
      </main>
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

  return {
    props: { session },
  };
};

export default ProductIndex;
