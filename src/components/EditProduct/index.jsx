import { useState, useEffect } from "react";
import axios from 'axios';
import "./index.css";
import { toast } from 'react-toastify';

export default function EditProduct({ product, onNavigate }) {
  const [formData, setFormData] = useState(product || {});
  const [newImageFiles, setNewImageFiles] = useState([]);
  const [newImagePreviews, setNewImagePreviews] = useState([]);

  useEffect(() => {
    if (product) {
      setFormData({
        ...product,
        images: product.images || (product.image ? [product.image] : []),
      });
    }
  }, [product]);

  if (!product) {
    return (
      <div className="edit-product-page">
        <div className="container">
          <h2>Produto não encontrado</h2>
          <p>Por favor, volte ao painel e selecione um produto para editar.</p>
          <button className="btn btn-primary" onClick={() => onNavigate("admin-dashboard")}>
            Voltar ao Painel
          </button>
        </div>
      </div>
    );
  }

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setNewImageFiles(prevFiles => [...prevFiles, ...files]);

    const previewUrls = files.map(file => URL.createObjectURL(file));
    setNewImagePreviews(prevPreviews => [...prevPreviews, ...previewUrls]);
  };

  const handleRemoveImage = (imagePath, isNew = false) => {
    if (isNew) {
      const imageIndex = newImagePreviews.indexOf(imagePath);
      setNewImagePreviews(previews => previews.filter((_, i) => i !== imageIndex));
      setNewImageFiles(files => files.filter((_, i) => i !== imageIndex));
    } else {
      setFormData(prevData => ({
        ...prevData,
        images: prevData.images.filter(img => img !== imagePath)
      }));
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const newImagePaths = newImageFiles.map(file => `/assets/products/${file.name}`);
    const updatedImages = [...formData.images, ...newImagePaths];

    const finalProductData = {
      ...formData,
      images: updatedImages,
      image: updatedImages.length > 0 ? updatedImages[0] : "",
    };

    try {
      await axios.put(`http://localhost:5010/products/${product.id}`, finalProductData);
      toast.success("Produto atualizado com sucesso!");
      onNavigate("admin-dashboard");
    } catch (error) {
      console.error('Erro ao atualizar produto:', error);
      toast.error("Erro ao atualizar o produto. Tente novamente.");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="edit-product-page">
      <div className="container">
        <div className="edit-product-card">
          <h1>Editar Produto</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="productName">Nome do produto</label>
              <input type="text" id="productName" name="productName" value={formData.productName || ''} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label htmlFor="category">Categoria</label>
              <select id="category" name="category" value={formData.category || ''} onChange={handleChange} required>
                <option value="">Selecione uma categoria</option>
                <option value="plantas-grandes">Plantas Grandes</option>
                <option value="vasos">Vasos</option>
                <option value="para-presentear">Para Presentear</option>
                <option value="sementes">Kit de Sementes</option>
                <option value="flores-comestiveis">Flores Comestíveis</option>
                <option value="flores">Flores</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="price">Preço</label>
              <input type="number" id="price" name="price" value={formData.price || ''} onChange={handleChange} placeholder="0.00" step="0.01" required />
            </div>
            <div className="form-group">
              <label htmlFor="quantity">Quantidade</label>
              <input type="number" id="quantity" name="quantity" value={formData.quantity || ''} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="description">Descrição</label>
              <textarea id="description" name="description" value={formData.description || ''} onChange={handleChange} rows="6" required />
            </div>

            <div className="form-group">
              <label>Fotos do Produto</label>
              <div className="image-management-area">
                {formData.images && formData.images.map((imgSrc, index) => (
                  <div key={`existing-${index}`} className="image-preview-container">
                    <img src={imgSrc} alt={`Imagem ${index + 1}`} className="image-preview" />
                    <button type="button" className="remove-image-btn" onClick={() => handleRemoveImage(imgSrc)}>×</button>
                  </div>
                ))}

                {newImagePreviews.map((preview, index) => (
                  <div key={`new-${index}`} className="image-preview-container">
                    <img src={preview} alt={`Nova Imagem ${index + 1}`} className="image-preview" />
                    <button type="button" className="remove-image-btn" onClick={() => handleRemoveImage(preview, true)}>×</button>
                  </div>
                ))}

                <label htmlFor="photos" className="add-photo-btn">
                  <span>+</span>
                  <span>Adicionar</span>
                </label>
                <input type="file" id="photos" accept="image/*" multiple onChange={handleImageUpload} style={{ display: "none" }} />
              </div>
            </div>

            <div className="form-actions">
              <button type="button" className="btn btn-secondary" onClick={() => onNavigate("admin-dashboard")}>
                Cancelar
              </button>
              <button type="submit" className="btn btn-primary">
                Salvar Alterações
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}