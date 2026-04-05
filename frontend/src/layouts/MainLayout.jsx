import { Outlet, useNavigation } from "react-router";
import Sidebar from "../components/bars/Sidebar";
import Topbar from "../components/bars/Topbar";
import { useSocket } from "../contexts/SocketContext";
import { useNotification } from "../contexts/NotificationContext";
import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function MainLayout() {
  const navigation = useNavigation();
  const { user } = useAuth();
  const { client } = useSocket();
  const { notify } = useNotification();
  const isNavigating = Boolean(navigation.location);

  useEffect(() => {
    if (!client) return;

    const subscription1 = client.subscribe(`/topic/notifications/${user.id}`, async (message) => {
      const m = JSON.parse(message.body);

      const { type, title, content } = m.notification;

      notify(type, title, content);
    })

    const subscription2 = client.subscribe(`/topic/notifications`, async (message) => {
      const m = JSON.parse(message.body);

      const { type, title, content } = m.notification;

      notify(type, title, content);
    })

    console.log(`subcribe /topic/notifications/${user.id}`)

    return () => {
      if (subscription1) {
        subscription1.unsubscribe();
        console.log("Cleanup thành công");
      }
      if (subscription2) {
        subscription2.unsubscribe();
        console.log("Cleanup thành công");
      }
    };
  }, [client]);

  return (
    <div className="flex h-screen bg-[#f6f7fb]">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Topbar />
        <div className="flex-1 p-6 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}