"use client"

import { useState } from "react"
import "./index.css"
import { toast } from 'react-toastify';

export default function RegisterAdmin({ onNavigate }) {
  const [formData, setFormData] = useState({
    fullName: "",
    birthDate: "",
    cnpj: "",
    phone: "",
    mobile: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      toast.error("As senhas não correspondem!");
      return;
    }

    const { confirmPassword, ...adminData } = formData;

    try {
      await fetch('http://localhost:5010/admins', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(adminData),
      });
      toast.success("Cadastro de administrador realizado com sucesso!")
      onNavigate("login-admin")
    } catch (error) {
      console.error('Erro ao cadastrar administrador:', error);
      toast.error("Erro ao cadastrar administrador. Tente novamente.");
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="auth-page">
      <div className="auth-card" style={{ maxWidth: "800px" }}>
        <div className="auth-logo">
          <img src="/assets/anemo_logo.png" alt="Anêmo logo"/>
        </div>

        <h1 style={{ fontSize: "32px", marginBottom: "20px", color: "#333" }}>Cadastro de Administrador</h1>
        <h2 style={{ fontSize: "20px", marginBottom: "30px", color: "#666" }}>Dados Pessoais</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="fullName">Nome completo:</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            <div className="form-group">
              <label htmlFor="birthDate">Data de nascimento:</label>
              <input
                type="date"
                id="birthDate"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="cnpj">CNPJ:</label>
              <input
                type="text"
                id="cnpj"
                name="cnpj"
                value={formData.cnpj}
                onChange={handleChange}
                placeholder="00.000.000/0000-00"
                required
              />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            <div className="form-group">
              <label htmlFor="phone">Telefone:</label>
              <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label htmlFor="mobile">Celular:</label>
              <input type="tel" id="mobile" name="mobile" value={formData.mobile} onChange={handleChange} required />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">E-mail:</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="password">Senha de acesso:</label>
            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {showPassword ? "Esconder" : "Mostrar"}
              </button>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Digite novamente:</label>
            <div style={{ position: "relative" }}>
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {showConfirmPassword ? "Esconder" : "Mostrar"}
              </button>
            </div>
          </div>

          <div style={{ textAlign: "center", marginTop: "40px" }}>
            <button type="submit" className="btn btn-primary" style={{ minWidth: "120px" }}>
              Registrar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}