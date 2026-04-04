import Message from "../Message";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import { useOutletContext } from "react-router-dom";

export default function ChatGroupWindow() {
  const { chat, messages, user, onSendMessage, onAddMember, onDeleteChat } = useOutletContext() || {};

  if (!chat) {
    return <div className="flex-1 flex items-center justify-center text-gray-500">Chọn một cuộc trò chuyện</div>;
  }

  return (
    <div className="flex-1 flex flex-col h-full">
      <ChatHeader chat={chat} onAddMember={onAddMember} onDeleteChat={onDeleteChat} />

      <div className="flex-1 overflow-y-auto p-6 space-y-4 min-h-0">
        {messages?.map((msg) => (
          <div key={msg.id}>
            {msg.user.id !== user.id && (
              <span className="text-xs text-gray-400 ml-1">{msg.user.username}</span>
            )}
            <Message text={msg.content} mine={msg.user.id === user.id} />
          </div>
        ))}
      </div>

      <ChatInput onSend={onSendMessage} />
    </div>
  );
}