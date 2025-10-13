import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './index.css';

export default function AddressForm({ user, addressToEdit, onNavigate, onUpdateUser }) {
  const [formData, setFormData] = useState({
    id: '',
    street: '',
    number: '',
    neighborhood: '',
    city: '',
    state: '',
    zipCode: ''
  });

  const isEditing = !!addressToEdit;

  useEffect(() => {
    if (isEditing) {
      setFormData(addressToEdit);
    }
  }, [addressToEdit, isEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    let updatedAddresses;

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
      onNavigate('address-management');
    } catch (error) {
      console.error("Erro ao salvar endereço:", error);
      toast.error("Erro ao salvar endereço. Tente novamente.");
    }
  };

  return (
    <div className="address-form-page">
      <div className="address-form-card">
        <h1>{isEditing ? 'Editar Endereço' : 'Adicionar Novo Endereço'}</h1>
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
            <button type="button" className="btn btn-secondary" onClick={() => onNavigate('address-management')}>
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary">
              {isEditing ? 'Salvar Alterações' : 'Salvar Endereço'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}