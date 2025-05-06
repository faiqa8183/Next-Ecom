// // pages/redirect.js

// import { getSession } from "next-auth/react";

// export const getServerSideProps = async (context) => {
//   const session = await getSession(context);

//   if (!session) {
//     return {
//       redirect: {
//         destination: "/auth/login",
//         permanent: false,
//       },
//     };
//   }

//   const role = session.user.role;

//   return {
//     redirect: {
//       destination: role === "admin" ? "/admin/dashboard" : "/products/index",
//       permanent: false,
//     },
//   };
// };

// export default function RedirectPage() {
//   return null; // or loading spinner if you want
// }
// pages/redirect.js
// import { getSession } from "next-auth/react";
// import { useEffect } from "react";
// import { useRouter } from "next/router";

// export default function RedirectPage() {
//   const router = useRouter();

//   useEffect(() => {
//     const handleRedirect = async () => {
//       const session = await getSession();

//       if (session?.user?.role === "admin") {
//         router.replace("/admin/dashboard");
//       } else if (session?.user?.role === "user") {
//         router.replace("/products");
//       } else {
//         router.replace("/");
//       }
//     };

//     handleRedirect();
//   }, [router]);

//   return <p>Redirecting...</p>;
// }
// // pages/redirect.js
// // import { getSession } from "next-auth/react";
// // import { useEffect } from "react";
// // import { useRouter } from "next/router";

// // const RedirectPage = () => {
// //   const router = useRouter();

// //   useEffect(() => {
// //     const checkRole = async () => {
// //       const session = await getSession();
// //       console.log("Redirecting based on session:", session);

// //       if (session?.user?.role === "admin") {
// //         router.replace("/admin/dashboard");
// //       } else if (session?.user?.role === "user") {
// //         router.replace("/products");
// //       } else {
// //         router.replace("/");
// //       }
// //     };

// //     checkRole();
// //   }, [router]);

// //   return <p>Redirecting...</p>;
// // };

// // export default RedirectPage;
