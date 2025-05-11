// components/Header.jsx
import React from "react";
import CartIcon from "./CartComponent";
import UserMenu from "./UserMenu";
import { useRouter } from "next/router";

const Header = () => {
  return (
    <header className="flex justify-between items-center px-10 py-6 bg-white shadow-md">
      <div onClick={() => router.push('/')} className="cursor-pointer">
        <span className="text-6xl font-serif font-bold">
          <span className="text-[#8B5E3C]">Quick</span>
          <span className="text-black">Cart</span>
        </span>
      </div>
      <div className="flex items-center gap-4">
        <CartIcon />
        <UserMenu />
      </div>
      
    </header>
   
  );
};

export default Header;
