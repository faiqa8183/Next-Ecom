// import { useState } from "react";
// import { signIn } from "next-auth/react";
// import { useRouter } from "next/router";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const router = useRouter();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const res = await signIn("credentials", {
//       redirect: false,
//       email,
//       password,
//       callbackUrl: "/redirect", 
//     });

//     if (res.ok) {
//       router.push("/");
//     } else {
//       alert("Invalid credentials");
//     }
//   };

//   return (
//     <div className="flex justify-center items-center h-screen bg-gray-100">
//       <div className="p-8 bg-white rounded-md shadow-md w-full max-w-sm">
//         <h2 className="text-2xl font-bold mb-6">Login</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label className="block text-sm mb-2">Email</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full p-2 border border-gray-300 rounded-md"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-sm mb-2">Password</label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full p-2 border border-gray-300 rounded-md"
//               required
//             />
//           </div>
//           <button type="submit" className="w-full py-2 mt-4 bg-pink-600 text-white rounded-md">
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
      callbackUrl: "/redirect",
    });

    if (res.ok) {
      router.push("/");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen">
      {/* Left Side Image */}
      <div
        className="hidden md:block bg-cover bg-center"
        style={{ backgroundImage: "url('/images/banner1.jpg')" }}
      />

      {/* Right Side: Login Form */}
      <div className="flex justify-center items-center bg-[#b5784a]">
        <div className="p-8 bg-white w-full max-w-sm">
          {/* Logo */}
          <div className="mb-6 cursor-pointer" onClick={() => router.push("/")}>
            <span className="text-2xl font-serif font-bold">
              <span className="text-[#8B5E3C]">Quick</span>
              <span className="text-black">Cart</span>
            </span>
          </div>

          <h2 className="text-2xl font-bold mb-6">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 mt-4 bg-[#b5784a] text-white rounded-md"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
