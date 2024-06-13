import React, { useState, useEffect } from "react";
import "./Wishlist.css";
import {
  getWishlist,
  removeFromWishlist,
} from "../../Services/wishlistService";
import { getProductById } from "../../Services/productService";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState({ produtos: [] });
  const [products, setProducts] = useState({});
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  const fetchWishlist = async () => {
    setLoading(true);
    try {
      const response = await getWishlist();
      const data = response.data[0];
      setWishlist(data);
    } catch (error) {
      setError("Erro ao buscar a lista de desejos");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async (items) => {
    try {
      const productPromises = items.map((item) => getProductById(item));
      const productResponses = await Promise.all(productPromises);
      const productsData = productResponses.reduce((acc, response) => {
        acc[response.data._id] = response.data;
        return acc;
      }, {});
      setProducts(productsData);
    } catch (error) {
      console.error("Erro ao buscar detalhes dos produtos", error);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  useEffect(() => {
    if (wishlist.produtos.length > 0) {
      fetchProducts(wishlist.produtos);
    }
  }, [wishlist]);

  const handleRemoveFromWishlist = async (id) => {
    try {
      await removeFromWishlist(id);

      // Atualizar o estado local após remover o produto
      setProducts((prevProducts) => {
        const updatedProducts = { ...prevProducts };
        delete updatedProducts[id]; // Remover o produto do estado local
        return updatedProducts;
      });

      // Atualizar a wishlist para refletir a remoção
      setWishlist((prevWishlist) => ({
        ...prevWishlist,
        produtos: prevWishlist.produtos.filter((productId) => productId !== id),
      }));
    } catch (error) {
      console.error("Erro ao remover produto da lista de desejos", error);
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="wishlist-container">
      <h2>Minha Lista de Desejos</h2>
      {products && Object.values(products).length > 0 ? (
        <ul className="wishlist">
          {Object.values(products).map((product) => (
            <li key={product._id} className="wishlist-item">
              <img src={product.image} alt={product.name} />
              <div>
                <h3>{product.titulo}</h3>
                <p>{product.description}</p>
                <p>Categoria: {product.categoria}</p>
                <p>Preço: R$ {product.price}</p>
                <button onClick={() => handleRemoveFromWishlist(product._id)}>
                  Remover da lista de desejos
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>Wishlist está vazio</p>
      )}
    </div>
  );
};

export default Wishlist;
