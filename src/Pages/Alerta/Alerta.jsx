import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Alerta.css";
import { getAllAlerts, deleteAlert } from "../../Services/alertaService";
import { formatName } from "@ionic/cli/lib/app";

const AlertPage = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAlerts = async () => {
    try {
      const response = await getAllAlerts();
      setAlerts(response);
    } catch (error) {
      console.error("Erro ao buscar os alertas:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlerts();
  }, []);

  const handleDeleteAlert = async (alertId) => {
    try {
      await deleteAlert(alertId);
      setAlerts((prevAlerts) =>
        prevAlerts.filter((alert) => alert._id !== alertId)
      );
      await fetchAlerts();
    } catch (error) {
      console.error("Erro ao deletar o alerta:", error);
    }
  };
  /*
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    if (isNaN(date)) {
      return "Data inválida";
    }
    return date.toLocaleString();
  };*/

  return (
    <div>
      <h1>Lista de Alertas</h1>
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <div className="alert-grid">
          {alerts.length > 0 ? (
            alerts.map((alert) => (
              <div key={alert.product} className="alert-card">
                <h2>Produto ID: {alert.product}</h2>
                <p>Quantidade: {alert.quantity}</p>
                <p>Mensagem: {alert.message}</p>
                <p>Status: {alert.status}</p>
                <p>Criado em: {alert.createdAt}</p>
                <button onClick={() => handleDeleteAlert(alert.product)}>
                  Deletar Alerta
                </button>
              </div>
            ))
          ) : (
            <p>Nenhum alerta encontrado.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AlertPage;
