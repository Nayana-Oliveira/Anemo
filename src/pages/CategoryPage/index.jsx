import { useState, useEffect } from 'react';
import './index.css';
import '../../pages/Home/index.css'; 

export default function CategoryPage({ categoryId, onProductSelect, onNavigate }) {
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState(categoryId);

  useEffect(() => {
    if (categoryId) {
      const fetchCategoryProducts = async () => {
        try {
          const response = await fetch(`http://localhost:5010/products?category=${categoryId}`);
          const data = await response.json();
          setProducts(data);
          setCategoryName(categoryId.replace(/-/g, ' '));
        } catch (error) {
          console.error("Erro ao buscar produtos da categoria:", error);
        }
      };
      fetchCategoryProducts();
    }
  }, [categoryId]);

  return (
    <div className="category-page">
      <div className="container">
        <h1 className="category-title">{categoryName}</h1>
        
        {products.length > 0 ? (
          <div className="product-grid">
            {products.map((product) => (
              <div key={product.id} className="product-card">
                <img
                  src={product.image || "/assets/placeholder.svg"}
                  alt={product.productName}
                  className="product-image"
                  onClick={() => onProductSelect(product)}
                />
                <div className="product-name">{product.productName}</div>
                <div className="product-price">R$ {parseFloat(product.price).toFixed(2)}</div>
                <div className="product-installments">ou em até 4x R$ {(parseFloat(product.price) / 4).toFixed(2)}</div>
                <button className="btn btn-primary" onClick={() => onProductSelect(product)}>
                  Ver Produto
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ textAlign: 'center' }}>Nenhum produto encontrado nesta categoria.</p>
        )}
      </div>
    </div>
  );
}