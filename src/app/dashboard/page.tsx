"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import ItemCard from "@/components/ItemCard";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";

interface Item {
  _id: string;
  name: string;
  mrp: number;
  initialQuantity: number;
  dateOfBuying: string;
  expiryDate?: string;
  distributorName: string;
  remainingQuantity: number;
}

function Dashboard() {
  const [itemInfo, setItemInfo] = useState<Item[]>([]);

  useEffect(() => {
    const getItemInfo = async () => {
      try {
        const response = await axios.get('/api/user/iteminfo');
        setItemInfo(response.data);
      } catch (error) {
        console.error("Error fetching item info:", error);
      }
    };
    getItemInfo();
  }, []);

  return (
    <div className="min-h-screen max-h-fit p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {itemInfo.length > 0 ? (
          itemInfo.map((item) => (
            <ItemCard
              key={item._id}
              _id={item._id}
              name={item.name}
              mrp={item.mrp}
              initialQuantity={item.initialQuantity}
              dateOfBuying={item.dateOfBuying}
              expiryDate={item.expiryDate}
              distributorName={item.distributorName}
              remainingQuantity={item.remainingQuantity}
            />
          ))
        ) : (
          <p>No items found.</p>
        )}
      </div>

      <div className="flex w-full justify-between items-center">
        <Link href="/createitem" className="mt-6 inline-block bg-blue-500 text-white py-2 px-4 rounded">
          Add Item
        </Link>
        <Link href='/profile' className="mt-4 inline-flex items-center space-x-2 text-blue-500 hover:underline">
          <span>Go to Profile</span>
          <FaArrowRightLong />
        </Link>
      </div>

    </div>
  );
}

export default Dashboard;
