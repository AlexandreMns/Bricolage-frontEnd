import React, { useState } from 'react';
import { createProduct } from '../../Services/productService';
import config from '../../config';
import { useNavigate } from 'react-router-dom';

const ProductForm = () => {
  const [formData, setFormData] = useState({
    titulo: '',
    categoria: '',
    description: '',
    price: '',
    quantidadeMinima: '',
    imagem: null,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, imagem: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = config.token; // Replace with actual token

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
    <form onSubmit={handleSubmit}>
      <div>
        <label>Titulo:</label>
        <input type="text" name="titulo" value={formData.titulo} onChange={handleChange} />
      </div>
      <div>
        <label>Categoria:</label>
        <input type="text" name="categoria" value={formData.categoria} onChange={handleChange} />
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
    </form>
  );
};

export default ProductForm;
