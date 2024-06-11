import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { addStockEntry } from "../../Services/stockService";
import { useNavigate } from "react-router-dom";

const AddStockEntry = () => {
  const { productId } = useParams();
  const [quantityAvailable, setQuantityAvailable] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addStockEntry(productId, quantityAvailable);
      alert("Entrada de estoque adicionada com sucesso!");
      // Você pode redirecionar o usuário para outra página ou fazer qualquer outra ação após adicionar o estoque
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Adicionar Entrada de Estoque para o Produto {productId}</h1>
      <form onSubmit={handleSubmit}>
        <label>Quantidade Disponível:</label>
        <input
          type="number"
          value={quantityAvailable}
          onChange={(e) => setQuantityAvailable(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          Adicionar Entrada de Estoque
        </button>
      </form>
      {error && <p>Erro ao adicionar entrada de estoque: {error}</p>}
    </div>
  );
};

export default AddStockEntry;
