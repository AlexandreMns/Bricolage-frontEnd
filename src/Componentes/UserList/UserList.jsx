import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../config';


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

  const API_URL = 'http://localhost:3001';

  const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
      'x-access-token': `${config.token}`
    }
  });

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('http://localhost:3001/user/list', {
        params: {
          page,
          limit,
          search,
          role
        }
      });
      setUsers(response.data.users);
      setTotalPages(response.data.pages);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1); // Resetar para a primeira página ao fazer uma nova busca
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
    setPage(1); // Resetar para a primeira página ao mudar o filtro de papel
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div>
      <h1>Lista de Usuários</h1>
      <div>
        <input
          type="text"
          placeholder="Buscar por nome ou email"
          value={search}
          onChange={handleSearchChange}
        />
        <select value={role} onChange={handleRoleChange}>
          <option value="">Todos os Papéis</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
          {/* Adicione mais opções conforme necessário */}
        </select>
      </div>
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <ul>
          {users.map(user => (
            <li key={user.id}>
              {user.name} - {user.email}
            </li>
          ))}
        </ul>
      )}
      <div>
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
        >
          Anterior
        </button>
        <span>Página {page} de {totalPages}</span>
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