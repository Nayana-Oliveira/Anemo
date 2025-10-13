import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './index.css';

const emptyAddress = {
  id: null,
  street: '',
  number: '',
  neighborhood: '',
  city: '',
  state: '',
  zipCode: ''
};

export default function AddressPage({ user, onNavigate, onUpdateUser }) {
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState(emptyAddress);

  useEffect(() => {
    if (selectedAddress) {
      setFormData(selectedAddress);
      setIsAdding(false);
    } else {
      setFormData(emptyAddress);
    }
  }, [selectedAddress]);

  const handleSelectAddress = (address) => {
    setSelectedAddress(address);
    setIsAdding(false);
  };

  const handleAddNew = () => {
    setSelectedAddress(null);
    setIsAdding(true);
    setFormData(emptyAddress);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    let updatedAddresses;
    const isEditing = !!selectedAddress;

    if (isEditing) {
      updatedAddresses = user.addresses.map(addr =>
        addr.id === formData.id ? formData : addr
      );
    } else {
      const newAddress = { ...formData, id: `addr${Date.now()}` };
      updatedAddresses = [...(user.addresses || []), newAddress];
    }

    const updatedUser = { ...user, addresses: updatedAddresses };

    try {
      const response = await axios.put(`http://localhost:5010/users/${user.id}`, updatedUser);
      onUpdateUser(response.data);
      toast.success(`Endereço ${isEditing ? 'atualizado' : 'salvo'} com sucesso!`);
      setSelectedAddress(null);
      setIsAdding(false);
    } catch (error) {
      console.error("Erro ao salvar endereço:", error);
      toast.error("Erro ao salvar endereço. Tente novamente.");
    }
  };

  const handleCancel = () => {
    setSelectedAddress(null);
    setIsAdding(false);
  }

  const { addresses } = user || { addresses: [] };

  return (
    <div className="address-page-background">
      <div className="container">
        <div className="address-page-layout">
          {/* Left Column: Address List */}
          <div className="address-list-container">
            <div className="address-header">
              <h1>Meus Endereços</h1>
              <button className="btn btn-primary" onClick={handleAddNew}>
                Adicionar Novo
              </button>
            </div>
            {addresses && addresses.length > 0 ? (
              <div className="address-list">
                {addresses.map(addr => (
                  <div key={addr.id} className={`address-list-item ${selectedAddress?.id === addr.id ? 'active' : ''}`}>
                    <div className="address-info">
                      <p><strong>{addr.street}, {addr.number}</strong></p>
                      <p>{addr.city}, {addr.state}</p>
                    </div>
                    <button
                      className="btn-edit-address-list"
                      onClick={() => handleSelectAddress(addr)}
                    >
                      Editar
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state-address">
                <p>Nenhum endereço cadastrado.</p>
              </div>
            )}
             <button className="btn btn-secondary" onClick={() => onNavigate('user-dashboard')} style={{marginTop: '20px'}}>
              Voltar ao Painel
            </button>
          </div>

          {/* Right Column: Form */}
          {(isAdding || selectedAddress) && (
            <div className="address-form-container">
              <div className="address-form-card">
                <h2>{isAdding ? 'Adicionar Novo Endereço' : 'Editar Endereço'}</h2>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="street">Rua / Avenida:</label>
                    <input type="text" id="street" name="street" value={formData.street} onChange={handleChange} required />
                  </div>
                  <div className="form-grid-2">
                    <div className="form-group">
                      <label htmlFor="number">Número:</label>
                      <input type="text" id="number" name="number" value={formData.number} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="zipCode">CEP:</label>
                      <input type="text" id="zipCode" name="zipCode" value={formData.zipCode} onChange={handleChange} required />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="neighborhood">Bairro:</label>
                    <input type="text" id="neighborhood" name="neighborhood" value={formData.neighborhood} onChange={handleChange} required />
                  </div>
                  <div className="form-grid-2">
                    <div className="form-group">
                      <label htmlFor="city">Cidade:</label>
                      <input type="text" id="city" name="city" value={formData.city} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="state">Estado:</label>
                      <input type="text" id="state" name="state" value={formData.state} onChange={handleChange} required />
                    </div>
                  </div>
                  <div className="form-actions">
                    <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                      Cancelar
                    </button>
                    <button type="submit" className="btn btn-primary">
                      {isAdding ? 'Salvar Endereço' : 'Salvar Alterações'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}