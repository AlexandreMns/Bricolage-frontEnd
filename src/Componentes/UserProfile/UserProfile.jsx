import React, { useState, useEffect } from 'react';
import {getUserProfile} from '../../Services/userService';


const UserProfile = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        getUserProfile()
      .then(response => {
        console.log("Data" , response.data)
        setUserData(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
    }, []);
//fAZER GET CARRINHO PRAA CLICAR E IR DAR AO CARRINHO E TBM BOTAO PARA DAR UPDATE NO PERFIL 
    return (
        <div>
            {userData ? (
                <div>
                    <p>Nome de Usuário: {userData.name}</p>
                    <p>Email: {userData.email}</p>
                    <img src={userData.imagem} alt="Imagem do Usuário" />
                    
                </div>
            ) : (
                <p>Carregando...</p>
            )}
        </div>
    );
};

export default UserProfile;
