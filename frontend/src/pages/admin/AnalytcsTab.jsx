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
    salesData: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        // Get token from localStorage
        const token = localStorage.getItem('token');
        
        if (!token) {
          setError('You need to be logged in as admin to view analytics');
          setLoading(false);
          return;
        }
        
        // For now, we'll use mock data since we don't have a real analytics endpoint
        // In a real application, you would fetch this data from your backend
        const mockAnalytics = {
          totalRevenue: 125000,
          totalOrders: 342,
          totalCustomers: 128,
          recentOrders: [
            { id: '1', customer: 'John Doe', amount: 1299, status: 'completed', date: '2023-06-15' },
            { id: '2', customer: 'Jane Smith', amount: 2499, status: 'pending', date: '2023-06-14' },
            { id: '3', customer: 'Bob Johnson', amount: 899, status: 'shipped', date: '2023-06-13' },
          ],
          topProducts: [
            { name: 'MacBook Pro 16"', sales: 42 },
            { name: 'Dell XPS 15', sales: 38 },
            { name: 'HP Spectre x360', sales: 31 },
          ],
          salesData: [
            { month: 'Jan', revenue: 8500 },
            { month: 'Feb', revenue: 12000 },
            { month: 'Mar', revenue: 15000 },
            { month: 'Apr', revenue: 18000 },
            { month: 'May', revenue: 22000 },
            { month: 'Jun', revenue: 25000 },
          ]
        };
        
        setAnalytics(mockAnalytics);
      } catch (err) {
        if (err.response?.status === 403) {
          setError('You need admin privileges to view analytics');
        } else if (err.response?.status === 401) {
          setError('You need to be logged in as admin to view analytics');
        } else {
          setError('Failed to fetch analytics data');
          console.error("Error fetching analytics:", err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Sales Analytics</CardTitle>
      </CardHeader>
      <CardContent>
        {loading && (
          <div className="flex justify-center py-8">
            <div className="text-center">
              <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto" />
              <p className="mt-4 text-gray-600">Loading analytics data...</p>
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
        
        {!loading && !error && (
          <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center">
                  <DollarSign className="w-8 h-8 text-green-600" />
                  <div className="ml-3">
                    <div className="text-sm text-gray-600">Total Revenue</div>
                    <div className="text-2xl font-bold">${analytics.totalRevenue.toLocaleString()}</div>
                  </div>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center">
                  <ShoppingCart className="w-8 h-8 text-blue-600" />
                  <div className="ml-3">
                    <div className="text-sm text-gray-600">Total Orders</div>
                    <div className="text-2xl font-bold">{analytics.totalOrders}</div>
                  </div>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center">
                  <Users className="w-8 h-8 text-purple-600" />
                  <div className="ml-3">
                    <div className="text-sm text-gray-600">Total Customers</div>
                    <div className="text-2xl font-bold">{analytics.totalCustomers}</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Recent Orders */}
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Orders</h3>
              <div className="space-y-3">
                {analytics.recentOrders.map((order) => (
                  <div key={order.id} className="flex justify-between items-center border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                    <div>
                      <div className="font-medium">{order.customer}</div>
                      <div className="text-sm text-gray-600">{order.date}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">${order.amount}</div>
                      <div className={`text-sm ${
                        order.status === 'completed' ? 'text-green-600' : 
                        order.status === 'pending' ? 'text-yellow-600' : 'text-blue-600'
                      }`}>
                        {order.status}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Top Products */}
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Top Selling Products</h3>
              <div className="space-y-3">
                {analytics.topProducts.map((product, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div className="font-medium">{product.name}</div>
                    <div className="text-gray-600">{product.sales} sales</div>
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