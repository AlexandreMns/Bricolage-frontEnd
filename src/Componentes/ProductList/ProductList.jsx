import React, { useEffect, useState, useRef } from "react";
import { getAllProducts } from "../../Services/productService";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./ProductList.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState("asc");
  const [loading, setLoading] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const fetchAndSetProducts = async () => {
    setLoading(true);
    try {
      const params = {
        page,
        limit: 8,
        sortBy,
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
  }, [page, sortBy]);

  const isAdmin = localStorage.getItem("userRole") === "Administrador";
  const isUser = localStorage.getItem("userRole") === "Cliente";

  const handleSortChange = (value) => {
    setSortBy(value);
    setDropdownOpen(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <h1>Lista de Produtos</h1>
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <div>
          <div className="buttons-container">
            {isAdmin && (
              <button onClick={() => navigate("/products/create")}>
                Criar um produto
              </button>
            )}
            {isAdmin && (
              <button onClick={() => navigate("/stock/all")}>
                Todo o Stock
              </button>
            )}
            <button onClick={() => fetchAndSetProducts(page)}>Recarregar</button>
          </div>
          <div className="sort-container" ref={dropdownRef}>
            <button onClick={() => setDropdownOpen(!dropdownOpen)}>
              Ordenar por: {sortBy === "asc" ? "Ascendente" : sortBy ===   "Descendente"}
            </button>
            {dropdownOpen && (
              <div className="dropdown-menu">
                <div onClick={() => handleSortChange("asc")}>Ascendente</div>
                <div onClick={() => handleSortChange("desc")}>Descendente</div>
              </div>
            )}
          </div>
          <div className="product-grid">
            {products.length > 0 ? (
              products.map((product) => (
                <div key={product._id} className="product-card">
                  <Link to={`/products/${product._id}`}>
                    <img
                      src={`http://localhost:3001/uploads/${product.imagem}`}
                      alt={product.titulo}
                      className="produto-imagem"
                    />
                    <h2>{product.titulo}</h2>
                    <p>Preço: {product.price} €</p>
                  </Link>
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
