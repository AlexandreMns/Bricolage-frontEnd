import React, { useState } from 'react';
import { loginUser } from '../../Services/userService';

const Login = () => {
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Chama a função para registrar o usuário, passando os dados do formulário
            const response = await loginUser(credentials);

            console.log('Usuário logado com sucesso:', response.data);
        } catch (error) {
            console.error('Erro ao logado usuário:', error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="email" name="email" placeholder="Email" value={credentials.email} onChange={handleChange} />
                <input type="password" name="password" placeholder="Senha" value={credentials.password} onChange={handleChange} />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
