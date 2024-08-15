"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { getUserInfo } from "@/helpers/getUserInfo";

const CreateItemPage: React.FC = () => {
    const [itemData, setItemData] = useState({
        distributorName: "",
        name: "",
        costPrice: 0,
        mrp: 0,
        dateOfBuying: "",
        quantity: 0,
        expiryDate: ""
    });

    const [userId, setUserId] = useState<string | null>(null); // State to hold the user's _id
    const router = useRouter();

    useEffect(() => {
        const fetchUser = async () => {
            const user: any = await getUserInfo();
            setUserId(user._id);
        };
        fetchUser();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setItemData({
            ...itemData,
            [name]: name === 'costPrice' || name === 'mrp' || name === 'quantity' ? parseFloat(value) : value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!userId) {
            console.log("User ID not found. Cannot create item.");
            return;
        }

        const dataToSubmit = {
            ...itemData,
            ownerId: userId,
            remainingQuantity: itemData.quantity,
            initialQuantity: itemData.quantity,
        };

        try {
            const response = await axios.post("/api/user/createitem", dataToSubmit);
            console.log("Create Item success:", response.data.message);
            // router.push("/dashboard");
        } catch (error: any) {
            console.log("Create Item Failed", error.response?.data.message);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
            <h1 className="text-xl font-semibold mb-4">Add New Item</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Distributor Name</label>
                    <input
                        type="text"
                        name="distributorName"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                        value={itemData.distributorName}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Item Name</label>
                    <input
                        type="text"
                        name="name"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                        value={itemData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Cost Price</label>
                    <input
                        type="number"
                        name="costPrice"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                        value={itemData.costPrice}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">MRP</label>
                    <input
                        type="number"
                        name="mrp"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                        value={itemData.mrp}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Date of Buying</label>
                    <input
                        type="date"
                        name="dateOfBuying"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                        value={itemData.dateOfBuying}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Quantity</label>
                    <input
                        type="number"
                        name="quantity"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                        value={itemData.quantity}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
                    <input
                        type="date"
                        name="expiryDate"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                        value={itemData.expiryDate}
                        onChange={handleChange}
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md"
                >
                    Add Item
                </button>
            </form>
        </div>
    );
};

export default CreateItemPage;
