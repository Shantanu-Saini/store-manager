"use client"
import React, { useState } from 'react';
import { loginData } from '@/variables/pageData';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

function LoginPage() {
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const handleLoginSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await axios.post("/api/user/login", user);
            console.log("Login Success", response);
            toast.success(response?.data.message);
            router.push('/dashboard');
            window.location.reload();
        } catch (error: any) {
            console.log("Login Failed", error.response?.data?.message || error.message);
            toast.error(error.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className='px-4 min-w-full min-h-screen bg-gray-100 flex items-center justify-center'>
            <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 bg-white shadow-lg">
                <div className="mx-auto max-w-lg text-center">
                    <h1 className="text-2xl font-bold sm:text-3xl">{loginData.title}</h1>
                    <p className="mt-4 text-gray-500">{loginData.description}</p>
                </div>

                <form onSubmit={handleLoginSubmit} className="mx-auto mt-8 max-w-md space-y-4">
                    <div>
                        <label htmlFor="email" className="sr-only">Email</label>
                        <div className="relative">
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={user.email}
                                onChange={(e) => setUser({ ...user, email: e.target.value })}
                                required
                                className="w-full rounded-lg border border-gray-300 p-4 pe-12 text-sm shadow-sm focus:outline-none bg-gray-100"
                                placeholder="Enter email"
                            />
                            <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="size-4 text-gray-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                                    />
                                </svg>
                            </span>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="sr-only">Password</label>
                        <div className="relative">
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={user.password}
                                onChange={(e) => setUser({ ...user, password: e.target.value })}
                                required
                                className="w-full rounded-lg border border-gray-300 p-4 pe-12 text-sm shadow-sm focus:outline-none bg-gray-100"
                                placeholder="Enter password"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-500">
                            New User? <Link href="/signup" className="underline">Signup</Link>
                        </p>

                        <button
                            type="submit"
                            className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white shadow-md hover:bg-blue-700 hover:scale-x-105 transition-all duration-150"
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;
