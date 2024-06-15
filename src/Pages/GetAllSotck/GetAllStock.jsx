import React, { useState, useEffect } from "react";
import { getAllStockEntries } from "../../Services/stockService";
import { useNavigate } from "react-router-dom";
import "./GetAllStock.css";

const AllStockEntries = () => {
  const [stockEntries, setStockEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllStockEntries = async () => {
      setLoading(true);
      try {
        const data = await getAllStockEntries();
        setStockEntries(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAllStockEntries();
  }, []);

  const handleNavigateBack = () => {
    navigate(-1); // Navega de volta para a página anterior
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>Erro: {error}</p>;
  }

  return (
    <div className="stock-entries-container">
      <h1>Todas as Entradas de Estoque</h1>
      {stockEntries.length > 0 ? (
        <ul className="stock-entries-list">
          {stockEntries.map((entry, index) => (
            <li key={entry._id}>
              <p>Produto: {entry.product}</p>
              <p>Quantidade: {entry.quantity}</p>
              <p>Data: {new Date(entry.date).toLocaleDateString()}</p>
              {index !== stockEntries.length - 1 && <hr className="divider" />}
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhuma entrada de estoque encontrada.</p>
      )}
      <button onClick={handleNavigateBack}>Voltar</button>
    </div>
  );
};

export default AllStockEntries;
