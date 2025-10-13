"use client"

import { useState, useEffect } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaTrash } from 'react-icons/fa';
import "./index.css";
import "../UserDashboard/index.css"; // Reusing user dashboard styles

const emptyAddress = {
  id: null, street: '', number: '', neighborhood: '', city: '', state: '', zipCode: ''
};

export default function AdminDashboard({ user, onNavigate, onEditProduct, onUpdateAdmin }) {
  const [activeSection, setActiveSection] = useState("products");
  const [products, setProducts] = useState([]);
  
  // State for address management
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [addressFormData, setAddressFormData] = useState(emptyAddress);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5010/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    }
  };

  useEffect(() => {
    if (activeSection === "products") {
      fetchProducts();
    }
  }, [activeSection]);

  useEffect(() => {
    if (selectedAddress) {
      setAddressFormData(selectedAddress);
      setIsAddingAddress(false);
    }
  }, [selectedAddress]);

  const handleDelete = async (productId) => {
    if (window.confirm("Tem certeza que deseja excluir este produto?")) {
      try {
        await fetch(`http://localhost:5010/products/${productId}`, {
          method: 'DELETE',
        });
        toast.success("Produto excluído com sucesso!");
        fetchProducts();
      } catch (error) {
        console.error('Erro ao excluir produto:', error);
        toast.error("Erro ao excluir produto.");
      }
    }
  };

  const handleAddressSubmit = async (e) => {
    e.preventDefault();
    const isEditing = !!selectedAddress;
    let updatedAddresses;

    if (isEditing) {
      updatedAddresses = (user.addresses || []).map(addr => addr.id === addressFormData.id ? addressFormData : addr);
    } else {
      const newAddress = { ...addressFormData, id: `addr${Date.now()}` };
      updatedAddresses = [...(user.addresses || []), newAddress];
    }

    const updatedAdmin = { ...user, addresses: updatedAddresses };

    try {
      const response = await axios.put(`http://localhost:5010/admins/${user.id}`, updatedAdmin);
      onUpdateAdmin(response.data);
      toast.success(`Endereço ${isEditing ? 'atualizado' : 'salvo'} com sucesso!`);
      setSelectedAddress(null);
      setIsAddingAddress(false);
    } catch (error) {
      console.error("Erro ao salvar endereço do admin:", error);
      toast.error("Erro ao salvar endereço.");
    }
  };

  const handleAddressDelete = async (addressId) => {
    if (window.confirm("Tem certeza que deseja excluir este endereço?")) {
      const updatedAddresses = user.addresses.filter(addr => addr.id !== addressId);
      const updatedAdmin = { ...user, addresses: updatedAddresses };

      try {
        const response = await axios.put(`http://localhost:5010/admins/${user.id}`, updatedAdmin);
        onUpdateAdmin(response.data);
        toast.success("Endereço excluído com sucesso!");
        if (selectedAddress?.id === addressId) {
          setSelectedAddress(null);
        }
      } catch (error) {
        console.error("Erro ao excluir endereço do admin:", error);
        toast.error("Erro ao excluir endereço.");
      }
    }
  };

  const handleAddNewAddress = () => {
    setSelectedAddress(null);
    setAddressFormData(emptyAddress);
    setIsAddingAddress(true);
  };
  
  const handleCancelAddress = () => {
    setSelectedAddress(null);
    setIsAddingAddress(false);
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddressFormData(prev => ({ ...prev, [name]: value }));
  };

  const menuItems = [
    { id: "account", label: "Minha conta", icon: "/assets/do-utilizador.png" },
    { id: "products", label: "Meus produtos", icon: "/assets/editar.png" },
    { id: "addresses", label: "Meus endereços", icon: "/assets/mapa.png" },
    { id: "register-product", label: "Cadastrar produtos", icon: "/assets/mais.png" },
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
                <div style={{ marginBottom: "20px" }}><strong style={{ color: "#333" }}>Nome completo</strong><p style={{ color: "#666", margin: "5px 0" }}>{user?.fullName || 'Nome não encontrado'}</p></div>
                <div style={{ marginBottom: "20px" }}><strong style={{ color: "#333" }}>E-mail:</strong><p style={{ color: "#666", margin: "5px 0" }}>{user?.email || 'E-mail não encontrado'}</p></div>
                <div style={{ marginBottom: "20px" }}><strong style={{ color: "#333" }}>CNPJ:</strong><p style={{ color: "#666", margin: "5px 0" }}>{user?.cnpj || 'CNPJ não encontrado'}</p></div>
              </div>
            </div>
          </div>
        );
      case "products":
        return (
          <div>
            <div className="products-header">
              <h2 style={{ fontSize: "24px", fontWeight: "bold", color: "#333" }}>Meus Produtos</h2>
              <button className="btn btn-primary" onClick={() => onNavigate("product-registration")}>
                Adicionar Produto
              </button>
            </div>
            <div className="products-list">
              {products.length > 0 ? (
                <table>
                  <thead><tr><th>Imagem</th><th>Nome</th><th>Preço</th><th>Ações</th></tr></thead>
                  <tbody>
                    {products.map(product => (
                      <tr key={product.id}>
                        <td><img src={product.image} alt={product.productName} className="product-list-image" /></td>
                        <td>{product.productName}</td>
                        <td>R$ {parseFloat(product.price).toFixed(2)}</td>
                        <td className="product-actions">
                          <button className="btn-edit" onClick={() => onEditProduct(product)}>Editar</button>
                          <button className="btn-delete" onClick={() => handleDelete(product.id)}>Excluir</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>Nenhum produto cadastrado ainda.</p>
              )}
            </div>
          </div>
        );
      case "addresses":
        return (
          <div className={`address-page-layout ${isAddingAddress || selectedAddress ? 'two-columns' : ''}`}>
            <div className="address-list-container">
              <div className="address-header">
                <h3>Seus Endereços</h3>
                <button className="btn btn-primary btn-sm" onClick={handleAddNewAddress}>Adicionar Novo</button>
              </div>
              {user?.addresses && user.addresses.length > 0 ? (
                <div className="address-list">
                  {user.addresses.map(addr => (
                    <div key={addr.id} className={`address-list-item ${selectedAddress?.id === addr.id ? 'active' : ''}`}>
                      <div className="address-info" onClick={() => setSelectedAddress(addr)}>
                        <p><strong>{addr.street}, {addr.number}</strong></p>
                        <p>{addr.city}, {addr.state}</p>
                      </div>
                      <div className="address-item-actions">
                         <button className="btn-edit-address" onClick={() => setSelectedAddress(addr)}>Editar</button>
                         <button className="btn-delete-address" onClick={() => handleAddressDelete(addr.id)}><FaTrash /></button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p>Nenhum endereço cadastrado.</p>
              )}
            </div>
            {(isAddingAddress || selectedAddress) && (
              <div className="address-form-container">
                <h3>{isAddingAddress ? 'Adicionar Novo Endereço' : 'Editar Endereço'}</h3>
                <form onSubmit={handleAddressSubmit}>
                  <div className="form-group"><label>Rua:</label><input type="text" name="street" value={addressFormData.street} onChange={handleAddressChange} required /></div>
                  <div className="form-grid-2">
                    <div className="form-group"><label>Número:</label><input type="text" name="number" value={addressFormData.number} onChange={handleAddressChange} required /></div>
                    <div className="form-group"><label>CEP:</label><input type="text" name="zipCode" value={addressFormData.zipCode} onChange={handleAddressChange} required /></div>
                  </div>
                  <div className="form-group"><label>Bairro:</label><input type="text" name="neighborhood" value={addressFormData.neighborhood} onChange={handleAddressChange} required /></div>
                  <div className="form-grid-2">
                    <div className="form-group"><label>Cidade:</label><input type="text" name="city" value={addressFormData.city} onChange={handleAddressChange} required /></div>
                    <div className="form-group"><label>Estado:</label><input type="text" name="state" value={addressFormData.state} onChange={handleAddressChange} required /></div>
                  </div>
                  <div className="form-actions">
                    <button type="button" className="btn btn-secondary" onClick={handleCancelAddress}>Cancelar</button>
                    <button type="submit" className="btn btn-primary">{isAddingAddress ? 'Salvar' : 'Atualizar'}</button>
                  </div>
                </form>
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div style={{ backgroundColor: "#6b9b76", minHeight: "100vh" }}>
      <div className="container" style={{ padding: "40px 0" }}>
        <div className="dashboard-grid">
          <div className="sidebar-menu">
            {menuItems.map((item) => (
              <div key={item.id} className={`menu-item ${activeSection === item.id ? "active" : ""}`} onClick={() => handleMenuClick(item.id)}>
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
    </div>
  );
}