const { axiosInstance} = require("../Axios/Axios");


export const getAllCategories = async () => {
  const response = await axiosInstance.get("categoria/categorias");
  return response.data;
};

export const createCategory = async (category) => {
  const response = await axiosInstance.post("categoria/admin/categorias", category);
  return response.data;
};

export const updateCategory = async (categoryId, category) => {
  const response = await axiosInstance.put(
    `categoria/admin/categorias/${categoryId}`,
    category
  );
  return response.data;
};

export const deleteCategory = async (categoryId) => {
  const response = await axiosInstance.delete(
    `categoria/admin/categorias/${categoryId}`
  );
  return response.data;
};
