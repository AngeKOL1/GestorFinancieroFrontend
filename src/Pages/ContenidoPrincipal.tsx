import React, { useEffect, useState } from "react";
import { MetasLateral } from "../Componentes/MetasLateral";
import { Transacciones } from "../Componentes/Transacciones";
import { ComponenteCentral } from "../Componentes/ComponenteCentral";

import { useNivelUsuario } from "../hooks/NivelUsuarioContext";
import { useTrofeos } from "../hooks/TrofeosContext";

import "./styles/Principal.css";
import { PerfilMenu } from "../Componentes/PerfilMenu";

export const ContenidoPrincipal = () => {
  const { state } = useNivelUsuario();
  const { state: trofeoState } = useTrofeos();

  const { ultimoTrofeo } = trofeoState;
  const { nivelActual, xpActual, xpNecesaria, banner, loading } = state;

  const [busqueda, setBusqueda] = useState("");
  const [historial, setHistorial] = useState<string[]>([]);
  const [placeholder, setPlaceholder] = useState("Buscar metas…");

  const placeholders = [
    "Buscar metas…",
    "Buscar por descripción…",
    "Buscar por fecha…",
    "Buscar por monto…",
    "Escribe algo…",
  ];

  useEffect(() => {
    const saved = localStorage.getItem("historial_busqueda");
    if (saved) setHistorial(JSON.parse(saved));
  }, []);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % placeholders.length;
      setPlaceholder(placeholders[index]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);


  const guardarEnHistorial = (texto: string) => {
    if (!texto.trim()) return;

    const actualizado = [
      texto,
      ...historial.filter((x) => x !== texto),
    ].slice(0, 5); 

    setHistorial(actualizado);
    localStorage.setItem("historial_busqueda", JSON.stringify(actualizado));
  };

  const borrarBusqueda = () => {
    setBusqueda("");
  };

  const [mostrarMenuPerfil, setMostrarMenuPerfil] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login"; 
  };
  
  const [animPorcentaje, setAnimPorcentaje] = useState(0);
  const [mostrarTrofeos, setMostrarTrofeos] = useState(false);

  const porcentaje = Math.min((xpActual / xpNecesaria) * 100, 100);

  useEffect(() => {
    document.body.classList.add("contenido-principal");
    return () => {
      document.body.classList.remove("contenido-principal");
    };
  }, []);

  useEffect(() => {
    setAnimPorcentaje(0);
    const t = setTimeout(() => setAnimPorcentaje(porcentaje), 40);
    return () => clearTimeout(t);
  }, [porcentaje]);

  const toggleTheme = () => {
    document.body.classList.toggle("light");
  };

  return (
    <div className="layout">
      <header className="header">
        

      <div className="perfil" onClick={() => setMostrarMenuPerfil(!mostrarMenuPerfil)}>
          <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png" />


          {!loading && (
            <div className="nivel-info">
              <div className="nivel-header">
                <span className="nivel-linea"></span>
                <span className="nivel-texto">NIVEL {nivelActual}</span>
                <div className="banner-nivel">{banner}</div>
              </div>

              <div className="barra-nivel">
                <div
                  className="barra-progreso"
                  style={{ width: `${animPorcentaje}%` }}
                />
              </div>
            </div>
          )}
        </div>

        <div className="trofeo-reciente" onClick={() => setMostrarTrofeos(true)}>
          {ultimoTrofeo ? (
            <>
              <img src="https://img.freepik.com/vector-gratis/estilo-trofeo-plano_78370-3222.jpg" className="img-trofeo" />
              <div className="trofeo-detalles">
                <span className="trofeo-nombre">{ultimoTrofeo.nombre}</span>
                <span className="trofeo-secundario">
                  +{ultimoTrofeo.xp} XP •
                  {new Date(ultimoTrofeo.fecha).toLocaleDateString("es-PE")}
                </span>
              </div>
            </>
          ) : "Sin trofeos aún"}
        </div>

        {/* --- NAV --- */}
        <nav className="nav">
          <button className="btnCasa"><i className="fa-solid fa-house" /></button>

          {/* --- BUSQUEDA --- */}
          <div className="busqueda">
            <div className="iconoBusqueda">🔍</div>

            <input
              className="inputBusqueda"
              type="text"
              placeholder={placeholder}
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              onBlur={() => guardarEnHistorial(busqueda)}
            />

            {/* 🔥 Icono borrar */}
            {busqueda.length > 0 && (
              <span className="clearSearch" onClick={borrarBusqueda}>
                ✖
              </span>
            )}
          </div>

          <button className="btnCasa" onClick={toggleTheme}>🌓</button>
        </nav>

      </header>

      <PerfilMenu
          visible={mostrarMenuPerfil}
          onClose={() => setMostrarMenuPerfil(false)}
          onLogout={logout}
        />

      {/* --- LAYOUT --- */}
      <MetasLateral />

      <ComponenteCentral
        mostrarTrofeos={mostrarTrofeos}
        onVerMetas={() => setMostrarTrofeos(false)}
        busqueda={busqueda}
      />

      <Transacciones />

      <footer className="pieDePagina">
        &copy; Envíanos tus dudas a <a href="#">Correo GGestor</a>
      </footer>
    </div>
  );
};
