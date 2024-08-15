"use client";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'

interface UserInfo {
    name: string;
    email: string;
    isVerified: boolean;
}

function ProfilePage() {
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

    useEffect(() => {
        const getUserInfo = async () => {
            try {
                const response = await axios.get('/api/user/userinfo');
                // console.log(response.data);
                setUserInfo(response.data.userData);
            } catch (error) {
                console.error("Error fetching user data", error);
            }
        };
        getUserInfo()
    }, [])

    const router = useRouter();
    const handleLogout = async () => {
        try {
            const response = await axios.post('/api/user/logout')
            router.push("/login");
            console.log("Logout Successful", response);

            // Reload the page after logout to update the Navbar
            window.location.reload();
        } catch (error: any) {
            console.log(error.message, "Error in Logging Out");
        }
    }

    return (
        <div>
            <h1>Profile Page</h1>
            {userInfo && (
                <div>
                    <h2>User Details:</h2>
                    <p><strong>Name:</strong> {userInfo.name}</p>
                    <p><strong>Email:</strong> {userInfo.email}</p>
                    <p><strong>Account Verified:</strong> {userInfo.isVerified ? "Yes" : "No"}</p>
                </div>
            )}

            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default ProfilePage;
