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
    };

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
        <nav className="flex items-center justify-between px-4 py-3 md:px-8 md:py-4 bg-white dark:bg-gray-800 dark:bg-opacity-90 bg-opacity-90 backdrop-blur-md sticky top-0 left-0 z-50 shadow-sm">
            <div className="flex items-center space-x-3">
                <RiShoppingCartFill className="text-2xl md:text-3xl text-violet-900 dark:text-violet-300" />
                <Link href="/">
                    <h1 className="text-lg md:text-2xl font-semibold text-gray-800 dark:text-white">
                        ShopTrackrr
                    </h1>
                </Link>
            </div>

            <div className="flex items-center space-x-6">
                {/* <button onClick={toggleTheme} aria-label="Toggle Theme" className="text-gray-600 dark:text-gray-300">
                    {theme === "light" ? (
                        <FaSun className="text-xl md:text-2xl" />
                    ) : (
                        <AiFillMoon className="text-xl md:text-2xl" />
                    )}
                </button> */}

                {isLoggedIn ? (
                    <Link href="/profile" className="flex items-center space-x-2 text-gray-800 dark:text-white">
                        <FaCircleUser className="text-xl md:text-2xl" />
                        <span className="hidden md:block text-sm md:text-base font-medium">{userName}</span>
                    </Link>
                ) : (
                    <Link href="/login" className="text-gray-800 dark:text-white text-sm md:text-base font-medium">
                        Login
                    </Link>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
