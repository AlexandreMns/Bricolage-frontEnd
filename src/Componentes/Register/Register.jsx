import React, { useState } from 'react';
import { registerUser } from '../../Services/userService';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            // Chama a função para registrar o usuário, passando os dados do formulário
            const response = await registerUser(formData);
            
            // Se o registro for bem-sucedido, você pode lidar com a resposta aqui
            console.log('Usuário registrado com sucesso:', response.data);
        } catch (error) {
            // Se houver um erro durante o registro, você pode lidar com ele aqui
            console.error('Erro ao registrar usuário:', error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" placeholder="Nome de Usuário" value={formData.username} onChange={handleChange} />
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
                <input type="password" name="password" placeholder="Senha" value={formData.password} onChange={handleChange} />
                <button type="submit">Registrar</button>
            </form>
        </div>
    );
};

export default Register;