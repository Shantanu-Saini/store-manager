import React from 'react';
import Link from 'next/link';

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
    <div className="border rounded-lg p-4 shadow-md hover:shadow-lg transition duration-300">
      <h3 className="text-2xl font-bold mb-2">{name}</h3>
      <p className="text-xl font-semibold mb-2">MRP: Rs. {mrp.toFixed(2)}</p>
      <p>Initial Quantity: {initialQuantity}</p>
      <p>Date of Buying: {new Date(dateOfBuying).toLocaleDateString()}</p>
      {expiryDate && <p>Expiry Date: {new Date(expiryDate).toLocaleDateString()}</p>}
      <p>Buyer Name: {distributorName}</p>
      <p>Remaining Quantity: {remainingQuantity}</p>
      {/* sell item */}
      <Link href={`/sellitem/${_id}`} className="mt-6 inline-block bg-blue-500 text-white py-2 px-4 rounded">
        Sell Item
      </Link>
      {/* view full details btn */}
      <Link href={`/iteminfo/${_id}`} className="mt-6 inline-block bg-white text-blue-500 py-2 px-4 rounded">
        View Details
      </Link>
    </div>
  );
}

export default ItemCard;
