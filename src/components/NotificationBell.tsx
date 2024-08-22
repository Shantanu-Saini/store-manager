import React, { useState, useEffect } from 'react';
import { FaRegBell, FaTimes } from "react-icons/fa";
import axios from 'axios';

function NotificationBell() {
    const [expiringItems, setExpiringItems] = useState([]);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);

    useEffect(() => {
        async function fetchExpiringItems() {
            try {
                const response = await axios.get('/api/user/iteminfo');
                const items = response.data;

                const currentDate = new Date();
                const fiveDaysLater = new Date();
                fiveDaysLater.setDate(currentDate.getDate() + 5);

                const itemsAboutToExpire = items.filter((item: any) => {
                    if (item.expiryDate) {
                        const expiryDate = new Date(item.expiryDate);
                        return expiryDate >= currentDate && expiryDate <= fiveDaysLater;
                    }
                    return false;
                });

                setExpiringItems(itemsAboutToExpire);
            } catch (error) {
                console.error("Error fetching expiring items:", error);
            }
        }

        fetchExpiringItems();
    }, []);

    const handleBellClick = () => {
        setIsNotificationOpen(prev => !prev);
    };

    const handleCloseNotification = () => {
        setIsNotificationOpen(false);
    };

    const handleNotificationRemove = (itemId: string) => {
        setExpiringItems((prevItems) =>
            prevItems.filter((item: { _id: string }) => item._id !== itemId)
        );
    };


    return (
        <div className="relative">
            <FaRegBell
                className="h-6 w-6 text-white cursor-pointer"
                onClick={handleBellClick}
            />
            {isNotificationOpen && expiringItems.length > 0 && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg">
                    <div className="flex justify-between items-center p-2 border-b">
                        <span className="font-semibold text-gray-800">Notifications</span>
                        <button onClick={handleCloseNotification} className="text-gray-500 hover:text-gray-700">
                            <FaTimes />
                        </button>
                    </div>
                    <ul className="p-2">
                        {expiringItems.map((item: any) => (
                            <div className='flex w-full items-center justify-between'>
                                <li key={item._id} className="text-sm text-gray-800">
                                    {item.name} is expiring soon!
                                </li>
                                <button onClick={() => handleNotificationRemove(item._id)}>X</button>
                            </div>
                        ))}
                    </ul>
                </div>
            )}
            {expiringItems.length > 0 && !isNotificationOpen && (
                <span className="absolute top-0 right-0 block h-2 w-2 bg-red-600 rounded-full ring-2 ring-white" />
            )}
        </div>
    );
}

export default NotificationBell;
