export default function Message({ text, mine }) {
  return (
    <div className={`flex ${mine ? "justify-end" : "justify-start"}`}>
      <div
        className={`px-4 py-2 rounded-lg text-sm max-w-xs ${mine
            ? "bg-purple-500 text-white"
            : "bg-white border border-gray-200"
          }`}
      >
        {text}
      </div>
    </div>
  );
}