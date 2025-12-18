import React from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

function Signup() {
    const navigate = useNavigate();

    const [email, setemail] = useState();
    const [username, setusername] = useState();
    const [password, setpassword] = useState();
    const [loading, setloading] = useState();
    const [error, seterror] = useState();

    const submit = async (e) => {
        e.preventDefault()
        seterror(" ")

        if (!username || !email || !password) {
            toast.error("All fields are required");
            return
        }

        let toastID

        try {
            setloading(true)
            toastID = toast.loading("Creating account...");

            const res = await axios.post(
                "http://localhost:5000/api/auth/Signup",
                { username, email, password },
                { headers: { "Content-Type": "application/json" } }
            );

            localStorage.setItem("token", res.data.token);

            toast.success("Account is created", {
                id: toastID
            })

            navigate("/Dashboard")

        } catch (error) {
            toast.error(
                error.response?.data?.message || "Something went wrong",
                { id: toastID }
            )
        }
        finally {
            setloading(false)
        }

    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-purple-950">
            <div className="relative w-full max-w-md rounded-2xl bg-gray-900 p-8 shadow-2xl text-gray-100">

                {/* Close Button */}
                <button
                    onClick={() => navigate("/")}
                    className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4 text-purple-400 hover:bg-gray-800"
                >
                    ✕
                </button>

                {/* Header */}
                <div className="text-center mb-8">
                    <h3 className="text-3xl font-extrabold text-white tracking-tight">Create Account</h3>
                    <p className="text-gray-400 text-sm mt-2">
                        Join us! Please enter your details.
                    </p>
                </div>

                {/* Signup Form */}
                <form onSubmit={submit} className="flex flex-col gap-5">

                    {/* Full Name */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold text-gray-300">
                                Full Name
                            </span>
                        </label>
                        <input
                            type="text"
                            placeholder="Rohit Kadam"
                            className="input input-bordered w-full bg-gray-800 text-gray-100 placeholder-gray-400 focus:bg-gray-700 focus:border-purple-500 transition"
                            value={username}
                            onChange={(e) => setusername(e.target.value)}
                        />
                    </div>

                    {/* Email */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold text-gray-300">
                                Email Address
                            </span>
                        </label>
                        <input
                            type="email"
                            placeholder="mail@example.com"
                            className="input input-bordered w-full bg-gray-800 text-gray-100 placeholder-gray-400 focus:bg-gray-700 focus:border-purple-500 transition"
                            value={email}
                            onChange={(e) => setemail(e.target.value)}
                        />
                    </div>

                    {/* Password */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold text-gray-300">
                                Password
                            </span>
                        </label>
                        <input
                            type="password"
                            placeholder="Create a password"
                            className="input input-bordered w-full bg-gray-800 text-gray-100 placeholder-gray-400 focus:bg-gray-700 focus:border-purple-500 transition"
                            value={password}
                            onChange={(e) => setpassword(e.target.value)}
                        />
                    </div>

                    {/* Submit */}
                    <div disabled={loading} className="form-control mt-4">
                        <button
                            type="submit"
                            className="btn   w-full
  py-3
  rounded-xl
  font-semibold
  bg-gradient-to-r from-purple-600 to-purple-500
  hover:from-purple-500 hover:to-purple-400
  text-white
  shadow-lg
  hover:shadow-purple-500/30
  transition-all
"
                        >
                            {loading ? "Signing up..." : "Sign Up"}
                        </button>
                    </div>

                    {/* Footer Link */}
                    <div className="text-center text-sm text-gray-400 mt-4">
                        Already have an account?
                        <Link
                            to="/Login"
                            className="ml-1 font-bold text-purple-400 hover:underline"
                        >
                            Login
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signup;
