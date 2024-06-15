const { axiosInstance} = require("../Axios/Axios");

export const getAllVendas = async () => {
  try {
    const response = await axiosInstance.get("venda/");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar vendas:", error);
  }
};

export const createVenda = (data) => {
  return axiosInstance.post("venda/", data);
};

export const getVendaById = (id) => {
  try {
    const response = axiosInstance.get(`venda/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar venda:", error);
  }
};

export const getRelatorioByVendaId = (id) => {
  return axiosInstance.get(`venda/relatorio/${id}`);
};
