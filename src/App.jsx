"use client"
import { useState } from "react"

import Header from "./components/Header"
import Footer from "./components/Footer"
import HomePage from "./pages/Home"
import LoginUser from "./components/LoginUser"
import LoginAdmin from "./components/LoginAdmin"
import RegisterUser from "./components/RegisterUser"
import RegisterAdmin from "./components/RegisterAdmin"
import ProductDetail from "./components/ProductDetail"
import UserDashboard from "./components/UserDashboard"
import AdminDashboard from "./components/AdmDashboard"
import ProductRegistration from "./components/ProductRegistration"
import CartPage from "./components/CartPage"
import CategoryPage from "./pages/CategoryPage" 

export default function App() {
  const [currentPage, setCurrentPage] = useState("login-user")
  const [user, setUser] = useState(null)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [cartItem, setCartItem] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null); 

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    setCurrentPage("product");
  };
  
  const handleAddToCart = (product, quantity) => {
    setCartItem({ ...product, quantity });
    setCurrentPage("cart");
  };

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    setCurrentPage("category");
  };


  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage onNavigate={handleNavigate} onProductSelect={handleProductSelect} onCategorySelect={handleCategorySelect} />
      case "login-user":
        return <LoginUser onNavigate={handleNavigate} onLogin={setUser} />
      case "login-admin":
        return <LoginAdmin onNavigate={handleNavigate} onLogin={setUser} />
      case "register-user":
        return <RegisterUser onNavigate={handleNavigate} />
      case "register-admin":
        return <RegisterAdmin onNavigate={handleNavigate} />
      case "product":
        return <ProductDetail onNavigate={handleNavigate} product={selectedProduct} onAddToCart={handleAddToCart} />
      case "user-dashboard":
        return <UserDashboard onNavigate={handleNavigate} user={user} />
      case "admin-dashboard":
        return <AdminDashboard onNavigate={handleNavigate} user={user} />
      case "product-registration":
        return <ProductRegistration onNavigate={handleNavigate} />
      case "cart":
        return <CartPage onNavigate={handleNavigate} item={cartItem} />
      case "category":
        return <CategoryPage categoryId={selectedCategory} onProductSelect={handleProductSelect} onNavigate={handleNavigate} />
      default:
        return <HomePage onNavigate={handleNavigate} onProductSelect={handleProductSelect} onCategorySelect={handleCategorySelect} />
    }
  }

  const showHeaderFooter = !["login-user", "login-admin", "register-user", "register-admin"].includes(currentPage)

  return (
    <div className="app">
      {showHeaderFooter && <Header onNavigate={handleNavigate} user={user} />}
      <main style={{ flex: 1 }}>{renderPage()}</main>
      {showHeaderFooter && <Footer />}
    </div>
  )
}