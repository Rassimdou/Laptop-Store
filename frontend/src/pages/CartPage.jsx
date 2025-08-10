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
  "Adrar", "Chlef", "Laghouat", "Oum El Bouaghi", "Batna", "Béjaïa", "Biskra", 
  "Béchar", "Blida", "Bouira", "Tamanrasset", "Tébessa", "Tlemcen", "Tiaret", 
  "Tizi Ouzou", "Alger", "Djelfa", "Jijel", "Sétif", "Saïda", "Skikda", 
  "Sidi Bel Abbès", "Annaba", "Guelma", "Constantine", "Médéa", "Mostaganem", 
  "M'Sila", "Mascara", "Ouargla", "Oran", "El Bayadh", "Illizi", 
  "Bordj Bou Arréridj", "Boumerdès", "El Tarf", "Tindouf", "Tissemsilt", 
  "El Oued", "Khenchela", "Souk Ahras", "Tipaza", "Mila", "Aïn Defla", 
  "Naâma", "Aïn Témouchent", "Ghardaïa", "Relizane"
];

export default function CartPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const productId = searchParams.get("productId");
  const quantityParam = parseInt(searchParams.get("quantity") || "1", 10);
  
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [orderQuantity, setOrderQuantity] = useState(quantityParam);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const [orderData, setOrderData] = useState({
    wilaya: "",
    address: "",
    notes: "",
  });

  // Check for existing auth on component mount
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data);
      } catch (err) {
        console.error('Failed to load products:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Find selected product
  useEffect(() => {
    if (productId && products.length > 0) {
      const product = products.find(p => p._id === productId);
      setSelectedProduct(product);
    }
  }, [productId, products]);

const handlePlaceOrder = async (e) => {
  e.preventDefault();

  if (!orderData.wilaya || !orderData.address) {
    alert("Please fill in all required fields");
    return;
  }

  if (!token) {
    alert("Please sign in to place an order");
    navigate('/login', { state: { from: location.pathname + location.search } });
    return;
  }

  if (!selectedProduct) {
    alert("Product information is missing");
    return;
  }

  setIsSubmitting(true);

  // Calculate total amount
  const totalAmount = selectedProduct.price * orderQuantity;

  try {
    const response = await axios.post(
      'http://localhost:5000/api/orders',
      {
        products: [{
          productId: selectedProduct._id,
          quantity: orderQuantity
        }],
        totalAmount,
        wilaya: orderData.wilaya,
        address: orderData.address,
        notes: orderData.notes
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (response.status === 201) {
      alert("Order placed successfully!");
      navigate('/order-success');
    }
  } catch (error) {
  console.error('Error placing order:', error);
  
  let errorMessage = 'Failed to place order. Please try again.';
  
  if (error.response?.status === 401) {
    errorMessage = 'Session expired. Please log in again.';
    // Clear invalid token
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
    // Redirect to login
    navigate('/login', { state: { from: location.pathname + location.search } });
  }
  else if (error.response?.status === 400) {
    errorMessage = error.response.data.message || 'Validation failed';
  } 
  // ... other error handling ...
  
  alert(`Error: ${errorMessage}`);
}
   finally {
    setIsSubmitting(false);
  }
};

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
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
    );
  }

  const total = selectedProduct.price * orderQuantity;

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
                <p className="text-muted-foreground mt-1">
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
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-center text-foreground">Account Required</CardTitle>
                  <p className="text-muted-foreground text-center">
                    Sign in to your account or create a new one to place your order
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center space-y-6">
                    <div className="text-center">
                      <p className="text-muted-foreground mb-4">
                        You need an account to complete your purchase
                      </p>
                      <div className="flex flex-col sm:flex-row gap-4">
                        <Button
                          onClick={() => navigate('/login', { state: { from: location.pathname + location.search } })}
                          className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground"
                        >
                          Sign In
                        </Button>
                        <Button
                          onClick={() => navigate('/register', { state: { from: location.pathname + location.search } })}
                          variant="outline"
                          className="w-full sm:w-auto"
                        >
                          Create Account
                        </Button>
                      </div>
                    </div>
                    
                    <div className="w-full border-t border-border pt-6">
                      <h4 className="font-medium text-foreground mb-3">Why create an account?</h4>
                      <ul className="text-muted-foreground space-y-2 text-sm">
                        <li className="flex items-start">
                          <span className="text-primary mr-2">✓</span>
                          <span>Faster checkout experience</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-primary mr-2">✓</span>
                          <span>Track your order history</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-primary mr-2">✓</span>
                          <span>Save delivery addresses</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-primary mr-2">✓</span>
                          <span>Receive special offers</span>
                        </li>
                      </ul>
                    </div>
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
                  <p className="text-muted-foreground">Welcome back, {user.name}!</p>
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
                      <label htmlFor="address" className="text-sm font-medium text-foreground">Complete Address *</label>
                      <textarea
                        id="address"
                        placeholder="Enter your complete address (street, city, postal code)"
                        value={orderData.address}
                        onChange={(e) => setOrderData({ ...orderData, address: e.target.value })}
                        rows={3}
                        className="w-full p-2 border border-input bg-background rounded-md text-foreground"
                        required
                        disabled={isSubmitting}
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
                        disabled={isSubmitting}
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
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/placeholder.svg";
                      }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-foreground truncate">{selectedProduct.name}</h4>
                    <p className="text-sm text-muted-foreground">Model: {selectedProduct.model}</p>
                    <p className={`text-sm ${
                      selectedProduct.stock > 0 ? "text-green-600" : "text-destructive"
                    }`}>
                      {selectedProduct.stock > 0 
                        ? `${selectedProduct.stock} in stock` 
                        : "Out of stock"}
                    </p>
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
                      disabled={orderQuantity <= 1 || isSubmitting}
                      className="h-8 w-8 p-0"
                    >
                      -
                    </Button>
                    <span className="text-lg font-semibold w-8 text-foreground text-center">{orderQuantity}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setOrderQuantity(orderQuantity + 1)}
                      disabled={orderQuantity >= selectedProduct.stock || isSubmitting}
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
                {user && (
                  <div className="bg-secondary p-4 rounded-lg border border-border">
                    <h4 className="font-medium text-foreground mb-2">Account Details</h4>
                    <div className="text-sm text-muted-foreground space-y-1">
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
  );
}