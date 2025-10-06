import "./index.css";

export default function Erro({ onNavigate }) {
  return (
    <div className="error-page">
      <div className="error-container">
        <div className="error-code">404</div>
        <h1 className="error-title">Página Não Encontrada</h1>
        <p className="error-message">
          Oops! A página que você está procurando não existe. Pode ter sido movida ou excluída.
        </p>
        <button className="btn btn-primary" onClick={() => onNavigate("home")}>
          Voltar para a Página Inicial
        </button>
      </div>
    </div>
  );
}