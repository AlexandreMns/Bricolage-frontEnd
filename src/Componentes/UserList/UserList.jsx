import React, { useState, useEffect } from 'react';
import Dropdown from './Dropdown';
import './UserList.css';
import { getUsersWithFilters } from '../../Services/userService';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit] = useState(10); // Limite fixo, você pode tornar isso dinâmico se desejar
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    fetchUsers();
  }, [page, search, role]);

  const fetchUsers = async () => {
    try {
      setLoading(true); // Iniciar carregamento
      const response = await getUsersWithFilters({ page, limit, search, role });
      setUsers(response.data.users); 
      setTotalPages(response.data.totalPages); 
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    } finally {
      setLoading(false); // Finalizar carregamento
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1); // Resetar para a primeira página ao fazer uma nova busca
  };

  const handleRoleChange = (option) => {
    setRole(option);
    setPage(1); // Resetar para a primeira página ao mudar o filtro de papel
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div className="user-list-container">
      <h1>Lista de Usuários</h1>
      <div className="user-list-header">
        <input
          type="text"
          placeholder="Buscar por nome ou email"
          value={search}
          onChange={handleSearchChange}
        />
        <Dropdown
          options={['Administrador', 'Cliente']}
          selected={role}
          onOptionSelect={handleRoleChange}
        />
      </div>
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <ul className="user-list">
          {users.length > 0 ? (
            users.map(user => (
              <li key={user.id}>
                {user.name} - {user.email}
              </li>
            ))
          ) : (
            <li>Nenhum usuário encontrado</li>
          )}
        </ul>
      )}
      <div className="user-list-footer">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
        >
          Anterior
        </button>
        <span>Página {page} </span>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
        >
          Próxima
        </button>
      </div>
    </div>
  );
};

export default UserList;
