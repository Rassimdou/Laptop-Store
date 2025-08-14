import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import { Button } from "../../components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { CheckCircle, XCircle, Phone, Mail, Package, Clock } from 'lucide-react'


export default function OrderDetailModal({ selectedOrder, setSelectedOrder, updateOrderStatus }) {
  const [manualStatus, setManualStatus] = useState("")
  const [isUpdating, setIsUpdating] = useState(false)

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-900/20 text-yellow-400 border-yellow-700"
      case "confirmed":
        return "bg-blue-900/20 text-blue-400 border-blue-700"
      case "shipped":
        return "bg-green-900/20 text-green-400 border-green-700"
      case "completed":
        return "bg-purple-900/20 text-purple-400 border-purple-700"
      case "cancelled":
        return "bg-red-900/20 text-red-400 border-red-700"
      default:
        return "bg-gray-900/20 text-gray-400 border-gray-700"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4" />
      case "confirmed":
        return <CheckCircle className="w-4 h-4" />
      case "shipped":
        return <Package className="w-4 h-4" />
      case "completed":
        return <CheckCircle className="w-4 h-4" />
      case "cancelled":
        return <XCircle className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  const validStatuses = [
    { value: "pending", label: "Pending" },
    { value: "confirmed", label: "Confirmed" },
    { value: "shipped", label: "Shipped" },
    { value: "completed", label: "Completed" },
    { value: "cancelled", label: "Cancelled" },
  ]

  const handleManualStatusUpdate = async () => {
    if (!manualStatus) return

    setIsUpdating(true)
    try {
      await updateOrderStatus(selectedOrder._id, manualStatus)
      setManualStatus("")
    } catch (error) {
      console.error("Error updating order status:", error)
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-gray-800 text-white border-gray-700">
        <CardHeader className="border-b border-gray-700">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl sm:text-2xl text-white">Order Details - {selectedOrder._id}</CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSelectedOrder(null)}
              className="text-white hover:bg-gray-700"
            >
              <XCircle className="w-5 h-5" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 space-y-6">
          {/* Customer Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Customer Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-400">Name</label>
                <p className="text-white">{selectedOrder.clientId?.name || "Unknown"}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-400">Email</label>
                <p className="text-white break-all">{selectedOrder.clientId?.email || "No email"}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-400">Phone</label>
                <p className="text-white">{selectedOrder.clientId?.phone || "No phone"}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-400">Order Date</label>
                <p className="text-white">{new Date(selectedOrder.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-400">Shipping Address</label>
              <p className="text-white">{selectedOrder.address || "No address"}</p>
            </div>
          </div>

          {/* Order Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Order Information</h3>
            <div className="bg-gray-700 p-4 rounded-lg">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-2">
                <span className="font-medium text-white">Order #{selectedOrder._id.substring(0, 8)}</span>
                <span className="text-gray-300">Items: {selectedOrder.products?.length || 0}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="text-2xl font-bold text-white">
                  ${selectedOrder.totalAmount?.toFixed(2) || "0.00"}
                </span>
                <Badge className={`${getStatusColor(selectedOrder.status)} flex items-center space-x-1 border`}>
                  {getStatusIcon(selectedOrder.status)}
                  <span className="capitalize">{selectedOrder.status}</span>
                </Badge>
              </div>
            </div>

            {/* Manual Status Update */}
            <div className="pt-4 border-t border-gray-700">
              <h4 className="text-md font-semibold text-white mb-3">Manual Status Update</h4>
              <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                <div className="w-full">
                  <Select value={manualStatus} onValueChange={setManualStatus}>
                    <SelectTrigger className="w-full bg-gray-700 text-white border-gray-600">
                      <SelectValue placeholder="Select new status" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 text-white border-gray-600">
                      {validStatuses.map((status) => (
                        <SelectItem
                          key={status.value}
                          value={status.value}
                          disabled={selectedOrder.status === status.value}
                        >
                          {status.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  className="bg-red-600 hover:bg-red-700 w-full sm:w-auto"
                  onClick={handleManualStatusUpdate}
                  disabled={!manualStatus || isUpdating}
                >
                  {isUpdating ? "Updating..." : "Update Status"}
                </Button>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Quick Actions</h3>
            <div className="flex flex-wrap gap-3">
              <Button
                className="bg-green-600 hover:bg-green-700 flex-1 sm:flex-none"
                onClick={() => updateOrderStatus(selectedOrder._id, "confirmed")}
                disabled={
                  selectedOrder.status === "confirmed" ||
                  selectedOrder.status === "shipped" ||
                  selectedOrder.status === "completed" ||
                  selectedOrder.status === "cancelled"
                }
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Confirm Order
              </Button>
              <Button
                className="bg-blue-600 hover:bg-blue-700 flex-1 sm:flex-none"
                onClick={() => updateOrderStatus(selectedOrder._id, "shipped")}
                disabled={
                  selectedOrder.status === "shipped" ||
                  selectedOrder.status === "completed" ||
                  selectedOrder.status === "cancelled"
                }
              >
                <Package className="w-4 h-4 mr-2" />
                Mark as Shipped
              </Button>
              <Button
                variant="outline"
                className="text-green-400 border-green-600 hover:text-green-500 hover:bg-green-900 bg-transparent flex-1 sm:flex-none"
              >
                <Phone className="w-4 h-4 mr-2" />
                Call Customer
              </Button>
              <Button
                variant="outline"
                className="text-blue-400 border-blue-600 hover:text-blue-500 hover:bg-blue-900 bg-transparent flex-1 sm:flex-none"
              >
                <Mail className="w-4 h-4 mr-2" />
                Send Email
              </Button>
              <Button
                variant="outline"
                className="text-red-400 border-red-600 hover:text-red-500 hover:bg-red-900 bg-transparent flex-1 sm:flex-none"
                onClick={() => updateOrderStatus(selectedOrder._id, "cancelled")}
                disabled={selectedOrder.status === "cancelled"}
              >
                <XCircle className="w-4 h-4 mr-2" />
                Cancel Order
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
