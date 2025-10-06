"use client"

import { useState, useEffect } from "react";
import axios from 'axios';
import "./index.css";

export default function UserDashboard({ user, onNavigate, onUpdateUser }) {
  const [activeSection, setActiveSection] = useState("account");
  const [formData, setFormData] = useState(user || {});

  useEffect(() => {
    setFormData(user || {});
  }, [user]);

  const handleDataChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDataSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5010/users/${user.id}`, formData);
      onUpdateUser(response.data);
      alert("Dados atualizados com sucesso!");
      setActiveSection("account");
    } catch (error) {
      console.error("Erro ao atualizar dados:", error);
      alert("Não foi possível atualizar os dados. Tente novamente.");
    }
  };

  const calculateProfileCompletion = () => {
    if (!user) return 0;
    const fields = ['fullName', 'birthDate', 'cpf', 'phone', 'mobile', 'email'];
    const filledFields = fields.filter(field => user[field] && user[field].trim() !== '');
    return Math.round((filledFields.length / fields.length) * 100);
  };

  const completionPercentage = calculateProfileCompletion();

  const menuItems = [
    { id: "account", label: "Minha conta", icon: "/assets/do-utilizador.png" },
    { id: "data", label: "Meus dados", icon: "/assets/documento.png" },
    { id: "addresses", label: "Meus endereços", icon: "/assets/mapa.png" },
    { id: "orders", label: "Pedidos", icon: "/assets/editar.png" },
    { id: "logout", label: "Sair", icon: "/assets/saida.png" },
  ];

  const handleMenuClick = (itemId) => {
    if (itemId === "logout") {
      onNavigate("login-user");
    } else {
      setActiveSection(itemId);
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case "account":
        return (
          <div className="content-section">
            <h2>Minha Conta</h2>
            <div className="user-info-grid">
              <div>
                <p><strong>Nome:</strong> {user?.fullName || 'Não informado'}</p>
                <p><strong>E-mail:</strong> {user?.email || 'Não informado'}</p>
                 <button className="edit-btn" onClick={() => setActiveSection("data")}>
                    Editar meus dados
                 </button>
              </div>
              <div className="progress-section">
                <div 
                  className="progress-circle" 
                  style={{ background: `conic-gradient(#477556 0deg ${completionPercentage * 3.6}deg, #e0e0e0 ${completionPercentage * 3.6}deg 360deg)` }}
                >
                  <div className="progress-inner">
                    <span className="progress-percentage">{completionPercentage}%</span>
                  </div>
                </div>
                <div className="progress-label">
                  <p>Dados completos</p>
                   {completionPercentage < 100 && (
                     <a href="#" className="complete-now-link" onClick={() => setActiveSection("data")}>Completar agora</a>
                  )}
                </div>
              </div>
            </div>
          </div>
        );

      case "data":
        return (
          <div className="content-section">
            <h2>Meus Dados Pessoais</h2>
            <form onSubmit={handleDataSubmit}>
              <div className="form-group">
                <label>Nome completo:</label>
                <input type="text" name="fullName" value={formData.fullName || ''} onChange={handleDataChange} />
              </div>
              <div className="form-grid-2">
                <div className="form-group">
                  <label>Data de nascimento:</label>
                  <input type="date" name="birthDate" value={formData.birthDate || ''} onChange={handleDataChange} />
                </div>
                <div className="form-group">
                  <label>CPF:</label>
                  <input type="text" name="cpf" value={formData.cpf || ''} onChange={handleDataChange} />
                </div>
              </div>
              <div className="form-grid-2">
                <div className="form-group">
                  <label>Telefone:</label>
                  <input type="tel" name="phone" value={formData.phone || ''} onChange={handleDataChange} />
                </div>
                <div className="form-group">
                  <label>Celular:</label>
                  <input type="tel" name="mobile" value={formData.mobile || ''} onChange={handleDataChange} />
                </div>
              </div>
              <div className="form-group">
                <label>E-mail:</label>
                <input type="email" name="email" value={formData.email || ''} onChange={handleDataChange} />
              </div>
              <div style={{ textAlign: "right", marginTop: "20px" }}>
                <button type="submit" className="btn btn-primary">Salvar Alterações</button>
              </div>
            </form>
          </div>
        );

      case "addresses":
        return (
          <div className="content-section">
            <h2>Meus Endereços</h2>
            {user?.addresses && user.addresses.length > 0 ? user.addresses.map(addr => (
              <div key={addr.id} className="address-card">
                <div>
                  <p><strong>{addr.street}, {addr.number}</strong></p>
                  <p>{addr.neighborhood} - {addr.city}, {addr.state} | CEP: {addr.zipCode}</p>
                </div>
                <button className="btn-edit-address">Editar</button>
              </div>
            )) : (
              <div className="empty-state">
                <p>Nenhum endereço cadastrado.</p>
              </div>
            )}
            <button className="btn btn-primary" style={{ marginTop: "20px" }}>Adicionar Endereço</button>
          </div>
        );

      case "orders":
        return (
          <div className="content-section">
            <h2>Meus Pedidos</h2>
            <div className="empty-state">
              <p>Você ainda não fez nenhum pedido.</p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-grid">
        <div className="sidebar-menu">
          {menuItems.map((item) => (
            <div
              key={item.id}
              className={`menu-item ${activeSection === item.id ? "active" : ""}`}
              onClick={() => handleMenuClick(item.id)}
            >
              <img src={item.icon} alt="" className="menu-icon-img" />
              <span>{item.label}</span>
            </div>
          ))}
        </div>
        <div className="main-content">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}