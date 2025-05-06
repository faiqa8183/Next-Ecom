// components/Navbar.jsx
'use client'; // if you're using Next 13/14 with App Router. Otherwise skip this.

import { useRouter } from 'next/router';

const Navbar = () => {
  const router = useRouter();

  return (
    <nav className="bg-pink-600 p-4">
      <div className="flex justify-between items-center container mx-auto">
        {/* Logo on the left */}
        <div onClick={() => router.push('/')} className="cursor-pointer">
          <span className="text-white text-2xl font-bold">YourStore</span>
        </div>

        {/* Center links (Home and About Us) */}
        <div className="flex space-x-8">
          <div onClick={() => router.push('/')} className="text-white cursor-pointer">Home</div>
          <div onClick={() => router.push('/about')} className="text-white cursor-pointer">About Us</div>
        </div>

        {/* Right buttons (Login/Signup) */}
        <div className="flex space-x-4">
          <button
            onClick={() => router.push('/auth/login')}
            className="bg-white text-pink-600 px-4 py-2 rounded-full"
          >
            Login
          </button>
          <button
            onClick={() => router.push('/auth/signup')}
            className="bg-white text-pink-600 px-4 py-2 rounded-full"
          >
            Signup
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
