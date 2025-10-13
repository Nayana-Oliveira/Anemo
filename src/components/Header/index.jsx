"use client"
import { useState } from "react";
import "./index.css"
import { FaSearch } from 'react-icons/fa';

export default function Header({ onNavigate, user, onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
    setSearchTerm("");
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <a
            href="#"
            className="logo"
            onClick={(e) => {
              e.preventDefault();
              onNavigate("home");
            }}
          >
            <img src="/assets/anemo_logo.png" alt="Anêmo Logo" className="logo-icon-img" />
            Anêmo
          </a>

          <form onSubmit={handleSearchSubmit} className="search-bar">
            <input
              type="text"
              placeholder="Buscar produtos..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <button type="submit">
              <FaSearch />
            </button>
          </form>

          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <div
              className="header-user-info"
              onClick={() => onNavigate(user?.type === "admin" ? "admin-dashboard" : "user-dashboard")}
            >
              <div className="user-icon">
                <img src="/assets/placeholder-user.jpg" alt="User Icon" className="user-icon-img" />
              </div>
            </div>
            <div className="cart-icon" onClick={() => onNavigate("cart")}>
              <img src="/assets/carrinho.svg" alt="Carrinho de compras" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}