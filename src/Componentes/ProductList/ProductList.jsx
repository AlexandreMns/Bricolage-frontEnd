import React, { useEffect, useState } from 'react';
import { getAllProducts } from '../../Services/productService';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAllProducts()
      .then(response => {
        setProducts(response.data.produtos);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  return (
    <div>
      <h1>Products</h1>
      <Link to="/products/create">Create New Product</Link>
      <ul>
        {products.map(product => (
          <li key={product._id}>
            <Link to={`/products/${product._id}`}>{product.titulo}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
