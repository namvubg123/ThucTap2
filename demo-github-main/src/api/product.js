import axios from "../api/request";

export const getProducts = () => {
  return axios.get(`/post/getPost`);
};

export const getProductById = (id) => {
  return axios.get(`/post/get/${id}`);
};

export const createProduct = (product) => {
  return axios.post(`/post/create`, product);
};

export const updateProduct = (productId, status) => {
  return axios.put(`/post/update/${productId}`, status);
};

export const removeProduct = (id) => {
  return axios.delete(`/post/delete/${id}`);
};
