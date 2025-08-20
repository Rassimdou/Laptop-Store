import React, { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { ShoppingCart, Star, Heart, Share2, Truck, Shield, RotateCcw, Phone, Loader2 } from 'lucide-react'
import axios from 'axios'

export default function ProductDetailPage() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`https://laptop-store-1-q41h.onrender.com/products/${id}`)
        setProduct(response.data)
        if (response.data.images && response.data.images.length > 0) {
          setSelectedImage(0)
        }
      } catch (err) {
        console.error("Error fetching product:", err)
        setError("Failed to load product details")
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchProduct()
    }
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-red-500 mx-auto" />
          <p className="mt-4 text-gray-300">Loading product details...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-400 text-xl font-medium">{error}</div>
          <Button className="mt-4 bg-red-600 hover:bg-red-700 text-white" onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-400 text-xl font-medium">Product not found</div>
          <Link to="/products">
            <Button className="mt-4 bg-red-600 hover:bg-red-700 text-white">Back to Products</Button>
          </Link>
        </div>
      </div>
    )
  }

  const laptop = {
    id: product._id,
    name: product.name,
    brand: product.brand,
    price: product.price,
    originalPrice: product.originalPrice || product.price,
    images: product.imageUrl ? [product.imageUrl] : ["/placeholder.svg"],

    model: product.model,
    inStock: product.stock > 0,
    stockCount: product.stock,
    description: product.description,
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Breadcrumb */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <Link to="/" className="hover:text-red-400 transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link to="/products" className="hover:text-red-400 transition-colors">
              Products
            </Link>
            <span>/</span>
            <span className="text-white">{laptop.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-2xl bg-gray-800 shadow-lg border border-gray-700">
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
                    selectedImage === index ? "border-red-500" : "border-gray-600 hover:border-gray-500"
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
                <Badge className="bg-red-600 text-white hover:bg-red-700">{laptop.model}</Badge>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="icon" className="text-gray-400 hover:text-red-400 hover:bg-gray-800">
                    <Heart className="w-5 h-5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-gray-400 hover:text-red-400 hover:bg-gray-800">
                    <Share2 className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              <h1 className="text-3xl font-bold text-white">{laptop.name}</h1>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
              
                </div>
                <span className="text-lg font-medium text-white">{laptop.rating}</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="text-4xl font-bold text-white">${laptop.price}</span>
                {laptop.originalPrice > laptop.price && (
                  <>
                    <span className="text-xl text-gray-500 line-through">${laptop.originalPrice}</span>
                    <Badge className="bg-green-600 text-white">
                      Save ${(laptop.originalPrice - laptop.price).toFixed(2)}
                    </Badge>
                  </>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${laptop.inStock ? "bg-green-500" : "bg-red-500"}`} />
                <span className={`font-medium ${laptop.inStock ? "text-green-400" : "text-red-400"}`}>
                  {laptop.inStock ? `In Stock (${laptop.stockCount} available)` : "Out of Stock"}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-gray-300 leading-relaxed">{laptop.description}</p>
            </div>

            {/* Add to Cart Section */}
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 shadow-sm">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                      className="h-9 w-9 p-0 border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
                    >
                      -
                    </Button>
                    <span className="text-lg font-semibold px-3 py-1 bg-gray-700 text-white rounded min-w-[3rem] text-center">
                      {quantity}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setQuantity(quantity + 1)}
                      disabled={quantity >= laptop.stockCount}
                      className="h-9 w-9 p-0 border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
                    >
                      +
                    </Button>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-400">Total Price</div>
                    <div className="text-xl font-bold text-white">${(laptop.price * quantity).toLocaleString()}</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Link to={`/cart?productId=${laptop.id}&quantity=${quantity}`}>
                    <Button
                      size="lg"
                      className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 shadow-sm"
                      disabled={!laptop.inStock}
                    >
                      <ShoppingCart className="w-5 h-5 mr-2" />
                      {laptop.inStock ? "Add to Cart" : "Out of Stock"}
                    </Button>
                  </Link>
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full py-3 border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white bg-transparent"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    Call to Order
                  </Button>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-gray-800 border border-gray-700 rounded-lg shadow-sm">
                <Truck className="w-8 h-8 text-red-500 mx-auto mb-2" />
                <div className="text-sm font-medium text-white">Free Shipping</div>
                <div className="text-xs text-gray-400">2-3 business days</div>
              </div>
              <div className="text-center p-4 bg-gray-800 border border-gray-700 rounded-lg shadow-sm">
                <Shield className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <div className="text-sm font-medium text-white">2 Year Warranty</div>
                <div className="text-xs text-gray-400">Full coverage</div>
              </div>
              <div className="text-center p-4 bg-gray-800 border border-gray-700 rounded-lg shadow-sm">
                <RotateCcw className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                <div className="text-sm font-medium text-white">30-Day Returns</div>
                <div className="text-xs text-gray-400">No questions asked</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}