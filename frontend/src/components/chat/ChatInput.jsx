import { Send } from "lucide-react";

export default function ChatInput({ onSend }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const content = new FormData(e.target).get("content");
    if (content?.trim()) {
      onSend(content);
      e.target.reset();
    }
  };

  return (
    <div className="p-4 border-t border-gray-200 bg-white">
      <form className="flex items-center border border-gray-200 rounded-lg px-3 py-2" onSubmit={handleSubmit}>
        <input name="content" type="text" placeholder="Type a message..." className="flex-1 outline-none text-sm" />
        <button type="submit" className="p-2 rounded-lg hover:bg-gray-100"><Send size={18} /></button>
      </form>
    </div>
  );
};