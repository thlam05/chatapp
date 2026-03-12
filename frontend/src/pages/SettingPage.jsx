import { User, Lock } from "lucide-react";

export default function SettingPage() {
  return (
    <div className="h-full bg-[#f6f7fb] flex justify-center">

      <div className="w-full bg-white border border-gray-200 flex flex-col">

        {/* Header */}
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <h2 className="font-semibold text-gray-800">
            Settings
          </h2>
        </div>


        {/* Content */}
        <div className="p-6 space-y-8">

          {/* Profile */}
          <div>

            <div className="flex items-center gap-2 mb-4">
              <User size={18} />
              <h3 className="font-medium text-gray-800">
                Profile
              </h3>
            </div>

            <div className="flex items-center gap-6">

              <img
                src="https://i.pravatar.cc/80"
                className="w-20 h-20 rounded-full"
              />

              <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-100">
                Change Avatar
              </button>

            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">

              <input
                type="text"
                placeholder="Full Name"
                className="border border-gray-200 rounded-lg p-3 outline-none focus:border-gray-400"
              />

              <input
                type="email"
                placeholder="Email"
                className="border border-gray-200 rounded-lg p-3 outline-none focus:border-gray-400"
              />

            </div>

          </div>


          {/* Password */}
          <div>

            <div className="flex items-center gap-2 mb-4">
              <Lock size={18} />
              <h3 className="font-medium text-gray-800">
                Security
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-4">

              <input
                type="password"
                placeholder="Current Password"
                className="border border-gray-200 rounded-lg p-3 outline-none focus:border-gray-400"
              />

              <input
                type="password"
                placeholder="New Password"
                className="border border-gray-200 rounded-lg p-3 outline-none focus:border-gray-400"
              />

            </div>

          </div>


          {/* Save button */}
          <div className="flex justify-end">

            <button className="px-5 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition">
              Save Changes
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}