import axios from "axios";
import { URL_UTLIZADA } from "../appConstants/AppURL";

const API = `${URL_UTLIZADA}/categorias`;

const getAuthHeader = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
});

export const getCategorias = async () => {
  const res = await axios.get(`${API}/metas`, getAuthHeader());
  return res.data;
};

export const getTipoMetas = async () => {
  const res = await axios.get(`${API}/tipo-metas`, getAuthHeader());
  return res.data;
};

export const getEstadoMetas = async () => {
  const res = await axios.get(`${API}/estado-metas`, getAuthHeader());
  return res.data;
};
