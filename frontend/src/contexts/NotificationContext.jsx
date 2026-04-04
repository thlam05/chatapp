import React, { createContext, useContext, useState, useCallback } from "react";
import { CheckCircle, AlertCircle, Info, X } from "lucide-react";
import { useAuth } from "./AuthContext"; // Import useAuth để lấy user và token
import * as NotificationApi from "../api/NotificationApi"; // Import file service của bạn

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);
  const { user, token } = useAuth();


  const notify = useCallback(async (type, title, content) => {

    const id = Date.now();
    setNotifications((prev) => [...prev, { id, type, title, message: content }]);

    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 3000);


    if (user?.id && token) {
      try {
        const body = {
          title: title,
          content: content,
          type: type.toUpperCase(),
          read: false
        };

        await NotificationApi.createNotification({ body, userId: user.id, token });
      } catch (error) {
        console.error("Lỗi khi lưu thông báo xuống DB:", error);
      }
    }
  }, [user, token]); // Thêm dependencies để useCallback luôn lấy được user/token mới nhất

  const closeNotify = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const styles = {
    success: { bg: "bg-green-50", border: "border-green-200", text: "text-green-800", icon: <CheckCircle className="text-green-500" size={20} /> },
    error: { bg: "bg-red-50", border: "border-red-200", text: "text-red-800", icon: <AlertCircle className="text-red-500" size={20} /> },
    info: { bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-800", icon: <Info className="text-blue-500" size={20} /> },
  };

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}

      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        {notifications.map(({ id, type, title, message }) => {
          const style = styles[type] || styles.info;

          return (
            <div
              key={id}
              className={`flex items-start gap-3 p-4 min-w-[300px] max-w-sm rounded-xl border shadow-lg transition-all duration-300 animate-in slide-in-from-right-8 fade-in ${style.bg} ${style.border}`}
            >
              <div className="shrink-0 mt-0.5">{style.icon}</div>
              <div className="flex-1 min-w-0">
                {/* Thêm phần hiển thị title trên giao diện Toast */}
                {title && <h4 className={`text-sm font-bold ${style.text}`}>{title}</h4>}
                <p className={`text-sm font-medium mt-1 ${style.text}`}>
                  {message}
                </p>
              </div>
              <button
                onClick={() => closeNotify(id)}
                className="p-1 shrink-0 rounded-md hover:bg-black/5 transition-colors"
              >
                <X size={16} className={style.text} />
              </button>
            </div>
          );
        })}
      </div>
    </NotificationContext.Provider>
  );
}