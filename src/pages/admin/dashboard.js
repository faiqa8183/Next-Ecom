// pages/admin/dashboard.js

import AdminDashboardHome from "@/components/AdminDashboardHome";
import { getSession } from "next-auth/react";

const Dashboard = () => {
  return <AdminDashboardHome />;
};

export const getServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session || session.user.role !== "admin") {
    return {
      redirect: {
        destination: session ? "/" : "/auth/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default Dashboard;
