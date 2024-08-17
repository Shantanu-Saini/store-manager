"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getUserInfo } from "@/helpers/getUserInfo";
import { FaSun } from "react-icons/fa";
import { AiFillMoon } from "react-icons/ai";
import { FaCircleUser } from "react-icons/fa6";
import { RiShoppingCartFill } from "react-icons/ri";

function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState("");
    const [theme, setTheme] = useState("light");

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    }

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
    }, []);

    return (
        <div className="flex items-center justify-between md:px-6 px-3 md:py-4 py-1 top-0 left-0 z-50 sticky w-full bg-white bg-opacity-30 backdrop-blur-md">

            <div>
                <RiShoppingCartFill className="md:text-4xl text-2xl text-violet-900" />
            </div>

            <div className="flex flex-col">
                <h1 className="text-2xl">ShopTrackr</h1>
            </div>

            <div className="flex items-center justify-between space-x-3">
                <button onClick={toggleTheme}>
                    {
                        theme === "light" ? <FaSun className="md:text-2xl text-xl" /> : <AiFillMoon className="md:text-2xl text-xl" />
                    }
                </button>
                {isLoggedIn ? (
                    <div className="flex items-center space-x-3">
                        <Link href="/profile" className="flex items-center justify-between">
                            <FaCircleUser className="md:text-2xl text-xl mr-3" />
                            <p className="hidden md:block">{userName}</p>
                        </Link>
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
