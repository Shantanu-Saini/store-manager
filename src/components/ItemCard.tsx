import React from 'react';
import Link from 'next/link';
import { FaRupeeSign, FaBox, FaCalendarAlt, FaRegClock, FaTruck, FaBalanceScale, FaTrashAlt } from 'react-icons/fa';

interface ItemCardProps {
  _id: string;
  name: string;
  mrp: number;
  initialQuantity: number;
  dateOfBuying: string;
  expiryDate?: string;
  distributorName: string;
  remainingQuantity: number;
}

function ItemCard({
  _id,
  name,
  mrp,
  initialQuantity,
  dateOfBuying,
  expiryDate,
  distributorName,
  remainingQuantity,
}: ItemCardProps) {
  return (
    <div className="border rounded-lg p-4 shadow-md hover:shadow-lg transition duration-300 bg-white">
      <h3 className="text-2xl font-bold mb-4">{name}</h3>

      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <FaRupeeSign className="text-blue-500 mr-2" />
          <span className="font-semibold">MRP:</span>
        </div>
        <span className="text-right">Rs. {mrp.toFixed(2)}</span>
      </div>

      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <FaBox className="text-blue-500 mr-2" />
          <span className="font-semibold">Bought Quantity:</span>
        </div>
        <span className="text-right">{initialQuantity}</span>
      </div>

      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <FaCalendarAlt className="text-blue-500 mr-2" />
          <span className="font-semibold">Date of Buying:</span>
        </div>
        <span className="text-right">{new Date(dateOfBuying).toLocaleDateString()}</span>
      </div>

      {expiryDate && (
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <FaRegClock className="text-blue-500 mr-2" />
            <span className="font-semibold">Expiry Date:</span>
          </div>
          <span className="text-right">{new Date(expiryDate).toLocaleDateString()}</span>
        </div>
      )}

      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <FaTruck className="text-blue-500 mr-2" />
          <span className="font-semibold">Distributor Name:</span>
        </div>
        <span className="text-right">{distributorName}</span>
      </div>

      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <FaBalanceScale className="text-blue-500 mr-2" />
          <span className="font-semibold">Remaining Quantity:</span>
        </div>
        <span className="text-right">{remainingQuantity}</span>
      </div>

      <div className="flex justify-between mt-6 space-x-2">
        <Link href={`/sellitem/${_id}`} className="flex-1 text-center bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200">
            Sell Item
        </Link>
        <Link href={`/iteminfo/${_id}`} className="flex-1 text-center bg-gray-200 text-blue-500 py-2 px-4 rounded border border-blue-500 hover:bg-gray-300 transition duration-200">
            View Details
        </Link>
        {/* {remainingQuantity === 0 && (
          <button className="flex-1 text-center bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-200">
            <FaTrashAlt className="inline-block mr-1" /> Remove
          </button>
        )} */}
      </div>
    </div>
  );
}

export default ItemCard;
