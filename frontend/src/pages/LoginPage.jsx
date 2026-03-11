
export default function LoginPage() {

  return (
    <div className="h-screen flex items-center justify-center bg-[#f6f7fb]">

      <div className="w-[420px] bg-white shadow-xl rounded-2xl p-8">

        <h2 className="text-2xl font-bold text-center mb-6">
          Sign in to your account
        </h2>

        <form className="space-y-4">

          <input
            type="email"
            placeholder="Email"
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />

          <button
            className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white p-3 rounded-lg font-semibold hover:opacity-90"
          >
            Login
          </button>
        </form>

      </div>
    </div>
  );
}