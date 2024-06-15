import React, { useEffect, useState } from "react";
import { getAllProducts } from "../../Services/productService";
import { getAllCategories } from "../../Services/categoriaService";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAndSetData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [categoriesData, productsData] = await Promise.all([
        getAllCategories(),
        getAllProducts({ limit: 8, page : 1}),
      ]);
      console.log("Data received from API:", productsData, categoriesData);
      if (Array.isArray(categoriesData) && Array.isArray(productsData.produtos)) {
        setProducts(productsData.produtos);
        setCategories(categoriesData);
      } else {
        setError("Unexpected response format");
      }
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAndSetData();
  }, []);

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="home-container">
      <h1>Bem-vindo à Loja</h1>
      <div>
        <div className="home-section">
          <h2>Produtos em Destaque</h2>
          <div className="product-grid">
            {products.length > 0 ? (
              products.map((product) => (
                <div key={product._id} className="product-card">
                  <Link to={`/products/${product._id}`}>
                    <img
                      src={`http://localhost:3001/uploads/${product.imagem}`}
                      alt={product.titulo}
                      className="product-image"
                    />
                    <h3>{product.titulo}</h3>
                    <p>Preço: {product.price} €</p>
                  </Link>
                </div>
              ))
            ) : (
              <p>Nenhum produto encontrado.</p>
            )}
          </div>
        </div>
        <div className="home-section">
          <h2>Categorias disponíveis</h2>
          <div className="categories-list">
            {categories.length > 0 ? (
              categories.map((category) => (
                <div key={category._id} className="category-card">
                  <h3>{category.name}</h3>
                  <p>{category.description}</p>
                </div>
              ))
            ) : (
              <p>Nenhuma categoria encontrada.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
