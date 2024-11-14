import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

const createIngreso = (ingreso) => {
  return axios.post(`${API_URL}/ingresos`, ingreso);
};

const getIngresos = () => {
  return axios.get(`${API_URL}/ingresos`);
};

const createEgreso = (egreso) => {
  return axios.post(`${API_URL}/egresos`, egreso);
};

const getEgresos = () => {
  return axios.get(`${API_URL}/egresos`);
};

export { createIngreso, getIngresos, createEgreso, getEgresos };
