import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { TrendingUp } from 'lucide-react'

export default function AnalyticsTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Sales Analytics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center py-12">
          <TrendingUp className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Analytics Dashboard</h3>
          <p className="text-gray-600">Track sales performance, revenue trends, and customer insights.</p>
          <Button className="mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
            View Analytics
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}