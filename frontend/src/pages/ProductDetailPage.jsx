import React, { useState } from "react"
import { useParams, Link } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { ShoppingCart, Star, Heart, Share2, Truck, Shield, RotateCcw, Phone } from 'lucide-react'

// Mock data - in real app this would come from API
const laptop = {
  id: 1,
  name: 'MacBook Pro 16"',
  brand: "Apple",
  price: 2499,
  originalPrice: 2799,
  images: [
    "https://via.placeholder.com/600x500?text=MacBook+Pro+Front",
    "https://via.placeholder.com/600x500?text=MacBook+Pro+Side",
    "https://via.placeholder.com/600x500?text=MacBook+Pro+Back",
    "https://via.placeholder.com/600x500?text=MacBook+Pro+Open",
  ],
  rating: 4.9,
  reviews: 1247,
  category: "Professional",
  inStock: true,
  stockCount: 15,
  description:
    "The MacBook Pro 16-inch is designed for professionals who demand the ultimate in performance and portability. With the powerful M3 Pro chip, stunning Liquid Retina XDR display, and all-day battery life, it's perfect for creative professionals, developers, and power users.",
  specs: {
    processor: "Apple M3 Pro chip with 12-core CPU",
    memory: "32GB unified memory",
    storage: "1TB SSD storage",
    display: "16-inch Liquid Retina XDR display",
    graphics: "18-core GPU",
    battery: "Up to 22 hours video playback",
    weight: "4.7 pounds (2.15 kg)",
    dimensions: "14.01 x 9.77 x 0.66 inches",
  },
  features: [
    "M3 Pro chip for incredible performance",
    "Liquid Retina XDR display with 1000 nits sustained brightness",
    "1080p FaceTime HD camera",
    "Six-speaker sound system with force-cancelling woofers",
    "Studio-quality three-microphone array",
    "MagSafe 3 charging port",
    "Three Thunderbolt 4 ports",
    "HDMI port and SDXC card slot",
  ],
}

export default function ProductDetailPage() {
  const { id } = useParams()
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState("specs")

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-blue-600">
              Home
            </Link>
            <span>/</span>
            <Link to="/products" className="hover:text-blue-600">
              Products
            </Link>
            <span>/</span>
            <span className="text-gray-900">{laptop.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-2xl bg-white shadow-lg">
              <img
                src={laptop.images[selectedImage] || "/placeholder.svg"}
                alt={laptop.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {laptop.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square overflow-hidden rounded-lg border-2 transition-all ${
                    selectedImage === index ? "border-blue-600" : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`${laptop.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge className="bg-blue-100 text-blue-700">{laptop.category}</Badge>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="icon">
                    <Heart className="w-5 h-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Share2 className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              <h1 className="text-3xl font-bold text-gray-900">{laptop.name}</h1>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(laptop.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-lg font-medium">{laptop.rating}</span>
                <span className="text-gray-600">({laptop.reviews} reviews)</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="text-4xl font-bold text-gray-900">${laptop.price}</span>
                <span className="text-xl text-gray-500 line-through">${laptop.originalPrice}</span>
                <Badge className="bg-green-100 text-green-700">Save ${laptop.originalPrice - laptop.price}</Badge>
              </div>

              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${laptop.inStock ? "bg-green-500" : "bg-red-500"}`} />
                <span className={`font-medium ${laptop.inStock ? "text-green-700" : "text-red-700"}`}>
                  {laptop.inStock ? `In Stock (${laptop.stockCount} available)` : "Out of Stock"}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-gray-600 leading-relaxed">{laptop.description}</p>
            </div>

            {/* Add to Cart Section */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                      className="h-9 w-9 p-0"
                    >
                      -
                    </Button>
                    <span className="text-lg font-semibold px-3 py-1 bg-gray-50 rounded min-w-[3rem] text-center">
                      {quantity}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setQuantity(quantity + 1)}
                      disabled={quantity >= laptop.stockCount}
                      className="h-9 w-9 p-0"
                    >
                      +
                    </Button>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600">Total Price</div>
                    <div className="text-xl font-bold text-gray-900">${(laptop.price * quantity).toLocaleString()}</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Link to={`/cart?productId=${laptop.id}&quantity=${quantity}`}>
                    <Button
                      size="lg"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 shadow-sm"
                      disabled={!laptop.inStock}
                    >
                      <ShoppingCart className="w-5 h-5 mr-2" />
                      {laptop.inStock ? "Add to Cart" : "Out of Stock"}
                    </Button>
                  </Link>
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full py-3 border-gray-300 hover:bg-gray-50 bg-transparent"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    Call to Order
                  </Button>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <Truck className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="text-sm font-medium">Free Shipping</div>
                <div className="text-xs text-gray-600">2-3 business days</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <Shield className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <div className="text-sm font-medium">2 Year Warranty</div>
                <div className="text-xs text-gray-600">Full coverage</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <RotateCcw className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <div className="text-sm font-medium">30-Day Returns</div>
                <div className="text-xs text-gray-600">No questions asked</div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <div className="w-full">
            <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-8">
              {["specs", "features", "reviews"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                    activeTab === tab
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {tab === "specs" && "Specifications"}
                  {tab === "features" && "Features"}
                  {tab === "reviews" && "Reviews"}
                </button>
              ))}
            </div>

            {activeTab === "specs" && (
              <Card>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6">Technical Specifications</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    {Object.entries(laptop.specs).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-3 border-b border-gray-100">
                        <span className="font-medium text-gray-700 capitalize">
                          {key.replace(/([A-Z])/g, " $1").trim()}
                        </span>
                        <span className="text-gray-900">{value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === "features" && (
              <Card>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6">Key Features</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {laptop.features.map((feature, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === "reviews" && (
              <Card>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6">Customer Reviews</h3>
                  <div className="space-y-6">
                    {[1, 2, 3].map((review) => (
                      <div key={review} className="border-b border-gray-100 pb-6">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium">
                              U{review}
                            </div>
                            <div>
                              <div className="font-medium">User {review}</div>
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                                ))}
                              </div>
                            </div>
                          </div>
                          <span className="text-sm text-gray-600">2 days ago</span>
                        </div>
                        <p className="text-gray-700">
                          Excellent laptop! The performance is outstanding and the build quality is top-notch. Highly
                          recommend for professional use.
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
