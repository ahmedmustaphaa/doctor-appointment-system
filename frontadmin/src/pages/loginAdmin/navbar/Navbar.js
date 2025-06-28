import React from 'react';
import { UseproviderContext } from '../../../context/Appcontext';

function Navbar() {
  const { atoken, setToken } = UseproviderContext();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <nav className="w-full h-20 bg-white shadow-md px-6 flex items-center justify-between">
      {/* شعار أو اسم التطبيق */}
      <div className="text-xl font-semibold text-gray-800 tracking-wide">
        Admin Dashboard
      </div>

      {/* زر تسجيل الخروج */}
      {atoken && (
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all duration-300 shadow-sm"
        >
          Logout
        </button>
      )}
    </nav>
  );
}

export default Navbar;
