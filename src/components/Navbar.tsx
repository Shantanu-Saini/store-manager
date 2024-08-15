"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState("");
    // console.log("Navbar hello")
    useEffect(() => {
        // console.log("Navbar hello useeffect")
        const getUser = async () => {
            try {
                const resp = await axios.get('/api/user/userinfo');
                console.log("Navbar:", resp.data);
                
                // Check if user data exists in the response
                if (resp.data && resp.data.userData) {
                    setIsLoggedIn(true);
                    // console.log("Navbar user:", resp.data.userData.name);
                    setUserName(resp.data.userData.name);
                }
            } catch (error) {
                console.error("Error fetching user info:", error);
                setIsLoggedIn(false);
            }
        };

        getUser();
    }, []);

    return (
        <div className="flex items-center justify-between px-6 py-2 top-0 left-0 z-50 sticky w-full">
            <div className="flex flex-col">
                <h1 className="text-2xl">Store</h1>
                <span className="text-lg">Manager</span>
            </div>
            <div className="flex items-center justify-between space-x-3">
                <button>Theme</button>
                {isLoggedIn ? (
                    <div className="flex items-center space-x-3">
                        <Link href="/profile">{userName}</Link>
                    </div>
                ) : (
                    <div className="flex items-center space-x-3">
                        <Link href="/login">Login</Link>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Navbar;
