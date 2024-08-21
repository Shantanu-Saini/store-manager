"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { getUserInfo } from "@/helpers/getUserInfo";
import Link from "next/link";
import { IoArrowBackSharp } from "react-icons/io5";
import toast from "react-hot-toast";

const CreateItemPage: React.FC = () => {
    const [itemData, setItemData] = useState({
        distributorName: "",
        name: "",
        costPrice: "",
        mrp: "",
        initialQuantity: "",
        dateOfBuying: "",
        expiryDate: ""
    });

    const [userId, setUserId] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
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
            costPrice: parseFloat(itemData.costPrice),
            mrp: parseFloat(itemData.mrp),
            initialQuantity: parseInt(itemData.initialQuantity, 10),
        };

        setLoading(true);

        try {
            const response = await axios.post("/api/user/createitem", dataToSubmit);
            console.log("Create Item success:", response.data.message);
            toast.success(response?.data?.message);
            router.push("/dashboard");
        } catch (error: any) {
            console.log("Create Item Failed", error.response?.data?.message || "Unknown error");
            toast.error(error.response?.data?.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-w-full min-h-screen py-6 px-3 bg-animated-gradient">
            <Link href='/dashboard' className="inline-flex items-center space-x-2 text-white mb-4">
                <IoArrowBackSharp />
                <span className="hover:ml-2 transition-all duration-300">Go to Dashboard</span>
            </Link>
            <div className="max-w-4xl mx-auto p-6 flex flex-col items-center justify-between space-y-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold text-gray-900">Add New Item</h2>
                <form onSubmit={handleSubmit} className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="name" className="text-lg font-medium">Item Name</label>
                        <input
                            type="text"
                            name="name"
                            className="w-full p-3 text-xl rounded-md border-2 border-gray-300 focus:outline-none"
                            value={itemData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="distributorName" className="text-lg font-medium">Distributor Name</label>
                        <input
                            type="text"
                            name="distributorName"
                            className="w-full p-3 text-xl rounded-md border-2 border-gray-300 focus:outline-none"
                            value={itemData.distributorName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="costPrice" className="text-lg font-medium">Cost Price (per item)</label>
                        <input
                            type="text"
                            name="costPrice"
                            className="w-full p-3 text-xl rounded-md border-2 border-gray-300 focus:outline-none"
                            value={itemData.costPrice}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="mrp" className="text-lg font-medium">MRP (per item)</label>
                        <input
                            type="text"
                            name="mrp"
                            className="w-full p-3 text-xl rounded-md border-2 border-gray-300 focus:outline-none"
                            value={itemData.mrp}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="initialQuantity" className="text-lg font-medium">Buying Quantity</label>
                        <input
                            type="text"
                            name="initialQuantity"
                            className="w-full p-3 text-xl rounded-md border-2 border-gray-300 focus:outline-none"
                            value={itemData.initialQuantity}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="dateOfBuying" className="text-lg font-medium">Date of Buying</label>
                        <input
                            type="date"
                            name="dateOfBuying"
                            className="w-full p-3 text-xl rounded-md border-2 border-gray-300 focus:outline-none"
                            value={itemData.dateOfBuying}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="expiryDate" className="text-lg font-medium">Expiry Date (optional)</label>
                        <input
                            type="date"
                            name="expiryDate"
                            className="w-full p-3 text-xl rounded-md border-2 border-gray-300 focus:outline-none"
                            value={itemData.expiryDate}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-span-full">
                        <button
                            type="submit"
                            className={`bg-blue-600 text-white text-lg font-medium rounded-lg p-3 w-full transition duration-200 ${loading ? "opacity-50" : "hover:bg-blue-700"}`}
                            disabled={loading}
                        >
                            {loading ? "Adding Item..." : "Add Item"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateItemPage;
