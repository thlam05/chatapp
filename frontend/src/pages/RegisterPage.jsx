import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function RegisterPage() {
  return (
    <div className="h-screen flex items-center justify-center bg-[#f6f7fb]">

      <div className="w-[420px] bg-white border border-gray-200 rounded-lg p-8">

        {/* Header */}
        <div className="flex items-center mb-6">

          <Link
            to="/"
            className="p-2 rounded-lg hover:bg-gray-100 transition"
          >
            <ArrowLeft size={20} />
          </Link>

          <h2 className="text-2xl font-bold mx-auto">
            Create your account
          </h2>

        </div>

        <form className="space-y-4">

          <input
            type="text"
            placeholder="Full Name"
            className="w-full border border-gray-200 rounded-lg p-3 outline-none focus:border-purple-400"
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full border border-gray-200 rounded-lg p-3 outline-none focus:border-purple-400"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border border-gray-200 rounded-lg p-3 outline-none focus:border-purple-400"
          />

          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full border border-gray-200 rounded-lg p-3 outline-none focus:border-purple-400"
          />

          <button
            className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white p-3 rounded-lg font-semibold hover:opacity-90 transition"
          >
            Register
          </button>

        </form>

        <p className="text-sm text-gray-500 text-center mt-6">
          Already have an account?{" "}
          <Link
            to="/auth/login"
            className="text-purple-600 font-medium hover:underline"
          >
            Login
          </Link>
        </p>

      </div>

    </div>
  );
}