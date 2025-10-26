import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../lib/axios.js"

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

            if(res.data.token){
                localStorage.setItem("token", res.data.token)
                localStorage.setItem("user",JSON.stringify(res.data.user))
                setmsg("signup successfull")
                setTimeout(() => {
                    navigate("/")
                }, 1000);
            }else {
                setmsg(res.data.msg || "signup successfull, please log in")
            }
        } catch (err) {
            setmsg(err.response?.data?.msg || "Something went wrong");
        }
    }

    return (
        <div className="flex justify-around bg-amber-50 h-[40%] w-[50%] m-auto mt-10 p-5 rounded-2xl text-black text-2xl " >
            <form onSubmit={handleSubmit} className="flex flex-col justify-center gap-3 ">
                <input
                    name="name"
                    type="text"
                    placeholder="username"
                    onChange={handlechange}
                    required
                />

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
                    type="submit">Sign Up</button>
            </form>
            <p>{msg}</p>
        </div>
    )
}