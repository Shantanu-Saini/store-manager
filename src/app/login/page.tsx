"use client"
import React, { useState } from 'react'
import { loginData } from '@/variables/pageData'
import Link from 'next/link'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

function LoginPage() {
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: "",
    })

    const handleLoginSubmit = async (event : React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        try {
            const response = await axios.post("api/user/login", user);
            console.log("Login Success", response);
            router.push('/home');
            window.location.reload()
        } catch (error: any) {
            console.log("Login Failed", error.response?.data?.message || error.message);
            toast.error(error.response?.data?.message || "Login failed");
        }
    }

    return (
        <div>
            <h1>{loginData.title}</h1>
            <p>{loginData.description}</p>
            <form onSubmit={handleLoginSubmit}>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
                <br />
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })} />
                <br />
                <button type="submit">Login</button>
                <p>Don't have an account? <Link href="/signup">Signup</Link></p>
            </form>
        </div>
    )
}

export default LoginPage