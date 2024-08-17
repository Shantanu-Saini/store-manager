"use client";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getUserInfo } from '@/helpers/getUserInfo';

interface UserInfo {
  name: string;
  email: string;
  isVerified: boolean;
}

function UserPage() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const user: any = await getUserInfo();
      if (user) {
        setUserInfo(user);
      }
    };

    fetchUser();
  }, []);

  const router = useRouter();
  const handleLogout = async () => {
    try {
      const response = await axios.post('/api/user/logout');
      router.push("/login");
      console.log("Logout Successful", response);

      // Reload the page after logout to update the Navbar
      window.location.reload();
    } catch (error: any) {
      console.log(error.message, "Error in Logging Out");
    }
  };

  return (
    <div className="max-w-full h-full flex flex-col justify-between mx-auto p-6 bg-white rounded-lg shadow-md">
      {userInfo && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Personal Details</h2>
          <div className="space-y-2">
            <p className="text-gray-700">
              <strong className="font-semibold">Name:</strong> {userInfo.name}
            </p>
            <p className="text-gray-700">
              <strong className="font-semibold">Email:</strong> {userInfo.email}
            </p>
            <p className="text-gray-700">
              <strong className="font-semibold">Account Verified:</strong> {userInfo.isVerified ? (
                <span className="text-green-600">Yes</span>
              ) : (
                <span className="text-red-600">No</span>
              )}
            </p>
          </div>
        </div>
      )}

      <button
        onClick={handleLogout}
        className="mt-6 w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-all duration-200"
      >
        Logout
      </button>
    </div>
  );
}

export default UserPage;
