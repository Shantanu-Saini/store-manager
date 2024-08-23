"use client"
import React, { useState } from 'react';
import { signupData } from '@/variables/pageData';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

function SignupPage() {
    const router = useRouter();
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
    });

    const handleSignUpSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await axios.post('/api/user/signup', user);
            console.log("Signup Success", response.data.message);
            toast.success(response?.data?.message);
            router.push('/login');
        } catch (error: any) {
            console.log("Signup failed", error.response?.data?.message || error.message);
            toast.error(error.response?.data?.message || "Signup failed");
        }
    };

    return (
        <div className='px-4 min-w-full min-h-screen bg-gray-100 flex items-center justify-center'>
            <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 bg-white shadow-lg">
                <div className="mx-auto max-w-lg text-center">
                    <h1 className="text-2xl font-bold sm:text-3xl">{signupData.title}</h1>
                    <p className="mt-4 text-gray-500">{signupData.description}</p>
                </div>

                <form onSubmit={handleSignUpSubmit} className="mx-auto mt-8 max-w-md space-y-4">
                    <div>
                        <label htmlFor="name" className="sr-only">Name</label>
                        <div className="relative">
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={user.name}
                                onChange={(e) => setUser({ ...user, name: e.target.value })}
                                required
                                className="w-full rounded-lg border border-gray-300 p-4 pe-12 text-sm shadow-sm focus:outline-none bg-gray-100"
                                placeholder="Enter your name"
                            />
                        </div>
                    </div>

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
                            Already have an account? <Link href="/login" className="underline">Login</Link>
                        </p>

                        <button
                            type="submit"
                            className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white shadow-md hover:bg-blue-700 hover:scale-x-105 transition-all duration-150"
                        >
                            Signup
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignupPage;
