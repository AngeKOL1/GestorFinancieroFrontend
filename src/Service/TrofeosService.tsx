import axios from "axios";
import { URL_UTLIZADA } from "../appConstants/AppURL";

const API_URL = `${URL_UTLIZADA}/trofeos`;

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return {
    headers: { Authorization: `Bearer ${token}` }
  };
};

export const obtenerUltimoTrofeo = async () => {
  const response = await axios.get(`${API_URL}/usuario/ultimo-trofeo`, getAuthHeader());
  return response.data;
};

export const obtenerMisTrofeos = async () => {
  const response = await axios.get(`${API_URL}/mi-lista-trofeos`, getAuthHeader());
  return response.data;
};
