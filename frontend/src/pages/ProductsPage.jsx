"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Input } from "../components/ui/input"
import { ShoppingCart, Filter, Grid, List, Search } from "lucide-react"
import axios from "axios"

export default function ProductsPage() {
  const [viewMode, setViewMode] = useState("grid")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedModel, setSelectedModel] = useState("all")
  const [priceRange, setPriceRange] = useState([0, 3000])
  const [sortBy, setSortBy] = useState("featured")
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log("Fetching products...")
        // If a model is selected, filter by that model, otherwise fetch all products
        const url =
          selectedModel && selectedModel !== "all"
            ? `http://localhost:5000/api/products/filter?model=${selectedModel}`
            : "http://localhost:5000/api/products"

        const response = await axios.get(url)
        console.log("Full response:", response)
        console.log("Response data:", response.data)
        console.log("Is response.data an array?", Array.isArray(response.data))

        setProducts(response.data)
        setLoading(false)
      } catch (err) {
        console.error("API Error:", err)
        console.error("Error response:", err.response?.data)
        setError("Failed to load products")
        setLoading(false)
      }
    }

    fetchProducts()
  }, [selectedModel])

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.model.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]

    return matchesSearch && matchesPrice
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "rating":
        return b.rating - a.rating
      case "name":
        return a.name.localeCompare(b.name)
      default:
        return 0
    }
  })

  // Extract unique models for filters
  const uniqueModels = [...new Set(products.map((product) => product.model))]

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500 mx-auto"></div>
          <p className="mt-4 text-gray-300">Loading products...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center text-red-400">
          <h3 className="text-xl font-medium">Error loading products</h3>
          <p className="mt-2">{error}</p>
          <Button className="mt-4 bg-red-600 hover:bg-red-700 text-white" onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">Our Laptops</h1>
              <p className="text-gray-300 mt-2">Discover the perfect laptop for your needs</p>
            </div>
            <Link to="/">
              <Button
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white bg-transparent"
              >
                ← Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-4 bg-gray-800 border-gray-700">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center text-white">
                    <Filter className="w-5 h-5 mr-2 text-red-500" />
                    Filters
                  </h3>
                </div>

                {/* Search */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Search</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="Search laptops..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-red-500"
                    />
                  </div>
                </div>

                {/* Model Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Brand</label>
                  <select
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    className="w-full p-2 border border-gray-600 rounded-md bg-gray-700 text-white focus:border-red-500"
                  >
                    <option value="all">All Brands</option>
                    {uniqueModels.map((model) => (
                      <option key={model} value={model}>
                        {model}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price Range */}
                <div className="space-y-4">
                  <label className="text-sm font-medium text-gray-300">
                    Price Range: ${priceRange[0]} - ${priceRange[1]}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="3000"
                    step="100"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number.parseInt(e.target.value)])}
                    className="w-full accent-red-500"
                  />
                </div>
              </div>
            </Card>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6 bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-700">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-300">{sortedProducts.length} products found</span>
              </div>

              <div className="flex items-center space-x-4">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="p-2 border border-gray-600 rounded-md bg-gray-700 text-white focus:border-red-500"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name">Name A-Z</option>
                </select>

                <div className="flex border border-gray-600 rounded-lg">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className={
                      viewMode === "grid"
                        ? "bg-red-600 hover:bg-red-700 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
                    }
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className={
                      viewMode === "list"
                        ? "bg-red-600 hover:bg-red-700 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
                    }
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Products */}
            <div className={viewMode === "grid" ? "grid md:grid-cols-2 xl:grid-cols-3 gap-6" : "space-y-6"}>
              {sortedProducts.map((product) => (
                <Card
                  key={product._id}
                  className={`group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-700 bg-gray-800 hover:border-red-500/50 ${
                    viewMode === "list" ? "flex" : ""
                  } ${product.stock <= 0 ? "opacity-75" : ""}`}
                >
                  <div className={`relative overflow-hidden ${viewMode === "list" ? "w-48 flex-shrink-0" : ""}`}>
                    {product.stock <= 0 && (
                      <Badge className="absolute top-3 left-3 z-10 bg-red-600 text-white shadow-sm">Out of Stock</Badge>
                    )}
                    <div
                      className={`bg-gray-700 ${viewMode === "list" ? "w-full h-full" : "w-full h-48"} flex items-center justify-center`}
                    >
                      {product.imageUrl ? (
                        <img
                          src={product.imageUrl || "/placeholder.svg"}
                          alt={product.name}
                          className={`object-cover group-hover:scale-105 transition-transform duration-300 ${
                            viewMode === "list" ? "w-full h-full" : "w-full h-full"
                          }`}
                        />
                      ) : (
                        <div className="bg-gray-600 border-2 border-dashed border-gray-500 rounded-xl w-full h-full flex items-center justify-center text-gray-400">
                          No Image
                        </div>
                      )}
                    </div>
                  </div>

                  <CardContent className={`p-5 ${viewMode === "list" ? "flex-1" : ""}`}>
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <Badge
                          variant="secondary"
                          className="text-xs font-medium bg-gray-700 text-gray-300 border-gray-600"
                        >
                          {product.model}
                        </Badge>
                        <span className="text-sm text-gray-400 font-medium">{product.model}</span>
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-lg font-semibold text-white leading-tight group-hover:text-red-400 transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-sm text-gray-400 line-clamp-2">{product.description}</p>
                      </div>

                      <div className="pt-3 border-t border-gray-700">
                        <div className="mb-3">
                          <div className="flex items-baseline space-x-2">
                            <span className="text-2xl font-bold text-white">${product.price}</span>
                          </div>
                          <div className="text-sm text-gray-400 mt-1">
                            {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
                          </div>
                        </div>

                        <div className="flex space-x-2">
                          <Link to={`/products/${product._id}`} className="flex-1">
                            <Button
                              size="sm"
                              variant="outline"
                              className="w-full text-sm bg-transparent border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white hover:border-gray-500"
                            >
                              View Details
                            </Button>
                          </Link>
                          <Link to={`/cart?productId=${product._id}&quantity=1`} className="flex-1">
                            <Button
                              size="sm"
                              className="w-full bg-red-600 hover:bg-red-700 text-white text-sm"
                              disabled={product.stock <= 0}
                            >
                              <ShoppingCart className="w-4 h-4 mr-1" />
                              {product.stock > 0 ? "Add to Cart" : "Sold Out"}
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {sortedProducts.length === 0 && !loading && (
              <div className="text-center py-12">
                <div className="text-gray-400 text-lg">No laptops found matching your criteria</div>
                <Button
                  className="mt-4 bg-red-600 hover:bg-red-700 text-white"
                  onClick={() => {
                    setSearchTerm("")
                    setSelectedModel("all")
                    setPriceRange([0, 3000])
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
