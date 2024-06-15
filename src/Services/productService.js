const { axiosInstance} = require("../Axios/Axios");


export const getAllProducts = async (params) => {
  try {
    const response = await axiosInstance.get("produtos/all", { params });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
  }
};

export const createProduct = (data) => {
  return axiosInstance.post(`produtos/criar`, data);
};

export const getProductById = (id) => {
  return axiosInstance.get(`produtos/${id}`);
};

export const updateProduct = (id, data) => {
  return axiosInstance.put(`produtos/edit/${id}`, data);
};

export const deleteProduct = (id) => {
  return axiosInstance.delete(`produtos/delete/${id}`);
};
