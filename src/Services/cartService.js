const { axiosInstance} = require("../Axios/Axios");

// Função para obter o carrinho
export const getCart = async () => {
  try {
    const response = await axiosInstance.get("cart/items");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar o carrinho:", error);
    throw error;
  }
};

// Função para adicionar um item ao carrinho
export const addToCart = async (productID, quantity) => {
  try {
    const response = await axiosInstance.post(`cart/add/${productID}`, {
      quantity,
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao adicionar item ao carrinho:", error);
    throw error;
  }
};

// Função para atualizar a quantidade de um item no carrinho
export const updateCart = async (productID, quantity) => {
  try {
    const response = await axiosInstance.put(`cart/update/${productID}`, {
      quantity,
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar item no carrinho:", error);
    throw error;
  }
};

// Função para remover um item do carrinho
export const removeFromCart = async (productID) => {
  try {
    await axiosInstance.delete(`cart/delete/${productID}`);
  } catch (error) {
    console.error("Erro ao remover item do carrinho:", error);
    throw error;
  }
};
