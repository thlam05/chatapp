import { UserPlus, Search, MessageCircle, Trash2, Ban, Check } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import FriendItem from "../components/FriendItem";
import AddFriendModal from "../components/modals/AddFriendModal";
import * as FriendService from "../services/FriendService";
import * as ChatService from "../services/ChatService";

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


  const navigate = useNavigate();

  const [statusFilter, setStatusFilter] = useState(STATUS.ALL);
  const [listRelationships, setListRelationships] = useState([]);
  const [listFriends, setListFriends] = useState([]);
  const [isOpenAddFriendModal, setIsAddFriendModal] = useState(false);

  useEffect(() => {
    if (!isAuthenticated || !user?.id) return;

    const fetchFriends = async () => {
      try {
        const relationships = await FriendService.getListFriendByUserId({ userId: user.id, token });
        console.log(relationships);
        setListRelationships(relationships || []);
        const friends = relationships.map(relationship => {
          return {
            user: user.id == relationship.user.id ? relationship.friend : relationship.user,
            status: relationship.status,
            createdAt: relationship.createdAt,
            updatedAt: relationship.updatedAt
          }
        })
        setListFriends(friends || [])
      } catch (error) {
        console.error("Error fetching friends:", error);
      }
    };

    fetchFriends();
  }, [user, token, isAuthenticated]);

  useEffect(() => {
    const allFriends = listRelationships.map(relationship => {
      return {
        user: user.id == relationship.user.id ? relationship.friend : relationship.user,
        status: relationship.status,
        createdAt: relationship.createdAt,
        updatedAt: relationship.updatedAt
      }
    })
    if (statusFilter === STATUS.ALL) {
      setListFriends(allFriends);
    } else if (statusFilter === STATUS.PENDING) {
      setListFriends(listRelationships.filter(relationship => {
        return relationship.status == statusFilter && relationship.friend.id === user.id
      }).map(relationship => {
        return {
          user: relationship.user,
          status: relationship.status,
          createdAt: relationship.createdAt,
          updatedAt: relationship.updatedAt
        }
      }))
    } else {
      setListFriends(allFriends.filter(friend => friend.status === statusFilter));
    }
  }, [statusFilter, listRelationships]);

  async function handleAddFriend(friend) {
    try {
      const addedFriend = await FriendService.addFriend({
        userId: user.id,
        friendId: friend.id,
        token
      });

      setListRelationships(prev => [...prev, addedFriend]);
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

  async function handleChat(friend) {
    const chat = await ChatService.accessChat({ friend, token });

    navigate(`/chat/${chat.id}`);
  }

  async function handleDeleteFriend(friend) {
    try {
      await FriendService.deleteFriend({ userId: user.id, friendId: friend.user.id, token });
      setListRelationships(prev => prev.filter(uf => {
        return (uf.user.id !== user.id || uf.friend.id !== friend.user.id) && (uf.friend.id !== user.id || uf.user.id !== friend.user.id);
      }));
    } catch (error) {
      console.log(error);
    }
  }

  async function handleAcceptFriend(friend) {
    try {
      await FriendService.updateFriend({ userId: user.id, friendId: friend.user.id, status: "ACCEPTED", token });

      setListRelationships(prev => prev.map(item => {
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

      setListRelationships(prev => prev.map(item => {
        if ((item.user.id === user.id && item.friend.id === friend.user.id)
          || (item.friend.id === user.id && item.user.id === friend.user.id)) {
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

      setListRelationships(prev => prev.map(item => {
        if ((item.user.id === user.id && item.friend.id === friend.user.id)
          || (item.friend.id === user.id && item.user.id === friend.user.id)) {
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