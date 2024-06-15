const { axiosInstance} = require("../Axios/Axios");

export const getAllAlerts = async () => {
  try {
    const response = await axiosInstance.get("alert/admin/");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar os alertas:", error);
    throw error;
  }
};

export const deleteAlert = async (id) => {
  try {
    await axiosInstance.delete(`alert/admin/${id}`);
  } catch (error) {
    console.error("Erro ao deletar o alerta:", error);
    throw error;
  }
};
