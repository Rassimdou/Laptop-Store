import React, { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Package, Loader2, Plus, Edit, Trash2 } from 'lucide-react'
import axios from 'axios'


export default function ProductsTab() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [showEditForm, setShowEditForm] = useState(false)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const token = localStorage.getItem("token")

        if (!token) {
          setError("You need to be logged in as admin to view products")
          setLoading(false)
          return
        }

        const response = await axios.get("http://localhost:5000/api/products", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setProducts(response.data || [])
      } catch (err) {
        if (err.response?.status === 403) {
          setError("You need admin privileges to view products")
        } else if (err.response?.status === 401) {
          setError("You need to be logged in as admin to view products")
        } else {
          setError("Failed to fetch products")
          console.error("Error fetching products:", err)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const handleDeleteProduct = async (productId) => {
    try {
      const token = localStorage.getItem("token")
      if (!token) {
        setError("You need to be logged in as admin to delete products")
        return
      }

      await axios.delete(`http://localhost:5000/api/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      // Remove the product from the state
      setProducts((prevProducts) => prevProducts.filter((product) => product._id !== productId))
    } catch (err) {
      console.error("Error deleting product:", err)
      setError("Failed to delete product")
    }
  }

  const [newProduct, setNewProduct] = useState({
    name: "",
    model: "",
    description: "",
    price: "",
    stock: "",
    imageUrl: "",
    available: true,
  })

  const [editProduct, setEditProduct] = useState({
    _id: "",
    name: "",
    model: "",
    description: "",
    price: "",
    stock: "",
    imageUrl: "",
    available: true,
  })

  const handleAddProduct = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem("token")
      if (!token) {
        setError("You need to be logged in as admin to add products")
        return
      }

      // Convert price and stock to numbers
      const productData = {
        ...newProduct,
        price: Number.parseFloat(newProduct.price),
        stock: Number.parseInt(newProduct.stock),
      }

      const response = await axios.post("http://localhost:5000/api/products", productData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      // Add the new product to the state
      setProducts((prevProducts) => [...prevProducts, response.data])

      // Reset form and hide it
      setNewProduct({
        name: "",
        model: "",
        description: "",
        price: "",
        stock: "",
        imageUrl: "",
        available: true,
      })
      setShowAddForm(false)
    } catch (err) {
      console.error("Error adding product:", err)
      setError("Failed to add product")
    }
  }

  const handleEditProduct = (product) => {
    setEditProduct({
      ...product,
      price: product.price.toString(),
      stock: product.stock.toString(),
    })
    setShowEditForm(true)
  }

  const handleUpdateProduct = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem("token")
      if (!token) {
        setError("You need to be logged in as admin to edit products")
        return
      }

      // Convert price and stock to numbers
      const productData = {
        ...editProduct,
        price: Number.parseFloat(editProduct.price),
        stock: Number.parseInt(editProduct.stock),
      }

      const response = await axios.put(`http://localhost:5000/api/products/${editProduct._id}`, productData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      // Update the product in the state
      setProducts((prevProducts) =>
        prevProducts.map((product) => (product._id === editProduct._id ? response.data : product)),
      )

      // Reset form and hide it
      setEditProduct({
        _id: "",
        name: "",
        model: "",
        description: "",
        price: "",
        stock: "",
        imageUrl: "",
        available: true,
      })
      setShowEditForm(false)
    } catch (err) {
      console.error("Error updating product:", err)
      setError("Failed to update product")
    }
  }

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader className="border-b border-gray-700">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <CardTitle className="text-2xl text-white">Product Management</CardTitle>
          <Button
            onClick={() => setShowAddForm(true)}
            className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white w-full sm:w-auto"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Product
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        {showAddForm && (
          <div className="mb-6 p-6 border border-gray-600 rounded-lg bg-gray-700">
            <h3 className="text-lg font-medium text-white mb-4">Add New Product</h3>
            <form onSubmit={handleAddProduct} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Product Name</label>
                  <input
                    type="text"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Model</label>
                  <input
                    type="text"
                    value={newProduct.model}
                    onChange={(e) => setNewProduct({ ...newProduct, model: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Stock</label>
                  <input
                    type="number"
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-1">Image URL</label>
                  <input
                    type="text"
                    value={newProduct.imageUrl}
                    onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
                  <textarea
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    required
                  />
                </div>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="available"
                  checked={newProduct.available}
                  onChange={(e) => setNewProduct({ ...newProduct, available: e.target.checked })}
                  className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-500 rounded bg-gray-600"
                />
                <label htmlFor="available" className="ml-2 block text-sm text-gray-300">
                  Available for sale
                </label>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white"
                >
                  Add Product
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowAddForm(false)}
                  className="border-gray-500 text-gray-300 hover:bg-gray-600 hover:text-white"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        )}

        {showEditForm && (
          <div className="mb-6 p-6 border border-gray-600 rounded-lg bg-gray-700">
            <h3 className="text-lg font-medium text-white mb-4">Edit Product</h3>
            <form onSubmit={handleUpdateProduct} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Product Name</label>
                  <input
                    type="text"
                    value={editProduct.name}
                    onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Model</label>
                  <input
                    type="text"
                    value={editProduct.model}
                    onChange={(e) => setEditProduct({ ...editProduct, model: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={editProduct.price}
                    onChange={(e) => setEditProduct({ ...editProduct, price: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Stock</label>
                  <input
                    type="number"
                    value={editProduct.stock}
                    onChange={(e) => setEditProduct({ ...editProduct, stock: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-1">Image URL</label>
                  <input
                    type="text"
                    value={editProduct.imageUrl}
                    onChange={(e) => setEditProduct({ ...editProduct, imageUrl: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
                  <textarea
                    value={editProduct.description}
                    onChange={(e) => setEditProduct({ ...editProduct, description: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    required
                  />
                </div>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="edit-available"
                  checked={editProduct.available}
                  onChange={(e) => setEditProduct({ ...editProduct, available: e.target.checked })}
                  className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-500 rounded bg-gray-600"
                />
                <label htmlFor="edit-available" className="ml-2 block text-sm text-gray-300">
                  Available for sale
                </label>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white"
                >
                  Update Product
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowEditForm(false)}
                  className="border-gray-500 text-gray-300 hover:bg-gray-600 hover:text-white"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        )}

        {loading && (
          <div className="flex justify-center py-8">
            <div className="text-center">
              <Loader2 className="w-12 h-12 animate-spin text-red-500 mx-auto" />
              <p className="mt-4 text-gray-400">Loading products...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-900/20 border border-red-700 rounded-lg p-4 mb-6">
            <div className="flex items-center text-red-400">
              <div className="font-medium">Error: {error}</div>
            </div>
          </div>
        )}

        {!loading && !error && Array.isArray(products) && products.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">No Products Found</h3>
            <p className="text-gray-400">There are no products in the system yet.</p>
            <Button
              onClick={() => setShowAddForm(true)}
              className="mt-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white"
            >
              Add Your First Product
            </Button>
          </div>
        )}

        {!loading && !error && Array.isArray(products) && products.length > 0 && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="border border-gray-600 rounded-lg p-4 bg-gray-700 hover:bg-gray-600 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium text-white">{product.name}</div>
                      <div className="text-sm text-gray-400">{product.model}</div>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditProduct(product)}
                        className="text-gray-400 hover:text-white hover:bg-gray-600"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteProduct(product._id)}
                        className="text-gray-400 hover:text-red-400 hover:bg-gray-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="text-lg font-bold text-white">${product.price}</div>
                    <div className="text-sm text-gray-400">Stock: {product.stock}</div>
                    <div className="text-sm text-gray-400">Model: {product.model}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
