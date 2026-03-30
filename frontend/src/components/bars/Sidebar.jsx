import { Home, MessageCircle, Users, Settings, LogOut, Bell } from "lucide-react";
import SidebarItem from "./SidebarItem";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router";

export default function Sidebar() {
  const { isAuthenticated, logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/auth/login");
  };
  return (
    <aside className="w-64 bg-white border-r border-gray-200 p-4 flex flex-col">

      <h1 className="text-xl font-bold mb-6">ChatApp</h1>

      <nav className="flex flex-col h-full space-y-2">

        <SidebarItem icon={<Home size={18} />} text="Dashboard" to="/" />

        <SidebarItem icon={<MessageCircle size={18} />} text="Chat" to="/chat" />

        <SidebarItem icon={<Users size={18} />} text="Friends" to="/friends" />

        <SidebarItem icon={<Bell size={18} />} text="Notifications" to="/notifications" />

        <SidebarItem icon={<Settings size={18} />} text="Settings" to="/settings" />

        {isAuthenticated && (

          <div className="mt-auto">
            <SidebarItem
              icon={<LogOut size={18} />}
              text="Logout"
              onClick={handleLogout}
            />
          </div>
        )}

      </nav>

    </aside>
  );
}