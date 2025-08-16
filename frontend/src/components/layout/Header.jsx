"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { ShoppingCart, Zap, Menu, X, User, Package } from "lucide-react"


export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    // Check for user in localStorage
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (e) {
        console.error("Error parsing user data:", e)
      }
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setUser(null)
    setMobileMenuOpen(false)
    // Redirect to home page
    window.location.href = "/"
  }

  return (
    <nav className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-red-500 rounded-xl flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white hidden sm:block">LaptopHub</span>
            <span className="text-lg font-bold text-white sm:hidden">LH</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Link
              to="/"
              className="px-3 py-2 text-sm font-medium text-gray-300 hover:text-red-400 transition-colors rounded-md"
            >
              Home
            </Link>
            <Link
              to="/products"
              className="px-3 py-2 text-sm font-medium text-gray-300 hover:text-red-400 transition-colors rounded-md"
            >
              Products
            </Link>
            <Link
              to="/about"
              className="px-3 py-2 text-sm font-medium text-gray-300 hover:text-red-400 transition-colors rounded-md"
            >
              About
            </Link>
          </div>

          <div className="flex items-center space-x-2">
            {/* Orders Icon - visible on all screens */}
            <Link to="/my-orders">
              <Button
                variant="ghost"
                size="icon"
                className="relative text-gray-300 hover:text-red-400 hover:bg-gray-800"
              >
                <Package className="w-5 h-5" />
              </Button>
            </Link>

            {/* Cart Icon - visible on all screens */}
            <Link to="/cart">
              <Button
                variant="ghost"
                size="icon"
                className="relative text-gray-300 hover:text-red-400 hover:bg-gray-800"
              >
                <ShoppingCart className="w-5 h-5" />
                <Badge className="absolute -top-2 -right-2 w-5 h-5 rounded-full p-0 flex items-center justify-center text-xs bg-red-600 text-white">
                  3
                </Badge>
              </Button>
            </Link>

            {/* User Actions - Desktop */}
            <div className="hidden md:flex items-center space-x-2">
              {user ? (
                <>
                  <div className="flex items-center space-x-2 text-gray-300">
                    <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
                      <User className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium hidden lg:inline">{user.name}</span>
                  </div>
                  <Button
                    onClick={handleLogout}
                    variant="ghost"
                    className="text-sm font-medium text-gray-300 hover:text-red-400 hover:bg-gray-800"
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <Button
                      variant="ghost"
                      className="text-sm font-medium text-gray-300 hover:text-red-400 hover:bg-gray-800"
                    >
                      Login
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button className="text-sm font-medium bg-red-600 hover:bg-red-700 text-white">Register</Button>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-gray-300 hover:text-red-400 hover:bg-gray-800"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-900 border-t border-gray-800">
          <div className="px-4 py-4 space-y-3">
            {/* Navigation Links */}
            <Link
              to="/"
              className="block py-2 text-base font-medium text-gray-300 hover:text-red-400 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>

            <Link
              to="/products"
              className="block py-2 text-base font-medium text-red-400 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Products
            </Link>

            <Link
              to="/about"
              className="block py-2 text-base font-medium text-gray-300 hover:text-red-400 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>

            {/* User Actions */}
            {user ? (
              <>
                <div className="border-t border-gray-700 pt-3 mt-3">
                  <div className="flex items-center py-2">
                    <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
                      <User className="w-4 h-4 text-gray-300" />
                    </div>
                    <span className="ml-3 text-base font-medium text-white">{user.name}</span>
                  </div>
                </div>

                <Link
                  to="/my-orders"
                  className="block py-2 text-base font-medium text-gray-300 hover:text-red-400 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  My Orders
                </Link>

                {user.role === "admin" && (
                  <Link
                    to="/admin"
                    className="block py-2 text-base font-medium text-gray-300 hover:text-red-400 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Admin Dashboard
                  </Link>
                )}

                <button
                  onClick={handleLogout}
                  className="block w-full text-left py-2 text-base font-medium text-gray-300 hover:text-red-400 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="border-t border-gray-700 pt-3 mt-3 space-y-2">
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-base font-medium text-gray-300 hover:text-red-400 hover:bg-gray-800"
                  >
                    Login
                  </Button>
                </Link>
                <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full text-base font-medium bg-red-600 hover:bg-red-700 text-white">
                    Register
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
