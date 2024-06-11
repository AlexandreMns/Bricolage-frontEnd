// src/Pages/ShoppingCart.js
import React, { useState, useEffect } from "react";
import {
  getCart,
  addToCart,
  updateCart,
  removeFromCart,
} from "../../Services/cartService";
import { getProductById } from "../../Services/productService";

const ShoppingCart = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [product, setProduct] = useState({});
  const [quantityError, setQuantityError] = useState({});

  const fetchCart = async () => {
    setLoading(true);
    try {
      const cartData = await getCart();
      console.log("Cart data:", cartData);
      setCart(cartData);
      await fetchProducts(cartData.items);
    } catch (error) {
      setError("Erro ao buscar o carrinho");
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async (items) => {
    const productPromises = items.map((item) => getProductById(item.product));
    const productResponses = await Promise.all(productPromises);
    const productsData = productResponses.reduce((acc, response) => {
      acc[response.data._id] = response.data;
      return acc;
    }, {});
    setProduct(productsData);
  };

  const handleUpdateCart = async (productID, quantity) => {
    setLoading(true);
    try {
      await updateCart(productID, quantity);
      fetchCart();
      setQuantityError((prev) => ({ ...prev, [productID]: null }));
    } catch (error) {
      if (error.response && error.response.data === "Quantidade indisponível") {
        setQuantityError((prev) => ({
          ...prev,
          [productID]: "Quantidade indisponível",
        }));
      } else {
        setError("Erro ao atualizar item no carrinho");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFromCart = async (productID) => {
    setLoading(true);
    try {
      await removeFromCart(productID);
      fetchCart();
    } catch (error) {
      setError("Erro ao remover item do carrinho");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Carrinho de Compras</h1>
      {cart ? (
        <div>
          {cart.items.length > 0 ? (
            <ul>
              {cart.items.map((item) => {
                const products = product[item.product];
                console.log("Product", product);
                return (
                  <li key={item.product}>
                    {product ? (
                      <>
                        <h2>{products.titulo}</h2>
                        <p>Preço: {products.price}</p>
                        <p>Quantidade: {item.quantity}</p>
                        <p>Total: {item.totalPrice}</p>
                        <button
                          onClick={() => handleRemoveFromCart(item.product)}
                        >
                          Remover
                        </button>
                        <button
                          onClick={() =>
                            handleUpdateCart(item.product, item.quantity + 1)
                          }
                        >
                          +
                        </button>
                        <button
                          onClick={() =>
                            handleUpdateCart(item.product, item.quantity - 1)
                          }
                        >
                          -
                        </button>
                      </>
                    ) : (
                      <p>Carregando detalhes do produto...</p>
                    )}
                  </li>
                );
              })}
            </ul>
          ) : (
            <p>O carrinho está vazio.</p>
          )}
          <h3>Total: {cart.total}</h3>
        </div>
      ) : (
        <p>Erro ao carregar o carrinho.</p>
      )}
    </div>
  );
};

export default ShoppingCart;
