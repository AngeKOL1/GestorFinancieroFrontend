import axios from "axios";

const API_URL = "http://localhost:3030/metas";

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

export const crearMeta = async (nuevaMeta: { titulo: string; descripcion: string; montoObjetivo: number }) => {
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
