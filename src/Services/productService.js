import axios from "axios";
import config from "../config";

const API_URL = "http://localhost:3001/produtos";

const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers["x-access-token"] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const getAllProducts = async (params) => {
  try {
    const response = await axiosInstance.get("/all", { params });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
  }
};

export const createProduct = (data) => {
  return axiosInstance.post(`/criar`, data, config.token);
};

export const getProductById = (id) => {
  return axiosInstance.get(`/${id}`);
};

export const updateProduct = (id, data) => {
  return axiosInstance.put(`/edit/${id}`, data, config.token);
};

export const deleteProduct = (id) => {
  return axiosInstance.delete(`/delete/${id}`, config.token);
};
