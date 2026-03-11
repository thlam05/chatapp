import { UserPlus, Search } from "lucide-react";
import FriendItem from '../components/FriendItem';


export default function FriendPage() {
  return (
    <div className="h-full bg-[#f6f7fb] flex justify-center">

      <div className="w-full bg-white border border-gray-200 flex flex-col">

        {/* Header */}
        <div className="h-16 flex items-center px-6 border-b border-gray-200">

          <h2 className="font-semibold text-gray-800">
            Friends
          </h2>

        </div>


        {/* Tabs */}
        <div className="flex items-center gap-4 px-6 h-12 border-b border-gray-200 text-sm">

          <button className="px-3 py-1 rounded-md bg-gray-100">
            Online
          </button>

          <button className="px-3 py-1 rounded-md hover:bg-gray-100">
            All
          </button>

          <button className="px-3 py-1 rounded-md hover:bg-gray-100">
            Pending
          </button>

          <button className="px-3 py-1 rounded-md hover:bg-gray-100">
            Blocked
          </button>

          <button className="ml-auto flex items-center gap-2 px-4 py-2 text-sm text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition">
            <UserPlus size={16} />
            Add Friend
          </button>

        </div>


        {/* Search */}
        <div className="p-4 border-b border-gray-200">

          <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2">

            <Search size={18} className="text-gray-500" />

            <input
              type="text"
              placeholder="Search friends"
              className="ml-2 outline-none w-full text-sm"
            />

          </div>

        </div>


        {/* Friend List */}
        <div className="flex-1 overflow-auto p-3 space-y-2">

          <FriendItem
            avatar="https://i.pravatar.cc/40?img=1"
            name="Alice"
            status="Online"
          />

          <FriendItem
            avatar="https://i.pravatar.cc/40?img=2"
            name="Bob"
            status="Playing Valorant"
          />

          <FriendItem
            avatar="https://i.pravatar.cc/40?img=3"
            name="Charlie"
            status="Idle"
          />

        </div>

      </div>

    </div>
  );
}