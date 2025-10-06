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

export default function App() {
const [currentPage, setCurrentPage] = useState("login-user")
const [user, setUser] = useState(null)

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage onNavigate={setCurrentPage} />
      case "login-user":
        return <LoginUser onNavigate={setCurrentPage} onLogin={setUser} />
      case "login-admin":
        return <LoginAdmin onNavigate={setCurrentPage} onLogin={setUser} />
      case "register-user":
        return <RegisterUser onNavigate={setCurrentPage} />
      case "register-admin":
        return <RegisterAdmin onNavigate={setCurrentPage} />
      case "product":
        return <ProductDetail onNavigate={setCurrentPage} />
      case "user-dashboard":
        return <UserDashboard onNavigate={setCurrentPage} user={user} />
      case "admin-dashboard":
        return <AdminDashboard onNavigate={setCurrentPage} user={user} />
      case "product-registration":
        return <ProductRegistration onNavigate={setCurrentPage} />
      case "cart":
        return <CartPage onNavigate={setCurrentPage} />
      default:
        return <HomePage onNavigate={setCurrentPage} />
    }
  }

  const showHeaderFooter = !["login-user", "login-admin", "register-user", "register-admin"].includes(currentPage)

  return (
    <div className="app">
      {showHeaderFooter && <Header onNavigate={setCurrentPage} user={user} />}
      <main style={{ flex: 1 }}>{renderPage()}</main>
      {showHeaderFooter && <Footer />}
    </div>
  )
}