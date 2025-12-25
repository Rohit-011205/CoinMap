// import React from 'react'
// // import Signup from './Signup'
// import { useNavigate } from "react-router-dom";
// import { Link } from 'react-router-dom';
// // import { useForm } from "react-hook-form"
// import { useState } from "react"
// import axios from 'axios'
// import toast from 'react-hot-toast';
// import dashboard from './Dashboard';
// // import { toast } from 'react-hot-toast';



// const Login = () => {
//   const navigate = useNavigate()

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const submit = async (e) => {

//     e.preventDefault()

//     setError(" ")

//     if (!email || !password) {
//       toast.error("All fields are required");
//       return
//     }

//     let toastID

//     try {
//       setLoading(true)

//       toastID= toast.loading("Logging in...")

//       const res = await axios.post(
//         "http://localhost:5000/api/auth/login",
//         { email, password },
//         { headers: { "Content-Type": "application/json" } }
//       )

//       localStorage.setItem("token", res.data.token);

//       toast.success("Logged in Successfully",{
//         id:toastID
//       })

//       navigate("/Dashboard");
//     } catch (error) {
//        toast.error(
//     error.response?.data?.message || "Login failed",
//     { id: toastID }
//   );
//     }
//     finally {
//       setLoading(false)
//     }
//   }


//   return (
//     <>
// {/* <div className="page "> */}
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-purple-950 ">
//         {/* <dialog id="loginmodel" className="modal backdrop-blur-sm"> */}
//           <div className="modalds-box rounded-2xl p-10 max-w-md bg-gray-900 text-gray-100 shadow-2xl relative 
// ">
//             {/* Close Button */}
//             <div method="dialog">
//               <button onClick={() => navigate("/Landing")} className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4 text-purple-400 hover:bg-gray-800">✕</button>
//             </div>

//             {/* Header */}
//             <div className="text-center mb-8">
//               <h3 className="font-extrabold text-3xl text-white">Welcome Back</h3>
//               <p className="text-gray-400 mt-2 text-sm">Please enter your details to sign in.</p>
//             </div>

//             {/* Login Form */}
//             <form onSubmit={submit}>
//               <div className="flex flex-col gap-5">

//                 {/* Email Input */}
//                 <div className="form-control">
//                   <label className="label">
//                     <span className="label-text font-semibold text-gray-200 mb-2"> Email Address :</span>
//                   </label>
//                   <input
//                     value={email}
//                     type="email"
//                     placeholder="   mail@example.com "
//                     className="input input-bordered w-full bg-gray-800 text-gray-100 placeholder-gray-400 focus:bg-gray-700 focus:border-blue-500 transition-colors"
//                     onChange={(e) => setEmail(e.target.value)}
//                   />
//                 </div>

//                 {/* Password Input */}
//                 <div className="form-control">
//                   <label className="label">
//                     <span className="label-text font-semibold text-gray-200 mb-2">  Password :</span>
//                   </label>
//                   <div></div>
//                   <input
//                     type="password"
//                     placeholder="   Enter your password"
//                     className="input input-bordered w-full bg-gray-800 text-gray-100 placeholder-gray-400 focus:bg-gray-700 focus:border-blue-500 transition-colors"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                   />
//                   <label className="label">
//                     <a href="#" className="label-text-alt link link-hover text-purple-400 mt-2 font-medium ml-auto hover:underline ml-1">Forgot password?</a>
//                   </label>
//                 </div>

//                 {/* Submit Button */}
//                 <div disabled={loading} className="form-control mt-4">
//                   <button type='submit' disabled={loading} className="btn   w-full
//   py-3
//   rounded-xl
//   font-semibold
//   bg-gradient-to-r from-purple-600 to-purple-500
//   hover:from-purple-500 hover:to-purple-400
//   text-white
//   shadow-lg
//   hover:shadow-purple-500/30
//   transition-all
// ">
//                     {loading ? "Logging now " : "Log in"}
//                   </button>
//                 </div>

//                 {/* Sign Up Link */}
//                 <div className="text-center text-sm text-gray-400 mt-4">
//                   Don't have an account?
//                   <Link to="/Signup" className="link link-primary font-bold text-purple-400 no-underline hover:underline ml-1">
//                     Sign up
//                   </Link>
//                 </div>

//               </div>
//             </form>
//           </div>

//           {/* Backdrop click to close */}
//           <form method="dialog" className="modal-backdrop">
//             <button>close</button>
//           </form>
//         {/* </dialog> */}
//       </div>

// {/* </div> */}

//     </>
//   )
// }

// export default Login

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