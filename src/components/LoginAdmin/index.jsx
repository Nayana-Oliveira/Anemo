"use client"

import { useState } from "react"
import "./index.css"


export default function LoginAdmin({ onLogin, onNavigate }) {
  const [formData, setFormData] = useState({
    loginId: "",
    password: "",
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onLogin({ name: "Administrador", email: formData.loginId }, "admin")
    onNavigate("admin-dashboard")
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">
          <img src="/assets/anemo_logo.png" alt="Anêmo logo" />
        </div>

        <h1 style={{ fontSize: "32px", marginBottom: "40px", color: "#333" }}>Login Administrador</h1>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="loginId">ID de Login:</label>
            <input type="text" id="loginId" name="loginId" value={formData.loginId} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="password">Senha:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div style={{ marginBottom: "30px" }}>
            <a href="#" style={{ color: "#666", fontSize: "14px", textDecoration: "underline" }}>
              Esqueceu a senha?
            </a>
          </div>

          <div style={{ textAlign: "center", marginBottom: "30px" }}>
            <button type="submit" className="btn btn-primary" style={{ minWidth: "120px" }}>
              Entrar
            </button>
          </div>
        </form>

        <div
          style={{
            textAlign: "center",
            marginTop: "30px",
            paddingTop: "20px",
            borderTop: "1px solid #ddd",
          }}
        >
          <button
            onClick={() => onNavigate("login-user")}
            style={{
              background: "none",
              border: "none",
              color: "#6b9b76",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            Login Usuário
          </button>
        </div>
      </div>
    </div>
  )
}