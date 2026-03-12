import { Search, Bell } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router";

export default function Topbar() {
  const { isAuthenticated } = useAuth();

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">

      <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2 w-80 bg-white hover:border-gray-300 focus-within:border-purple-400 transition">

        <Search size={18} className="text-gray-500" />

        <input
          type="text"
          placeholder="Search..."
          className="w-full outline-none text-sm"
        />

      </div>


      <div className="flex items-center gap-4">

        <button className="p-2 rounded-lg hover:bg-gray-100">
          <Bell size={20} />
        </button>

        {isAuthenticated ? (
          <div className="w-9 h-9 rounded-full bg-gray-300 flex items-center justify-center font-semibold text-sm cursor-pointer">
            L
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link
              to="/auth/login"
              className="text-sm font-medium text-gray-600 hover:text-black"
            >
              Login
            </Link>

            <Link
              to="/auth/register"
              className="bg-purple-500 text-white px-3 py-1 rounded-md text-sm hover:bg-purple-600"
            >
              Register
            </Link>
          </div>
        )}

      </div>

    </header>
  );
}