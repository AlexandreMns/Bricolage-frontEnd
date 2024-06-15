import React, { useState } from "react";
import { registerUser } from "../../Services/userService";
import { useNavigate } from "react-router-dom";
import "./Register.css"; // Import the CSS file

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    file: null,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("password", formData.password);
    if (formData.file) {
      data.append("imagem", formData.file);
    }

    try {
      // Chama a função para registrar o usuário, passando os dados do formulário
      const response = await registerUser(data);

      if (response.data) {
        localStorage.setItem("authToken", response.data.userToken.token);
        localStorage.setItem("userRole", response.data.userToken.user.role);
      }
      // Se o registro for bem-sucedido, você pode lidar com a resposta aqui
      setTimeout(() => {
        navigate("/home"); // Redirect to the homepage or another page
      }, 2000);
    } catch (error) {
      // Se houver um erro durante o registro, você pode lidar com ele aqui
      console.error("Erro ao registrar usuário:", error);
    }
  };

  return (
    <div className="register-page">
      <form onSubmit={handleSubmit} className="register-form">
        <input
          type="text"
          name="name"
          placeholder="Nome de Usuário"
          value={formData.name}
          onChange={handleChange}
          className="register-input"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="register-input"
        />
        <input
          type="password"
          name="password"
          placeholder="Senha"
          value={formData.password}
          onChange={handleChange}
          className="register-input"
        />
        <input
          type="file"
          name="imagem"
          onChange={handleChange}
          className="register-input"
        />
        <button type="submit" className="register-button">Registrar</button>
      </form>
    </div>
  );
};

export default RegisterPage;
