import React, { useEffect, useState } from "react";
import { getProductById, deleteProduct } from "../../Services/productService";
import { useParams, useNavigate } from "react-router-dom";
import { addToCart } from "../../Services/cartService";
import { addToWishlist } from "../../Services/wishlistService";
import "./ProductDetails.css"; // Importando o CSS criado

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

  const handleAddToWishlist = async (productID) => {
    setLoading(true);
    try {
      await addToWishlist(productID);
    } catch (error) {
      console.error("Erro ao adicionar produto à lista de desejos", error);
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

  const isAdmin = localStorage.getItem("userRole") === "Administrador";
  const isUser = localStorage.getItem("userRole") === "Cliente";
  const imageUrl = `http://localhost:3001/uploads/${product.imagem}`;

  return (
    <div >
      <div className="product-detail-header">
        <h1>{product.titulo}</h1>
        {isAdmin && (
          <div className="buttons">
            <button onClick={() => navigate(`/products/${id}/update`)}>
              Update Product
            </button>
            <button onClick={handleDelete}>Delete Product</button>
            <button onClick={() => navigate(`/stock/${id}`)}>Stock Entries</button>
            <button onClick={() => navigate(`/stock/${id}/add`)}>ADD STOCK</button>
          </div>
        )}
      </div>
      <div className="product-detail-content">
        <div className="imagem-do-produto">
          <img className="imagem" src={imageUrl} alt={product.titulo} />
        </div>
        <div className="product-description">
          <p>{product.description}</p>
          <p>Price: {product.price}</p>
          <p>Category: {product.categoria}</p>
          <div className="product-detail-actions">
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              min="1"
            />
            <button onClick={() => handleAddToCart(id, quantity)}>ADD TO CART</button>
            <button onClick={() => handleAddToWishlist(id)}>ADD TO WISHLIST</button>
          </div>
          {message && <p className="product-detail-message">{message}</p>}
          <button className='back'onClick={() => navigate("/products")}>Back to Products</button>
        </div>
        
      </div>
    </div>
  );
};

export default ProductDetail;
