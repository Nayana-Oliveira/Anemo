import "./index.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Sobre</h3>
            <a href="#">Troca, devolução e reembolso</a>
            <a href="#">Frete Grátis</a>
            <a href="#">Política da Privacidade</a>
            <a href="#">Reclame Aqui</a>
          </div>

          <div className="footer-section">
            <h3>Telefones:</h3>
            <p>+351889604310</p>
            <p>+351974840259</p>

            <div className="social-icons">
              <a href="#" className="social-icon">
                <img src="/assets/email.svg" alt="Email" />
              </a>
              <a href="#" className="social-icon">
                <img src="/assets/facebook.png" alt="Facebook" />
              </a>
              <a href="#" className="social-icon">
                <img src="/assets/instagram.svg" alt="Instagram" />
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h3>Endereço:</h3>
            <p>Av. Eng. Eusébio Stevaux, 823 - Santo Amaro, São Paulo - SP, 04696-000</p>

            <h3 style={{ marginTop: "20px" }}>Pagamentos</h3>
            <div className="payment-methods">
              <div className="payment-icon" style={{ backgroundColor: "#1a1f71" }}>
                VISA
              </div>
              <div className="payment-icon" style={{ backgroundColor: "#eb001b" }}>
                MC
              </div>
              <div className="payment-icon" style={{ backgroundColor: "#0070ba" }}>
                PP
              </div>
              <div className="payment-icon" style={{ backgroundColor: "#00a1c9" }}>
                ELO
              </div>
              <div className="payment-icon" style={{ backgroundColor: "#ff6900" }}>
                HIP
              </div>
              <div className="payment-icon" style={{ backgroundColor: "#6cc04a" }}>
                PIX
              </div>
            </div>
          </div>

          <div className="footer-section">
            <div className="certification-badge">
              <div>
                <div style={{ color: "#6b9b76", fontWeight: "bold" }}>✓ CERTIFICADO</div>
                <div style={{ fontSize: "10px" }}>RA1000</div>
                <div style={{ fontSize: "8px" }}>ReclameAQUI</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}