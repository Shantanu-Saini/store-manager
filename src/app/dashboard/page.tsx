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
    <section className="min-h-screen min-w-full px-4 py-8 sm:px-6 sm:py-12 lg:px-8 bg-gray-100">
      <header>
        <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">Your Inventory</h2>
        <p className="mt-4 max-w-md text-gray-500">
          Explore the items in your inventory and manage them efficiently.
        </p>
      </header>

      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {itemInfo.length > 0 ? (
          itemInfo.map((item) => (
            <li key={item._id} className="group block overflow-hidden">
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
            </li>
          ))
        ) : (
          <p className="text-2xl text-gray-500">No items found.</p>
        )}
      </ul>

      <div className="flex w-full justify-between items-center mt-8">
        <Link href="/createitem" className="inline-block text-white py-2 px-4 rounded border border-gray-900 bg-gray-900 hover:bg-gray-700 transition-all">
          Add Item
        </Link>
        <Link href='/profile' className="inline-flex items-center space-x-2 text-gray-900 hover:text-gray-700">
          <span className="hover:mr-2 transition-all duration-300">Go to Profile</span>
          <FaArrowRightLong />
        </Link>
      </div>
    </section>
  );
}

export default Dashboard;
