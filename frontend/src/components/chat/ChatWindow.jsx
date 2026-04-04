import Message from "../Message";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import { useOutletContext } from "react-router-dom";

export default function ChatWindow() {
  const { chat, messages, user, onSendMessage, onAddMember, onDeleteChat } = useOutletContext() || {};

  if (!chat) {
    return <div className="flex-1 flex items-center justify-center text-gray-500">Chọn một cuộc trò chuyện</div>;
  }

  return (
    <div className="flex-1 flex flex-col h-full">
      <ChatHeader chat={chat} onAddMember={onAddMember} onDeleteChat={onDeleteChat} />

      <div className="flex-1 overflow-y-auto p-6 space-y-4 min-h-0">
        {messages?.map((msg) => (
          <Message key={msg.id} text={msg.content} mine={msg.user.id === user.id} />
        ))}
      </div>

      <ChatInput onSend={onSendMessage} />
    </div>
  );
}