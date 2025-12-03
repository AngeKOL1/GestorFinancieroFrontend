import axios from "axios";
import type { CrearMetaDTO } from "../dto/CrearMetaDTO";
import { URL_UTLIZADA } from "../appConstants/AppURL";
import type { EditarMetaDTO } from "../dto/EditarMetaDTO";


const API_URL = `${URL_UTLIZADA}/metas`;

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getMisMetas = async () => {
  try {
    const response = await axios.get(`${API_URL}/misMetas`, getAuthHeader());
    return response.data;
  } catch (error) {
    console.error("Error al obtener mis metas:", error);
    throw error;
  }
};

export const crearMeta = async (nuevaMeta: CrearMetaDTO) => {
  try {
    const response = await axios.post(API_URL, nuevaMeta, getAuthHeader());
    return response.data; 
  } catch (error) {
    console.error("Error al crear meta:", error);
    throw error;
  }
};

export const getTodasLasMetas = async () => {
  try {
    const response = await axios.get(API_URL, getAuthHeader());
    return response.data;
  } catch (error) {
    console.error("Error al obtener todas las metas:", error);
    throw error;
  }
};
export const editarMeta = async (idMeta: number, data: EditarMetaDTO) => {
  const res = await axios.put(`${API_URL}/${idMeta}`, data, getAuthHeader());
  return res.data;
};

export const eliminarMeta = async (idMeta: number) => {
  await axios.delete(`${API_URL}/${idMeta}`, getAuthHeader());
};

