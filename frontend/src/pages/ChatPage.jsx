import { Plus } from "lucide-react";
import ChatItem from "../components/ChatItem";
import AddChatModal from "../components/modals/AddChatModal";
import { useAuth } from "../contexts/AuthContext";
import { useSocket } from "../contexts/SocketContext";
import { useEffect, useState } from "react";
import * as ChatApi from "../api/ChatApi";
import { Outlet, useNavigate, useParams } from "react-router-dom";

export default function ChatPage() {
  const { client } = useSocket();
  const { user, isAuthenticated, token } = useAuth();
  const navigate = useNavigate();
  const { id: routeChatId } = useParams();

  const [listChats, setListChats] = useState([]);
  const [listMessages, setListMessages] = useState([]);
  const [chatActive, setChatActive] = useState(null);
  const [isOpenCreateChatModal, setIsOpenCreateChatModal] = useState(false);

  // Get list chat in side bar
  useEffect(() => {
    if (!isAuthenticated || !user?.id) return;

    const fetchChats = async () => {
      try {
        const list = await ChatApi.getListChatByUser({ userId: user.id, token });

        list.map(chat => {
          if (chat.group == false) {
            const friend = chat.members.find(member => member.user.id != user.id);
            chat.name = friend.user.username;
          }
          return chat;
        })

        setListChats(list || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchChats();
  }, [user, isAuthenticated, token]);

  // Get chat active from friend
  useEffect(() => {
    if (!routeChatId || !listChats.length) {
      setChatActive(null);
      return;
    }

    loadConversation(String(routeChatId));
  }, [routeChatId, listChats, token]);


  useEffect(() => {
    if (client == null || chatActive == null) return;

    const subscription = client.subscribe(`/topic/chat/${chatActive.id}`, (message) => {
      const m = JSON.parse(message.body);

      setListMessages((prev) => [...prev, m]);
      setListChats((prev) =>
        prev.map((item) =>
          item.id === chatActive.id
            ? { ...item, latestMessage: m }
            : item
        )
      );
    })

    console.log(`subscribe /chat/${chatActive.id}`)

    const loadListMessages = async (chatId) => {
      const messages = await ChatApi.getListMessageByChat({ chatId, token });

      setListMessages(messages || []);
    }

    loadListMessages(chatActive.id);
    return () => {
      if (subscription) {
        subscription.unsubscribe();
        console.log("Cleanup thành công");
      }
    };
  }, [chatActive]);

  const loadConversation = async (chatId) => {
    const chat = await ChatApi.getConversationById({ conversationId: chatId, token });
    if (chat.group == false) {
      const friend = chat.members.find(member => member.user.id != user.id);
      chat.name = friend.user.username;
    }
    setChatActive(chat);
  }

  const handleSendMessage = async (content) => {
    if (!chatActive) return;

    const message = await ChatApi.sendMessage({ content, conversationId: chatActive.id, userId: user.id, token });
  };

  async function handleAddMember(member) {
    if (!chatActive) return;

    try {
      await ChatApi.addMemberToChat({ conversationId: chatActive.id, userId: member.id, token });
      setIsModalAddMemberOpen(false);
    } catch (error) {
      console.error("Error adding member:", error);
    }
  }

  async function handleDeleteChat() {
    if (!chatActive) return;

    await ChatApi.deleteChat({ conversationId: chatActive.id, token });

    setListChats((prev) => prev.filter((chat) => chat.id !== chatActive.id));
    setChatActive(null);
    navigate("/chat");
  }

  async function handleCreateChat({ name }) {
    const chat = await ChatApi.createChat({ name, token });

    if (!chat) return;

    setChatActive(chat);
    setListChats((prev) => [...prev, chat]);

    if (chat.group) {
      navigate(`/chat/group/${chat.id}`);
    } else {
      navigate(`/chat/${chat.id}`);
    }
  }

  const handleChatSelect = (chat) => {
    loadConversation(chat.id);

    if (chat.group) {
      navigate(`/chat/group/${chat.id}`);
    } else {
      navigate(`/chat/${chat.id}`);
    }
  };

  return (
    <div className="h-full bg-[#f6f7fb] flex justify-center">
      <div className="w-80 bg-white border border-gray-200 flex flex-col">
        <div className="h-16 flex items-center justify-between px-6 border-b border-gray-200 bg-white">
          <h2 className="font-semibold text-gray-800">Conversations</h2>
          <button
            className="flex items-center gap-1 px-3 py-1.5 text-sm bg-black text-white rounded-lg hover:bg-gray-800 transition"
            onClick={() => setIsOpenCreateChatModal(true)}
          >
            <Plus size={16} className="text-white" />
            Create
          </button>
        </div>

        <div className="flex-1 overflow-auto p-3 space-y-2">
          {listChats.map((chat) => (
            <ChatItem
              key={chat.id}
              name={chat.name}
              message={chat.latestMessage}
              active={chatActive?.id === chat.id}
              onClick={() => handleChatSelect(chat)}
            />
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col bg-white border-r border-t border-b border-gray-200">

        <Outlet
          context={{
            chat: chatActive,
            messages: listMessages,
            user,
            onSendMessage: handleSendMessage,
            onAddMember: handleAddMember,
            onDeleteChat: handleDeleteChat,
          }}
        />
      </div>

      <AddChatModal
        open={isOpenCreateChatModal}
        onClose={() => setIsOpenCreateChatModal(false)}
        onCreate={handleCreateChat}
      />
    </div>
  );
}