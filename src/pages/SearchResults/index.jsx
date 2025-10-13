import React from 'react';
import './index.css';
import '../../pages/Home/index.css';

export default function SearchResults({ results, onProductSelect }) {
  return (
    <div className="search-results-page">
      <div className="container">
        <h1 className="search-results-title">Resultados da Busca</h1>
        {results.length > 0 ? (
          <div className="product-grid">
            {results.map((product) => (
              <div key={product.id} className="product-card" onClick={() => onProductSelect(product)}>
                <img src={product.image || "/assets/placeholder.svg"} alt={product.productName} className="product-image" />
                <div className="product-info">
                  <div className="product-name">{product.productName}</div>
                  <div className="product-price">R$ {parseFloat(product.price).toFixed(2)}</div>
                  <div className="product-installments">ou em até 4x R$ {(parseFloat(product.price) / 4).toFixed(2)}</div>
                </div>
                <button className="btn btn-primary">Ver Produto</button>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-results-message">Nenhum produto encontrado.</p>
        )}
      </div>
    </div>
  );
}