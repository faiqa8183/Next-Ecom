// components/Navbar.jsx
'use client';

import { useRouter } from 'next/router';

const Navbar = () => {
  const router = useRouter();

  return (
    <nav className="bg-white p-4 shadow-md">
      <div className="flex justify-between items-center container mx-auto">
        {/* Logo */}
        <div onClick={() => router.push('/')} className="cursor-pointer">
          <span className="text-2xl font-serif font-bold">
            <span className="text-[#8B5E3C]">Quick</span>
            <span className="text-black">Cart</span>
          </span>
        </div>

        {/* Center Links */}
        <div className="flex space-x-8 font-semibold">
          <div
            onClick={() => router.push('/')}
            className="cursor-pointer text-[#8B5E3C] hover:text-[#D2B48C]"
          >
            Home
          </div>
          <a href="#about-section" className="cursor-pointer text-[#8B5E3C] hover:text-[#D2B48C]">
  About Us
</a>

        </div>

        {/* Right Buttons */}
        <div className="flex space-x-0 border overflow-hidden">
          <button
            onClick={() => router.push('/auth/login')}
            className="px-5 py-2 text-[#8B5E3C] bg-white hover:bg-[#f2f2f2] transition font-medium"
          >
            Login
          </button>
          <button
            onClick={() => router.push('/auth/signup')}
            className="px-5 py-2 text-white bg-[#8B5E3C] hover:bg-[#6e4a2b] transition font-medium"
          >
            Signup
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
