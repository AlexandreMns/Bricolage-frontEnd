import React, { useState, useEffect } from "react";
import {
  getCart,
  addToCart,
  updateCart,
  removeFromCart,
} from "../../Services/cartService";
import { getProductById } from "../../Services/productService";
import { createVenda } from "../../Services/vendaService";

const ShoppingCart = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [product, setProduct] = useState({});
  const [quantityError, setQuantityError] = useState({});
  const [venda, setVenda] = useState(null);

  const fetchCart = async () => {
    setLoading(true);
    try {
      const cartData = await getCart();
      setCart(cartData);
      await fetchProducts(cartData.items);
    } catch (error) {
      setError("Erro ao buscar o carrinho");
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async (items) => {
    const productPromises = items.map((item) =>
      getProductById(item.product).catch((error) => {
        console.error(`Erro ao buscar produto com ID ${item.product}`, error);
        return null;
      })
    );
    const productResponses = await Promise.all(productPromises);
    const productsData = productResponses.reduce((acc, response) => {
      if (response && response.data) {
        acc[response.data._id] = response.data;
      }
      return acc;
    }, {});
    setProduct(productsData);
  };

  const handleCreateVenda = async () => {
    setLoading(true);
    try {
      const vendaData = await createVenda();
      fetchCart();
      setVenda(vendaData);
    } catch (error) {
      setError("Erro ao criar a venda");
    } finally {
      setLoading(false);
    }
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
                const productDetails = product[item.product];
                return (
                  <li key={item.product}>
                    {productDetails ? (
                      <>
                        <h2>{productDetails.titulo}</h2>
                        <p>Preço: {productDetails.price}</p>
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
                      <p>Produto não encontrado</p>
                    )}
                  </li>
                );
              })}
              <button onClick={handleCreateVenda}>Finalizar Compra</button>
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
