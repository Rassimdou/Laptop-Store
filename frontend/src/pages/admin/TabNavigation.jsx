import React from "react"

export default function TabNavigation({ activeTab, setActiveTab }) {
  return (
    <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
      {["orders", "products", "customers", "analytics"].map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`py-2 px-4 rounded-md text-sm font-medium transition-colors capitalize ${
            activeTab === tab
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  )
}