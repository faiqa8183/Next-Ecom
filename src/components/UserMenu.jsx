// components/UserMenu.js

import { signOut, useSession } from "next-auth/react";
import { useState } from "react";




const UserMenu = () => {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
     
      console.log("session" , session);
     
  if (!session) return null;

  return (
    <div className="relative inline-block text-left">
      <button
        className="rounded-full bg-pink-200 p-2"
        onClick={() => setOpen(!open)}
      >
        👤
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-32 bg-white border shadow rounded">
          <button
            onClick={() => alert("Account clicked")}
            className="block w-full px-4 py-2 text-left hover:bg-gray-100"
          >
            Account
          </button>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="block w-full px-4 py-2 text-left hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
