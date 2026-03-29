import { UserPlus, Search, MessageCircle, Trash2, Ban, Check } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import FriendItem from "../components/FriendItem";
import AddFriendModal from "../components/modals/AddFriendModal";
import * as FriendService from "../services/FriendService";

const STATUS = {
  ONLINE: "ONLINE",
  ALL: "ALL",
  PENDING: "PENDING",
  BLOCKED: "BLOCKED"
}

const ActionButton = ({ onClick, icon: Icon, label, colorClass }) => (
  <button
    className={`flex items-center gap-1 px-3 py-1.5 text-sm text-white rounded-lg transition ${colorClass}`}
    onClick={onClick}
  >
    <Icon size={16} />
    {label}
  </button>
);

export default function FriendPage() {
  const { user, token, isAuthenticated } = useAuth();

  const [statusFilter, setStatusFilter] = useState(STATUS.ALL);
  const [allFriends, setAllFriends] = useState([]);
  const [listFriends, setListFriends] = useState([]);
  const [isOpenAddFriendModal, setIsAddFriendModal] = useState(false);

  useEffect(() => {
    if (!isAuthenticated || !user?.id) return;

    const fetchFriends = async () => {
      try {
        const friends = await FriendService.getListFriendByUserId({ userId: user.id, token });
        console.log(friends);
        setAllFriends(friends || []);
        setListFriends(friends || []);
      } catch (error) {
        console.error("Error fetching friends:", error);
      }
    };

    fetchFriends();
  }, [user, token, isAuthenticated]);

  useEffect(() => {
    if (statusFilter === STATUS.ALL) {
      setListFriends(allFriends);
    } else {
      setListFriends(allFriends.filter(friend => friend.status === statusFilter));
    }
  }, [statusFilter, allFriends]);

  async function handleAddFriend(friend) {
    try {
      const addedFriend = await FriendService.addFriend({
        userId: user.id,
        friendId: friend.id,
        token
      });

      const normalizedFriend = {
        ...addedFriend,
        user: addedFriend.friend || friend
      };

      setAllFriends(prev => [...prev, normalizedFriend]);
      setIsAddFriendModal(false);

    } catch (error) {
      console.error(error);
    }
  }

  const renderActionButtons = (friend) => {
    switch (statusFilter) {
      case STATUS.ALL:
      case STATUS.ONLINE:
        return (
          <>
            <ActionButton onClick={() => handleChat(friend)} icon={MessageCircle} label="Chat" colorClass="bg-gray-300 hover:bg-gray-800" />
            <ActionButton onClick={() => handleDeleteFriend(friend)} icon={Trash2} label="Delete" colorClass="bg-red-200 hover:bg-red-500" />
            <ActionButton onClick={() => handleBlockFriend(friend)} icon={Ban} label="Block" colorClass="bg-yellow-200 hover:bg-yellow-400" />
          </>
        );
      case STATUS.PENDING:
        return (
          <>
            <ActionButton onClick={() => handleChat(friend)} icon={MessageCircle} label="Chat" colorClass="bg-gray-300 hover:bg-gray-800" />
            <ActionButton onClick={() => handleAcceptFriend(friend)} icon={Check} label="Accept" colorClass="bg-green-200 hover:bg-green-400" />
            <ActionButton onClick={() => handleDeleteFriend(friend)} icon={Trash2} label="Delete" colorClass="bg-red-200 hover:bg-red-500" />
          </>
        );
      case STATUS.BLOCKED:
        return (
          <>
            <ActionButton onClick={() => handleUnblockFriend(friend)} icon={Check} label="Unblock" colorClass="bg-blue-200 hover:bg-blue-400" />
            <ActionButton onClick={() => handleDeleteFriend(friend)} icon={Trash2} label="Delete" colorClass="bg-red-200 hover:bg-red-500" />
          </>
        );
      default:
        return null;
    }
  };

  function handleChat(friend) {

  }

  async function handleDeleteFriend(friend) {
    try {
      await FriendService.deleteFriend({ userId: user.id, friendId: friend.user.id, token });
      setAllFriends(prev => prev.filter(uf => uf.user.id != friend.user.id));
    } catch (error) {
      console.log(error);
    }
  }

  async function handleAcceptFriend(friend) {
    try {
      await FriendService.updateFriend({ userId: user.id, friendId: friend.user.id, status: "ACCEPTED", token });

      setAllFriends(prev => prev.map(item => {
        if (item.user.id === friend.user.id) {
          item.status = "ACCEPTED"
        }
        return item;
      }))
    }
    catch (error) {
      console.log(error);
    }
  }

  async function handleBlockFriend(friend) {
    try {
      await FriendService.updateFriend({ userId: user.id, friendId: friend.user.id, status: "BLOCKED", token });

      setAllFriends(prev => prev.map(item => {
        if (item.user.id === friend.user.id) {
          item.status = "BLOCKED"
        }
        return item;
      }))
    }
    catch (error) {
      console.log(error);
    }
  }

  async function handleUnblockFriend(friend) {
    try {
      await FriendService.updateFriend({ userId: user.id, friendId: friend.user.id, status: "ACCEPTED", token });

      setAllFriends(prev => prev.map(item => {
        if (item.user.id === friend.user.id) {
          item.status = "ACCEPTED"
        }
        return item;
      }))
    }
    catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="h-full bg-[#f6f7fb] flex justify-center">
      <div className="w-full bg-white border border-gray-200 flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <h2 className="font-semibold text-gray-800">Friends</h2>
        </div>

        <div className="flex items-center gap-4 px-6 h-12 border-b border-gray-200 text-sm">
          <button className={`px-3 py-1 rounded-md transition
            ${statusFilter === STATUS.ONLINE ? "bg-black text-white" : "bg-gray-100 text-black"}`}
            onClick={() => setStatusFilter(STATUS.ONLINE)}>
            Online
          </button>

          <button className={`px-3 py-1 rounded-md transition
            ${statusFilter === STATUS.ALL ? "bg-black text-white" : "bg-gray-100 text-black"}`}
            onClick={() => setStatusFilter(STATUS.ALL)}>
            All
          </button>

          <button className={`px-3 py-1 rounded-md transition
            ${statusFilter === STATUS.PENDING ? "bg-black text-white" : "bg-gray-100 text-black"}`}
            onClick={() => setStatusFilter(STATUS.PENDING)}>
            Pending
          </button>

          <button className={`px-3 py-1 rounded-md transition
            ${statusFilter === STATUS.BLOCKED ? "bg-black text-white" : "bg-gray-100 text-black"}`}
            onClick={() => setStatusFilter(STATUS.BLOCKED)}>
            Blocked
          </button>

          <button
            className="ml-auto flex items-center gap-2 px-4 py-2 text-sm text-white bg-black rounded-lg hover:bg-gray-800 transition"
            onClick={() => setIsAddFriendModal(true)}
          >
            <UserPlus size={16} />
            Add Friend
          </button>
        </div>

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

        <div className="flex-1 overflow-auto p-3 space-y-2">
          {listFriends.map((friend => {
            return (<FriendItem key={friend.user.id} userFriend={friend} actionButtons={renderActionButtons(friend)} />)
          }))}
        </div>
      </div>
      <AddFriendModal
        isOpen={isOpenAddFriendModal}
        onClose={() => setIsAddFriendModal(false)}
        onAddFriend={handleAddFriend}
        token={token}
      />
    </div>
  );
}