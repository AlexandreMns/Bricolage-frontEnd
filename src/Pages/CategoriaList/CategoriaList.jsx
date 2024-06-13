import React, { useEffect, useState } from "react";
import {
  getAllCategories,
  deleteCategory,
} from "../../Services/categoriaService";
import "./CategoriaList.css";
import { Link } from "react-router-dom";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadCategories = async () => {
    try {
      const data = await getAllCategories();
      setCategories(data);
      console.log("Categorias:", data);
    } catch (error) {
      setError("Erro ao buscar categorias");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadCategories();
  }, []);

  const handleDelete = async (categoryId) => {
    try {
      await deleteCategory(categoryId);
      loadCategories();
    } catch (error) {
      setError("Erro ao deletar categoria");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>Categorias</h2>
      <div className="categories-list">
        {categories.map((category) => (
          <div key={category._id} className="category-card">
            <h3>{category.name}</h3>
            <p>{category.description}</p>
            <button onClick={() => handleDelete(category._id)}>Delete</button>
          </div>
        ))}
      </div>
      <div className="links">
        <Link to="/category/create" className="link-button">
          Nova Categoria
        </Link>
        <Link to="/login" className="link-button">
          Voltar
        </Link>
        <Link to="/category/update" className="link-button">
          Update Categorias
        </Link>
      </div>
    </div>
  );
};

export default CategoryList;
