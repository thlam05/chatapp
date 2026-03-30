import { Search, Bell } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router";

export default function Topbar() {
  const { user, isAuthenticated } = useAuth();

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      <div></div>


      <div className="flex items-center gap-4">

        {isAuthenticated ? (
          <div className="w-9 h-9 rounded-full bg-gray-300 flex items-center justify-center font-semibold text-sm cursor-pointer">
            {user.username.charAt(0).toUpperCase()}
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