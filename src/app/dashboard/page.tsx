"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Item {
  _id: string;
  name: string;
  costPrice: number;
  initialQuantity: number;
}


function Dashboard() {
  const [itemInfo, setItemInfo] = useState<Item[]>([]);

  useEffect(() => {
    const getItemInfo = async () => {
      try {
        const response = await axios.get('/api/user/iteminfo');
        setItemInfo(response.data);
        // console.log("Fetched Items:", response.data);
      } catch (error) {
        console.error("Error fetching item info:", error);
      }
    };
    getItemInfo();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <Link href='/profile'>Profile</Link>

      {/* Display items in the dashboard */}
      <div>
        {itemInfo.length > 0 ? (
          itemInfo.map((item, index) => (
            <div key={index}>
              <div>
                {/* <h3>id : {item._id}</h3> */}
                <h3>Name : {item.name}</h3>
                <p>Cost Price: {item.costPrice}</p>
                <p>Quantity: {item.initialQuantity}</p>
                {/* Add other item details you want to display */}
              </div>
              <Link href={`/sellitem/${item._id}`}>Sell</Link>
            </div>
          ))
        ) : (
          <p>No items found.</p>
        )}
        <Link href="/createitem">Add Item</Link>
      </div>
    </div>
  );
}

export default Dashboard;
