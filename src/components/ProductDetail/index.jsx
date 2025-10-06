"use client"

import { useState } from "react"
import "./index.css"

export default function ProductDetail({ onNavigate, product, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(product ? product.image : "");

  if (!product) {
    return (
      <div className="container" style={{ padding: "40px", textAlign: "center" }}>
        <h2>Produto não encontrado</h2>
        <p>Por favor, volte para a página inicial e selecione um produto.</p>
        <button className="btn btn-primary" onClick={() => onNavigate("home")}>Voltar para Home</button>
      </div>
    );
  }

  const productImages = product.images || [product.image];

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  return (
    <div style={{ backgroundColor: "white", padding: "20px 0" }}>
      <div className="container">
        <div style={{ fontSize: "14px", color: "#666", marginBottom: "20px" }}>
          <button
            onClick={() => onNavigate("home")}
            style={{ background: "none", border: "none", color: "#6b9b76", textDecoration: "underline", cursor: "pointer" }}
          >
            Home
          </button>
          <span style={{ margin: "0 10px" }}>-</span>
          <span>{product.productName}</span>
        </div>

        <div className="product-detail-grid">
          <div className="product-images-grid">
            <div className="product-thumbnails">
              {productImages.map((imgSrc, index) => (
                <div
                  key={index}
                  style={{
                    width: '100px',
                    height: '100px',
                    backgroundImage: `url(${imgSrc})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    border: mainImage === imgSrc ? '2px solid #6b9b76' : '2px solid transparent',
                  }}
                  onClick={() => setMainImage(imgSrc)} 
                />
              ))}
            </div>

            <div style={{
              width: "100%",
              paddingTop: "100%",
              backgroundColor: "#f0f0f0",
              borderRadius: "15px",
              backgroundImage: `url(${mainImage})`, 
              backgroundSize: "cover",
              backgroundPosition: "center",
            }} />
          </div>

          <div>
            <h1 style={{ fontSize: "36px", fontWeight: "bold", color: "#333" }}>{product.productName}</h1>
            <div style={{ marginBottom: "30px" }}>
              <p style={{ fontSize: "28px", fontWeight: "bold", color: "#6b9b76" }}>R$ {parseFloat(product.price).toFixed(2)}</p>
              <p style={{ fontSize: "16px", color: "#666" }}>ou em até 4x R$ {(product.price / 4).toFixed(2)}</p>
            </div>
            
            <div className="quantity-controls" style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '20px' }}>
              <div className="quantity-input-group" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button onClick={() => handleQuantityChange(-1)} style={{ width: '40px', height: '40px', border: '1px solid #ddd', cursor: 'pointer' }}>-</button>
                <input type="number" value={quantity} readOnly style={{ width: '60px', textAlign: 'center', height: '40px', border: '1px solid #ddd' }} />
                <button onClick={() => handleQuantityChange(1)} style={{ width: '40px', height: '40px', border: '1px solid #ddd', cursor: 'pointer' }}>+</button>
              </div>
              <button onClick={() => onAddToCart(product, quantity)} className="btn btn-primary" style={{ flex: 1, fontSize: "18px" }}>
                Adicionar ao carrinho
              </button>
            </div>
            
            <div>
              <h3 style={{ fontSize: "18px", fontWeight: "600", color: "#333" }}>Descrição</h3>
              <p style={{ color: "#666", lineHeight: "1.6" }}>{product.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}