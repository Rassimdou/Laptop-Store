import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Package } from 'lucide-react'

export default function ProductsTab() {

  //add new product functionality can be implemented here

  



  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Product Management</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center py-12">
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Product Management</h3>
          <p className="text-gray-600">Manage your laptop inventory, add new products, and update pricing.</p>
          <Button className="mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
            Add New Product
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
