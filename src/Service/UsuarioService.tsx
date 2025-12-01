import axios from "axios";
import type { UsuarioDTO } from "../dto/CrearUsuarioDTO";
import { URL_UTLIZADA } from "../appConstants/AppURL";

const URL = `${URL_UTLIZADA}/usuarios/registro`

export const RegistrarUsuario = async(usuario: UsuarioDTO)=>{
    try{
        const response= await axios.post(URL, usuario)
        return response.data
    }catch(error){
        console.log("Error al crear usuario", error)
        throw error;
    }
}