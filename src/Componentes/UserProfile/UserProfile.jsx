import React, { useState, useEffect } from "react";
import { getUserProfile, forgotUserPassword } from "../../Services/userService";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const [userData, setUserData] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    getUserProfile()
      .then((response) => {
        console.log("Data", response.data);
        setUserData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  const handleForgotPassword = () => {
    if (userData && userData.email) {
      forgotUserPassword({ email: userData.email })
        .then((response) => {
          console.log(
            "Email de recuperação enviado com sucesso:",
            response.data
          );
          alert("Email de recuperação enviado com sucesso.");
        })
        .catch((error) => {
          console.error("Erro ao enviar email de recuperação:", error);
          alert("Erro ao enviar email de recuperação.");
        });
    }
  };

  const handleUpdateProfile = () => {
    navigate("/profile/update");
  };

  //FAZER GET CARRINHO PARA CLICAR E IR DAR AO CARRINHO E TBM BOTAO PARA DAR UPDATE NO PERFIL
  return (
    <div>
      {userData ? (
        <div>
          <p>Nome de Usuário: {userData.name}</p>
          <p>Email: {userData.email}</p>
          <img src={userData.imagem} alt="Imagem do Usuário" />
          <button onClick={handleUpdateProfile}>Atualizar Perfil</button>
          <button onClick={handleForgotPassword}>
            Send Email Forgot Password
          </button>
        </div>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
};

export default UserProfile;
