import { MoreVertical, UserPlus, Trash } from "lucide-react";
import { useState } from "react";
import AddMemberModal from "../modals/AddMemberModal";
import ConfirmModal from "../modals/ConfirmModal";

export default function ChatHeader({ chat, onAddMember, onDeleteChat }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalAddMemberOpen, setIsModalAddMemberOpen] = useState(false);
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);

  return (
    <div className="h-16 flex items-center justify-between px-6 border-b border-gray-200 bg-white">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full text-white flex items-center justify-center font-semibold bg-gray-500">
          {chat.name?.charAt(0).toUpperCase()}
        </div>
        <span className="font-medium">{chat.name}</span>
      </div>
      <div className="relative">
        <button
          className={`p-2 rounded-lg transition-colors ${isMenuOpen ? 'bg-gray-100' : 'hover:bg-gray-100'}`}
          onClick={() => setIsMenuOpen(prev => !prev)}
        >
          <MoreVertical size={18} />
        </button>

        {isMenuOpen && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setIsMenuOpen(false)}></div>

            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg z-20 py-1 overflow-hidden">
              <ul className="text-sm text-gray-700">
                {chat.group && (
                  <li
                    className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => {
                      setIsModalAddMemberOpen(true);
                      setIsMenuOpen(false);
                    }}
                  >
                    <UserPlus size={18} className="text-gray-500" />
                    <span className="font-medium">Add Member</span>
                  </li>
                )}

                <li
                  className="flex items-center gap-3 px-4 py-2.5 hover:bg-red-50 cursor-pointer transition-colors text-red-600"
                  onClick={() => {
                    setIsOpenConfirmModal(true);
                    setIsMenuOpen(false);
                  }}
                >
                  <Trash size={18} />
                  <span className="font-medium">Delete Chat</span>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>

      <AddMemberModal
        isOpen={isModalAddMemberOpen}
        onClose={() => setIsModalAddMemberOpen(false)}
        onAddMember={onAddMember}
      />

      <ConfirmModal
        open={isOpenConfirmModal}
        title="Delete Chat"
        description="This action cannot be undone."
        confirmText="Delete"
        danger
        onConfirm={() => {
          onDeleteChat();
          setIsOpenConfirmModal(false);
        }}
        onCancel={() => setIsOpenConfirmModal(false)}
      />
    </div>
  )
}