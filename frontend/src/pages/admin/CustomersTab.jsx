import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Users } from 'lucide-react'
import axios from "axios"



export default function CustomersTab() {
  const [customers, setCustomers] = React.useState([]);
  React.useEffect(() => {
      const Customers = async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/clients') // Replace with your API endpoint
          setCustomers(response.data)
        } catch (error) {
          console.error("Error fetching orders:", error)
        }
      }

      customers()
    }, [])



  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Customer Management</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center py-12">
          <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Customer Database</h3>
          <p className="text-gray-600">
            View customer profiles, order history, and manage customer relationships.
          </p>
          <Button className="mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
            View All Customers
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
