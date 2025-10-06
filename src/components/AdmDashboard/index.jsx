"use client"

import { useState, useEffect } from "react";
import "./index.css";

export default function AdminDashboard({ user, onNavigate }) {
  const [activeSection, setActiveSection] = useState("account");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (activeSection === "products") {
      const fetchProducts = async () => {
        try {
          const response = await fetch('http://localhost:5010/products');
          const data = await response.json();
          setProducts(data);
        } catch (error) {
          console.error('Erro ao buscar produtos:', error);
        }
      };
      fetchProducts();
    }
  }, [activeSection]);

  const menuItems = [
    { id: "account", label: "Minha conta", icon: "/assets/do-utilizador.png" },
    { id: "products", label: "Meus produtos", icon: "/assets/editar.png" },
    { id: "addresses", label: "Meus endereços", icon: "/assets/mapa.png" },
    { id: "register-product", label: "Cadastrar produtos", icon: "/assets/mais.png" },
    { id: "exchanges", label: "Trocas e devoluções", icon: "/assets/exchange-alt.png" },
    { id: "logout", label: "Sair", icon: "/assets/saida.png" },
  ];

  const handleMenuClick = (itemId) => {
    if (itemId === "logout") {
      onNavigate("login-admin");
    } else if (itemId === "register-product") {
      onNavigate("product-registration");
    } else {
      setActiveSection(itemId);
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case "account":
        return (
          <div>
            <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "30px", color: "#333" }}>
              Dados do Administrador:
            </h2>
            <div style={{ backgroundColor: "white", borderRadius: "15px", padding: "40px" }}>
                <div>
                  <div style={{ marginBottom: "20px" }}>
                    <strong style={{ color: "#333" }}>Nome completo</strong>
                    <p style={{ color: "#666", margin: "5px 0" }}>{user?.fullName || 'Nome não encontrado'}</p>
                  </div>
                  <div style={{ marginBottom: "20px" }}>
                    <strong style={{ color: "#333" }}>E-mail:</strong>
                    <p style={{ color: "#666", margin: "5px 0" }}>{user?.email || 'E-mail não encontrado'}</p>
                  </div>
                  <div style={{ marginBottom: "20px" }}>
                    <strong style={{ color: "#333" }}>CNPJ:</strong>
                    <p style={{ color: "#666", margin: "5px 0" }}>{user?.cnpj || 'CNPJ não encontrado'}</p>
                  </div>
                </div>
            </div>
          </div>
        );

      case "products":
        return (
          <div>
            <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "30px", color: "#333" }}>Meus Produtos</h2>
            <div style={{ backgroundColor: "white", borderRadius: "15px", padding: "40px", color: "#666", fontSize: "18px" }}>
              {products.length > 0 ? (
                <ul>
                  {products.map(product => (
                    <li key={product.id}>{product.productName} - R$ {product.price}</li>
                  ))}
                </ul>
              ) : (
                <p>Nenhum produto cadastrado ainda.</p>
              )}
              <button className="btn btn-primary" style={{ marginTop: "20px" }} onClick={() => onNavigate("product-registration")}>
                Cadastrar Novo Produto
              </button>
            </div>
          </div>
        );

      case "addresses":
        return (
          <div>
            <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "30px", color: "#333" }}>
              Meus Endereços
            </h2>
            <div style={{ backgroundColor: "white", borderRadius: "15px", padding: "40px", textAlign: "center", color: "#666", fontSize: "18px" }}>
              <p>Nenhum endereço cadastrado.</p>
              <button className="btn btn-primary" style={{ marginTop: "20px" }}>
                Adicionar Endereço
              </button>
            </div>
          </div>
        );

      case "exchanges":
        return (
          <div>
            <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "30px", color: "#333" }}>
              Trocas e Devoluções
            </h2>
            <div style={{ backgroundColor: "white", borderRadius: "15px", padding: "40px", textAlign: "center", color: "#666", fontSize: "18px" }}>
              <p>Nenhuma solicitação de troca ou devolução.</p>
              <button className="btn btn-secondary" style={{ marginTop: "20px" }}>
                Gerenciar Solicitações
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div style={{ backgroundColor: "#6b9b76", minHeight: "100vh" }}>
      <header style={{ backgroundColor: "#6b9b76", padding: "20px 0" }}>
        <div className="container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div className="logo" onClick={() => onNavigate("home")} style={{ cursor: "pointer" }}>
            </div>
            <div style={{ color: "white", display: "flex", alignItems: "center", gap: "10px" }}>
            </div>
          </div>
        </div>
      </header>

      <div className="container" style={{ padding: "40px 0" }}>
        <div
          className="dashboard-grid"
          style={{ display: "grid", gridTemplateColumns: "350px 1fr", gap: "40px", alignItems: "start" }}
        >
          <div
            className="sidebar-menu"
            style={{ backgroundColor: "#f0ebe5", borderRadius: "20px", padding: "0", overflow: "hidden" }}
          >
            {menuItems.map((item, index) => (
              <div
                key={item.id}
                onClick={() => handleMenuClick(item.id)}
                style={{
                  padding: "20px 30px",
                  borderBottom: index < menuItems.length - 1 ? "1px solid #ddd" : "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "15px",
                  backgroundColor: activeSection === item.id ? "white" : "transparent",
                  transition: "background-color 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  if (activeSection !== item.id) {
                    e.currentTarget.style.backgroundColor = "#e8e3dd";
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeSection !== item.id) {
                    e.currentTarget.style.backgroundColor = "transparent";
                  }
                }}
              >

                <img src={item.icon} alt="" style={{ width: '20px', height: '20px' }} />

                <span style={{ fontSize: "16px", fontWeight: "500", color: "#333" }}>{item.label}</span>
              </div>
            ))}
          </div>

          <div className="main-content" style={{ backgroundColor: "#f0ebe5", borderRadius: "20px", padding: "40px" }}>
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}