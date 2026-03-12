import { Send, Plus, MoreVertical } from "lucide-react";
import ChatItem from "../components/ChatItem";
import Message from "../components/Message";

export default function ChatPage() {
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

          <ChatItem
            avatar="https://i.pravatar.cc/40?img=1"
            name="Alice"
            message="Hey, are you free tonight?"
            active
          />
          <ChatItem avatar="https://i.pravatar.cc/40?img=1" name="Bob" message="See you later" />
          <ChatItem avatar="https://i.pravatar.cc/40?img=1" name="Charlie" message="Let's meet tomorrow" />

        </div>

      </div>


      {/* Chat Window */}
      <div className="flex-1 flex flex-col bg-white border-r border-t border-b  border-gray-200">

        {/* Chat header */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-gray-200 bg-white">

          <div className="flex items-center gap-3">

            <img
              src="https://i.pravatar.cc/40?img=1"
              className="w-9 h-9 rounded-full"
            />

            <span className="font-medium">
              Alice
            </span>

          </div>

          <button className="p-2 rounded-lg hover:bg-gray-100">
            <MoreVertical size={18} />
          </button>

        </div>

        {/* Messages */}
        <div className="flex-1 p-6 overflow-auto space-y-4">

          <Message text="Hello!" />

          <Message text="How are you?" />

          <Message text="I'm good thanks!" mine />

        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-200 bg-white">

          <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2">

            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 outline-none text-sm"
            />

            <button className="p-2 rounded-lg hover:bg-gray-100">
              <Send size={18} />
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}