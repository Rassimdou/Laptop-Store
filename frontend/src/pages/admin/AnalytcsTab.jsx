import React, { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { TrendingUp, Loader2, DollarSign, ShoppingCart, Users } from 'lucide-react'
import axios from 'axios'


export default function AnalyticsTab() {
  const [analytics, setAnalytics] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalCustomers: 0,
    recentOrders: [],
    topProducts: [],
    salesData: [],
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true)
        // Get token from localStorage
        const token = localStorage.getItem("token")

        if (!token) {
          setError("You need to be logged in as admin to view analytics")
          setLoading(false)
          return
        }

        // Fetch real analytics data from backend
        const response = await axios.get("http://localhost:5000/api/orders/analytics", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        setAnalytics(response.data)
      } catch (err) {
        if (err.response?.status === 403) {
          setError("You need admin privileges to view analytics")
        } else if (err.response?.status === 401) {
          setError("You need to be logged in as admin to view analytics")
        } else {
          setError("Failed to fetch analytics data")
          console.error("Error fetching analytics:", err)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchAnalytics()
  }, [])

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-2xl text-white">Sales Analytics</CardTitle>
      </CardHeader>
      <CardContent>
        {loading && (
          <div className="flex justify-center py-8">
            <div className="text-center">
              <Loader2 className="w-12 h-12 animate-spin text-red-600 mx-auto" />
              <p className="mt-4 text-gray-300">Loading analytics data...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-900/20 border border-red-700 rounded-lg p-4 mb-6">
            <div className="flex items-center text-red-300">
              <div className="font-medium">Error: {error}</div>
            </div>
          </div>
        )}

        {!loading && !error && (
          <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-gray-700 border border-gray-600 rounded-lg p-4">
                <div className="flex items-center">
                  <DollarSign className="w-8 h-8 text-green-500" />
                  <div className="ml-3">
                    <div className="text-sm text-gray-300">Total Revenue</div>
                    <div className="text-2xl font-bold text-white">
                      ${(analytics.totalRevenue || 0).toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-700 border border-gray-600 rounded-lg p-4">
                <div className="flex items-center">
                  <ShoppingCart className="w-8 h-8 text-red-500" />
                  <div className="ml-3">
                    <div className="text-sm text-gray-300">Total Orders</div>
                    <div className="text-2xl font-bold text-white">{analytics.totalOrders || 0}</div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-700 border border-gray-600 rounded-lg p-4 sm:col-span-2 lg:col-span-1">
                <div className="flex items-center">
                  <Users className="w-8 h-8 text-blue-500" />
                  <div className="ml-3">
                    <div className="text-sm text-gray-300">Total Customers</div>
                    <div className="text-2xl font-bold text-white">{analytics.totalCustomers || 0}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-gray-700 border border-gray-600 rounded-lg p-4">
              <h3 className="text-lg font-medium text-white mb-4">Recent Orders</h3>
              <div className="space-y-3">
                {(analytics.recentOrders || []).map((order) => (
                  <div
                    key={order.id}
                    className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-gray-600 pb-3 last:border-0 last:pb-0 gap-2"
                  >
                    <div>
                      <div className="font-medium text-white">{order.customer || "Unknown Customer"}</div>
                      <div className="text-sm text-gray-300">{order.date || "Unknown Date"}</div>
                    </div>
                    <div className="text-left sm:text-right">
                      <div className="font-medium text-white">${(order.amount || 0).toFixed(2)}</div>
                      <div
                        className={`text-sm ${
                          order.status === "completed"
                            ? "text-green-400"
                            : order.status === "pending"
                              ? "text-yellow-400"
                              : "text-red-400"
                        }`}
                      >
                        {order.status || "Unknown"}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Products */}
            <div className="bg-gray-700 border border-gray-600 rounded-lg p-4">
              <h3 className="text-lg font-medium text-white mb-4">Top Selling Products</h3>
              <div className="space-y-3">
                {(analytics.topProducts || []).map((product, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div className="font-medium text-white">{product.name || "Unknown Product"}</div>
                    <div className="text-gray-300">{product.sales || 0} sales</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
