"use client"

import { useState } from "react";
import axios from 'axios';
import "./index.css";

export default function ProductRegistration({ onNavigate }) {
  const [formData, setFormData] = useState({
    productName: "",
    productId: "",
    category: "",
    price: "",
    quantity: "",
    size: "",
    description: "",
  });

  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (imageFiles.length === 0) {
      alert("Por favor, selecione pelo menos uma imagem para o produto.");
      return;
    }

    const finalProductData = {
      ...formData,
      image: `/assets/${imageFiles[0].name}`,
      images: imageFiles.map(file => `/assets/${file.name}`),
    };

    try {
      await axios.post('http://localhost:5010/products', finalProductData);
      
      alert("Produto cadastrado com sucesso!");
      onNavigate("admin-dashboard");
    } catch (error) {
      console.error('Erro ao cadastrar produto:', error);
      alert("Erro ao cadastrar produto. Tente novamente.");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files); 
    if (files.length > 0) {
      setImageFiles(files);

      const previewUrls = files.map(file => URL.createObjectURL(file));
      setImagePreviews(previewUrls);
    }
  };

  return (
    <div style={{ backgroundColor: "#6b9b76", minHeight: "100vh" }}>
      <header style={{ backgroundColor: "#6b9b76", padding: "20px 0" }}>
        <div className="container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div className="logo" onClick={() => onNavigate("home")} style={{ cursor: "pointer" }}>
            </div>
            <div style={{ color: "white", display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ width: "30px", height: "30px", backgroundColor: "white", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#6b9b76" }}>
                    👤
                </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container" style={{ padding: "40px 0" }}>
        <div style={{ backgroundColor: "#f0ebe5", borderRadius: "20px", padding: "60px", maxWidth: "1000px", margin: "0 auto" }}>
          <h1 style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "40px", color: "#333" }}>
            Cadastro de Produtos
          </h1>

          <form onSubmit={handleSubmit}>
            <div className="form-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "30px", marginBottom: "30px" }}>
              <div className="form-group">
                <label htmlFor="productName">Nome do produto</label>
                <input type="text" id="productName" name="productName" value={formData.productName} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="productId">ID do produto</label>
                <input type="text" id="productId" name="productId" value={formData.productId} onChange={handleChange} required />
              </div>
            </div>
            <div className="form-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "30px", marginBottom: "30px" }}>
              <div className="form-group">
                <label htmlFor="category">Categoria</label>
                <select id="category" name="category" value={formData.category} onChange={handleChange} required>
                  <option value="">Selecione uma categoria</option>
                  <option value="plantas-grandes">Plantas Grandes</option>
                  <option value="flores-secas">Flores Secas</option>
                  <option value="vasos">Vasos</option>
                  <option value="acessorios">Acessórios</option>
                  <option value="sementes">Kit de Sementes</option>
                  <option value="flores-comestiveis">Flores Comestíveis</option>
                  <option value="hortalicas">Hortaliças</option>
                  <option value="ervas">Ervas e Condimentos</option>
                  <option value="flores">Flores</option>
                  <option value="gramas">Gramas</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="price">Preço</label>
                <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} placeholder="0.00" step="0.01" required />
              </div>
            </div>
            <div className="form-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "30px", marginBottom: "30px" }}>
                <div className="form-group">
                    <label htmlFor="quantity">Quantidade</label>
                    <input type="number" id="quantity" name="quantity" value={formData.quantity} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="size">Tamanho</label>
                    <select id="size" name="size" value={formData.size} onChange={handleChange} required>
                    <option value="">Selecione um tamanho</option>
                    <option value="pequeno">Pequeno</option>
                    <option value="medio">Médio</option>
                    <option value="grande">Grande</option>
                    </select>
                </div>
            </div>
            <div className="form-group">
              <label htmlFor="description">Descrição</label>
              <textarea id="description" name="description" value={formData.description} onChange={handleChange} rows="6" placeholder="Descreva o produto..." required />
            </div>

            <div className="form-group">
              <label>Fotos do Produto</label>
              <div
                className="upload-area"
                style={{ border: "2px dashed #ddd", borderRadius: "8px", padding: "20px", textAlign: "center", backgroundColor: "white", cursor: "pointer" }}
                onClick={() => document.getElementById("photos").click()}
              >
                {imagePreviews.length > 0 ? (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
                    {imagePreviews.map((preview, index) => (
                      <img key={index} src={preview} alt={`Preview ${index + 1}`} style={{ height: '100px', width: '100px', objectFit: 'cover', borderRadius: '8px' }} />
                    ))}
                  </div>
                ) : (
                  <>
                    <img src="/assets/visor-da-camera.png" alt="Camera" style={{ width: '48px', height: '48px', marginBottom: '15px' }} />
                    <p style={{ color: "#666", fontSize: "16px", fontWeight: "500" }}>Adicionar fotos</p>
                  </>
                )}
                <input type="file" id="photos" accept="image/*" multiple onChange={handleImageUpload} style={{ display: "none" }} />
              </div>
              <small style={{ color: '#666', marginTop: '5px', display: 'block' }}>
                *Lembre-se de colocar os arquivos das imagens na pasta `public/assets`.
              </small>
            </div>

            <div style={{ textAlign: "center", marginTop: "40px" }}>
              <button type="submit" className="btn btn-primary" style={{ minWidth: "150px", fontSize: "18px" }}>
                Cadastrar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}