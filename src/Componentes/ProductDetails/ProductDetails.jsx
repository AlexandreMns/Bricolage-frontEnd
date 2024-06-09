import React, { useEffect, useState } from 'react';
import { getProductById, deleteProduct } from '../../Services/productService';
import { useParams, useNavigate } from 'react-router-dom';

const ProductDetail = () => {
  const { id } = useParams();
  const [message, setMessage] = useState('');
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getProductById(id)
      .then(response => {
        setProduct(response.data);
      })
      .catch(error => {
        console.error('Error fetching product:', error);
      });
  }, [id]);

  const handleDelete = async () => {
    try {
      await deleteProduct(id);
      setMessage('Produto deletado com sucesso');
      setTimeout(() => {
        navigate('/products'); // Redirect to the homepage or another page
      }, 2000);
    } catch (error) {
      console.error('Error deleting product:', error);
      setMessage('Erro ao deletar produto');
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{product.titulo}</h1>
      <p>{product.description}</p>
      <p>{product.price}</p>
      <p>{product.categoria}</p>
      <img src={product.imagem} />
      <button onClick={handleDelete}>Delete Product</button>
      {message && <p>{message}</p>}
      {/* Add more product details as needed */}
    </div>
  );
};

export default ProductDetail;
