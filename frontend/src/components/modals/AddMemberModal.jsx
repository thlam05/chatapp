import { useEffect, useState } from "react";
import { UserPlus, X } from "lucide-react";
import * as UserService from "../../services/UserService";
import { useAuth } from "../../contexts/AuthContext";

export default function AddMemberModal({
	isOpen,
	onClose,
	onAddMember,
	token
}) {
	const { user } = useAuth();
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
			const userList = await UserService.getFriendsOfUser({ userId: user.id, token });
			setUsers(userList);
		} catch (error) {
			console.error("Error fetching users:", error);
		} finally {
			setLoading(false);
		}
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
			{/* Modal container */}
			<div className="bg-white rounded-xl p-6 w-96 max-h-[80vh] flex flex-col overflow-hidden shadow-md">

				{/* Header */}
				<div className="flex justify-between items-center mb-4 border-b border-gray-200">
					<h2 className="text-lg font-semibold text-gray-900">Add Member</h2>
					<button
						onClick={onClose}
						className="text-gray-500 hover:bg-gray-100 rounded-lg p-2 transition-colors"
					>
						<X size={18} />
					</button>
				</div>

				{/* Users list */}
				<div className="flex-1 overflow-auto p-1 space-y-2">
					{loading ? (
						<p className="text-gray-500 text-center py-4">Loading users...</p>
					) : users.length === 0 ? (
						<p className="text-gray-400 text-center py-4">No users found</p>
					) : (
						<ul className="space-y-1">
							{users.map((userFriend) => (
								<li
									key={userFriend.user.id}
									className="group flex items-center justify-between p-2 rounded-md hover:bg-gray-50 transition-colors cursor-pointer"
								>
									{/* Avatar + Name + Status */}
									<div className="flex items-center gap-3">
										<div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-medium">
											{userFriend.user.username?.charAt(0).toUpperCase()}
										</div>
										<div className="flex flex-col">
											<span className="text-gray-900 font-medium text-sm">
												{userFriend.user.username}
											</span>
											<span className="text-gray-400 text-xs">Online</span>
										</div>
									</div>

									{/* Add button chỉ hiện khi hover */}
									<button
										onClick={(e) => {
											e.stopPropagation(); // ngăn li onClick trigger
											onAddMember(userFriend.user);
										}}
										className="flex items-center gap-1 px-3 py-1.5 text-sm bg-blue-50 text-blue-600 font-medium rounded opacity-0 group-hover:opacity-100 transition-opacity"
									>
										<UserPlus size={16} />
										Add
									</button>
								</li>
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