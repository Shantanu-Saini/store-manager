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
        <section className="bg-gray-100 min-h-screen min-w-full">
            <div className="px-4 py-16 sm:px-6 lg:px-8">
                <Link href='/dashboard' className="inline-flex items-center space-x-2 text-gray-600 mb-6">
                    <IoArrowBackSharp />
                    <span className="hover:ml-2 transition-all duration-300">Go to Dashboard</span>
                </Link>
                <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Add New Item</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="name" className="sr-only">Item Name</label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                placeholder="Item Name"
                                className="w-full rounded-lg border-gray-300 border p-3 text-base focus:outline-none bg-gray-100"
                                value={itemData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                                <label htmlFor="distributorName" className="sr-only">Distributor Name</label>
                                <input
                                    type="text"
                                    name="distributorName"
                                    id="distributorName"
                                    placeholder="Distributor Name"
                                    className="w-full rounded-lg border-gray-300 border p-3 text-base focus:outline-none bg-gray-100"
                                    value={itemData.distributorName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="costPrice" className="sr-only">Cost Price</label>
                                <input
                                    type="text"
                                    name="costPrice"
                                    id="costPrice"
                                    placeholder="Cost Price (per item)"
                                    className="w-full rounded-lg border-gray-300 border p-3 text-base focus:outline-none bg-gray-100"
                                    value={itemData.costPrice}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="mrp" className="sr-only">MRP</label>
                                <input
                                    type="text"
                                    name="mrp"
                                    id="mrp"
                                    placeholder="MRP (per item)"
                                    className="w-full rounded-lg border-gray-300 border p-3 text-base focus:outline-none bg-gray-100"
                                    value={itemData.mrp}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="initialQuantity" className="sr-only">Buying Quantity</label>
                                <input
                                    type="text"
                                    name="initialQuantity"
                                    id="initialQuantity"
                                    placeholder="Buying Quantity"
                                    className="w-full rounded-lg border-gray-300 border p-3 text-base focus:outline-none bg-gray-100"
                                    value={itemData.initialQuantity}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                                <label htmlFor="dateOfBuying" className="sr-only">Date of Buying</label>
                                <input
                                    type="date"
                                    name="dateOfBuying"
                                    id="dateOfBuying"
                                    className="w-full rounded-lg border-gray-300 border p-3 text-base focus:outline-none bg-gray-100"
                                    value={itemData.dateOfBuying}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="expiryDate" className="sr-only">Expiry Date (optional)</label>
                                <input
                                    type="date"
                                    name="expiryDate"
                                    id="expiryDate"
                                    className="w-full rounded-lg border-gray-300 border p-3 text-base focus:outline-none bg-gray-100"
                                    value={itemData.expiryDate}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="mt-4 flex space-x-4">
                            <button
                                onClick={() => router.push('/dashboard')}
                                className={`inline-block w-full rounded-lg bg-white px-5 py-3 font-medium text-blue-600 border border-blue-600 transition duration-200 ${loading ? "opacity-50" : "hover:bg-gray-100"}`}
                                disabled={loading}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className={`inline-block w-full rounded-lg bg-blue-600 px-5 py-3 font-medium text-white transition duration-200 ${loading ? "opacity-50" : "hover:bg-blue-700"}`}
                                disabled={loading}
                            >
                                {loading ? "Adding Item..." : "Add Item"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default CreateItemPage;
