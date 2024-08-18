"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { getUserInfo } from "@/helpers/getUserInfo";
import Link from "next/link";
import { IoArrowBackSharp } from "react-icons/io5";

const CreateItemPage: React.FC = () => {
    const [itemData, setItemData] = useState({
        distributorName: "",
        name: "",
        costPrice: "",  // storing as string
        mrp: "",  // storing as string
        initialQuantity: "",  // storing as string
        dateOfBuying: "",
        expiryDate: ""
    });

    const [userId, setUserId] = useState<string | null>(null);
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
        setItemData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
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
            costPrice: parseFloat(itemData.costPrice),  // Convert to number
            mrp: parseFloat(itemData.mrp),  // Convert to number
            initialQuantity: parseInt(itemData.initialQuantity, 10), // Convert to number
        };

        try {
            const response = await axios.post("/api/user/createitem", dataToSubmit);
            console.log("Create Item success:", response.data.message);
            router.push("/dashboard");
        } catch (error: any) {
            console.log("Create Item Failed", error.response?.data?.message || "Unknown error");
        }
    };

    return (
        <div className="min-w-full min-h-screen p-6">
            <Link href='/dashboard' className="inline-flex items-center space-x-2 text-blue-500 hover:underline">
                <IoArrowBackSharp />
                <span>Go to Dashboard</span>
            </Link>
            <div className="w-full p-6 flex flex-col items-center justify-between space-y-4 bg-[#e6e0e0] h-full shadow-lg rounded-md">
                <h2 className="text-2xl font-bold text-gray-900">Add Item</h2>
                <form onSubmit={handleSubmit} className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 px-2">
                    <div className="flex flex-col items-start space-y-2">
                        <label htmlFor="name" className="text-xl md:text-2xl">Item Name</label>
                        <input
                            type="text"
                            name="name"
                            className="focus:outline-none rounded-md shadow-md p-2 text-xl md:text-3xl w-full"
                            value={itemData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="flex flex-col items-start space-y-2">
                        <label htmlFor="distributorName" className="text-xl md:text-2xl">Distributor Name</label>
                        <input
                            type="text"
                            name="distributorName"
                            className="focus:outline-none rounded-md shadow-md p-2 text-xl md:text-3xl w-full"
                            value={itemData.distributorName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="flex flex-col items-start space-y-2">
                        <label htmlFor="costPrice" className="text-xl md:text-2xl">Cost Price (per item)</label>
                        <input
                            type="text"
                            name="costPrice"
                            className="focus:outline-none rounded-md shadow-md p-2 text-xl md:text-3xl w-full"
                            value={itemData.costPrice}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="flex flex-col items-start space-y-2">
                        <label htmlFor="mrp" className="text-xl md:text-2xl">MRP (per item)</label>
                        <input
                            type="text"
                            name="mrp"
                            className="focus:outline-none rounded-md shadow-md p-2 text-xl md:text-3xl w-full"
                            value={itemData.mrp}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="flex flex-col items-start space-y-2">
                        <label htmlFor="initialQuantity" className="text-xl md:text-2xl">Buying Quantity</label>
                        <input
                            type="text"
                            name="initialQuantity"
                            className="focus:outline-none rounded-md shadow-md p-2 text-xl md:text-3xl w-full"
                            value={itemData.initialQuantity}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="flex flex-col items-start space-y-2">
                        <label htmlFor="dateOfBuying" className="text-xl md:text-2xl">Date of Buying</label>
                        <input
                            type="date"
                            name="dateOfBuying"
                            className="focus:outline-none rounded-md shadow-md p-2 text-xl md:text-3xl w-full"
                            value={itemData.dateOfBuying}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="flex flex-col items-start space-y-2">
                        <label htmlFor="expiryDate" className="text-xl md:text-2xl">Expire Date (optional)</label>
                        <input
                            type="date"
                            name="expiryDate"
                            className="focus:outline-none rounded-md shadow-md p-2 text-xl md:text-3xl w-full"
                            value={itemData.expiryDate}
                            onChange={handleChange}
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white rounded-md h-2/3 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 self-center mt-4 md:mt-0"
                    >
                        Add Item
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateItemPage;
