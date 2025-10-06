"use client"

import { useState } from "react";
import "./index.css";

export default function CartPage({ onNavigate }) {
  const [cartItem, setCartItem] = useState({
    name: "Jiboia Verde",
    price: 182.90,
    quantity: 1,
    image: "/assets/jiboia_verde_.png",
  });
  
  const [selectedPayment, setSelectedPayment] = useState(null);

  const handleQuantityChange = (amount) => {
    setCartItem(prevItem => ({
      ...prevItem,
      quantity: Math.max(1, prevItem.quantity + amount)
    }));
  };

  const renderPaymentDetails = () => {
    switch (selectedPayment) {
      case "pix":
        return (
          <div className="payment-details-form">
            <h4>Preencha os dados para o PIX</h4>
            <div className="form-group">
              <label htmlFor="pix-name">Nome Completo</label>
              <input type="text" id="pix-name" placeholder="Seu nome completo" />
            </div>
            <div className="form-group">
              <label htmlFor="pix-cpf">CPF</label>
              <input type="text" id="pix-cpf" placeholder="000.000.000-00" />
            </div>
          </div>
        );
      case "card":
        return (
          <div className="payment-details-form">
            <h4>Preencha os dados do Cartão</h4>
            <div className="form-group">
              <label htmlFor="card-number">Número do Cartão</label>
              <input type="text" id="card-number" placeholder="0000 0000 0000 0000" />
            </div>
            <div className="form-group">
              <label htmlFor="card-name">Nome no Cartão</label>
              <input type="text" id="card-name" placeholder="Como está escrito no cartão" />
            </div>
            <div className="form-grid-2">
              <div className="form-group">
                <label htmlFor="card-expiry">Validade</label>
                <input type="text" id="card-expiry" placeholder="MM/AA" />
              </div>
              <div className="form-group">
                <label htmlFor="card-cvv">CVV</label>
                <input type="text" id="card-cvv" placeholder="123" />
              </div>
            </div>
          </div>
        );
      case "boleto":
        return (
          <div className="payment-details-form">
            <h4>Preencha os dados para o Boleto</h4>
            <div className="form-group">
              <label htmlFor="boleto-name">Nome Completo</label>
              <input type="text" id="boleto-name" placeholder="Seu nome completo" />
            </div>
            <div className="form-group">
              <label htmlFor="boleto-cpf">CPF</label>
              <input type="text" id="boleto-cpf" placeholder="000.000.000-00" />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const subtotal = cartItem.price * cartItem.quantity;
  const shippingCost = 15.00;
  const total = subtotal + shippingCost;

  return (
    <div className="cart-page">
      <div className="container">
        <h1 className="cart-title">Meu Carrinho</h1>
        <div className="cart-layout">
          <div className="cart-main">
            <div className="cart-items-box">
              <div className="cart-item">
                <img src={cartItem.image} alt={cartItem.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <p className="cart-item-name">{cartItem.name}</p>
                  <p className="cart-item-price">R$ {cartItem.price.toFixed(2)}</p>
                </div>
                <div className="cart-item-quantity">
                  <button onClick={() => handleQuantityChange(-1)}>-</button>
                  <input type="text" value={cartItem.quantity} readOnly />
                  <button onClick={() => handleQuantityChange(1)}>+</button>
                </div>
                <p className="cart-item-total-price">R$ {(cartItem.price * cartItem.quantity).toFixed(2)}</p>
              </div>
            </div>

            <div className="shipping-box">
              <h3>Calcular Frete</h3>
              <div className="shipping-input-group">
                <input type="text" placeholder="Digite o seu CEP" />
                <button className="btn btn-primary">Calcular</button>
              </div>
            </div>
          </div>

          <div className="cart-summary">
            <h2>Resumo da Compra</h2>
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>R$ {subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Frete:</span>
              <span>R$ {shippingCost.toFixed(2)}</span>
            </div>
            <div className="summary-total-row">
              <span>Total:</span>
              <span>R$ {total.toFixed(2)}</span>
            </div>

            <h3 className="payment-title">Forma de Pagamento</h3>
            
            <div className="payment-methods">
              <div
                className={`payment-option ${selectedPayment === 'pix' ? 'active' : ''}`}
                onClick={() => setSelectedPayment('pix')}
              >
                PIX
              </div>
              <div
                className={`payment-option ${selectedPayment === 'card' ? 'active' : ''}`}
                onClick={() => setSelectedPayment('card')}
              >
                Cartão de Crédito
              </div>
              <div
                className={`payment-option ${selectedPayment === 'boleto' ? 'active' : ''}`}
                onClick={() => setSelectedPayment('boleto')}
              >
                Boleto
              </div>
            </div>

            <div className="payment-details">
              {renderPaymentDetails()}
            </div>

            <button className="btn btn-primary btn-finalize">Finalizar Compra</button>
          </div>
        </div>
      </div>
    </div>
  );
}