// // // pages/index.js

// // import Navbar from '../components/Navbar';

// // const Home = () => {
// //   return (
// //     <div>
// //       <Navbar />
// //       <main className="container mx-auto p-8">
// //         <h1 className="text-4xl font-bold text-center mb-6">Welcome to YourStore!</h1>
// //         <p className="text-center text-lg">Explore our amazing products and deals!</p>
// //       </main>
// //     </div>
// //   );
// // };


// // // pages/index.js

// // import { getSession } from "next-auth/react";



// // export const getServerSideProps = async (context) => {
// //   const session = await getSession(context);

// //   if (session) {
// //     // Check the role of the user
// //     if (session.user.role === "admin") {
// //       // Redirect to admin dashboard if the user is an admin
// //       return {
// //         redirect: {
// //           destination: "/admin/dashboard",
// //           permanent: false,
// //         },
// //       };
// //     } else if (session.user.role === "user") {
// //       // Redirect to the product listing if the user is a normal user
// //       return {
// //         redirect: {
// //           destination: "/products/index",
// //           permanent: false,
// //         },
// //       };
// //     }
// //   }

// //   // If not authenticated, redirect to the login page
// //   return {
// //     redirect: {
// //       destination: "/",
// //       permanent: false,
// //     },
// //   };
// // };

// // export default Home;

// // pages/index.js

// import { useEffect } from "react";
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/router";
// import Navbar from "../components/Navbar";

// const Home = () => {
//   const { data: session, status } = useSession();
//   const router = useRouter();

//   useEffect(() => {
//     // Only redirect once session is fully loaded
//     if (status === "authenticated") {
//       if (session?.user?.role === "admin") {
//         router.replace("/admin/dashboard");
//       } else if (session?.user?.role === "user") {
//         router.replace("/products/index");
//       }
//     }
//   }, [session, status, router]);

//   return (
//     <div>
//       <Navbar />
//       <main className="container mx-auto p-8">
//         <h1 className="text-4xl font-bold text-center mb-6">Welcome to YourStore!</h1>
//         <p className="text-center text-lg">Explore our amazing products and deals!</p>
//       </main>
//     </div>
//   );
// };

// export default Home;
// pages/index.js
// import Navbar from "../components/Navbar";
// import { useEffect } from "react";
// import { signOut } from "next-auth/react";
 

// export default function Home() {
//   useEffect(() => {
//     if (process.env.NODE_ENV === "development") {
//       signOut({ redirect: false }); // Don't redirect user, just clear session
//     }
//   }, []);
//   return (
//     <div>
//       <Navbar />
//       <main className="container mx-auto p-8">
//         <h1 className="text-4xl font-bold text-center mb-6">Welcome to YourStore!</h1>
//         <p className="text-center text-lg">Explore our amazing products and deals!</p>
//       </main>
//     </div>
//   );
// }
// import { getSession } from "next-auth/react";

// export async function getServerSideProps(context) {
//   const session = await getSession(context);

//   if (session?.user?.role === "admin") {
//     return {
//       redirect: {
//         destination: "/admin/dashboard",
//         permanent: false,
//       },
//     };
//   }

//   if (session?.user?.role === "user") {
//     return {
//       redirect: {
//         destination: "/products/index",
//         permanent: false,
//       },
//     };
//   }
  

//   return {
//     props: {},
//   };
// }
// pages/index.js
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";
import HomePageContent from "@/components/HomePage";

const Home = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // OPTIONAL: If you want to auto-redirect logged-in users to role-based pages
    if (status === "authenticated") {
      if (session.user.role === "admin") {
        router.push("/admin/dashboard");
      } else if (session.user.role === "user") {
        router.push("/products");
      }
    }
  }, [session, status]);

  return (
    <div>
      <Navbar />
      <HomePageContent/>
    </div>
  );
};

export default Home;