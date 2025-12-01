import axios from "axios";
import type { Transaccion } from "../modelos/Transaccion";
import type { CrearTransaccionDTO } from "../dto/CrearTransaccionDTO";
import type { EditarTransaccionDTO } from "../dto/EditarTransaccionDTO";
import { URL_UTLIZADA } from "../appConstants/AppURL";

const API_URL = `${URL_UTLIZADA}/transacciones`;

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const listarTransaccionesUsuario = async (): Promise<Transaccion[]> => {
  const response = await axios.get(`${API_URL}`, getAuthHeader());
  return response.data;
};

export const crearTransaccion = async (
  dto: CrearTransaccionDTO
): Promise<Transaccion> => {
  const response = await axios.post(`${API_URL}`, dto, getAuthHeader());
  return response.data;
};

export const actualizarTransaccion = async (
  id: number,
  dto: EditarTransaccionDTO
): Promise<Transaccion> => {
  const response = await axios.put(`${API_URL}/${id}`, dto, getAuthHeader());
  return response.data;
};

export const eliminarTransaccion = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/transacciones/${id}`, getAuthHeader());
};

export const listarTransaccionesPorMeta = async (
  idMeta: number
): Promise<Transaccion[]> => {
  const response = await axios.get(
    `${URL_UTLIZADA}/metas/transacciones/meta/${idMeta}`,
    getAuthHeader()
  );

  return response.data;
};
