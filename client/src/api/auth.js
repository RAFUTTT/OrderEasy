import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

const register = ({ nombre, apellido, username, password, email }) => {
  return axios.post(`${API_URL}/register`, { nombre, apellido, username, password, email });
};

const login = (username, password) => {
  return axios.post(`${API_URL}/login`, { username, password });
};

export { register, login };
