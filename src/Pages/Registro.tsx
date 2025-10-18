import React, { useEffect, useState, type FormEvent } from 'react'
import type { CrearUsuarioDTO } from '../DTO/CrearUsuarioDTO';
import './styles/Registro.css'
import { RegistrarUsuario } from '../Service/UsuarioService';
import { useNavigate } from 'react-router-dom';
import { loginRequest } from '../Service/LoginService';


export const Registro = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

    useEffect(() => {
      document.body.classList.add("body-registro");
      return () => {
        document.body.classList.remove("body-registro");
      };
    }, []);

    
    const CrearUsuarioYSubir=(e: FormEvent<HTMLFormElement>)=>{
      e.preventDefault();
      const form= e.currentTarget;
      const correoInput = form.querySelector<HTMLInputElement>('input[name="correo"]');
      const contrasenaInput = form.querySelector<HTMLInputElement>('input[name="contrasena"]');
      const confContrasenaInput = form.querySelector<HTMLInputElement>('input[name="confContrasena"]');
      const nombreInput = form.querySelector<HTMLInputElement>('input[name="nombre"]');
      const apellidoInput = form.querySelector<HTMLInputElement>('input[name="apellido"]');

      
      const correoValue = correoInput?.value ?? "";
      const contrasenaValue = contrasenaInput?.value ?? "";
      const confContrasenaValue = confContrasenaInput?.value ?? "";
      const nombreValue = nombreInput?.value ?? "";
      const apellidoValue = apellidoInput?.value ?? "";
      
      
      if (contrasenaValue !== confContrasenaValue) {
        setError("❌ Las contraseñas no coinciden");
        return;
      }

      const usuarioNew: CrearUsuarioDTO = {
        correo: correoValue,
        contrasena: contrasenaValue,
        confirmPassword: confContrasenaValue,
        nombre: nombreValue,
        apellido: apellidoValue,
      }
      
      RegistrarUsuario(usuarioNew);

      //Ver refactorización
      const handleSubmit = async () => {
        e.preventDefault();
        try {
          const { token, rol } = await loginRequest(usuarioNew.correo, usuarioNew.contrasena);
          localStorage.setItem("token", token);
          localStorage.setItem("rol", rol);
    
          navigate("/metas");
        } catch (err) {
          console.error("Error al iniciar sesión:", err);
        }
      };
      
      handleSubmit();

    }

  return (
    <div className="container">
      <div className="side-accent"></div>
      <h2>GGestor</h2>
      <h2>Regístrate</h2>
      <p className="toggle">
        Regístrate o <span onClick={() => navigate("/login")}>Inicia Sesión</span>
      </p>

      <form onSubmit={CrearUsuarioYSubir}>
        <label>Correo</label>
        <input type="email" 
               placeholder="Ingresa tu correo"
               name="correo" />

        <label>Contraseña</label>
        <input type="password" 
               placeholder="Ingresa tu contraseña"
               name="contrasena" />

        <label>Confirmación de contraseña</label>
        <input type="password" 
               placeholder="Repite tu contraseña"
               name="confContrasena" />

        <label>Nombre</label>
        <input type="text" 
               placeholder="Ingresa tu nombre"
               name="nombre" />

        <label>Apellido</label>
        <input type="text" 
               placeholder="Ingresa tu apellido"
               name="apellido" />

        <div className="checkbox">
          <input type="checkbox" id="terms" />
          <label htmlFor="terms">
            He leído los <a href="#">términos y condiciones</a>
          </label>
        </div>

        <button type="submit">Registrarse</button>

        <p className="bottom-text">¡Únete ahora a GGestor!</p>

         {error && <p className="error">{error}</p>}
      </form>
    </div>
  )
}
