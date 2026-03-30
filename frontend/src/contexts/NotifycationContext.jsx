import React, { createContext, useContext, useState, useCallback } from "react";
import { CheckCircle, AlertCircle, Info, X } from "lucide-react";

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);

  const notify = useCallback((type, message) => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, type, message }]);

    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 3000);
  }, []);

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
        {notifications.map(({ id, type, message }) => {
          const style = styles[type] || styles.info;

          return (
            <div
              key={id}
              className={`flex items-center gap-3 p-4 min-w-[300px] max-w-sm rounded-xl border shadow-lg transition-all duration-300 animate-in slide-in-from-right-8 fade-in ${style.bg} ${style.border}`}
            >
              {style.icon}
              <p className={`flex-1 text-sm font-medium ${style.text}`}>
                {message}
              </p>
              <button
                onClick={() => closeNotify(id)}
                className="p-1 rounded-md hover:bg-black/5 transition-colors"
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