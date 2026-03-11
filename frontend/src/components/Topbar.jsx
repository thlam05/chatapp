import { Search, Bell } from "lucide-react";

export default function Topbar() {
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

        <div className="w-9 h-9 rounded-full bg-gray-300 cursor-pointer"></div>

      </div>

    </header>
  );
}