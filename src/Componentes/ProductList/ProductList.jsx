// src/Pages/ProductList.js
import React, { useEffect, useState } from "react";
import { getAllProducts } from "../../Services/productService";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./ProductList.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchAndSetProducts = async () => {
    setLoading(true);
    try {
      const params = {
        page,
        limit: 10,
        sortBy: "asc", // ou 'desc' para ordenar de forma decrescente
      };
      const data = await getAllProducts(params);
      setProducts(data.produtos);
      setTotalPages(data.pages);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAndSetProducts();
  }, [page]);

  return (
    <div>
      <h1>Lista de Produtos</h1>
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <div>
          <div className="product-grid">
            {products.length > 0 ? (
              products.map((product) => (
                <div key={product._id} className="product-card">
                  <Link to={`/products/${product._id}`}>
                    <h2>{product.titulo}</h2>
                    {/* Adicione aqui a tag <img> se houver uma imagem de produto */}
                    {/* <img src={product.imageUrl} alt={product.titulo} className="product-image" /> */}
                  </Link>
                  <p>Preço: {product.price} €</p>
                </div>
              ))
            ) : (
              <p>Nenhum produto encontrado.</p>
            )}
          </div>
          <div className="pagination">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
            >
              Anterior
            </button>
            <span>
              Página {page} de {totalPages}
            </span>
            <button
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
            >
              Próxima
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
