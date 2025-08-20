import React, { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Users, Loader2 } from 'lucide-react'
import axios from "axios"



export default function CustomersTab() {
  const [customers, setCustomers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        setLoading(true)
        // Get token from localStorage
        const token = localStorage.getItem("token")

        if (!token) {
          setError("You need to be logged in as admin to view customers")
          setLoading(false)
          return
        }

        const response = await axios.get("https://laptop-store-1-q41h.onrender.com/api/clients", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setCustomers(response.data || [])
      } catch (err) {
        if (err.response?.status === 403) {
          setError("You need admin privileges to view customers")
        } else if (err.response?.status === 401) {
          setError("You need to be logged in as admin to view customers")
        } else {
          setError("Failed to fetch customers")
          console.error("Error fetching customers:", err)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchCustomers()
  }, [])

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-2xl text-white">Customer Management</CardTitle>
      </CardHeader>
      <CardContent>
        {loading && (
          <div className="flex justify-center py-8">
            <div className="text-center">
              <Loader2 className="w-12 h-12 animate-spin text-red-600 mx-auto" />
              <p className="mt-4 text-gray-300">Loading customers...</p>
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

        {!loading && !error && customers.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">No Customers Found</h3>
            <p className="text-gray-300">There are no customers in the system yet.</p>
          </div>
        )}

        {!loading && !error && customers.length > 0 && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {customers.map((customer) => (
                <div
                  key={customer._id}
                  className="bg-gray-700 border border-gray-600 rounded-lg p-4 hover:bg-gray-600 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-red-900/20 rounded-full flex items-center justify-center">
                      <Users className="w-5 h-5 text-red-400" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-medium text-white truncate">{customer.name}</div>
                      <div className="text-sm text-gray-300 truncate">{customer.email}</div>
                    </div>
                  </div>
                  <div className="mt-3 text-sm text-gray-300 space-y-1">
                    <div>Phone: {customer.phone}</div>
                    <div>
                      Role: <span className="capitalize">{customer.role}</span>
                    </div>
                    <div>Member since: {new Date(customer.createdAt).toLocaleDateString()}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
