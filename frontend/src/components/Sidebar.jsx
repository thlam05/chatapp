import { Home, MessageCircle, Users, Settings } from "lucide-react";
import SidebarItem from "./SidebarItem";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 p-4">

      <h1 className="text-xl font-bold mb-6">ChatApp</h1>

      <nav className="space-y-2">

        <SidebarItem
          icon={<Home size={18} />}
          text="Dashboard"
          to="/"
        />

        <SidebarItem
          icon={<MessageCircle size={18} />}
          text="Chat"
          to="/chat"
        />

        <SidebarItem
          icon={<Users size={18} />}
          text="Friends"
          to="/friends"
        />

        <SidebarItem
          icon={<Settings size={18} />}
          text="Settings"
          to="/settings"
        />

      </nav>

    </aside>
  );
}