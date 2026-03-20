import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "../api/api";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post("/auth/register", {
        name,
        email,
        password,
      });

      if (response.status === 200 || response.status === 201) {
        localStorage.setItem("name", response.data.name || name);
        alert("Registration successful!");
        navigate("/onboarding");
      }
    } catch (error) {
      console.error("Error:", error);
      const errorMsg = error.response?.data?.detail || error.response?.data?.message || "Registration failed";
      alert(errorMsg);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-x-hidden bg-black bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-black px-4 py-8 sm:px-6">
      <div className="absolute top-[-10%] right-[-10%] h-72 w-72 rounded-full bg-cyan-500/10 blur-[120px] sm:h-96 sm:w-96"></div>
      <div className="absolute bottom-[-10%] left-[-10%] h-72 w-72 rounded-full bg-blue-600/20 blur-[120px] sm:h-96 sm:w-96"></div>

      <div className="relative z-10 my-8 w-full max-w-md rounded-3xl border border-gray-800 bg-gray-900/60 p-6 backdrop-blur-xl sm:p-8 lg:p-10">
        <div className="mb-8 text-center sm:mb-10">
          <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
            Join <span className="text-blue-500">Zenvoco</span>
          </h2>
          <p className="mt-2 text-sm text-gray-400">Start your journey to fearless communication.</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-400">Full Name</label>
            <input
              type="text"
              placeholder="e.g. Virat"
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-gray-800 bg-black/50 p-4 text-white placeholder-gray-600 transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-400">Email Address</label>
            <input
              type="email"
              placeholder="xyz@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-gray-800 bg-black/50 p-4 text-white placeholder-gray-600 transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-400">Password</label>
            <input
              type="password"
              placeholder="Create a strong password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-gray-800 bg-black/50 p-4 text-white placeholder-gray-600 transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="mt-4 w-full rounded-xl bg-blue-600 p-4 font-bold text-white transition-all duration-300 active:scale-[0.98] hover:bg-blue-500"
          >
            Create Account
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-400">
          Already have an account? {" "}
          <Link to="/login" className="font-semibold text-blue-500 transition-colors hover:text-blue-400">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
