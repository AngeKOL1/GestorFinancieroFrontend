import axios from "axios";
import type { ReporteRespuesta } from "../modelos/ReporteRespuesta";
import { URL_UTLIZADA } from "../appConstants/AppURL";
import type { ReporteDTO } from "../dto/ReporteDTO";

const api = axios.create({
  baseURL: URL_UTLIZADA,
  withCredentials: true,
});

export const generarReporteMeta = async (
  idMeta: number
): Promise<ReporteRespuesta> => {

  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No hay token en el localStorage");
  }

  const body: ReporteDTO = { idMeta };

  const { data } = await api.post<ReporteRespuesta>(
    "/reportes/crear-reporte",
    body,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};
