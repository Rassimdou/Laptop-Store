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
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        // Get token from localStorage
        const token = localStorage.getItem('token');
        
        if (!token) {
          setError('You need to be logged in as admin to view orders');
          setLoading(false);
          return;
        }
        
        const response = await axios.get('http://localhost:5000/api/orders', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setOrders(response.data.orders || []);
      } catch (err) {
        if (err.response?.status === 403) {
          setError('You need admin privileges to view orders');
        } else if (err.response?.status === 401) {
          setError('You need to be logged in as admin to view orders');
        } else {
          setError('Failed to fetch orders');
          console.error("Error fetching orders:", err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);


  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('You need to be logged in as admin to update orders');
        return;
      }
      
      const response = await axios.patch(`http://localhost:5000/api/orders/${orderId}/status`,
        { status: newStatus },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      
      // Update the orders state with the updated order
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
      
      // If there's a selected order, update it too
      if (selectedOrder && selectedOrder._id === orderId) {
        setSelectedOrder({ ...selectedOrder, status: newStatus });
      }
      
      return response.data;
    } catch (err) {
      console.error("Error updating order status:", err);
      setError('Failed to update order status');
      throw err;
    }
  };

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
        {loading && (
          <div className="flex justify-center py-8">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading dashboard data...</p>
            </div>
          </div>
        )}
        
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center text-red-700">
              <div className="font-medium">Error: {error}</div>
            </div>
          </div>
        )}
        
        {!loading && !error && <StatsCards />}
        
        {selectedOrder && (
          <OrderDetailModal
            selectedOrder={selectedOrder}
            setSelectedOrder={setSelectedOrder}
            updateOrderStatus={updateOrderStatus}
          />
        )}

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

    </div>
  )
}