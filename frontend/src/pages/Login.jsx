

import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';
import toast from 'react-hot-toast';
import API from '../API';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!email || !password) return toast.error("Credentials required");

    let toastID;
    try {
      setLoading(true);
      toastID = toast.loading("Authenticating...");
     const res = await API.post("/auth/login", { email, password });;
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify({
        username: res.data.user.firstName || res.data.user.username || "User",
        email: res.data.user.email,
        _id: res.data.user._id
      }));
      toast.success("Welcome back", { id: toastID });
      navigate("/Holding");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed", { id: toastID });
      console.log(error.message)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#050505] text-white antialiased">

      {/* Horizontal Accent Line */}
      <div className="absolute top-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-30"></div>

      <div className="w-full max-w-[360px] px-6">

        {/* Logo Section */}
        <div className="text-center mb-10">
          <h1 className="text-2xl font-extralight tracking-[0.4em] uppercase text-white">
            COIN <span className="text-purple-500 font-bold">MAP</span>
          </h1>
          <p className="text-zinc-500 text-[10px] tracking-[0.2em] uppercase mt-2">Institutional Access</p>
        </div>

        <form onSubmit={submit} className="space-y-5">
          {/* Email Field */}
          <div className="space-y-2">
            <label className="text-[11px] uppercase tracking-widest text-zinc-300 font-medium ml-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@email.com"
              className="w-full bg-[#0F0F0F] border border-zinc-800 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 transition-all placeholder:text-zinc-600"
            />
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <div className="flex justify-between items-center px-1">
              <label className="text-[11px] uppercase tracking-widest text-zinc-300 font-medium">
                Password
              </label>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-[#0F0F0F] border border-zinc-800 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 transition-all placeholder:text-zinc-600"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-500 text-white py-3.5 rounded-lg text-xs font-bold uppercase tracking-[0.2em] transition-all active:scale-[0.98] disabled:opacity-50 mt-4 shadow-lg shadow-purple-900/20"
          >
            {loading ? "Decrypting..." : "Enter Dashboard"}
          </button>
        </form>

        {/* Footer Links */}
        <div className="mt-10 pt-6 border-t border-zinc-900 flex flex-col items-center gap-5">
          <Link to="/Signup" className="text-[11px] text-zinc-400 hover:text-white tracking-wide transition-colors">
            Don't have an account? <span className="text-purple-400 font-semibold">Sign Up</span>
          </Link>

          <button
            onClick={() => navigate("/Landing")}
            className="text-[10px] text-zinc-600 hover:text-zinc-300 tracking-[0.2em] uppercase transition-colors flex items-center gap-2"
          >
            <span>←</span> Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;