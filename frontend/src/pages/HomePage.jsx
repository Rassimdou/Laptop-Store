import { useEffect, useState, useRef } from "react"
import { Link } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { ShoppingCart, Star, Zap, Shield, Truck, ArrowRight, Menu, X, User } from "lucide-react"

import axios from "axios"

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [featuredLaptops, setFeaturedLaptops] = useState([])
  const [user, setUser] = useState(null)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const userMenuRef = useRef(null)

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

    // Close user menu when clicking outside
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  useEffect(() => {
    const featuredLaptops = async () => {
      try {
        const response = await axios.get("https://laptop-store-1-q41h.onrender.com/products/latest") // Adjust the endpoint as needed
        setFeaturedLaptops(response.data)
      } catch (error) {
        console.error("Error fetching featured laptops:", error)
      }
    }
    featuredLaptops()
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setUser(null)
    setIsUserMenuOpen(false)
    // Redirect to home page
    window.location.href = "/"
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Navigation - same style as before */}
      <nav className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-red-600 to-red-500 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-red-500 to-red-400 bg-clip-text text-transparent">
                LaptopHub
              </span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-300 hover:text-red-400 transition-colors">
                Home
              </Link>
              <Link to="/products" className="text-gray-300 hover:text-red-400 transition-colors">
                Products
              </Link>
              <Link to="/about" className="text-gray-300 hover:text-red-400 transition-colors">
                About
              </Link>
              <Link to="/admin" className="text-gray-300 hover:text-red-400 transition-colors">
                Admin
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <div className="hidden md:flex space-x-2">
                {user ? (
                  <div className="relative" ref={userMenuRef}>
                    <Button
                      variant="ghost"
                      className="flex items-center space-x-2 text-gray-300 hover:text-red-400 hover:bg-gray-800"
                      onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    >
                      <User className="w-5 h-5" />
                      <span>{user.name}</span>
                    </Button>
                    {isUserMenuOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 z-50 border border-gray-700">
                        <Link
                          to="/my-orders"
                          className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-red-400"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          My Orders
                        </Link>
                        {user.role === "admin" && (
                          <Link
                            to="/admin"
                            className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-red-400"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            Admin Dashboard
                          </Link>
                        )}
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-red-400"
                        >
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    <Link to="/login">
                      <Button className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white">
                        Login
                      </Button>
                    </Link>
                    <Link to="/register">
                      <Button
                        variant="outline"
                        className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white bg-transparent"
                      >
                        Register
                      </Button>
                    </Link>
                  </>
                )}
              </div>
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
          <div className="md:hidden bg-slate-800 border-t border-gray-700">
            <div className="px-4 py-4 space-y-3">
              {/* Navigation Links */}
              <Link
                to="/"
                className="block py-2 text-base font-medium text-gray-300 hover:text-white transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>

              <Link
                to="/products"
                className="block py-2 text-base font-medium text-gray-300 hover:text-white transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Products
              </Link>

              <Link
                to="/about"
                className="block py-2 text-base font-medium text-gray-300 hover:text-white transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>

              {/* User Actions */}
              {user ? (
                <>
                  <div className="border-t border-gray-700 pt-3 mt-3">
                    <div className="flex items-center py-2">
                      <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center">
                        <User className="w-4 h-4 text-gray-300" />
                      </div>
                      <span className="ml-3 text-base font-medium text-white">{user.name}</span>
                    </div>
                  </div>

                  <Link
                    to="/my-orders"
                    className="block py-2 text-base font-medium text-gray-300 hover:text-white transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    My Orders
                  </Link>

                  {user.role === "admin" && (
                    <Link
                      to="/admin"
                      className="block py-2 text-base font-medium text-gray-300 hover:text-white transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Admin Dashboard
                    </Link>
                  )}

                  <button
                    onClick={() => {
                      handleLogout()
                      setMobileMenuOpen(false)
                    }}
                    className="block w-full text-left py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-slate-600 transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <div className="border-t border-gray-700 pt-3 mt-3 space-y-2">
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-base font-medium text-gray-300 hover:text-white hover:bg-slate-700"
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

      {/* Compact Hero Section */}
      <section className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 py-8 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4">
            <Badge className="bg-red-600/20 text-red-400 border border-red-600/30">🚀 New Collection Available</Badge>
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              Premium Laptops for <span className="text-red-400">Every Need</span>
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Discover high-performance laptops from top brands. Perfect for work, gaming, and everything in between.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
              <Link to="/products">
                <Button size="lg" className="bg-red-600 hover:bg-red-700 px-8 text-white">
                  Shop Now
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              
            </div>
          </div>
        </div>
      </section>

      {/* Quick Features Bar */}
      <section className="bg-gray-800 border-b border-gray-700 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center space-x-8 text-sm">
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-green-400" />
              <span className="text-gray-300">2 Year Warranty</span>
            </div>
            <div className="flex items-center space-x-2">
              <Truck className="w-5 h-5 text-red-400" />
              <span className="text-gray-300">Free Shipping</span>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-yellow-400" />
              <span className="text-gray-300">Expert Support</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <Badge className="bg-red-600/20 text-red-400 border border-red-600/30">Featured Collection</Badge>
            <h2 className="text-3xl font-bold text-white">Handpicked for Excellence</h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Our most popular laptops, chosen by thousands of satisfied customers
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredLaptops.map((laptop, index) => (
              <Card
                key={laptop._id}
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-700 bg-gray-800 overflow-hidden hover:border-red-600/50"
              >
                <div className="relative overflow-hidden bg-gray-700">
                  {laptop.stock <= 0 && (
                    <Badge className="absolute top-3 left-3 z-10 bg-red-600 text-white shadow-sm">Out of Stock</Badge>
                  )}
                  <div className="bg-gray-700 w-full h-48 flex items-center justify-center">
                    {laptop.imageUrl ? (
                      <img
                        src={laptop.imageUrl || "/placeholder.svg"}
                        alt={laptop.name}
                        className="object-cover group-hover:scale-105 transition-transform duration-300 w-full h-full"
                      />
                    ) : (
                      <div className="bg-gray-600 border-2 border-dashed border-gray-500 rounded-xl w-full h-full flex items-center justify-center text-gray-400">
                        No Image
                      </div>
                    )}
                  </div>
                </div>

                <CardContent className="p-5 space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-start justify-between">
                      <Badge
                        variant="secondary"
                        className="text-xs font-medium bg-gray-700 text-gray-300 border-gray-600"
                      >
                        {laptop.model}
                      </Badge>
                      <span className="text-sm text-gray-400 font-medium">{laptop.brand}</span>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-white leading-tight group-hover:text-red-400 transition-colors">
                        {laptop.name}
                      </h3>
                      <p className="text-sm text-gray-400 line-clamp-2">{laptop.description}</p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(laptop.rating || 0) ? "text-yellow-400 fill-current" : "text-gray-600"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-400">({laptop.reviews || 0})</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-gray-700">
                    <div className="mb-3">
                      <div className="flex items-baseline space-x-2">
                        <span className="text-xl font-bold text-white">${laptop.price}</span>
                      </div>
                      <div className="text-sm text-gray-400 mt-1">
                        {laptop.stock > 0 ? `${laptop.stock} in stock` : "Out of stock"}
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Link to={`/products/${laptop._id}`} className="flex-1">
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-full text-sm bg-transparent border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
                        >
                          View Details
                        </Button>
                      </Link>
                      <Link to={`/cart?productId=${laptop._id}&quantity=1`} className="flex-1">
                        <Button
                          size="sm"
                          className="w-full bg-red-600 hover:bg-red-700 text-sm text-white"
                          disabled={laptop.stock <= 0}
                        >
                          <ShoppingCart className="w-4 h-4 mr-1" />
                          {laptop.stock > 0 ? "Add to Cart" : "Sold Out"}
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/products">
              <Button
                size="lg"
                variant="outline"
                className="px-8 border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white bg-transparent"
              >
                View All Products
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold text-white">Why Choose LaptopHub?</h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              We're committed to providing the best laptop shopping experience
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Quality Guarantee",
                description: "All laptops come with comprehensive warranty and quality assurance",
              },
              {
                icon: Truck,
                title: "Fast Delivery",
                description: "Free shipping on all orders with express delivery options available",
              },
              {
                icon: Zap,
                title: "Expert Support",
                description: "Our tech experts are here to help you find the perfect laptop",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="text-center space-y-4 p-6 rounded-xl bg-gray-900 border border-gray-700 hover:border-red-600/50 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-red-600 to-red-500 rounded-xl flex items-center justify-center mx-auto">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-red-600 to-red-500">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white">Ready to Find Your Perfect Laptop?</h2>
            <p className="text-lg text-red-100">
              Browse our complete collection and discover the laptop that matches your needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/products">
                <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100 px-8">
                  Shop All Laptops
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-red-600 to-red-500 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">LaptopHub</span>
              </div>
              <p className="text-gray-400">Your trusted partner for premium laptops and exceptional service.</p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-red-400">Products</h3>
              <div className="space-y-2 text-gray-400">
                <div className="hover:text-red-400 transition-colors cursor-pointer">Gaming Laptops</div>
                <div className="hover:text-red-400 transition-colors cursor-pointer">Business Laptops</div>
                <div className="hover:text-red-400 transition-colors cursor-pointer">Student Laptops</div>
                <div className="hover:text-red-400 transition-colors cursor-pointer">Workstations</div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-red-400">Support</h3>
              <div className="space-y-2 text-gray-400">
                <div className="hover:text-red-400 transition-colors cursor-pointer">Contact Us</div>
                <div className="hover:text-red-400 transition-colors cursor-pointer">Warranty</div>
                <div className="hover:text-red-400 transition-colors cursor-pointer">Returns</div>
                <div className="hover:text-red-400 transition-colors cursor-pointer">FAQ</div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-red-400">Company</h3>
              <div className="space-y-2 text-gray-400">
                <div className="hover:text-red-400 transition-colors cursor-pointer">About Us</div>
                <div className="hover:text-red-400 transition-colors cursor-pointer">Careers</div>
                <div className="hover:text-red-400 transition-colors cursor-pointer">Privacy Policy</div>
                <div className="hover:text-red-400 transition-colors cursor-pointer">Terms of Service</div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 LaptopHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}