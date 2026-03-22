export default function ChatItem({ name, message, active, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition
      ${active
          ? "bg-purple-50 border-purple-300"
          : "border-gray-200 hover:bg-gray-50"}
      `}
    >
      <div className={`w-10 h-10 rounded-full text-white flex items-center justify-center font-semibold
        ${active ? "bg-purple-500" : " bg-gray-500"
        }
        `}>
        {name?.charAt(0).toUpperCase()}
      </div>

      {/* Text */}
      <div className="flex-1 overflow-hidden">
        <div className="font-medium text-sm text-gray-800">
          {name}
        </div>

        <div className="text-xs text-gray-500 truncate">
          {message.content}
        </div>
      </div>
    </div>
  );
}