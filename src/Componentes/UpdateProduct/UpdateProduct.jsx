// src/components/ProductForm.js
import React, { useState } from 'react';
import axios from 'axios';
import config from '../../config';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { updateProduct, getProductById} from '../../Services/productService';


const API_URL = 'http://localhost:3001';

  const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
      'x-access-token': `${config.token}`
    }
  });


const ProductForm = () => {
    const { id } = useParams();
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProductById(id);
        const product = response.data;
        setProductName(product.titulo);
        setProductDescription(product.descricao);
        setProductPrice(product.preco);
      } catch (err) {
        console.error('Error fetching product:', err);
      }
    };

    fetchProduct();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    const product = {
      titulo: productName,
      description: productDescription,
      price: productPrice,
    };

    try {
      const response = await updateProduct(id, product);
      setMessage(response.data.message);
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message);
      } else {
        setError('An error occurred');
      }
    }
  };


  return (
    <div>
      <h1>Update Product</h1>
      <form onSubmit={handleSubmit}>
        <div>
            <h1>Name: {productName}</h1>
        </div>
        <div>
          <label>Product Name:</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Product Description:</label>
          <textarea
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Product Price:</label>
          <input
            type="number"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            required
          />
        </div>
        <button type="submit">Update Product</button>
      </form>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default ProductForm;
