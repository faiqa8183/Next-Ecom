// pages/admin/dashboard.js

import AdminDashboardHome from "@/components/admin/AdminDashboardHome";
import { getSession } from "next-auth/react";
import { getAllProducts } from "../api/products";

const Dashboard = ({products}) => {
  console.log("products");
  console.log(products);
  return <AdminDashboardHome product={products}/>;
};

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
   context.res.setHeader(
    'Cache-Control',
    'no-store, no-cache, must-revalidate, proxy-revalidate'
  );
  context.res.setHeader('Pragma', 'no-cache');
  context.res.setHeader('Expires', '0');
  context.res.setHeader('Surrogate-Control', 'no-store');

  if (!session || session.user.role !== "admin") {
    return {
      redirect: {
        destination: session ? "/" : "/auth/login",
        permanent: false,
      },
    };
  }
  const product = await getAllProducts()
  return {
    props: { products: JSON.parse(JSON.stringify(product)) }, //remove moongose object warper
  };
};

export default Dashboard;
