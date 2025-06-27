import axios from "axios";

const BASE_URL = "https://685e4b017b57aebd2af8d897.mockapi.io/api/test";

const api = axios.create({
  baseURL: BASE_URL,
});

// Products
const fetchProducts = () => api.get("/product");
const fetchProduct = (id) => api.get(`/product/${id}`);
const createProduct = (product) => api.post("/product", product);
const updateProduct = (id, product) => api.put(`/product/${id}`, product);
const deleteProduct = (id) => api.delete(`/product/${id}`);

// Comments (global resource)
const fetchComments = (productId) =>
  api.get(`/comments?productId=${productId}`);
const createComment = (productId, comment) =>
  api.post(`/comments`, { ...comment, productId });
const deleteComment = (productId, commentId) =>
  api.delete(`/comments/${commentId}`);

export {
  fetchProducts,
  fetchProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  fetchComments,
  createComment,
  deleteComment,
};
