import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

// Endpoint para crear un ingreso
const createIngreso = (ingreso) => {
  return axios.post(`${API_URL}/ingresos`, ingreso);
};

// Endpoint para obtener todos los ingresos
const getIngresos = () => {
  return axios.get(`${API_URL}/ingresos`);
};

// Endpoint para actualizar un ingreso (PUT)
const updateIngreso = (id, ingreso) => {
  return axios.put(`${API_URL}/ingresos/${id}`, ingreso);
};

// Endpoint para eliminar un ingreso (DELETE)
const deleteIngreso = (id) => {
  return axios.delete(`${API_URL}/ingresos/${id}`);
};

// Métodos para egresos

// Endpoint para crear un egreso
const createEgreso = (egreso) => {
  return axios.post(`${API_URL}/egresos`, egreso);
};

// Endpoint para obtener todos los egresos
const getEgresos = () => {
  return axios.get(`${API_URL}/egresos`);
};

// Endpoint para actualizar un egreso (PUT)
const updateEgreso = (id, egreso) => {
  return axios.put(`${API_URL}/egresos/${id}`, egreso);
};

// Endpoint para eliminar un egreso (DELETE)
const deleteEgreso = (id) => {
  return axios.delete(`${API_URL}/egresos/${id}`);
};

export { createIngreso, getIngresos, updateIngreso, deleteIngreso, createEgreso, getEgresos, updateEgreso, deleteEgreso };
