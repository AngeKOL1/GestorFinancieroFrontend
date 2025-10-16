import React, { useEffect } from 'react';
import { MetasLateral } from '../Componentes/MetasLateral';
import { ListarMetas } from '../Componentes/ListarMetas';
import { Transacciones } from '../Componentes/Transacciones';
import'./styles/Principal.css';

export const ContenidoPrincipal = () => {
  useEffect(() => {
    document.body.classList.add('contenido-principal'); // coincide con tu CSS

    return () => {
      document.body.classList.remove('contenido-principal');
    };
  }, []);



  return (
      <div className="layout">

        {/* Header */}
        <header className="header">
          <div className="perfil">
            <img 
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png" 
              alt="Perfil usuario"
            />
            <div className="trofeos">
              <img 
                src="https://img.freepik.com/vector-gratis/estilo-trofeo-plano_78370-3222.jpg" 
                alt="Trofeo"
              />
            </div>
          </div>

          <nav className="nav">
            <button className="btnCasa">
              <i className="fa-solid fa-house"></i>
            </button>

            <div className="busqueda">
              <div className="iconoBusqueda">🔍</div>
              <input 
                className="inputBusqueda" 
                type="text" 
                placeholder="Buscar Meta" 
              />
            </div>
          </nav>
        </header>


        <MetasLateral></MetasLateral>

        <ListarMetas></ListarMetas>

        <Transacciones></Transacciones>

        {/* Footer */}
        <footer className="pieDePagina">
          &copy; Envíanos tus dudas a <a href="#">Correo GGestor</a>
        </footer>

      </div>
  );
};
