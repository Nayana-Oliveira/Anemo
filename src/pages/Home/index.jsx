import React, { useState, useEffect } from "react";
import "./index.css";
import axios from "axios";

"use client";

export default function HomePage({ onNavigate, onProductSelect, onCategorySelect }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5010/products');
        setProducts(response.data); 
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };

    fetchProducts();
  }, []);

  const categories = [
    { name: "Flores Secas", icon: "/assets/FloresSecas.png", id: "flores-secas" },
    { name: "Acessórios", icon: "/assets/acessorios.png", id: "acessorios" },
    { name: "Bromelíaceas", icon: "/assets/bromeliaceas.png", id: "bromeliaceas" },
    { name: "Para Presentear", icon: "/assets/presentear.png", id: "para-presentear" },
    { name: "Plantas Grandes", icon: "/assets/plantasGrandes.png", id: "plantas-grandes" },
    { name: "Vasos", icon: "/assets/vasos.png", id: "vasos" },
  ];

  const bottomCategories = [
    { name: "Kit de Sementes", icon: "/assets/sementes.png", id: "sementes" },
    { name: "Flores Comestíveis", icon: "/assets/comestiveis.png", id: "flores-comestiveis" },
    { name: "Hortaliças", icon: "/assets/hortalicas.png", id: "hortalicas" },
    { name: "Ervas e Condimentos", icon: "/assets/ervas.png", id: "ervas" },
    { name: "Flores", icon: "/assets/flores.png", id: "flores" },
    { name: "Gramas", icon: "/assets/grama.png", id: "gramas" },
  ];
  
  return (
    <div className="home-page">
      <section className="hero-banner">
      </section>

      <section className="categories-section">
        <div className="container">
          <div className="category-grid">
            {categories.map((category, index) => (
              <div key={index} className="category-item" onClick={() => onCategorySelect(category.id)}>
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
          <h2 style={{textAlign: 'center', fontSize: '28px', marginBottom: '40px'}}>Produtos em Destaque</h2>
          <div className="product-grid">
            {products.slice(0, 6).map((product) => ( 
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
              <div key={index} className="category-item" onClick={() => onCategorySelect(category.id)}>
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