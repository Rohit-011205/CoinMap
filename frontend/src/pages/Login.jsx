import React from 'react'
// import Signup from './Signup'
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
// import { useForm } from "react-hook-form"
import { useState } from "react"
import axios from 'axios'
import toast from 'react-hot-toast';
import dashboard from './Dashboard';
// import { toast } from 'react-hot-toast';



const Login = () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e) => {

    e.preventDefault()

    setError(" ")

    if (!email || !password) {
      toast.error("All fields are required");
      return
    }

    let toastID

    try {
      setLoading(true)

      toastID= toast.loading("Logging in...")

      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      )

      localStorage.setItem("token", res.data.token);

      toast.success("Logged in Successfully",{
        id:toastID
      })

      navigate("/Dashboard");
    } catch (error) {
       toast.error(
    error.response?.data?.message || "Login failed",
    { id: toastID }
  );
    }
    finally {
      setLoading(false)
    }
  }


  return (
    <>
{/* <div className="page "> */}
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-purple-950 ">
        {/* <dialog id="loginmodel" className="modal backdrop-blur-sm"> */}
          <div className="modalds-box rounded-2xl p-10 max-w-md bg-gray-900 text-gray-100 shadow-2xl relative 
">
            {/* Close Button */}
            <div method="dialog">
              <button onClick={() => navigate("/Landing")} className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4 text-purple-400 hover:bg-gray-800">✕</button>
            </div>

            {/* Header */}
            <div className="text-center mb-8">
              <h3 className="font-extrabold text-3xl text-white">Welcome Back</h3>
              <p className="text-gray-400 mt-2 text-sm">Please enter your details to sign in.</p>
            </div>

            {/* Login Form */}
            <form onSubmit={submit}>
              <div className="flex flex-col gap-5">

                {/* Email Input */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold text-gray-200 mb-2"> Email Address :</span>
                  </label>
                  <input
                    value={email}
                    type="email"
                    placeholder="   mail@example.com "
                    className="input input-bordered w-full bg-gray-800 text-gray-100 placeholder-gray-400 focus:bg-gray-700 focus:border-blue-500 transition-colors"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                {/* Password Input */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold text-gray-200 mb-2">  Password :</span>
                  </label>
                  <div></div>
                  <input
                    type="password"
                    placeholder="   Enter your password"
                    className="input input-bordered w-full bg-gray-800 text-gray-100 placeholder-gray-400 focus:bg-gray-700 focus:border-blue-500 transition-colors"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <label className="label">
                    <a href="#" className="label-text-alt link link-hover text-purple-400 mt-2 font-medium ml-auto hover:underline ml-1">Forgot password?</a>
                  </label>
                </div>

                {/* Submit Button */}
                <div disabled={loading} className="form-control mt-4">
                  <button type='submit' disabled={loading} className="btn   w-full
  py-3
  rounded-xl
  font-semibold
  bg-gradient-to-r from-purple-600 to-purple-500
  hover:from-purple-500 hover:to-purple-400
  text-white
  shadow-lg
  hover:shadow-purple-500/30
  transition-all
">
                    {loading ? "Logging now " : "Log in"}
                  </button>
                </div>

                {/* Sign Up Link */}
                <div className="text-center text-sm text-gray-400 mt-4">
                  Don't have an account?
                  <Link to="/Signup" className="link link-primary font-bold text-purple-400 no-underline hover:underline ml-1">
                    Sign up
                  </Link>
                </div>

              </div>
            </form>
          </div>

          {/* Backdrop click to close */}
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        {/* </dialog> */}
      </div>

{/* </div> */}

    </>
  )
}

export default Login
