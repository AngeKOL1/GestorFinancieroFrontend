import React, { useEffect, useState } from "react";
import "./styles/LoginStyles.css";
import { loginRequest } from "../Service/LoginService"; // ajusta la ruta
import { Navigate, useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();

  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    document.body.classList.add("body-login");
    return () => {
      document.body.classList.remove("body-login");
    };
  }, []);

 const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { token, rol } = await loginRequest(correo, password);

      // Guardamos el token (y opcionalmente el rol)
      localStorage.setItem("token", token);
      localStorage.setItem("rol", rol);

      navigate("/metas");
    } catch (err) {
      console.error("Error al iniciar sesión:", err);
      setError("Correo o contraseña incorrectos");
    }
  };

  return (
    <div className="container">
      <div className="side-accent"></div>
      <h2>Iniciar sesión</h2>
      <div className="toggle">
        ¿No tienes cuenta? <span onClick={() => navigate("/registro")}>Regístrate</span>
      </div>

      <form onSubmit={handleSubmit}>
        <label>Correo electrónico</label>
        <input
          type="email"
          placeholder="Ingresa tu correo"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          required
        />

        <label>Contraseña</label>
        <input
          type="password"
          placeholder="Ingresa tu contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div className="checkbox">
          <input type="checkbox" /> Recordarme
        </div>

        <button type="submit">Iniciar sesión</button>

        {error && <p className="error">{error}</p>}
      </form>

      <div className="bottom-text">
        ¿Olvidaste tu contraseña? <span>Recupérala</span>
      </div>
    </div>
  );
};

