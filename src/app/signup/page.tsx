"use client"
import React, { useState } from 'react';
import { signupData } from '@/variables/pageData';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
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
            router.push('/login');
        } catch (error: any) {
            console.log("Signup failed", error.response?.data?.message || error.message);
            toast.error(error.response?.data?.message || "Signup failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-md shadow-md">
                <h1 className="text-3xl font-bold text-center text-gray-800">{signupData.title}</h1>
                <p className="text-center text-gray-600">{signupData.description}</p>
                <form onSubmit={handleSignUpSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={user.name}
                            onChange={(e) =>
                                setUser(prevState => ({ ...prevState, name: e.target.value }))
                            }
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={user.email}
                            onChange={(e) =>
                                setUser(prevState => ({ ...prevState, email: e.target.value }))
                            }
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={user.password}
                            onChange={(e) =>
                                setUser(prevState => ({ ...prevState, password: e.target.value }))
                            }
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Signup
                        </button>
                    </div>
                </form>
                <p className="text-center text-gray-600">
                    Already have an account?{" "}
                    <Link href="/login" className="text-blue-500 hover:text-blue-700">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default SignupPage;
