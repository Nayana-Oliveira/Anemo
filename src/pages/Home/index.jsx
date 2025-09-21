import React from "react";
import "./index.css";

"use client";

export default function HomePage({ onNavigate }) {
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

  const products = [
    {
      name: "Jiboia Verde",
      price: "R$ 182,90",
      installments: "ou em até 4x R$ 45,72",
      image: "/assets/jiboia_verde_.png",
    },
    {
      name: "Jiboia Verde",
      price: "R$ 182,90",
      installments: "ou em até 4x R$ 45,72",
      image: "/assets/jiboia_verde_.png",
    },
    {
      name: "Jiboia Verde",
      price: "R$ 182,90",
      installments: "ou em até 4x R$ 45,72",
      image: "/assets/jiboia_verde_.png",
    },
    {
      name: "Jiboia Verde",
      price: "R$ 182,90",
      installments: "ou em até 4x R$ 45,72",
      image: "/assets/jiboia_verde_.png",
    },
    {
      name: "Jiboia Verde",
      price: "R$ 182,90",
      installments: "ou em até 4x R$ 45,72",
      image: "/assets/jiboia_verde_.png",
    },
    {
      name: "Jiboia Verde",
      price: "R$ 182,90",
      installments: "ou em até 4x R$ 45,72",
      image: "/assets/jiboia_verde_.png",
    },
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
            {products.map((product, index) => (
              <div key={index} className="product-card" onClick={() => onNavigate("product")}>
                <img src={product.image || "/assets/placeholder.svg"} alt={product.name} className="product-image" />
                <div className="product-name">{product.name}</div>
                <div className="product-price">{product.price}</div>
                <div className="product-installments">{product.installments}</div>
                <button className="btn btn-primary">Comprar</button>
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

      <section className="products-section">
        <div className="container">
          <div className="product-grid">
            {products.map((product, index) => (
              <div key={index} className="product-card" onClick={() => onNavigate("product")}>
                <img src={product.image || "/assets/placeholder.svg"} alt={product.name} className="product-image" />
                <div className="product-name">{product.name}</div>
                <div className="product-price">{product.price}</div>
                <div className="product-installments">{product.installments}</div>
                <button className="btn btn-primary">Comprar</button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}