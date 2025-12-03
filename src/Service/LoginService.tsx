import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { URL_UTLIZADA } from "../appConstants/AppURL";


const API_URL = `${URL_UTLIZADA}/login`;

export const loginRequest = async (correo: string, password: string) => {
  try {
    const response = await axios.post(API_URL, { correo, password });
    const token = response.data.access_token;

    const decoded = jwtDecode<{ idUsuario: number; role: string }>(token);
    const rol = decoded.role;
    const idUsuario = decoded.idUsuario;

    return { token, rol, idUsuario };
  } catch (error: any) {
    console.error("Error al hacer login:", error.response || error);
    throw error;
  }
};


