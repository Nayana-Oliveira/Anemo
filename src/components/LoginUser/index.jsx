"use client"

import { useState } from "react"
import "./index.css"
import axios from "axios"

export default function LoginUser({ onLogin, onNavigate }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:5010/users?email=${formData.email}&password=${formData.password}`);
      const users = response.data; 

      if (users.length > 0) {
        const loggedInUser = { ...users[0], type: "user" };
        onLogin(loggedInUser);
        onNavigate("user-dashboard");
      } else {
        alert("E-mail ou senha inválidos!");
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      alert("Erro ao fazer login. Tente novamente.");
    }
  };

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

        <h1 style={{ fontSize: "32px", marginBottom: "40px", color: "#333" }}>Login</h1>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">E-mail:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
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

          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <p style={{ color: "#666", marginBottom: "10px" }}>
              Não tem uma conta?
              <button
                type="button"
                onClick={() => onNavigate("register-user")}
                style={{
                  background: "none",
                  border: "none",
                  color: "#6b9b76",
                  textDecoration: "none",
                  cursor: "pointer",
                  marginLeft: "5px",
                  fontWeight: "bold"
                }}
              >
                Cadastre-se
              </button>
            </p>
            <p style={{ color: "#666", marginBottom: "15px" }}>Ou faça login com:</p>
          </div>

          <div className="social-login">
            <button type="button" className="social-btn">
              <img src="/assets/facebook.png" alt="Facebook" />
            </button>
            <button type="button" className="social-btn">
              <img src="/assets/google.svg" alt="Google" />
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
            onClick={() => onNavigate("login-admin")}
            style={{
              background: "none",
              border: "none",
              color: "#6b9b76",
              textDecoration: "none",
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            Login Administrador
          </button>
        </div>
      </div>
    </div>
  )
}