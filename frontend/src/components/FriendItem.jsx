export default function FriendItem({ userFriend, actionButtons }) {
  return (
    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl bg-white hover:bg-gray-50 transition">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full text-white flex items-center justify-center font-semibold bg-gray-500">
          {userFriend.user.username.charAt(0).toUpperCase()}
        </div>

        <div>
          <div className="font-medium text-gray-800">{userFriend.user.username}</div>
          <div className="text-xs text-gray-500">{userFriend.status}</div>
        </div>
      </div>

      {/* Khu vực chứa các nút hành động được truyền từ Component cha */}
      <div className="flex items-center gap-2">
        {actionButtons}
      </div>
    </div>
  );
}