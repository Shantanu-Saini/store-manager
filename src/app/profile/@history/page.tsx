"use client"
import React, { useEffect, useState } from 'react'

function HistoryPage() {
  const [history, setHistory] = useState([]);

  // useEffect(() => {

  // }, [])

  return (
    <div className='space-y-4'>
      <h1 className='text-center text-white text-3xl'>History</h1>
      <div className="flex flex-col items-center justify-center h-screen bg-white rounded-md">
        {
          history.length <= 0 &&
          <div className="text-center text-black text-lg">No history available</div>
        }
      </div>
    </div>
  )
}

export default HistoryPage