import React, { useEffect, useState } from "react";
import { getProductById, deleteProduct } from "../../Services/productService";
import { useParams, useNavigate } from "react-router-dom";
import { addToCart } from "../../Services/cartService";

const ProductDetail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getProductById(id)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
      });
  }, [id]);

  const handleAddToCart = async (productID, quantity) => {
    setLoading(true);
    try {
      await addToCart(productID, quantity);
    } catch (error) {
      setError("Erro ao adicionar item ao carrinho");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteProduct(id);
      setMessage("Produto deletado com sucesso");
      setTimeout(() => {
        navigate("/products"); // Redirect to the homepage or another page
      }, 2000);
    } catch (error) {
      console.error("Error deleting product:", error);
      setMessage("Erro ao deletar produto");
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
      <button onClick={() => navigate(`/stock/${id}`)}>Stock Entries</button>
      <button onClick={() => navigate(`/stock/${id}/add`)}>ADD STOCK</button>
      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(parseInt(e.target.value))}
        min="1"
      />
      <button onClick={() => handleAddToCart(id, quantity)}>ADD TO CART</button>
    </div>
  );
};

export default ProductDetail;
