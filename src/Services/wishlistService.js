import axios from "axios";

const API_URL = "http://localhost:3001/wishlist";

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

export const createWishlist = async (produtos) => {
  const response = axiosInstance.post("/create", { produtos });
  return response;
};

export const getWishlist = async () => {
  const response = axiosInstance.get("/get");
  return response;
};

export const addToWishlist = async (productID) => {
  const response = axiosInstance.post(`/add/${productID}`);
  return response;
};

export const removeFromWishlist = async (productID) => {
  const response = axiosInstance.delete(`/remove/${productID}`);
  return response;
};
