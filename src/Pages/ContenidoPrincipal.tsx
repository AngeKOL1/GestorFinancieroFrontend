import React, { useEffect, useState } from "react";
import { MetasLateral } from "../Componentes/MetasLateral";
import { Transacciones } from "../Componentes/Transacciones";
import { ComponenteCentral } from "../Componentes/ComponenteCentral";

import { useNivelUsuario } from "../hooks/NivelUsuarioContext";
import { useTrofeos } from "../hooks/TrofeosContext";

import "./styles/Principal.css";

export const ContenidoPrincipal = () => {
  const { state } = useNivelUsuario();
  const { state: trofeoState } = useTrofeos();
  const { ultimoTrofeo } = trofeoState;

  const { nivelActual, xpActual, xpNecesaria, banner, loading } = state;

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
      {/* HEADER */}
      <header className="header" role="banner">
        <div className="perfil">
          <img
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
            alt="Foto de perfil del usuario"
          />

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
                ></div>
              </div>
            </div>
          )}
        </div>
        <div
            className="trofeo-reciente"
            onClick={() => setMostrarTrofeos(true)}
          >
            {ultimoTrofeo ? (
              <>
                <img
                  src="https://img.freepik.com/vector-gratis/estilo-trofeo-plano_78370-3222.jpg"
                  alt="Trofeo obtenido"
                  className="img-trofeo"
                />

                <div className="trofeo-detalles">
                  <span className="trofeo-nombre">{ultimoTrofeo.nombre}</span>
                  <span className="trofeo-secundario">
                    +{ultimoTrofeo.xp} XP •{" "}
                    {new Date(ultimoTrofeo.fecha).toLocaleDateString("es-PE")}
                  </span>
                </div>
              </>
            ) : (
              <span className="trofeo-nombre">Sin trofeos aún</span>
            )}
          </div>

        <nav className="nav" aria-label="Navegación principal">
          <button className="btnCasa" aria-label="Ir a inicio">
            <i className="fa-solid fa-house"></i>
          </button>

          <div className="busqueda" role="search">
            <div className="iconoBusqueda">🔍</div>
            <input
              className="inputBusqueda"
              type="text"
              placeholder="Buscar Meta"
              aria-label="Buscar metas"
            />
          </div>

          <button
            onClick={toggleTheme}
            aria-label="Cambiar entre tema claro y oscuro"
            className="btnCasa"
          >
            🌓
          </button>
        </nav>
      </header>

      <MetasLateral />

      <ComponenteCentral
        mostrarTrofeos={mostrarTrofeos}
        onVerMetas={() => setMostrarTrofeos(false)}
      />

      <Transacciones />

      <footer className="pieDePagina" role="contentinfo">
        &copy; Envíanos tus dudas a{" "}
        <a href="#" aria-label="Enviar correo a GGestor">
          Correo GGestor
        </a>
      </footer>
    </div>
  );
};
