import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import { Button } from "../../components/ui/button"
import { CheckCircle, XCircle, Phone, Mail, Package, Clock } from 'lucide-react'

export default function OrderDetailModal({ selectedOrder, setSelectedOrder, updateOrderStatus }) {
  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "confirmed":
        return "bg-blue-100 text-blue-800"
      case "shipped":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
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
      case "cancelled":
        return <XCircle className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-white/10 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-gray-900 text-white">
        <CardHeader className="border-b border-gray-700">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl text-white">Order Details - {selectedOrder.id}</CardTitle>
            <Button variant="ghost" size="icon" onClick={() => setSelectedOrder(null)} className="text-white hover:bg-gray-700">
              <XCircle className="w-5 h-5" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          {/* Customer Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Customer Information</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-400">Name</label>
                <p className="text-white">{selectedOrder.customer.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-400">Email</label>
                <p className="text-white">{selectedOrder.customer.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-400">Phone</label>
                <p className="text-white">{selectedOrder.customer.phone}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-400">Order Date</label>
                <p className="text-white">{selectedOrder.date}</p>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-400">Shipping Address</label>
              <p className="text-white">{selectedOrder.address}</p>
            </div>
          </div>

          {/* Order Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Order Information</h3>
            <div className="bg-gray-800 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-white">{selectedOrder.product}</span>
                <span className="text-gray-300">Qty: {selectedOrder.quantity}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-white">${selectedOrder.total.toLocaleString()}</span>
                <Badge className={`${getStatusColor(selectedOrder.status)} flex items-center space-x-1`}>
                  {getStatusIcon(selectedOrder.status)}
                  <span className="capitalize">{selectedOrder.status}</span>
                </Badge>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Actions</h3>
            <div className="flex flex-wrap gap-3">
              <Button
                className="bg-green-600 hover:bg-green-700"
                onClick={() => updateOrderStatus(selectedOrder.id, "confirmed")}
                disabled={selectedOrder.status !== "pending"}
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Confirm Order
              </Button>
              <Button
                className="bg-blue-600 hover:bg-blue-700"
                onClick={() => updateOrderStatus(selectedOrder.id, "shipped")}
                disabled={selectedOrder.status !== "confirmed"}
              >
                <Package className="w-4 h-4 mr-2" />
                Mark as Shipped
              </Button>
              <Button variant="outline" className="text-green-400 border-green-600 hover:text-green-500 hover:bg-green-900 bg-transparent">
                <Phone className="w-4 h-4 mr-2" />
                Call Customer
              </Button>
              <Button variant="outline" className="text-blue-400 border-blue-600 hover:text-blue-500 hover:bg-blue-900 bg-transparent">
                <Mail className="w-4 h-4 mr-2" />
                Send Email
              </Button>
              <Button
                variant="outline"
                className="text-red-400 border-red-600 hover:text-red-500 hover:bg-red-900 bg-transparent"
                onClick={() => updateOrderStatus(selectedOrder.id, "cancelled")}
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