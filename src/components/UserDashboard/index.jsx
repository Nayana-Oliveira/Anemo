"use client"

import { useState } from "react"
import "./index.css"

export default function UserDashboard({ user, onNavigate, onLogout }) {
  const [activeSection, setActiveSection] = useState("account")

  const menuItems = [
    { id: "account", label: "Minha conta", icon: "/assets/do-utilizador.png" },
    { id: "data", label: "Meus dados", icon: "/assets/documento.png" },
    { id: "addresses", label: "Meus endereços", icon: "/assets/mapa.png" },
    { id: "orders", label: "Pedidos", icon: "/assets/editar.png" },
    { id: "exchanges", label: "Trocas e devoluções", icon: "/assets/exchange-alt.png" },
    { id: "logout", label: "Sair", icon: "/assets/saida.png" },
  ]

  const handleMenuClick = (itemId) => {
    if (itemId === "logout") {
      onNavigate("login-user");
    } else {
      setActiveSection(itemId)
    }
  }
  const renderContent = () => {
    switch (activeSection) {
      case "account":
        return (
          <div>
            <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "30px", color: "#333" }}>
              Dados do último pedido:
            </h2>
            <div
              style={{
                backgroundColor: "white",
                borderRadius: "15px",
                padding: "40px",
                textAlign: "center",
                color: "#666",
                fontSize: "18px",
                marginBottom: "40px",
              }}
            >
              Sem pedidos anteriores. :(
            </div>

            <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "30px", color: "#333" }}>
              Dados pessoais:
            </h2>
            <div style={{ backgroundColor: "white", borderRadius: "15px", padding: "40px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px", alignItems: "start" }}>
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
                    <strong style={{ color: "#333" }}>CPF:</strong>
                    <p style={{ color: "#666", margin: "5px 0" }}>{user?.cpf || 'CPF não encontrado'}</p>
                  </div>
                </div>
                <div>
                  <div style={{ marginBottom: "20px" }}>
                    <strong style={{ color: "#333" }}>Data de nascimento:</strong>
                    <p style={{ color: "#666", margin: "5px 0" }}>{user?.birthDate || 'Data não encontrada'}</p>
                  </div>
                  <div style={{ marginBottom: "20px" }}>
                    <strong style={{ color: "#333" }}>Telefone:</strong>
                    <p style={{ color: "#666", margin: "5px 0" }}>{user?.phone || 'Telefone não encontrado'}</p>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                    <div
                      style={{
                        width: "120px",
                        height: "120px",
                        borderRadius: "50%",
                        border: "8px solid #6b9b76",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "48px",
                        fontWeight: "bold",
                        color: "#6b9b76",
                        backgroundColor: "white",
                      }}
                    >
                      90%
                    </div>
                    <div>
                      <p style={{ color: "#6b9b76", fontWeight: "600", fontSize: "16px" }}>Complete</p>
                      <p style={{ color: "#6b9b76", fontWeight: "600", fontSize: "16px" }}>seus</p>
                      <p style={{ color: "#6b9b76", fontWeight: "600", fontSize: "16px" }}>dados</p>
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ textAlign: "center", marginTop: "30px" }}>
                <button
                  className="btn btn-primary"
                  onClick={() => setActiveSection("data")}
                  style={{ minWidth: "180px" }}
                >
                  Editar meus dados
                </button>
              </div>
            </div>
          </div>
        )

      case "data":
        return (
          <div>
            <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "30px", color: "#333" }}>
              Editar Dados Pessoais
            </h2>
            <div style={{ backgroundColor: "white", borderRadius: "15px", padding: "40px" }}>
              <form>
                <div className="form-group">
                  <label>Nome completo:</label>
                  <input type="text" defaultValue={user?.fullName} />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                  <div className="form-group">
                    <label>Data de nascimento:</label>
                    <input type="date" defaultValue={user?.birthDate} />
                  </div>
                  <div className="form-group">
                    <label>CPF:</label>
                    <input type="text" defaultValue={user?.cpf} />
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                  <div className="form-group">
                    <label>Telefone:</label>
                    <input type="tel" defaultValue={user?.phone} />
                  </div>
                  <div className="form-group">
                    <label>E-mail:</label>
                    <input type="email" defaultValue={user?.email} />
                  </div>
                </div>
                <div style={{ textAlign: "center", marginTop: "30px" }}>
                  <button type="submit" className="btn btn-primary" style={{ minWidth: "150px" }}>
                    Salvar Alterações
                  </button>
                </div>
              </form>
            </div>
          </div>
        )

      case "addresses":
        return (
          <div>
            <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "30px", color: "#333" }}>
              Meus Endereços
            </h2>
            <div
              style={{
                backgroundColor: "white",
                borderRadius: "15px",
                padding: "40px",
                textAlign: "center",
                color: "#666",
                fontSize: "18px",
              }}
            >
              <p>Nenhum endereço cadastrado.</p>
              <button className="btn btn-primary" style={{ marginTop: "20px" }}>
                Adicionar Endereço
              </button>
            </div>
          </div>
        )

      case "orders":
        return (
          <div>
            <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "30px", color: "#333" }}>Meus Pedidos</h2>
            <div
              style={{
                backgroundColor: "white",
                borderRadius: "15px",
                padding: "40px",
                textAlign: "center",
                color: "#666",
                fontSize: "18px",
              }}
            >
              Sem pedidos anteriores. :(
            </div>
          </div>
        )

      case "exchanges":
        return (
          <div>
            <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "30px", color: "#333" }}>
              Trocas e Devoluções
            </h2>
            <div
              style={{
                backgroundColor: "white",
                borderRadius: "15px",
                padding: "40px",
                textAlign: "center",
                color: "#666",
                fontSize: "18px",
              }}
            >
              <p>Nenhuma solicitação de troca ou devolução.</p>
              <button className="btn btn-secondary" style={{ marginTop: "20px" }}>
                Solicitar Troca/Devolução
              </button>
            </div>
          </div>
        )

      default:
        return null
    }
  }

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
                    e.currentTarget.style.backgroundColor = "#e8e3dd"
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeSection !== item.id) {
                    e.currentTarget.style.backgroundColor = "transparent"
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
  )
}