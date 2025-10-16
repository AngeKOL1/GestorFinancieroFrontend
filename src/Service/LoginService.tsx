import axios from "axios";
import { jwtDecode } from "jwt-decode";
// quitar las llaves

const API_URL = "http://localhost:3030/login";

export const loginRequest = async (correo: string, password: string) => {
  try {
    const response = await axios.post(API_URL, { correo, password });
    const token = response.data.access_token;

    // Decodificamos JWT
    const decoded = jwtDecode<{ idUsuario: number; role: string }>(token);
    const rol = decoded.role;
    const idUsuario = decoded.idUsuario;

    return { token, rol, idUsuario };
  } catch (error: any) {
    console.error("Error al hacer login:", error.response || error);
    throw error;
  }
};


