import React, { useState, useEffect } from 'react';
import { createProduct } from '../../Services/productService';
import config from '../../config';
import { useNavigate } from 'react-router-dom';
import './ProductForm.css';
import { getAllCategories } from '../../Services/categoriaService';

const ProductForm = () => {
  const [formData, setFormData] = useState({
    titulo: '',
    categoria: '',
    description: '',
    price: '',
    quantidadeMinima: '',
    imagem: null,
  });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidePanelOpen, setSidePanelOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getAllCategories()
      .then(response => {
        setCategories(response);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, imagem: e.target.files[0] });
  };

  const handleSelectChange = (category) => {
    setFormData({ ...formData, categoria: category });
    setSidePanelOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = config.token;

    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    createProduct(data, token)
      .then(response => {
        console.log('Product created:', response.data);
        navigate('/products');
      })
      .catch(error => {
        console.error('Error creating product:', error);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <div>
        <label>Titulo:</label>
        <input type="text" name="titulo" value={formData.titulo} onChange={handleChange} />
      </div>
      <div>
        <label>Categoria:</label>
        <input
          type="text"
          name="categoria"
          value={formData.categoria ? categories.find(cat => cat._id === formData.categoria)?.name : ''}
          readOnly
          onClick={() => setSidePanelOpen(true)}
        />
      </div>
      <div>
        <label>Description:</label>
        <input type="text" name="description" value={formData.description} onChange={handleChange} />
      </div>
      <div>
        <label>Price:</label>
        <input type="number" name="price" value={formData.price} onChange={handleChange} />
      </div>
      <div>
        <label>Quantidade Minima:</label>
        <input type="number" name="quantidadeMinima" value={formData.quantidadeMinima} onChange={handleChange} />
      </div>
      <div>
        <label>Imagem:</label>
        <input type="file" name="imagem" onChange={handleFileChange} />
      </div>
      <button type="submit">Create Product</button>

      <div className="side-panel" style={{ width: sidePanelOpen ? '250px' : '0' }}>
        <a href="#" className="closebtn" onClick={() => setSidePanelOpen(false)}>&times;</a>
        <div className="side-panel-content">
          <h3>Select a Category</h3>
          {loading ? (
            <p className="loading">Loading categories...</p>
          ) : (
            <ul>
              {categories.map(category => (
                <li key={category._id} className="category-item" onClick={() => handleSelectChange(category._id)}>
                  {category.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </form>
  );
};

export default ProductForm;
