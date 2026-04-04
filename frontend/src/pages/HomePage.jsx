import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import * as UserApi from "../api/UserApi";

export default function HomePage() {
  const { user, isAuthenticated, token } = useAuth();

  const [totalMessages, setTotalMessages] = useState(0);
  const [totalFriends, setTotalFriends] = useState(0);
  const [totalChats, setTotalChats] = useState(0);

  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchData = async () => {
      const [messages, friends, chats] = await Promise.all([
        UserApi.getTotalMessages(user.id, token),
        UserApi.getTotalFriends(user.id, token),
        UserApi.getTotalChats(user.id, token),
      ]);

      setTotalMessages(messages);
      setTotalFriends(friends);
      setTotalChats(chats);
    };

    fetchData();
  }, [isAuthenticated, user, token]);

  return (
    <main className="p-6 flex-1 overflow-auto bg-[#f6f7fb]">

      <h1 className="text-2xl font-semibold mb-6">
        Dashboard
      </h1>

      <div className="grid grid-cols-3 gap-6">

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <p className="text-gray-500 text-sm">Total Messages</p>
          <div className="text-2xl font-bold mt-2">{totalMessages}</div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <p className="text-gray-500 text-sm">Friends</p>
          <div className="text-2xl font-bold mt-2">{totalFriends}</div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <p className="text-gray-500 text-sm">Active Chats</p>
          <div className="text-2xl font-bold mt-2">{totalChats}</div>
        </div>

      </div>

    </main>
  );
}