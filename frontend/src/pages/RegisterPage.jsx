import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { ArrowLeft } from "lucide-react";

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);

    const username = form.get("username");
    const password = form.get("password");
    const confirmPassword = form.get("confirm-password");

    let newErrors = {};

    // username validate
    if (!username || username.trim().length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }

    // password validate
    if (!password || password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    // confirm password
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);

    // nếu có lỗi thì dừng
    if (Object.keys(newErrors).length > 0) return;

    const success = await register({ username, password });

    if (success) {
      navigate("/");
    } else {
      setErrors({ api: "Register failed" });
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
            Create your account
          </h2>

        </div>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>

          {/* Username */}
          <div>
            <input
              name="username"
              type="text"
              placeholder="Username"
              className={`w-full border rounded-lg p-3 outline-none
                ${errors.username ? "border-red-400" : "border-gray-200"}
                focus:border-purple-400`}
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">{errors.username}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <input
              name="password"
              type="password"
              placeholder="Password"
              className={`w-full border rounded-lg p-3 outline-none
                ${errors.password ? "border-red-400" : "border-gray-200"}
                focus:border-purple-400`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <input
              name="confirm-password"
              type="password"
              placeholder="Confirm Password"
              className={`w-full border rounded-lg p-3 outline-none
                ${errors.confirmPassword ? "border-red-400" : "border-gray-200"}
                focus:border-purple-400`}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {errors.api && (
            <p className="text-red-500 text-sm text-center">{errors.api}</p>
          )}

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