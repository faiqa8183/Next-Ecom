import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "../../../models/User";
import bcrypt from "bcryptjs";
import dbConnect from "../../../lib/dbconnect";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await dbConnect();
        const user = await User.findOne({ email: credentials.email });

        if (user && bcrypt.compareSync(credentials.password, user.password)) {
          return { id: user._id, name: user.name, email: user.email, role: user.role };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token?.role) {
      session.user.role = token.role;
      session.user.id = token.id;
      session.user.email = token.email;
      session.accessToken = token.accessToken;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
      token.role = user.role;
      token.id = user.id;
      token.email = user.email;
      token.accessToken = user._id
      }
      return token;
    },
  },

      
  secret: process.env.JWT_SECRET,
};

export default NextAuth(authOptions);
// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import User from "@/models/User"; // adjust your path
// import bcrypt from "bcryptjs";
// import dbConnect from "@/lib/dbconnect"; // your mongoose connection util

// export default NextAuth({
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "text" },
//         password: { label: "Password", type: "password" },
//       },
//       authorize: async (credentials) => {
//         await dbConnect();

//         const user = await User.findOne({ email: credentials.email });

//         if (!user) throw new Error("User not found");

//         const isValid = await bcrypt.compare(credentials.password, user.password);
//         if (!isValid) throw new Error("Invalid password");

//         return user;
//       },
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.role = user.role;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       if (token) {
//         session.user.role = token.role;
//       }
//       return session;
//     },
//     async redirect({ url, baseUrl }) {
//       // Role-based redirect after login
//       if (url === "/api/auth/callback/credentials") {
//         // This means the user just logged in
//         return `${baseUrl}/redirect`;
//       }
//       return url.startsWith(baseUrl) ? url : baseUrl;
//     },
//   },
//   secret: process.env.NEXTAUTH_SECRET,
//   pages: {
//     signIn: "/auth/login",
//   },
// });
// pages/api/auth/[...nextauth].js
// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import User from "@/models/User"; // Adjust to your model path
// import connectDB  from "../../../lib/dbconnect";
// import { compare } from "bcryptjs";

// export const authOptions = {
//   providers: [
//     CredentialsProvider({
//       async authorize(credentials) {
//         await connectDB ();
//         const user = await User.findOne({ email: credentials.email });

//         if (!user) throw new Error("User not found");

//         const isValid = await compare(credentials.password, user.password);
//         if (!isValid) throw new Error("Invalid password");

//         return {
//           id: user._id,
//           name: user.name,
//           email: user.email,
//           role: user.role,
//         };
//       },
//     }),
//   ],

//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.role = user.role;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       if (token?.role) {
//         session.user.role = token.role;
//       }
//       return session;
//     },
//     async redirect({ baseUrl }) {
//       return `${baseUrl}/redirect`; // 👈 Always send user to redirect page
//     },
//   },

//   pages: {
//     signIn: "/auth/login",
//   },
// };

// export default NextAuth(authOptions);
