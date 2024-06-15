import React, { useEffect, useState } from "react";
import {
  getAllVendas,
  getRelatorioByVendaId,
} from "../../Services/vendaService";
import "./VendaList.css";
import { getProductById } from "../../Services/productService";

const VendaList = () => {
  const [vendas, setVendas] = useState([]);
  const [selectedRelatorio, setSelectedRelatorio] = useState(null);
  const [products, setProducts] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVendas = async () => {
      try {
        const vendas = await getAllVendas();
        setVendas(vendas);

        const allItems = vendas.flatMap((venda) => venda.carrinho[0].items);
        const productPromises = allItems.map((item) =>
          getProductById(item.product).catch((err) => {
            console.error(
              `Error fetching product with id ${item.product}:`,
              err
            );
            return null;
          })
        );

        const productResponses = await Promise.all(productPromises);
        const productsData = productResponses.reduce((acc, response) => {
          if (response) {
            acc[response._id] = response;
          }
          return acc;
        }, {});
        setProducts(productsData.undefined.data);
        console.log("Products:", productsData.undefined.data);
      } catch (err) {
        console.error("Error fetching vendas or products:", err);
        setError("Failed to fetch vendas or products. Please try again later.");
      }
    };
    fetchVendas();
  }, []);

  const handleRelatorioClick = async (id) => {
    try {
      const relatorio = await getRelatorioByVendaId(id);
      const data = relatorio.data[0];
      setSelectedRelatorio(data);
      console.log("Relatório:", data);
    } catch (err) {
      console.error(`Error fetching relatorio for venda id ${id}:`, err);
      setError("Failed to fetch relatorio. Please try again later.");
    }
  };

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="container">
      <div className="vendas-list">
        {vendas.map((venda) => (
          <div key={venda.id} className="venda-card">
            <h3>Venda ID: {venda.id}</h3>
            <p>Data: {new Date(venda.data).toLocaleDateString()}</p>
            <div className="carrinho">
              <h4>Itens do Carrinho:</h4>
              {venda.carrinho &&
                venda.carrinho.length > 0 &&
                venda.carrinho[0].items.map((item, index) => (
                  <div key={index} className="item">
                    <h5>Item {index + 1}</h5>
                    <ul>
                      <li className="imagem.produto">
                        <img src={`http://localhost:3001/uploads/${products.imagem}`}></img>
                      </li>
                      <li>
                        Produto: {products ? products.titulo : "Desconhecido"}
                      </li>
                      <li>Quantidade: {item.quantity}</li>
                      <li>Preço: {item.totalPrice}€</li>
                    </ul>
                  </div>
                ))}
            </div>
            <p>
              Total:{" "}
              {venda.carrinho && venda.carrinho.length > 0
                ? venda.carrinho[0].total
                : "N/A"}
            </p>
            <button onClick={() => handleRelatorioClick(venda.id)}>
              Ver Relatório
            </button>
          </div>
        ))}
      </div>
      {selectedRelatorio && (
        <div className="relatorio">
          <h3>Relatório</h3>
          <p>Descrição: {selectedRelatorio.relatorio}</p>
          <p>Data: {new Date(selectedRelatorio.data).toLocaleDateString()}</p>
        </div>
      )}
    </div>
  );
};

export default VendaList;
