import axios from "axios";

const API_URL = "http://localhost:3001/alert/";

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
export const getAllAlerts = async () => {
  try {
    const response = await axiosInstance.get("/admin/");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar os alertas:", error);
    throw error;
  }
};

export const deleteAlert = async (id) => {
  try {
    await axiosInstance.delete(`admin/${id}`);
  } catch (error) {
    console.error("Erro ao deletar o alerta:", error);
    throw error;
  }
};
