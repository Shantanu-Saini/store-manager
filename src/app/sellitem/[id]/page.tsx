"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { IoArrowBackSharp, IoCheckmarkSharp } from 'react-icons/io5';

interface Item {
  name: string;
  remainingQuantity: number;
  mrp: number;
  distributorName: string;
  costPrice: number;
  initialQuantity: number;
  totalCostPrice: number;
  soldQuantity: number;
  totalSellingPrice: number;
  totalProfit: number;
  discountAmount: number;
  dateOfBuying: string;
  expiryDate?: string;
}

function SellItemPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [sellItemData, setSellItemData] = useState({
    soldQuantity: "",
    sellingPrice: "",
  });
  const [item, setItem] = useState<Item | null>(null);
  const id = params.id;

  useEffect(() => {
    const fetchItemData = async () => {
      try {
        const response = await axios.get(`/api/user/iteminfo/${id}`);
        setItem(response.data);
      } catch (error) {
        console.log("Error fetching item data:", error);
        toast.error("Failed to fetch item data.");
      }
    };

    fetchItemData();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSellItemData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSellSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { remainingQuantity, mrp } = item || {};

    if (item && (Number(sellItemData.soldQuantity) > remainingQuantity!)) {
      toast.error("Sold quantity cannot exceed remaining quantity.");
      return;
    }

    if (item && (Number(sellItemData.sellingPrice) > mrp!)) {
      toast.error("Selling price cannot exceed MRP.");
      return;
    }

    try {
      const response = await axios.put(`/api/user/sellitem/${id}`, {
        ...sellItemData,
        soldQuantity: Number(sellItemData.soldQuantity),
        sellingPrice: Number(sellItemData.sellingPrice),
      });
      toast.success(response?.data?.message);
      router.push('/dashboard');
    } catch (error: any) {
      console.log("Error selling item:", error);
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-animated-gradient px-3">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">{item?.name}</h1>
          <button
            onClick={() => router.push('/dashboard')}
            className="text-blue-600 hover:text-blue-500 transition">
            <IoArrowBackSharp size={24} />
          </button>
        </div>
        <div className="space-y-4">
          <p className="text-lg text-gray-600"><strong>Remaining Quantity:</strong> {item?.remainingQuantity}</p>
          <p className="text-lg text-gray-600"><strong>MRP:</strong> Rs. {item?.mrp.toFixed(2)}</p>
        </div>
        <form onSubmit={handleSellSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-lg font-medium text-gray-700">Selling Quantity</label>
            <input
              type="text"
              name="soldQuantity"
              value={sellItemData.soldQuantity}
              onChange={handleChange}
              required
              className="w-full p-3 text-xl rounded-md border-2 border-gray-300 focus:outline-none"
              placeholder={`Enter quantity (Max: ${item?.remainingQuantity})`}
            />
          </div>
          <div className="space-y-2">
            <label className="block text-lg font-medium text-gray-700">Selling Price</label>
            <input
              type="text"
              name="sellingPrice"
              value={sellItemData.sellingPrice}
              onChange={handleChange}
              required
              className="w-full p-3 text-xl rounded-md border-2 border-gray-300 focus:outline-none"
              placeholder={`Enter price (Max: Rs. ${item?.mrp.toFixed(2)})`}
            />
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => router.push('/dashboard')}
              className="flex items-center space-x-2 px-6 py-3 text-lg font-medium text-blue-600 bg-white border border-blue-500 rounded-md hover:bg-gray-100 transition">
              <IoArrowBackSharp />
              <span>Cancel</span>
            </button>
            <button
              type="submit"
              className="flex items-center space-x-2 px-6 py-3 text-lg font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 transition">
              <IoCheckmarkSharp />
              <span>Sell</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SellItemPage;
