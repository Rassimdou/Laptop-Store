
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import HomePage from "./pages/HomePage"
import ProductsPage from "./pages/ProductsPage"
import ProductDetailPage from "./pages/ProductDetailPage"
import CartPage from "./pages/CartPage"
import AdminPage from "./pages/admin/AdminPage"
import AboutPage from "./pages/AboutPage"
import LoginPage from "./pages/LoginPage" // Import LoginPage
import RegisterPage from "./pages/RegisterPage" // Import RegisterPage
import MyOrdersPage from "./pages/MyOrdersPage" // Import MyOrdersPage

function App() {
  return (
    
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={<LoginPage />} /> {/* Add LoginPage route */}
          <Route path="/register" element={<RegisterPage />} /> {/* Add RegisterPage route */}
          <Route path="/my-orders" element={<MyOrdersPage />} /> {/* Add MyOrdersPage route */}
        </Routes>
      </div>
    </Router>

    
  )
}

export default App
