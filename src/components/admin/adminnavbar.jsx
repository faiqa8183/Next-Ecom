import { useRouter } from 'next/router';

const AdminNavbar = () => {
  const router = useRouter();

  const handleLogout = () => {
    // TODO: Replace with actual logout logic
    console.log("Logging out...");
    router.push('/auth/login');
  };

  return (
    <nav className="bg-white px-6 py-4 shadow flex justify-between items-center">
      {/* Logo */}
      <div onClick={() => router.push('/')} className="cursor-pointer">
        <span className="text-2xl font-serif font-bold">
          <span className="text-[#8B5E3C]">Quick</span>
          <span className="text-black">Cart</span>
        </span>
      </div>

      {/* Logout Button */}
     <button
  onClick={handleLogout}
  className="bg-[#8B5E3C] text-white hover:bg-white hover:text-[#8B5E3C] hover:border hover:border-[#8B5E3C] px-5 py-2 font-semibold transition-colors duration-200"
>
  Logout
</button>

    </nav>
  );
};

export default AdminNavbar;
