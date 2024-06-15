const { axiosInstance} = require("../Axios/Axios");

export const createWishlist = async (produtos) => {
  const response = axiosInstance.post("wishlist/create", { produtos });
  return response;
};

export const getWishlist = async () => {
  const response = axiosInstance.get("wishlist/get");
  return response;
};

export const addToWishlist = async (productID) => {
  const response = axiosInstance.post(`wishlist/add/${productID}`);
  return response;
};

export const removeFromWishlist = async (productID) => {
  const response = axiosInstance.delete(`wishlist/remove/${productID}`);
  return response;
};
