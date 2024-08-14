"use client"
import React, { useState } from 'react'
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
    })

    const handleSignUpSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await axios.post('/api/user/signup', user);
            // recieving succesfully user register msg from backend
            console.log("Signup Success", response.data.message);
            router.push('/login');
        } catch (error: any) {
            // recieving error msg (if already exist) from backend
            console.log("Signup failed", error.response?.data?.message || error.message);
            toast.error(error.response?.data?.message || "Signup failed");
        }
    }


    return (
        <div>
            <h1>{signupData.title}</h1>
            <p>{signupData.description}</p>
            <form onSubmit={handleSignUpSubmit}>
                <label htmlFor='name'>Name</label>
                <input type='text' id='name' value={user.name} onChange={(e) =>
                    setUser(prevState => ({ ...prevState, name: e.target.value }))} />
                <br />
                <label htmlFor='email'>Email</label>
                <input type='email' id='email' value={user.email} onChange={(e) =>
                    setUser(prevState => ({ ...prevState, email: e.target.value }))} />
                <br />
                <label htmlFor='password'>Password</label>
                <input type='password' id='password' value={user.password} onChange={(e) =>
                    setUser(prevState => ({ ...prevState, password: e.target.value }))} />
                <br />
                <button type='submit'>Signup</button>
                <p>Already have an account? <Link href='/login'>Login</Link></p>
            </form>
        </div>
    )
}

export default SignupPage;