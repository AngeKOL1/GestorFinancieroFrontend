import axios from "axios";
import type { UsuarioDTO } from "../dto/CrearUsuarioDTO";
import { URL_UTLIZADA } from "../appConstants/AppURL";
import type { NivelUsuarioResponse } from "../modelos/NivelUsuarioResponse";


const URL = `${URL_UTLIZADA}/usuarios/registro`

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const RegistrarUsuario = async(usuario: UsuarioDTO)=>{
    try{
        const response= await axios.post(URL, usuario)
        return response.data
    }catch(error){
        console.log("Error al crear usuario", error)
        throw error;
    }
}

export const getNivelUsuario = async (): Promise<NivelUsuarioResponse> => {
  const response = await axios.get(`${URL_UTLIZADA}/usuarios/usuario/nivel`, getAuthHeader());
  return response.data;
};