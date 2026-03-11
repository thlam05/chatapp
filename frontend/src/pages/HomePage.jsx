export default function HomePage() {
  return (
    <main className="p-6 flex-1 overflow-auto bg-[#f6f7fb]">

      <h1 className="text-2xl font-semibold mb-6">
        Dashboard
      </h1>

      <div className="grid grid-cols-3 gap-6">

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <p className="text-gray-500 text-sm">Total Messages</p>
          <div className="text-2xl font-bold mt-2">124</div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <p className="text-gray-500 text-sm">Friends</p>
          <div className="text-2xl font-bold mt-2">18</div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <p className="text-gray-500 text-sm">Active Chats</p>
          <div className="text-2xl font-bold mt-2">5</div>
        </div>

      </div>

    </main>
  );
}