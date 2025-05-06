// pages/products/[id].js
import { getSession } from "next-auth/react";
import Link from "next/link";

const Productdetails = () => {
  return (
    <div>
      <h1>Product List</h1>
      <Link href="/auth/login">
        <button style={{ marginTop: "20px", padding: "10px 20px" }}>
          Go to Login
        </button>
      </Link>
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

export default Productdetails;
