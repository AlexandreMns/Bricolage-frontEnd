import axios from "axios";

const API_URL = "http://localhost:3001/venda";

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

export const getAllVendas = async () => {
  try {
    const response = await axiosInstance.get("/");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar vendas:", error);
  }
};

export const createVenda = (data) => {
  return axiosInstance.post("/", data);
};

export const getVendaById = (id) => {
  try {
    const response = axiosInstance.get(`/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar venda:", error);
  }
};

export const getRelatorioByVendaId = (id) => {
  return axiosInstance.get(`/relatorio/${id}`);
};
