const { axiosInstance} = require("../Axios/Axios");


export const registerUser = (userData) => {
  return axiosInstance.post("user/register", userData);
};

export const loginUser = (credentials) => {
  return axiosInstance.post("user/login", credentials);
};

export const getUserProfile = () => {
  return axiosInstance.get("user/profile");
};

export const getUsersWithFilters = (params) => {
  try {
    return axiosInstance.get("user/list", { params });
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
  }

};

export const updateUserProfile = (userData) => {
  return axiosInstance.put("user/profile/", userData);
};

export const resetUserPassword = (passwordData) => {
  return axiosInstance.put("user/resetpassword", passwordData);
};

export const forgotUserPassword = (emailData) => {
  return axiosInstance.post("user/forgot-password", emailData);
};
