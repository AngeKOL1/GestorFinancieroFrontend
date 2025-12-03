import axios from "axios";
import { URL_UTLIZADA } from "../appConstants/AppURL";
import type { MisCategoriasDTO } from "../dto/MisCategoriasDTO";
import type { VerMisCategoriasDTO } from "../dto/VerMisCategoriasDTO";

const API_MIS_CATEGORIAS = `${URL_UTLIZADA}/mis-metas`;

const getAuthHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getMisCategorias = async (): Promise<VerMisCategoriasDTO[]> => {
  const res = await axios.get(API_MIS_CATEGORIAS, getAuthHeader());
  return res.data;
};

export const crearMiCategoria = async (
  dto: MisCategoriasDTO
): Promise<VerMisCategoriasDTO> => {
  const res = await axios.post(API_MIS_CATEGORIAS, dto, getAuthHeader());
  return res.data;
};
