import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './theme.css';

import { Rutas } from './Routing/Rutas';
import { Login } from './Pages/Login';
import { Registro } from './Pages/Registro';
import { Error } from './Componentes/Error';
import { ContenidoPrincipal } from './Pages/ContenidoPrincipal';
import { ProtenccionDeRrutas } from './Routing/ProteccionDeRutas';

function App() {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Rutas />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />

          <Route
            path="/metas"
            element={
              <ProtenccionDeRrutas>
                <ContenidoPrincipal />
              </ProtenccionDeRrutas>
            }
          />

          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
}

export default App;
