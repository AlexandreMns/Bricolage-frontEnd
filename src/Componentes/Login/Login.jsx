import React, { useState } from "react";
import { loginUser } from "../../Services/userService";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Chama a função para registrar o usuário, passando os dados do formulário
      const response = await loginUser(credentials);

      if (response.data.auth && response.data.token) {
        localStorage.setItem("authToken", response.data.token);
      }

      setTimeout(() => {
        navigate("/home"); // Redirect to the homepage or another page
      }, 2000);

      console.log("Usuário logado com sucesso:", response.data);
    } catch (error) {
      console.error("Erro ao logado usuário:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={credentials.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Senha"
          value={credentials.password}
          onChange={handleChange}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
