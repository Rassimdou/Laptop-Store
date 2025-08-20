import React, { useState, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { 
  ShoppingCart, MapPin, 
  ArrowLeft, Loader2 
} from 'lucide-react';
import axios from "axios";


const algerianWilayas = [
  "Adrar",
  "Chlef",
  "Laghouat",
  "Oum El Bouaghi",
  "Batna",
  "Béjaïa",
  "Biskra",
  "Béchar",
  "Blida",
  "Bouira",
  "Tamanrasset",
  "Tébessa",
  "Tlemcen",
  "Tiaret",
  "Tizi Ouzou",
  "Alger",
  "Djelfa",
  "Jijel",
  "Sétif",
  "Saïda",
  "Skikda",
  "Sidi Bel Abbès",
  "Annaba",
  "Guelma",
  "Constantine",
  "Médéa",
  "Mostaganem",
  "M'Sila",
  "Mascara",
  "Ouargla",
  "Oran",
  "El Bayadh",
  "Illizi",
  "Bordj Bou Arréridj",
  "Boumerdès",
  "El Tarf",
  "Tindouf",
  "Tissemsilt",
  "El Oued",
  "Khenchela",
  "Souk Ahras",
  "Tipaza",
  "Mila",
  "Aïn Defla",
  "Naâma",
  "Aïn Témouchent",
  "Ghardaïa",
  "Relizane",
]

export default function CartPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const productId = searchParams.get("productId")
  const quantityParam = Number.parseInt(searchParams.get("quantity") || "1", 10)

  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [orderQuantity, setOrderQuantity] = useState(quantityParam)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)

  const [orderData, setOrderData] = useState({
    wilaya: "",
    address: "",
    notes: "",
  })
  const [showMap, setShowMap] = useState(false)
  const [mapCenter, setMapCenter] = useState({ lat: 36.7538, lng: 3.0588 }) // Default to Algiers

  // Wilaya coordinates for map centering
  const wilayaCoordinates = {
    Adrar: { lat: 27.8667, lng: -0.2833 },
    Chlef: { lat: 36.1667, lng: 1.3333 },
    Laghouat: { lat: 33.8, lng: 2.8667 },
    "Oum El Bouaghi": { lat: 35.8667, lng: 7.1 },
    Batna: { lat: 35.55, lng: 6.1667 },
    Béjaïa: { lat: 36.75, lng: 5.0667 },
    Biskra: { lat: 34.85, lng: 5.7333 },
    Béchar: { lat: 31.6167, lng: -2.2167 },
    Blida: { lat: 36.4833, lng: 2.8167 },
    Bouira: { lat: 36.3833, lng: 3.9 },
    Tamanrasset: { lat: 22.7833, lng: 5.5167 },
    Tébessa: { lat: 35.4, lng: 8.1167 },
    Tlemcen: { lat: 34.8833, lng: -1.3167 },
    Tiaret: { lat: 35.3667, lng: 1.3333 },
    "Tizi Ouzou": { lat: 36.7167, lng: 4.05 },
    Alger: { lat: 36.7538, lng: 3.0588 },
    Djelfa: { lat: 34.6667, lng: 3.25 },
    Jijel: { lat: 36.8, lng: 5.7667 },
    Sétif: { lat: 36.1833, lng: 5.4 },
    Saïda: { lat: 34.8333, lng: 0.15 },
    Skikda: { lat: 36.8667, lng: 6.9 },
    "Sidi Bel Abbès": { lat: 35.2, lng: -0.6333 },
    Annaba: { lat: 36.9, lng: 7.7667 },
    Guelma: { lat: 36.4667, lng: 7.4333 },
    Constantine: { lat: 36.35, lng: 6.6 },
    Médéa: { lat: 36.2667, lng: 2.75 },
    Mostaganem: { lat: 35.9333, lng: 0.0833 },
    "M'Sila": { lat: 35.7, lng: 4.5333 },
    Mascara: { lat: 35.4, lng: 0.15 },
    Ouargla: { lat: 31.95, lng: 5.3167 },
    Oran: { lat: 35.7, lng: -0.6333 },
    "El Bayadh": { lat: 33.6833, lng: 1.0167 },
    Illizi: { lat: 26.1667, lng: 8.4833 },
    "Bordj Bou Arréridj": { lat: 36.0667, lng: 4.7667 },
    Boumerdès: { lat: 36.7667, lng: 3.7167 },
    "El Tarf": { lat: 36.7667, lng: 8.3167 },
    Tindouf: { lat: 27.6833, lng: -8.1667 },
    Tissemsilt: { lat: 35.6, lng: 1.8 },
    "El Oued": { lat: 33.3667, lng: 6.8667 },
    Khenchela: { lat: 35.4333, lng: 7.1333 },
    "Souk Ahras": { lat: 36.2833, lng: 7.95 },
    Tipaza: { lat: 36.6, lng: 2.4167 },
    Mila: { lat: 36.45, lng: 6.2667 },
    "Aïn Defla": { lat: 36.2667, lng: 1.9667 },
    Naâma: { lat: 33.2667, lng: -0.3167 },
    "Aïn Témouchent": { lat: 35.3, lng: -1.1333 },
    Ghardaïa: { lat: 32.4833, lng: 3.6667 },
    Relizane: { lat: 35.7333, lng: 0.55 },
  }

  // Function to handle wilaya selection and update map center
  const handleWilayaChange = (e) => {
    const wilaya = e.target.value
    setOrderData({ ...orderData, wilaya })

    // Update map center when a wilaya is selected
    if (wilaya && wilayaCoordinates[wilaya]) {
      setMapCenter(wilayaCoordinates[wilaya])
    }
  }
  // Check for existing auth on component mount
  useEffect(() => {
    const storedToken = localStorage.getItem("token")
    const storedUser = localStorage.getItem("user")

    if (storedToken && storedUser) {
      setToken(storedToken)
      setUser(JSON.parse(storedUser))
    }

    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://laptop-store-1-q41h.onrender.com/products")
        setProducts(response.data)
      } catch (err) {
        console.error("Failed to load products:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [])

  // Find selected product
  useEffect(() => {
    if (productId && products.length > 0) {
      const product = products.find((p) => p._id === productId)
      setSelectedProduct(product)
    }
  }, [productId, products])

  const handlePlaceOrder = async (e) => {
    e.preventDefault()

    if (!orderData.wilaya || !orderData.address) {
      alert("Please fill in all required fields")
      return
    }

    if (!token) {
      alert("Please sign in to place an order")
      navigate("/login", { state: { from: location.pathname + location.search } })
      return
    }

    if (!selectedProduct) {
      alert("Product information is missing")
      return
    }

    setIsSubmitting(true)

    // Calculate total amount
    const totalAmount = selectedProduct.price * orderQuantity

    try {
      const response = await axios.post(
        "https://laptop-store-1-q41h.onrender.com/orders",
        {
          products: [
            {
              productId: selectedProduct._id,
              quantity: orderQuantity,
            },
          ],
          totalAmount,
          wilaya: orderData.wilaya,
          address: orderData.address,
          notes: orderData.notes,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      )

      if (response.status === 201) {
        alert("Order placed successfully!")
        navigate("/order-success")
      }
    } catch (error) {
      console.error("Error placing order:", error)

      let errorMessage = "Failed to place order. Please try again."

      if (error.response?.status === 401) {
        errorMessage = "Session expired. Please log in again."
        // Clear invalid token
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        setToken(null)
        setUser(null)
        // Redirect to login
        navigate("/login", { state: { from: location.pathname + location.search } })
      } else if (error.response?.status === 400) {
        errorMessage = error.response.data.message || "Validation failed"
      }
      // ... other error handling ...

      alert(`Error: ${errorMessage}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-red-500" />
      </div>
    )
  }

  if (!selectedProduct) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Product not found</h2>
          <Link to="/products">
            <Button className="bg-red-600 hover:bg-red-700 text-white">← Back to Products</Button>
          </Link>
        </div>
      </div>
    )
  }

  const total = selectedProduct.price * orderQuantity

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/products">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white bg-transparent"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Products
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-white">Complete Your Order</h1>
                <p className="text-gray-400 mt-1">
                  {user ? "Complete your delivery information" : "Sign in or create account to place your order"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Order Form */}
          <div className="lg:col-span-2">
            {!user ? (
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-2xl text-center text-white">Account Required</CardTitle>
                  <p className="text-gray-400 text-center">
                    Sign in to your account or create a new one to place your order
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center space-y-6">
                    <div className="text-center">
                      <p className="text-gray-400 mb-4">You need an account to complete your purchase</p>
                      <div className="flex flex-col sm:flex-row gap-4">
                        <Button
                          onClick={() => navigate("/login", { state: { from: location.pathname + location.search } })}
                          className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white"
                        >
                          Sign In
                        </Button>
                        <Button
                          onClick={() =>
                            navigate("/register", { state: { from: location.pathname + location.search } })
                          }
                          variant="outline"
                          className="w-full sm:w-auto border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
                        >
                          Create Account
                        </Button>
                      </div>
                    </div>

                    <div className="w-full border-t border-gray-700 pt-6">
                      <h4 className="font-medium text-white mb-3">Why create an account?</h4>
                      <ul className="text-gray-400 space-y-2 text-sm">
                        <li className="flex items-start">
                          <span className="text-red-500 mr-2">✓</span>
                          <span>Faster checkout experience</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-red-500 mr-2">✓</span>
                          <span>Track your order history</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-red-500 mr-2">✓</span>
                          <span>Save delivery addresses</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-red-500 mr-2">✓</span>
                          <span>Receive special offers</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center text-white">
                    <MapPin className="w-5 h-5 mr-2 text-red-500" />
                    Delivery Information
                  </CardTitle>
                  <p className="text-gray-400">Welcome back, {user.name}!</p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handlePlaceOrder} className="space-y-6">
                    <div className="space-y-2">
                      <label htmlFor="wilaya" className="text-sm font-medium text-white">
                        Wilaya *
                      </label>
                      <select
                        value={orderData.wilaya}
                        onChange={(e) => setOrderData({ ...orderData, wilaya: e.target.value })}
                        className="w-full p-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:border-red-500 focus:ring-1 focus:ring-red-500"
                        required
                        disabled={isSubmitting}
                      >
                        <option value="">Select your wilaya</option>
                        {algerianWilayas.map((wilaya) => (
                          <option key={wilaya} value={wilaya}>
                            {wilaya}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="address" className="text-sm font-medium text-white">
                        Complete Address *
                      </label>
                      <textarea
                        id="address"
                        placeholder="Enter your complete address (street, city, postal code)"
                        value={orderData.address}
                        onChange={(e) => setOrderData({ ...orderData, address: e.target.value })}
                        rows={3}
                        className="w-full p-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:border-red-500 focus:ring-1 focus:ring-red-500 placeholder-gray-400"
                        required
                        disabled={isSubmitting}
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="notes" className="text-sm font-medium text-white">
                        Special Instructions (Optional)
                      </label>
                      <textarea
                        id="notes"
                        placeholder="Any special delivery instructions or notes..."
                        value={orderData.notes}
                        onChange={(e) => setOrderData({ ...orderData, notes: e.target.value })}
                        rows={2}
                        className="w-full p-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:border-red-500 focus:ring-1 focus:ring-red-500 placeholder-gray-400"
                        disabled={isSubmitting}
                      />
                    </div>

                    <div className="bg-gray-700 border border-gray-600 p-4 rounded-lg">
                      <h4 className="font-medium text-white mb-2">Order Process</h4>
                      <ol className="text-gray-300 space-y-1">
                        <li>1. Submit your order details</li>
                        <li>2. We'll call you to confirm your order</li>
                        <li>3. Payment arrangement upon confirmation</li>
                        <li>4. Fast delivery to your address</li>
                      </ol>
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-red-600 hover:bg-red-700 text-white text-lg py-6"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin mr-2" />
                          Placing Order...
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-5 h-5 mr-2" />
                          Place Order - {total.toLocaleString()} DA
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4 bg-gray-800 border-gray-700 shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl text-white">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                {/* Product Details */}
                <div className="flex items-center space-x-4 p-4 bg-gray-700 border border-gray-600 rounded-lg">
                  <div className="w-20 h-20 bg-gray-600 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={selectedProduct.imageUrl || "/placeholder.svg"}
                      alt={selectedProduct.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null
                        e.target.src = "/placeholder.svg"
                      }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-white truncate">{selectedProduct.name}</h4>
                    <p className="text-sm text-gray-400">Model: {selectedProduct.model}</p>
                    <p className={`text-sm ${selectedProduct.stock > 0 ? "text-green-400" : "text-red-400"}`}>
                      {selectedProduct.stock > 0 ? `${selectedProduct.stock} in stock` : "Out of stock"}
                    </p>
                  </div>
                </div>

                {/* Quantity Selector */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-white">Quantity</label>
                  <div className="flex items-center justify-center space-x-4 p-3 bg-gray-700 border border-gray-600 rounded-lg">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setOrderQuantity(Math.max(1, orderQuantity - 1))}
                      disabled={orderQuantity <= 1 || isSubmitting}
                      className="h-8 w-8 p-0 border-gray-600 text-gray-300 hover:bg-gray-600 hover:text-white"
                    >
                      -
                    </Button>
                    <span className="text-lg font-semibold w-8 text-white text-center">{orderQuantity}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setOrderQuantity(orderQuantity + 1)}
                      disabled={orderQuantity >= selectedProduct.stock || isSubmitting}
                      className="h-8 w-8 p-0 border-gray-600 text-gray-300 hover:bg-gray-600 hover:text-white"
                    >
                      +
                    </Button>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3 pt-4 border-t border-gray-700">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Unit Price</span>
                    <span className="font-medium text-white">{selectedProduct.price.toLocaleString()} DA</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Quantity</span>
                    <span className="font-medium text-white">×{orderQuantity}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Shipping</span>
                    <span className="text-green-400 font-medium">Free</span>
                  </div>
                  <div className="border-t border-gray-700 pt-3 flex justify-between">
                    <span className="text-lg font-semibold text-white">Total</span>
                    <span className="text-lg font-bold text-red-500">{total.toLocaleString()} DA</span>
                  </div>
                </div>

                {/* User Info (if logged in) */}
                {user && (
                  <div className="bg-gray-700 border border-gray-600 p-4 rounded-lg">
                    <h4 className="font-medium text-white mb-2">Account Details</h4>
                    <div className="text-sm text-gray-300 space-y-1">
                      <p>
                        <span className="font-medium">Name:</span> {user.name}
                      </p>
                      <p>
                        <span className="font-medium">Email:</span> {user.email}
                      </p>
                      <p>
                        <span className="font-medium">Phone:</span> {user.phone}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
