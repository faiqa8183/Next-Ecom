import "@/styles/globals.css";

// pages/_app.js
import { SessionProvider } from "next-auth/react";
import { CartProvider } from "@/context/CartContext";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <CartProvider>
  
      <Component {...pageProps} />

      </CartProvider>
    
    </SessionProvider>
  );
}

export default MyApp;

