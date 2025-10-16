import React, { useEffect } from 'react'
import './styles/Registro.css'

export const Registro = () => {

  return (
    <div className="container">
      <div className="side-accent"></div>
      <h2>GGestor</h2>
      <h2>Regístrate</h2>
      <p className="toggle">
        Regístrate o <span>Inicia Sesión</span>
      </p>

      <form>
        <label>Correo</label>
        <input type="email" placeholder="Ingresa tu correo" />

        <label>Contraseña</label>
        <input type="password" placeholder="Ingresa tu contraseña" />

        <label>Confirmación de contraseña</label>
        <input type="password" placeholder="Repite tu contraseña" />

        <label>Nombre</label>
        <input type="text" placeholder="Ingresa tu nombre" />

        <label>Apellido</label>
        <input type="text" placeholder="Ingresa tu apellido" />

        <div className="checkbox">
          <input type="checkbox" id="terms" />
          <label htmlFor="terms">
            He leído los <a href="#">términos y condiciones</a>
          </label>
        </div>

        <button type="submit">Registrarse</button>

        <p className="bottom-text">¡Únete ahora a GGestor!</p>
      </form>
    </div>
  )
}
