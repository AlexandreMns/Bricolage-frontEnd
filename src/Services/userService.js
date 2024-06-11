import axios from "axios";

const API_URL = "http://localhost:3001/user";

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

export const registerUser = (userData) => {
  return axiosInstance.post("/register", userData);
};

export const loginUser = (credentials) => {
  return axiosInstance.post("/login", credentials);
};

export const getUserProfile = () => {
  return axiosInstance.get("/profile");
};
/*
  export const getAllUsers = () => {
    return axiosInstance.get("/AllUsers");
  };*/
// Não esta a ser usado
export const getUsersWithFilters = (params) => {
  return axiosInstance.get("/list", { params });
};

export const updateUserProfile = (userData) => {
  return axiosInstance.put("/profile/", userData);
};

export const resetUserPassword = (passwordData) => {
  return axiosInstance.put("/resetpassword", passwordData);
};

export const forgotUserPassword = (emailData) => {
  return axiosInstance.post("/forgot-password", emailData);
};
