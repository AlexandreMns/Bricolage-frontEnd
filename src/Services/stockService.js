const { axiosInstance} = require("../Axios/Axios");

export const getStockEntriesForProduct = async (productID) => {
  try {
    const response = await axiosInstance.get(`stock/admin/products/${productID}/`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar entradas de stock:", error);
  }
};

export const getAllStockEntries = async () => {
  try {
    const response = await axiosInstance.get("stock/admin/products/");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar todas as entradas de estoque:", error);
    throw error;
  }
};

export const addStockEntry = async (productId, quantityAvailable) => {
  try {
    const response = await axiosInstance.post(
      `stock/admin/products/${productId}/stock`,
      { quantityAvailable }
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao adicionar entrada de estoque:", error);
    throw error;
  }
};
