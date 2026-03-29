import { Plus } from "lucide-react";
import ChatItem from "../components/ChatItem";
import AddMemberModal from "../components/modals/AddMemberModal";
import ConfirmModal from "../components/modals/ConfirmModal";
import AddChatModal from "../components/modals/AddChatModal";
import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";
import * as ChatService from "../services/ChatService";
import { Outlet, useNavigate, useParams } from "react-router-dom";

export default function ChatPage() {
  const { user, isAuthenticated, token } = useAuth();
  const navigate = useNavigate();
  const { id: routeChatId } = useParams();

  const [listChats, setListChats] = useState([]);
  const [chatActive, setChatActive] = useState(null);
  const [isOpenCreateChatModal, setIsOpenCreateChatModal] = useState(false);

  useEffect(() => {
    if (!isAuthenticated || !user?.id) return;

    const fetchChats = async () => {
      try {
        const list = await ChatService.getListChatByUser({ userId: user.id, token });
        setListChats(list || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchChats();
  }, [user, isAuthenticated, token]);

  useEffect(() => {
    if (!routeChatId || !listChats.length) return;

    const selected = listChats.find((chat) => String(chat.id) === String(routeChatId));
    if (selected) {
      setChatActive(selected);
      return;
    }

    const loadConversation = async () => {
      try {
        const conversation = await ChatService.getConversationById({ conversationId: routeChatId, token });
        if (conversation) {
          setChatActive(conversation);
        }
      } catch (err) {
        console.error(err);
      }
    };

    loadConversation();
  }, [routeChatId, listChats, token]);

  const handleSendMessage = async (content) => {
    if (!chatActive) return;

    const message = await ChatService.sendMessage({ content, conversationId: chatActive.id, userId: user.id, token });

    setChatActive((prev) => ({ ...prev, messages: [...(prev?.messages || []), message] }));
    setListChats((prev) =>
      prev.map((item) =>
        item.id === chatActive.id
          ? { ...item, latestMessage: message, messages: [...(item.messages || []), message] }
          : item
      )
    );
  };

  async function handleAddMember(member) {
    if (!chatActive) return;

    try {
      await ChatService.addMemberToChat({ conversationId: chatActive.id, userId: member.id, token });
      setIsModalAddMemberOpen(false);
    } catch (error) {
      console.error("Error adding member:", error);
    }
  }

  async function handleDeleteChat() {
    if (!chatActive) return;

    await ChatService.deleteChat({ conversationId: chatActive.id, token });

    setListChats((prev) => prev.filter((chat) => chat.id !== chatActive.id));
    setChatActive(null);
    navigate("/chat");
  }

  async function handleCreateChat({ name }) {
    const chat = await ChatService.createChat({ name, token });

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
    setChatActive(chat);
    console.log(chat);
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