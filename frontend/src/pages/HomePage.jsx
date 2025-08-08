import React, { useEffect , useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { ShoppingCart, Star, Zap, Shield, Truck, ArrowRight, Menu, X } from 'lucide-react'

import axios from 'axios'

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [featuredLaptops, setFeaturedLaptops] = useState([])


      useEffect(() => {
      const featuredLaptops = async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/products/latest') // Adjust the endpoint as needed
          setFeaturedLaptops(response.data);
         
        } catch (error) {
          console.error('Error fetching featured laptops:', error)
        }
      }
      featuredLaptops()
      }, [])

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                LaptopHub
              </span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">
                Home
              </Link>
              <Link to="/products" className="text-gray-700 hover:text-blue-600 transition-colors">
                Products
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-blue-600 transition-colors">
                About
              </Link>
              <Link to="/admin" className="text-gray-700 hover:text-blue-600 transition-colors">
                Admin
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="w-5 h-5" />
                <Badge className="absolute -top-2 -right-2 w-5 h-5 rounded-full p-0 flex items-center justify-center text-xs">
                  3
                </Badge>
              </Button>
              <Button className="hidden md:flex bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                Sign In
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Compact Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4">
            <Badge className="bg-blue-100 text-blue-700">🚀 New Collection Available</Badge>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              Premium Laptops for <span className="text-blue-600">Every Need</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover high-performance laptops from top brands. Perfect for work, gaming, and everything in between.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
              <Link to="/products">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 px-8">
                  Shop Now
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link to="/products">
                <Button size="lg" variant="outline" className="px-8">
                  View Catalog
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Features Bar */}
      <section className="bg-white border-b border-gray-100 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center space-x-8 text-sm">
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-green-600" />
              <span className="text-gray-700">2 Year Warranty</span>
            </div>
            <div className="flex items-center space-x-2">
              <Truck className="w-5 h-5 text-blue-600" />
              <span className="text-gray-700">Free Shipping</span>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-purple-600" />
              <span className="text-gray-700">Expert Support</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <Badge className="bg-indigo-100 text-indigo-700">Featured Collection</Badge>
            <h2 className="text-3xl font-bold text-gray-900">Handpicked for Excellence</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our most popular laptops, chosen by thousands of satisfied customers
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredLaptops.map((laptop, index) => (
              <Card
                key={laptop.id}
                className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-200 bg-white overflow-hidden"
              >
                <div className="relative overflow-hidden bg-gray-100">
                  <Badge className="absolute top-3 left-3 z-10 bg-blue-600 text-white text-xs shadow-sm">
                    {laptop.badge}
                  </Badge>
                  <img
                    src={laptop.image || "/placeholder.svg"}
                    alt={laptop.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <CardContent className="p-5 space-y-3">
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors leading-tight">
                      {laptop.name}
                    </h3>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(laptop.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">({laptop.reviews})</span>
                    </div>
                  </div>

                 

                  <div className="pt-3 border-t border-gray-100">
                    <div className="flex items-center justify-between mb-3">
                      <div className="space-y-1">
                        <div className="flex items-baseline space-x-2">
                          <span className="text-xl font-bold text-gray-900">${laptop.price}</span>
                          <span className="text-sm text-gray-500 line-through">${laptop.originalPrice}</span>
                        </div>
                        <div className="text-sm text-green-600 font-medium">
                          Save ${laptop.originalPrice - laptop.price}
                        </div>
                      </div>
                      <Link to={`/products/${laptop.id}`}>
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white px-4">
                          View
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
              <Button size="lg" variant="outline" className="px-8">
                View All Products
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Why Choose LaptopHub?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
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
                className="text-center space-y-4 p-6 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center mx-auto">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white">Ready to Find Your Perfect Laptop?</h2>
            <p className="text-lg text-blue-100">
              Browse our complete collection and discover the laptop that matches your needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/products">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8">
                  Shop All Laptops
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
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
    </div>
  )
}
