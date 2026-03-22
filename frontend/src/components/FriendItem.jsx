import { MessageCircle, UserPlus } from "lucide-react";

export default function FriendItem({ name, status }) {
  return (
    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl bg-white hover:bg-gray-50 transition">

      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-full text-white flex items-center justify-center font-semibold bg-gray-500`}>
          {name?.charAt(0).toUpperCase()}
        </div>

        <div>
          <div className="font-medium text-gray-800">{name}</div>
          <div className="text-xs text-gray-500">{status}</div>
        </div>
      </div>

      <button className="flex items-center gap-1 px-3 py-1.5 text-sm bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition">
        <MessageCircle size={16} />
        Chat
      </button>

    </div>
  );
}