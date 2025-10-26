import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import API from "../lib/axios.js"


function Login() {
    const [form, setform] = useState({ email: "", password: "" })
    const [msg, setmsg] = useState("")
    const navigate = useNavigate()

    const handlechange = (e) => setform({ ...form, [e.target.name]: e.target.value })

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post("/auth/login", form);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            navigate("/");
        } catch (err) {
            const errorMsg = err.response?.data?.msg || "Something went wrong";
            console.error("LOGIN FAILED:", err)
            setmsg(errorMsg);
        }
    };


return (
    <div className="flex justify-around bg-amber-50 h-[40%] w-[50%] m-auto mt-10 p-5 rounded-2xl text-black text-2xl " >
        <form onSubmit={handleSubmit} className="flex flex-col justify-center gap-3">
            <input
                name="email"
                type="email"
                placeholder="Email address"
                onChange={handlechange}
                required
            />
            <input
                name="password"
                type="password"
                placeholder="password"
                onChange={handlechange}
                required
            />
            <button className="border-green-300 border-2"
                type="submit">Login</button>
        </form>
        <p>{msg}</p>
    </div>
)

}
export default Login