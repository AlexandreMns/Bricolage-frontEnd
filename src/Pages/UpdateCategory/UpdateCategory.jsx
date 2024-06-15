import React, { useState, useEffect } from "react";
import {
  updateCategory,
  getAllCategories,
} from "../../Services/categoriaService";
import { useNavigate } from "react-router-dom";

const UpdateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const loadCategories = async () => {
    setLoading(true);
    try {
      const data = await getAllCategories();
      console.log("Data received from API:", data);
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setError("Erro ao buscar categorias");
    } finally {
      setLoading(false);
    }
  };

  const categoryMap = categories.reduce((acc, category) => {
    acc[category.name] = category;
    return acc;
  }, {});

  const handleSelect = (event) => {
    const selectedCategoryName = event.target.value;
    const selectedCategory = categoryMap[selectedCategoryName];
    if (selectedCategory) {
      setSelectedCategory(selectedCategory);
      setName(selectedCategory.name);
      setDescription(selectedCategory.description);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (selectedCategory) {
      await updateCategory(selectedCategory._id, { name, description });
      setSelectedCategory(null);
      setName("");
      setDescription("");
      loadCategories();
    }

    // Navigate to another page
    navigate("/categorys");

  };

  useEffect(() => {
    loadCategories();
  }, []);

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>Atualizar Categoria</h2>
      <div>
        <label>Selecione uma categoria</label>
        <input list="categories" onChange={handleSelect} />
        <datalist id="categories">
          {categories.map((category) => (
            <option key={category._id} value={category.name}></option>
          ))}
        </datalist>
      </div>
      {selectedCategory && (
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
          <button type="submit">Atualizar</button>
        </form>
      )}
    </div>
  );
};

export default UpdateCategory;
