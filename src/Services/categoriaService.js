import axios from "axios";

const API_URL = "http://localhost:3001/categoria";

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

export const getAllCategories = async () => {
  const response = await axiosInstance.get("/categorias");
  return response.data;
};

export const createCategory = async (category) => {
  const response = await axiosInstance.post("/admin/categorias", category);
  return response.data;
};

export const updateCategory = async (categoryId, category) => {
  const response = await axiosInstance.put(
    `/admin/categorias/${categoryId}`,
    category
  );
  return response.data;
};

export const deleteCategory = async (categoryId) => {
  const response = await axiosInstance.delete(
    `/admin/categorias/${categoryId}`
  );
  return response.data;
};
