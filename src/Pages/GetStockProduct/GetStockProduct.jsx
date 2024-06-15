import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getStockEntriesForProduct } from "../../Services/stockService";
import { useNavigate } from "react-router-dom";
import { getProductById } from "../../Services/productService";

const GetStock = () => {
  const { productID } = useParams();
  const [stockEntries, setStockEntries] = useState([]);
  const [product, setProduct] = useState({}); // Adicionado para armazenar o produto [1/2
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStockEntries = async () => {
      setLoading(true);
      try {
        const data = await getStockEntriesForProduct(productID);
        const productData = await getProductById(productID);

        setProduct(productData.data); // Adicionado para armazenar o produto [2/2
        setStockEntries(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStockEntries();
  }, [productID]);

  if (stockEntries === undefined) {
    console.log(productID, stockEntries);
    return <p>Produto não encontrado</p>;
  }
  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>Erro: {error}</p>;
  }

  return (
    <div>
      <h1>Entradas de Estoque para o Produto: {product.titulo}</h1>
      {stockEntries.length > 0 ? (
        <ul>
          {stockEntries.map((entry) => (
            <li key={entry._id}>
              <p>Quantidade: {entry.quantity}</p>
              <p>Data: {new Date(entry.date).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhuma entrada de estoque encontrada para este produto.</p>
      )}
    </div>
  );
};

export default GetStock;
