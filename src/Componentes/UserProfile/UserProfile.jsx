import React, { useState, useEffect } from "react";
import { getUserProfile } from "../../Services/userService";
import { getVendaById } from "../../Services/vendaService"; // Ajuste o caminho conforme necessário
import { useNavigate } from "react-router-dom";
import "./UserProfile.css"; // Importando o CSS criado

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [vendas, setVendas] = useState([]);
  const [loadingVendas, setLoadingVendas] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getUserProfile()
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
      });
  }, []);

  const handleUpdateProfile = () => {
    navigate("/profile/update");
  };

  const handleFetchVendas = async () => {
    if (userData) {
      setLoadingVendas(true);
      try {
        const vendasData = await getVendaById(userData.id);
        setVendas(vendasData);
      } catch (error) {
        console.error("Erro ao buscar vendas:", error);
      } finally {
        setLoadingVendas(false);
      }
    }
  };

  return (
    <div className="user-profile-container">
      {userData ? (
        <div>
          {userData?.imagem ? (
                  <img
                    src={`http://localhost:3001/uploads/${userData.imagem}`}
                    alt="Imagem do Usuário"
                    className="user-profile-image"
                    onClick={() => navigate("/profile")}
                  />
                ) : (
                  <i className="material-icons" onClick={() => navigate("/profile")}>account_circle</i>
                )}
          <div className="user-profile-info">
            <p>Nome de Usuário: {userData.name}</p>
            <p>Email: {userData.email}</p>
          </div>
          <div className="user-profile-actions">
            <button onClick={handleUpdateProfile}>Atualizar Perfil</button>
          </div>
        </div>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
};

export default UserProfile;
