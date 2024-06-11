import React, { useState, useEffect } from "react";
import { getAllStockEntries } from "../../Services/stockService";

const AllStockEntries = () => {
  const [stockEntries, setStockEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>Erro: {error}</p>;
  }

  return (
    <div>
      <h1>Todas as Entradas de Estoque</h1>
      {stockEntries.length > 0 ? (
        <ul>
          {stockEntries.map((entry) => (
            <li key={entry._id}>
              <p>Produto: {entry.product}</p>
              <p>Quantidade: {entry.quantity}</p>
              <p>Data: {new Date(entry.date).toLocaleDateString()}</p>
              <p>Nota: {entry.note}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhuma entrada de estoque encontrada.</p>
      )}
    </div>
  );
};

export default AllStockEntries;
