import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../lib/axios.js"
import toast from 'react-hot-toast'

export default function Signup({
}) {
    const [form, setform] = useState({ name: "", email: "", password: "" })
    const [msg, setmsg] = useState("")
    const navigate = useNavigate()

    const handlechange = (e) => setform({ ...form, [e.target.name]: e.target.value })

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post("/auth/signup", form)
            setmsg(res.data.msg)

            if (res.data.token) {
                localStorage.setItem("token", res.data.token)
                localStorage.setItem("user", JSON.stringify(res.data.user))
                toast.success("sign up successfull")
                setmsg("signup successfull")
                setTimeout(() => {
                    navigate("/")
                }, 1000);
            } else {
                setmsg(res.data.msg || "signup successfull, please log in")
            }
        } catch (err) {
            setmsg(err.response?.data?.msg || "Something went wrong");
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4" >
            <form onSubmit={handleSubmit} className="backdrop-filter backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-8 shadow-lg text-white w-full max-w-sm">
                <h1 className="text-4xl font-bold text-center mb-6">Sign Up</h1>
                <div className="relative mb-4">

                    <input
                        name="name"
                        type="text"
                        placeholder="username"
                        onChange={handlechange}
                        required
                        className="w-full bg-white/10 border-b border-white/30 text-white placeholder-white/70 py-3 pl-10 pr-4 rounded-md focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
                    />
                </div>
                <div className="relative mb-4">
                    <input
                        name="email"
                        type="email"
                        placeholder="Email address"
                        onChange={handlechange}
                        required
                        className="w-full bg-white/10 border-b border-white/30 text-white placeholder-white/70 py-3 pl-10 pr-4 rounded-md focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
                    />
                </div>
                <div className="relative mb-4">
                    <input
                        name="password"
                        type="password"
                        placeholder="password"
                        onChange={handlechange}
                        required
                        className="w-full bg-white/10 border-b border-white/30 text-white placeholder-white/70 py-3 pl-10 pr-4 rounded-md focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-white text-purple-700 font-bold py-3 px-6 rounded-full hover:bg-gray-100 transition duration-300 shadow-md"
                >
                    Register
                </button>

                <div className="text-center mt-6 text-sm text-white/90">
                    Already have an account?{" "}
                    <Link to="/Login" className="text-green-500 hover:underline">
                        Login
                    </Link>
                </div>

            </form>
      
        </div>
    )
}