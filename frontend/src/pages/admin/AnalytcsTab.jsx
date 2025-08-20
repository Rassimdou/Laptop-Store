import React, { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Loader2, DollarSign, ShoppingCart, Users } from "lucide-react"
import axios from "axios"

export default function AnalyticsTab() {
  const [analytics, setAnalytics] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalCustomers: 0,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true)
        const token = localStorage.getItem("token")

        if (!token) {
          setError("You need to be logged in as admin to view analytics")
          setLoading(false)
          return
        }

        // Fetch each metric separately
        const [amountRes, ordersRes, usersRes] = await Promise.all([
          axios.get("https://laptop-store-1-q41h.onrender.com/analytics/total-amount", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("https://laptop-store-1-q41h.onrender.com/analytics/total-orders", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("https://laptop-store-1-q41h.onrender.com/analytics/total-users", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ])

        setAnalytics({
          totalRevenue: amountRes.data.totalAmount || 0,
          totalOrders: ordersRes.data.totalOrders || 0,
          totalCustomers: usersRes.data.totalUsers || 0,
        })
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Revenue */}
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

            {/* Orders */}
            <div className="bg-gray-700 border border-gray-600 rounded-lg p-4">
              <div className="flex items-center">
                <ShoppingCart className="w-8 h-8 text-red-500" />
                <div className="ml-3">
                  <div className="text-sm text-gray-300">Total Orders</div>
                  <div className="text-2xl font-bold text-white">
                    {analytics.totalOrders || 0}
                  </div>
                </div>
              </div>
            </div>

            {/* Users */}
            <div className="bg-gray-700 border border-gray-600 rounded-lg p-4">
              <div className="flex items-center">
                <Users className="w-8 h-8 text-blue-500" />
                <div className="ml-3">
                  <div className="text-sm text-gray-300">Total Customers</div>
                  <div className="text-2xl font-bold text-white">
                    {analytics.totalCustomers || 0}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
