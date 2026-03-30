import { User, Lock, Loader2 } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";
import { useNotification } from "../contexts/NotifycationContext";
import * as UserService from "../services/UserService"; // Giả định bạn có service này

export default function SettingPage() {
  const { user, token, setUser } = useAuth();

  const { notify } = useNotification();
  // State lưu trữ dữ liệu form
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      setUsername(user.username || "");
    }
  }, [user]);

  const validateForm = () => {
    if (!username.trim()) {
      setError("Username cannot be empty.");
      return false;
    }

    if (newPassword) {
      if (!password) {
        setError("Please enter your current password to set a new one.");
        return false;
      }
      if (newPassword.length < 6) {
        setError("New password must be at least 6 characters long.");
        return false;
      }
      if (newPassword === password) {
        setError("New password must be different from the current password.");
        return false;
      }
    }

    setError("");
    return true;
  };

  const handleSaveChanges = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const updateData = {
        userId: user.id,
        username,
        ...(newPassword && { currentPassword: password, newPassword })
      };

      const updatedUser = await UserService.updateProfile({ updateData, token });

      setUser({
        ...user,
        username: updatedUser.username,
      });

      notify("success", "Profile updated successfully!");

      setPassword("");
      setNewPassword("");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to update profile. Please check your current password.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full bg-[#f6f7fb] flex justify-center">
      <div className="w-full bg-white border border-gray-200 flex flex-col">
        {/* Header */}
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <h2 className="font-semibold text-gray-800">Settings</h2>
        </div>

        <div className="p-6 space-y-8">
          {/* Hiển thị lỗi nếu có */}
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg">
              {error}
            </div>
          )}

          {/* Profile Section */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <User size={18} />
              <h3 className="font-medium text-gray-800">Profile</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="border border-gray-200 rounded-lg p-3 outline-none focus:border-black transition"
              />
            </div>
          </section>

          {/* Security Section */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Lock size={18} />
              <h3 className="font-medium text-gray-800">Security</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Current Password (to change)"
                className="border border-gray-200 rounded-lg p-3 outline-none focus:border-black transition"
              />
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="New Password"
                className="border border-gray-200 rounded-lg p-3 outline-none focus:border-black transition"
              />
            </div>
          </section>

          {/* Footer Actions */}
          <div className="flex justify-end pt-4">
            <button
              onClick={handleSaveChanges}
              disabled={isLoading}
              className="flex items-center gap-2 px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition disabled:bg-gray-400"
            >
              {isLoading && <Loader2 size={16} className="animate-spin" />}
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}