"use client";
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { IoArrowBackSharp, IoCheckmarkSharp } from 'react-icons/io5';

function SellItemPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [sellItemData, setSellItemData] = useState({
    soldQuantity: "",
    sellingPrice: "",
  });

  const id = params.id;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSellItemData((prevData) => ({
      ...prevData,
      [name]: Number(value),  // Convert input to number
    }));
  };

  const handleSellSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.put(`/api/user/sellitem/${id}`, {
        ...sellItemData,
        soldQuantity: Number(sellItemData.soldQuantity),  
        sellingPrice: Number(sellItemData.sellingPrice), 
      });
      console.log("Item sold successfully:", response.data);
      toast.success(response?.data?.message);
      router.push('/dashboard');
    } catch (error: any) {
      console.log("Error selling item:", error);
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-animated-gradient">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800">Sell Item</h1>
        <form onSubmit={handleSellSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-lg font-medium text-gray-700">Selling Quantity</label>
            <input
              type="number"
              name="soldQuantity"
              value={sellItemData.soldQuantity}
              onChange={handleChange}
              required
              className="w-full p-3 text-xl rounded-md border-2 border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Enter quantity"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-lg font-medium text-gray-700">Selling Price</label>
            <input
              type="number"
              name="sellingPrice"
              value={sellItemData.sellingPrice}
              onChange={handleChange}
              required
              className="w-full p-3 text-xl rounded-md border-2 border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Enter price"
            />
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => router.push('/dashboard')}
              className="flex items-center space-x-2 px-6 py-3 text-lg font-medium text-blue-600 bg-white border border-blue-500 rounded-md hover:bg-gray-100 transition"
            >
              <IoArrowBackSharp />
              <span>Cancel</span>
            </button>
            <button
              type="submit"
              className="flex items-center space-x-2 px-6 py-3 text-lg font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 transition"
            >
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
