import React, { useEffect, useState } from "react"
import { Button } from "../../components/ui/button"
import StatsCards from "./StatsCards.jsx"
import TabNavigation from "./TabNavigation.jsx"
import OrdersTab from "./OrdersTab.jsx"
import ProductsTab from "./ProductsTab.jsx"
import CustomersTab from "./CustomersTab.jsx"
import AnalyticsTab from "./AnalytcsTab.jsx"
import OrderDetailModal from "./OrderDetailModal.jsx"
 // Sample data, replace with actual API call
import axios from "axios"


export default function AdminPage() {
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [activeTab, setActiveTab] = useState("orders")
  const [orders, setOrders] = useState([])
    useEffect(() => {
      const orders = async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/orders') // Replace with your API endpoint
          setOrders(response.data)
        } catch (error) {
          console.error("Error fetching orders:", error)
        }
      }

      orders()
    }, [])


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