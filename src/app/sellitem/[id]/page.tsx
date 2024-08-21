"use client";
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

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
        soldQuantity: Number(sellItemData.soldQuantity),  // Ensure it's a number
        sellingPrice: Number(sellItemData.sellingPrice),  // Ensure it's a number
      });
      console.log("Item sold successfully:", response.data);
      toast.success(response?.data?.message)
      router.push('/dashboard');
    } catch (error: any) {
      console.log("Error selling item:", error);
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <div className="min-h-screen min-w-full flex items-center justify-center bg-animated-gradient">
      <div className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 text-center space-y-4 rounded-md shadow-xl p-6 bg-white">
        <h1 className="text-3xl font-bold text-gray-900">Sell Item</h1>
        <form onSubmit={handleSellSubmit} className="space-y-4">
          <div className='flex flex-col space-y-3'>
            <label className="text-2xl">Selling Quantity</label>
            <input
              type="text"
              name="soldQuantity"
              value={sellItemData.soldQuantity}
              onChange={handleChange}
              required
              className="focus:outline-none rounded-md shadow-md p-2 text-3xl bg-gray-100"
            />
          </div>
          <div className='flex flex-col space-y-3'>
            <label className="text-2xl">Selling Price</label>
            <input
              type="text"
              name="sellingPrice"
              value={sellItemData.sellingPrice}
              onChange={handleChange}
              required
              className="focus:outline-none rounded-md shadow-md p-2 text-3xl bg-gray-100"
            />
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => router.push('/dashboard')}
              className="bg-white text-blue-500 border border-blue-500 px-7 py-2 text-lg rounded-md mr-2 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-400 text-white px-7 py-2 text-lg rounded-md ml-2"
            >
              Sell
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SellItemPage;
