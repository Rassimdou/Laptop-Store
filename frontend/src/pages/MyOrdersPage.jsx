import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { ShoppingCart, User, ArrowLeft } from 'lucide-react';
import axios from 'axios';

"use client"


export default function MyOrdersPage() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (e) {
        console.error("Error parsing user data:", e)
      }
    }

    const fetchOrders = async () => {
      try {
        setLoading(true)
        const token = localStorage.getItem("token")

        if (!token) {
          setError("You need to be logged in to view your orders")
          setLoading(false)
          return
        }

        const response = await axios.get("https://laptop-store-1-q41h.onrender.com/orders/my-orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        setOrders(response.data.orders || [])
      } catch (err) {
        if (err.response?.status === 401) {
          setError("You need to be logged in to view your orders")
        } else {
          setError("Failed to fetch orders")
          console.error("Error fetching orders:", err)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [])

  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-yellow-900/50 text-yellow-300 border-yellow-700">Pending</Badge>
      case "confirmed":
        return <Badge className="bg-blue-900/50 text-blue-300 border-blue-700">Confirmed</Badge>
      case "shipped":
        return <Badge className="bg-indigo-900/50 text-indigo-300 border-indigo-700">Shipped</Badge>
      case "completed":
        return <Badge className="bg-green-900/50 text-green-300 border-green-700">Completed</Badge>
      case "cancelled":
        return <Badge className="bg-red-900/50 text-red-300 border-red-700">Cancelled</Badge>
      default:
        return <Badge className="bg-gray-700 text-gray-300 border-gray-600">Unknown</Badge>
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Please log in to view your orders</h2>
          <Link to="/login">
            <Button className="bg-red-600 hover:bg-red-700 text-white">Go to Login</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">My Orders</h1>
              <p className="text-gray-300 mt-2">View your order history and status</p>
            </div>
            <Link to="/">
              <Button
                variant="outline"
                className="flex items-center bg-gray-700 border-gray-600 text-gray-200 hover:bg-gray-600 hover:text-white"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading && (
          <div className="flex justify-center py-8">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
              <p className="mt-4 text-gray-300">Loading your orders...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-900/50 border border-red-700 rounded-lg p-4 mb-6">
            <div className="flex items-center text-red-300">
              <div className="font-medium">Error: {error}</div>
            </div>
          </div>
        )}

        {!loading && !error && orders.length === 0 && (
          <div className="text-center py-12">
            <ShoppingCart className="w-16 h-16 text-gray-500 mx-auto" />
            <h3 className="mt-4 text-xl font-medium text-white">No orders yet</h3>
            <p className="mt-2 text-gray-400">Looks like you haven't placed any orders yet.</p>
            <Link to="/products">
              <Button className="mt-4 bg-red-600 hover:bg-red-700 text-white">Start Shopping</Button>
            </Link>
          </div>
        )}

        {!loading && !error && orders.length > 0 && (
          <div className="space-y-6">
            <div className="grid gap-6">
              {orders.map((order) => (
                <Card key={order._id} className="overflow-hidden bg-gray-800 border-gray-700">
                  <div className="border-b border-gray-700 bg-gray-750 px-6 py-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-medium text-white">Order #{order._id.substring(0, 8)}</h3>
                        <p className="text-sm text-gray-400">
                          Placed on {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="text-lg font-bold text-white">${order.totalAmount.toFixed(2)}</span>
                        {getStatusBadge(order.status)}
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-6 bg-gray-800">
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-md font-medium text-white mb-2">Items</h4>
                        <div className="space-y-3">
                          {order.products.map((item, index) => (
                            <div key={index} className="flex items-center justify-between">
                              <div className="flex items-center">
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-white">
                                    {item.productId?.name || "Product Name"}
                                  </div>
                                  <div className="text-sm text-gray-400">Quantity: {item.quantity}</div>
                                </div>
                              </div>
                              <div className="text-sm font-medium text-white">
                                ${(item.productId?.price * item.quantity).toFixed(2)}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="border-t border-gray-700 pt-4">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-400">Shipping to:</span>
                          <span className="text-sm font-medium text-white">
                            {order.wilaya}, {order.address}
                          </span>
                        </div>
                        {order.notes && (
                          <div className="flex justify-between mt-2">
                            <span className="text-sm text-gray-400">Notes:</span>
                            <span className="text-sm font-medium text-white">{order.notes}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
