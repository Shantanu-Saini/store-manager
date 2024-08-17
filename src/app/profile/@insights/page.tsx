"use client"
import React from 'react'

function InsightsPage() {
  return (
    <div className="max-w-full h-full mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Insights</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="text-lg font-medium">Last Month Buying:</h3>
          <p className="text-gray-600">[Insert data]</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="text-lg font-medium">Last Month Sales:</h3>
          <p className="text-gray-600">[Insert data]</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="text-lg font-medium">Most Selling Item:</h3>
          <p className="text-gray-600">[Insert data]</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="text-lg font-medium">Most Profitable Item:</h3>
          <p className="text-gray-600">[Insert data]</p>
        </div>
      </div>
    </div>
  )
}

export default InsightsPage
