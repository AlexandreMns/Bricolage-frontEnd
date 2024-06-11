import axios from "axios";

const API_URL = "http://localhost:3001/stock";

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

export const getStockEntriesForProduct = async (productID) => {
  try {
    const response = await axiosInstance.get(`/admin/products/${productID}/`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar entradas de stock:", error);
  }
};

export const getAllStockEntries = async () => {
  try {
    const response = await axiosInstance.get("/admin/products/");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar todas as entradas de estoque:", error);
    throw error;
  }
};

export const addStockEntry = async (productId, quantityAvailable) => {
  try {
    const response = await axiosInstance.post(
      `/admin/products/${productId}/stock`,
      { quantityAvailable }
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao adicionar entrada de estoque:", error);
    throw error;
  }
};
