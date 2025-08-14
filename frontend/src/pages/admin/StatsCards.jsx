import React from "react"
import { Card, CardContent } from "../../components/ui/card"
import { ShoppingCart, Users, Package, DollarSign, TrendingUp } from 'lucide-react'


const stats = [
  {
    title: "Total Orders",
    value: "1,247",
    change: "+12%",
    icon: ShoppingCart,
    color: "text-red-500",
    bgColor: "bg-red-500/10",
  },
  {
    title: "Total Revenue",
    value: "$2,847,392",
    change: "+18%",
    icon: DollarSign,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
  {
    title: "Active Customers",
    value: "892",
    change: "+8%",
    icon: Users,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    title: "Products Sold",
    value: "3,421",
    change: "+23%",
    icon: Package,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
  },
]

export default function StatsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
      {stats.map((stat, index) => (
        <Card key={index} className="bg-gray-800 border-gray-700 hover:bg-gray-700/50 transition-colors duration-300">
          <CardContent className="p-4 lg:p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-400 truncate">{stat.title}</p>
                <p className="text-2xl lg:text-3xl font-bold text-white mt-2 truncate">{stat.value}</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1 flex-shrink-0" />
                  <span className="text-sm text-green-400 font-medium">{stat.change}</span>
                  <span className="text-sm text-gray-500 ml-1 hidden sm:inline">vs last month</span>
                </div>
              </div>
              <div className={`p-3 rounded-full ${stat.bgColor} ${stat.color} flex-shrink-0 ml-4`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
