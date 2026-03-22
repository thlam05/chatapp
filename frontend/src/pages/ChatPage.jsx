import { Send, Plus, MoreVertical, UserPlus } from "lucide-react";
import ChatItem from "../components/ChatItem";
import Message from "../components/Message";
import AddMemberModal from "../components/AddMemberModal";
import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";
import * as ChatService from "../services/ChatService";

export default function ChatPage() {
  const { user, isAuthenticated, token } = useAuth();

  const [listChats, setListChats] = useState([]);
  const [chatActive, setChatActive] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalAddMemberOpen, setIsModalAddMemberOpen] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchChats = async () => {
      try {
        const list = await ChatService.getListChatByUser({ userId: user.id, token });
        console.log(list)
        setListChats(list);
      } catch (err) {
        console.error(err);
      }
    };

    fetchChats();
  }, [user, isAuthenticated, token]);


  async function handleSubmitSendMessage(e) {
    e.preventDefault();

    const form = new FormData(e.target);

    const content = form.get("content");

    const message = await ChatService.sendMessage({ content, conversationId: chatActive.id, userId: user.id, token });

    setChatActive(prev => ({
      ...prev,
      messages: [...prev.messages, message]
    }));
  }

  async function handleAddMember(user) {
    try {
      await ChatService.addMemberToChat({ conversationId: chatActive.id, userId: user.id, token });
      setIsModalAddMemberOpen(false);
      // Optionally, refresh the chat or show a success message
    } catch (error) {
      console.error("Error adding member:", error);
    }
  }

  return (
    <div className="h-full bg-[#f6f7fb] flex justify-center">

      {/* Conversation List */}
      <div className="w-80 bg-white bg-white border border-gray-200 flex flex-col">

        <div className="h-16 flex items-center justify-between px-6 border-b border-gray-200 bg-white">

          <h2 className="font-semibold text-gray-800">
            Conversations
          </h2>

          <button className="flex items-center gap-1 px-3 py-1.5 text-sm bg-black text-white rounded-lg hover:bg-gray-800 transition">
            <Plus size={16} className="text-white" />
            Create
          </button>

        </div>

        <div className="flex-1 overflow-auto p-3 space-y-2">
          {listChats && listChats.map(chat => {
            return (
              <ChatItem
                key={chat.id}
                name={chat.name}
                message={chat.latestMessage}
                active={chatActive?.id == chat.id}
                onClick={() => { setChatActive(chat) }}
              />
            )
          })}

        </div>

      </div>


      {/* Chat Window */}
      <div className="flex-1 flex flex-col bg-white border-r border-t border-b  border-gray-200">

        {/* Chat header */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-gray-200 bg-white">



          {chatActive && (
            <>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full text-white flex items-center justify-center font-semibold bg-gray-500`}>
                  {chatActive.name?.charAt(0).toUpperCase()}
                </div>

                <span className="font-medium">
                  {chatActive.name}
                </span>
              </div>

              <div className="relative inline-block text-left">
                <button
                  className="p-2 rounded-lg hover:bg-gray-100"
                  onClick={() => setIsMenuOpen(prev => !prev)}
                >
                  <MoreVertical size={18} />
                </button>

                {isMenuOpen && (
                  <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200">
                    <ul className="py-2 text-sm text-gray-700">
                      {chatActive.group && (
                        <li className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors duration-200"
                          onClick={() => setIsModalAddMemberOpen(true)}>
                          <UserPlus className="h-5 w-5 text-gray-500" />
                          <span className="text-gray-800 font-medium">Add Member</span>
                        </li>
                      )}
                    </ul>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        <div className="flex-1 p-6 overflow-auto space-y-4">
          {chatActive && chatActive.messages.map((message) => {
            return (
              (message.user.id === user.id)
                ? <Message key={message.id} text={message.content} mine />
                : <Message key={message.id} text={message.content} />
            );
          })}

        </div>

        <div className="p-4 border-t border-gray-200 bg-white">

          <form
            className="flex items-center border border-gray-200 rounded-lg px-3 py-2"
            onSubmit={handleSubmitSendMessage}>

            <input
              type="text"
              name="content"
              placeholder="Type a message..."
              className="flex-1 outline-none text-sm"
            />

            <button className="p-2 rounded-lg hover:bg-gray-100">
              <Send size={18} />
            </button>

          </form>
        </div>
      </div>

      <AddMemberModal
        isOpen={isModalAddMemberOpen}
        onClose={() => setIsModalAddMemberOpen(false)}
        onAddMember={handleAddMember}
        token={token}
        userId={user.id}
      />
    </div>
  );
}