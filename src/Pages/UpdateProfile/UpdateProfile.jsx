import React, { useState, useEffect } from "react";
import { getUserProfile, updateUserProfile } from "../../Services/userService";
import { useNavigate } from "react-router-dom";

const UpdateProfile = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    telefone: "",
    imagem: null,
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getUserProfile()
      .then((response) => {
        const { name, email, telefone, imagem } = response.data;
        setFormData({ name, email, telefone, imagem: null });
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      imagem: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedData = {
      name: formData.name,
      telefone: formData.telefone,
      imagem: formData.imagem,
    };

    try {
      const response = await updateUserProfile(updatedData);
      console.log("Perfil atualizado com sucesso:", response.data);
      alert("Perfil atualizado com sucesso.");
      setTimeout(() => {
        navigate("/profile"); // Redirect to the homepage or another page
      }, 2000); // Navega de volta para a página de perfil
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
      alert("Erro ao atualizar perfil.");
    }
  };

  return (
    <div>
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Nome:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Telefone:</label>
            <input
              type="text"
              name="telefone"
              value={formData.telefone}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Imagem:</label>
            <input type="file" name="imagem" onChange={handleFileChange} />
          </div>
          <button type="submit">Atualizar Perfil</button>
        </form>
      )}
    </div>
  );
};

export default UpdateProfile;
