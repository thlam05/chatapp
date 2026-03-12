import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router";

export default function LoginPage() {
  const { user, login } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);

    const username = form.get("username");
    const password = form.get("password");

    const success = await login({ username, password });

    if (success) {
      navigate("/");
    }
  };

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
            Sign in to your account
          </h2>

        </div>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>

          <input
            name="username"
            placeholder="Username"
            className="w-full border border-gray-200 rounded-lg p-3 outline-none focus:border-purple-400"
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            className="w-full border border-gray-200 rounded-lg p-3 outline-none focus:border-purple-400"
          />

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white p-3 rounded-lg font-semibold hover:opacity-90 transition"
          >
            Login
          </button>

        </form>

        <p className="text-sm text-gray-500 text-center mt-6">
          Don't have an account?{" "}
          <Link
            to="/auth/register"
            className="text-purple-600 font-medium hover:underline"
          >
            Register
          </Link>
        </p>

      </div>

    </div>
  );
}