import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import { Input } from "../../components/ui/input"
import { Button } from "../../components/ui/button"
import { Search, Eye, Phone, CheckCircle, XCircle, Clock, Package } from 'lucide-react'


export default function OrdersTab({
  orders,
  setSelectedOrder,
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
}) {
  // Function to get status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-900/30 text-yellow-400 border-yellow-700"
      case "confirmed":
        return "bg-blue-900/30 text-blue-400 border-blue-700"
      case "shipped":
        return "bg-green-900/30 text-green-400 border-green-700"
      case "cancelled":
        return "bg-red-900/30 text-red-400 border-red-700"
      default:
        return "bg-gray-900/30 text-gray-400 border-gray-700"
    }
  }

  // Function to get status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4" />
      case "confirmed":
        return <CheckCircle className="w-4 h-4" />
      case "shipped":
        return <Package className="w-4 h-4" />
      case "cancelled":
        return <XCircle className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  // Function to format date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  // Filter orders based on search term and status
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      (order.clientId?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order._id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.products?.some((item) => item.productId?.name?.toLowerCase().includes(searchTerm.toLowerCase()))) ??
      false

    const matchesStatus = statusFilter === "all" || order.status === statusFilter

    return matchesSearch && matchesStatus
  })

  // Calculate total quantity for an order
  const getTotalQuantity = (products) => {
    return products?.reduce((total, item) => total + item.quantity, 0) || 0
  }

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader className="border-b border-gray-700">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <CardTitle className="text-2xl text-white">Order Management</CardTitle>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-red-500 focus:ring-red-500"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="shipped">Shipped</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="overflow-x-auto">
          {filteredOrders.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-400">No orders found</p>
            </div>
          ) : (
            <div className="min-w-full">
              <div className="hidden md:block">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-3 px-4 text-gray-300 font-medium">Order ID</th>
                      <th className="text-left py-3 px-4 text-gray-300 font-medium">Customer</th>
                      <th className="text-left py-3 px-4 text-gray-300 font-medium">Items</th>
                      <th className="text-left py-3 px-4 text-gray-300 font-medium">Total</th>
                      <th className="text-left py-3 px-4 text-gray-300 font-medium">Status</th>
                      <th className="text-left py-3 px-4 text-gray-300 font-medium">Date</th>
                      <th className="text-left py-3 px-4 text-gray-300 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map((order) => (
                      <tr key={order._id} className="border-b border-gray-700 hover:bg-gray-700/50">
                        <td className="py-3 px-4 font-mono text-sm text-gray-300">{order._id.substring(0, 8)}...</td>
                        <td className="py-3 px-4">
                          <div>
                            <div className="font-medium text-white">{order.clientId?.name || "Unknown"}</div>
                            <div className="text-sm text-gray-400">{order.clientId?.email || "No email"}</div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div>
                            <div className="font-medium text-white">
                              {order.products?.length || 0} {order.products?.length === 1 ? "item" : "items"}
                            </div>
                            <div className="text-sm text-gray-400">Qty: {getTotalQuantity(order.products)}</div>
                          </div>
                        </td>
                        <td className="py-3 px-4 font-medium text-white">${order.totalAmount?.toFixed(2) || "0.00"}</td>
                        <td className="py-3 px-4">
                          <Badge className={`${getStatusColor(order.status)} flex items-center space-x-1 w-fit border`}>
                            {getStatusIcon(order.status)}
                            <span className="capitalize">{order.status}</span>
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-gray-300">{formatDate(order.createdAt)}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setSelectedOrder(order)}
                              className="border-gray-600 text-gray-300 hover:bg-gray-600 hover:text-white"
                              aria-label="View order details"
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              View
                            </Button>
                            {order.clientId?.phone && (
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-green-600 text-green-400 hover:bg-green-600 hover:text-white bg-transparent"
                                asChild
                              >
                                <a href={`tel:${order.clientId.phone}`}>
                                  <Phone className="w-4 h-4 mr-1" />
                                  Call
                                </a>
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile view */}
              <div className="md:hidden space-y-4">
                {filteredOrders.map((order) => (
                  <div key={order._id} className="bg-gray-700 rounded-lg p-4 border border-gray-600">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="font-mono text-sm text-gray-300">#{order._id.substring(0, 8)}...</div>
                        <div className="font-medium text-white">{order.clientId?.name || "Unknown"}</div>
                        <div className="text-sm text-gray-400">{order.clientId?.email || "No email"}</div>
                      </div>
                      <Badge className={`${getStatusColor(order.status)} flex items-center space-x-1 border`}>
                        {getStatusIcon(order.status)}
                        <span className="capitalize">{order.status}</span>
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div>
                        <div className="text-sm text-gray-400">Items</div>
                        <div className="font-medium text-white">
                          {order.products?.length || 0} items (Qty: {getTotalQuantity(order.products)})
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-400">Total</div>
                        <div className="font-medium text-white">${order.totalAmount?.toFixed(2) || "0.00"}</div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-gray-400">{formatDate(order.createdAt)}</div>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setSelectedOrder(order)}
                          className="border-gray-600 text-gray-300 hover:bg-gray-600 hover:text-white"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        {order.clientId?.phone && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-green-600 text-green-400 hover:bg-green-600 hover:text-white bg-transparent"
                            asChild
                          >
                            <a href={`tel:${order.clientId.phone}`}>
                              <Phone className="w-4 h-4" />
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
