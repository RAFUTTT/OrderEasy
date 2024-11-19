import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

const createCategory = (category) => {
  return axios.post(`${API_URL}/categorias`, category);
};

const getCategories = () => {
  return axios.get(`${API_URL}/categorias`);
};

// Actualizar categoría por nombre
const updateCategory = (nombre, updatedCategory) => {
  return axios.put(`${API_URL}/categorias/${nombre}`, updatedCategory);
};

// Eliminar categoría por nombre
const deleteCategory = (nombre) => {
  return axios.delete(`${API_URL}/categorias/${nombre}`);
};

export { createCategory, getCategories, updateCategory, deleteCategory };
