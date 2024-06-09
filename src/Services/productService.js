import axios from 'axios';
import config from '../config';

const API_URL = 'http://localhost:3001/produtos';

const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
      'x-access-token': `${config.token}`
    }
  });

export const getAllProducts = (params) => {

  return axiosInstance.get(`/all`, { params });
};

export const createProduct = (data) => {
  return  axiosInstance.post(`/criar`, data, config.token);
};

export const getProductById = (id) => {
  return  axiosInstance.get(`/${id}`);
};

export const updateProduct = (id, data) => {
  return  axiosInstance.put(`/edit/${id}`, data, config.token);
};

export const deleteProduct = (id) => {
  return  axiosInstance.delete(`/delete/${id}`, config.token);
};