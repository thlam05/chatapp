import { X } from "lucide-react";

export default function ConfirmModal({
	open,
	title = "Confirm action",
	description = "Are you sure you want to proceed?",
	confirmText = "Confirm",
	cancelText = "Cancel",
	onConfirm,
	onCancel,
	danger = false,
}) {
	if (!open) return null;

	return (
		<div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
			{/* Modal container */}
			<div className="bg-white rounded-xl w-96 max-h-[80vh] flex flex-col overflow-hidden shadow-md">

				{/* Header */}
				<div className="flex justify-between items-center px-5 py-4 border-b border-gray-200">
					<h2 className="text-lg font-semibold text-gray-900">
						{title}
					</h2>
					<button
						onClick={onCancel}
						className="text-gray-500 hover:bg-gray-100 rounded-lg p-2 transition-colors"
					>
						<X size={18} />
					</button>
				</div>

				{/* Content */}
				<div className="px-5 py-4 text-gray-600 text-sm">
					{description}
				</div>

				{/* Actions */}
				<div className="flex justify-end gap-2 px-5 py-4 border-t border-gray-200">
					<button
						onClick={onCancel}
						className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
					>
						{cancelText}
					</button>

					<button
						onClick={onConfirm}
						className={`px-4 py-2 text-white rounded transition-colors bg-black hover:bg-gray-600`}
					>
						{confirmText}
					</button>
				</div>
			</div>
		</div>
	);
}