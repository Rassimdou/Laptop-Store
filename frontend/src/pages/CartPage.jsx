import React, { useState, useEffect } from "react"
import { useLocation, Link } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { ShoppingCart, User, Lock, Mail, Phone, MapPin, ArrowLeft, Eye, EyeOff } from 'lucide-react'

// Mock product data - This data is now directly in the component
const products = [
  {
    id: 1,
    name: 'MacBook Pro 16"',
    brand: "Apple",
    price: 2499,
    originalPrice: 2799,
    imageUrl: "/placeholder.svg?height=300&width=400",
    rating: 4.9,
    reviews: 1247,
    specs: ["M3 Pro Chip", "32GB RAM", "1TB SSD", '16" Liquid Retina'],
    category: "Professional",
    inStock: true,
    stock: 15,
    model: "MBP16-M3-2024", // Added model for consistency
  },
  {
    id: 2,
    name: "Dell XPS 13 Plus",
    brand: "Dell",
    price: 1299,
    originalPrice: 1499,
    imageUrl: "/placeholder.svg?height=300&width=400",
    rating: 4.7,
    reviews: 892,
    specs: ["Intel i7-13700H", "16GB RAM", "512GB SSD", '13.4" OLED'],
    category: "Ultrabook",
    inStock: true,
    stock: 8,
    model: "XPS13-PLUS-2024", // Added model for consistency
  },
  {
    id: 3,
    name: "ASUS ROG Strix G15",
    brand: "ASUS",
    price: 1899,
    originalPrice: 2199,
    imageUrl: "/placeholder.svg?height=300&width=400",
    rating: 4.8,
    reviews: 634,
    specs: ["AMD Ryzen 9", "32GB RAM", "1TB SSD", "RTX 4070"],
    category: "Gaming",
    inStock: true,
    stock: 10,
    model: "ROG-G15-2024", // Added model for consistency
  },
  {
    id: 4,
    name: "ThinkPad X1 Carbon",
    brand: "Lenovo",
    price: 1599,
    originalPrice: 1899,
    imageUrl: "/placeholder.svg?height=300&width=400",
    rating: 4.6,
    reviews: 445,
    specs: ["Intel i7-13700U", "16GB RAM", "512GB SSD", '14" 2.8K'],
    category: "Business",
    inStock: false,
    stock: 0,
    model: "X1-CARBON-2024", // Added model for consistency
  },
  {
    id: 5,
    name: "HP Spectre x360",
    brand: "HP",
    price: 1399,
    originalPrice: 1599,
    imageUrl: "/placeholder.svg?height=300&width=400",
    rating: 4.5,
    reviews: 328,
    specs: ["Intel i7-1355U", "16GB RAM", "512GB SSD", '13.5" Touch'],
    category: "2-in-1",
    inStock: true,
    stock: 7,
    model: "SPECTRE-X360-2024", // Added model for consistency
  },
  {
    id: 6,
    name: "MSI Creator Z16P",
    brand: "MSI",
    price: 2299,
    originalPrice: 2599,
    imageUrl: "/placeholder.svg?height=300&width=400",
    rating: 4.7,
    reviews: 156,
    specs: ["Intel i9-13900H", "32GB RAM", "1TB SSD", "RTX 4060"],
    category: "Creative",
    inStock: true,
    stock: 5,
    model: "CREATOR-Z16P-2024", // Added model for consistency
  },
]

const algerianWilayas = [
  "Adrar", "Chlef", "Laghouat", "Oum El Bouaghi", "Batna", "Béjaïa", "Biskra", "Béchar", "Blida", "Bouira",
  "Tamanrasset", "Tébessa", "Tlemcen", "Tiaret", "Tizi Ouzou", "Alger", "Djelfa", "Jijel", "Sétif", "Saïda",
  "Skikda", "Sidi Bel Abbès", "Annaba", "Guelma", "Constantine", "Médéa", "Mostaganem", "M'Sila", "Mascara",
  "Ouargla", "Oran", "El Bayadh", "Illizi", "Bordj Bou Arréridj", "Boumerdès", "El Tarf", "Tindouf",
  "Tissemsilt", "El Oued", "Khenchela", "Souk Ahras", "Tipaza", "Mila", "Aïn Defla", "Naâma", "Aïn Témouchent",
  "Ghardaïa", "Relizane",
]

export default function CartPage() {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const productId = searchParams.get("productId")
  const quantity = parseInt(searchParams.get("quantity") || "1")

  const [selectedProduct, setSelectedProduct] = useState(null)
  const [orderQuantity, setOrderQuantity] = useState(quantity)
  const [activeTab, setActiveTab] = useState("signin")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Form states
  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
  })

  const [signUpData, setSignUpData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  })

  const [orderData, setOrderData] = useState({
    wilaya: "",
    address: "",
    notes: "",
  })

  const [agreeToTerms, setAgreeToTerms] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)

  // This useEffect now correctly depends on `products` to find the selected product
  useEffect(() => {
    if (productId && products.length > 0) { // Ensure products array is populated
      const product = products.find((p) => p.id === parseInt(productId))
      setSelectedProduct(product)
    }
  }, [productId, products]) // Added products to dependency array

  const handleSignIn = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      // Mock successful login
      setCurrentUser({
        name: "John Doe",
        email: signInData.email,
        phone: "+213 555 123 456",
      })
      setIsLoggedIn(true)
      setIsSubmitting(false)
    }, 1500)
  }

  const handleSignUp = async (e) => {
    e.preventDefault()

    if (signUpData.password !== signUpData.confirmPassword) {
      alert("Passwords don't match!")
      return
    }

    if (!agreeToTerms) {
      alert("Please agree to the terms and conditions")
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      // Mock successful registration
      setCurrentUser({
        name: signUpData.name,
        email: signUpData.email,
        phone: signUpData.phone,
      })
      setIsLoggedIn(true)
      setIsSubmitting(false)
    }, 1500)
  }

  const handlePlaceOrder = async (e) => {
    e.preventDefault()

    if (!orderData.wilaya || !orderData.address) {
      alert("Please fill in all required fields")
      return
    }

    setIsSubmitting(true)

    // Simulate API call to create order
    setTimeout(() => {
      alert("Order placed successfully! We will contact you shortly to confirm your order.")
      setIsSubmitting(false)
      // In real app, redirect to success page
    }, 2000)
  }

  if (!selectedProduct) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Product not found</h2>
          <Link to="/products">
            <Button>← Back to Products</Button>
          </Link>
        </div>
      </div>
    )
  }

  const total = selectedProduct.price * orderQuantity

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/products">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Products
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Complete Your Order</h1>
                <p className="text-muted-foreground mt-1">Sign in or create account to place your order</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Order Form */}
          <div className="lg:col-span-2">
            {!isLoggedIn ? (
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-center text-foreground">Account Required</CardTitle>
                  <p className="text-muted-foreground text-center">
                    Sign in to your account or create a new one to place your order
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="w-full">
                    <div className="flex space-x-1 bg-secondary p-1 rounded-lg mb-6">
                      {["signin", "signup"].map((tab) => (
                        <button
                          key={tab}
                          onClick={() => setActiveTab(tab)}
                          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                            activeTab === tab
                              ? "bg-card text-card-foreground shadow-sm"
                              : "text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          {tab === "signin" ? "Sign In" : "Create Account"}
                        </button>
                      ))}
                    </div>

                    {activeTab === "signin" && (
                      <form onSubmit={handleSignIn} className="space-y-4">
                        <div className="space-y-2">
                          <label htmlFor="signin-email" className="text-sm font-medium text-foreground">Email Address</label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                              id="signin-email"
                              type="email"
                              placeholder="Enter your email"
                              value={signInData.email}
                              onChange={(e) => setSignInData({ ...signInData, email: e.target.value })}
                              className="pl-10"
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label htmlFor="signin-password" className="text-sm font-medium text-foreground">Password</label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                              id="signin-password"
                              type={showPassword ? "text" : "password"}
                              placeholder="Enter your password"
                              value={signInData.password}
                              onChange={(e) => setSignInData({ ...signInData, password: e.target.value })}
                              className="pl-10 pr-10"
                              required
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 text-muted-foreground hover:text-foreground"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </Button>
                          </div>
                        </div>

                        <Button
                          type="submit"
                          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground mr-2" />
                              Signing In...
                            </>
                          ) : (
                            "Sign In"
                          )}
                        </Button>
                      </form>
                    )}

                    {activeTab === "signup" && (
                      <form onSubmit={handleSignUp} className="space-y-4">
                        <div className="space-y-2">
                          <label htmlFor="signup-name" className="text-sm font-medium text-foreground">Full Name</label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                              id="signup-name"
                              type="text"
                              placeholder="Enter your full name"
                              value={signUpData.name}
                              onChange={(e) => setSignUpData({ ...signUpData, name: e.target.value })}
                              className="pl-10"
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label htmlFor="signup-email" className="text-sm font-medium text-foreground">Email Address</label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                              id="signup-email"
                              type="email"
                              placeholder="Enter your email"
                              value={signUpData.email}
                              onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })}
                              className="pl-10"
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label htmlFor="signup-phone" className="text-sm font-medium text-foreground">Phone Number</label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                              id="signup-phone"
                              type="tel"
                              placeholder="+213 555 123 456"
                              value={signUpData.phone}
                              onChange={(e) => setSignUpData({ ...signUpData, phone: e.target.value })}
                              className="pl-10"
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label htmlFor="signup-password" className="text-sm font-medium text-foreground">Password</label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                              id="signup-password"
                              type={showPassword ? "text" : "password"}
                              placeholder="Create a password"
                              value={signUpData.password}
                              onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })}
                              className="pl-10 pr-10"
                              required
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 text-muted-foreground hover:text-foreground"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </Button>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label htmlFor="signup-confirm-password" className="text-sm font-medium text-foreground">Confirm Password</label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                              id="signup-confirm-password"
                              type={showConfirmPassword ? "text" : "password"}
                              placeholder="Confirm your password"
                              value={signUpData.confirmPassword}
                              onChange={(e) => setSignUpData({ ...signUpData, confirmPassword: e.target.value })}
                              className="pl-10 pr-10"
                              required
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 text-muted-foreground hover:text-foreground"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                              {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </Button>
                          </div>
                        </div>

                        <div className="flex items-start space-x-3">
                          <input
                            type="checkbox"
                            id="terms"
                            checked={agreeToTerms}
                            onChange={(e) => setAgreeToTerms(e.target.checked)}
                            className="mt-1"
                          />
                          <div className="text-sm">
                            <label htmlFor="terms" className="cursor-pointer text-muted-foreground">
                              I agree to the{" "}
                              <Link to="/terms" className="text-primary hover:underline">
                                Terms and Conditions
                              </Link>{" "}
                              and{" "}
                              <Link to="/privacy" className="text-primary hover:underline">
                                Privacy Policy
                              </Link>
                            </label>
                          </div>
                        </div>

                        <Button
                          type="submit"
                          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                          disabled={isSubmitting || !agreeToTerms}
                        >
                          {isSubmitting ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground mr-2" />
                              Creating Account...
                            </>
                          ) : (
                            "Create Account"
                          )}
                        </Button>
                      </form>
                    )}
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-foreground">
                    <MapPin className="w-5 h-5 mr-2 text-primary" />
                    Delivery Information
                  </CardTitle>
                  <p className="text-muted-foreground">Welcome back, {currentUser.name}!</p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handlePlaceOrder} className="space-y-6">
                    <div className="space-y-2">
                      <label htmlFor="wilaya" className="text-sm font-medium text-foreground">Wilaya *</label>
                      <select
                        value={orderData.wilaya}
                        onChange={(e) => setOrderData({ ...orderData, wilaya: e.target.value })}
                        className="w-full p-2 border border-input bg-background rounded-md text-foreground"
                        required
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
                      <label htmlFor="address" className="text-sm font-medium text-foreground">Complete Address *</label>
                      <textarea
                        id="address"
                        placeholder="Enter your complete address (street, city, postal code)"
                        value={orderData.address}
                        onChange={(e) => setOrderData({ ...orderData, address: e.target.value })}
                        rows={3}
                        className="w-full p-2 border border-input bg-background rounded-md text-foreground"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="notes" className="text-sm font-medium text-foreground">Special Instructions (Optional)</label>
                      <textarea
                        id="notes"
                        placeholder="Any special delivery instructions or notes..."
                        value={orderData.notes}
                        onChange={(e) => setOrderData({ ...orderData, notes: e.target.value })}
                        rows={2}
                        className="w-full p-2 border border-input bg-background rounded-md text-foreground"
                      />
                    </div>

                    <div className="bg-secondary p-4 rounded-lg">
                      <h4 className="font-medium text-foreground mb-2">Order Process</h4>
                      <ol className="text-muted-foreground space-y-1">
                        <li>1. Submit your order details</li>
                        <li>2. We'll call you to confirm your order</li>
                        <li>3. Payment arrangement upon confirmation</li>
                        <li>4. Fast delivery to your address</li>
                      </ol>
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-6"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-foreground mr-2" />
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
            <Card className="sticky top-4 border border-border shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl text-foreground">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                {/* Product Details */}
                <div className="flex items-center space-x-4 p-4 bg-secondary rounded-lg border border-border">
                  <div className="w-20 h-20 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={selectedProduct.imageUrl || "/placeholder.svg"}
                      alt={selectedProduct.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-foreground truncate">{selectedProduct.name}</h4>
                    <p className="text-sm text-muted-foreground">Model: {selectedProduct.model}</p>
                    <p className="text-sm text-green-600">{selectedProduct.stock} in stock</p>
                  </div>
                </div>

                {/* Quantity Selector */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-foreground">Quantity</label>
                  <div className="flex items-center justify-center space-x-4 p-3 bg-secondary rounded-lg">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setOrderQuantity(Math.max(1, orderQuantity - 1))}
                      disabled={orderQuantity <= 1}
                      className="h-8 w-8 p-0"
                    >
                      -
                    </Button>
                    <span className="text-lg font-semibold w-8 text-foreground text-center">{orderQuantity}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setOrderQuantity(orderQuantity + 1)}
                      disabled={orderQuantity >= selectedProduct.stock}
                      className="h-8 w-8 p-0"
                    >
                      +
                    </Button>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3 pt-4 border-t border-border">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Unit Price</span>
                    <span className="font-medium text-foreground">{selectedProduct.price.toLocaleString()} DA</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Quantity</span>
                    <span className="font-medium text-foreground">×{orderQuantity}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="text-green-600 font-medium">Free</span>
                  </div>
                  <div className="border-t border-border pt-3 flex justify-between">
                    <span className="text-lg font-semibold text-foreground">Total</span>
                    <span className="text-lg font-bold text-primary">{total.toLocaleString()} DA</span>
                  </div>
                </div>

                {/* User Info (if logged in) */}
                {isLoggedIn && currentUser && (
                  <div className="bg-secondary p-4 rounded-lg border border-border">
                    <h4 className="font-medium text-foreground mb-2">Account Details</h4>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p>
                        <span className="font-medium">Name:</span> {currentUser.name}
                      </p>
                      <p>
                        <span className="font-medium">Email:</span> {currentUser.email}
                      </p>
                      <p>
                        <span className="font-medium">Phone:</span> {currentUser.phone}
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
