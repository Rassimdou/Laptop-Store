import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Button } from "../ui/button"
import { Zap, Menu, X, User, ChevronDown } from "lucide-react"

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [user, setUser] = useState(null)
  const [userDropdownOpen, setUserDropdownOpen] = useState(false)

  useEffect(() => {
    // Check for user in localStorage
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (e) {
        console.error("Error parsing user data:", e)
      }
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setUser(null)
    setMobileMenuOpen(false)
    setUserDropdownOpen(false)
    // Redirect to home page
    window.location.href = "/"
  }

  return (
    <>
      <nav className="sticky top-0 z-50 bg-slate-800 backdrop-blur-sm border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-red-500 hidden sm:block">LaptopHub</span>
              <span className="text-lg font-bold text-red-500 sm:hidden">LH</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                Home
              </Link>
              <Link to="/products" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                Products
              </Link>
              <Link to="/about" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                About
              </Link>
              {user && user.role === "admin" && (
                <Link to="/admin" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                  Admin
                </Link>
              )}
            </div>

            <div className="flex items-center space-x-4">
              {/* User Actions - Desktop */}
              <div className="hidden md:flex items-center space-x-4">
                {user ? (
                  <div className="relative">
                    <button
                      onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                      className="flex items-center space-x-2 text-gray-300 hover:text-white hover:bg-red-600 transition-colors px-3 py-2 rounded-lg border border-transparent"
                    >
                      <User className="w-4 h-4" />
                      <span className="text-sm font-medium">{user.name}</span>
                      <ChevronDown className="w-4 h-4" />
                    </button>

                    {userDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-slate-700 rounded-lg shadow-lg py-2 z-50">
                        <Link
                          to="/my-orders"
                          className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-slate-600 transition-colors"
                          onClick={() => setUserDropdownOpen(false)}
                        >
                          My Orders
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-slate-600 transition-colors"
                        >
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    <Link to="/login">
                      <Button
                        variant="ghost"
                        className="text-sm font-medium text-gray-300 hover:text-white hover:bg-slate-700"
                      >
                        Login
                      </Button>
                    </Link>
                    <Link to="/register">
                      <Button className="text-sm font-medium bg-red-600 hover:bg-red-700 text-white">Register</Button>
                    </Link>
                  </>
                )}
              </div>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-gray-300 hover:text-white hover:bg-slate-700"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-slate-800 border-t border-gray-700">
            <div className="px-4 py-4 space-y-3">
              {/* Navigation Links */}
              <Link
                to="/"
                className="block py-2 text-base font-medium text-gray-300 hover:text-white transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>

              <Link
                to="/products"
                className="block py-2 text-base font-medium text-gray-300 hover:text-white transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Products
              </Link>

              <Link
                to="/about"
                className="block py-2 text-base font-medium text-gray-300 hover:text-white transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>

              {/* User Actions */}
              {user ? (
                <>
                  <div className="border-t border-gray-700 pt-3 mt-3">
                    <div className="flex items-center py-2">
                      <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center">
                        <User className="w-4 h-4 text-gray-300" />
                      </div>
                      <span className="ml-3 text-base font-medium text-white">{user.name}</span>
                    </div>
                  </div>

                  <Link
                    to="/my-orders"
                    className="block py-2 text-base font-medium text-gray-300 hover:text-white transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    My Orders
                  </Link>

                  {user.role === "admin" && (
                    <Link
                      to="/admin"
                      className="block py-2 text-base font-medium text-gray-300 hover:text-white transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Admin Dashboard
                    </Link>
                  )}

                  <button
                    onClick={handleLogout}
                    className="block w-full text-left py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-slate-600 transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <div className="border-t border-gray-700 pt-3 mt-3 space-y-2">
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-base font-medium text-gray-300 hover:text-white hover:bg-slate-700"
                    >
                      Login
                    </Button>
                  </Link>
                  <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                    <Button className="w-full text-base font-medium bg-red-600 hover:bg-red-700 text-white">
                      Register
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      <div className="bg-red-600 text-white text-center py-2 px-4">
        <div className="flex items-center justify-center space-x-2">
          <Zap className="w-4 h-4" />
          <span className="text-sm font-medium">New Collection Available</span>
        </div>
      </div>
    </>
  )
}