import React, { useEffect } from 'react';
import { MetasLateral } from '../Componentes/MetasLateral';
import { ListarMetas } from '../Componentes/ListarMetas';
import { Transacciones } from '../Componentes/Transacciones';
import './styles/Principal.css';

export const ContenidoPrincipal = () => {


  useEffect(() => {
    document.body.classList.add('contenido-principal');

    return () => {
      document.body.classList.remove('contenido-principal');
    };
  }, []);


  const toggleTheme = () => {
    document.body.classList.toggle("light");
  };

  return (
    <div className="layout">


      <header className="header" role="banner">


        <div className="perfil">
          <img 
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png" 
            alt="Foto de perfil del usuario"
          />

          <div className="trofeos">
            <img 
              src="https://img.freepik.com/vector-gratis/estilo-trofeo-plano_78370-3222.jpg" 
              alt="Trofeo de logros"
            />
          </div>
        </div>


        <nav className="nav" aria-label="Navegación principal">

          <button 
            className="btnCasa"
            aria-label="Ir a inicio"
          >
            <i className="fa-solid fa-house"></i>
          </button>
          <div className="busqueda" role="search">
            <div className="iconoBusqueda" aria-hidden="true">🔍</div>

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
            style={{ marginLeft: "10px" }}
          >
            🌓
          </button>

        </nav>

      </header>


      <MetasLateral />
      <ListarMetas />
      <Transacciones />


      <footer className="pieDePagina" role="contentinfo">
        &copy; Envíanos tus dudas a{" "}
        <a href="#" aria-label="Enviar correo a GGestor">Correo GGestor</a>
      </footer>

    </div>
  );
};
