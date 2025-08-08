import React from "react"
import { Zap } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">LaptopHub</span>
            </div>
            <p className="text-gray-400">Your trusted partner for premium laptops and exceptional service.</p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Products</h3>
            <div className="space-y-2 text-gray-400">
              <div>Gaming Laptops</div>
              <div>Business Laptops</div>
              <div>Student Laptops</div>
              <div>Workstations</div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Support</h3>
            <div className="space-y-2 text-gray-400">
              <div>Contact Us</div>
              <div>Warranty</div>
              <div>Returns</div>
              <div>FAQ</div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Company</h3>
            <div className="space-y-2 text-gray-400">
              <div>About Us</div>
              <div>Careers</div>
              <div>Privacy Policy</div>
              <div>Terms of Service</div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 LaptopHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
