"use client";
import React, { useState } from 'react';
import axios from 'axios';

function SellItemPage({ params }) {
  const [sellItemData, setSellItemData] = useState({
    soldQuantity: "",
    sellingPrice: "",
  });

  const id = params.id;
  console.log(id)

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
      const response = await axios.put(`/api/user/sellitem/${id}`, sellItemData);
      console.log("Item sold successfully:", response.data);
    } catch (error) {
      console.log("Error selling item:", error);
    }
  };

  return (
    <div>
      <h1>Sell Item Page</h1>
      <form onSubmit={handleSellSubmit} className='text-black'>
        <label>Selling Quantity</label>
        <input
          type="text"
          name="soldQuantity"
          value={sellItemData.soldQuantity}
          onChange={handleChange}
          required
        />
        <label>Selling Price</label>
        <input
          type="text"
          name="sellingPrice"
          value={sellItemData.sellingPrice}
          onChange={handleChange}
          required
        />
        <button type="submit">Sell Item</button>
      </form>
    </div>
  );
}

export default SellItemPage;
