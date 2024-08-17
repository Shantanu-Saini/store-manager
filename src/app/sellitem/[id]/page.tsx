"use client";
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

function SellItemPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [sellItemData, setSellItemData] = useState({
    soldQuantity: "",
    sellingPrice: "",
  });

  const id = params.id;
  // console.log(id)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSellItemData((prevData) => ({
      ...prevData,
      [name]: Number(value),
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
      router.push('/dashboard');
    } catch (error) {
      console.log("Error selling item:", error);
    }
  };

  return (
    <div className="min-h-screen min-w-full flex items-center justify-center">
      <div className='text-center space-y-4 rounded-md shadow-xl p-6 bg-gray-50'>
        <h1 className="text-4xl font-bold">Sell Item</h1>
        <form onSubmit={handleSellSubmit} className="space-y-4">
          <div className='flex flex-col space-y-3'>
            <label className="text-2xl font-semibold">Selling Quantity</label>
            <input
              type="text"
              name="soldQuantity"
              value={sellItemData.soldQuantity}
              onChange={handleChange}
              required
              className="text-2xl rounded-md px-2 py-1 focus:outline-none shadow-md"
            />
          </div>
          <div className='flex flex-col space-y-3'>
            <label className="text-2xl font-semibold">Selling Price</label>
            <input
              type="text"
              name="sellingPrice"
              value={sellItemData.sellingPrice}
              onChange={handleChange}
              required
              className="text-2xl rounded-md px-2 py-1 focus:outline-none shadow-md"
            />
          </div>
          <button
          onClick={()=>(router.push('/dashboard'))}
            className="text-xl bg-white text-orange-500 border-orange-500 px-6 py-1 rounded-md shadow-lg mr-2"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="text-xl bg-orange-500 text-white px-6 py-1 rounded-md shadow-lg ml-2"
          >
            Sell
          </button>

        </form>
      </div>
    </div>
  );
}

export default SellItemPage;
