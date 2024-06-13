import React, { useState } from "react";
import { createCategory } from "../../Services/categoriaService";

const CreateCategory = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    await createCategory({ name, description });
    setName("");
    setDescription("");
  };

  return (
    <div>
      <h2>Criar Categoria</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Descrição</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type="submit">Criar</button>
      </form>
    </div>
  );
};

export default CreateCategory;
