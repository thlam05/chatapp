import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import NotificationItem from "../components/NotificationItem";
import * as NotificationApi from "../api/NotificationApi";

export default function NotificationPage() {
  const { user, token, isAuthenticated } = useAuth();

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotification = async () => {
      try {
        const listNoti = await NotificationApi.getByUser({ userId: user.id, token });
        console.log(listNoti);
        setNotifications(listNoti);
      } catch (error) {
        console.log(error);
      }
    }

    fetchNotification();
  }, [user, token, isAuthenticated]);

  const handleMarkAsRead = async (id) => {
    const body = { read: true };
    await NotificationApi.updateNotification({ body, notificationId: id, token });
    setNotifications(prev =>
      prev.map(notif => notif.id === id ? { ...notif, read: true } : notif)
    );
  };

  const handleNotificationClick = (notification) => {
    console.log("Bạn vừa click vào thông báo:", notification.title);
  };

  return (
    <div className="h-full bg-[#f6f7fb] flex justify-center">
      <div className="w-full bg-white border border-gray-200 flex flex-col">
        <div className="h-16 flex items-center justify-between px-6 border-b border-gray-200 bg-white">
          <h2 className="font-semibold text-gray-800">Notifications</h2>
        </div>

        <div className="divide-y divide-gray-100">
          {notifications.map((notif) => (
            <NotificationItem
              key={notif.id}
              notification={notif}
              onRead={handleMarkAsRead}
              onClick={handleNotificationClick}
            />
          ))}
        </div>
      </div>


    </div>
  );
}