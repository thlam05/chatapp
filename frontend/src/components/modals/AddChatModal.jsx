import { useState } from "react";
import { X } from "lucide-react";

export default function AddChatModal({ open, onClose, onCreate }) {
	const [name, setName] = useState("");

	if (!open) return null;

	const handleSubmit = () => {
		if (!name.trim()) return;
		onCreate?.({ name });
		setName("");
		onClose();
	};

	return (
		<div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
			{/* Modal container */}
			<div className="bg-white rounded-xl w-96 flex flex-col overflow-hidden shadow-md">

				{/* Header */}
				<div className="flex justify-between items-center px-5 py-4 border-b border-gray-200">
					<h2 className="text-lg font-semibold text-gray-900">
						Create Chat
					</h2>
					<button
						onClick={onClose}
						className="text-gray-500 hover:bg-gray-100 rounded-lg p-2 transition-colors"
					>
						<X size={18} />
					</button>
				</div>

				{/* Content */}
				<div className="px-5 py-4 space-y-4">
					{/* Name input */}
					<div className="flex flex-col gap-1">
						<label className="text-sm text-gray-600 font-medium">
							Chat name
						</label>
						<input
							type="text"
							placeholder="Enter chat name..."
							value={name}
							onChange={(e) => setName(e.target.value)}
							className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						/>
					</div>
				</div>

				{/* Actions */}
				<div className="flex justify-end gap-2 px-5 py-4 border-t border-gray-200">
					<button
						onClick={onClose}
						className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
					>
						Cancel
					</button>

					<button
						onClick={handleSubmit}
						className="px-4 py-2 bg-black text-white rounded hover:bg-gray-600 transition-colors disabled:opacity-50"
						disabled={!name.trim()}
					>
						Create
					</button>
				</div>
			</div>
		</div>
	);
}