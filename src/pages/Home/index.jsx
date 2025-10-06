import React, { useState, useEffect } from "react";
import "./index.css";

"use client";

export default function HomePage({ onNavigate, onProductSelect }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5010/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };

    fetchProducts();
  }, []);

  const categories = [
    { name: "Flores Secas", icon: "/assets/FloresSecas.png" },
    { name: "Acessórios", icon: "/assets/acessorios.png" },
    { name: "Bromelíaceas", icon: "/assets/bromeliaceas.png" },
    { name: "Para Presentear", icon: "/assets/presentear.png" },
    { name: "Plantas Grandes", icon: "/assets/plantasGrandes.png" },
    { name: "Vasos", icon: "/assets/vasos.png" },
  ];

  const bottomCategories = [
    { name: "Kit de Sementes", icon: "/assets/sementes.png" },
    { name: "Flores Comestíveis", icon: "/assets/comestiveis.png" },
    { name: "Hortaliças", icon: "/assets/hortalicas.png" },
    { name: "Ervas e Condimentos", icon: "/assets/ervas.png" },
    { name: "Flores", icon: "/assets/flores.png" },
    { name: "Gramas", icon: "/assets/grama.png" },
  ];
  
  return (
    <div className="home-page">
      <section className="hero-banner">
      </section>

      <section className="categories-section">
        <div className="container">
          <div className="category-grid">
            {categories.map((category, index) => (
              <div key={index} className="category-item" onClick={() => onNavigate("product")}>
                <div className="category-circle">
                  <img src={category.icon} alt={category.name} className="category-icon" />
                </div>
                <div className="category-label">{category.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="products-section">
        <div className="container">
          <div className="product-grid">
            {products.map((product) => (
              <div key={product.id} className="product-card" >
                <img src={product.image || "/assets/placeholder.svg"} alt={product.productName} className="product-image" onClick={() => onProductSelect(product)} />
                <div className="product-name">{product.productName}</div>
                <div className="product-price">R$ {parseFloat(product.price).toFixed(2)}</div>
                <div className="product-installments">ou em até 4x R$ {(product.price / 4).toFixed(2)}</div>
                <button className="btn btn-primary" onClick={() => onProductSelect(product)}>Comprar</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="decorative-section"></div>

      <section className="categories-section">
        <div className="container">
          <div className="category-grid">
            {bottomCategories.map((category, index) => (
              <div key={index} className="category-item" onClick={() => onNavigate("product")}>
                <div className="category-circle">
                  <img src={category.icon} alt={category.name} className="category-icon" />
                </div>
                <div className="category-label">{category.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}