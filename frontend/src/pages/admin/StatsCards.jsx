import React from "react"
import { Card, CardContent } from "../../components/ui/card"
import { ShoppingCart, Users, Package, DollarSign, TrendingUp } from 'lucide-react'

const stats = [
  {
    title: "Total Orders",
    value: "1,247",
    change: "+12%",
    icon: ShoppingCart,
    color: "text-blue-600",
  },
  {
    title: "Total Revenue",
    value: "$2,847,392",
    change: "+18%",
    icon: DollarSign,
    color: "text-green-600",
  },
  {
    title: "Active Customers",
    value: "892",
    change: "+8%",
    icon: Users,
    color: "text-purple-600",
  },
  {
    title: "Products Sold",
    value: "3,421",
    change: "+23%",
    icon: Package,
    color: "text-orange-600",
  },
]

export default function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600 font-medium">{stat.change}</span>
                  <span className="text-sm text-gray-500 ml-1">vs last month</span>
                </div>
              </div>
              <div className={`p-3 rounded-full bg-gray-100 ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}