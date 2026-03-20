import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "../api/api";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post("/auth/login", {
        email,
        password,
      });

      if (response.status === 200 || response.status === 201) {
        localStorage.setItem("token", response.data.access_token);
        if (response.data.name) {
          localStorage.setItem("name", response.data.name);
        }
        navigate("/checkin");
      }
    } catch (error) {
      console.error("Login error:", error);
      const errorMsg = error.response?.data?.detail || "Login failed";
      alert(errorMsg);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-x-hidden bg-black bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-black px-4 py-8 sm:px-6">
      <div className="absolute top-[-10%] left-[-10%] h-72 w-72 rounded-full bg-blue-600/20 blur-[120px] sm:h-96 sm:w-96"></div>
      <div className="absolute bottom-[-10%] right-[-10%] h-72 w-72 rounded-full bg-cyan-500/10 blur-[120px] sm:h-96 sm:w-96"></div>

      <div className="relative z-10 w-full max-w-md rounded-3xl border border-gray-800 bg-gray-900/60 p-6 backdrop-blur-xl sm:p-8 lg:p-10">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Welcome back to <span className="text-blue-500">Zenvoco</span>
          </h2>
          <p className="mt-2 text-sm text-gray-400">Log in to continue your training.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5 sm:space-y-6">
          <div>
            <label className="mb-2 block text-sm text-gray-400">Email Address</label>
            <input
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-xl border border-gray-800 bg-black/50 p-4 text-white placeholder-gray-600 transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between gap-3 text-sm">
              <label className="text-gray-400">Password</label>
              <a href="#" className="text-blue-500">Forgot password?</a>
            </div>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-xl border border-gray-800 bg-black/50 p-4 text-white placeholder-gray-600 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-blue-600 p-4 font-semibold text-white transition hover:bg-blue-500"
          >
            Sign In
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-400">
          Don't have an account? {" "}
          <Link to="/register" className="text-blue-500">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
