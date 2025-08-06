import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { ShoppingCart, Star, Filter, Grid, List, Search } from 'lucide-react';
import axios from 'axios';

export default function ProductsPage() {
  const [viewMode, setViewMode] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 3000]);
  const [sortBy, setSortBy] = useState("featured");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products from backend API
  useEffect(() => {
  const fetchProducts = async () => {
    try {
      console.log('Fetching products...');
      const response = await axios.get('http://localhost:5000/api/products');
      console.log('Full response:', response);
      console.log('Response data:', response.data);
      console.log('Is response.data an array?', Array.isArray(response.data));
      
      setProducts(response.data);
      setLoading(false);
    } catch (err) {
      console.error('API Error:', err);
      console.error('Error response:', err.response?.data);
      setError('Failed to load products');
      setLoading(false);
    }
  };

  fetchProducts();
}, []);
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBrand = selectedBrand === "all" || product.brand === selectedBrand;
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];

    return matchesSearch && matchesBrand && matchesCategory && matchesPrice;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      case "name":
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  // Extract unique brands and categories for filters
  const uniqueBrands = [...new Set(products.map(product => product.brand))];
  const uniqueCategories = [...new Set(products.map(product => product.category))];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-700">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center text-red-500">
          <h3 className="text-xl font-medium">Error loading products</h3>
          <p className="mt-2">{error}</p>
          <Button 
            className="mt-4"
            onClick={() => window.location.reload()}
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

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
                    {uniqueBrands.map(brand => (
                      <option key={brand} value={brand}>{brand}</option>
                    ))}
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
                    {uniqueCategories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
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
                <span className="text-sm text-gray-600">{sortedProducts.length} products found</span>
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
              {sortedProducts.map((product) => (
                <Card
                  key={product._id}
                  className={`group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-200 bg-white ${
                    viewMode === "list" ? "flex" : ""
                  } ${product.stock <= 0 ? "opacity-75" : ""}`}
                >
                  <div className={`relative overflow-hidden ${viewMode === "list" ? "w-48 flex-shrink-0" : ""}`}>
                    {product.stock <= 0 && (
                      <Badge className="absolute top-3 left-3 z-10 bg-red-500 text-white shadow-sm">Out of Stock</Badge>
                    )}
                    <div
                      className={`bg-gray-100 ${viewMode === "list" ? "w-full h-full" : "w-full h-48"} flex items-center justify-center`}
                    >
                      {product.imageUrl ? (
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className={`object-cover group-hover:scale-105 transition-transform duration-300 ${
                            viewMode === "list" ? "w-full h-full" : "w-full h-full"
                          }`}
                        />
                      ) : (
                        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-full flex items-center justify-center text-gray-500">
                          No Image
                        </div>
                      )}
                    </div>
                  </div>

                  <CardContent className={`p-5 ${viewMode === "list" ? "flex-1" : ""}`}>
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <Badge variant="secondary" className="text-xs font-medium bg-gray-100 text-gray-700">
                          {product.category}
                        </Badge>
                        <span className="text-sm text-gray-500 font-medium">{product.brand}</span>
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-lg font-semibold text-gray-900 leading-tight group-hover:text-blue-600 transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
                      </div>

                      <div className="pt-3 border-t border-gray-100">
                        <div className="mb-3">
                          <div className="flex items-baseline space-x-2">
                            <span className="text-2xl font-bold text-gray-900">${product.price}</span>
                          </div>
                          <div className="text-sm text-gray-500 mt-1">
                            {product.stock > 0 
                              ? `${product.stock} in stock` 
                              : "Out of stock"}
                          </div>
                        </div>

                        <div className="flex space-x-2">
                          <Link to={`/products/${product._id}`} className="flex-1">
                            <Button size="sm" variant="outline" className="w-full text-sm bg-transparent">
                              View Details
                            </Button>
                          </Link>
                          <Link to={`/cart?productId=${product._id}&quantity=1`} className="flex-1">
                            <Button
                              size="sm"
                              className="w-full bg-blue-600 hover:bg-blue-700 text-sm"
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
  );
}