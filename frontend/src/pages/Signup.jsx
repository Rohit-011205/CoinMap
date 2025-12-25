import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import VerificationModal from "../components/Verification.jsx";
import API from "../API.js";

function Signup() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [signupData, setSignupData] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    if (!username || !email || !password) {
      toast.error("All fields are required");
      return;
    }

    let toastID;
    try {
      setLoading(true);
      toastID = toast.loading("Creating account...");
      const res = await API.post("/auth/signup",
        { username, email, password },
        { headers: { "Content-Type": "application/json" } }
      );
      toast.success("Account created! Verify email.", { id: toastID });
      setSignupData(res.data);
      setModalOpen(true);
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed", { id: toastID });
    } finally {
      setLoading(false);
    }
  };

  const handleVerified = () => {
    if (signupData?.token) localStorage.setItem("token", signupData.token);
    toast.success("Email verified successfully!");
    setModalOpen(false);
    navigate("/Dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#050505] text-white antialiased">

      {/* Subtle Top Accent */}
      <div className="absolute top-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-30"></div>

      <div className="w-full max-w-[360px] px-6">

        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-2xl font-extralight tracking-[0.4em] uppercase text-white">
            COIN <span className="text-purple-500 font-bold">MAP</span>
          </h1>
          <p className="text-zinc-500 text-[10px] tracking-[0.2em] uppercase mt-2">Create Private Account</p>
        </div>

        <form onSubmit={submit} className="flex flex-col gap-5">
          {/* Full Name */}
          <div className="space-y-2">
            <label className="text-[11px] uppercase tracking-widest text-white-300 font-medium ml-1">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full bg-[#0F0F0F] border border-zinc-800 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500 transition-all placeholder:text-white-700"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          {/* Email Address */}
          <div className="space-y-2">
            <label className="text-[11px] uppercase tracking-widest text-white-300 font-medium ml-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="name@email.com"
              className="w-full bg-[#0F0F0F] border border-zinc-800 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500 transition-all placeholder:text-white-700"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="text-[11px] uppercase tracking-widest text-white-300 font-medium ml-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Create security key"
              className="w-full bg-[#0F0F0F] border border-zinc-800 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500 transition-all placeholder:text-white-700"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-500 text-white py-3.5 rounded-lg text-xs font-bold uppercase tracking-[0.2em] transition-all active:scale-[0.98] disabled:opacity-50 mt-4 shadow-lg shadow-purple-900/10"
          >
            {loading ? "Registering..." : "Initialize Account"}
          </button>
        </form>

        {/* Footer Navigation */}
        <div className="mt-10 pt-6 border-t border-zinc-900 flex flex-col items-center gap-5">
          <Link to="/Login" className="text-[11px] text-zinc-400 hover:text-white tracking-wide transition-colors">
            Existing user? <span className="text-purple-400 font-semibold uppercase ml-1">Log In</span>
          </Link>

          <button
            onClick={() => navigate("/")}
            className="text-[10px] text-white-600 hover:text-zinc-300 tracking-[0.2em] uppercase transition-colors flex items-center gap-2"
          >
            - Close -
          </button>
        </div>
      </div>

      <VerificationModal
        email={email}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onVerified={handleVerified}
      />
    </div>
  );
}

export default Signup;
