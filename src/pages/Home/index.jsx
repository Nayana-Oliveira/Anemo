import React, { useState, useEffect } from "react";
import "./index.css";
import axios from "axios";

"use client";

export default function HomePage({ onNavigate, onProductSelect, onCategorySelect }) {
  const [topProducts, setTopProducts] = useState([]);
  const [bottomProducts, setBottomProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5010/products');
        const allProducts = response.data;
        setTopProducts(allProducts.slice(0, 6)); 
        setBottomProducts(allProducts.slice(6, 12)); 
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };

    fetchProducts();
  }, []);

  const categories = [
    { name: "Para Presentear", icon: "/assets/presentear.png", id: "para-presentear" },
    { name: "Plantas Grandes", icon: "/assets/plantasGrandes.png", id: "plantas-grandes" },
    { name: "Vasos", icon: "/assets/vasos.png", id: "vasos" },
    { name: "Todas as plantas", icon: "/products/flor.jpg", id: ""}
  ];

  const bottomCategories = [
    { name: "Kit de Sementes", icon: "/assets/sementes.png", id: "sementes" },
    { name: "Flores Comestíveis", icon: "/assets/comestiveis.png", id: "flores-comestiveis" },
    { name: "Flores", icon: "/assets/flores.png", id: "flores" }
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
          <h2 style={{textAlign: 'center', fontSize: '28px', marginBottom: '40px'}}>Nossos Produtos</h2>
          <div className="product-grid">
            {topProducts.map((product) => (
              <div key={product.id} className="product-card" >
                <img src={product.image || "/assets/placeholder.svg"} alt={product.productName} className="product-image" onClick={() => onProductSelect(product)} />
                <div className="product-info">
                  <div className="product-name">{product.productName}</div>
                  <div className="product-price">R$ {parseFloat(product.price).toFixed(2)}</div>
                  <div className="product-installments">ou em até 4x R$ {(parseFloat(product.price) / 4).toFixed(2)}</div>
                </div>
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

      <section className="products-section">
        <div className="container">
          <div className="product-grid">
            {bottomProducts.map((product) => (
              <div key={product.id} className="product-card" >
                <img src={product.image || "/assets/placeholder.svg"} alt={product.productName} className="product-image" onClick={() => onProductSelect(product)} />
                <div className="product-info">
                  <div className="product-name">{product.productName}</div>
                  <div className="product-price">R$ {parseFloat(product.price).toFixed(2)}</div>
                  <div className="product-installments">ou em até 4x R$ {(parseFloat(product.price) / 4).toFixed(2)}</div>
                </div>
                <button className="btn btn-primary" onClick={() => onProductSelect(product)}>Comprar</button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}