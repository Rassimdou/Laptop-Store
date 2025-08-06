import React, { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Input } from "../components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { Slider } from "../components/ui/slider"
import { ShoppingCart, Star, Filter, Grid, List, Search } from 'lucide-react'

const laptops = [
  {
    id: 1,
    name: 'MacBook Pro 16"',
    brand: "Apple",
    price: 2499,
    originalPrice: 2799,
    image: "https://via.placeholder.com/400x300?text=MacBook+Pro",
    rating: 4.9,
    reviews: 1247,
    specs: ["M3 Pro Chip", "32GB RAM", "1TB SSD", '16" Liquid Retina'],
    category: "Professional",
    inStock: true,
  },
  {
    id: 2,
    name: "Dell XPS 13 Plus",
    brand: "Dell",
    price: 1299,
    originalPrice: 1499,
    image: "https://via.placeholder.com/400x300?text=Dell+XPS+13",
    rating: 4.7,
    reviews: 892,
    specs: ["Intel i7-13700H", "16GB RAM", "512GB SSD", '13.4" OLED'],
    category: "Ultrabook",
    inStock: true,
  },
  {
    id: 3,
    name: "ASUS ROG Strix G15",
    brand: "ASUS",
    price: 1899,
    originalPrice: 2199,
    image: "https://via.placeholder.com/400x300?text=ASUS+ROG",
    rating: 4.8,
    reviews: 634,
    specs: ["AMD Ryzen 9", "32GB RAM", "1TB SSD", "RTX 4070"],
    category: "Gaming",
    inStock: true,
  },
  {
    id: 4,
    name: "ThinkPad X1 Carbon",
    brand: "Lenovo",
    price: 1599,
    originalPrice: 1899,
    image: "https://via.placeholder.com/400x300?text=ThinkPad+X1",
    rating: 4.6,
    reviews: 445,
    specs: ["Intel i7-13700U", "16GB RAM", "512GB SSD", '14" 2.8K'],
    category: "Business",
    inStock: false,
  },
  {
    id: 5,
    name: "HP Spectre x360",
    brand: "HP",
    price: 1399,
    originalPrice: 1599,
    image: "https://via.placeholder.com/400x300?text=HP+Spectre",
    rating: 4.5,
    reviews: 328,
    specs: ["Intel i7-1355U", "16GB RAM", "512GB SSD", '13.5" Touch'],
    category: "2-in-1",
    inStock: true,
  },
  {
    id: 6,
    name: "MSI Creator Z16P",
    brand: "MSI",
    price: 2299,
    originalPrice: 2599,
    image: "https://via.placeholder.com/400x300?text=MSI+Creator",
    rating: 4.7,
    reviews: 156,
    specs: ["Intel i9-13900H", "32GB RAM", "1TB SSD", "RTX 4060"],
    category: "Creative",
    inStock: true,
  },
]

export default function ProductsPage() {
  const [viewMode, setViewMode] = useState("grid")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedBrand, setSelectedBrand] = useState("all")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [priceRange, setPriceRange] = useState([0, 3000])
  const [sortBy, setSortBy] = useState("featured")

  const filteredLaptops = laptops.filter((laptop) => {
    const matchesSearch =
      laptop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      laptop.brand.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesBrand = selectedBrand === "all" || laptop.brand === selectedBrand
    const matchesCategory = selectedCategory === "all" || laptop.category === selectedCategory
    const matchesPrice = laptop.price >= priceRange[0] && laptop.price <= priceRange[1]

    return matchesSearch && matchesBrand && matchesCategory && matchesPrice
  })

  const sortedLaptops = [...filteredLaptops].sort((a, b) => {
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Our Laptops</h1>
              <p className="text-gray-600 mt-2">Discover the perfect laptop for your needs</p>
            </div>
            <Link to="/">
              <Button variant="outline">← Back to Home</Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-4">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <Filter className="w-5 h-5 mr-2" />
                    Filters
                  </h3>
                </div>

                {/* Search */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Search</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="Search laptops..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Brand Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Brand</label>
                  <select 
                    value={selectedBrand} 
                    onChange={(e) => setSelectedBrand(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="all">All Brands</option>
                    <option value="Apple">Apple</option>
                    <option value="Dell">Dell</option>
                    <option value="ASUS">ASUS</option>
                    <option value="Lenovo">Lenovo</option>
                    <option value="HP">HP</option>
                    <option value="MSI">MSI</option>
                  </select>
                </div>

                {/* Category Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Category</label>
                  <select 
                    value={selectedCategory} 
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="all">All Categories</option>
                    <option value="Gaming">Gaming</option>
                    <option value="Business">Business</option>
                    <option value="Professional">Professional</option>
                    <option value="Ultrabook">Ultrabook</option>
                    <option value="2-in-1">2-in-1</option>
                    <option value="Creative">Creative</option>
                  </select>
                </div>

                {/* Price Range */}
                <div className="space-y-4">
                  <label className="text-sm font-medium text-gray-700">
                    Price Range: ${priceRange[0]} - ${priceRange[1]}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="3000"
                    step="100"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full"
                  />
                </div>
              </div>
            </Card>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6 bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">{sortedLaptops.length} products found</span>
              </div>

              <div className="flex items-center space-x-4">
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                  className="p-2 border border-gray-300 rounded-md"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="name">Name A-Z</option>
                </select>

                <div className="flex border rounded-lg">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Products */}
            <div className={viewMode === "grid" ? "grid md:grid-cols-2 xl:grid-cols-3 gap-6" : "space-y-6"}>
              {sortedLaptops.map((laptop, index) => (
                <Card
                  key={laptop.id}
                  className={`group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-200 bg-white ${
                    viewMode === "list" ? "flex" : ""
                  } ${!laptop.inStock ? "opacity-75" : ""}`}
                >
                  <div className={`relative overflow-hidden ${viewMode === "list" ? "w-48 flex-shrink-0" : ""}`}>
                    {!laptop.inStock && (
                      <Badge className="absolute top-3 left-3 z-10 bg-red-500 text-white shadow-sm">Out of Stock</Badge>
                    )}
                    <div
                      className={`bg-gray-100 ${viewMode === "list" ? "w-full h-full" : "w-full h-48"} flex items-center justify-center`}
                    >
                      <img
                        src={laptop.image || "/placeholder.svg"}
                        alt={laptop.name}
                        className={`object-cover group-hover:scale-105 transition-transform duration-300 ${
                          viewMode === "list" ? "w-full h-full" : "w-full h-full"
                        }`}
                      />
                    </div>
                  </div>

                  <CardContent className={`p-5 ${viewMode === "list" ? "flex-1" : ""}`}>
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <Badge variant="secondary" className="text-xs font-medium bg-gray-100 text-gray-700">
                          {laptop.category}
                        </Badge>
                        <span className="text-sm text-gray-500 font-medium">{laptop.brand}</span>
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-lg font-semibold text-gray-900 leading-tight group-hover:text-blue-600 transition-colors">
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

                      <div className="space-y-1">
                        {laptop.specs.slice(0, 3).map((spec, i) => (
                          <div key={i} className="text-sm text-gray-600 flex items-center">
                            <span className="w-1 h-1 bg-gray-400 rounded-full mr-2"></span>
                            {spec}
                          </div>
                        ))}
                      </div>

                      <div className="pt-3 border-t border-gray-100">
                        <div className="flex items-center justify-between mb-3">
                          <div className="space-y-1">
                            <div className="flex items-baseline space-x-2">
                              <span className="text-2xl font-bold text-gray-900">${laptop.price}</span>
                              <span className="text-sm text-gray-500 line-through">${laptop.originalPrice}</span>
                            </div>
                            <div className="text-sm text-green-600 font-medium">
                              Save ${laptop.originalPrice - laptop.price}
                            </div>
                          </div>
                        </div>

                        <div className="flex space-x-2">
                          <Link to={`/products/${laptop.id}`} className="flex-1">
                            <Button size="sm" variant="outline" className="w-full text-sm bg-transparent">
                              View Details
                            </Button>
                          </Link>
                          <Link to={`/cart?productId=${laptop.id}&quantity=1`} className="flex-1">
                            <Button
                              size="sm"
                              className="w-full bg-blue-600 hover:bg-blue-700 text-sm"
                              disabled={!laptop.inStock}
                            >
                              <ShoppingCart className="w-4 h-4 mr-1" />
                              {laptop.inStock ? "Order" : "Sold Out"}
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {sortedLaptops.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 text-lg">No laptops found matching your criteria</div>
                <Button
                  className="mt-4"
                  onClick={() => {
                    setSearchTerm("")
                    setSelectedBrand("all")
                    setSelectedCategory("all")
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
