import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

const createProduct = (product) => {
  return axios.post(`${API_URL}/productos`, product);
};

const getProducts = () => { 
  return axios.get(`${API_URL}/productos`); 
};

const updateProduct = (nombre, productDetails) => {
  return axios.put(`${API_URL}/productos/nombre/${nombre}`, productDetails);
};

const deleteProduct = (nombre) => {
  return axios.delete(`${API_URL}/productos/nombre/${nombre}`);
};

export { createProduct, getProducts, updateProduct, deleteProduct };
