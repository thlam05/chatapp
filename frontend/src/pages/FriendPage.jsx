import { UserPlus, Search } from "lucide-react";
import FriendItem from '../components/FriendItem';
import * as FriendService from "../services/FriendService";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import AddFriendModal from "../components/modals/AddFriendModal";

export default function FriendPage() {
  const { user, token, isAuthenticated } = useAuth();
  const [listFriends, setListFriends] = useState([]);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [allFriends, setAllFriends] = useState([]);
  const [isOpenAddFriendModel, setIsAddFriendModal] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) return;

    try {
      const fetchFriend = async () => {
        const list = await FriendService.getListFriendByUserId({ userId: user.id, token });
        setAllFriends(list);
        setListFriends(list);
      }
      fetchFriend();
    } catch (err) {
      console.log(err);
    }
  }, [user, token, isAuthenticated]);

  useEffect(() => {
    if (statusFilter == "ALL") setListFriends(allFriends);
    else {
      setListFriends(allFriends.filter(friend => {
        return friend.status == statusFilter;
      }))
    }

  }, [statusFilter])

  const getClass = (value) =>
    `px-3 py-1 rounded-md transition ${statusFilter === value
      ? "bg-gray-100 text-black"
      : "hover:bg-gray-100"
    }`;


  async function handleAddFriend(_friend) {
    const userFriend = await FriendService.addFriend({ userId: user.id, friendId: _friend.id, token });

    userFriend.user = userFriend.friend;

    const { friend, ...data } = userFriend;

    setListFriends((prev) => {
      return [...prev, data]
    })

    setIsAddFriendModal(false);
  }
  return (
    <div className="h-full bg-[#f6f7fb] flex justify-center">

      <div className="w-full bg-white border border-gray-200 flex flex-col">

        {/* Header */}
        <div className="h-16 flex items-center px-6 border-b border-gray-200">

          <h2 className="font-semibold text-gray-800">
            Friends
          </h2>

        </div>


        {/* Tabs */}
        <div className="flex items-center gap-4 px-6 h-12 border-b border-gray-200 text-sm">

          <button className={getClass("ONLINE")} onClick={() => setStatusFilter("ONLINE")}>
            Online
          </button>

          <button className={getClass("ALL")} onClick={() => setStatusFilter("ALL")}>
            All
          </button>

          <button className={getClass("PENDING")} onClick={() => setStatusFilter("PENDING")}>
            Pending
          </button>

          <button className={getClass("BLOCKED")} onClick={() => setStatusFilter("BLOCKED")}>
            Blocked
          </button>

          <button
            className="ml-auto flex items-center gap-2 px-4 py-2 text-sm text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition"
            onClick={() => { setIsAddFriendModal(true) }}>
            <UserPlus size={16} />
            Add Friend
          </button>

        </div>


        {/* Search */}
        <div className="p-4 border-b border-gray-200">

          <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2">

            <Search size={18} className="text-gray-500" />

            <input
              type="text"
              placeholder="Search friends"
              className="ml-2 outline-none w-full text-sm"
            />

          </div>

        </div>


        {/* Friend List */}
        <div className="flex-1 overflow-auto p-3 space-y-2">

          {listFriends && listFriends.map(friend => {
            return (
              <FriendItem
                key={friend.user.id}
                name={friend.user.username}
                status="Online"
              />
            )
          })}

        </div>

      </div>


      <AddFriendModal
        isOpen={isOpenAddFriendModel}
        onClose={() => setIsAddFriendModal(false)}
        onAddFriend={(user) => { handleAddFriend(user) }}
        token={token}
      />
    </div>
  );
}