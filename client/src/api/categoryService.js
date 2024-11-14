import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

const createCategory = (category) => {
  return axios.post(`${API_URL}/categorias`, category);
};

const getCategories = () => {
  return axios.get(`${API_URL}/categorias`);
};

export { createCategory, getCategories };
