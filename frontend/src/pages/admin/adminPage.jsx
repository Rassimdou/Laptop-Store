import React, { useState } from "react"
import { Button } from "../../components/ui/button"
import StatsCards from "./StatsCards.jsx"
import TabNavigation from "./TabNavigation.jsx"
import OrdersTab from "./OrdersTab.jsx"
import ProductsTab from "./ProductsTab.jsx"
import CustomersTab from "./CustomersTab.jsx"
import AnalyticsTab from "./AnalytcsTab.jsx"
import OrderDetailModal from "./OrderDetailModal.jsx"

const orders = [
  {
    id: "ORD-001",
    customer: {
      name: "John Doe",
      email: "john@example.com",
      phone: "+1 (555) 123-4567",
    },
    product: 'MacBook Pro 16"',
    quantity: 1,
    total: 2499,
    status: "pending",
    date: "2024-01-15",
    address: "123 Main St, New York, NY 10001",
  },
  {
    id: "ORD-002",
    customer: {
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "+1 (555) 987-6543",
    },
    product: "Dell XPS 13 Plus",
    quantity: 2,
    total: 2598,
    status: "confirmed",
    date: "2024-01-14",
    address: "456 Oak Ave, Los Angeles, CA 90210",
  },
  {
    id: "ORD-003",
    customer: {
      name: "Mike Johnson",
      email: "mike@example.com",
      phone: "+1 (555) 456-7890",
    },
    product: "ASUS ROG Strix G15",
    quantity: 1,
    total: 1899,
    status: "shipped",
    date: "2024-01-13",
    address: "789 Pine St, Chicago, IL 60601",
  },
  {
    id: "ORD-004",
    customer: {
      name: "Sarah Wilson",
      email: "sarah@example.com",
      phone: "+1 (555) 321-0987",
    },
    product: "ThinkPad X1 Carbon",
    quantity: 1,
    total: 1599,
    status: "cancelled",
    date: "2024-01-12",
    address: "321 Elm St, Houston, TX 77001",
  },
]

export default function AdminPage() {
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [activeTab, setActiveTab] = useState("orders")

  const updateOrderStatus = (orderId, newStatus) => {
    // In a real app, this would make an API call
    console.log(`Updating order ${orderId} to ${newStatus}`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600 mt-2">Manage your laptop store</p>
            </div>
            <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
              Export Data
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <StatsCards />

        <div className="space-y-6">
          <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

          {activeTab === "orders" && (
            <OrdersTab
              orders={orders}
              setSelectedOrder={setSelectedOrder}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
            />
          )}

          {activeTab === "products" && <ProductsTab />}
          {activeTab === "customers" && <CustomersTab />}
          {activeTab === "analytics" && <AnalyticsTab />}
        </div>
      </div>

      {selectedOrder && (
        <OrderDetailModal
          selectedOrder={selectedOrder}
          setSelectedOrder={setSelectedOrder}
          updateOrderStatus={updateOrderStatus}
        />
      )}
    </div>
  )
}