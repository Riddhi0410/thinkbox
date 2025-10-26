import React from 'react'
import { Link, useNavigate } from 'react-router'
import { PlusIcon } from "lucide-react"
import toast from 'react-hot-toast'

const Navbar = () => {
    const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
        toast.success("Logged out successfully");
    }

    return (
        <header className="bg-base-300 border-b border-base-content/10">
            <div className='mx-auto max-w-6xl p-4'>
                <div className='flex items-center justify-between'>
                    <h1 className='text-3xl font-bold text-primary font-mono tracking-tight'>Thinkbox</h1>
                    <div className='flex items-center gap-4'>
                        <Link to={"/create"} className='btn btn-primary'>
                            <PlusIcon className='size-5' />New Note
                        </Link>
                    </div>
                    <button onClick={handleLogout} className="logout-button">
                        Logout
                    </button>
                </div>

            </div>

        </header>
    )
}

export default Navbar