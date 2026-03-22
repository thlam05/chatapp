import { useEffect, useState } from "react";
import { UserPlus, X } from "lucide-react";
import * as UserService from "../services/UserService";
import FriendItem from "./FriendItem";

export default function AddMemberModal({ isOpen, onClose, onAddMember, token }) {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isOpen) {
            fetchUsers();
        }
    }, [isOpen]);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const userList = await UserService.getFriendsOfUser(token);
            setUsers(userList);
        } catch (error) {
            console.error("Error fetching users:", error);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/10 flex items-center justify-center z-50">
            {/* Modal container */}
            <div className="bg-white rounded-xl p-6 w-120 max-h-[80vh] flex flex-col overflow-hidden shadow-md">

                {/* Header */}
                <div className="flex justify-between items-center mb-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">Add Member</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-900 hover:bg-gray-100 rounded-lg p-2 transition-colors"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Users list */}
                <div className="flex-1 overflow-auto p-3 space-y-2">
                    {loading ? (
                        <p className="text-gray-500 text-center py-4">Loading users...</p>
                    ) : users.length === 0 ? (
                        <p className="text-gray-400 text-center py-4">No users found</p>
                    ) : (
                        <ul className="space-y-1">
                            {users.map((user) => (
                                <div key={user.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl bg-white hover:bg-gray-50 transition">

                                    <div className="flex items-center gap-3">
                                        <div className={`w-10 h-10 rounded-full text-white flex items-center justify-center font-semibold bg-gray-500`}>
                                            {user.username?.charAt(0).toUpperCase()}
                                        </div>

                                        <div>
                                            <div className="font-medium text-gray-800">{user.username}</div>
                                            <div className="text-xs text-gray-500">{"Online"}</div>
                                        </div>
                                    </div>

                                    <button className="flex items-center gap-1 px-3 py-1.5 text-sm bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition">
                                        <UserPlus size={16} />
                                        Add
                                    </button>

                                </div>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Close button */}
                <button
                    className="mt-4 px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
        </div>
    );
}