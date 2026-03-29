import Message from "../Message";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import { useOutletContext } from "react-router-dom";

export default function ChatWindow() {
  const { chat, user, onSendMessage, onAddMember, onDeleteChat } = useOutletContext() || {};

  if (!chat) {
    return <div className="flex-1 flex items-center justify-center text-gray-500">Chọn một cuộc trò chuyện</div>;
  }

  return (
    <div className="flex-1 flex flex-col">
      <ChatHeader chat={chat} onAddMember={onAddMember} onDeleteChat={onDeleteChat} />

      <div className="flex-1 p-6 overflow-auto space-y-4">
        {chat.messages?.map((msg) => (
          <Message key={msg.id} text={msg.content} mine={msg.user.id === user.id} />
        ))}
      </div>

      <ChatInput onSend={onSendMessage} />
    </div>
  );
}