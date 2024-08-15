"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getUserInfo } from "@/helpers/getUserInfo";

function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState("");
    // console.log("Navbar hello")

    useEffect(() => {
        const fetchUser = async () => {
            const user = await getUserInfo();
            if (user) {
                setIsLoggedIn(true);
                setUserName(user.name);
            } else {
                setIsLoggedIn(false);
            }
        };

        fetchUser();
    }, [])

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
