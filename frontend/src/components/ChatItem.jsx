export default function ChatItem({ avatar, name, message, active }) {
  return (
    <div
      className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition
      ${active
          ? "bg-purple-50 border-purple-300"
          : "border-gray-200 hover:bg-gray-50"}
      `}
    >
      {/* Avatar */}
      <img
        src={avatar}
        alt={name}
        className="w-10 h-10 rounded-full object-cover"
      />

      {/* Text */}
      <div className="flex-1 overflow-hidden">
        <div className="font-medium text-sm text-gray-800">
          {name}
        </div>

        <div className="text-xs text-gray-500 truncate">
          {message}
        </div>
      </div>
    </div>
  );
}