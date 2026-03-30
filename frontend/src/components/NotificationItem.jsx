import { CheckCircle, AlertCircle, Info, AlertTriangle, Bell } from "lucide-react";

export default function NotificationItem({ notification, onRead, onClick }) {
  const { id, title, content, type, read, createdAt } = notification;

  const typeConfig = {
    SUCCESS: { icon: CheckCircle, color: "text-green-500", bg: "bg-green-100" },
    ERROR: { icon: AlertCircle, color: "text-red-500", bg: "bg-red-100" },
    WARNING: { icon: AlertTriangle, color: "text-amber-500", bg: "bg-amber-100" },
    INFO: { icon: Info, color: "text-blue-500", bg: "bg-blue-100" },
    DEFAULT: { icon: Bell, color: "text-gray-500", bg: "bg-gray-100" }
  };

  const config = typeConfig[type] || typeConfig.DEFAULT;
  const Icon = config.icon;

  return (
    <div
      onClick={() => onClick && onClick(notification)}
      className={`relative flex items-start gap-4 p-4 border-b border-gray-100 cursor-pointer transition-colors duration-200 hover:bg-gray-50 ${!read ? 'bg-blue-50/40' : 'bg-white'}`}
    >
      <div className={`shrink-0 w-12 h-12 rounded-full flex items-center justify-center shadow-sm ${config.bg}`}>
        <Icon size={24} className={config.color} />
      </div>

      <div className="flex-1 min-w-0 pr-6">
        <h4 className={`text-sm font-semibold truncate ${!read ? 'text-gray-900' : 'text-gray-700'}`}>
          {title}
        </h4>
        <p className="text-sm text-gray-600 mt-1 line-clamp-2 leading-relaxed">
          {content}
        </p>
        <span className="text-xs text-gray-400 mt-2 block font-medium">
          {createdAt}
        </span>
      </div>

      {!read && (
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2">
          <div className="w-2.5 h-2.5 bg-blue-600 rounded-full shadow-sm"></div>

          {onRead && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRead(id);
              }}
              className="flex items-center gap-1 px-3 py-1.5 text-sm bg-black text-white rounded-lg hover:bg-gray-800 transition cursor-pointer"
            >
              Mark read
            </button>
          )}
        </div>
      )}
    </div>
  );
}