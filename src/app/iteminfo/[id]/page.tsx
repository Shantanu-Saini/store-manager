"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { IoArrowBackSharp } from "react-icons/io5";
import Link from 'next/link';

interface Item {
    _id: string;
    name: string;
    distributorName: string;
    costPrice: number;
    initialQuantity: number;
    totalCostPrice: number;
    mrp: number;
    soldQuantity: number;
    totalSellingPrice: number;
    totalProfit: number;
    discountAmount: number;
    remainingQuantity: number;
    dateOfBuying: string;
    expiryDate?: string;
}

function ItemInfoPage({ params }: { params: { id: string } }) {
    const [item, setItem] = useState<Item | null>(null);
    const router = useRouter();
    const id = params.id;

    useEffect(() => {
        const fetchItemDetails = async () => {
            try {
                const response = await axios.get(`/api/user/iteminfo/${id}`);
                setItem(response.data);
            } catch (error) {
                console.error("Error fetching item details:", error);
            }
        };
        fetchItemDetails();
    }, [id]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50">
            <h1 className="text-4xl font-bold mb-6 text-gray-800">{item?.name}</h1>
            <div className="w-full max-w-4xl bg-white border rounded-lg p-6 shadow-lg">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <p className="text-lg text-gray-600"><strong>Distributor Name:</strong> {item?.distributorName}</p>
                    <p className="text-lg text-gray-600"><strong>Cost per item:</strong> Rs. {item?.costPrice.toFixed(2)}</p>
                    <p className="text-lg text-gray-600"><strong>Bought Quantity:</strong> {item?.initialQuantity}</p>
                    <p className="text-lg text-gray-600"><strong>Total Cost:</strong> Rs. {item?.totalCostPrice.toFixed(2)}</p>
                    <p className="text-lg text-gray-600"><strong>MRP:</strong> Rs. {item?.mrp.toFixed(2)}</p>
                    <p className="text-lg text-gray-600"><strong>Sold Quantity:</strong> {item?.soldQuantity}</p>
                    <p className="text-lg text-gray-600"><strong>Total Sales Price:</strong> Rs. {item?.totalSellingPrice.toFixed(2)}</p>
                    <p className="text-lg text-gray-600"><strong>Remaining Quantity:</strong> {item?.remainingQuantity}</p>
                    <p className="text-lg text-gray-600"><strong>Total Profit:</strong> Rs. {item?.totalProfit.toFixed(2)}</p>
                    <p className="text-lg text-gray-600"><strong>Total Discount:</strong> Rs. {item?.discountAmount.toFixed(2)}</p>
                    <p className="text-lg text-gray-600"><strong>Date of Buying:</strong>
                        {item?.dateOfBuying && new Date(item.dateOfBuying).toLocaleDateString()}
                    </p>
                    {item?.expiryDate && (
                        <p className="text-lg text-gray-600"><strong>Expiry Date:</strong>
                            {new Date(item.expiryDate).toLocaleDateString()}
                        </p>
                    )}
                </div>
                <Link href='/dashboard' className="inline-flex items-center space-x-2 text-blue-500 hover:underline">
                    <IoArrowBackSharp />
                    <span>Go to Dashborad</span>
                </Link>
            </div>
        </div>
    );
}

export default ItemInfoPage;
