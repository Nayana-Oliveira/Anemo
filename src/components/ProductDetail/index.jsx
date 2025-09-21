"use client"

import { useState } from "react"
import "./index.css"

export default function ProductDetail({ onNavigate }) {
  const [selectedVase, setSelectedVase] = useState("Plástico")
  const [selectedSize, setSelectedSize] = useState("Pequeno")
  const [selectedColor, setSelectedColor] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [zipCode, setZipCode] = useState("")

  const categories = [
    "Vasos",
    "Plantas Grandes",
    "Para Presentear",
    "Brosilidades",
    "Acessórios",
    "Kit de Sementes",
    "Flores Comestíveis",
    "Flores Secas",
    "Flores",
    "Gramos",
    "Hortaliças",
  ]

  const productImages = [
    "/placeholder.svg?key=img1",
    "/placeholder.svg?key=img2",
    "/placeholder.svg?key=img3",
    "/placeholder.svg?key=img4",
    "/placeholder.svg?key=img5",
  ]

  const colors = ["#e8e8e8", "#d4d4d4", "#b8b8b8", "#a0a0a0"]

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change
    if (newQuantity >= 1) {
      setQuantity(newQuantity)
    }
  }

  const handleAddToCart = () => {
    alert("Produto adicionado ao carrinho!")
    onNavigate("cart")
  }

  const handleCalculateShipping = () => {
    if (zipCode) {
      alert("Frete calculado para CEP: " + zipCode)
    }
  }

  return (
    <div style={{ backgroundColor: "white", minHeight: "100vh" }}>
      <nav
        style={{
          backgroundColor: "white",
          borderBottom: "1px solid #e0e0e0",
          padding: "15px 0",
        }}
      >
        <div className="container">
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "30px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {categories.map((category, index) => (
              <a
                key={index}
                href="#"
                style={{
                  color: "#666",
                  textDecoration: "none",
                  fontSize: "14px",
                  fontWeight: "500",
                  transition: "color 0.3s ease",
                }}
                onMouseEnter={(e) => (e.target.style.color = "#6b9b76")}
                onMouseLeave={(e) => (e.target.style.color = "#666")}
              >
                {category}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <div className="container" style={{ padding: "20px 0" }}>
        <div style={{ fontSize: "14px", color: "#666" }}>
          <button
            onClick={() => onNavigate("home")}
            style={{
              background: "none",
              border: "none",
              color: "#6b9b76",
              textDecoration: "underline",
              cursor: "pointer",
            }}
          >
            Home
          </button>
          <span style={{ margin: "0 10px" }}>-</span>
          <span>Jiboia Verde</span>
        </div>
      </div>

      <div className="container" style={{ paddingBottom: "60px" }}>
        <div
          className="product-detail-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "60px",
            alignItems: "start",
          }}
        >
          <div>
            <div
              className="product-images-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "120px 1fr",
                gap: "20px",
              }}
            >
              <div className="product-thumbnails" style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                {productImages.map((image, index) => (
                  <div
                    key={index}
                    style={{
                      width: "100px",
                      height: "100px",
                      backgroundColor: "#f0f0f0",
                      borderRadius: "10px",
                      backgroundImage: `url(${image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      cursor: "pointer",
                      border: "2px solid transparent",
                      transition: "border-color 0.3s ease",
                    }}
                    onMouseEnter={(e) => (e.target.style.borderColor = "#6b9b76")}
                    onMouseLeave={(e) => (e.target.style.borderColor = "transparent")}
                  />
                ))}
              </div>

              <div
                style={{
                  width: "100%",
                  height: "500px",
                  backgroundColor: "#f0f0f0",
                  borderRadius: "15px",
                  backgroundImage: "url('/placeholder.svg?key=main')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
            </div>
          </div>

          <div>
            <h1 style={{ fontSize: "36px", fontWeight: "bold", marginBottom: "20px", color: "#333" }}>Jiboia Verde</h1>

            <div style={{ marginBottom: "30px" }}>
              <p style={{ fontSize: "28px", fontWeight: "bold", color: "#6b9b76", marginBottom: "5px" }}>R$ 182,90</p>
              <p style={{ fontSize: "16px", color: "#666" }}>ou em até 4x R$ 45,72</p>
            </div>

            <div style={{ marginBottom: "30px" }}>
              <h3 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "15px", color: "#333" }}>Vaso:</h3>
              <div className="variant-buttons" style={{ display: "flex", gap: "15px" }}>
                {["Plástico", "Cerâmica", "Barro"].map((vase) => (
                  <button
                    key={vase}
                    onClick={() => setSelectedVase(vase)}
                    style={{
                      padding: "10px 20px",
                      border: `2px solid ${selectedVase === vase ? "#6b9b76" : "#ddd"}`,
                      borderRadius: "8px",
                      backgroundColor: selectedVase === vase ? "#6b9b76" : "white",
                      color: selectedVase === vase ? "white" : "#333",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                    }}
                  >
                    {vase}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: "30px" }}>
              <h3 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "15px", color: "#333" }}>Tamanho:</h3>
              <div className="variant-buttons" style={{ display: "flex", gap: "15px" }}>
                {["Pequeno", "Grande"].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    style={{
                      padding: "10px 20px",
                      border: `2px solid ${selectedSize === size ? "#6b9b76" : "#ddd"}`,
                      borderRadius: "8px",
                      backgroundColor: selectedSize === size ? "#6b9b76" : "white",
                      color: selectedSize === size ? "white" : "#333",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                    }}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: "30px" }}>
              <h3 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "15px", color: "#333" }}>Cor:</h3>
              <div style={{ display: "flex", gap: "15px" }}>
                {colors.map((color, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedColor(index)}
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      backgroundColor: color,
                      border: `3px solid ${selectedColor === index ? "#6b9b76" : "#ddd"}`,
                      cursor: "pointer",
                      transition: "border-color 0.3s ease",
                    }}
                  />
                ))}
              </div>
            </div>

            <div style={{ marginBottom: "30px" }}>
              <div
                className="quantity-controls"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "20px",
                  marginBottom: "20px",
                }}
              >
                <div className="quantity-input-group" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    style={{
                      width: "40px",
                      height: "40px",
                      border: "2px solid #ddd",
                      borderRadius: "8px",
                      backgroundColor: "white",
                      cursor: "pointer",
                      fontSize: "18px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Number.parseInt(e.target.value) || 1)}
                    style={{
                      width: "60px",
                      height: "40px",
                      border: "2px solid #ddd",
                      borderRadius: "8px",
                      textAlign: "center",
                      fontSize: "16px",
                    }}
                  />
                  <button
                    onClick={() => handleQuantityChange(1)}
                    style={{
                      width: "40px",
                      height: "40px",
                      border: "2px solid #ddd",
                      borderRadius: "8px",
                      backgroundColor: "white",
                      cursor: "pointer",
                      fontSize: "18px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="btn btn-primary"
                  style={{ flex: 1, fontSize: "18px", fontWeight: "600" }}
                >
                  adicione ao carrinho
                </button>
              </div>
            </div>

            <div style={{ marginBottom: "30px" }}>
              <h3 style={{ fontSize: "16px", fontWeight: "600", marginBottom: "15px", color: "#333" }}>
                Simule seu frete
              </h3>
              <div style={{ display: "flex", gap: "10px" }}>
                <input
                  type="text"
                  placeholder="CEP"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  style={{
                    flex: 1,
                    padding: "12px",
                    border: "2px solid #ddd",
                    borderRadius: "8px",
                    fontSize: "16px",
                  }}
                />
                <button onClick={handleCalculateShipping} className="btn btn-primary">
                  Calcule
                </button>
              </div>
            </div>

            <div>
              <h3 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "15px", color: "#333" }}>
                Sobre a Jiboia Verde
              </h3>
              <p style={{ color: "#666", lineHeight: "1.6", fontSize: "16px" }}>
                Também conhecida como Hera-do Diabo ou jiboia, a Epipremnum pinnatum é uma planta com folhas brilhantes,
                cobertas por manchas amarelas. Essa espécie também pode ter manchas brancas - variedade que é conhecida
                como "Rainha de Mármore". A Epipremnum pinnatum se prende facilmente a estacas ou suportes, podendo ser
                cultivada como planta trepadeira ou deixada em trilha.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}